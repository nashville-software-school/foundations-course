/** @jsxImportSource @emotion/react */
import { Link, useLocation } from 'react-router-dom'
import { useChapter } from '../context/ChapterContext'
import { css } from '@emotion/react'

const navStyles = css`
  h2 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
    padding-left: 1rem;
  }

  .chapter-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .chapter-item {
    margin: 0.5rem 0;
  }

  .chapter-link {
    display: block;
    padding: 1rem;
    color: #2c3e50;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.2s ease;
    font-size: 0.95rem;
    line-height: 1.4;
    border: 1px solid transparent;

    &:hover {
      background-color: #e9ecef;
      border-color: #dee2e6;
    }

    &.active {
      background-color: #e7f5ff;
      border-color: #339af0;
      color: #1971c2;
      font-weight: 500;
    }
  }

  .chapter-number {
    display: inline-block;
    background: #dee2e6;
    color: #495057;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 12px;
    margin-right: 0.75rem;
    font-size: 0.8rem;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .active .chapter-number {
    background: #339af0;
    color: white;
  }
`

function Navigation() {
  const { chapters } = useChapter()
  const location = useLocation()

  return (
    <nav css={navStyles}>
      <h2>Chapters</h2>
      <ul className="chapter-list">
        {chapters.map((chapter, index) => (
          <li key={chapter.id} className="chapter-item">
            <Link
              to={chapter.path}
              className={`chapter-link ${
                location.pathname === chapter.path ? 'active' : ''
              }`}
            >
              <span className="chapter-number">{index + 1}</span>
              {chapter.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation