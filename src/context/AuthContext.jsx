import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // State for dialog visibility
    const [showNameDialog, setShowNameDialog] = useState(false)

    useEffect(() => {
        if (user && "name" in user && user.name === null) {
            setShowNameDialog(true)
        }
    }, [user])

    // Define fetchUserData with useCallback to avoid recreation on each render
    const fetchUserData = useCallback(async (token) => {
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
                // Ensure token is saved in localStorage (in case it was passed directly)
                localStorage.setItem('github_token', token)
                return true
            } else {
                console.error('Failed to fetch user data:', response.status, response.statusText);
                // Token invalid or expired
                localStorage.removeItem('github_token')
                setUser(null)
                setIsAuthenticated(false)
                return false
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
            localStorage.removeItem('github_token')
            setUser(null)
            setIsAuthenticated(false)
            return false
        } finally {
            setLoading(false)
        }
    }, [])

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
    }, [fetchUserData])

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
            {showNameDialog && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '5px',
                        maxWidth: '500px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                    }}>
                        <h3 style={{ marginTop: 0 }}>GitHub Profile Incomplete</h3>
                        <p>
                            Your GitHub profile is missing a name. Please update your profile with your full name. When you're done, click the button below to refresh your profile.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <button
                                onClick={() => {
                                    setShowNameDialog(false)
                                    fetchUserData(localStorage.getItem('github_token'))
                                }}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#f1f1f1',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Verify and Refresh
                            </button>
                            <a
                                href="https://github.com/settings/profile"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#2ea44f',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '4px',
                                    display: 'inline-block'
                                }}
                            >
                                Update GitHub Profile
                            </a>
                        </div>
                    </div>
                </div>
            )}
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