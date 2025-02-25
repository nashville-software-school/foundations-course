import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/foundations-course/',
  plugins: [react({
    jsxImportSource: '@emotion/react',
    babel: {
      plugins: ['@emotion/babel-plugin']
    }
  })],
  // Environment Variables:
  // Vite automatically loads env files in the following order:
  // 1. .env                # loaded in all cases
  // 2. .env.local         # loaded in all cases, ignored by git
  // 3. .env.[mode]        # only loaded in specified mode
  // 4. .env.[mode].local  # only loaded in specified mode, ignored by git
  //
  // Only variables prefixed with VITE_ are exposed to your code
  // via import.meta.env.VITE_*
  //
  // Example:
  // VITE_OAUTH_CLIENT_ID in .env.local becomes available as
  // import.meta.env.VITE_OAUTH_CLIENT_ID in your code
})
