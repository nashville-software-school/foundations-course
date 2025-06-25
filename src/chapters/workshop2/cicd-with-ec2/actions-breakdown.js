export const githubActionsBreakdownChapter = {
  id: "ci-cd-artifact-breakdown",
  title: "Understanding the Rock of Ages API GitHub Actions Workflow",
  sectionId: 'cicd-ec2-docker',
  previousChapterId: "ec2-action",
  content: `## Dissecting the CI/CD Workflow

Here’s the full GitHub Actions YAML workflow we’ll explore:

\`\`\`yaml
name: Build, Test, & Push Docker Image

on:
  push:
    branches: [main]

permissions:
  id-token: write
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      image_tag: \${{ steps.set-tag.outputs.image_tag }}
    steps:
      - uses: actions/checkout@v4
      - id: set-tag
        run: echo "image_tag=myapp:latest" >> $GITHUB_OUTPUT
      - run: docker build -t myapp:latest .
      - run: docker save myapp:latest -o myapp-latest.tar
      - uses: actions/upload-artifact@v4
        with:
          name: docker-image
          path: myapp-latest.tar

  test:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: docker-image
      - run: docker load -i myapp-latest.tar
      - run: docker run --rm myapp:latest pipenv run python manage.py test

  push:
    runs-on: ubuntu-latest
    needs: [test]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with:
          name: docker-image
      - run: docker load -i myapp-latest.tar
      - uses: aws-actions/configure-aws-credentials@v3
        with:
          role-to-assume: \${{ vars.OIDC_ROLE_TO_ASSUME }}
          aws-region: \${{ vars.AWS_REGION }}
      - uses: aws-actions/amazon-ecr-login@v2
      - run: |
          IMAGE="\${{ vars.ECR_REGISTRY }}/\${{ vars.ECR_REPOSITORY }}:latest"
          docker tag myapp:latest "$IMAGE"
          docker push "$IMAGE"
\`\`\`

Let’s break it down, job by job.


## 🚧 Triggering the Workflow

\`\`\`yaml
on:
  push:
    branches: [main]
\`\`\`

This workflow is triggered every time a commit is pushed to the \`main\` branch.


## 🔐 Permissions

\`\`\`yaml
permissions:
  id-token: write
  contents: read
\`\`\`

These permissions allow GitHub to authenticate with AWS via OIDC (OpenID Connect) and read repo contents.


## 🛠️ Job 1: Build

### Build and Save the Docker Image

- **Checks out the code** using \`actions/checkout\`
- **Builds the Docker image** with \`docker build -t myapp:latest .\`
- **Saves it as a .tar file** with \`docker save\`
- **Uploads the image** as an artifact for later jobs to consume


## ✅ Job 2: Test

### Run Tests *Inside* the Docker Container

- **Downloads the image artifact**
- **Loads it into Docker** with \`docker load\`
- **Runs Django tests inside the container** using:
  \`\`\`bash
  docker run --rm myapp:latest pipenv run python manage.py test
  \`\`\`

If tests fail, the workflow stops here — no pushing.


## 🚀 Job 3: Push

### Push to Amazon ECR

- **Checks out the code (optional)** for access to project files
- **Downloads and loads the Docker image again**
- **Assumes an AWS role** using \`configure-aws-credentials\`
- **Logs into ECR**
- **Tags and pushes the image** to the appropriate ECR repository


## 📦 Artifact Passing

Because GitHub-hosted runners don't share images between jobs, we:
- Save the image in \`build\`
- Reuse it in both \`test\` and \`push\` using \`actions/upload-artifact\` and \`download-artifact\`

This enables true separation of concerns while retaining performance and traceability.


## 🧠 Recap: What This Workflow Does

This GitHub Actions workflow sets up a robust, production-friendly pipeline:

- ✅ Builds your Docker image once
- ✅ Runs Django tests inside the container
- ✅ Only pushes the image if all tests pass
- ✅ Splits each stage into clear, modular jobs for better control and visibility

This pattern is ideal for modern containerized CI/CD pipelines — especially when publishing to AWS ECR.

## 🚀 Manual Deployment to EC2

This second workflow enables **on-demand deployment** to an EC2 instance using AWS SSM (Systems Manager):

\`\`\`yaml
name: Deploy to EC2

on:
  workflow_dispatch:  # Manual only

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: aws-actions/configure-aws-credentials@v3
        with:
          role-to-assume: \${{ vars.OIDC_ROLE_TO_ASSUME }}
          aws-region: \${{ vars.AWS_REGION }}

      - uses: aws-actions/amazon-ecr-login@v2

      - name: Trigger remote deployment on EC2 via SSM
        run: |
          aws ssm send-command \\
          --instance-ids "\${{ vars.EC2_INSTANCE_ID }}" \\
          --document-name "AWS-RunShellScript" \\
          --comment "Manual deploy from GitHub Actions" \\
          --parameters '{"commands":["IMAGE=\\"\${{ vars.ECR_REGISTRY }}/\${{ vars.ECR_REPOSITORY }}:latest\\"","docker pull \\"$IMAGE\\"","docker stop rock-of-ages-api || true","docker rm rock-of-ages-api || true","docker run -d --name rock-of-ages-api -p 80:8000 \\"$IMAGE\\""]}' \\
          --region \${{ vars.AWS_REGION }}
\`\`\`

### 🧭 Let’s break this down:


## 🖲️ Trigger Type

\`\`\`yaml
on:
  workflow_dispatch:
\`\`\`

This workflow only runs **manually** via the GitHub Actions UI. It’s perfect for **controlled deployments** — such as staging, production, or hotfixes.


## 🔐 AWS Access

\`\`\`yaml
permissions:
  id-token: write
  contents: read
\`\`\`

This allows GitHub to assume an IAM role securely using OIDC — no AWS secrets stored in your repo.


## 📦 ECR Login

\`\`\`yaml
uses: aws-actions/amazon-ecr-login@v2
\`\`\`

Logs in to Amazon ECR so the EC2 instance can pull your Docker image.


## 🛰️ Remote Command via AWS SSM

This line:

\`\`\`bash
aws ssm send-command ...
\`\`\`

Uses AWS Systems Manager to run a shell script **remotely on your EC2 instance**. This avoids SSH and is safer, auditable, and works even if ports are blocked.

### The deployed script does the following:

1. Pulls the latest Docker image from ECR.
2. Stops any existing container named \`rock-of-ages-api\`.
3. Removes the old container if it exists.
4. Runs a new container on port 80 from the latest image.


## 🧠 Why this is useful

- **No SSH required** — uses AWS SSM securely over AWS APIs.
- **No AMI updates** — the EC2 host stays running and just pulls new versions.
- **Easily repeatable** — anyone with GitHub repo access and permissions can deploy with a click.


## 🧠 Recap: CI + Manual CD = Safe, Scalable Delivery

With these two workflows together:

- ✅ CI builds and tests your app inside containers
- ✅ Artifacts are passed between jobs safely
- ✅ Docker images are only pushed if tests pass
- ✅ EC2 deployment is manual, controlled, and secure via SSM

This makes your pipeline:
- Easy to manage
- Safe to scale
- Compatible with modern AWS best practices
`,
  exercise: null,
};
