import { cicdFundamentalsChapter } from './cicd-fundamentals';
import { githubActionsBasicsChapter } from './github-actions-basics';
import { deploymentPipelineChapter } from './deployment-pipeline';
import { cicdGlossaryChapter } from './glossary';

export const introToCicdChapters = [
  cicdFundamentalsChapter,
  githubActionsBasicsChapter,
  deploymentPipelineChapter,
  cicdGlossaryChapter
];

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return introToCicdChapters.find(chapter => chapter.id === id);
};

/**
 * Get all chapter IDs for the CI/CD introduction section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return introToCicdChapters.map(chapter => chapter.id);
};

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = introToCicdChapters.findIndex(chapter => chapter.id === currentChapterId);
  return introToCicdChapters[currentIndex + 1];
};

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = introToCicdChapters.findIndex(chapter => chapter.id === currentChapterId);
  return currentIndex > 0 ? introToCicdChapters[currentIndex - 1] : undefined;
};