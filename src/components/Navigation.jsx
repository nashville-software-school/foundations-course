/** @jsxImportSource @emotion/react */
import { Link, useLocation } from "react-router-dom"
import { useChapter } from "../context/ChapterContext"
import { useLearnerProgress } from "../context/LearnerProgressContext"
import { useAuth } from "../context/AuthContext"
import { sections } from "../sections"
import { css } from "@emotion/react"
import SectionHeader from "./SectionHeader"

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
`

const LockIcon = () => (
  <span className="lock-icon" role="img" aria-label="Protected content">
    🔒
  </span>
)

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
  Object.keys(groupedChapters).forEach((sectionId) => {
    const sectionChapters = groupedChapters[sectionId]
    const orderedChapters = []

    // Find the first chapter (no previousChapterId)
    let currentChapter = sectionChapters.find((c) => !c.previousChapterId)

    while (currentChapter) {
      orderedChapters.push(currentChapter)
      currentChapter = sectionChapters.find(
        (c) => c.previousChapterId === currentChapter.id
      )
    }

    groupedChapters[sectionId] = orderedChapters
  })

  return groupedChapters
}

function Navigation() {
  const { chapters, isSectionExpanded, toggleSection } = useChapter()
  const { getExerciseProgress, trackCompletion } = useLearnerProgress()
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const groupedChapters = groupChaptersBySection(chapters)

  const getChapterStatus = (chapterId) => {
    const progress = getExerciseProgress(chapterId)
    if (progress.completed) return "completed"
    if (progress.attempts > 0) return "in-progress"
    return "not-started"
  }

  const calculateSectionProgress = (sectionChapters) => {
    const total = sectionChapters.length
    const completed = sectionChapters.filter(
      (chapter) => getExerciseProgress(chapter.id).completed
    ).length
    const inProgress = sectionChapters.filter(
      (chapter) =>
        !getExerciseProgress(chapter.id).completed &&
        getExerciseProgress(chapter.id).attempts > 0
    ).length

    return {
      completed,
      inProgress,
      percentage: (completed / total) * 100,
    }
  }

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

        <div
          className={`section-content ${isExpanded ? "expanded" : "collapsed"}`}
        >
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
              const isProtected = chapter.requiresAuth && !isAuthenticated
              return (
                <li key={chapter.id} className="chapter-item">
                  <Link
                    to={isProtected ? "/login" : chapter.id}
                    className={`chapter-link ${status} ${
                      location.pathname?.slice(1) === chapter.id ? "active" : ""
                    } ${isProtected ? "protected" : ""}`}
                  >
                    <span className="chapter-number">{index + 1}</span>
                    <span className="chapter-title">{chapter.title}</span>
                    {isProtected && <LockIcon />}
                    {!isProtected && status !== "not-started" ? (
                      <span className="status-icon">
                        {status === "completed" ? "✓" : "●"}
                      </span>
                    ) : (
                      !isProtected &&
                      chapter.exercise === null && (
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
                      )
                    )}
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
  // Workshop 1 sections
  const requiredSections = sections.filter(
    (section) => section.required || (!section.optional && !section.required)
  )
  const optionalSections = sections.filter(
    (section) => section.optional
  )


  return (
    <nav css={navStyles}>
      {/* Required Sections*/}
      <div className="required-work-header">
        <h3>AWS Cloud and DevOps Fundamentals</h3>
        <div className="section-group required-sections">
          {requiredSections.map(renderSection)}
        </div>
      </div>
      {/* Optional Sections */}
      {optionalSections.length > 0 && (
        <div className="section-group optional-sections">
          <div className="additional-work-header">
            <h3>Additional Work</h3>
            <p className="additional-work-description">
              The following sections are optional if you want to practice your
              skills
            </p>
          </div>

          {optionalSections.map(renderSection)}
        </div>
      )}
    </nav>
  )
}

export default Navigation
