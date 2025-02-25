import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { css } from '@emotion/react'
import AuthButton from './AuthButton'

const styles = {
    container: css`
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        text-align: center;
    `,
    title: css`
        font-size: 1.5rem;
        margin-bottom: 1rem;
    `,
    message: css`
        margin-bottom: 2rem;
        color: #666;
    `,
    divider: css`
        margin: 2rem 0;
        border: none;
        border-top: 1px solid #eee;
    `,
    freeContent: css`
        text-align: left;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 4px;
        margin-top: 2rem;
    `,
    list: css`
        list-style-type: none;
        padding: 0;
        margin: 1rem 0;
    `,
    listItem: css`
        padding: 0.5rem 0;
        color: #666;
    `
}

export const Login = () => {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (isAuthenticated) {
            const intendedPath = sessionStorage.getItem('intendedPath')
            sessionStorage.removeItem('intendedPath')
            navigate(intendedPath || '/', { replace: true })
        }
    }, [isAuthenticated, navigate])

    return (
        <div css={styles.container}>
            <h1 css={styles.title}>Sign in to access advanced content</h1>
            <p css={styles.message}>
                Unlock advanced JavaScript topics by signing in with your Github account.
            </p>

            <AuthButton />

            <hr css={styles.divider} />

            <div css={styles.freeContent}>
                <h2>Available without sign in:</h2>
                <ul css={styles.list}>
                    <li css={styles.listItem}>• Getting Started Guide</li>
                    <li css={styles.listItem}>• Variables and Values</li>
                    <li css={styles.listItem}>• Basic JavaScript Concepts</li>
                </ul>
                <p>Sign in to access Arrays, Objects, Functions, and more advanced topics!</p>
            </div>
        </div>
    )
}

export default Login