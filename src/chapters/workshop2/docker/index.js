import { dockerGlossaryChapter } from './docker-glossary';
import { dockerSetupChapter } from './docker-setup';
import { dockerFundamentalsChapter } from './docker-fundamentals';
import { dockerfileBreakdownChapter } from './dockerfile-breakdown';

export const introToDockerChapters = [
  dockerSetupChapter,
  dockerGlossaryChapter,
  dockerFundamentalsChapter,
  dockerfileBreakdownChapter
];

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return introToDockerChapters.find(chapter => chapter.id === id);
};

/**
 * Get all chapter IDs for the CI/CD introduction section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return introToDockerChapters.map(chapter => chapter.id);
};

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = introToDockerChapters.findIndex(chapter => chapter.id === currentChapterId);
  return introToDockerChapters[currentIndex + 1];
};

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = introToDOckerChapters.findIndex(chapter => chapter.id === currentChapterId);
  return currentIndex > 0 ? introToDockerChapters[currentIndex - 1] : undefined;
};