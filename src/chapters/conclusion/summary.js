import diagram from "./diagram.png"

export const summaryChapter = {
  id: "summary",
  title: "Summary",
  sectionId: "conclusion",
  previousChapterId: null,
  content: `## What You've Accomplished

In this workshop, you have learned how to deploy a client application to the cloud using s3 static website hosting along with a cloudfront CDN (content delivery network). We have also learned the fundamentals of CI/CD and how to use github pipelines to automate builds, testing, and deployment of resources to AWS. 

<img width=700 src="${diagram}"/>

### What You Should Know

By now, you should have some vocabulary and hands on experience that will be usefull during interviews with potential employers:

1. **Cloud Fundamentals**: [cloud fundamentals glossary](./cloud-fundamentals-glossary)

2. **Frontend Hosting with Amazon S3**: [s3 glossary](./s3-hosting-glossary)

3. **Content Delivery with CloudFront**: 

4. **Automated Deployment with GitHub Actions**: [CI/CD glossary](./cicd-glossary)

## Get Interview Ready!

You should be able to answer some basic interview questions on the topics we have learned. For example:

* What is AWS?
* What are the benefits of using cloud computing vs other deployment models?
* Explain what an S3 bucket is.
* What does CloudFront provide that S3 alone does not?
* What is a CI/CD pipeline?
* Describe the build stage.

__Dont forget!__ ClaudeAI and ChatGPT are great resources to use when prepping for interviews. Here's some sample prompts: 

* Give me a list of interview questions and answers for AWS cloud fundamentals
* Can you ask each question one by one and evaluate my answers?


`,
  exercise: null,
}