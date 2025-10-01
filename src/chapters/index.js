// Introduction chapters
import introToCourseContent from "./introduction/intro-to-course.md?raw";
import preRequisitesContent from "./introduction/pre-requisites.md?raw";

// Cloud fundamentals chapters
import whatIsCloudContent from './cloud-fundamentals/what-is-cloud.md?raw';
import whyUseCloudContent from './cloud-fundamentals/why-use-cloud.md?raw';
import awsAccountSetupContent from './cloud-fundamentals/aws-account-setup.md?raw';
import cloudFundamentalsGlossaryContent from './cloud-fundamentals/glossary.md?raw';

// AWS S3 hosting chapters
import clientRepoSetupContent from "./aws-s3-hosting/client-repo-setup.md?raw";
import s3FundamentalsContent from "./aws-s3-hosting/s3-fundamentals.md?raw";
import s3BucketSetupContent from "./aws-s3-hosting/s3-bucket-setup.md?raw";
import s3HostingGlossaryContent from "./aws-s3-hosting/s3-hosting-glossary.md?raw";

// CloudFront chapters
import cloudfrontFundamentalsContent from "./cloudfront/cloudfront-fundamentals.md?raw";
import cloudfrontSetupContent from "./cloudfront/cloudfront-setup.md?raw";
import cloudfrontGlossaryContent from "./cloudfront/glossary.md?raw";

// Intro to CI/CD chapters
import cicdFundamentalsContent from './intro-to-cicd/cicd-fundamentals.md?raw';
import githubActionsBasicsContent from './intro-to-cicd/github-actions-basics.md?raw';
import deploymentPipelineContent from './intro-to-cicd/deployment-pipeline.md?raw';
import cicdGlossaryContent from './intro-to-cicd/glossary.md?raw';

// Docker chapters
import dockerSetupContent from './docker/docker-setup.md?raw';
import dockerGlossaryContent from './docker/docker-glossary.md?raw';
import dockerFundamentalsContent from './docker/docker-fundamentals.md?raw';
import dockerfileBreakdownContent from './docker/dockerfile-breakdown.md?raw';

// AWS CLI ECR chapters
import cliEcrFundamentalsContent from "./aws-cli-ecr/cli-ecr-fundamentals.md?raw";
import ecrGlossaryContent from './aws-cli-ecr/ecr-glossary.md?raw';
import pushToEcrContent from './aws-cli-ecr/push-to-ecr.md?raw';

// EC2 chapters
import ec2FundamentalsContent from './ec2/ec2-fundamentals.md?raw';
import ec2SetupContent from './ec2/ec2-setup.md?raw';
import ec2GlossaryContent from './ec2/ec2-glossary.md?raw';

// CI/CD with EC2 chapters
import cicdEc2FundamentalsContent from './cicd-with-ec2/cicd-ec2-fundamentals.md?raw';
import actionsSetupContent from './cicd-with-ec2/actions-setup.md?raw';
import actionsBreakdownContent from './cicd-with-ec2/actions-breakdown.md?raw';
import cicdEc2GlossaryContent from './cicd-with-ec2/cicd-ec2-glossary.md?raw';

// RDS chapters
import rdsInfoContent from "./rds/rds-info.md?raw";
import rdsSetupContent from "./rds/rds-setup.md?raw";
import deployRdsContent from "./rds/deploy-rds.md?raw";
import rdsGlossaryContent from "./rds/rds-glossary.md?raw";

// Docker Network chapters
import introToDockerNetworkContent from "./docker-network/intro-to-docker-network.md?raw";
import settingUpDockerNetworkContent from "./docker-network/setting-up-docker-network.md?raw";
import understandingDockerNetworkContent from "./docker-network/understanding-docker-network.md?raw";
import dockerNetworkGlossaryContent from "./docker-network/network-glossary.md?raw";

// Docker Compose chapters
import introToDockerComposeContent from "./docker-compose/intro-to-docker-compose.md?raw";
import dockerComposeSetupContent from "./docker-compose/docker-compose-setup.md?raw";
import devContainersSetupContent from "./docker-compose/dev-containers-setup.md?raw";
import dockerComposeGlossaryContent from "./docker-compose/compose-glossary.md?raw";

