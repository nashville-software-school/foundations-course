import { summaryChapter } from "./summary"
import { furtherLearningChapter } from "./further-learning"
import { deletingResourcesChapter } from "./deleting-aws-resources"

export const conclusionChapters = [
  summaryChapter,
  furtherLearningChapter,
  deletingResourcesChapter,  
]

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return conclusionChapters.find((chapter) => chapter.id === id)
}

/**
 * Get all chapter IDs for the AWS S3 hosting section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return conclusionChapters.map((chapter) => chapter.id)
}

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = conclusionChapters.findIndex(
    (chapter) => chapter.id === currentChapterId
  )
  return conclusionChapters[currentIndex + 1]
}

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = conclusionChapters.findIndex(
    (chapter) => chapter.id === currentChapterId
  )
  return currentIndex > 0 ? conclusionChapters[currentIndex - 1] : undefined
}
