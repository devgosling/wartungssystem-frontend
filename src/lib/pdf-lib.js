import { PDFDocument } from 'pdf-lib'
import motorpdf from '../assets/wartungsberichte/Wartungsbericht_Motor_Formular.pdf'
import fieldDataMotor from '../assets/wartungsberichte/fillers/motor.json'
import { useInputStore } from '@/stores/inputStore'

export const fillMotorPDF = async (inputValues, signatureBase64) => {
  const formPdfBytes = await fetch(motorpdf).then((res) => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(formPdfBytes)
  const signatureImage = await pdfDoc.embedPng(signatureBase64)
  const inputData = await useInputStore().inputData

  const form = pdfDoc.getForm()

  // SET IMPORTANT DATA
  form.getTextField(fieldDataMotor.textfields.employee).setText(`${inputValues.employee}`)
  form
    .getTextField(fieldDataMotor.textfields.date)
    .setText(
      `${new Date(inputValues.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    )
  form
    .getTextField(fieldDataMotor.textfields.customerdata)
    .setText(
      `${inputValues.customer.name}\n\n${inputValues.customer.address.street}\n${inputValues.customer.address.zipcode} ${inputValues.customer.address.city}`,
    )

  // SET FIELDS
  console.log(inputData)
  for (const [key, value] of Object.entries(inputData)) {
    // SET TEXT FIELDS
    if (fieldDataMotor.textfields[key]) {
      form.getTextField(fieldDataMotor.textfields[key]).setText(value.toString())
    }

    // SET RADIO GROUPS
    if (fieldDataMotor.radiogroups[key]) {
      form.getRadioGroup(fieldDataMotor.radiogroups[key]).select('Auswahl' + value)
    }

    // SET CHECKBOXES
    if (fieldDataMotor.checkboxes[key]) {
      if (value == true) {
        form.getCheckBox(fieldDataMotor.checkboxes[key]).check()
      } else {
        form.getCheckBox(fieldDataMotor.checkboxes[key]).uncheck()
      }
    }
  }

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

  // SAVE PDF
  const pdfBytes = await pdfDoc.save()

  var blob = new Blob([pdfBytes], { type: 'application/pdf' })
  var link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = 'Motor_Form_' + Math.round(Math.random() * 10000) + '.pdf'
  link.click()
}
