import { AppwriteException } from 'appwrite'
import { databases } from './appwrite'
import { deleteFile, getFileBlob, replaceFile } from './fileStore'
import { addCustomerSignatureToPDF, addControlSignatureToPDF } from './pdf-lib'

async function stampSignature(stundenzettelId, signatureBase64, addSignatureToPDF) {
  // Download the existing PDF
  const { blob, name } = await getFileBlob(stundenzettelId)
  const pdfBuffer = await blob.arrayBuffer()

  const [newPdfBytes] = await addSignatureToPDF(pdfBuffer, signatureBase64)

  // Replace the file in place, keeping ID and name
  await replaceFile(stundenzettelId, new File([newPdfBytes], name, { type: 'application/pdf' }))
}

export async function executeCustomerSignatureJob(job) {
  const { stundenzettelId, documentId, signatureBase64 } = job

  await stampSignature(stundenzettelId, signatureBase64, addCustomerSignatureToPDF)

  // Update the document in the database
  await databases.updateDocument('6878f5900032addce7e5', 'stundenzettel', documentId, {
    unterschrieben_kunde: true,
  })
}

export async function executeControlSignatureJob(job) {
  const { stundenzettelId, documentId, signatureBase64 } = job

  await stampSignature(stundenzettelId, signatureBase64, addControlSignatureToPDF)

  // Update the document in the database
  await databases.updateDocument('6878f5900032addce7e5', 'stundenzettel', documentId, {
    ueberprueft: true,
  })
}

export async function executeDeleteStundenzettelJob(job) {
  const { stundenzettelId, documentId } = job

  try {
    await deleteFile(stundenzettelId)
  } catch (err) {
    // Already gone, e.g. a previous attempt failed after deleting the file.
    if (!(err instanceof AppwriteException && err.code === 404)) throw err
  }
  await databases.deleteDocument('6878f5900032addce7e5', 'stundenzettel', documentId)
}
