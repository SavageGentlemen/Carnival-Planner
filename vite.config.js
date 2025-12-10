import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // 1. Bind to 0.0.0.0 so Replit can expose the port
    host: '0.0.0.0',
    // 2. Allow the specific Replit host (and 'all' for future proofing if the URL changes)
    allowedHosts: [
      '087c3430-967a-4179-9756-606ab12a43c1-00-2p2rwbzypxuak.spock.replit.dev',
      'all' 
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
