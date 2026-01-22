import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'fs'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'copy-nojekyll',
      closeBundle() {
        copyFileSync(
          join(__dirname, 'public', '.nojekyll'),
          join(__dirname, 'dist', '.nojekyll')
        )
      }
    }
  ],
  base: "/league-list",
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
