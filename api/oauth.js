// api/oauth.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code, redirect_uri } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code parameter is required' });
    }

    // Exchange code for token using native fetch
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code: code,
        redirect_uri: redirect_uri
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error:', response.status, errorText);
      return res.status(response.status).json({
        error: 'GitHub API error',
        status: response.status,
        details: errorText
      });
    }

    const data = await response.json();

    // Check for error in response
    if (data.error) {
      console.error('GitHub API returned error:', data.error);
      return res.status(400).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('OAuth error:', error);
    return res.status(500).json({ error: 'Failed to exchange code for token', details: error.message });
  }
}