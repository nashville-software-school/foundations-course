/**
 * Defines the available sections in the learning platform.
 * Each section represents a major topic area that contains related chapters.
 */

export const sections = [
  // Module 1: Cloud Fundamentals
  {
    id: "cloud-fundamentals",
    title: "Cloud Fundamentals",
    description:
      "Understanding cloud computing concepts, benefits, and AWS account setup",
    required: true,
  },
  // Module 2: AWS S3 for Static Website Hosting
  {
    id: "aws-s3-hosting",
    title: "AWS S3 for Static Website Hosting",
    description:
      "Learn to use S3 for object storage and hosting static React applications",
    required: true,
  },
  // Module 3: CloudFront
  {
    id: "cloudfront",
    title: "CloudFront",
    description: "TBD",
    required: true,
  },
  // Module 4: Introduction to CI/CD
  {
    id: "intro-to-cicd",
    title: "Introduction to CI/CD",
    description:
      "Understand CI/CD fundamentals and implement automated deployments with GitHub Actions",
    required: true,
  },
]

/**
 * Get a section by its ID
 * @param {string} id - The section ID to find
 * @returns {Object|undefined} The section object if found, undefined otherwise
 */
export const getSectionById = (id) => {
  return sections.find((section) => section.id === id)
}

/**
 * Get all section IDs
 * @returns {string[]} Array of section IDs
 */
export const getSectionIds = () => {
  return sections.map((section) => section.id)
}

/**
 * Validate if a section ID exists
 * @param {string} id - The section ID to validate
 * @returns {boolean} True if the section exists, false otherwise
 */
export const isValidSectionId = (id) => {
  return sections.some((section) => section.id === id)
}
