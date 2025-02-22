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
import { objectsIntroChapter } from './objects-intro'
import { objectsMultipleChapter } from './objects-multiple'
import { objectsCollectionsChapter } from './objects-collections'
import { objectsLibrariesChapter } from "./objects-libraries"
import { objectsComplexChapter } from './objects-complex'
import { objectsPropertiesChapter } from './objects-properties'
import { objectsVotingChapter } from './objects-voting'
import { stringInterpolationChapter } from './string-interpolation'
import { multilineStringsChapter } from './multiline-strings'
import { stringMethodsChapter } from './string-methods'
import { variablesIntroChapter } from './variables-intro'
import { mathOperationsChapter } from './math-operations'
import { booleanLogicChapter } from './boolean-logic'
import { evaluationsChapter } from './evaluations'
import { variablesReviewChapter } from './variables-review'
import { functionsIntroChapter } from './functions-intro'
import { functionsDefiningInvokingChapter } from './functions-defining-invoking'
import { functionsNamingChapter } from './functions-naming'
import { functionsParametersChapter } from './functions-parameters'
import { functionsArgumentsChapter } from './functions-arguments'
import { functionsMultipleParametersChapter } from './functions-multiple-parameters'
import { functionsReturnIntroChapter } from './functions-return-intro'
import { functionsReturnWorkingChapter } from './functions-return-working'
import { functionsReturnPracticeChapter } from './functions-return-practice'
import { functionsScopeBasicsChapter } from './functions-scope-basics'
import { functionsScopeParametersChapter } from './functions-scope-parameters'
import { functionsConditionsChapter } from './functions-conditions'
import { functionsLoopsChapter } from './functions-loops'
import { functionsCallingFunctionsChapter } from './functions-calling-functions'
import { functionsReviewChapter } from './functions-review'

export const chapters = [
  // Variables and Values section (first section)
  variablesIntroChapter,
  mathOperationsChapter,
  stringInterpolationChapter,
  multilineStringsChapter,
  stringMethodsChapter,
  booleanLogicChapter,
  evaluationsChapter,
  variablesReviewChapter,

  // Arrays section
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

  // Objects section
  objectsIntroChapter,
  objectsMultipleChapter,
  objectsCollectionsChapter,
  objectsComplexChapter,
  objectsLibrariesChapter,
  objectsPropertiesChapter,
  objectsVotingChapter,

  // Functions section
  functionsIntroChapter,
  functionsDefiningInvokingChapter,
  functionsNamingChapter,
  functionsParametersChapter,
  functionsArgumentsChapter,
  functionsMultipleParametersChapter,
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
 * Helper function to get chapter by ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return chapters.find(chapter => chapter.id === id)
}

/**
 * Helper function to get chapter content
 * @param {string} id - The chapter ID
 * @returns {Object|null} The chapter content and exercise if found, null otherwise
 */
export const getChapterContent = (id) => {
  const chapter = getChapterById(id)
  return chapter ? {
    content: chapter.content,
    exercise: chapter.exercise
  } : null
}

/**
 * Helper function to get the first chapter in a section
 * @param {string} sectionId - The section ID
 * @returns {Object|undefined} The first chapter in the section
 */
export const getFirstChapterInSection = (sectionId) => {
  return chapters.find(chapter =>
    chapter.sectionId === sectionId && !chapter.previousChapterId
  )
}

/**
 * Helper function to get all chapters in a section
 * @param {string} sectionId - The section ID
 * @returns {Array} Array of chapters in the section
 */
export const getChaptersInSection = (sectionId) => {
  return chapters.filter(chapter => chapter.sectionId === sectionId)
}