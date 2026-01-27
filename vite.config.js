import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Explicitly load env vars for production build
const VITE_GOOGLE_API_KEY = process.env.VITE_GOOGLE_API_KEY || '';

export default defineConfig({
  define: {
    'import.meta.env.VITE_GOOGLE_API_KEY': JSON.stringify(VITE_GOOGLE_API_KEY),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fete192x192.png', 'carnival592x592.png', 'assets/*.png', 'assets/*.svg'],
      manifest: {
        name: 'Caribbean Carnival Planner',
        short_name: 'CarnivalPlan',
        description: 'Plan your carnival experience, sync with your squad, and get Road Ready.',
        theme_color: '#0d9488',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/fete192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/carnival592x592.png',
            sizes: '592x592',
            type: 'image/png'
          },
          {
            src: '/fete192x192.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'firebase-storage-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
    headers: {
      // Required for Firebase Auth popup to work correctly
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'credentialless'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
