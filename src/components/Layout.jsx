/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import GlobalProgressBar from './GlobalProgressBar'
import AuthButton from './AuthButton'
import NavigationToggle from './NavigationToggle'
import { css } from '@emotion/react'

const layoutStyles = css`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  height: 100vh;

  .top-navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    height: 2.2rem;
    background-color:rgb(46, 64, 97);
    border-bottom: 1px solid #e9ecef;
  }

  .app-name {
    font-weight: bold;
    font-size: 1.1rem;
    color:rgb(170, 212, 255);
  }

  .content-area {
    display: flex;
    flex-direction: row;
    height: calc(93% - 50px); /* Adjusted for top navbar */
  }

  .footer-container {
    min-height: 7%;
    background:rgb(46, 64, 97);
    color: #fff;
    padding: 0 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .nav-sidebar {
    background: #f6f8fa;
    border-right: 1px solid #e9ecef;
    overflow-y: auto;
    position: relative;
    transition: all 0.3s ease;
    min-width: 0;
    z-index: 100;
  }

  .nav-sidebar.expanded {
    flex-basis: 20%;
    min-width: 200px;
    transition: all 0.3s ease;
  }

  .nav-sidebar.collapsed {
    flex-basis: 40px;
    min-width: 40px;
    max-width: 40px;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .nav-content {
    padding: 0 1rem 2rem 1rem;
    width: 100%;
    transition: opacity 0.3s ease;
  }

  .nav-sidebar.collapsed .nav-content {
    opacity: 0;
    pointer-events: none;
  }

  .main-content {
    flex: 1;
    overflow-y: auto;
    background: #f9f5ee;
    padding: 0 0 0.5rem 0;
  }
`

function Layout() {
  const [isNavExpanded, setIsNavExpanded] = useState(true);

  // Load saved state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('navExpanded');
    if (savedState !== null) {
      setIsNavExpanded(savedState === 'true');
    }
  }, []);

  // Toggle navigation state and save to localStorage
  const toggleNavigation = () => {
    const newState = !isNavExpanded;
    setIsNavExpanded(newState);
    localStorage.setItem('navExpanded', newState.toString());
  };

  return (
    <div css={layoutStyles}>
      <header className="top-navbar">
        <div className="app-name">
          Nashville Software School: Foundations Course
        </div>
        <div className="auth-container">
          <AuthButton />
        </div>
      </header>
      <div className="content-area">
        <nav className={`nav-sidebar ${isNavExpanded ? 'expanded' : 'collapsed'}`}>
            <NavigationToggle
              isExpanded={isNavExpanded}
              onToggle={toggleNavigation}
            />
          <div className="nav-content">
            <Navigation />
          </div>
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