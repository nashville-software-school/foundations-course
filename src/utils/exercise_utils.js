/**
 * Utility functions for exercises
 */

/**
 * Get the appropriate language for Monaco editor based on file extension
 * @param {String} filename The filename
 * @returns {String} The language identifier for Monaco editor
 */
export function getLanguageFromFilename(filename) {
  if (!filename) return 'javascript';

  const extension = filename.split('.').pop().toLowerCase();

  switch (extension) {
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'js':
      return 'javascript';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    default:
      return 'javascript';
  }
}