import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'apple-touch-icon.png',
        'apple-touch-icon-152.png',
        'apple-touch-icon-167.png',
        'apple-touch-icon-180.png',
      ],
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // Cache all Appwrite Cloud API calls
            urlPattern: ({ url }) => url.hostname.endsWith('cloud.appwrite.io'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'appwrite-api-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 24 * 60 * 60 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 }
            }
          },
          {
            // Cache PDF templates for offline PDF generation
            urlPattern: /\.pdf$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'pdf-templates',
              expiration: { maxEntries: 20, maxAgeSeconds: 90 * 24 * 60 * 60 } // 90 days
            }
          }
        ]
      },
      manifest: {
        name: 'Wartungsystem Kromholz Wassertechnik',
        short_name: 'Wartungsystem',
        description: 'Wartungsystem für die Kromholz Wassertechnik',
        theme_color: '#85c6ff',
        background_color: '#ffffff',
        display: 'fullscreen',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
