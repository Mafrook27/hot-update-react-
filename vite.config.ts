import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

const version = execSync('node ./scripts/get-version.js').toString().trim()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
    __VERSION_CHECK_INTERVAL__: 1000 * 10,
  },
})
