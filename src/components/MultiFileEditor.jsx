/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import Editor from '@monaco-editor/react'
import { getLanguageFromFilename } from '../utils/exercise_utils'

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    flex: 1;
    height: 100%;
  `,
  tabs: css`
    display: flex;
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    padding: 0.5rem 1rem 0;
    gap: 0.5rem;
  `,
  tab: css`
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    border-bottom: none;
    border-radius: 6px 6px 0 0;
    cursor: pointer;
    background: transparent;
    color: #495057;
    font-size: 0.9rem;
    position: relative;
    bottom: -1px;

    &:hover {
      background: #e9ecef;
    }

    &.active {
      background: white;
      border-color: #e9ecef;
      color: #212529;
    }
  `,
  editor: css`
    flex: 1;
    min-height: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  `
}

/**
 * MultiFileEditor component for handling multiple files in exercises
 * @param {Object} props Component props
 * @param {Object} props.files Object containing file contents keyed by filename
 * @param {Function} props.onChange Callback when any file content changes
 * @param {Object} props.options Monaco editor options
 */
function MultiFileEditor({ files, onChange, options = {}, height = "100%" }) {
  const [activeFile, setActiveFile] = useState(Object.keys(files)[0])

  // Reset active file only when file structure changes
  useEffect(() => {
    const fileNames = Object.keys(files)
    if (fileNames.length > 0) {
      // Check if the current active file still exists in the new files
      if (!fileNames.includes(activeFile)) {
        setActiveFile(fileNames[0])
      }
    }
  }, [JSON.stringify(Object.keys(files))])

  const handleEditorChange = (value) => {
    onChange({
      ...files,
      [activeFile]: value
    })
  }

  return (
    <div css={styles.container} style={{ height }}>
      <div css={styles.tabs}>
        {Object.keys(files).map(filename => (
          <button
            key={filename}
            css={styles.tab}
            className={filename === activeFile ? 'active' : ''}
            onClick={() => setActiveFile(filename)}
          >
            {filename}
          </button>
        ))}
      </div>
      <div css={styles.editor}>
        <Editor
          height="100%"
          defaultLanguage={getLanguageFromFilename(activeFile)}
          theme="vs-light"
          value={files[activeFile]}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            ...options
          }}
        />
      </div>
    </div>
  )
}

export default MultiFileEditor