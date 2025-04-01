import { variablesIntroChapter } from './variables-intro'
import { mathOperationsChapter } from './math-operations'
import { stringInterpolationChapter } from './string-interpolation'
import { multilineStringsChapter } from './multiline-strings'
import { stringMethodsChapter } from './string-methods'
import { booleanLogicChapter } from './boolean-logic'
import { evaluationsChapter } from './evaluations'
import { variablesReviewChapter } from './variables-review'

export const variablesChapters = [
  variablesIntroChapter,
  stringInterpolationChapter,
  mathOperationsChapter,
  multilineStringsChapter,
  stringMethodsChapter,
  booleanLogicChapter,
  evaluationsChapter,
  variablesReviewChapter
]

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return variablesChapters.find(chapter => chapter.id === id)
}

/**
 * Get all chapter IDs for the variables section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return variablesChapters.map(chapter => chapter.id)
}

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = variablesChapters.findIndex(chapter => chapter.id === currentChapterId)
  return variablesChapters[currentIndex + 1]
}

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = variablesChapters.findIndex(chapter => chapter.id === currentChapterId)
  return currentIndex > 0 ? variablesChapters[currentIndex - 1] : undefined
}