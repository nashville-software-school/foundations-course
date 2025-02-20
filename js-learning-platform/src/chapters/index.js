import { arrayIntroChapter } from './arrays-intro'
import { arrayMethodsChapter } from './array-methods'
import { stringsIntroChapter } from './strings-intro'
import { stringInterpolationChapter } from './string-interpolation'
import { multilineStringsChapter } from './multiline-strings'
import { stringMethodsChapter } from './string-methods'
import { conditionsIntroChapter } from './conditions-intro'
import { variablesIntroChapter } from './variables-intro'

export const chapters = [
  // Variables and Values section (first section)
  variablesIntroChapter,

  // Strings section
  stringsIntroChapter,
  stringInterpolationChapter,
  multilineStringsChapter,
  stringMethodsChapter,

  // Conditional Logic section
  conditionsIntroChapter,

  // Arrays section
  arrayIntroChapter,
  arrayMethodsChapter
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