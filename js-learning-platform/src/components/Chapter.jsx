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

    p {
      color: #2c3e50;
      line-height: 1.6;
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

const sampleChapter = {
  content: `# Introduction to Arrays

Arrays are ordered collections of values. They allow you to store multiple items in a single variable.

## Exercise

Convert the individual fruit variables into an array.

\`\`\`js
// Instead of this:
const yellowFruit = "Banana"
const orangeFruit = "Orange"
const redFruit = "Apple"

// Create this:
const fruits = ["Banana", "Orange", "Apple"]
\`\`\`

Try it yourself in the editor!
`,
  exercise: {
    starterCode: `// Current setup
const yellowFruit = "Banana"
const orangeFruit = "Orange"
const redFruit = "Apple"
const greenFruit = "Watermelon"
const blueFruit = "Blueberry"

const fruits = []

// Your code here`,
    solution: `const fruits = ["Banana", "Orange", "Apple", "Watermelon", "Blueberry"]`
  }
}

function Chapter() {
  const { chapterId } = useParams()
  const { chapters, currentChapter, setCurrentChapter } = useChapter()
  const [code, setCode] = useState('')
  const [testResults, setTestResults] = useState(null)

  useEffect(() => {
    setCode(sampleChapter.exercise.starterCode)
  }, [chapterId])

  useEffect(() => {
    const chapter = chapters.find(c => c.path === '/' + (chapterId || ''))
    if (chapter) {
      setCurrentChapter(chapter)
    }
  }, [chapterId, chapters, setCurrentChapter])

  const handleEditorChange = (value) => {
    setCode(value)
  }

  const runTests = () => {
    const passed = code.includes('["Banana", "Orange", "Apple", "Watermelon", "Blueberry"]')
    setTestResults({
      passed,
      message: passed
        ? 'Great job! You\'ve successfully created the fruits array!'
        : 'Not quite right. Make sure you\'ve included all fruits in the array.'
    })
  }

  return (
    <div css={chapterStyles}>
      <section className="content-section">
        <h1>{currentChapter?.title || 'Introduction to Arrays'}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: marked(sampleChapter.content, { breaks: true })
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
            <h3>
              {testResults.passed ? '✅ Tests Passed!' : '❌ Tests Failed'}
            </h3>
            <p>{testResults.message}</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Chapter