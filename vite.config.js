import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This explicitly tells Vercel how to handle the Vite + React build
export default defineConfig({
  plugins: [react()],
})
