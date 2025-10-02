export const nav = [
  // Module 0: Intro to the course
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
  // Module 5: Intro to Docker
  {
    id: "intro-to-docker",
    title: "Docker",
    description:
      "Introduction to Docker concepts, installing and running Docker locally",
    required: true,
  },
  // Module 6: AWS CLI and intro to ECR
  {
    id: "aws-cli-ecr",
    title: "Amazon ECR",
    description:
      "Setting up CLI to use with AWS. Intro to ECR and using the CLI to push a docker image to the repository",
    required: true,
  },
  // Module 7: AWS EC2
  {
    id: "ec2",
    title: "EC2",
    description: "Running Docker on an EC2 instance",
    required: true,
  },
  // Module 8: CICD for EC2 and Docker
  {
    id: "cicd-ec2-docker",
    title: "CI/CD with Docker and EC2",
    description:
      "CI/CD changes building on the first workshop to deploy docker containers on EC2",
    required: true,
  },
  // Module 9: RDS
  {
    id: "rds",
    title: "RDS",
    description: "Introduction to AWS RDS and our updated API repository",
    required: true,
  },
  {
    id: "conclusion",
    title: "Conclusion",
    description: "Overview of what we've learned",
    required: true,
  },
  // Module 10: Docker Network
  {
    id: "docker-network",
    title: "Docker Network",
    description: "Setting up the Docker Network for local development",
    required: false,
    optional: true
  },
   // Module 11: Docker Compose
  {
    id: "docker-compose",
    title: "Docker Compose",
    description: "Setting up Docker Compose for local development",
    required: false,
    optional: true
  }

]
