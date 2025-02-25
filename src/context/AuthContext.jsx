import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Check token and fetch user data on mount
    useEffect(() => {
        const token = localStorage.getItem('github_token')
        if (token) {
            fetchUserData(token)
        } else {
            setLoading(false)
        }
    }, [])

    const fetchUserData = async (token) => {
        try {
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.ok) {
                const userData = await response.json()
                setUser(userData)
                setIsAuthenticated(true)
            } else {
                // Token invalid or expired
                localStorage.removeItem('github_token')
                setUser(null)
                setIsAuthenticated(false)
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
            setUser(null)
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    const login = () => {
        const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID
        const redirectUri = `${window.location.origin}/foundations-course/auth`
        const scope = 'read:user' // Minimum scope needed for basic profile info
        // Standard authorization code flow
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
    }

    const logout = () => {
        localStorage.removeItem('github_token')
        setUser(null)
        setIsAuthenticated(false)
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, fetchUserData }}>
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