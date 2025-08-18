import { ec2GlossaryChapter } from './ec2-glossary';
import { ec2Chapter } from './ec2-setup';
import { ec2FundamentalsChapter } from './ec2-fundamentals';

export const ec2Chapters = [
  ec2Chapter,
  ec2GlossaryChapter, 
  ec2FundamentalsChapter
];

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return ec2Chapters.find(chapter => chapter.id === id);
};

/**
 * Get all chapter IDs for the CI/CD introduction section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return ec2Chapters.map(chapter => chapter.id);
};

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = ec2Chapters.findIndex(chapter => chapter.id === currentChapterId);
  return ec2Chapters[currentIndex + 1];
};

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = ec2Chapters.findIndex(chapter => chapter.id === currentChapterId);
  return currentIndex > 0 ? ec2Chapters[currentIndex - 1] : undefined;
};