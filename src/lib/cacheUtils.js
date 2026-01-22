/**
 * Check if PDF templates are cached in the service worker cache
 * @returns {Promise<boolean>} true if all required PDFs are cached
 */
export async function arePDFsCached() {
  try {
    const cache = await caches.open('pdf-templates')
    const keys = await cache.keys()

    // Check if we have at least some PDFs cached (the 9 templates)
    // We check by looking for .pdf files in the cache
    const pdfKeys = keys.filter((request) => request.url.includes('.pdf'))

    // We need at least 9 PDF templates cached
    if (pdfKeys.length < 9) {
      return false
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

/**
 * Preload all PDF templates to ensure they are cached by the service worker
 * Call this while online to cache PDFs for offline use
 */
export async function preloadPDFTemplates() {
  if (!navigator.onLine) return

  try {
    // Import all PDF URLs
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

    // Fetch each PDF to trigger service worker caching
    const fetchPromises = pdfModules.map((m) => fetch(m.default))
    await Promise.all(fetchPromises)

    console.log('All PDF templates preloaded and cached')
  } catch (err) {
    console.error('Error preloading PDF templates:', err)
  }
}
