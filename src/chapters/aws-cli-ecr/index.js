import { cliEcrGlossaryChapter } from './ecr-glossary';
import { ecrSetupChapter } from './push-to-ecr';
import { awsCliEcrIntroChapter } from './cli-ecr-fundamentals';

export const cliEcrChapters = [
  cliEcrGlossaryChapter,
  ecrSetupChapter,
  awsCliEcrIntroChapter
];

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return cliEcrChapters.find(chapter => chapter.id === id);
};

/**
 * Get all chapter IDs for the CI/CD introduction section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return cliEcrChapters.map(chapter => chapter.id);
};

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = cliEcrChapters.findIndex(chapter => chapter.id === currentChapterId);
  return cliEcrChapters[currentIndex + 1];
};

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = cliEcrChapters.findIndex(chapter => chapter.id === currentChapterId);
  return currentIndex > 0 ? cliEcrChapters[currentIndex - 1] : undefined;
};