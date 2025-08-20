import ghAction from "../../assets/gh_action.jpg";
export const deploymentPipelineChapter = {
  id: 'deployment-pipeline',
  title: 'Automating CI/CD for Rock of Ages Frontend with GitHub Actions',
  sectionId: 'intro-to-cicd',
  previousChapterId: 'github-actions-basics',
  content: `In this chapter, we’ll build a complete CI/CD pipeline using GitHub Actions to automatically 
  deploy our Rock of Ages frontend application to AWS S3. This pipeline will:

* Run tests and generate test coverage
* Build the Vite project
* Sync the built files to S3
* Invalidate CloudFront cache for fast delivery
* Automatically trigger on pushes to the \`main\` branch


### Set up OIDC 

OIDC stands for OpenID Connect. It is the same mechanism used when you use Google or Facebook to log into other services. You are giving your Github account permission to access services on your AWS account.  

The instructors have already created an IAM role \`github_oidc\` with all of the permissions github actions will require. 

1. Go to the AWS Console and navigate to IAM 
2. Under Roles, click \`github_oidc\` 
3. Select the trust relationships tab and click edit trust policy. You will see:
\`
"StringLike": {
                    "token.actions.githubusercontent.com:sub": "repo:JaneDoe/*"
                }\`
4. Replace \`JaneDoe\` with your github username and click update policy
5. Grab the ARN for the github_oidc role. Save this to use in the next steps. 

#### What’s happening here?

This trust policy update allows GitHub Actions from your specific repository (under your GitHub username) to assume the \`github_oidc\` role in AWS. This is a key part of OIDC-based authentication.


### Adding Secrets to the Repository

By storing variables as secrets, we ensure:

  - Only the GitHub Actions runner has access.
  - Data is encrypted and managed securely by GitHub.

1. Go to your GitHub repository
2. Click Settings > Secrets and variables > Actions
3. Add these secrets:

| Name                         | Value                               |
| ---------------------------- | ----------------------------------- |
| \`OIDC_ROLE_TO_ASSUME\`        | Your github_oidc role ARN         |
| \`AWS_REGION\`                 | Your AWS region (e.g., \`us-east-2\`) |
| \`S3_BUCKET_NAME\`             | Your S3 bucket name                 |
| \`CLOUDFRONT_DISTRIBUTION_ID\` | Your CloudFront distribution ID     |

## Visual: How our GitHub Action Flow works
<img width=1400 src="${ghAction}"/>

## Types of Tests for Rock of Ages App

* Unit tests (\`npm run test\`)
* Test coverage (\`npm run test:coverage\`)

## Creating the CI/CD Workflow

Now that we’ve prepared the AWS credentials and planned our deployment steps, 
let’s set up the **CI/CD workflow** in our repository.

1. **Copy the Workflow Template** (below)
   Copy the following YAML template exactly as provided.

2. **Create a Workflow File in Your Repository**

* In your local repository, create a directory:

\`\`\`
.github/workflows/
\`\`\`

* Inside this directory, create a new file named:

\`\`\`
main.yml
\`\`\`

* Paste the following workflow template into this file.

### Workflow Template

\`\`\`yaml
name: Build and Deploy Vite to S3

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    permissions:
      id-token: write
      contents: read   

    steps:
      - name: Checkout source
        uses: actions/checkout@v3

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.OIDC_ROLE_TO_ASSUME }}
          aws-region: \${{ secrets.AWS_REGION }}

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

      - name: Run test coverage
        run: npm run test:coverage

      - name: Build Vite project
        run: npm run build

      - name: Deploy to S3
        run: aws s3 sync ./dist s3://\${{ secrets.S3_BUCKET_NAME }} --delete

      - name: Invalidate CloudFront Cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id \${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
        env:
          AWS_REGION: \${{ secrets.AWS_REGION }}
\`\`\`

3. **Commit the Changes**

* Save the file.
* In your terminal or Git client, commit the new workflow:

\`\`\`
git add .github/workflows/main.yml
git commit -m "Add CI/CD workflow for testing, building, and deploying to AWS"
git push origin main
\`\`\`

This will push the workflow to your GitHub repository. GitHub will automatically 
recognize the new workflow file and start running it based on the configured 
trigger (\`push\` to the \`main\` branch).

4. **Monitor Workflow Execution**

* Go to your repository on GitHub.
* Click the **Actions** tab.
* Watch the workflow run and check that each step completes successfully.


### CloudFront Cache Invalidation Explained

When we deploy updated files to S3, users accessing through CloudFront might still see cached versions.
CloudFront invalidation:

* Tells CloudFront to remove cached copies of old files.
* Ensures users get the latest content immediately after deployment.

## Testing and Troubleshooting Your Pipeline

1. Push a change to \`main\`
2. Monitor the workflow under Actions in GitHub
3. Verify each step (tests, coverage, build, deploy, invalidation)
4. Visit the CloudFront URL to confirm live updates

Common Issues and Solutions:

Build Fails

* Check \`npm run build\` locally
* Validate dependencies in \`package.json\`

Test Failures

* Check environment-specific code
* Debug async/timing issues
`,
  exercise: null,
};