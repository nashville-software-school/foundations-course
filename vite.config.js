import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env variables based on mode for server access
  // Using empty string as prefix to load all env vars, including those without VITE_ prefix
  const env = loadEnv(mode, process.cwd(), '');

  console.log('OAuth env variables loaded:', {
    lmsDomain: env.VITE_LEARNING_PLATFORM_API ? 'Present' : 'Missing',
  });

  return {
    base: '/intro-to-cloud-student-facing/',
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      })
      // GitHub OAuth plugin has been removed
    ],
    // Make env variables available to client-side code
    define: {
      'process.env.VITE_OAUTH_CLIENT_ID': JSON.stringify(env.VITE_OAUTH_CLIENT_ID),
      'process.env.VITE_PROXY_DOMAIN': JSON.stringify(env.VITE_PROXY_DOMAIN),
      'process.env.VITE_LEARNING_PLATFORM_API': JSON.stringify(env.VITE_LEARNING_PLATFORM_API),
    },
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
  }
})
