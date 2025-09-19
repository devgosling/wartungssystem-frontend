import { PDFDocument } from 'pdf-lib'
import motorpdf from '../assets/wartungsberichte/Wartungsbericht_Motor_Formular.pdf'
import muellpdf from '../assets/wartungsberichte/Wartungsbericht_Muellanlage_Formular.pdf'
import pumpepdf from '../assets/wartungsberichte/Wartungsbericht_Pumpe_Formular.pdf'
import wehrtorpdf from '../assets/wartungsberichte/Wartungsbericht_Wehrtore_Formular.pdf'
import luefterpdf from '../assets/wartungsberichte/Wartungsbericht_Luefter_Formular.pdf'
import schmutzwasserpdf from '../assets/wartungsberichte/Wartungsbericht_Schmutzwasser_Formular.pdf'
import waermetauscherpdf from '../assets/wartungsberichte/Wartungsbericht_Waermetauscher_Formular.pdf'
import fieldDataMotor from '../assets/wartungsberichte/fillers/motor.json'
import fieldDataMuell from '../assets/wartungsberichte/fillers/muellanlage.json'
import fieldDataPumpe from '../assets/wartungsberichte/fillers/pumpe.json'
import fieldDataWehrtor from '../assets/wartungsberichte/fillers/wehrtor.json'
import fieldDataLuefter from '../assets/wartungsberichte/fillers/luefter.json'
import fieldDataSchmutzwasser from '../assets/wartungsberichte/fillers/schmutzwasser.json'
import fieldDataWaermetauscher from '../assets/wartungsberichte/fillers/waermetauscher.json'
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

