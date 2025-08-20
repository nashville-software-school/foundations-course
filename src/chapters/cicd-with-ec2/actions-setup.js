export const githubActionsChapter = {
  id: 'ec2-action',
  title: 'Github Actions Setup for Rock Of Ages API',
  sectionId: 'cicd-ec2-docker',
  previousChapterId: 'advanced-cicd-docker',
  content: `In this chapter, we’ll build a complete CI/CD pipeline using GitHub Actions to automatically deploy our Rock of Ages backend API to AWS EC2. This pipeline will:

* Run tests 
* Build the Docker Image
* Push the docker image to Amazon ECR
* Deploy the image to EC2 using a separate workflow with a manual trigger
* Automatically trigger test/build/push on pushes to the \`main\` branch

## Setting Up AWS info as GitHub Secrets

1. Go to your GitHub repository
2. Click Settings > Secrets and variables > Actions
3. Add these secrets:

| Name                         | Value                               |
| ---------------------------- | ----------------------------------- |
| \`EC2_INSTANCE_ID\`            | Your Ec2 Instance Id (find in ec2 console under instances) |
| \`ECR_REGISTRY\`               | \`[your-aws-account-id].dkr.ecr.us-east-2.amazonaws.com\` replace [your-aws-account-id]|
| \`AWS_REGION\`                 | Your AWS region (e.g., \`us-east-2\`) |
| \`ECR_REPOSITORY\`             | Your repository (e.g. \`rock-of-ages-api\`) |
| \`OIDC_ROLE_TO_ASSUME\`        | github_oidc role ARN               |

## Creating the CI/CD Workflow

Now that we’ve prepared the AWS credentials and planned our deployment steps, let’s set up the **CI/CD workflow** in our repository.

### 1. Create a Test/Build/Push Workflow File in Your Repository

* In your local repository, create a directory with:

\`\`\`
mkdir -p .github/workflows
\`\`\`

* Inside this directory, create a new file named:

\`\`\`
testBuildPush.yml
\`\`\`

* Paste this workflow template into testBuildPush.yml

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
          role-to-assume: \${{ secrets.OIDC_ROLE_TO_ASSUME }}
          aws-region: \${{ secrets.AWS_REGION }}

      - name: Log in to Amazon ECR
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build & push Docker image
        run: |
          IMAGE="\${{ secrets.ECR_REGISTRY }}/\${{ secrets.ECR_REPOSITORY }}:latest"
          docker build -t "$IMAGE" .
          docker push "$IMAGE"


\`\`\`

#### What’s happening here?

You’re defining a GitHub Actions workflow that will trigger every time you push to the \`main\` branch. It’s split into two jobs:
- One job runs your tests
- The next job builds and pushes a Docker image **only if** the tests pass

### 2. Create a Deploy Workflow File in Your Repository

* Inside the .github/workflows directory, create another file named:

\`\`\`
deploy.yml
\`\`\`

* Paste this workflow template into deploy.yml

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
          role-to-assume: \${{ secrets.OIDC_ROLE_TO_ASSUME }}
          aws-region: \${{ secrets.AWS_REGION }}

      - uses: aws-actions/amazon-ecr-login@v2

      - name: Trigger remote deployment on EC2 via SSM
        run: |
          aws ssm send-command \\
          --instance-ids "\${{ secrets.EC2_INSTANCE_ID }}" \\
          --document-name "AWS-RunShellScript" \\
          --comment "Manual deploy from GitHub Actions" \\
          --parameters commands='[
              "IMAGE=\\"\${{ secrets.ECR_REGISTRY }}/\${{ secrets.ECR_REPOSITORY }}:latest\\"",
              "aws ecr get-login-password --region \${{ secrets.AWS_REGION }} | docker login --username AWS --password-stdin \${{ secrets.ECR_REGISTRY }}",
              "docker pull \\"$IMAGE\\"",
              "docker stop rock-of-ages-api || true",
              "docker rm rock-of-ages-api || true",
              "docker run --pull always -d --name rock-of-ages-api -p 80:8000 \\"$IMAGE\\""
              ]' \\          
          --region \${{ secrets.AWS_REGION }}
\`\`\`

#### What’s happening here?

This is a **manually-triggered** GitHub Actions workflow. When you run it, it sends a command to your EC2 instance via AWS SSM to stop the old container, pull the new image, and run it using Docker.


### 3. Commit the Changes

* Save the file.
* In your terminal or Git client, commit the new workflow:

\`\`\`
git add --all
git commit -m "Add CI/CD workflow for testing, building, and deploying to AWS"
git push origin main
\`\`\`

#### What’s happening here?

Pushing to main will trigger the \`testBuildPush.yml\` workflow. This won't deploy the app yet—that’s handled by your \`deploy.yml\`, which must be manually run from GitHub Actions.


### 4. Trigger and Monitor Workflow Execution

* Go to your repository on GitHub.
* Click the **Actions** tab.
* On the left hand side you will see "All Workflows" and underneath you will see "Build and Push Docker Image" and "Deploy to EC2"
* Click Build and Push Docker Image. You'll notice that the test and build steps are split into multiple jobs. Click on the jobs to monitor the steps.
* Once the test/build/push jobs are successful, go back to Actions and click "Deploy to EC2". On the right-hand side, click the button "Run Workflow". This will trigger the deploy steps. You may need to refresh the page to see that the workflow was triggered.
* Monitor and troubleshoot workflows as needed.

### 5. Confirm deployment

To confirm the deployme was successful, connect into your ec2 instance and run \`docker ps\`. This should list the new image with a timestamp from when you triggered the manual deployment. Test ec2 url in the browser, on postman, or through cloudfront and s3 if you have already updated your front end to use the new ec2 Url. 

## What We've Accomplished

In this chapter, you've:

- Updated IAM trust policy for GitHub OIDC integration
- Configured GitHub Secrets for EC2 and ECR access
- Created a workflow to test, build, and push a Docker image on each push to \`main\`
- Created a second workflow to manually deploy the latest image to EC2
- Confirmed your end-to-end CI/CD pipeline is working by testing a deployed container

This setup allows you to confidently develop, test, and deploy backend changes with minimal effort—backed by GitHub Actions, ECR, and EC2.
`,
exercise: null
};

