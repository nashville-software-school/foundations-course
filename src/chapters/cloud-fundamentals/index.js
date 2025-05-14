import { whatIsCloudChapter } from './what-is-cloud';
import { whyUseCloudChapter } from './why-use-cloud';
import { awsAccountSetupChapter } from './aws-account-setup';
import { cloudFundamentalsGlossaryChapter } from './glossary';

export const cloudFundamentalsChapters = [
  whatIsCloudChapter,
  whyUseCloudChapter,
  awsAccountSetupChapter,
  cloudFundamentalsGlossaryChapter
];

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return cloudFundamentalsChapters.find(chapter => chapter.id === id);
};

/**
 * Get all chapter IDs for the cloud fundamentals section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return cloudFundamentalsChapters.map(chapter => chapter.id);
};

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = cloudFundamentalsChapters.findIndex(chapter => chapter.id === currentChapterId);
  return cloudFundamentalsChapters[currentIndex + 1];
};

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = cloudFundamentalsChapters.findIndex(chapter => chapter.id === currentChapterId);
  return currentIndex > 0 ? cloudFundamentalsChapters[currentIndex - 1] : undefined;
};