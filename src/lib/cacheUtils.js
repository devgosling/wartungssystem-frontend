/**
 * Check if PDF templates are cached in the service worker cache
 * @returns {Promise<boolean>} true if all required PDFs are cached
 */
export async function arePDFsCached() {
  try {
    // Import PDF URLs (Vite generates hashed URLs)
    const pdfModules = await Promise.all([
      import('../assets/wartungsberichte/Wartungsbericht_Motor_Formular.pdf'),
      import('../assets/wartungsberichte/Wartungsbericht_Muellanlage_Formular.pdf'),
      import('../assets/wartungsberichte/Wartungsbericht_Pumpe_Formular.pdf'),
      import('../assets/wartungsberichte/Wartungsbericht_Wehrtore_Formular.pdf'),
      import('../assets/wartungsberichte/Wartungsbericht_Luefter_Formular.pdf'),
      import('../assets/wartungsberichte/Wartungsbericht_Schmutzwasser_Formular.pdf'),
      import('../assets/wartungsberichte/Wartungsbericht_Waermetauscher_Formular.pdf'),
      import('../assets/wartungsberichte/Ueberpruefungsbericht_Enthaertungsanlage_Formular.pdf'),
      import('../assets/wartungsberichte/Stundenzettel_Formular.pdf'),
    ])

    const pdfUrls = pdfModules.map((m) => m.default)
    const cache = await caches.open('pdf-templates')

    // Check if all PDFs are in cache
    for (const pdfUrl of pdfUrls) {
      const response = await cache.match(pdfUrl)
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
