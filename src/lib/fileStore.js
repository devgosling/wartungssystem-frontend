// Report PDFs live on the file service on the all-inkl webspace (repo
// wartungssystem-dateien), not in Appwrite Storage. Requests are authenticated
// with a short-lived Appwrite JWT.
import { AppwriteException } from 'appwrite'
import { APPWRITE_PROJECT_ID, account, storage } from './appwrite'

const ENDPOINT = (
  import.meta.env.VITE_FILES_ENDPOINT || 'https://dateien.wpk-prozesstechnik.de'
).replace(/\/+$/, '')
const FILES_URL = `${ENDPOINT}/v1/${APPWRITE_PROJECT_ID}/files`

// Transition: files that are not migrated yet (e.g. uploaded by a device still
// running the old app version) are read from and deleted in Appwrite. Remove
// once the migration is complete and the Appwrite bucket is empty.
const LEGACY_BUCKET = '6878f5cf00166fde91eb'

let cachedJwt = null

async function getJwt() {
  if (cachedJwt && cachedJwt.expiresAt > Date.now() + 60_000) return cachedJwt.value
  const { jwt } = await account.createJWT()
  // Appwrite JWTs are valid for 15 minutes.
  cachedJwt = { value: jwt, expiresAt: Date.now() + 15 * 60_000 }
  return jwt
}

function fileUrl(fileId, suffix = '') {
  return `${FILES_URL}/${encodeURIComponent(fileId)}${suffix}`
}

async function request(url, { method = 'GET', headers = {}, body } = {}) {
  const res = await fetch(url, {
    method,
    headers: { 'X-Appwrite-JWT': await getJwt(), ...headers },
    body,
    cache: 'no-store',
  })
  if (!res.ok) {
    const message = await res
      .json()
      .then((data) => data.message)
      .catch(() => res.statusText)
    // AppwriteException keeps the existing `err.code === 404` handling working.
    throw new AppwriteException(message, res.status, 'file_service_error')
  }
  return res
}

function isNotFound(err) {
  return err instanceof AppwriteException && err.code === 404
}

function putFile(fileId, file, headers) {
  return request(fileUrl(fileId), {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
      'X-File-Name': encodeURIComponent(file.name),
      ...headers,
    },
    body: file,
  }).then((res) => res.json())
}

export function uploadFile(fileId, file) {
  return putFile(fileId, file, { 'If-None-Match': '*' })
}

/** Replaces the content of a file in one step, keeping its name unless the new File has one. */
export function replaceFile(fileId, file) {
  return putFile(fileId, file, {})
}

/** Metadata in the shape of an Appwrite file (`$id`, `name`, `mimeType`, `sizeOriginal`, …). */
export async function getFile(fileId) {
  try {
    return await (await request(fileUrl(fileId))).json()
  } catch (err) {
    if (!isNotFound(err)) throw err
    return storage.getFile(LEGACY_BUCKET, fileId)
  }
}

/** Downloads a file, bypassing the HTTP cache. Returns `{ blob, name }`. */
export async function getFileBlob(fileId) {
  try {
    const res = await request(fileUrl(fileId, '/download'))
    return {
      blob: await res.blob(),
      name: decodeURIComponent(res.headers.get('X-File-Name') ?? ''),
    }
  } catch (err) {
    if (!isNotFound(err)) throw err
    // Appwrite accepts the same X-Appwrite-JWT header.
    const res = await request(storage.getFileDownload(LEGACY_BUCKET, fileId))
    return { blob: await res.blob(), name: (await storage.getFile(LEGACY_BUCKET, fileId)).name }
  }
}

export async function deleteFile(fileId) {
  try {
    await request(fileUrl(fileId), { method: 'DELETE' })
  } catch (err) {
    if (!isNotFound(err)) throw err
    await storage.deleteFile(LEGACY_BUCKET, fileId)
  }
}

/** Call on logout. */
export function clearFileServiceAuth() {
  cachedJwt = null
}
