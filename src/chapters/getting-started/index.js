import { githubAccountChapter } from './github-account'
import { anthropicAccountChapter } from './anthropic-account'
import { visualStudioCodeChapter } from './visual-studio-code'
import { slackInstallationChapter } from './slack-installation'

export const gettingStartedChapters = [
  githubAccountChapter,
  anthropicAccountChapter,
  visualStudioCodeChapter,
  slackInstallationChapter
]

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return gettingStartedChapters.find(chapter => chapter.id === id)
}

/**
 * Get all chapter IDs for the getting started section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return gettingStartedChapters.map(chapter => chapter.id)
}

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = gettingStartedChapters.findIndex(chapter => chapter.id === currentChapterId)
  return gettingStartedChapters[currentIndex + 1]
}

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = gettingStartedChapters.findIndex(chapter => chapter.id === currentChapterId)
  return currentIndex > 0 ? gettingStartedChapters[currentIndex - 1] : undefined
}