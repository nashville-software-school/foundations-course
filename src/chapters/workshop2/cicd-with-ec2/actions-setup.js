export const githubActionsChapter = {
  id: 'ec2-action',
  title: 'Automating CI/CD for Rock of Ages Backend with GitHub Actions',
  sectionId: 'cicd-ec2-docker',
  previousChapterId: null,
  content: `In this chapter, we’ll build a complete CI/CD pipeline using GitHub Actions to automatically deploy our Rock of Ages backend API to AWS EC2. This pipeline will:

* Run tests 
* Build the Docker Image
* Push the docker image to Amazon ECR
* Deploy the image to EC2 using a separate workflow with a manual trigger
* Automatically trigger test/build/push on pushes to the \`main\` branch

## Setting Up AWS Credentials as GitHub Secrets

If you remember, during the first CICD chapter, you generated long term credentials and stored them as github secrets. Now you will use OpenIdConnect(OIDC) to authenticate with AWS eliminating the need for long term credential storage. Furthermore, because all of our global variables needed for this pipeline are non-sensitive, you will use github variables rather than github secrets. 

#### Set up OIDC 

The instructors have already created an IAM role \`github_oidc\` with all of the permissions github actions will require. 

1. Go to the AWS Console and navigate to IAM 
2. Under Roles, click \`github_oidc\` 
3. Select the trust relationships tab and click edit trust policy. You will see:
\`
"StringLike": {
                    "token.actions.githubusercontent.com:sub": "repo:JaneDoe/*"
                }\`
4. Replace \`JaneDoe\` with your github username and click update policy
5. Grab the ARN for the github_oidc role. This will get stored in github variables 

#### What’s happening here?

This trust policy update allows GitHub Actions from your specific repository (under your GitHub username) to assume the \`github_oidc\` role in AWS. This is a key part of OIDC-based authentication.

Because your github_oidc role ARN is not sensitive we can use github variables rather than github secrets. OIDC also eliminates the need to rotate long lived credentials.

1. Go to your GitHub repository
2. Click Settings > Secrets and variables > Actions
3. Click the variables
3. Add these variables:

| Name                         | Value                               |
| ---------------------------- | ----------------------------------- |
| \`EC2_INSTANCE_ID\`            | Your Ec2 Instance Id                |
| \`ECR_REGISTRY\`               | Your ECR Registry                   |
| \`AWS_REGION\`                 | Your AWS region (e.g., \`us-east-2\`) |
| \`ECR_REPOSITORY\`             | Your repository (e.g. \`rock-of-ages-api\`) |
| \`OIDC_ROLE_TO_ASSUME\`        | github_oidc role ARN                |

## Creating the CI/CD Workflow

Now that we’ve prepared the AWS credentials and planned our deployment steps, let’s set up the **CI/CD workflow** in our repository.

### 1. Create a Test/Build/Push Workflow File in Your Repository

* In your local repository, create a directory:

\`\`\`
.github/workflows/
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
          role-to-assume: \${{ vars.OIDC_ROLE_TO_ASSUME }}
          aws-region: \${{ vars.AWS_REGION }}

      - uses: aws-actions/amazon-ecr-login@v2

      - name: Trigger remote deployment on EC2 via SSM
        run: |
          aws ssm send-command \
          --instance-ids "\${{ vars.EC2_INSTANCE_ID }}" \
          --document-name "AWS-RunShellScript" \
          --comment "Manual deploy from GitHub Actions" \
          --parameters '{"commands":["IMAGE=\"\${{ vars.ECR_REGISTRY }}/\${{ vars.ECR_REPOSITORY }}:latest\"","docker pull \"$IMAGE\"","docker stop rock-of-ages-api || true","docker rm rock-of-ages-api || true","docker run -d --name rock-of-ages-api -p 80:8000 \"$IMAGE\""]}' \
          --region \${{ vars.AWS_REGION }}
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
* Once the test/build/push jobs are successful, go back to Actions and click "Deploy to EC2". On the right-hand side, click the button "Run Workflow". This will trigger the deploy steps
* Monitor and troubleshoot workflows as needed.

### 5. Confirm deployment

To confirm the deployme was successful, connect into your ec2 instance and run \`docker ps\`. This should list the new image with a timestamp from when you triggered the manual deployment. Test ec2 url in the browser, on postman, or through cloudfront and s3 if you have already updated your front end to use the new ec2 Url. 

## What We've Accomplished

In this chapter, you've:

- Updated IAM trust policy for GitHub OIDC integration
- Configured GitHub Variables for EC2 and ECR access
- Created a workflow to test, build, and push a Docker image on each push to \`main\`
- Created a second workflow to manually deploy the latest image to EC2
- Confirmed your end-to-end CI/CD pipeline is working by testing a deployed container

This setup allows you to confidently develop, test, and deploy backend changes with minimal effort—backed by GitHub Actions, ECR, and EC2.
`,
exercise: null
};

