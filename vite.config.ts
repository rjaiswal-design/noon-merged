import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@ui': path.resolve(__dirname, 'src/packages/ui'),
      '@tokens': path.resolve(__dirname, 'src/packages/tokens'),
      '@state': path.resolve(__dirname, 'src/packages/state'),
    },
  },
})
