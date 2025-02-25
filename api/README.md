# GitHub OAuth API

This directory contains a serverless function that handles the GitHub OAuth token exchange for the Foundations Course application.

## Deployment Instructions

This API can be deployed separately from the main application. Here are the steps to deploy it to Vercel:

### Option 1: Deploy with Vercel

1. Create a new repository for this API (e.g., `foundations-course-api`)
2. Copy the `api` directory to the root of the new repository
3. Create an account on [Vercel](https://vercel.com) if you don't have one
4. Connect your GitHub account and import the repository
5. Configure the following environment variables:
   - `OAUTH_CLIENT_ID`: Your GitHub OAuth App client ID
   - `OAUTH_CLIENT_SECRET`: Your GitHub OAuth App client secret
6. Deploy the application

Once deployed, you'll get a URL like `https://foundations-course-api.vercel.app`

### Option 2: Deploy with Netlify

1. Create a new repository for this API (e.g., `foundations-course-api`)
2. Copy the `api` directory to the root of the new repository
3. Create a `netlify.toml` file with the following content:
   ```toml
   [build]
     functions = "api"

   [[redirects]]
     from = "/oauth/github/token"
     to = "/.netlify/functions/oauth"
     status = 200
   ```
4. Create an account on [Netlify](https://netlify.com) if you don't have one
5. Connect your GitHub account and import the repository
6. Configure the following environment variables:
   - `OAUTH_CLIENT_ID`: Your GitHub OAuth App client ID
   - `OAUTH_CLIENT_SECRET`: Your GitHub OAuth App client secret
7. Deploy the application

Once deployed, you'll get a URL like `https://foundations-course-api.netlify.app`

## Update the Main Application

After deploying this API, update the `AuthCallback.jsx` component in the main application to use the production API endpoint:

```javascript
const tokenEndpoint = import.meta.env.DEV
    ? '/oauth/github/token'  // Development endpoint (handled by Vite plugin)
    : 'https://your-api-url.vercel.app/oauth/github/token'  // Production endpoint
```

Replace `https://your-api-url.vercel.app` with your actual deployed API URL.

## Implementation Details

The API function:
- Uses native fetch API for HTTP requests
- Securely handles the GitHub OAuth token exchange
- Includes CORS headers for cross-origin requests
- Provides detailed error responses for debugging

## Local Development

For local development, you don't need to deploy this API. The Vite plugin in the main application handles the OAuth token exchange during development.