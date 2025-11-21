import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  
  // Remove console statements in production
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  
  // Optimize bundle splitting
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        }
      }
    }
  }
}))
