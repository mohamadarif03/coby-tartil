import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    react(),
    TanStackRouterVite(),
    // tsconfigPaths(),
  ],
  optimizeDeps: {
    exclude: ['onnxruntime-web'],
  },
  server: {
    watch: { ignored: ['**/training/**'] },
  },
  build: {
    chunkSizeWarningLimit: 30000,
  }
})
