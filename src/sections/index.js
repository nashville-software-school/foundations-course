/**
 * Defines the available sections in the learning platform.
 * Each section represents a major topic area that contains related chapters.
 */

//Workshop 1 sections
export const sectionsWorkshop1 = [
  // Module 0: Intro th the course
  {
    id: "introduction",
    title: "Introduction",
    description:
      "A concise introduction to the course, outlining the learning objectives, delivery format, and the foundational AWS architecture will build by the end.",
    required: true,
  },
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
  // Module 5: Conclusion
  {
    id: "conclusion",
    title: "Conclusion",
    description:
      "Overview of what we have learned and further learning resources",
    required: true,
  },
]
//Workshop 2 sections
export const sectionsWorkshop2 = [
  // Module 0: Intro to workshop 2
  {
    id: "intro-to-workshop2",
    title: "Introduction",
    description: "Introduction to what we will learn in workshop 2",
    required: true,
  },
  // Module 1: Intro to Docker
  {
    id: "intro-to-docker",
    title: "Docker",
    description:
      "Introduction to Docker concepts, installing and running Docker locally",
    required: true,
  },
  // Module 2: AWS CLI and intro to ECR
  {
    id: "aws-cli-ecr",
    title: "Amazon ECR",
    description:
      "Setting up CLI to use with AWS. Intro to ECR and using the CLI to push a docker image to the repository",
    required: true,
  },
  // Module 3: AWS EC2
  {
    id: "ec2",
    title: "EC2",
    description: "Running Docker on an EC2 instance",
    required: true,
  },
  // Module 4: CICD for EC2 and Docker
  {
    id: "cicd-ec2-docker",
    title: "CI/CD with Docker and EC2",
    description:
      "CI/CD changes building on the first workshop to deploy docker containers on EC2",
    required: true,
  },
  // Module 5: Conclusion
  {
    id: "workshop2-conclusion",
    title: "Conclusion",
    description:
      "Overview of what we have learned and further learning resources",
    required: true,
  },
]
//Workshop 3 sections
export const sectionsWorkshop3 = [
  // Module 0: Intro to workshop 3
  {
    id: "intro-to-workshop3",
    title: "Introduction",
    description: "Introduction to what we will learn in workshop 3",
    required: true,
  },
  // Module 1: RDS
  {
    id: "rds",
    title: "RDS",
    description: "Introduction to AWS RDS and our updated API repository",
    required: true,
  },
  // Module 2: Docker Network
  {
    id: "docker-network",
    title: "Docker Network",
    description: "Setting up the Docker Network for local development",
    required: true,
  },
  // Module TBD: Conclusion
  {
    id: "workshop3-conclusion",
    title: "Conclusion",
    description:
      "Overview of what we have learned and further learning resources",
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
