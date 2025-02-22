import Editor from '@monaco-editor/react'
import { useState, useRef, useEffect } from 'react'

function CodeBlock({ code }) {
  const [height, setHeight] = useState('100px') // Initial height
  const editorRef = useRef(null)

  const containerRef = useRef(null)

  useEffect(() => {
    // Set up resize observer to handle container width changes
    const resizeObserver = new ResizeObserver(() => {
      if (editorRef.current) {
        // Give Monaco time to update its internal layout
        setTimeout(updateHeight, 0)
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  const updateHeight = () => {
    const editor = editorRef.current
    if (editor) {
      // Get the editor's line count after word wrap
      const model = editor.getModel()
      if (model) {
        // Force layout update to ensure accurate line count
        editor.layout()
        // Get wrapped line count and add extra lines for any wrapped content
        const wrappedLines = model.getLineCount()
        const newHeight = (wrappedLines * 22) + 16 // 20px per line + 16px padding
        setHeight(`${newHeight}px`)
      }
    }
  }

  return (
    <div
      ref={containerRef}
      css={{
        margin: '1.5rem 0',
        borderRadius: '6px',
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
        transition: 'height 0.1s ease-out'
      }}
    >
      <Editor
        height={height}
        onMount={(editor) => {
          editorRef.current = editor
          // Initial height calculation
          updateHeight()
          // Listen for content changes that might affect wrapping
          editor.onDidContentSizeChange(updateHeight)
        }}
        defaultLanguage="javascript"
        value={code}
        theme="vs-light"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: "off",
          folding: false,
          fontSize: 13,
          padding: { top: 8, bottom: 8 },
          automaticLayout: true,
          domReadOnly: true,
          renderValidationDecorations: "off",
          wordWrap: "off",
          wrappingStrategy: "advanced",
          contextmenu: false,
          quickSuggestions: false,
          parameterHints: { enabled: false },
          suggestOnTriggerCharacters: false,
          acceptSuggestionOnEnter: "off",
          tabCompletion: "off",
          wordBasedSuggestions: false,
          renderLineHighlight: "none",
          scrollbar: {
            vertical: 'hidden',
            handleMouseWheel: false
          },

        }}
      />
    </div>
  )
}

export default CodeBlock