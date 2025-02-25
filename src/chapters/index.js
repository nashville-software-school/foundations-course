import { githubAccountChapter } from './foundations-course/github-account'
import { anthropicAccountChapter } from './foundations-course/anthropic-account'
import { visualStudioCodeChapter } from './foundations-course/visual-studio-code'
import { slackInstallationChapter } from './foundations-course/slack-installation'
import { arrayIntroChapter } from './foundations-course/arrays-intro'
import { arrayIndicesChapter } from './foundations-course/arrays-indices'
import { arrayIterationChapter } from './foundations-course/arrays-iteration'
import { arrayPushChapter } from './foundations-course/arrays-push'
import { arrayConditionsChapter } from './foundations-course/arrays-conditions'
import { arrayLengthChapter } from './foundations-course/arrays-length'
import { arrayPracticeChapter } from './foundations-course/arrays-practice'
import { arrayConditionsPracticeChapter } from './foundations-course/arrays-conditions-practice'
import { arrayStringsChapter } from './foundations-course/arrays-strings'
import { arraySplitJoinChapter } from './foundations-course/arrays-split-join'
import { arrayReviewChapter } from './foundations-course/arrays-review'
import { objectsIntroChapter } from './foundations-course/objects-intro'
import { objectsMultipleChapter } from './foundations-course/objects-multiple'
import { objectsCollectionsChapter } from './foundations-course/objects-collections'
import { objectsLibrariesChapter } from './foundations-course/objects-libraries'
import { objectsComplexChapter } from './foundations-course/objects-complex'
import { objectsPropertiesChapter } from './foundations-course/objects-properties'
import { objectsVotingChapter } from './foundations-course/objects-voting'
import { stringInterpolationChapter } from './foundations-course/string-interpolation'
import { multilineStringsChapter } from './foundations-course/multiline-strings'
import { stringMethodsChapter } from './foundations-course/string-methods'
import { variablesIntroChapter } from './foundations-course/variables-intro'
import { mathOperationsChapter } from './foundations-course/math-operations'
import { booleanLogicChapter } from './foundations-course/boolean-logic'
import { evaluationsChapter } from './foundations-course/evaluations'
import { variablesReviewChapter } from './foundations-course/variables-review'
import { functionsIntroChapter } from './foundations-course/functions-intro'
import { functionsDefiningInvokingChapter } from './foundations-course/functions-defining-invoking'
import { functionsNamingChapter } from './foundations-course/functions-naming'
import { functionsParametersChapter } from './foundations-course/functions-parameters'
import { functionsArgumentsChapter } from './foundations-course/functions-arguments'
import { functionsMultipleParametersChapter } from './foundations-course/functions-multiple-parameters'
import { functionsArrowSyntaxChapter } from './foundations-course/functions-arrow-syntax'
import { functionsReturnIntroChapter } from './foundations-course/functions-return-intro'
import { functionsReturnWorkingChapter } from './foundations-course/functions-return-working'
import { functionsReturnPracticeChapter } from './foundations-course/functions-return-practice'
import { functionsScopeBasicsChapter } from './foundations-course/functions-scope-basics'
import { functionsScopeParametersChapter } from './foundations-course/functions-scope-parameters'
import { functionsConditionsChapter } from './foundations-course/functions-conditions'
import { functionsLoopsChapter } from './foundations-course/functions-loops'
import { functionsCallingFunctionsChapter } from './foundations-course/functions-calling-functions'
import { functionsReviewChapter } from './foundations-course/functions-review'
import { modulesChapters } from './foundations-course/modules'

export const chapters = [
  // Getting Started section
  githubAccountChapter,
  anthropicAccountChapter,
  visualStudioCodeChapter,
  slackInstallationChapter,

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
  functionsArrowSyntaxChapter,
  functionsReturnIntroChapter,
  functionsReturnWorkingChapter,
  functionsReturnPracticeChapter,
  functionsScopeBasicsChapter,
  functionsScopeParametersChapter,
  functionsConditionsChapter,
  functionsLoopsChapter,
  functionsCallingFunctionsChapter,
  functionsReviewChapter,

  // Modules section
  ...modulesChapters
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