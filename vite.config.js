import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs-extra'

// Custom plugin to copy data directory
const copyDataPlugin = {
  name: 'copy-data',
  writeBundle: async () => {
    await fs.copy('data', 'docs/data')
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyDataPlugin],
  build: {
    outDir: 'docs'
  }
})