// Conclusion chapters
import courseConclusionContent from "./conclusion/course-conclusion.md?raw";


/**
 * Helper function to fix asset paths in markdown content
 * Replaces relative paths with correct paths for embedded content
 * @param {string} content - The markdown content
 * @returns {string} Content with corrected asset paths
 */
const fixAssetPaths = (content) => {
  return content.replace(/src="\.\.\/\.\.\/\.\.\/public\/assets\//g, 'src="./assets/');
};


// Main chapters array
export const chapters = [
  // Introduction chapters
  {
    id: 'introduction',
    title: 'Introduction to the course',
    sectionId: 'introduction',
    previousChapterId: 'pre-requisites',
    content: fixAssetPaths(introToCourseContent),
    exercise: null
  },
  {
    id: 'pre-requisites',
    title: 'Pre-Requisites',
    sectionId: 'introduction',
    previousChapterId: null,
    content: fixAssetPaths(preRequisitesContent),
    exercise: null
  },
  // Cloud fundamentals chapters
  {
    id: 'what-is-cloud',
    title: 'What is the Cloud?',
    sectionId: 'cloud-fundamentals',
    previousChapterId: null,
    content: fixAssetPaths(whatIsCloudContent),
    exercise: null
  },
  {
    id: 'why-use-cloud',
    title: 'Why Use the Cloud?',
    sectionId: 'cloud-fundamentals',
    previousChapterId: 'what-is-cloud',
    content: fixAssetPaths(whyUseCloudContent),
    exercise: null
  },
  {
    id: 'aws-account-setup',
    title: 'AWS Account Setup',
    sectionId: 'cloud-fundamentals',
    previousChapterId: 'why-use-cloud',
    content: fixAssetPaths(awsAccountSetupContent),
    exercise: null
  },
  {
    id: 'cloud-fundamentals-glossary',
    title: 'Cloud Fundamentals Glossary',
    sectionId: 'cloud-fundamentals',
    previousChapterId: 'aws-account-setup',
    content: fixAssetPaths(cloudFundamentalsGlossaryContent),
    exercise: null
  },
  // AWS S3 hosting chapters
  {
    id: 'client-repo-setup',
    title: 'Setting up the Client',
    sectionId: 'aws-s3-hosting',
    previousChapterId: null,
    content: fixAssetPaths(clientRepoSetupContent),
    exercise: null
  },
  {
    id: 's3-fundamentals',
    title: 'S3 Fundamentals',
    sectionId: 'aws-s3-hosting',
    previousChapterId: 'client-repo-setup',
    content: fixAssetPaths(s3FundamentalsContent),
    exercise: null
  },
  {
    id: 's3-bucket-setup',
    title: 'Setting up the S3 Bucket',
    sectionId: 'aws-s3-hosting',
    previousChapterId: 's3-fundamentals',
    content: fixAssetPaths(s3BucketSetupContent),
    exercise: null
  },
  {
    id: 's3-glossary',
    title: 'S3 Glossary',
    sectionId: 'aws-s3-hosting',
    previousChapterId: 's3-bucket-setup',
    content: fixAssetPaths(s3HostingGlossaryContent),
    exercise: null
  },
  // CloudFront chapters
  {
    id: 'cloudfront-fundamentals',
    title: 'CloudFront Fundamentals',
    sectionId: 'cloudfront',
    previousChapterId: null,
    content: fixAssetPaths(cloudfrontFundamentalsContent),
    exercise: null
  },
  {
    id: 'cloudfront-setup',
    title: 'CloudFront Setup',
    sectionId: 'cloudfront',
    previousChapterId: 'cloudfront-fundamentals',
    content: fixAssetPaths(cloudfrontSetupContent),
    exercise: null
  },
  {
    id: 'cloudfront-glossary',
    title: 'CloudFront Glossary',
    sectionId: 'cloudfront',
    previousChapterId: 'cloudfront-setup',
    content: fixAssetPaths(cloudfrontGlossaryContent),
    exercise: null
  },
  // Intro to CI/CD chapters
  {
    id: 'cicd-fundamentals',
    title: 'CI/CD Fundamentals',
    sectionId: 'intro-to-cicd',
    previousChapterId: null,
    content: fixAssetPaths(cicdFundamentalsContent),
    exercise: null
  },
  {
    id: 'github-actions-basics',
    title: 'GitHub Actions Basics',
    sectionId: 'intro-to-cicd',
    previousChapterId: 'cicd-fundamentals',
    content: fixAssetPaths(githubActionsBasicsContent),
    exercise: null
  },
  {
    id: 'deployment-pipeline',
    title: 'Automating CI/CD for Rock of Ages Frontend with GitHub Actions',
    sectionId: 'intro-to-cicd',
    previousChapterId: 'github-actions-basics',
    content: fixAssetPaths(deploymentPipelineContent),
    exercise: null
  },
  {
    id: 'cicd-glossary',
    title: 'CI/CD Glossary',
    sectionId: 'intro-to-cicd',
    previousChapterId: 'deployment-pipeline',
    content: fixAssetPaths(cicdGlossaryContent),
    exercise: null
  },
  // Docker chapters
  {
    id: 'docker-setup',
    title: 'Run a Docker Container Locally',
    sectionId: 'intro-to-docker',
    previousChapterId: 'docker-fundamentals',
    content: fixAssetPaths(dockerSetupContent),
    exercise: null
  },
  {
    id: 'docker-glossary',
    title: 'Glossary',
    sectionId: 'intro-to-docker',
    previousChapterId: 'dockerfile-breakdown',
    content: fixAssetPaths(dockerGlossaryContent),
    exercise: null
  },
  {
    id: 'docker-fundamentals',
    title: 'Docker Fundamentals',
    sectionId: 'intro-to-docker',
    previousChapterId: null,
    content: fixAssetPaths(dockerFundamentalsContent),
    exercise: null
  },
  {
    id: 'dockerfile-breakdown',
    title: 'Understanding the Rock of Ages Dockerfile',
    sectionId: 'intro-to-docker',
    previousChapterId: 'docker-setup',
    content: fixAssetPaths(dockerfileBreakdownContent),
    exercise: null
  },
  // AWS CLI ECR chapters
  {
    id: 'aws-cli-ecr-intro',
    title: 'Intro to AWS CLI and ECR',
    sectionId: 'aws-cli-ecr',
    previousChapterId: null,
    content: fixAssetPaths(cliEcrFundamentalsContent),
    exercise: null
  },
  {
    id: 'cli-ecr-glossary',
    title: 'Glossary',
    sectionId: 'aws-cli-ecr',
    previousChapterId: 'cli-ecr',
    content: fixAssetPaths(ecrGlossaryContent),
    exercise: null
  },
  {
    id: 'cli-ecr',
    title: 'Pushing Docker Image to AWS ECR',
    sectionId: 'aws-cli-ecr',
    previousChapterId: 'aws-cli-ecr-intro',
    content: fixAssetPaths(pushToEcrContent),
    exercise: null
  },
  // EC2 chapters
  {
    id: 'ec2-fundamentals',
    title: 'Amazon EC2 Fundamentals',
    sectionId: 'ec2',
    previousChapterId: null,
    content: fixAssetPaths(ec2FundamentalsContent),
    exercise: null
  },
  {
    id: 'ec2-setup',
    title: 'Running Docker Container from ECR on EC2',
    sectionId: 'ec2',
    previousChapterId: 'ec2-fundamentals',
    content: fixAssetPaths(ec2SetupContent),
    exercise: null
  },
  {
    id: 'ec2-glossary',
    title: 'Glossary',
    sectionId: 'ec2',
    previousChapterId: 'ec2-setup',
    content: fixAssetPaths(ec2GlossaryContent),
    exercise: null
  },
  // CI/CD with EC2 chapters
  {
    id: 'advanced-cicd-docker',
    title: 'Advancing CICD Concepts',
    sectionId: 'cicd-ec2-docker',
    previousChapterId: null,
    content: fixAssetPaths(cicdEc2FundamentalsContent),
    exercise: null
  },
  {
    id: 'ec2-action',
    title: 'Github Actions Setup for Rock Of Ages API',
    sectionId: 'cicd-ec2-docker',
    previousChapterId: 'advanced-cicd-docker',
    content: fixAssetPaths(actionsSetupContent),
    exercise: null
  },
  {
    id: 'ci-cd-artifact-breakdown',
    title: 'Understanding the Rock of Ages API GitHub Actions Workflow',
    sectionId: 'cicd-ec2-docker',
    previousChapterId: 'ec2-action',
    content: fixAssetPaths(actionsBreakdownContent),
    exercise: null
  },
  {
    id: 'ec2-cicd-glossary',
    title: 'Glossary',
    sectionId: 'cicd-ec2-docker',
    previousChapterId: 'ci-cd-artifact-breakdown',
    content: fixAssetPaths(cicdEc2GlossaryContent),
    exercise: null
  },
  // RDS chapters
  {
    id: 'workshop3-rds-learning',
    title: 'What is RDS and Why Are We Using It?',
    sectionId: 'rds',
    previousChapterId: null,
    content: fixAssetPaths(rdsInfoContent),
    exercise: null
  },
  {
    id: 'workshop3-rds-setup',
    title: 'RDS Setup',
    sectionId: 'rds',
    previousChapterId: 'workshop3-rds-learning',
    content: fixAssetPaths(rdsSetupContent),
    exercise: null
  },
  {
    id: 'workshop3-rds-deploy',
    title: 'RDS Deployment To EC2',
    sectionId: 'rds',
    previousChapterId: 'workshop3-rds-setup',
    content: fixAssetPaths(deployRdsContent),
    exercise: null
  },
  {
    id: 'rds-and-storage-glossary',
    title: 'Glossary',
    sectionId: 'rds',
    previousChapterId: 'workshop3-rds-deploy',
    content: fixAssetPaths(rdsGlossaryContent),
    exercise: null
  },
  // Conclusion chapters
  {
    id: 'workshopSummary',
    title: 'Summary',
    sectionId: 'conclusion',
    previousChapterId: null,
    content: fixAssetPaths(courseConclusionContent),
    exercise: null
  },
  // Docker Network chapters
  {
    id: 'workshop3-intro-to-docker-network',
    title: 'Intro to Local Development with Docker',
    sectionId: 'docker-network',
    previousChapterId: null,
    content: fixAssetPaths(introToDockerNetworkContent),
    exercise: null
  },
  {
    id: 'workshop3-setting-up-docker-network',
    title: 'Setting Up the Docker Network',
    sectionId: 'docker-network',
    previousChapterId: 'workshop3-intro-to-docker-network',
    content: fixAssetPaths(settingUpDockerNetworkContent),
    exercise: null
  },
  {
    id: 'workshop3-understanding-docker-network',
    title: 'Understanding the Docker Network',
    sectionId: 'docker-network',
    previousChapterId: 'workshop3-setting-up-docker-network',
    content: fixAssetPaths(understandingDockerNetworkContent),
    exercise: null
  },
  {
    id: 'docker-network-glossary',
    title: 'Glossary',
    sectionId: 'docker-network',
    previousChapterId: 'workshop3-understanding-docker-network',
    content: fixAssetPaths(dockerNetworkGlossaryContent),
    exercise: null
  },
  // Docker Compose chapters
  {
    id: 'workshop3-intro-to-docker-compose',
    title: 'Intro to Docker Compose',
    sectionId: 'docker-compose',
    previousChapterId: null,
    content: fixAssetPaths(introToDockerComposeContent),
    exercise: null
  },
  {
    id: 'workshop3-docker-compose-setup',
    title: 'Setting up Docker Compose',
    sectionId: 'docker-compose',
    previousChapterId: 'workshop3-intro-to-docker-compose',
    content: fixAssetPaths(dockerComposeSetupContent),
    exercise: null
  },
  {
    id: 'workshop3-dev-containers-setup',
    title: 'Setting up Dev Containers',
    sectionId: 'docker-compose',
    previousChapterId: 'workshop3-docker-compose-setup',
    content: fixAssetPaths(devContainersSetupContent),
    exercise: null
  },
  {
    id: 'compose-glossary',
    title: 'Glossary',
    sectionId: 'docker-compose',
    previousChapterId: 'workshop3-dev-containers-setup',
    content: fixAssetPaths(dockerComposeGlossaryContent),
    exercise: null
  },
]