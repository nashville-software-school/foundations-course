import ghAction from "./gh_action.jpg";
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

## Setting Up AWS Credentials as GitHub Secrets

Before we can deploy to AWS from GitHub Actions, we need to securely store our AWS 
credentials as GitHub secrets.

### Why Are We Storing AWS Credentials as Secrets?

GitHub Actions workflows (like the one we’ll write) need permission to:

* Upload built files to S3
* Invalidate CloudFront cache

These actions require AWS credentials (\`AWS_ACCESS_KEY_ID\`, \`AWS_SECRET_ACCESS_KEY\`, etc.) 
to authenticate with AWS. However:

* Embedding credentials directly in code is insecure and could leak secrets.
* GitHub secrets allow us to inject credentials securely into workflow steps without 
exposing them in the repository.

By storing them as secrets, we ensure:

* Only the GitHub Actions runner has access.
* Credentials are encrypted and managed securely by GitHub.


#### Create AWS access key
1. Go to the AWS Console: (refer to "AWS Account Setup" page for login instructions)
2. Under Users, select the \`gh_user\` (this is IAM user used for GitHub Actions)
3. In Security credentials, create the access key:
4. Click Create Assess key
5. Select \`Command Line Interface (CLI)\`
6. Check \`Confirmation\` then click \`Next\`
7. Type \`github action\` for \`Description tag value\`
8. Click Create Access Key
9. You will need the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY from this page
10. See precautions about this importnat sensitive password below
11. Identify your AWS region (e.g., \`us-east-2\`)
12. Look up your S3 bucket name and CloudFront distribution ID

### Access Key Best Practices
While setting up access keys for GitHub Actions, it’s essential to follow best practices to ensure the security of your AWS account:

- Never store access keys in plain text: Avoid placing them in code repositories, scripts, or other unsecured locations.
- Use GitHub Secrets for storage: Store keys securely in GitHub’s encrypted Secrets to prevent exposure.
- Disable or delete unused access keys: If an access key is no longer needed, disable or delete it immediately to reduce risk.
- Follow least-privilege principles: Assign the IAM user only the permissions absolutely necessary for the workflow to function 
(for example, S3 and CloudFront access).
- Rotate access keys regularly: Periodically generate new access keys and update your GitHub Secrets to maintain security.
- By adhering to these practices, you can protect your AWS resources from unauthorized access and ensure a secure CI/CD workflow.

### Adding Secrets to the Repository

1. Go to your GitHub repository
2. Click Settings > Secrets and variables > Actions
3. Add these secrets:

| Name                         | Value                               |
| ---------------------------- | ----------------------------------- |
| \`AWS_ACCESS_KEY_ID\`          | Your AWS IAM Access Key ID          |
| \`AWS_SECRET_ACCESS_KEY\`      | Your AWS IAM Secret Access Key      |
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

* Paste the copied workflow template into this file.

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

### Workflow Template

\`\`\`yaml
name: Build and Deploy Vite to S3

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout source
      uses: actions/checkout@v3

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
      uses: jakejarvis/s3-sync-action@master
      with:
        args: --delete
      env:
        AWS_S3_BUCKET: \${{ secrets.S3_BUCKET_NAME }}
        AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: \${{ secrets.AWS_REGION }}
        SOURCE_DIR: ./dist

    - name: Invalidate CloudFront Cache
      run: |
        aws cloudfront create-invalidation --distribution-id \${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
      env:
        AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: \${{ secrets.AWS_REGION }}
\`\`\`

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

## Future Consideration: Using OIDC Instead of Long-Lived Keys

Currently, we’re using long-lived IAM AWS access keys stored as GitHub secrets. While this works:

* It requires manual key management (creation, rotation, revocation).
* Long-lived keys pose a security risk if compromised.

What’s Better?
AWS supports OpenID Connect (OIDC) for GitHub Actions. This:

* Allows GitHub’s identity to be trusted directly by AWS.
* Removes the need to store access keys in secrets.
* Issues temporary credentials per workflow run, with least privilege access.

Why We’re Not Using OIDC Now:
* More complex for initial setup, but worth considering for future improvement.`,
  exercise: null,
};