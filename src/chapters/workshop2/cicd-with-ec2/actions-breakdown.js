export const githubActionsBreakdownChapter = {
  id: "ci-cd-artifact-breakdown",
  title: "Understanding the Rock of Ages API GitHub Actions Workflow",
  sectionId: 'cicd-ec2-docker',
  previousChapterId: "ec2-action",
  content: `## Dissecting the CI/CD Workflow

Here’s the full GitHub Actions YAML workflow we’ll explore:

Here’s the full GitHub Actions YAML file:

\`\`\`yaml
name: Build & Push Docker Image

on:
  push:
    branches: [main]

permissions:
  id-token: write
  contents: read

jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install pipenv
        run: pip install pipenv

      - name: Install dependencies
        run: pipenv install --dev

      - name: Run tests
        run: pipenv run python manage.py test


  build-and-push:
    name: Build & Push Docker Image
    runs-on: ubuntu-latest
    needs: test  # 👈 this ensures tests must pass before this job runs

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v3
        with:
          role-to-assume: \${{ vars.OIDC_ROLE_TO_ASSUME }}
          aws-region: \${{ vars.AWS_REGION }}

      - name: Log in to Amazon ECR
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build & push Docker image
        run: |
          IMAGE="\${{ vars.ECR_REGISTRY }}/\${{ vars.ECR_REPOSITORY }}:latest"
          docker build -t "$IMAGE" .
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


### 🧪 \`test\` Job

Runs first to verify code:

- Checks out your code
- Sets up Python and Pipenv
- Installs dependencies
- Runs tests using Django’s built-in test runner

If any of these steps fail, the Docker build is skipped.

---

### 🐳 \`build-and-push\` Job

Runs only if tests pass:

- Assumes an IAM role securely using OIDC
- Logs in to your Amazon ECR registry
- Builds your Docker image using the local Dockerfile
- Tags it and pushes to ECR as \`latest\`

---

## ✅ Why This Pattern Works

- **Early feedback**: Test failures stop the workflow early
- **Efficient**: Avoids unnecessary Docker builds
- **Secure**: No secrets in the repo — uses federated identity
- **AWS-compatible**: Clean, tagged images are pushed to ECR

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
