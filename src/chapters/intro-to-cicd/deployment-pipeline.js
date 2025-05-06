export const deploymentPipelineChapter = {
  id: 'deployment-pipeline',
  title: 'Building a Simple Deployment Pipeline',
  sectionId: 'intro-to-cicd',
  previousChapterId: 'github-actions-basics',
  content: `# Building a Simple Deployment Pipeline

In this chapter, we'll build a complete CI/CD pipeline using GitHub Actions to automatically deploy our Next.js application to AWS S3. This pipeline will test, build, and deploy our application whenever changes are pushed to the main branch.

## Setting up AWS Credentials in GitHub Secrets

Before we can deploy to AWS from GitHub Actions, we need to securely store our AWS credentials as GitHub secrets.

### Creating an IAM User for Deployments

First, let's create an AWS IAM user with the necessary permissions:

1. Sign in to the AWS Management Console
2. Navigate to the IAM service
3. Click "Users" in the sidebar, then "Add users"
4. Enter a name (e.g., "github-actions-deployer")
5. Select "Access key - Programmatic access" for AWS credential type
6. Click "Next: Permissions"
7. Click "Attach existing policies directly"
8. Search for and select the following policies:
   - AmazonS3FullAccess
   - CloudFrontFullAccess (if using CloudFront)
9. Click "Next: Tags" (optional: add tags)
10. Click "Next: Review"
11. Click "Create user"
12. **Important**: Download or copy the Access Key ID and Secret Access Key. This is the only time you'll be able to view the secret key.

> **Security Note**: For production environments, it's best practice to create a custom policy with only the specific permissions needed rather than using the FullAccess policies.

### Adding Secrets to GitHub Repository

Now, let's add these credentials as secrets in our GitHub repository:

1. Go to your GitHub repository
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add the following secrets:
   - Name: AWS_ACCESS_KEY_ID
     Value: (paste your Access Key ID)
   - Name: AWS_SECRET_ACCESS_KEY
     Value: (paste your Secret Access Key)
   - Name: AWS_REGION
     Value: (your preferred AWS region, e.g., us-east-1)
   - Name: S3_BUCKET
     Value: (your S3 bucket name)

These secrets will be securely stored and can be accessed in our GitHub Actions workflow without exposing them in our code.

## Configuring Automated Testing for React

Before deploying our application, we want to ensure it passes all tests. Let's set up automated testing in our workflow.

### Types of Tests for React Applications

A comprehensive testing strategy for React applications typically includes:

1. **Unit Tests**: Test individual components and functions in isolation
2. **Integration Tests**: Test how components work together
3. **End-to-End Tests**: Test the entire application flow

### Popular Testing Tools for React

- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **Cypress**: End-to-end testing framework
- **Playwright**: Cross-browser testing framework

### Setting Up Jest and React Testing Library

Most Next.js projects come with Jest and React Testing Library pre-configured. If not, you can add them:

1. Install dependencies:
   \`\`\`bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
   \`\`\`

2. Create a Jest configuration file (\`jest.config.js\`):
   \`\`\`javascript
   const nextJest = require('next/jest')

   const createJestConfig = nextJest({
     // Provide the path to your Next.js app
     dir: './',
   })

   // Custom Jest config
   const customJestConfig = {
     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
     testEnvironment: 'jest-environment-jsdom',
   }

   // createJestConfig is exported this way to ensure that next/jest can load the Next.js config
   module.exports = createJestConfig(customJestConfig)
   \`\`\`

3. Create a Jest setup file (\`jest.setup.js\`):
   \`\`\`javascript
   import '@testing-library/jest-dom'
   \`\`\`

4. Add test script to \`package.json\`:
   \`\`\`json
   "scripts": {
     "test": "jest",
     "test:watch": "jest --watch"
   }
   \`\`\`

### Writing Basic Tests

Let's create a simple test for a component:

1. Create a test file (\`__tests__/Home.test.js\`):
   \`\`\`javascript
   import { render, screen } from '@testing-library/react'
   import Home from '../pages/index'

   describe('Home page', () => {
     it('renders a heading', () => {
       render(<Home />)
       const heading = screen.getByRole('heading', { level: 1 })
       expect(heading).toBeInTheDocument()
     })

     it('renders the main content', () => {
       render(<Home />)
       expect(screen.getByText(/welcome to/i)).toBeInTheDocument()
     })
   })
   \`\`\`

## Setting up Build and Deploy Steps

Now, let's create our complete CI/CD workflow that will test, build, and deploy our application.

### Creating the Workflow File

Create a new file at \`.github/workflows/deploy.yml\`:

\`\`\`yaml
name: Deploy to S3

on:
  push:
    branches: [ main ]
  # Optional: Allow manual triggering
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
      
    # Configure AWS credentials
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: \${{ secrets.AWS_REGION }}
    
    # Deploy to S3
    - name: Deploy to S3
      run: |
        aws s3 sync out/ s3://\${{ secrets.S3_BUCKET }} --delete
    
    # Optional: Invalidate CloudFront cache if using CloudFront
    - name: Invalidate CloudFront cache
      if: \${{ secrets.CLOUDFRONT_DISTRIBUTION_ID != '' }}
      run: |
        aws cloudfront create-invalidation --distribution-id \${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
\`\`\`

### Understanding the Workflow

Let's break down the key components of this workflow:

1. **Triggers**:
   - The workflow runs on pushes to the main branch
   - It can also be triggered manually via the GitHub Actions UI

2. **Environment Setup**:
   - Checkout the code
   - Set up Node.js
   - Install dependencies

3. **Testing**:
   - Run linting to check code style
   - Run tests to verify functionality

4. **Build**:
   - Build the Next.js application for production
   - This creates the static files in the 'out' directory

5. **Deployment**:
   - Configure AWS credentials using GitHub secrets
   - Sync the build output to the S3 bucket
   - Optionally invalidate CloudFront cache if using CloudFront

### Additional Configuration Options

You can enhance this workflow with additional features:

#### Environment-specific Deployments

\`\`\`yaml
jobs:
  deploy:
    name: Deploy to \${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
    environment:\${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
    runs-on: ubuntu-latest
    
    steps:
      # ... other steps
      
      - name: Deploy to S3
        run: |
          aws s3 sync out/ s3://\${{ github.ref == 'refs/heads/main' && secrets.PROD_S3_BUCKET || secrets.STAGING_S3_BUCKET }} --delete
\`\`\`

#### Slack Notifications

\`\`\`yaml
- name: Notify Slack on success
  if: success()
  uses: rtCamp/action-slack-notify@v2
  env:
    SLACK_WEBHOOK: \${{ secrets.SLACK_WEBHOOK }}
    SLACK_CHANNEL: deployments
    SLACK_TITLE: Deployment Successful
    SLACK_MESSAGE: 'Application deployed successfully to \${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}'
    SLACK_COLOR: good

- name: Notify Slack on failure
  if: failure()
  uses: rtCamp/action-slack-notify@v2
  env:
    SLACK_WEBHOOK: \${{ secrets.SLACK_WEBHOOK }}
    SLACK_CHANNEL: deployments
    SLACK_TITLE: Deployment Failed
    SLACK_MESSAGE: 'Deployment to \${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }} failed'
    SLACK_COLOR: danger
\`\`\`

## Testing and Troubleshooting Your Pipeline

After setting up your pipeline, it's important to test it and know how to troubleshoot common issues.

### Testing Your Pipeline

1. **Make a small change**: Update a file in your repository and push it to the main branch
2. **Monitor the workflow**: Go to the "Actions" tab in your GitHub repository
3. **Check each step**: Verify that each step completes successfully
4. **Verify deployment**: Visit your S3 website URL to confirm the changes are live

### Common Issues and Solutions

#### Authentication Failures

**Issue**: AWS credential errors in the "Configure AWS credentials" step

**Solutions**:
- Double-check that you've added the correct secrets to your GitHub repository
- Verify that the IAM user has the necessary permissions
- Ensure the secret names in your workflow match the ones in your GitHub repository

#### Build Failures

**Issue**: The build step fails

**Solutions**:
- Check the build logs for specific errors
- Ensure your application builds locally with \`npm run build\`
- Verify that all dependencies are correctly listed in \`package.json\`

#### Deployment Failures

**Issue**: Files aren't being uploaded to S3

**Solutions**:
- Verify that the S3 bucket exists and is correctly configured
- Check that the IAM user has S3 permissions
- Ensure the build output directory matches the one in your workflow (e.g., 'out/')

#### Test Failures

**Issue**: Tests are failing in the pipeline but pass locally

**Solutions**:
- Check for environment-specific code that might behave differently in CI
- Ensure tests don't depend on local environment variables
- Look for timing issues in asynchronous tests

### Monitoring Your Deployments

Set up monitoring to ensure your deployed application remains healthy:

1. **CloudWatch Alarms**: Set up alarms for S3 and CloudFront metrics
2. **Synthetic Monitoring**: Create canaries to regularly test your website
3. **Error Tracking**: Implement error tracking with services like Sentry
4. **Performance Monitoring**: Use tools like Lighthouse or WebPageTest

## Advanced Pipeline Enhancements

Once your basic pipeline is working, consider these advanced enhancements:

### Preview Deployments for Pull Requests

Create preview deployments for pull requests to test changes before merging:

\`\`\`yaml
name: PR Preview

on:
  pull_request:
    branches: [ main ]

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    
    steps:
      # ... setup steps
      
      - name: Build
        run: npm run build
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: \${{ secrets.AWS_REGION }}
      
      - name: Deploy to preview bucket
        run: |
          aws s3 sync out/ s3://\${{ secrets.PREVIEW_BUCKET }}/pr-\${{ github.event.pull_request.number }} --delete
      
      - name: Comment on PR
        uses: actions/github-script@v6
        with:
          github-token: \${{ secrets.GITHUB_TOKEN }}
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ Preview deployed to: https://\${{ secrets.PREVIEW_BUCKET }}.s3-website-\${{ secrets.AWS_REGION }}.amazonaws.com/pr-\${{ github.event.pull_request.number }}/'
            })
\`\`\`

### Automated Rollbacks

Implement automated rollbacks if monitoring detects issues after deployment:

\`\`\`yaml
- name: Deploy with rollback capability
  id: deploy
  run: |
    # Store the previous version for potential rollback
    aws s3 cp s3://\${{ secrets.S3_BUCKET }}/index.html s3://\${{ secrets.S3_BUCKET }}/index.html.backup || true
    
    # Deploy new version
    aws s3 sync out/ s3://\${{ secrets.S3_BUCKET }} --delete
    
    # Simple health check
    HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" https://\${{ secrets.DOMAIN_NAME }})
    if [ "$HEALTH_CHECK" != "200" ]; then
      echo "Health check failed with status $HEALTH_CHECK, rolling back"
      aws s3 cp s3://\${{ secrets.S3_BUCKET }}/index.html.backup s3://\${{ secrets.S3_BUCKET }}/index.html
      exit 1
    fi
\`\`\`

### Blue-Green Deployments

Implement blue-green deployments for zero-downtime updates:

\`\`\`yaml
- name: Blue-Green Deployment
  run: |
    # Deploy to the "blue" environment
    aws s3 sync out/ s3://\${{ secrets.BLUE_BUCKET }} --delete
    
    # Run tests against the blue environment
    HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" https://blue.\${{ secrets.DOMAIN_NAME }})
    
    if [ "$HEALTH_CHECK" == "200" ]; then
      # Update CloudFront distribution to point to the blue environment
      aws cloudfront update-distribution --id \${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --distribution-config file://blue-config.json
      echo "Switched traffic to blue environment"
    else
      echo "Health check failed, keeping traffic on green environment"
      exit 1
    fi
\`\`\`

## Conclusion

Congratulations! You've built a complete CI/CD pipeline that automatically tests, builds, and deploys your Next.js application to AWS S3. This pipeline will help you deliver changes to your users more quickly and with greater confidence.

Key takeaways from this chapter:

1. **Security**: Store sensitive credentials as GitHub secrets
2. **Testing**: Automate testing to catch issues early
3. **Automation**: Automate the build and deployment process
4. **Monitoring**: Set up monitoring to ensure your application remains healthy
5. **Continuous Improvement**: Enhance your pipeline with advanced features as your needs evolve

In a real-world scenario, you might extend this pipeline with additional steps like:
- Security scanning
- Performance testing
- Accessibility checks
- Automated documentation generation
- Database migrations

Remember that CI/CD is not just about tools and automation—it's about fostering a culture of continuous improvement and collaboration within your team.`,
  exercise: null
};