import diagram from "../../../assets/work2diagram.png"

export const workshop2SummaryChapter = {
  id: "workshop2summary",
  title: "Summary",
  sectionId: "workshop2-conclusion",
  previousChapterId: null,
  content: `## What You've Accomplished

In this workshop, you have learned how to deploy a backend conainerized application to the cloud using docker, EC2, aws CLI and ECR. We have also dove a little deeper into the options offered by github actions. 
<img width=700 src="${diagram}"/>

### What You Should Know

By now, you should have some vocabulary and hands on experience that will be usefull during interviews with potential employers:

1. **Docker**: [Docker Glossary](./docker-glossary)

2. **AWS CLI and ECR**: [CLI and ECR Glossary](./ecr-glossary)

3. **Amazon EC2**: [EC2 Glossary](./ec2-glossary)

4. **Automated Deployment with GitHub Actions**: [CI/CD Glossary](./work2-cicd-glossary)

## Get Interview Ready!

You should be able to answer some basic interview questions on the topics we have learned. For example:

* What is Docker?
* What are the benefits of using Docker?
* What is EC2 and what use cases is it designed for?
* What is Amazon ECR and how does it differ from Docker Hub?

__Dont forget!__ ClaudeAI and ChatGPT are great resources to use when prepping for interviews. Here are some sample prompts: 

* Give me a list of interview questions and answers for Docker, Ec2, and ECR
* Can you ask each question one by one and evaluate my answers?

Play around with different prompts to get more specific questions and answers about the services we have learned. 


`,
  exercise: null,
}