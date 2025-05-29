import { cloudfrontFundamentalsChapter } from "./cloudfront-fundamentals"
import { cloudfrontSetupChapter } from "./cloudfront-setup"
import { cloudfrontGlossaryChapter } from "./glossary"

export const cloudfrontChapters = [
  cloudfrontFundamentalsChapter,
  cloudfrontSetupChapter,
  cloudfrontGlossaryChapter,
]

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return cloudfrontChapters.find((chapter) => chapter.id === id)
}

/**
 * Get all chapter IDs for the cloud fundamentals section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return cloudfrontChapters.map((chapter) => chapter.id)
}

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = cloudfrontChapters.findIndex(
    (chapter) => chapter.id === currentChapterId
  )
  return cloudfrontChapters[currentIndex + 1]
}

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = cloudfrontChapters.findIndex(
    (chapter) => chapter.id === currentChapterId
  )
  return currentIndex > 0 ? cloudfrontChapters[currentIndex - 1] : undefined
}