export const fillPumpePDF = async (inputValues, signatureBase64) => {
  const formPdfBytes = await fetch(pumpepdf).then((res) => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(formPdfBytes)
  const signatureImage = await pdfDoc.embedPng(signatureBase64)
  const inputData = await useInputStore().inputData

  const form = pdfDoc.getForm()

  // SET IMPORTANT DATA
  form.getTextField(fieldDataPumpe.textfields.employee).setText(`${inputValues.employee}`)
  form
    .getTextField(fieldDataPumpe.textfields.date)
    .setText(
      `${new Date(inputValues.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    )
  form
    .getTextField(fieldDataPumpe.textfields.customerdata)
    .setText(
      `${inputValues.customer.name}\n\n${inputValues.customer['address.street']}\n${inputValues.customer['address.zipcode']} ${inputValues.customer['address.city']}`,
    )

  // SET FIELDS
  console.log(inputData)
  for (const [key, value] of Object.entries(inputData)) {
    // SET TEXT FIELDS
    if (fieldDataPumpe.textfields[key]) {
      form.getTextField(fieldDataPumpe.textfields[key]).setText(value.toString())
    }

    // SET RADIO GROUPS
    if (fieldDataPumpe.radiogroups[key]) {
      form.getRadioGroup(fieldDataPumpe.radiogroups[key]).select('Auswahl' + value)
    }

    // SET CHECKBOXES
    if (fieldDataPumpe.checkboxes[key]) {
      if (value == true) {
        form.getCheckBox(fieldDataPumpe.checkboxes[key]).check()
      } else {
        form.getCheckBox(fieldDataPumpe.checkboxes[key]).uncheck()
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

export const fillWehrtorPDF = async (inputValues, signatureBase64) => {
  const formPdfBytes = await fetch(wehrtorpdf).then((res) => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(formPdfBytes)
  const signatureImage = await pdfDoc.embedPng(signatureBase64)
  const inputData = await useInputStore().inputData

  const form = pdfDoc.getForm()

  // SET IMPORTANT DATA
  form.getTextField(fieldDataWehrtor.textfields.employee).setText(`${inputValues.employee}`)
  form
    .getTextField(fieldDataWehrtor.textfields.date)
    .setText(
      `${new Date(inputValues.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    )
  form
    .getTextField(fieldDataWehrtor.textfields.customerdata)
    .setText(
      `${inputValues.customer.name}\n\n${inputValues.customer['address.street']}\n${inputValues.customer['address.zipcode']} ${inputValues.customer['address.city']}`,
    )

  // SET FIELDS
  console.log(inputData)
  for (const [key, value] of Object.entries(inputData)) {
    // SET TEXT FIELDS
    if (fieldDataWehrtor.textfields[key]) {
      form.getTextField(fieldDataWehrtor.textfields[key]).setText(value.toString())
    }

    // SET RADIO GROUPS
    if (fieldDataWehrtor.radiogroups[key]) {
      form.getRadioGroup(fieldDataWehrtor.radiogroups[key]).select('Auswahl' + value)
    }

    // SET CHECKBOXES
    if (fieldDataWehrtor.checkboxes[key]) {
      if (value == true) {
        form.getCheckBox(fieldDataWehrtor.checkboxes[key]).check()
      } else {
        form.getCheckBox(fieldDataWehrtor.checkboxes[key]).uncheck()
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

export const fillLüfterPDF = async (inputValues, signatureBase64) => {
  const formPdfBytes = await fetch(luefterpdf).then((res) => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(formPdfBytes)
  const signatureImage = await pdfDoc.embedPng(signatureBase64)
  const inputData = await useInputStore().inputData

  const form = pdfDoc.getForm()

  // SET IMPORTANT DATA
  form.getTextField(fieldDataLuefter.textfields.employee).setText(`${inputValues.employee}`)
  form
    .getTextField(fieldDataLuefter.textfields.date)
    .setText(
      `${new Date(inputValues.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    )
  form
    .getTextField(fieldDataLuefter.textfields.customerdata)
    .setText(
      `${inputValues.customer.name}\n\n${inputValues.customer['address.street']}\n${inputValues.customer['address.zipcode']} ${inputValues.customer['address.city']}`,
    )

  // SET FIELDS
  console.log(inputData)
  for (const [key, value] of Object.entries(inputData)) {
    // SET TEXT FIELDS
    if (fieldDataLuefter.textfields[key]) {
      form.getTextField(fieldDataLuefter.textfields[key]).setText(value.toString())
    }

    // SET RADIO GROUPS
    if (fieldDataLuefter.radiogroups[key]) {
      form.getRadioGroup(fieldDataLuefter.radiogroups[key]).select('Auswahl' + value)
    }

    // SET CHECKBOXES
    if (fieldDataLuefter.checkboxes[key]) {
      if (value == true) {
        form.getCheckBox(fieldDataLuefter.checkboxes[key]).check()
      } else {
        form.getCheckBox(fieldDataLuefter.checkboxes[key]).uncheck()
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

export const fillSchmutzwasserPDF = async (inputValues, signatureBase64) => {
  const formPdfBytes = await fetch(schmutzwasserpdf).then((res) => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(formPdfBytes)
  const signatureImage = await pdfDoc.embedPng(signatureBase64)
  const inputData = await useInputStore().inputData

  const form = pdfDoc.getForm()

  // SET IMPORTANT DATA
  form.getTextField(fieldDataSchmutzwasser.textfields.employee).setText(`${inputValues.employee}`)
  form
    .getTextField(fieldDataSchmutzwasser.textfields.date)
    .setText(
      `${new Date(inputValues.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    )
  form
    .getTextField(fieldDataSchmutzwasser.textfields.customerdata)
    .setText(
      `${inputValues.customer.name}\n\n${inputValues.customer['address.street']}\n${inputValues.customer['address.zipcode']} ${inputValues.customer['address.city']}`,
    )

  // SET FIELDS
  console.log(inputData)
  for (const [key, value] of Object.entries(inputData)) {
    // SET TEXT FIELDS
    if (fieldDataSchmutzwasser.textfields[key]) {
      form.getTextField(fieldDataSchmutzwasser.textfields[key]).setText(value.toString())
    }

    // SET RADIO GROUPS
    if (fieldDataSchmutzwasser.radiogroups[key]) {
      form.getRadioGroup(fieldDataSchmutzwasser.radiogroups[key]).select('Auswahl' + value)
    }

    // SET CHECKBOXES
    if (fieldDataSchmutzwasser.checkboxes[key]) {
      if (value == true) {
        form.getCheckBox(fieldDataSchmutzwasser.checkboxes[key]).check()
      } else {
        form.getCheckBox(fieldDataSchmutzwasser.checkboxes[key]).uncheck()
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

export const fillWärmetauscherPDF = async (inputValues, signatureBase64) => {
  const formPdfBytes = await fetch(waermetauscherpdf).then((res) => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(formPdfBytes)
  const signatureImage = await pdfDoc.embedPng(signatureBase64)
  const inputData = await useInputStore().inputData

  const form = pdfDoc.getForm()

  // SET IMPORTANT DATA
  form.getTextField(fieldDataWaermetauscher.textfields.employee).setText(`${inputValues.employee}`)
  form
    .getTextField(fieldDataWaermetauscher.textfields.date)
    .setText(
      `${new Date(inputValues.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    )
  form
    .getTextField(fieldDataWaermetauscher.textfields.customerdata)
    .setText(
      `${inputValues.customer.name}\n\n${inputValues.customer['address.street']}\n${inputValues.customer['address.zipcode']} ${inputValues.customer['address.city']}`,
    )

  // SET FIELDS
  console.log(inputData)
  for (const [key, value] of Object.entries(inputData)) {
    // SET TEXT FIELDS
    if (fieldDataWaermetauscher.textfields[key]) {
      form.getTextField(fieldDataWaermetauscher.textfields[key]).setText(value.toString())
    }

    // SET RADIO GROUPS
    if (fieldDataWaermetauscher.radiogroups[key]) {
      form.getRadioGroup(fieldDataWaermetauscher.radiogroups[key]).select('Auswahl' + value)
    }

    // SET CHECKBOXES
    if (fieldDataWaermetauscher.checkboxes[key]) {
      if (value == true) {
        form.getCheckBox(fieldDataWaermetauscher.checkboxes[key]).check()
      } else {
        form.getCheckBox(fieldDataWaermetauscher.checkboxes[key]).uncheck()
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

export const getAmountOfPagesInPDF = async (pdfBytes) => {
  const pdfDoc = await PDFDocument.load(pdfBytes)
  return pdfDoc.getPageCount()
}
