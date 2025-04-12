import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useChapter } from '../context/ChapterContext'
import { useLearnerProgress } from '../context/LearnerProgressContext'
import Editor from '@monaco-editor/react'
import { marked } from 'marked'
import CodeBlock from './CodeBlock'
import MultiFileEditor from './MultiFileEditor'
import HTMLRenderer from './HTMLRenderer'
import HTMLCSSEditor from './HTMLCSSEditor'
import ProtectedRoute from './ProtectedRoute'
import * as ReactDOM from 'react-dom/client'
import { isHTMLExercise } from '../utils/exercise_utils'
import './Chapter.css'

const ChapterContent = ({ currentChapter, chapterContent, onPrevious, onNext, getPreviousChapter, getNextChapter }) => {
  const { chapterId } = useParams()
  const {
    trackAttempt,
    sendProgressToAPI,
    trackCompletion,
    trackSolutionShown,
    getExerciseProgress
  } = useLearnerProgress()
  const [files, setFiles] = useState({})
  const [testResults, setTestResults] = useState(null)
  const [showResults, setShowResults] = useState(true)
  const [consoleOutput, setConsoleOutput] = useState(null)
  const [showConsoleOutput, setShowConsoleOutput] = useState(true)
  const [hideResultsTimeout, setHideResultsTimeout] = useState(null)
  const [hideConsoleTimeout, setHideConsoleTimeout] = useState(null)
  const [showSolutionButton, setShowSolutionButton] = useState(false)
  const [solutionTabVisible, setSolutionTabVisible] = useState(false)
  const [showSolutionModal, setShowSolutionModal] = useState(false)

  // Configure marked renderer for code blocks
  const renderer = useMemo(() => {
    const renderer = new marked.Renderer()
    renderer.code = (code, language) => {
      if (language === 'javascript' || language === 'js') {
        const id = `code-block-${Math.random().toString(36).substr(2, 9)}`
        return `<div id="${id}" class="code-block-wrapper">${code}</div>`
      }
      // Handle HTML and CSS code blocks
      if (language === 'html' || language === 'css') {
        // Escape HTML to prevent rendering
        const escapedCode = code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
        return `<pre><code class="language-${language}">${escapedCode}</code></pre>`
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

  function clearCodeOutput() {
    setShowResults(false)
    setShowConsoleOutput(false)
    setConsoleOutput(null)

    // Clear any existing timeouts
    if (hideResultsTimeout) {
      clearTimeout(hideResultsTimeout)
      setHideResultsTimeout(null)
    }
    if (hideConsoleTimeout) {
      clearTimeout(hideConsoleTimeout)
      setHideConsoleTimeout(null)
    }
  }

  useEffect(() => {
    if (chapterContent?.exercise) {
      clearCodeOutput()
      const progress = getExerciseProgress(chapterId)

      // Check if the solution button should be shown based on attempts
      if ((progress.attempts >= 5 && !progress.solutionShown) || progress.solutionShown) {
        setShowSolutionButton(true)
      } else {
        setShowSolutionButton(false)
      }

      // Check if the solution has been shown previously
      if (progress.solutionShown) {
        // Set solution tab to visible
        setSolutionTabVisible(true)
      }

      let initialFiles = {};

      if (progress.completed && progress.completedCode) {
        // Load completed code if it exists
        if (progress.completedCode.files) {
          initialFiles = { ...progress.completedCode.files };
        } else if (progress.completedCode.code) {
          initialFiles = { 'index.js': progress.completedCode.code };
        }
      } else {
        // Load starter code if no completed code exists
        if (typeof chapterContent.exercise.starterCode === 'string') {
          // Single file exercise
          initialFiles = { 'index.js': chapterContent.exercise.starterCode };
        } else {
          // Multi-file exercise
          initialFiles = { ...chapterContent.exercise.starterCode };
        }
      }

      // If the solution has been shown previously, add the solution file
      if (progress.solutionShown) {
        if (typeof chapterContent.exercise.solution === 'string') {
          // Single-file exercise
          initialFiles['solution.js'] = chapterContent.exercise.solution;
        } else {
          // Multi-file exercise
          Object.keys(chapterContent.exercise.solution).forEach(filename => {
            const solutionFilename = filename.replace('.js', '-solution.js');
            initialFiles[solutionFilename] = chapterContent.exercise.solution[filename];
          });
        }
      }

      setFiles(initialFiles);
    }
  }, [chapterContent, chapterId])

  const handleFilesChange = (newFiles) => {
    // Create a copy of the current files to preserve solution files
    const updatedFiles = { ...files };

    // Update only the files that have changed
    Object.keys(newFiles).forEach(filename => {
      updatedFiles[filename] = newFiles[filename];
    });

    // Keep the solution tab visible if it was visible before
    if (solutionTabVisible && !updatedFiles['solution.js'] && files['solution.js']) {
      updatedFiles['solution.js'] = files['solution.js'];
    }

    setFiles(updatedFiles);
  }

  function formatConsoleValue(value) {
    if (value === null) return "null";
    if (value === undefined) return "undefined";
    if (Number.isNaN(value)) return "NaN";
    if (value === Infinity) return "Infinity";
    if (value === -Infinity) return "-Infinity";
    if (Object.is(value, -0)) return "-0";
    if (typeof value === "bigint") return value.toString() + "n";
    if (typeof value === "symbol") return value.toString();
    if (typeof value === "function") {
      return `[Function${value.name ? `: ${value.name}` : ""}]`;
    }
    if (typeof value === "string") return `"${value}"`;
    if (typeof value === "object") {
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return "[Object]";
      }
    }
    return String(value);
  }

  const restoreInitialCode = () => {
    // Create a new files object with the starter code
    let newFiles;

    if (typeof chapterContent.exercise.starterCode === 'string') {
      // Single file exercise
      newFiles = { 'index.js': chapterContent.exercise.starterCode };
    } else {
      // Multi-file exercise
      newFiles = { ...chapterContent.exercise.starterCode };
    }

    // Preserve the solution file if it exists and solution tab is visible
    if (solutionTabVisible) {
      if (typeof chapterContent.exercise.solution === 'string' && files['solution.js']) {
        newFiles['solution.js'] = files['solution.js'];
      } else if (typeof chapterContent.exercise.solution === 'object') {
        Object.keys(chapterContent.exercise.solution).forEach(filename => {
          const solutionFilename = filename.replace(/\.([^.]+)$/, '-solution.$1');
          if (files[solutionFilename]) {
            newFiles[solutionFilename] = files[solutionFilename];
          }
        });
      }
    }

    setFiles(newFiles);
  }

  const runCode = () => {
    // If this is an HTML exercise, the HTMLRenderer component will handle running the code
    if (Object.keys(files).some(filename =>
      filename.endsWith('.html') || filename.endsWith('.css')
    )) {
      return;
    }

    setShowConsoleOutput(true)

    // Clear any existing timeout for console output
    if (hideConsoleTimeout) {
      clearTimeout(hideConsoleTimeout)
    }

    const timeout = setTimeout(() => {
      setShowConsoleOutput(false)
    }, 8000)
    setHideConsoleTimeout(timeout)

    // Store original console.log
    const originalConsoleLog = console.log;

    // Captured output
    let output = [];

    // Override console.log
    console.log = (...args) => {
      output.push(args.map(formatConsoleValue).join(' '));
      originalConsoleLog(...args);
    };

    try {
      // Always run only the user's code (index.js), not the solution code
      if (files['index.js']) {
        // Execute the user's code
        new Function(files['index.js'])();
      } else if (Object.keys(files).length > 0) {
        // Fallback for multi-file exercises without index.js
        // Only include files that are not solution files
        const userFiles = Object.entries(files)
          .filter(([filename]) => !filename.includes('solution'))
          .map(([_, code]) => code);

        const userCode = userFiles.join('\n');
        new Function(userCode)();
      }

    } catch (error) {
      output.push(`Error: ${error.message}`);
    } finally {
      // Restore original console.log
      console.log = originalConsoleLog;
    }

    // Update state with captured output
    if (output.length === 0) {
      output.push(`No console.log output

* Did you forget to add console.log statements?
* Does the variable you're logging have a value?
* Are you trying to log an array that's empty?
`)
    }
    setConsoleOutput(output.join('\n'));
  };

  const runTests = () => {
    if (chapterContent?.exercise?.tests) {
      setShowResults(true)

      // Clear any existing timeout for test results
      if (hideResultsTimeout) {
        clearTimeout(hideResultsTimeout)
      }

      // Set a new timeout to hide test results after 8 seconds
      const timeout = setTimeout(() => {
        setShowResults(false)
      }, 8000)
      setHideResultsTimeout(timeout)

      // Get current code for hashing - only include user's code, not solution
      let currentCode;
      if (files['index.js']) {
        currentCode = files['index.js'];  // Single-file exercises
      } else {
        // For multi-file exercises, filter out solution files
        const userFiles = Object.fromEntries(
          Object.entries(files).filter(([filename]) => !filename.includes('solution'))
        );
        currentCode = JSON.stringify(userFiles);
      }

      // Track attempt before running tests, passing the code
      trackAttempt(chapterId, currentChapter.title, currentCode)

      const results = chapterContent.exercise.tests.map(test => {
        // For single-file exercises, pass just the code
        // For multi-file exercises, pass all files but filter out solution files
        const isMultiFile = typeof chapterContent.exercise.starterCode === 'object';
        let testArg;

        if (isMultiFile) {
          // Filter out solution files for multi-file exercises
          testArg = Object.fromEntries(
            Object.entries(files).filter(([filename]) => !filename.includes('solution'))
          );
        } else {
          testArg = files['index.js'];
        }
        let testResult = test.test(testArg)
        return {
          name: test.name,
          testResult,
          message: test.message
        }
      })

      const allPassed = results.every(result => result.testResult.passed)

      // Track completion if all tests passed
      if (allPassed) {
        const completedCode = typeof chapterContent.exercise.starterCode === 'object'
          ? { files } // Multi-file exercise
          : { code: files['index.js'] } // Single-file exercise
        trackCompletion(chapterId, completedCode)
      }

      const fullMessage = results.reduce((messages, currentResult) => {
          if (currentResult.testResult.passed){
            messages.push(`* <span style="color: green;">${currentResult.name} passed!</span>`);
          } else {
            messages.push(`* ${currentResult.message}\n${currentResult.testResult.formattedMessage}`);
          }
          return messages
      }, []).join('\n')

      const testResults = {
        passed: allPassed,
        message: allPassed
          ? 'Great job! All tests passed!'
          : fullMessage || 'Some tests failed. Try again!'
      }

      setTestResults(testResults)

      // Check if we should show the solution button after running tests
      // This is still needed for when a user reaches 5 attempts during the current session
      const progress = getExerciseProgress(chapterId)
      if (progress.attempts >= 5 && !allPassed && !progress.solutionShown) {
        setShowSolutionButton(true)
      }
    }
  }

  function hasFunction(variable) {
    return typeof variable === 'function';
  }

  const showSolution = () => {
    // Track that solution was shown
    trackSolutionShown(chapterId)

    // Check if solution tab is already visible and solution file exists
    const hasSolutionFile = files['solution.js'] ||
      Object.keys(files).some(filename => filename.includes('-solution.js'));

    // Only add solution files if they don't already exist
    if (!hasSolutionFile) {
      // For multi-file exercises
      if (Object.keys(files).length > 1 && typeof chapterContent.exercise.solution === 'object') {
        // Create a copy of files with solution
        const newFiles = { ...files }

        // Add solution files with -solution suffix
        Object.keys(chapterContent.exercise.solution).forEach(filename => {
          const solutionFilename = filename.replace('.js', '-solution.js')
          newFiles[solutionFilename] = chapterContent.exercise.solution[filename]
        })

        setFiles(newFiles)
      } else {
        // For single-file exercises
        setFiles({
          'index.js': files['index.js'],
          'solution.js': chapterContent.exercise.solution
        })
      }
    }

    // Show the solution tab
    setSolutionTabVisible(true)

    // Show modal notification
    setShowSolutionModal(true)

    // Keep the button visible even after showing the solution
    // We don't need to set showSolutionButton to false anymore
  }

  return (
    <div className="chapter" style={{
      gridTemplateColumns: chapterContent.exercise ? 'minmax(0, 1fr) minmax(0, 1fr)' : 'minmax(0, 1fr)',
      width: '100%',
      display: 'grid',
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
        <section className="editor-section" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'stretch',
        }}>
          {Object.keys(files).some(filename =>
            filename.endsWith('.html') || filename.endsWith('.css')
          ) ? (
            // HTML/CSS Exercise
            <HTMLCSSEditor
              files={files}
              onChange={handleFilesChange}
              onRun={() => {
                // Track attempt when running HTML/CSS code
                const userFiles = Object.fromEntries(
                  Object.entries(files).filter(([filename]) => !filename.includes('solution'))
                );
                trackAttempt(chapterId, currentChapter.title, JSON.stringify(userFiles));
              }}
            />
          ) : (
            // JavaScript Exercise
            <div className="editor-container" style={{ marginBottom: '20px' }}>
              {Object.keys(files).length > 1 || solutionTabVisible ? (
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
                  height="300px"
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
          )}

          {/* Console Output */}
          {consoleOutput && showConsoleOutput && (
            <div className={`console-output ${!showConsoleOutput ? 'hidden' : ''}`}>
              <button
                className="close-button"
                onClick={() => setShowConsoleOutput(false)}
                aria-label="Close"
              >
                ✕
              </button>
              <h3>📋 Console Output</h3>
              <pre>{consoleOutput}</pre>
            </div>
          )}

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
                  __html: marked(testResults.message.split('\n').join('\n'), {
                    breaks: true,
                    gfm: true
                  })
                }}
              />
            </div>
          )}

          {showSolutionModal && (
            <div className="solution-modal">
              <div className="solution-modal-content">
                <h3>Solution Available</h3>
                <p>The solution code is now available in a new tab labeled "solution.js".</p>
                <p>Click on the tab to view the solution.</p>
                <p><strong>Note:</strong> Using the solution has been recorded in your progress.</p>
                <button
                  className="close-button"
                  onClick={() => setShowSolutionModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="button-row">
            {!Object.keys(files).some(filename =>
              filename.endsWith('.html') || filename.endsWith('.css')
            ) && (
              <button className="code-button run-code-button" onClick={runCode}>
                Run Code
              </button>
            )}

            {showSolutionButton && (
              <button
                className="code-button solution-button"
                onClick={showSolution}
                title="This will be recorded in your progress"
              >
                Show Solution
              </button>
            )}

            {chapterContent?.exercise?.tests.length > 0 &&
            <button className="code-button test-button" onClick={runTests}>
              Run Tests
            </button>}

            <button className="code-button reset-button" onClick={restoreInitialCode}>
              Reset
            </button>
          </div>
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