# Navigation Enhancement Plan

## Data Integration
1. Import and use the LearnerProgress context in Navigation component
2. Use the getExerciseProgress function to check completion status for each chapter
3. Add helper functions to calculate section progress

## Visual Enhancements

### 1. Chapter Status Indicators (Combined Approach)
Combine icons and colors for immediate visual feedback:

```css
.chapter-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  /* Existing styles remain */
  display: block;
  padding: 0.4rem;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  line-height: 1.4;
  border: 1px solid transparent;

  /* Status-based styles */
  &.completed {
    color: #28a745;
    font-weight: 500;

    .chapter-number {
      background: #28a745;
      color: white;
    }

    .status-icon {
      content: "✓";
      font-size: 14px;
      margin-left: auto;
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
      content: "●";
      font-size: 14px;
      margin-left: auto;
      color: #007bff;
    }
  }
}
```

### 2. Section Progress Bar
Add a progress bar after the chapters in each section:

```css
.section-progress {
  margin: 1rem 0.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
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
}
```

## Implementation Steps

1. Update Navigation Component:
```jsx
import { useLearnerProgress } from '../context/LearnerProgressContext'

function Navigation() {
  const { getExerciseProgress } = useLearnerProgress()
  const { chapters, isSectionExpanded, toggleSection } = useChapter()
  const location = useLocation()
  const groupedChapters = groupChaptersBySection(chapters)

  // Helper function to get chapter status
  const getChapterStatus = (chapterId) => {
    const progress = getExerciseProgress(chapterId)
    if (progress.completed) return 'completed'
    if (progress.attempts > 0) return 'in-progress'
    return 'not-started'
  }

  // Helper function to calculate section progress
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

  return (
    <nav css={navStyles}>
      <h2>Foundations Course</h2>
      {sections.map(section => {
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
              <ul className="chapter-list">
                {sectionChapters.map((chapter, index) => {
                  const status = getChapterStatus(chapter.id)
                  return (
                    <li key={chapter.id} className="chapter-item">
                      <Link
                        to={chapter.path}
                        className={`chapter-link ${status} ${
                          location.pathname === chapter.path ? 'active' : ''
                        }`}
                      >
                        <span className="chapter-number">{index + 1}</span>
                        {chapter.title}
                        {status !== 'not-started' && (
                          <span className="status-icon">
                            {status === 'completed' ? '✓' : '●'}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Section Progress Bar */}
              <div className="section-progress">
                <div className="progress-text">
                  <span>Section Progress</span>
                  <span>{Math.round(progress.percentage)}% Complete</span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
                <div className="progress-stats">
                  <span>{progress.completed} completed</span>
                  {progress.inProgress > 0 && (
                    <span>, {progress.inProgress} in progress</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </nav>
  )
}
```

## Benefits

1. **Clear Visual Feedback**
   - Checkmarks (✓) for completed chapters
   - Dots (●) for in-progress chapters
   - Color coding for quick status recognition
   - Progress bars for section completion tracking

2. **Section Progress Overview**
   - Shows completion percentage
   - Displays number of completed and in-progress chapters
   - Visual progress bar for quick assessment
   - Updates automatically as learners complete exercises

3. **Enhanced User Experience**
   - Immediate feedback on progress
   - Clear indication of current status
   - Motivation through progress visualization
   - Consistent with existing design

## Next Steps

1. Review and approve the design approach
2. Switch to code mode for implementation
3. Test with various progress states:
   - Empty progress (new user)
   - Partial completion
   - Full section completion
4. Verify that progress tracking and visual updates work correctly
5. Test responsive behavior
6. Gather user feedback