// vite-plugin-github-oauth.js
// Using native fetch API instead of node-fetch

export default function githubOAuthPlugin(options = {}) {
  // Get OAuth credentials from options
  const { clientId, clientSecret } = options;

  return {
    name: 'vite-plugin-github-oauth',
    configureServer(server) {
      // Log the plugin initialization with credential status
      console.log('[OAuth Plugin] GitHub OAuth plugin initialized with credentials:', {
        clientId: clientId ? 'Present' : 'Missing',
        clientSecret: clientSecret ? 'Present' : 'Missing'
      });

      // Add middleware to handle GitHub OAuth token exchange
      server.middlewares.use(async (req, res, next) => {
        // Log the request for debugging
        console.log('[OAuth Plugin] Request URL:', req.url, 'Method:', req.method);

        // Check if the URL starts with or exactly matches the OAuth path
        // This is more flexible and handles both /oauth/github/token and /foundations-course/oauth/github/token
        if ((req.url === '/oauth/github/token' || req.url.endsWith('/oauth/github/token')) && req.method === 'POST') {
          console.log('[OAuth Plugin] Handling OAuth token exchange request');

          // Enable CORS
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

          // Handle preflight request
          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return;
          }

          // Extract data from request
          const chunks = [];
          req.on('data', (chunk) => chunks.push(chunk));

          await new Promise((resolve) => {
            req.on('end', resolve);
          });

          try {
            const data = JSON.parse(Buffer.concat(chunks).toString());
            console.log('[OAuth Plugin] Received OAuth data:', {
              ...data,
              code: data.code ? 'REDACTED' : undefined
            });

            // Check for required parameters
            if (!data.code) {
              console.error('[OAuth Plugin] Missing code parameter');
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Missing code parameter' }));
              return;
            }

            // Check if we have OAuth credentials
            if (!clientId || !clientSecret) {
              console.error('[OAuth Plugin] Missing OAuth credentials');
              res.statusCode = 500;
              res.end(JSON.stringify({
                error: 'Missing OAuth credentials',
                details: 'Check VITE_OAUTH_CLIENT_ID and VITE_OAUTH_CLIENT_SECRET in .env.local'
              }));
              return;
            }

            console.log('[OAuth Plugin] Calling GitHub API with client ID:', clientId.substring(0, 4) + '...');

            // Exchange code for token with GitHub using native fetch
            const response = await fetch('https://github.com/login/oauth/access_token', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code: data.code,
                redirect_uri: data.redirect_uri
              })
            });

            console.log('[OAuth Plugin] GitHub API response status:', response.status);

            if (!response.ok) {
              const errorText = await response.text();
              console.error('[OAuth Plugin] GitHub API error:', response.status, errorText);
              res.statusCode = response.status;
              res.end(JSON.stringify({
                error: 'GitHub API error',
                status: response.status,
                details: errorText
              }));
              return;
            }

            const tokenData = await response.json();

            // Check for error in response
            if (tokenData.error) {
              console.error('[OAuth Plugin] GitHub API returned error:', tokenData.error);
              res.statusCode = 400;
              res.end(JSON.stringify(tokenData));
              return;
            }

            // Send token response back to client
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(tokenData));
            console.log('[OAuth Plugin] Token exchange completed successfully');
          } catch (error) {
            console.error('[OAuth Plugin] OAuth token exchange error:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({
              error: 'Failed to exchange code for token',
              details: error.message
            }));
          }
        } else {
          next();
        }
      });
    }
  };
}