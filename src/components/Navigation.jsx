/** @jsxImportSource @emotion/react */
import { Link, useLocation } from 'react-router-dom'
import { useChapter } from '../context/ChapterContext'
import { useLearnerProgress } from '../context/LearnerProgressContext'
import { useAuth } from '../context/AuthContext'
import { sections } from '../sections'
import { css } from '@emotion/react'
import SectionHeader from './SectionHeader'
import { useState, useEffect } from 'react'

const navStyles = css`
  h2 {
    color: #2c3e50;
    margin: 0 0 1rem 0;
  }

  .section {
    margin-bottom: 0;
  }
  .section-group {
    margin-bottom: 1.5rem;
  }

  .required-work-header {
    margin: 0.5rem 0 0.5rem 0;

  }

  .additional-work-header {
    margin: 1.5rem 0 1rem 0;
    padding-top: 1.5rem;
    border-top: 1px solid #dee2e6;
  }

  .additional-work-header h3 {
    color: #495057;
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }

  .additional-work-description {
    color: #6c757d;
    font-size: 0.9rem;
    margin: 0 0 1rem 0;
    font-style: italic;
  }
  .section-content {
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;

    &.collapsed {
      max-height: 0;
    }

    &.expanded {
      max-height: 1000px;
    }
  }

  .chapter-list {
    list-style: none;
    padding: 0.5rem 0 0;
    margin: 0;
  }

  .chapter-item {
    margin: 0.1rem 0;
  }

  .chapter-link {
    display: flex;
    align-items: center;
    padding: 0.4rem 0.8rem;
    color: #2c3e50;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.2s ease;
    font-size: 0.95rem;
    line-height: 1.1;
    border: 1px solid transparent;
    min-height: 36px;

    .chapter-title {
      flex: 1;
      margin-right: 0.5rem;
    }

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

    &.completed {
      color: #28a745;
      font-weight: 500;

      .chapter-number {
        background: #28a745;
        color: white;
      }

      .status-icon {
        color: #28a745;
      }
    }

    &.in-progress {
      color: #007bff;

      .chapter-number {
        background: #007bff;
        color: white;
      }

      .status-icon {
        color: #007bff;
      }
    }

    &.protected {
      opacity: 0.7;

      .lock-icon {
        color: #6c757d;
        margin-left: 0.5rem;
        font-size: 0.9rem;
      }
    }

    &.prerequisite-locked {
      opacity: 0.75;
      background-color: #fff8e1;
      border-color: #ffcc02;
      color: #e65100;
      cursor: not-allowed;

      &:hover {
        background-color: #fff3c4;
        border-color: #ffb300;
      }

      .chapter-number {
        background: #ffb300;
        color: white;
      }

      .lock-icon {
        color: #ff8f00;
        margin-left: 0.5rem;
        font-size: 1rem;
      }
    }
  }

  .chapter-number {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #dee2e6;
    color: #495057;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin-right: 0.75rem;
    font-size: 0.8rem;
    font-weight: 600;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .active .chapter-number {
    background: #339af0;
    color: white;
  }

  .status-icon {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .section-progress {
    padding: 0.2rem 0.4rem 0.75rem 0.4rem;
    background: #f8f9fa;
    border-radius: 0.5rem;
    border: 1px solid #dee2e6;

    .progress-text {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      color: #495057;
      font-size: 0.9rem;
    }

    .progress-bar-container {
      height: 6px;
      background: #e9ecef;
      border-radius: 3px;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background: #28a745;
      border-radius: 3px;
      transition: width 0.3s ease;
    }

    .progress-stats {
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: #6c757d;
    }
  }

  .prerequisite-tooltip {
    position: absolute;
    background: #2c3e50;
    color: white;
    padding: 0.75rem;
    border-radius: 6px;
    font-size: 0.85rem;
    line-height: 1.4;
    max-width: 280px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    &::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 20px;
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #2c3e50;
    }

    .tooltip-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #ffb300;
    }

    .tooltip-progress {
      margin: 0.5rem 0;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;

      .progress-bar-small {
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        margin-top: 0.25rem;
        overflow: hidden;

        .progress-fill {
          height: 100%;
          background: #ffb300;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
      }
    }
  }
`

const LockIcon = () => (
  <span className="lock-icon" role="img" aria-label="Protected content">
    🔒
  </span>
)

const PrerequisiteIcon = ({ onClick }) => (
  <span
    className="lock-icon"
    role="img"
    aria-label="Prerequisites required"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    🤔
  </span>
)

