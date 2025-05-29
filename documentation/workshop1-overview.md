# Workshop 1: Introduction to Cloud and CI/CD with React

## Workshop Overview
Deploy a static React application to AWS using S3, CloudFront, and GitHub Actions for automated deployments. Students will gain hands-on experience with fundamental cloud concepts and build a professional deployment pipeline.

## Learning Outcomes
By the end of this workshop, students will:
- Understand fundamental cloud computing concepts and terminology
- Deploy a React application to AWS S3 for static website hosting
- Configure CloudFront CDN for global content delivery with HTTPS
- Implement a CI/CD pipeline using GitHub Actions for automated deployments
- Add "AWS Cloud Development" as a skill on their resume

## Session 1: Cloud Fundamentals
**Duration:** 2 hours  
**Modules Covered:** Introduction, Cloud Fundamentals

### Hour 1: Self-Paced Learning Lab
Students will:
- Read about what cloud computing is and isn't
- Learn the key characteristics of cloud services
- Understand IaaS, PaaS, and SaaS service models
- Set up their AWS student account
- Explore the AWS Management Console

### Hour 2: Live Walkthrough & Deep Dive
Instructor will demonstrate:
- AWS Console navigation and key areas
- Regions and availability zones
- Overview of services we'll use (S3, CloudFront, EC2, RDS)
- Cloud vs traditional infrastructure comparison
- Real-world cloud use cases

**Key Concepts:** Cloud computing, on-demand services, IaaS/PaaS/SaaS, AWS regions, scalability

## Session 2: AWS S3 for Static Website Hosting
**Duration:** 2 hours  
**Module Covered:** AWS S3 for Static Website Hosting

### Hour 1: Self-Paced Learning Lab
Students will:
- Fork and clone the Rock of Ages React application
- Test the application locally
- Learn S3 fundamentals and object storage concepts
- Create and configure an S3 bucket
- Build and manually upload their React app to S3
- Access their live website via S3 endpoint

### Hour 2: Live Walkthrough & Deep Dive
Instructor will demonstrate:
- S3 bucket creation with proper naming conventions
- Static website hosting configuration
- Bucket policies and public access settings
- The npm build process explained
- Manual file upload to S3
- How S3 serves web content

**Key Concepts:** S3, object storage, buckets, static website hosting, bucket policies, build process

## Session 3: CloudFront
**Duration:** 2 hours  
**Module Covered:** CloudFront

### Hour 1: Self-Paced Learning Lab
Students will:
- Learn what CloudFront is and why it's beneficial
- Create a CloudFront distribution
- Connect CloudFront to their S3 bucket
- Configure caching and compression settings
- Access their website via CloudFront URL

### Hour 2: Live Walkthrough & Deep Dive
Instructor will demonstrate:
- CloudFront distribution creation step-by-step
- How CDNs work and improve performance
- Edge locations and global content delivery
- HTTPS and security benefits
- Cache behaviors and optimization
- The complete architecture: S3 + CloudFront

**Key Concepts:** CDN, CloudFront, edge locations, distributions, caching, HTTPS, compression

## Session 4: Introduction to CI/CD
**Duration:** 2 hours  
**Module Covered:** Introduction to CI/CD

### Hour 1: Self-Paced Learning Lab
Students will:
- Learn CI/CD fundamentals
- Understand GitHub Actions basics
- Set up AWS credentials as GitHub secrets
- Create a deployment workflow file
- Test automated deployments
- Troubleshoot common issues

### Hour 2: Live Walkthrough & Deep Dive
Instructor will demonstrate:
- CI/CD concepts and benefits
- GitHub Actions workflow syntax
- Setting up secrets securely
- Building the complete deployment pipeline
- Testing the automation
- Best practices and troubleshooting tips

**Key Concepts:** CI/CD, GitHub Actions, workflows, automated deployment, secrets management

## Post-Workshop Module: Workshop Wrap-up & Review
**Format:** Self-paced review material  
**When:** Need to discuss if this will be done independently or as a part of the final session. 

### Content Includes:

#### 1. What You've Accomplished
- Recap of the complete architecture built
- Summary of key technologies mastered
- Visual diagram of the deployment pipeline

#### 2. Key Concepts Review
- Links to all module glossaries:
  - Cloud Fundamentals Glossary
  - S3 Glossary
  - CloudFront Glossary
  - CI/CD Glossary
- Consolidated list of must-know terms

#### 3. Interview Preparation Questions
Interactive self-assessment with questions like:
- "Explain what an S3 bucket is and how it differs from traditional file storage"
- "What benefits does CloudFront provide that S3 alone does not?"
- "Describe the CI/CD pipeline you built and why automation is important"
- "What happens when you push code to your GitHub repository?"
- "Explain the difference between IaaS, PaaS, and SaaS with examples"

**Delivery Options:**
- Questions with expandable answers for self-checking
- Prompt template for AI practice: "I'm preparing for a job interview. Ask me about [topic] and evaluate my answer"

#### 4. Clean Up Your Resources
Step-by-step instructions to delete:
- CloudFront distribution
- S3 bucket and all objects
- GitHub secrets (optional)
- Verification steps to ensure everything is cleaned up

#### 5. Next Steps & Additional Resources
- AWS documentation links for deeper learning
- Free AWS training resources
- How to showcase this project on your resume
- Preview of Workshop 2 (if interested in continuing)

## Architecture Summary
By workshop completion, students will have built:

`GitHub Repository → GitHub Actions → S3 Bucket → CloudFront → End Users`

## Resources Provided
- Pre-built Rock of Ages React application
- Step-by-step course website
- AWS student accounts with necessary permissions
- Slack channel for real-time support
- Configuration templates and code snippets

## Success Metrics
Students successfully complete the workshop when they can:
- Access their React app via CloudFront HTTPS URL
- Push code changes that automatically deploy via GitHub Actions
- Explain the purpose of each component in their architecture
- Confidently discuss their cloud deployment in an interview setting