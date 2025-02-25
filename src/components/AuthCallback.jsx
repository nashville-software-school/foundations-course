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
            const params = new URLSearchParams(location.search)
            const code = params.get('code')

            if (!code) {
                setError('No code received from Github')
                return
            }

            try {
                // Use a reliable CORS proxy service
                const proxyUrl = 'https://api.allorigins.win/raw?url='
                const tokenUrl = 'https://github.com/login/oauth/access_token'
                const encodedUrl = encodeURIComponent(tokenUrl)

                // Exchange code for token using Github's token endpoint
                const tokenResponse = await fetch(`${proxyUrl}${encodedUrl}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
                        client_secret: import.meta.env.VITE_OAUTH_CLIENT_SECRET,
                        code: code,
                        redirect_uri: `${window.location.origin}/foundations-course/auth`
                    })
                })

                if (!tokenResponse.ok) {
                    throw new Error('Failed to exchange code for token')
                }

                const data = await tokenResponse.json()

                if (data.error) {
                    throw new Error(data.error_description || data.error)
                }

                // Store the token
                localStorage.setItem('github_token', data.access_token)

                // Fetch user data
                await fetchUserData(data.access_token)

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

    return <div>Completing authentication...</div>
}

export default AuthCallback