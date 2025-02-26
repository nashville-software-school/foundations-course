/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
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
    height: 95%;
  }

  .bottom-area {
    height: 5%;
    background: #343a40;
    color: #fff;
    padding: 1rem;
    text-align: center;
  }

  .nav-sidebar {
    background: #f6f8fa;
    flex-basis: 20%;
    border-right: 1px solid #e9ecef;
    overflow-y: auto;
    padding: 2rem 1rem;
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
      <div className="bottom-area">
        <footer>
          <p>&copy; 2021</p>
        </footer>
      </div>
    </div>
  )
}

export default Layout