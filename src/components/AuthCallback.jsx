import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const AuthCallback = () => {
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const { fetchUserData } = useAuth()

    useEffect(() => {
        const handleAuth = async () => {
            console.log('Auth callback triggered');
            const params = new URLSearchParams(location.search)
            const code = params.get('code')
            const state = params.get('state')
            const storedState = sessionStorage.getItem('oauth_state')

            // Clear stored state
            sessionStorage.removeItem('oauth_state')

            if (!code) {
                setError('No code received from Github')
                return
            }

            // Verify state parameter if it exists
            if (state && storedState && state !== storedState) {
                console.error('State parameter mismatch', { received: state, stored: storedState });
                setError('Invalid state parameter - possible security issue')
                return
            }

            try {
                console.log('Starting OAuth token exchange with code');

                // In dev mode, we get the base from vite.config.js
                // In production, we need to handle the base path '/foundations-course/'
                const base = import.meta.env.BASE_URL || '/foundations-course/';

                // Remove trailing slash if present for consistency
                const basePath = base.endsWith('/') ? base.slice(0, -1) : base;

                // Get the proxy domain from environment variables
                const proxyDomain = import.meta.env.VITE_PROXY_DOMAIN;

                if (!proxyDomain) {
                    console.error('Missing VITE_PROXY_DOMAIN environment variable');
                    throw new Error('OAuth configuration error. Please contact support.');
                }

                // Construct the token endpoint URL
                const tokenEndpoint = `${proxyDomain}/oauth/github/token`;

                console.log(`Using token endpoint: ${tokenEndpoint}`);
                console.log(`Redirect URI: ${window.location.origin}${basePath}/auth`);

                // Exchange code for token
                const tokenResponse = await fetch(tokenEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        code: code,
                        // Use the full origin + base path for the redirect URI
                        redirect_uri: `${window.location.origin}${basePath}/auth`
                    })
                })

                console.log('Token response status:', tokenResponse.status);

                if (!tokenResponse.ok) {
                    const errorText = await tokenResponse.text();
                    console.error('Token exchange error response:', errorText);
                    throw new Error(`Failed to exchange code for token: ${tokenResponse.status} ${errorText}`);
                }

                const data = await tokenResponse.json()
                console.log('Token exchange response received');

                if (data.error) {
                    throw new Error(data.error_description || data.error)
                }

                if (!data.access_token) {
                    console.error('Missing access token in response', data);
                    throw new Error('No access token received from GitHub');
                }

                // Store the token
                localStorage.setItem('github_token', data.access_token)
                console.log('Access token stored successfully');

                // Fetch user data
                const fetchSuccess = await fetchUserData(data.access_token)
                if (!fetchSuccess) {
                    throw new Error('Failed to fetch user data with the provided token')
                }
                console.log('User data fetched successfully');

                // Redirect to the page they were trying to access, or home
                const intendedPath = sessionStorage.getItem('intendedPath')
                sessionStorage.removeItem('intendedPath')
                navigate(intendedPath || '/', { replace: true })

            } catch (err) {
                console.error('Authentication error:', err)
                setError(`Authentication failed: ${err.message}. Please try again or contact support if the issue persists.`)
            }
        }

        handleAuth()
    }, [location, navigate, fetchUserData])

    if (error) {
        return (
            <div className="auth-error">
                <h2>Authentication Error</h2>
                <p>{error}</p>
                <button onClick={() => navigate('/')}>Return Home</button>
            </div>
        )
    }

    return <div>Completing GitHub authentication...</div>
}

export default AuthCallback