import { storage, databases, functions, ID } from './appwrite'

export async function executeJob(job) {
  const { pdfBase64, inputValues } = job

  const blob = await (await fetch('data:application/pdf;base64,' + pdfBase64)).blob()
  const fileID = ID.unique()

  const filename =
    `${inputValues.berichtType.id === 'enthaertungsanlage' ? 'Überprüfungsbericht' : 'Wartungsbericht'}_` +
    `${inputValues.berichtType.filekey}_` +
    `${new Date(inputValues.date).toLocaleDateString('de-DE')}_` +
    `${inputValues.identifier ? inputValues.identifier + '_' : ''}` +
    `${inputValues.employee.replaceAll(' ', '_')}.pdf`

  const file = new File([blob], filename, { type: 'application/pdf' })

  // Upload PDF
  await storage.createFile('6878f5cf00166fde91eb', fileID, file)

  // Create document
  await databases.createDocument(
    '6878f5900032addce7e5',
    '68866dc60038038dbe27',
    ID.unique(),
    {
      mitarbeiter: inputValues.employee,
      erstellungsdatum: new Date(),
      kunde: JSON.stringify(inputValues.customer),
      wartungsberichtid: fileID,
      identifikator: inputValues.identifier ?? null,
      type: inputValues.berichtType.filekey,
    }
  )

  // Trigger Appwrite function
  await functions.createExecution(
    '68f3d2b9001562f115c8',
    JSON.stringify({
      emailArray: inputValues.customer.emailArray,
      subject:
        (inputValues.berichtType.id === 'enthaertungsanlage' ? 'Überprüfungsbericht' : 'Wartungsbericht') +
        ' - ' +
        inputValues.berichtType.filekey,
      type: inputValues.berichtType.id === 'enthaertungsanlage' ? 1 : 0,
      fileID,
      fileName: filename,
      monteur: inputValues.employee,
    }),
    true
  )
}