// Tooltip component for prerequisite information
const PrerequisiteTooltip = ({ chapter, getSectionProgress, position, onClose }) => {
  if (!chapter.requiresPrerequisite) return null

  const { sectionId, completionPercentage } = chapter.requiresPrerequisite
  const progress = getSectionProgress(sectionId)
  const sectionName = sectionId === 'getting-started' ? 'Getting Started' : sectionId

  return (
    <div
      className="prerequisite-tooltip"
      style={{
        top: position.top,
        left: position.left,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="tooltip-title">🤔 Prerequisites Required</div>
      <div>Complete the <strong>{sectionName}</strong> section to unlock this chapter.</div>
      <div className="tooltip-progress">
        <div>Progress: {progress.completedChapters}/{progress.totalChapters} chapters ({progress.percentage}%)</div>
        <div className="progress-bar-small">
          <div
            className="progress-fill"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', opacity: 0.8 }}>
          {progress.percentage >= completionPercentage ?
            '✅ Requirements met! Refresh to unlock.' :
            `Need ${completionPercentage}% completion to unlock.`
          }
        </div>
      </div>
    </div>
  )
}

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
  const { chapters, isSectionExpanded, toggleSection } = useChapter()
  const { getExerciseProgress, trackCompletion, checkPrerequisites, getSectionProgress } = useLearnerProgress()
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const groupedChapters = groupChaptersBySection(chapters)

  // State for tooltip
  const [tooltipState, setTooltipState] = useState({
    visible: false,
    chapter: null,
    position: { top: 0, left: 0 }
  })

  const getChapterStatus = (chapterId) => {
    const progress = getExerciseProgress(chapterId)
    if (progress.completed) return 'completed'
    if (progress.attempts > 0) return 'in-progress'
    return 'not-started'
  }

  const calculateSectionProgress = (sectionChapters) => {
    const total = sectionChapters.length
    const completed = sectionChapters.filter(
      chapter => getExerciseProgress(chapter.id).completed
    ).length
    const inProgress = sectionChapters.filter(
      chapter => !getExerciseProgress(chapter.id).completed &&
        getExerciseProgress(chapter.id).attempts > 0
    ).length

    return {
      completed,
      inProgress,
      percentage: (completed / total) * 100
    }
  }

  // Handle prerequisite icon click to show tooltip
  const handlePrerequisiteClick = (event, chapter) => {
    event.preventDefault()
    event.stopPropagation()

    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipState({
      visible: true,
      chapter,
      position: {
        top: rect.bottom + 8,
        left: rect.left - 120
      }
    })
  }

  // Close tooltip when clicking outside
  const handleDocumentClick = () => {
    setTooltipState(prev => ({ ...prev, visible: false }))
  }

  // Add event listener for closing tooltip
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  // Helper function to render a section
  const renderSection = (section) => {
    const sectionChapters = groupedChapters[section.id] || []
    if (sectionChapters.length === 0) return null

    const isExpanded = isSectionExpanded(section.id)
    const progress = calculateSectionProgress(sectionChapters)

    return (
      <div key={section.id} className="section">
        <SectionHeader
          section={section}
          isExpanded={isExpanded}
          onToggle={() => toggleSection(section.id)}
        />

        <div className={`section-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="section-progress">
            <div className="progress-text">
              <span>{Math.round(progress.percentage)}% Complete</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>

          <ul className="chapter-list">
            {sectionChapters.map((chapter, index) => {
              const status = getChapterStatus(chapter.id)
              const isAuthProtected = chapter.requiresAuth && !isAuthenticated
              const isPrerequisiteLocked = chapter.requiresPrerequisite && !checkPrerequisites(chapter)
              const isProtected = isAuthProtected || isPrerequisiteLocked

              // Determine the appropriate CSS class
              let linkClass = `chapter-link ${status}`
              if (location.pathname === chapter.id) linkClass += ' active'
              if (isAuthProtected) linkClass += ' protected'
              if (isPrerequisiteLocked) linkClass += ' prerequisite-locked'

              return (
                <li key={chapter.id} className="chapter-item">
                  <Link
                    to={isProtected ? (isAuthProtected ? '/login' : '#') : chapter.id}
                    className={linkClass}
                    onClick={isPrerequisiteLocked ? (e) => e.preventDefault() : undefined}
                  >
                    <span className="chapter-number">{index + 1}</span>
                    <span className="chapter-title">{chapter.title}</span>
                    {isAuthProtected && <LockIcon />}
                    {isPrerequisiteLocked && (
                      <PrerequisiteIcon
                        onClick={(e) => handlePrerequisiteClick(e, chapter)}
                      />
                    )}
                    {!isProtected && status !== 'not-started' ? (
                      <span className="status-icon">
                        {status === 'completed' ? '✓' : '●'}
                      </span>
                    ) : (!isProtected && chapter.exercise === null && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          trackCompletion(chapter.id)
                        }}
                        css={css`
                          background: #e9ecef;
                          border: 1px solid #dee2e6;
                          border-radius: 4px;
                          padding: 2px 8px;
                          font-size: 0.8rem;
                          cursor: pointer;
                          color: #495057;
                          transition: all 0.2s ease;
                          &:hover {
                            background: #dee2e6;
                            border-color: #ced4da;
                          }
                        `}
                      >
                        Done
                      </button>
                    ))}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  // Filter sections into required and optional
  const requiredSections = sections.filter(section => section.required || (!section.optional && !section.required))
  const optionalSections = sections.filter(section => section.optional)

  return (
    <nav css={navStyles}>
      {/* Required Sections */}
      <div className="required-work-header">
        <h3>Required Work</h3>
        <p className="additional-work-description">
          These sections are required to complete the Foundations Course
        </p>
      </div>
      <div className="section-group required-sections">
        {requiredSections.map(renderSection)}
      </div>

      {/* Optional Sections */}
      {optionalSections.length > 0 && (
        <div className="section-group optional-sections">
          <div className="additional-work-header">
            <h3>Additional Work</h3>
            <p className="additional-work-description">
              The following sections are optional if you want to practice your skills
            </p>
          </div>

          {optionalSections.map(renderSection)}
        </div>
      )}

      {/* Render tooltip if visible */}
      {tooltipState.visible && tooltipState.chapter && (
        <PrerequisiteTooltip
          chapter={tooltipState.chapter}
          getSectionProgress={getSectionProgress}
          position={tooltipState.position}
          onClose={() => setTooltipState(prev => ({ ...prev, visible: false }))}
        />
      )}
    </nav>
  )
}

export default Navigation