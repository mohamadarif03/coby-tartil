import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['onnxruntime-web'],
  },
  server: {
    watch: { ignored: ['**/training/**'] },
  },
  build: {
    chunkSizeWarningLimit: 30000,
  },
})
