import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import viteCompression from 'vite-plugin-compression'

// Explicitly load env vars for production build
const VITE_GOOGLE_API_KEY = process.env.VITE_GOOGLE_API_KEY || '';

// When building for Capacitor, skip PWA service worker generation
// Usage: CAPACITOR_BUILD=true npm run build
const isCapacitorBuild = process.env.CAPACITOR_BUILD === 'true';

export default defineConfig({
  define: {
    'import.meta.env.VITE_GOOGLE_API_KEY': JSON.stringify(VITE_GOOGLE_API_KEY),
  },
  plugins: [
    react(),
    // Conditionally include PWA plugin — disabled for Capacitor native builds
    ...(!isCapacitorBuild ? [VitePWA({
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
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 5242880, // 5 MiB to support large JS chunks
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
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
          },
          // Cache font files aggressively
          {
            urlPattern: /\.woff2$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'font-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 Year
              }
            }
          }
        ]
      }
    })] : []),
    // Gzip compression for production builds
    viteCompression({
      algorithm: 'gzip',
      threshold: 1024, // Only compress files > 1KB
    }),
    // Brotli compression for modern browsers
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),
  ],
  server: {
    host: true,
    port: 9090,
    allowedHosts: true,
    watch: {
      usePolling: true,
    }
  },
  preview: {
    host: true,
    port: 9090,
  },


  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    minify: 'esbuild',
    chunkSizeWarningLimit: 2000,
    // Target modern browsers for smaller output
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into cacheable chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-firebase-core': ['firebase/app', 'firebase/auth'],
          'vendor-firebase-data': ['firebase/firestore', 'firebase/storage'],
          'vendor-maps': ['leaflet', 'react-leaflet'],
          'vendor-swr': ['swr'],
          'vendor-3d': ['three', '@react-three/fiber', '@react-three/drei'],
        }
      }
    }
  }
})
