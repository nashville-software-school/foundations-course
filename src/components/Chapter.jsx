/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useChapter } from '../context/ChapterContext'
import { useLearnerProgress } from '../context/LearnerProgressContext'
import Editor from '@monaco-editor/react'
import { marked } from 'marked'
import { css } from '@emotion/react'
import CodeBlock from './CodeBlock'
import MultiFileEditor from './MultiFileEditor'
import ProtectedRoute from './ProtectedRoute'
import * as ReactDOM from 'react-dom/client'

const chapterStyles = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0.5rem 1rem 0 1rem;
  height: 100%;
  max-height: 100vh;
  overflow: hidden;

  .content-container {
    flex: 1;
    min-height: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: white;
    padding: 1rem;
    overflow-y: auto;
  }

  .content-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h1 {
      color: #2c3e50;
      margin-bottom: 1.5rem;
    }

    h2 {
      color: #34495e;
      margin: 2rem 0 1rem;
    }

    pre {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 6px;
      margin: 1.5rem 0;
    }

    ol, ul {
      margin-left: 2rem;
      margin-bottom: 1.5rem;
    }
  }

  .editor-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .editor-container {
    flex: 1;
    min-height: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: white;
  }

  .test-results {
    position: relative;
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-height: 100px;
    max-height: 200px;
    overflow-y: auto;
    opacity: 1;
    transition: opacity 0.3s ease;

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }

    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      color: #666;
      padding: 4px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;

      &:hover {
        color: #333;
      }
    }

    h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    p, li {
      color: #2c3e50;
      line-height: 1.6;
    }

    h1, h2, h3, h4, h5, h6 {
      color: #2c3e50;
      margin: 1rem 0 0.5rem;
    }

    ol, ul {
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }

    ol {
      list-style-type: decimal;
    }

    ul {
      list-style-type: disc;
    }
  }

  .test-button {
    padding: 0.75rem 1.5rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
      background: #0056b3;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }

  .button-container {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }

  .nav-button {
    padding: 0.75rem 1.5rem;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
      background: #218838;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
`

const ChapterContent = ({ currentChapter, chapterContent, onPrevious, onNext, getPreviousChapter, getNextChapter }) => {
  const { chapterId } = useParams()
  const { trackAttempt, trackCompletion, getExerciseProgress } = useLearnerProgress()
  const [files, setFiles] = useState({})
  const [testResults, setTestResults] = useState(null)
  const [showResults, setShowResults] = useState(true)

  // Configure marked renderer for code blocks
  const renderer = useMemo(() => {
    const renderer = new marked.Renderer()
    renderer.code = (code, language) => {
      if (language === 'javascript' || language === 'js') {
        const id = `code-block-${Math.random().toString(36).substr(2, 9)}`
        return `<div id="${id}" class="code-block-wrapper">${code}</div>`
      }
      return `<pre><code class="language-${language}">${code}</code></pre>`
    }
    return renderer
  }, [])

  // Process content with marked and custom renderer
  const processedContent = useMemo(() => {
    if (!chapterContent?.content) return ''
    return marked(chapterContent.content, {
      renderer,
      breaks: true,
      gfm: true
    })
  }, [chapterContent?.content, renderer])

  // Auto-hide test results after 8 seconds
  useEffect(() => {
    let timer
    if (testResults) {
      setShowResults(true)
      timer = setTimeout(() => {
        setShowResults(false)
      }, 8000)
    }
    return () => clearTimeout(timer)
  }, [testResults])

  useEffect(() => {
    if (chapterContent?.exercise) {
      const progress = getExerciseProgress(chapterId)

      if (progress.completed && progress.completedCode) {
        // Load completed code if it exists
        if (progress.completedCode.files) {
          setFiles(progress.completedCode.files)
        } else if (progress.completedCode.code) {
          setFiles({ 'index.js': progress.completedCode.code })
        }
      } else {
        // Load starter code if no completed code exists
        if (typeof chapterContent.exercise.starterCode === 'string') {
          // Single file exercise
          setFiles({ 'index.js': chapterContent.exercise.starterCode })
        } else {
          // Multi-file exercise
          setFiles(chapterContent.exercise.starterCode)
        }
      }
    }
  }, [chapterContent, chapterId])

  const handleFilesChange = (newFiles) => {
    // Only update the files that exist in the current chapter's starter code
    const validFiles = {}
    const starterCode = chapterContent?.exercise?.starterCode || {}
    const starterCodeFiles = typeof starterCode === 'string' ? ['index.js'] : Object.keys(starterCode)

    Object.keys(newFiles).forEach(filename => {
      if (starterCodeFiles.includes(filename)) {
        validFiles[filename] = newFiles[filename]
      }
    })
    setFiles(validFiles)
  }

  const runTests = () => {
    if (chapterContent?.exercise?.tests) {
      // Track attempt before running tests
      trackAttempt(chapterId)

      const results = chapterContent.exercise.tests.map(test => {
        // For single-file exercises, pass just the code
        // For multi-file exercises, pass all files
        const isMultiFile = typeof chapterContent.exercise.starterCode === 'object'
        const testArg = isMultiFile ? files : files['index.js']

        return {
          name: test.name,
          passed: test.test(testArg),
          message: test.message
        }
      })

      const allPassed = results.every(result => result.passed)

      // Track completion if all tests passed
      if (allPassed) {
        const completedCode = typeof chapterContent.exercise.starterCode === 'object'
          ? { files } // Multi-file exercise
          : { code: files['index.js'] } // Single-file exercise
        trackCompletion(chapterId, completedCode)
      }

      const fullMessage = results.reduce((messages, currentResult) => {
        messages.push(currentResult.passed ? `* <span style="color: green;">${currentResult.name} passed!</span>` : `* ${currentResult.message}`)
        return messages
      }, []).join('\n')

      const testResults = {
        passed: allPassed,
        message: allPassed
          ? 'Great job! All tests passed!'
          : fullMessage || 'Some tests failed. Try again!'
    }

    setTestResults(testResults)
  }
}

return (
  <div css={chapterStyles} style={{
    gridTemplateColumns: chapterContent.exercise ? 'minmax(0, 1fr) minmax(0, 1fr)' : 'minmax(0, 1fr)',
  }}>
    <section className="content-section">
      <div className="content-container">
        <h1>{currentChapter?.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: processedContent }}
          ref={contentRef => {
            if (contentRef) {
              contentRef.querySelectorAll('.code-block-wrapper').forEach(block => {
                if (block.children.length === 0) {
                  const code = block.textContent || ''
                  block.textContent = ''
                  const root = ReactDOM.createRoot(block)
                  root.render(<CodeBlock code={code} />)
                }
              })
            }
          }}
        />
      </div>

      <div className="button-container">
        <button
          className="nav-button previous-button"
          onClick={onPrevious}
          disabled={!getPreviousChapter(currentChapter?.id)}
        >
          Previous Chapter
        </button>
        <button
          className="nav-button next-button"
          onClick={onNext}
          disabled={!getNextChapter(currentChapter?.id)}
        >
          Next Chapter
        </button>
      </div>
    </section>

    {
      chapterContent.exercise &&
      <section className="editor-section">
        <div className="editor-container">
          {Object.keys(files).length > 1 ? (
            <MultiFileEditor
              files={files}
              onChange={handleFilesChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 }
              }}
            />
          ) : (
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-light"
              value={files['index.js']}
              onChange={(value) => handleFilesChange({ 'index.js': value })}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 }
              }}
            />
          )}
        </div>

        <button className="test-button" onClick={runTests}>
          Run Tests
        </button>

        {testResults && showResults && (
          <div className={`test-results ${!showResults ? 'hidden' : ''}`}>
            <button
              className="close-button"
              onClick={() => setShowResults(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <h3>{testResults.passed ? '✅ Tests Passed!' : '❌ Some Tests Failed'}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: marked(testResults.message.split('\n').map(line => line.trim()).join('\n'), {
                  breaks: true,
                  gfm: true
                })
              }}
            />
          </div>
        )}
      </section>
    }
  </div>
)
}

function Chapter() {
  const { chapterId } = useParams()
  const navigate = useNavigate()
  const { currentChapter, chapterContent, loadChapter, getPreviousChapter, getNextChapter } = useChapter()

  const scrollToTop = () => {
    const contentContainer = document.querySelector('.content-container')
    if (contentContainer) {
      contentContainer.scrollTop = 0
    }
  }

  const handlePreviousClick = () => {
    const previousChapter = getPreviousChapter(currentChapter.id)
    if (previousChapter) {
      // Check if we have the hasSeenIntro parameter in the URL
      const searchParams = new URLSearchParams(window.location.search);
      const hasSeenIntro = searchParams.get('hasSeenIntro') === 'true';

      // Preserve the parameter when navigating
      const url = hasSeenIntro ? `/${previousChapter.id}?hasSeenIntro=true` : `/${previousChapter.id}`;
      navigate(url);
      loadChapter(previousChapter.id)
      scrollToTop()
    }
  }

  const handleNextClick = () => {
    const nextChapter = getNextChapter(currentChapter.id)
    if (nextChapter) {
      // Check if we have the hasSeenIntro parameter in the URL
      const searchParams = new URLSearchParams(window.location.search);
      const hasSeenIntro = searchParams.get('hasSeenIntro') === 'true';

      // Preserve the parameter when navigating
      const url = hasSeenIntro ? `/${nextChapter.id}?hasSeenIntro=true` : `/${nextChapter.id}`;
      navigate(url);
      loadChapter(nextChapter.id)
      scrollToTop()
    }
  }

  useEffect(() => {
    if (chapterId) {
      loadChapter(chapterId)
    }
  }, [chapterId])

  if (!chapterContent) {
    return <div>Loading...</div>
  }

  // If the chapter requires authentication, wrap it in ProtectedRoute
  if (currentChapter?.requiresAuth) {
    return (
      <ProtectedRoute>
        <ChapterContent
          currentChapter={currentChapter}
          chapterContent={chapterContent}
          onPrevious={handlePreviousClick}
          onNext={handleNextClick}
          getPreviousChapter={getPreviousChapter}
          getNextChapter={getNextChapter}
        />
      </ProtectedRoute>
    )
  }

  // Otherwise, render normally
  return (
    <ChapterContent
      currentChapter={currentChapter}
      chapterContent={chapterContent}
      onPrevious={handlePreviousClick}
      onNext={handleNextClick}
      getPreviousChapter={getPreviousChapter}
      getNextChapter={getNextChapter}
    />
  )
}

export default Chapter