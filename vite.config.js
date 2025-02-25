import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import githubOAuthPlugin from './vite-plugin-github-oauth'

export default defineConfig(({ mode }) => {
  // Load env variables based on mode for server access
  // Using empty string as prefix to load all env vars, including those without VITE_ prefix
  const env = loadEnv(mode, process.cwd(), '');

  console.log('OAuth env variables loaded:', {
    clientId: env.VITE_OAUTH_CLIENT_ID ? 'Present' : 'Missing',
    clientSecret: env.VITE_OAUTH_CLIENT_SECRET ? 'Present' : 'Missing'
  });

  // Make sure we have the OAuth credentials in the environment
  if (!env.VITE_OAUTH_CLIENT_ID || !env.VITE_OAUTH_CLIENT_SECRET) {
    console.warn('WARNING: Missing OAuth environment variables. OAuth authentication may not work properly.');
    console.warn('Make sure you have VITE_OAUTH_CLIENT_ID and VITE_OAUTH_CLIENT_SECRET in your .env.local file');
  }

  return {
    base: '/foundations-course/',
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      }),
      // Pass the loaded env variables directly to the plugin
      githubOAuthPlugin({
        clientId: env.VITE_OAUTH_CLIENT_ID,
        clientSecret: env.VITE_OAUTH_CLIENT_SECRET
      })
    ],
    // Make env variables available to client-side code
    define: {
      'process.env.VITE_OAUTH_CLIENT_ID': JSON.stringify(env.VITE_OAUTH_CLIENT_ID),
      'process.env.VITE_OAUTH_CLIENT_SECRET': JSON.stringify(env.VITE_OAUTH_CLIENT_SECRET)
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
