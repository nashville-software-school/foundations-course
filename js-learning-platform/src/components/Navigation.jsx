/** @jsxImportSource @emotion/react */
import { Link, useLocation } from 'react-router-dom'
import { useChapter } from '../context/ChapterContext'
import { sections, getSectionById } from '../sections'
import { css } from '@emotion/react'

const navStyles = css`
  h2 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
    padding-left: 1rem;
  }

  .section {
    margin-bottom: 0.5rem;
  }

  .section-title {
    color: #495057;
    font-size: 1.1rem;
    font-weight: 600;
    background: #f8f9fa;
    border-radius: 6px;
  }

  .chapter-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .chapter-item {
    margin: 0.1rem 0;
  }

  .chapter-link {
    display: block;
    padding: 0.4rem;
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

/**
 * Groups chapters by their section and orders them by previousChapterId
 * @param {Array} chapters - Array of chapter objects
 * @returns {Object} Chapters grouped by section
 */
const groupChaptersBySection = (chapters) => {
  // First, group chapters by section
  const groupedChapters = chapters.reduce((acc, chapter) => {
    if (!acc[chapter.sectionId]) {
      acc[chapter.sectionId] = []
    }
    acc[chapter.sectionId].push(chapter)
    return acc
  }, {})

  // Then order chapters within each section
  Object.keys(groupedChapters).forEach(sectionId => {
    const sectionChapters = groupedChapters[sectionId]
    const orderedChapters = []

    // Find the first chapter (no previousChapterId)
    let currentChapter = sectionChapters.find(c => !c.previousChapterId)

    while (currentChapter) {
      orderedChapters.push(currentChapter)
      currentChapter = sectionChapters.find(c => c.previousChapterId === currentChapter.id)
    }

    groupedChapters[sectionId] = orderedChapters
  })

  return groupedChapters
}

function Navigation() {
  const { chapters } = useChapter()
  const location = useLocation()
  const groupedChapters = groupChaptersBySection(chapters)

  return (
    <nav css={navStyles}>
      <h2>Chapters</h2>
      {sections.map(section => {
        const sectionChapters = groupedChapters[section.id] || []
        if (sectionChapters.length === 0) return null

        return (
          <div key={section.id} className="section">
            <h3 className="section-title">{section.title}</h3>
            <ul className="chapter-list">
              {sectionChapters.map((chapter, index) => (
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
          </div>
        )
      })}
    </nav>
  )
}

export default Navigation