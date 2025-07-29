import { workshop3SummaryChapter } from "./summary";
import { workshop3FurtherLearningChapter } from "./further-learning";

export const workshop3ConclusionChapters = [
  workshop3SummaryChapter,
  workshop3FurtherLearningChapter
];

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return workshop3ConclusionChapters.find(chapter => chapter.id === id);
};

/**
 * Get all chapter IDs for the CI/CD introduction section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return workshop3ConclusionChapters.map(chapter => chapter.id);
};

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = workshop3ConclusionChapters.findIndex(chapter => chapter.id === currentChapterId);
  return workshop3ConclusionChapters[currentIndex + 1];
};

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = workshop3ConclusionChapters.findIndex(chapter => chapter.id === currentChapterId);
  return currentIndex > 0 ? workshop3ConclusionChapters[currentIndex - 1] : undefined;
};