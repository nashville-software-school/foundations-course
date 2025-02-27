import { functionsIntroChapter } from './functions-intro'
import { functionsDefiningInvokingChapter } from './functions-defining-invoking'
import { functionsNamingChapter } from './functions-naming'
import { functionsParametersChapter } from './functions-parameters'
import { functionsArgumentsChapter } from './functions-arguments'
import { functionsMultipleParametersChapter } from './functions-multiple-parameters'
import { functionsArrowSyntaxChapter } from './functions-arrow-syntax'
import { functionsReturnIntroChapter } from './functions-return-intro'
import { functionsReturnWorkingChapter } from './functions-return-working'
import { functionsReturnPracticeChapter } from './functions-return-practice'
import { functionsScopeBasicsChapter } from './functions-scope-basics'
import { functionsScopeParametersChapter } from './functions-scope-parameters'
import { functionsConditionsChapter } from './functions-conditions'
import { functionsLoopsChapter } from './functions-loops'
import { functionsCallingFunctionsChapter } from './functions-calling-functions'
import { functionsReviewChapter } from './functions-review'

export const functionChapters = [
  functionsIntroChapter,
  functionsDefiningInvokingChapter,
  functionsNamingChapter,
  functionsParametersChapter,
  functionsArgumentsChapter,
  functionsMultipleParametersChapter,
  functionsArrowSyntaxChapter,
  functionsReturnIntroChapter,
  functionsReturnWorkingChapter,
  functionsReturnPracticeChapter,
  functionsScopeBasicsChapter,
  functionsScopeParametersChapter,
  functionsConditionsChapter,
  functionsLoopsChapter,
  functionsCallingFunctionsChapter,
  functionsReviewChapter
]

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return functionChapters.find(chapter => chapter.id === id)
}

/**
 * Get all chapter IDs for the functions section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return functionChapters.map(chapter => chapter.id)
}

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = functionChapters.findIndex(chapter => chapter.id === currentChapterId)
  return functionChapters[currentIndex + 1]
}

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = functionChapters.findIndex(chapter => chapter.id === currentChapterId)
  return currentIndex > 0 ? functionChapters[currentIndex - 1] : undefined
}