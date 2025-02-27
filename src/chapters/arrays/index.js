import { arrayIntroChapter } from './arrays-intro'
import { arrayIndicesChapter } from './arrays-indices'
import { arrayIterationChapter } from './arrays-iteration'
import { arrayPushChapter } from './arrays-push'
import { arrayConditionsChapter } from './arrays-conditions'
import { arrayLengthChapter } from './arrays-length'
import { arrayPracticeChapter } from './arrays-practice'
import { arrayConditionsPracticeChapter } from './arrays-conditions-practice'
import { arrayStringsChapter } from './arrays-strings'
import { arraySplitJoinChapter } from './arrays-split-join'
import { arrayReviewChapter } from './arrays-review'
import { arrayMethodsChapter } from './array-methods'

export const arrayChapters = [
  arrayIntroChapter,
  arrayIndicesChapter,
  arrayIterationChapter,
  arrayPushChapter,
  arrayConditionsChapter,
  arrayLengthChapter,
  arrayPracticeChapter,
  arrayConditionsPracticeChapter,
  arrayStringsChapter,
  arraySplitJoinChapter,
  arrayReviewChapter,
  arrayMethodsChapter
]

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return arrayChapters.find(chapter => chapter.id === id)
}

/**
 * Get all chapter IDs for the arrays section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return arrayChapters.map(chapter => chapter.id)
}

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = arrayChapters.findIndex(chapter => chapter.id === currentChapterId)
  return arrayChapters[currentIndex + 1]
}

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = arrayChapters.findIndex(chapter => chapter.id === currentChapterId)
  return currentIndex > 0 ? arrayChapters[currentIndex - 1] : undefined
}