import { cloudFundamentalsChapters } from "./cloud-fundamentals"
import { awsS3HostingChapters } from "./aws-s3-hosting"
import { introToCicdChapters } from "./intro-to-cicd"
import { cloudfrontChapters } from "./cloudfront"
import { introToDockerChapters } from "./docker"
import { cliEcrChapters } from "./aws-cli-ecr"
import { ec2Chapters } from "./ec2"
import { ec2CicdChapters } from "./cicd-with-ec2"
import { introToRDSChapters } from "./rds"
import { workshop3DockerNetworkChapters } from "./docker-network"
import { workshop3DockerComposeChapters } from "./docker-compose"

export const chapters = [
  ...cloudFundamentalsChapters,
  ...awsS3HostingChapters,
  ...cloudfrontChapters,
  ...introToCicdChapters,
  ...introToDockerChapters,
  ...cliEcrChapters,
  ...ec2Chapters,
  ...ec2CicdChapters,
  ...introToRDSChapters,
  ...workshop3DockerNetworkChapters,
  ...workshop3DockerComposeChapters,
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
