import { introToDNChapter } from "./intro-to-docker-network"
import { dockerNetworkGlossaryChapter } from "./network-glossary"
import { settingUpDNChapter } from "./setting-up-docker-network"
import { understandingDNChapter } from "./understanding-docker-network"

export const dockerNetworkChapters = [
  introToDNChapter,
  settingUpDNChapter,
  understandingDNChapter,
  dockerNetworkGlossaryChapter
]

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return dockerNetworkChapters.find((chapter) => chapter.id === id)
}

/**
 * Get all chapter IDs for the docker-network section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return dockerNetworkChapters.map((chapter) => chapter.id)
}

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = dockerNetworkChapters.findIndex(
    (chapter) => chapter.id === currentChapterId
  )
  return dockerNetworkChapters[currentIndex + 1]
}

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = dockerNetworkChapters.findIndex(
    (chapter) => chapter.id === currentChapterId
  )
  return currentIndex > 0
    ? dockerNetworkChapters[currentIndex - 1]
    : undefined
}
