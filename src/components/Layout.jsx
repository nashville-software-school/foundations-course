/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import { css } from '@emotion/react'

const layoutStyles = css`
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;

  .nav-sidebar {
    background: #f6f8fa;
    border-right: 1px solid #e9ecef;
    height: 100vh;
    overflow-y: auto;
    padding: 2rem 1rem;
  }

  .main-content {
    height: 100vh;
    overflow: hidden;
    background: #f9f5ee;
  }
`

function Layout() {
  return (
    <div css={layoutStyles}>
      <nav className="nav-sidebar">
        <Navigation />
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout