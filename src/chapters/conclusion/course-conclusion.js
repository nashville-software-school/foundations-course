import diagram from "../../assets/workshopOverview.png";


export const workshopSummaryChapter = {
  id: "workshopSummary",
  title: "Summary",
  sectionId: "conclusion",
  previousChapterId: null,
  content: `## What You've Accomplished!
  
  In this workshop, you have gotten some hands on experience with using devops practices within a cloud ecosystem. We've deployed a full stack application using AWS services such as S3, Cloudfront, Ec2, ECR, and RDS. We've also employed devops and automation tools such as Docker, CI/CD pipelines, and github actions. 
  
  ### Here's another look at what you've built!
  <img width=700 src="${diagram}"/>
  
  ### What You Should Know
  
  By now, you should have some vocabulary and hands on experience that will be useful during interviews with potential employers:
  

  1. **Cloud Fundamentals**: [cloud fundamentals Glossary](./cloud-fundamentals-glossary)

  2. **Frontend Hosting with Amazon S3**: [s3 Glossary](./s3-glossary)

  3. **Content Delivery with CloudFront**: [CloudFront Glossary](./cloudfront-glossary)

  4. **Automated Deployment with GitHub Actions**: [CI/CD Glossary](./cicd-glossary)

  5. **Docker**: [Docker Glossary](./docker-glossary)

  6. **AWS CLI and ECR**: [CLI and ECR Glossary](./cli-ecr-glossary)

  7. **Amazon EC2**: [EC2 Glossary](./ec2-glossary)

  8. **Automated Deployment with GitHub Actions**: [CI/CD Glossary](./ec2-cicd-glossary)

  9. **RDS**: [RDS Glossary](./rds-and-storage-glossary)
  
  
  ## Get Interview Ready!
  
  You should be able to answer some basic interview questions on the topics we have learned. For example:
  
  * What is AWS?
  * What are the benefits of using cloud computing vs other deployment models?
  * Explain what an S3 bucket is.
  * What does CloudFront provide that s3 alone does not?
  * What is a CI/CD pipeline?
  * Describe the build stage.
  * What is Docker?
  * What are the benefits of using Docker?
  * What is EC2 and what use cases is it designed for?
  * What is Amazon ECR and how does it differ from Docker Hub?
  * What is RDS?
  * When would you use a relational database compared to other storage options?
  
  
  __Don't forget!__ ClaudeAI and ChatGPT are great resources to use when prepping for interviews. Here are some sample prompts: 
  
  * Give me a list of interview questions and answers for CI/CD and Docker 
  * Can you ask each question one by one and evaluate my answers?
  
  Play around with different prompts to get more specific questions and answers about the services we have learned. 
  
`,
  exercise: null,
}