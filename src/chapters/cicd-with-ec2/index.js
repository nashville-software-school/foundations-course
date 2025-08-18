import { githubActionsChapter } from './actions-setup';
import { cicdGlossaryChapter } from './cicd-ec2-glossary';
import { githubActionsBreakdownChapter } from './actions-breakdown';
import { advancedCicdWithDockerChapter } from './cicd-ec2-fundamentals';

export const ec2CicdChapters = [
  githubActionsChapter,
  cicdGlossaryChapter,
  githubActionsBreakdownChapter,
  advancedCicdWithDockerChapter
];

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return ec2CicdChapters.find(chapter => chapter.id === id);
};

/**
 * Get all chapter IDs for the CI/CD introduction section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return ec2CicdChapters.map(chapter => chapter.id);
};

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = ec2CicdChapters.findIndex(chapter => chapter.id === currentChapterId);
  return ec2CicdChapters[currentIndex + 1];
};

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = ec2CicdChapters.findIndex(chapter => chapter.id === currentChapterId);
  return currentIndex > 0 ? ec2CicdChapters[currentIndex - 1] : undefined;
};