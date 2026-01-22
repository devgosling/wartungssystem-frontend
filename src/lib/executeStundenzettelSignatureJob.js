import { storage, databases, account } from './appwrite'
import { addCustomerSignatureToPDF, addControlSignatureToPDF } from './pdf-lib'

export async function executeCustomerSignatureJob(job) {
  const { stundenzettelId, documentId, signatureBase64 } = job

  // Download the existing PDF
  const fileDownload = await storage.getFileDownload('6878f5cf00166fde91eb', stundenzettelId)
  const fileData = await storage.getFile('6878f5cf00166fde91eb', stundenzettelId)
  const jwtObject = await account.createJWT()
  const fileResponse = await fetch(
    `${fileDownload}${fileDownload.includes('?') ? '&' : '?'}_t=${Date.now()}`,
    {
      headers: { 'x-appwrite-jwt': jwtObject.jwt },
      cache: 'no-store',
    },
  )
  const blob = await fileResponse.blob()
  const pdfBuffer = await blob.arrayBuffer()

  // Add customer signature to PDF
  const [newPdfBytes] = await addCustomerSignatureToPDF(pdfBuffer, signatureBase64)

  // Delete old file and upload new one with same ID and same name
  await storage.deleteFile('6878f5cf00166fde91eb', stundenzettelId)

  const newFile = new File([newPdfBytes], fileData.name, {
    type: 'application/pdf',
  })
  await storage.createFile('6878f5cf00166fde91eb', stundenzettelId, newFile)

  // Update the document in the database
  await databases.updateDocument('6878f5900032addce7e5', 'stundenzettel', documentId, {
    unterschrieben_kunde: true,
  })
}

export async function executeControlSignatureJob(job) {
  const { stundenzettelId, documentId, signatureBase64 } = job

  // Download the existing PDF
  const fileDownload = await storage.getFileDownload('6878f5cf00166fde91eb', stundenzettelId)
  const fileData = await storage.getFile('6878f5cf00166fde91eb', stundenzettelId)
  const jwtObject = await account.createJWT()
  const fileResponse = await fetch(
    `${fileDownload}${fileDownload.includes('?') ? '&' : '?'}_t=${Date.now()}`,
    {
      headers: { 'x-appwrite-jwt': jwtObject.jwt },
      cache: 'no-store',
    },
  )
  const blob = await fileResponse.blob()
  const pdfBuffer = await blob.arrayBuffer()

  // Add control signature to PDF
  const [newPdfBytes] = await addControlSignatureToPDF(pdfBuffer, signatureBase64)

  // Delete old file and upload new one with same ID and same name
  await storage.deleteFile('6878f5cf00166fde91eb', stundenzettelId)

  const newFile = new File([newPdfBytes], fileData.name, {
    type: 'application/pdf',
  })
  await storage.createFile('6878f5cf00166fde91eb', stundenzettelId, newFile)

  // Update the document in the database
  await databases.updateDocument('6878f5900032addce7e5', 'stundenzettel', documentId, {
    ueberprueft: true,
  })
}

export async function executeDeleteStundenzettelJob(job) {
  const { stundenzettelId, documentId } = job

  await storage.deleteFile('6878f5cf00166fde91eb', stundenzettelId)
  await databases.deleteDocument('6878f5900032addce7e5', 'stundenzettel', documentId)
}
