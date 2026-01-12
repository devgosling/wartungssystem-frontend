import { openDB } from 'idb'

let dbPromise

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB('offline-queue', 1, {
      upgrade(db) {
        db.createObjectStore('jobs', { keyPath: 'id' })
      }
    })
  }
  return dbPromise
}

export async function enqueueJob(job) {
  const db = await getDB()
  await db.put('jobs', job)
}

export async function getPendingJobs() {
  const db = await getDB()
  return db.getAll('jobs')
}

export async function removeJob(id) {
  const db = await getDB()
  await db.delete('jobs', id)
}