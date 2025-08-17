import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: [
      'localhost',
      '.replit.dev',
      '.repl.co',
      '7ded63ed-cc84-4b08-9a7f-90a90b77fd42-00-pfvyp7fsi14l.spock.replit.dev'
    ],
    hmr: {
      clientPort: 443,
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  base: './',
})
