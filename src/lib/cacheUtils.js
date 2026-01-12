/**
 * Check if PDF templates are cached in the service worker cache
 * @returns {Promise<boolean>} true if all required PDFs are cached
 */
export async function arePDFsCached() {
  try {
    // List of PDF files to check
    const pdfFiles = [
      'Wartungsbericht_Motor_Formular.pdf',
      'Wartungsbericht_Muellanlage_Formular.pdf',
      'Wartungsbericht_Pumpe_Formular.pdf',
      'Wartungsbericht_Wehrtore_Formular.pdf',
      'Wartungsbericht_Luefter_Formular.pdf',
      'Wartungsbericht_Schmutzwasser_Formular.pdf',
      'Wartungsbericht_Waermetauscher_Formular.pdf',
      'Ueberpruefungsbericht_Enthaertungsanlage_Formular.pdf'
    ]

    const cache = await caches.open('pdf-templates')
    
    // Check if all PDFs are in cache
    for (const pdfFile of pdfFiles) {
      const response = await cache.match(pdfFile)
      if (!response) {
        return false
      }
    }
    
    return true
  } catch (err) {
    console.error('Error checking PDF cache:', err)
    return false
  }
}

/**
 * Check if device can create maintenance reports
 * Returns false if offline and PDFs aren't cached
 * @returns {Promise<boolean>}
 */
export async function canCreateReport() {
  if (navigator.onLine) {
    return true // Online - always can create
  }
  
  // Offline - check if PDFs are cached
  return await arePDFsCached()
}
