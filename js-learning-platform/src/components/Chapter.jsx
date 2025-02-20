/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useChapter } from '../context/ChapterContext'
import Editor from '@monaco-editor/react'
import { marked } from 'marked'
import { css } from '@emotion/react'

const chapterStyles = css`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2rem;
  padding: 2rem;
  height: 100%;
  max-height: 100vh;
  overflow: hidden;

  .content-section {
    overflow-y: auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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

    ol {
      list-style-type: decimal;
      margin-left: 2rem;
      margin-bottom: 1.5rem;
    }
  }

  .editor-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: calc(100vh - 4rem);
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
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-height: 100px;
    max-height: 200px;
    overflow-y: auto;

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
    font-size: 1rem;
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
`

function Chapter() {
  const { chapterId } = useParams()
  const { currentChapter, chapterContent, loadChapter } = useChapter()
  const [code, setCode] = useState('')
  const [testResults, setTestResults] = useState(null)

  useEffect(() => {
    if (chapterId) {
      loadChapter(chapterId)
    }
  }, [chapterId])

  useEffect(() => {
    if (chapterContent?.exercise) {
      setCode(chapterContent.exercise.starterCode)
    }
  }, [chapterContent])

  const handleEditorChange = (value) => {
    setCode(value)
  }

  const runTests = () => {
    if (chapterContent?.exercise?.tests) {
      const results = chapterContent.exercise.tests.map(test => ({
        name: test.name,
        passed: test.test(code),
        message: test.message
      }))

      const allPassed = results.every(result => result.passed)
      setTestResults({
        passed: allPassed,
        message: allPassed
          ? 'Great job! All tests passed!'
          : results.find(r => !r.passed)?.message || 'Some tests failed. Try again!'
      })
    }
  }

  if (!chapterContent) {
    return <div>Loading...</div>
  }

  return (
    <div css={chapterStyles}>
      <section className="content-section">
        <h1>{currentChapter?.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: marked(chapterContent.content, { breaks: true })
          }}
        />
      </section>

      <section className="editor-section">
        <div className="editor-container">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-light"
            value={code}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 16, bottom: 16 }
            }}
          />
        </div>

        <button className="test-button" onClick={runTests}>
          Run Tests
        </button>

        {testResults && (
          <div className="test-results">
            <h3> {testResults.passed ? '✅ Tests Passed!' : '❌ Tests Failed'} </h3>
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
    </div>
  )
}

export default Chapter