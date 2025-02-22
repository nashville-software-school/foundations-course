import { modulesIntroChapter } from '../modules-intro.js'
import { modulesExportImportChapter } from '../modules-export-import.js'
import { modulesSingleResponsibilityChapter } from '../modules-single-responsibility.js'
import { modulesMultipleExportsChapter } from '../modules-multiple-exports.js'
import { modulesFunctionsChapter } from '../modules-functions.js'
import { modulesDataChapter } from '../modules-data.js'
import { modulesOrganizationChapter } from '../modules-organization.js'
import { modulesDependenciesChapter } from '../modules-dependencies.js'
import { modulesBestPracticesChapter } from '../modules-best-practices.js'
import { modulesFinalProjectChapter } from '../modules-final-project.js'

export const modulesChapters = [
  modulesIntroChapter,
  modulesExportImportChapter,
  modulesSingleResponsibilityChapter,
  modulesMultipleExportsChapter,
  modulesFunctionsChapter,
  modulesDataChapter,
  modulesOrganizationChapter,
  modulesDependenciesChapter,
  modulesBestPracticesChapter,
  modulesFinalProjectChapter
]

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return modulesChapters.find(chapter => chapter.id === id)
}

/**
 * Get all chapter IDs for the modules section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return modulesChapters.map(chapter => chapter.id)
}

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = modulesChapters.findIndex(chapter => chapter.id === currentChapterId)
  return modulesChapters[currentIndex + 1]
}

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = modulesChapters.findIndex(chapter => chapter.id === currentChapterId)
  return currentIndex > 0 ? modulesChapters[currentIndex - 1] : undefined
}