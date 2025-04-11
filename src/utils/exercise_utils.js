/**
 * Utility functions for exercises
 */

/**
 * Check if an exercise is an HTML/CSS exercise
 * @param {Object} chapterContent The chapter content object
 * @returns {Boolean} True if the exercise is an HTML/CSS exercise
 */
export function isHTMLExercise(chapterContent) {
  if (!chapterContent?.exercise?.starterCode) return false;

  // If starterCode is an object, check if it contains HTML or CSS files
  if (typeof chapterContent.exercise.starterCode === 'object') {
    const filenames = Object.keys(chapterContent.exercise.starterCode);
    return filenames.some(filename =>
      filename.endsWith('.html') || filename.endsWith('.css')
    );
  }

  return false;
}

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