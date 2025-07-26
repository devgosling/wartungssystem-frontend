import { PDFDocument } from 'pdf-lib'
import motorpdf from '../assets/wartungsberichte/Wartungsbericht_Motor_Formular.pdf'

export const fillMotorPDF = async (setupValues, signatureBase64) => {
  const formPdfBytes = await fetch(motorpdf).then((res) => res.arrayBuffer())
  console.log(formPdfBytes)
  const pdfDoc = await PDFDocument.load(formPdfBytes)
  const signatureImage = await pdfDoc.embedPng(signatureBase64)

  const form = pdfDoc.getForm()

  // SET SIGNATURE
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const pngDims = (await signatureImage).scale(0.23)

  firstPage.drawImage(signatureImage, {
    x: 453,
    y: 41,
    width: pngDims.width,
    height: pngDims.height,
  })

  const pdfBytes = await pdfDoc.save()

  var blob = new Blob([pdfBytes], { type: 'application/pdf' })
  var link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = 'Motor_Form_' + Math.round(Math.random() * 10000) + '.pdf'
  link.click()
}
