/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import GlobalProgressBar from './GlobalProgressBar'
import { css } from '@emotion/react'

const layoutStyles = css`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  height: 100vh;

  .top-area {
    display: flex;
    flex-direction: row;
    height: 93%;
  }

  .footer-container {
    min-height: 7%;
    background:rgb(70, 87, 103);
    color: #fff;
    padding: 0 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .nav-sidebar {
    background: #f6f8fa;
    flex-basis: 20%;
    border-right: 1px solid #e9ecef;
    overflow-y: auto;
    padding: 0 1rem 2rem 1rem;
  }

  .main-content {
    flex-basis: 80%;
    overflow-y: auto;
    background: #f9f5ee;
    padding: 0 0 0.5rem 0;
  }
`

function Layout() {
  return (
    <div css={layoutStyles}>
      <div className="top-area">
        <nav className="nav-sidebar">
          <Navigation />
        </nav>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <div className="footer-container">
        <GlobalProgressBar />
      </div>
    </div>
  )
}

export default Layout