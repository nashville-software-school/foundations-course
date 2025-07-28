import { workshop3DevContainersSetupChapter } from "./dev-containers-setup"
import { workshop3DCSetupChapter } from "./docker-compose-setup"
import { dockerComposeGlossaryChapter } from "./glossary"
import { workshop3IntroToDCChapter } from "./intro-to-docker-compose"

export const workshop3DockerComposeChapters = [
  workshop3IntroToDCChapter,
  workshop3DCSetupChapter,
  workshop3DevContainersSetupChapter,
  dockerComposeGlossaryChapter,
]

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return workshop3DockerComposeChapters.find((chapter) => chapter.id === id)
}

/**
 * Get all chapter IDs for the docker-network section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return workshop3DockerComposeChapters.map((chapter) => chapter.id)
}

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = workshop3DockerComposeChapters.findIndex(
    (chapter) => chapter.id === currentChapterId
  )
  return workshop3DockerComposeChapters[currentIndex + 1]
}

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = workshop3DockerComposeChapters.findIndex(
    (chapter) => chapter.id === currentChapterId
  )
  return currentIndex > 0
    ? workshop3DockerComposeChapters[currentIndex - 1]
    : undefined
}
