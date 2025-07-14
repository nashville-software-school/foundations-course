import { workshop1Chapters } from "./workshop1"
import { workshop2Chapters } from "./workshop2"
import { workshop3Chapters } from "./workshop3"

export const chapters = [
  ...workshop1Chapters,
  ...workshop2Chapters,
  ...workshop3Chapters
]
/**
 * Helper function to get chapter by ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return chapters.find((chapter) => chapter.id === id)
}

/**
 * Helper function to get chapter content
 * @param {string} id - The chapter ID
 * @returns {Object|null} The chapter content and exercise if found, null otherwise
 */
export const getChapterContent = (id) => {
  const chapter = getChapterById(id)
  return chapter
    ? {
        content: chapter.content,
        exercise: chapter.exercise,
      }
    : null
}

/**
 * Helper function to get the first chapter in a section
 * @param {string} sectionId - The section ID
 * @returns {Object|undefined} The first chapter in the section
 */
export const getFirstChapterInSection = (sectionId) => {
  return chapters.find(
    (chapter) => chapter.sectionId === sectionId && !chapter.previousChapterId
  )
}

/**
 * Helper function to get all chapters in a section
 * @param {string} sectionId - The section ID
 * @returns {Array} Array of chapters in the section
 */
export const getChaptersInSection = (sectionId) => {
  return chapters.filter((chapter) => chapter.sectionId === sectionId)
}
