import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import fs from 'node:fs'
import { syncCertificates } from './scripts/syncCertificates.js'

function autoCertificatesPlugin() {
  const certsDir = path.resolve(__dirname, 'public/certificates')

  return {
    name: 'auto-certificates-sync',
    buildStart() {
      // Ensure sync on build
      syncCertificates()
    },
    configureServer(server) {
      // Initial sync on dev server start
      syncCertificates()

      // Watch public/certificates folder for add/remove/change
      server.watcher.add(certsDir)
      server.watcher.on('all', (event, filePath) => {
        const normalized = filePath.replace(/\\/g, '/')
        if (normalized.includes('/public/certificates')) {
          console.log(`[auto-certificates] Detected ${event} on ${path.basename(filePath)}`)
          syncCertificates()
        }
      })

      // Support direct browser upload endpoint if needed
      server.middlewares.use('/api/upload-certificate', (req, res) => {
        if (req.method === 'POST') {
          const filename = decodeURIComponent(req.headers['x-filename'] || `cert_${Date.now()}.png`)
          const targetPath = path.resolve(certsDir, filename)
          const writeStream = fs.createWriteStream(targetPath)
          req.pipe(writeStream)
          writeStream.on('finish', () => {
            syncCertificates()
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: true, filename }))
          })
          writeStream.on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: false, error: err.message }))
          })
        } else {
          res.writeHead(405)
          res.end()
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), autoCertificatesPlugin()],
})
