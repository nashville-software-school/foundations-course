import { workshop3IntroToDNChapter } from "./intro-to-docker-network"
import { dockerNetworkGlossaryChapter } from "./network-glossary"
import { workshop3SettingUpDNChapter } from "./setting-up-docker-network"
import { workshop3UnderstandingDNChapter } from "./understanding-docker-network"

export const workshop3DockerNetworkChapters = [
  workshop3IntroToDNChapter,
  workshop3SettingUpDNChapter,
  workshop3UnderstandingDNChapter,
  dockerNetworkGlossaryChapter
]

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return workshop3DockerNetworkChapters.find((chapter) => chapter.id === id)
}

/**
 * Get all chapter IDs for the docker-network section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return workshop3DockerNetworkChapters.map((chapter) => chapter.id)
}

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = workshop3DockerNetworkChapters.findIndex(
    (chapter) => chapter.id === currentChapterId
  )
  return workshop3DockerNetworkChapters[currentIndex + 1]
}

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = workshop3DockerNetworkChapters.findIndex(
    (chapter) => chapter.id === currentChapterId
  )
  return currentIndex > 0
    ? workshop3DockerNetworkChapters[currentIndex - 1]
    : undefined
}
