import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Check token and fetch user data on mount
    useEffect(() => {
        console.log('AuthProvider initialized, checking for existing token');
        const token = localStorage.getItem('github_token')
        if (token) {
            console.log('Found existing token, fetching user data');
            fetchUserData(token)
        } else {
            console.log('No token found, user is not authenticated');
            setLoading(false)
        }
    }, [])

    const fetchUserData = async (token) => {
        try {
            console.log('Fetching user data from GitHub API');
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.ok) {
                const userData = await response.json()
                console.log('User data fetched successfully:', userData.login);
                setUser(userData)
                setIsAuthenticated(true)
            } else {
                console.error('Failed to fetch user data:', response.status, response.statusText);
                // Token invalid or expired
                localStorage.removeItem('github_token')
                setUser(null)
                setIsAuthenticated(false)
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
            localStorage.removeItem('github_token')
            setUser(null)
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    const login = () => {
        console.log('Initiating GitHub OAuth login flow');
        const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID

        if (!clientId) {
            console.error('Missing VITE_OAUTH_CLIENT_ID environment variable');
            alert('OAuth configuration error. Please contact support.');
            return;
        }

        // Get the base URL from Vite or use the default
        const base = import.meta.env.BASE_URL || '/foundations-course/';
        const basePath = base.endsWith('/') ? base.slice(0, -1) : base;

        // Ensure the redirect URI includes the base path for both dev and prod
        const redirectUri = `${window.location.origin}${basePath}/auth`;
        console.log('Using redirect URI:', redirectUri);

        const scope = 'read:user' // Minimum scope needed for basic profile info

        // Add a state parameter for security
        const state = Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('oauth_state', state);

        // Standard authorization code flow
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
        console.log('Redirecting to GitHub OAuth:', authUrl);
        window.location.href = authUrl;
    }

    const logout = () => {
        console.log('Logging out user');
        localStorage.removeItem('github_token')
        setUser(null)
        setIsAuthenticated(false)
    }

    if (loading) {
        return <div>Loading authentication status...</div>
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            login,
            logout,
            fetchUserData
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}