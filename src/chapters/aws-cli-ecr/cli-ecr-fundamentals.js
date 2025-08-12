export const awsCliEcrIntroChapter = {
  id: "aws-cli-ecr-intro",
  title: "Intro to AWS CLI and ECR",
  sectionId: "aws-cli-ecr",
  previousChapterId: null,
  content: `## From Local to Cloud

Now that your application is containerized with Docker, the next step is learning how to interact with AWS — both to manage infrastructure and to push your Docker image to the cloud.

In this module, we’ll cover two essential tools:
- **AWS CLI**, the command-line interface for managing AWS resources
- **Amazon ECR**, a secure container image registry hosted by AWS

With these tools, you’ll be able to store your Docker image in the cloud and use it for deployments in later chapters.


## What is the AWS CLI?

The **AWS Command Line Interface (CLI)** lets you interact with AWS services directly from your terminal. Instead of clicking around the AWS Console, you can run simple commands to:
- Create and manage cloud infrastructure
- Upload and download files
- Authenticate with other AWS services (like ECR)

Once installed and configured, the CLI becomes an essential tool in your cloud workflow.

### Why Use the AWS CLI?

- ✅ Faster than using the web console
- ✅ Easily scriptable and automatable
- ✅ Works across services (EC2, S3, ECR, IAM, and more)
- ✅ Integrates with CI/CD pipelines


## What is Amazon ECR?

**Amazon Elastic Container Registry (ECR)** is a secure, scalable container image registry built into AWS.

Think of it like **Docker Hub**, but private and integrated with the rest of your AWS infrastructure.

### Why Use ECR?

- ✅ Private, secure storage for Docker images
- ✅ Supports fine-grained access control with IAM
- ✅ Integrates directly with ECS, EKS, and EC2
- ✅ Works seamlessly with AWS CLI and CI/CD tools


## Workflow: Pushing an Image to ECR

Here's the big picture of how you'll use the AWS CLI and ECR together:

1. **Authenticate** your Docker CLI to access ECR:
   \`aws ecr get-login-password\` → passed to Docker to sign in

2. **Tag** your Docker image with your ECR repository URL

3. **Push** the image to ECR using \`docker push\`

Once it’s in ECR, your image is available to deploy in other AWS services like ECS or EC2.

Check out this video to see a little more in depth into ECR. Again, just watch and don't follow the steps in the video. 
<iframe width="560" height="315" src="https://www.youtube.com/embed/H73uX0TOX9g?si=P8T9OcarwzO4R-YL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


## What We’ll Do Next

In the next chapter, we’ll:
1. Configure your AWS CLI credentials
2. Create an ECR repository
3. Tag and push your Docker image to ECR

By the end, your Rock of Ages image will live in the cloud — ready for deployment.`,
  exercise: null,
};
