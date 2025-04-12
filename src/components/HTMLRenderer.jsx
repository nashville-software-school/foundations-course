import { useState, useEffect, useRef } from 'react';
import './HTMLRenderer.css';

/**
 * HTMLRenderer component for displaying HTML/CSS output
 * @param {Object} props Component props
 * @param {Object} props.files Object containing file contents keyed by filename
 * @param {Function} props.onRun Optional callback when the Run button is clicked
 * @param {boolean} props.autoRun Whether to automatically run the code when files change (default: true)
 */
function HTMLRenderer({ files, onRun, autoRun = true }) {
  const [isRendered, setIsRendered] = useState(false);
  const iframeRef = useRef(null);
  const initialRenderRef = useRef(true);
  const hasContentRef = useRef(false);

  const processHTML = (htmlContent, cssContent) => {
    if (!htmlContent) return '';

    let processedHTML = htmlContent;
    const css = cssContent || '';

    // Check if the HTML has a head tag
    if (processedHTML.includes('</head>')) {
      processedHTML = processedHTML.replace('</head>', `<style>${css}</style></head>`);
    } else if (processedHTML.includes('<html>') || processedHTML.includes('<html ')) {
      // If there's no head tag but there is an html tag, add a head with the style
      processedHTML = processedHTML.replace(/<html([^>]*)>/,
        `<html$1><head><style>${css}</style></head>`);
    } else {
      // If there's no html tag, wrap the content in a proper HTML structure
      processedHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${processedHTML}
          </body>
        </html>
      `;
    }

    return processedHTML;
  };

  const updateIframeContent = (html) => {
    if (!iframeRef.current) return;

    try {
      // Get the iframe document
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);

      if (!doc) {
        console.error('Could not access iframe document');
        return;
      }

      // Clear the document and write new content
      doc.open();
      doc.write(html);
      doc.close();

      hasContentRef.current = true;
      setIsRendered(true);
      console.log('Successfully updated iframe content via document API');
    } catch (error) {
      console.error('Error updating iframe content:', error);
    }
  };

  const runCode = () => {
    console.log('Running code...');

    // Get HTML and CSS content from files
    const htmlContent = files['index.html'] || '';
    const cssContent = files['styles.css'] || '';

    console.log('HTML content length:', htmlContent.length);
    console.log('CSS content length:', cssContent.length);

    if (htmlContent) {
      const processedHTML = processHTML(htmlContent, cssContent);
      console.log('Processed HTML length:', processedHTML.length);

      // This approaches focuses on a direct update to the iframe document
      // instead of using srcDoc attribute which can sometimes fail
      updateIframeContent(processedHTML);

      if (onRun) onRun();
    }
  };

  // Create a stable iframe first, then update its content
  useEffect(() => {
    // This ensures we have access to the iframe before trying to use it
    if (iframeRef.current && !hasContentRef.current && files &&
        Object.keys(files).length > 0 && files['index.html']) {
      console.log('Iframe ref available, initializing content');
      runCode();
    }
  }, [files]);

  // Handle changes to files after initial render
  useEffect(() => {
    if (!initialRenderRef.current && autoRun && files &&
        Object.keys(files).length > 0 && files['index.html']) {
      console.log('Files changed and autoRun is true, updating content');
      runCode();
    }
    initialRenderRef.current = false;
  }, [files, autoRun]);

  return (
    <div className="html-renderer">
      <div className="html-renderer-header">
        <button
          onClick={runCode}
          className="run-button"
        >
          Run
        </button>
        <span className="renderer-title">
          {isRendered ? 'HTML Preview' : 'Click "Run" to see your HTML/CSS output'}
        </span>
      </div>
      <div className="iframe-container" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <iframe
          ref={iframeRef}
          title="HTML Preview"
          sandbox="allow-scripts allow-same-origin"
          style={{
            width: '100%',
            height: '100%',
            border: isRendered ? '1px solid #ddd' : 'none',
            display: 'block' // Ensure the iframe is displayed as a block element
          }}
        />
      </div>
    </div>
  );
}

export default HTMLRenderer;