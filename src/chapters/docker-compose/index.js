import { devContainersSetupChapter } from "./dev-containers-setup"
import { dockerComposeSetupChapter } from "./docker-compose-setup"
import { dockerComposeGlossaryChapter } from "./compose-glossary"
import { introToDCChapter } from "./intro-to-docker-compose"

export const dockerComposeChapters = [
  introToDCChapter,
  dockerComposeSetupChapter,
  devContainersSetupChapter,
  dockerComposeGlossaryChapter,
]

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return dockerComposeChapters.find((chapter) => chapter.id === id)
}

/**
 * Get all chapter IDs for the docker-network section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return dockerComposeChapters.map((chapter) => chapter.id)
}

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = dockerComposeChapters.findIndex(
    (chapter) => chapter.id === currentChapterId
  )
  return dockerComposeChapters[currentIndex + 1]
}

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = dockerComposeChapters.findIndex(
    (chapter) => chapter.id === currentChapterId
  )
  return currentIndex > 0
    ? dockerComposeChapters[currentIndex - 1]
    : undefined
}
