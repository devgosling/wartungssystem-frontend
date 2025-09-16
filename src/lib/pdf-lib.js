import { PDFDocument } from 'pdf-lib'
import motorpdf from '../assets/wartungsberichte/Wartungsbericht_Motor_Formular.pdf'
import muellpdf from '../assets/wartungsberichte/Wartungsbericht_Muellanlage_Formular.pdf'
import fieldDataMotor from '../assets/wartungsberichte/fillers/motor.json'
import fieldDataMuell from '../assets/wartungsberichte/fillers/muellanlage.json'
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
      `${inputValues.customer.name}\n\n${inputValues.customer['address.street']}\n${inputValues.customer['address.zipcode']} ${inputValues.customer['address.city']}`,
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
  const pdfBase64 = await pdfDoc.saveAsBase64()

  return [pdfBytes, pdfBase64]

  /*var blob = new Blob([pdfBytes], { type: 'application/pdf' })
  var link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = 'Motor_Form_' + Math.round(Math.random() * 10000) + '.pdf'
  link.click()*/
}

export const fillMüllanlagePDF = async (inputValues, signatureBase64) => {
  const formPdfBytes = await fetch(muellpdf).then((res) => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(formPdfBytes)
  const signatureImage = await pdfDoc.embedPng(signatureBase64)
  const inputData = await useInputStore().inputData

  const form = pdfDoc.getForm()

  // SET IMPORTANT DATA
  form.getTextField(fieldDataMuell.textfields.employee).setText(`${inputValues.employee}`)
  form
    .getTextField(fieldDataMuell.textfields.date)
    .setText(
      `${new Date(inputValues.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    )
  form
    .getTextField(fieldDataMuell.textfields.customerdata)
    .setText(
      `${inputValues.customer.name}\n\n${inputValues.customer['address.street']}\n${inputValues.customer['address.zipcode']} ${inputValues.customer['address.city']}`,
    )

  // SET FIELDS
  console.log(inputData)
  for (const [key, value] of Object.entries(inputData)) {
    // SET TEXT FIELDS
    if (fieldDataMuell.textfields[key]) {
      form.getTextField(fieldDataMuell.textfields[key]).setText(value.toString())
    }

    // SET RADIO GROUPS
    if (fieldDataMuell.radiogroups[key]) {
      form.getRadioGroup(fieldDataMuell.radiogroups[key]).select('Auswahl' + value)
    }

    // SET CHECKBOXES
    if (fieldDataMuell.checkboxes[key]) {
      if (value == true) {
        form.getCheckBox(fieldDataMuell.checkboxes[key]).check()
      } else {
        form.getCheckBox(fieldDataMuell.checkboxes[key]).uncheck()
      }
    }
  }

  // SET SIGNATURE
  const pages = pdfDoc.getPages()
  const firstPage = pages[1]
  const pngDims = (await signatureImage).scale(0.23)

  firstPage.drawImage(signatureImage, {
    x: 453,
    y: 41,
    width: pngDims.width,
    height: pngDims.height,
  })

  // SAVE PDF
  const pdfBytes = await pdfDoc.save()
  const pdfBase64 = await pdfDoc.saveAsBase64()

  return [pdfBytes, pdfBase64]

  /*var blob = new Blob([pdfBytes], { type: 'application/pdf' })
  var link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = 'Motor_Form_' + Math.round(Math.random() * 10000) + '.pdf'
  link.click()*/
}
