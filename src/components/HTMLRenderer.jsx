import { useState } from 'react';
import './HTMLRenderer.css';

/**
 * HTMLRenderer component for displaying HTML/CSS output
 * @param {Object} props Component props
 * @param {Object} props.files Object containing file contents keyed by filename
 * @param {Function} props.onRun Optional callback when the Run button is clicked
 * @param {Function} props.onRun Optional callback when the Run button is clicked
 */
function HTMLRenderer({ files, onRun }) {
  const [iframeContent, setIframeContent] = useState('');
  const [isRendered, setIsRendered] = useState(false);

  const runCode = () => {
    // Get HTML and CSS content from files
    const htmlContent = files['index.html'] || '';
    const cssContent = files['styles.css'] || '';

    // Inject CSS into HTML by adding a <style> tag in the <head>
    // This approach doesn't require the user to add <link> tags
    let processedHTML = htmlContent;

    // Check if the HTML has a head tag
    if (processedHTML.includes('</head>')) {
      processedHTML = processedHTML.replace('</head>', `<style>${cssContent}</style></head>`);
    } else if (processedHTML.includes('<html>') || processedHTML.includes('<html ')) {
      // If there's no head tag but there is an html tag, add a head with the style
      processedHTML = processedHTML.replace(/<html([^>]*)>/,
        `<html$1><head><style>${cssContent}</style></head>`);
    } else {
      // If there's no html tag, wrap the content in a proper HTML structure
      processedHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>${cssContent}</style>
          </head>
          <body>
            ${processedHTML}
          </body>
        </html>
      `;
    }

    setIframeContent(processedHTML);
    setIsRendered(true);

    if (onRun) onRun();
  };

  return (
    <div className="html-renderer">
      <div className="html-renderer-header">
        <button onClick={runCode} className="run-button">
          Run
        </button>
        <span className="renderer-title">
          {isRendered ? 'HTML Preview' : 'Click "Run" to see your HTML/CSS output'}
        </span>
      </div>
      <div className="iframe-container">
        <iframe
          srcDoc={iframeContent}
          title="HTML Preview"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
          style={{ border: isRendered ? '1px solid #ddd' : 'none' }}
        />
      </div>
    </div>
  );
}

export default HTMLRenderer;