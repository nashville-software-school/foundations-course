import { workshop3RDSSetupChapter } from "./rds-setup";
import { workshop3RDSDeployChapter } from "./deploy-rds";
import { workshop3RDSLearningChapter } from "./rds-info";
import { rdsAndStorageGlossaryChapter } from "./rds-glossary";

export const introToRDSChapters = [
  workshop3RDSSetupChapter,
  workshop3RDSDeployChapter,
  workshop3RDSLearningChapter,
  rdsAndStorageGlossaryChapter
];

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return introToRDSChapters.find(chapter => chapter.id === id);
};

/**
 * Get all chapter IDs for the CI/CD introduction section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return introToRDSChapters.map(chapter => chapter.id);
};

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = introToRDSChapters.findIndex(chapter => chapter.id === currentChapterId);
  return introToRDSChapters[currentIndex + 1];
};

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = introToRDSChapters.findIndex(chapter => chapter.id === currentChapterId);
  return currentIndex > 0 ? introToRDSChapters[currentIndex - 1] : undefined;
};