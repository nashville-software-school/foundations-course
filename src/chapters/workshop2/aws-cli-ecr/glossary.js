export const cliEcrGlossaryChapter = {
  id: 'cli-ecr-glossary',
  title: 'Glossary',
  sectionId: 'aws-cli-ecr',
  previousChapterId: "cli-ecr",
  content: `## AWS CLI & ECR Glossary

This glossary provides definitions for key terms introduced in the AWS CLI and ECR module.

| Term | Description |
|------|-------------|
| **AWS CLI** | A command-line tool that allows you to interact with AWS services using terminal commands instead of the AWS web console. |
| **ECR (Elastic Container Registry)** | A fully managed AWS service that stores, manages, and deploys Docker container images in a private registry. |
| **Repository** | A storage location in ECR for your Docker images. Each image you push to ECR is tagged and stored in a specific repository. |
| **Image Tag** | A label added to a Docker image that often identifies a version (e.g., \`v1\`, \`latest\`). Required when pushing to ECR. |
| **Authentication (Login)** | The process of connecting your Docker CLI to ECR so you can push and pull images securely. Typically done using \`aws ecr get-login-password\`. |
| **\`docker push\`** | A Docker CLI command used to upload a local image to a remote container registry like ECR. |
| **\`docker tag\`** | A Docker CLI command that applies a new tag (including the registry URL) to an existing image, preparing it to be pushed. |
| **Region** | The geographic location where your ECR repository is created. CLI commands must match this region to succeed. |
| **IAM (Identity and Access Management)** | AWS’s service for controlling user access to resources, including who can push to or pull from an ECR repository. |

`
,
  exercise: null
};