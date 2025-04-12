/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css } from '@emotion/react'
import MultiFileEditor from './MultiFileEditor'
import HTMLRenderer from './HTMLRenderer'

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 1;
  `,
  editorContainer: css`
    margin-bottom: 0.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
  rendererContainer: css`
    margin-top: 0.5rem;
    flex: 1;
  `
}

/**
 * HTMLCSSEditor component for HTML/CSS exercises
 * @param {Object} props Component props
 * @param {Object} props.files Object containing file contents keyed by filename
 * @param {Function} props.onChange Callback when any file content changes
 * @param {Function} props.onRun Optional callback when the Run button is clicked
 */
function HTMLCSSEditor({ files, onChange, onRun }) {
  return (
    <div css={styles.container}>
      <div css={styles.editorContainer}>
        <MultiFileEditor
          files={files}
          onChange={onChange}
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
      <div css={styles.rendererContainer}>
        <HTMLRenderer files={files} onRun={onRun} />
      </div>
    </div>
  )
}

export default HTMLCSSEditor