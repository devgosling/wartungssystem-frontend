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
