import { objectsIntroChapter } from './objects-intro'
import { objectsMultipleChapter } from './objects-multiple'
import { objectsCollectionsChapter } from './objects-collections'
import { objectsLibrariesChapter } from './objects-libraries'
import { objectsComplexChapter } from './objects-complex'
import { objectsPropertiesChapter } from './objects-properties'
import { objectsVotingChapter } from './objects-voting'

export const objectChapters = [
  objectsIntroChapter,
  objectsMultipleChapter,
  objectsCollectionsChapter,
  objectsComplexChapter,
  objectsLibrariesChapter,
  objectsPropertiesChapter,
  objectsVotingChapter
]

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return objectChapters.find(chapter => chapter.id === id)
}

/**
 * Get all chapter IDs for the objects section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return objectChapters.map(chapter => chapter.id)
}

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = objectChapters.findIndex(chapter => chapter.id === currentChapterId)
  return objectChapters[currentIndex + 1]
}

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = objectChapters.findIndex(chapter => chapter.id === currentChapterId)
  return currentIndex > 0 ? objectChapters[currentIndex - 1] : undefined
}