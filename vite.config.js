import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { glob } from 'glob'
import { fileURLToPath } from 'url'
import { dirname } from 'path' 
import { normalizePath } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(({ mode }) => {
  // Load env variables based on mode for server access
  // Using empty string as prefix to load all env vars, including those without VITE_ prefix
  const env = loadEnv(mode, process.cwd(), '');
  const imagePattern = path.resolve(__dirname, 'src/chapters/**/*.{png,jpg,jpeg,svg,gif,webp,avif}');
  const imageFiles = glob.sync(normalizePath(imagePattern));
  const hasImages = imageFiles.length > 0;
   let courseName = env.VITE_COURSE_NAME || 'Foundations Course';
  // Custom plugin to replace placeholders in HTML
  const htmlReplacementPlugin = {
    name: 'html-replacement',
    transformIndexHtml(html) {
      return html
        .replace(/%COURSE_NAME%/g, courseName)
        .replace(/%COURSE_URL%/g, baseUrl);
    }
  };

  const plugins = [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    }),
    htmlReplacementPlugin
  ];
  console.log("hasImages",hasImages)
  if (hasImages) {
    plugins.push(
      viteStaticCopy({
        targets: [
          {
            // copy all images from each chapter folder
            src: normalizePath(imagePattern),
            dest: 'assets',
            flatten: false
          }
        ]
      })
    );
  }


  console.log('OAuth env variables loaded:', {
    clientId: env.VITE_OAUTH_CLIENT_ID ? 'Present' : 'Missing',
    proxyDomain: env.VITE_PROXY_DOMAIN ? 'Present' : 'Missing',
    lmsDomain: env.VITE_LEARNING_PLATFORM_API ? 'Present' : 'Missing',
  });

  // Make sure we have the required environment variables
  if (!env.VITE_OAUTH_CLIENT_ID || !env.VITE_PROXY_DOMAIN) {
    console.warn('WARNING: Missing environment variables. OAuth authentication may not work properly.');
    console.warn('Make sure you have VITE_OAUTH_CLIENT_ID and VITE_PROXY_DOMAIN in your .env.local file');
  }
  let baseUrl = env.BASE_URL ? env.BASE_URL : 'foundations-course';
  console.log("baseUrl: ",baseUrl);

  return {
    base: `/${baseUrl}/`,
    plugins,
    // Make env variables available to client-side code
    define: {
      'process.env.VITE_OAUTH_CLIENT_ID': JSON.stringify(env.VITE_OAUTH_CLIENT_ID),
      'process.env.VITE_PROXY_DOMAIN': JSON.stringify(env.VITE_PROXY_DOMAIN),
      'process.env.VITE_LEARNING_PLATFORM_API': JSON.stringify(env.VITE_LEARNING_PLATFORM_API),
    },
  }
})
