export const githubActionsBasicsChapter = {
  id: 'github-actions-basics',
  title: 'GitHub Actions Basics',
  sectionId: 'intro-to-cicd',
  previousChapterId: 'cicd-fundamentals',
  content: `## What are GitHub Actions?

GitHub Actions is a CI/CD platform that allows you to automate your software development workflows directly in your GitHub repository. With GitHub Actions, you can build, test, and deploy your code right from GitHub, as well as automate other tasks like issue triage, dependency updates, and more.

### Key Features of GitHub Actions

- **Integrated with GitHub**: Built directly into the GitHub platform
- **Workflow as Code**: Define workflows using YAML files
- **Event-driven**: Trigger workflows based on GitHub events
- **Matrix Builds**: Test across multiple operating systems and runtime versions
- **Reusable Actions**: Use pre-built actions from the marketplace
- **Self-hosted Runners**: Run workflows on your own infrastructure
- **Artifacts and Caching**: Share data between jobs and speed up workflows
- **Secrets Management**: Securely store and use sensitive information

### GitHub Actions vs. Other CI/CD Tools

| Feature | GitHub Actions | Jenkins | CircleCI | GitLab CI |
|---------|---------------|---------|----------|-----------|
| Hosting | Cloud (or self-hosted runners) | Self-hosted | Cloud | Cloud (or self-hosted) |
| Configuration | YAML in repository | Jenkinsfile or UI | YAML in repository | YAML in repository |
| Integration | Native GitHub | Plugins | GitHub App | Native GitLab |
| Pricing | Free tier with minutes | Free (self-hosted) | Free tier with credits | Free tier with minutes |
| Marketplace | Large ecosystem | Plugin ecosystem | Orbs ecosystem | Limited marketplace |
| Setup Complexity | Low | High | Medium | Medium |

## Creating Your First Workflow File

GitHub Actions workflows are defined in YAML files stored in the \`.github/workflows\` directory of your repository. Let's create a simple workflow that runs whenever code is pushed to the repository.

### Basic Workflow Structure

\`\`\`yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
\`\`\`

### Key Components Explained

1. **name**: The name of the workflow (appears in the Actions tab)
2. **on**: Defines the events that trigger the workflow
3. **jobs**: Groups of steps that execute on the same runner
4. **runs-on**: Specifies the type of machine to run the job on
5. **steps**: Individual tasks that run commands or actions
6. **uses**: References a reusable action
7. **with**: Provides inputs to an action
8. **run**: Executes shell commands

### Creating the Workflow File

To add this workflow to your repository:

1. Create a \`.github/workflows\` directory in your repository if it doesn't exist
2. Create a new file, e.g., \`ci.yml\`, in that directory
3. Add the YAML content shown above
4. Commit and push the file to your repository

Once pushed, GitHub will automatically detect the workflow file and run it according to the triggers you've defined.

## Understanding Workflow Syntax

Let's dive deeper into the syntax and capabilities of GitHub Actions workflows.

### Workflow Triggers

You can trigger workflows based on various GitHub events:

\`\`\`yaml
on:
  # Trigger on push to specific branches
  push:
    branches: [ main, develop ]
    paths-ignore: [ '**.md' ]
  
  # Trigger on pull requests to specific branches
  pull_request:
    branches: [ main ]
    
  # Trigger on schedule (cron syntax)
  schedule:
    - cron: '0 0 * * *'  # Midnight every day
    
  # Manual trigger with optional inputs
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
        
  # Repository dispatch event
  repository_dispatch:
    types: [ deploy ]
\`\`\`

### Jobs and Steps

A workflow consists of one or more jobs that can run in parallel or sequentially:

\`\`\`yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test
        
  build:
    needs: test  # This job runs after 'test' completes
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build
        run: npm run build
\`\`\`

### Job Environments and Conditions

You can specify environments and conditions for jobs:

\`\`\`yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy
        run: ./deploy.sh
\`\`\`

### Matrix Builds

Matrix builds allow you to test across multiple configurations:

\`\`\`yaml
jobs:
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [14.x, 16.x, 18.x]
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: \${{ matrix.node-version }}
      - run: npm test
\`\`\`

### Outputs and Job Dependencies

You can pass data between jobs using outputs:

\`\`\`yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    outputs:
      output1: \${{ steps.step1.outputs.test }}
    steps:
      - id: step1
        run: echo "test=hello" >> $GITHUB_OUTPUT
        
  job2:
    runs-on: ubuntu-latest
    needs: job1
    steps:
      - run: echo \${{ needs.job1.outputs.output1 }}
\`\`\`

## Workflow Triggers and Events

GitHub Actions workflows are triggered by events that occur in your repository. Understanding these events is crucial for creating effective workflows.

### Common Trigger Events

#### Code-related Events

- **push**: When commits are pushed to a repository
- **pull_request**: When a pull request is opened, synchronized, or closed
- **create**: When a branch or tag is created
- **delete**: When a branch or tag is deleted
- **release**: When a release is created, edited, or published

#### Issue and PR Events

- **issues**: When an issue is opened, edited, closed, etc.
- **issue_comment**: When a comment is added to an issue or PR
- **pull_request_review**: When a PR review is submitted, edited, or dismissed
- **pull_request_review_comment**: When a comment is added to a PR review

#### Repository Management

- **fork**: When someone forks your repository
- **watch**: When someone stars your repository
- **public**: When a private repository is made public
- **repository_dispatch**: Custom webhook event

#### Scheduled Events

- **schedule**: Run workflows at scheduled times using cron syntax
- **workflow_dispatch**: Manually trigger a workflow run
- **repository_dispatch**: Trigger a workflow from an external event

### Event Filtering

You can filter events based on specific conditions:

\`\`\`yaml
on:
  push:
    branches:
      - main
      - 'releases/**'
    tags:
      - v1.*
    paths:
      - 'src/**'
      - '!**.md'
      
  pull_request:
    types: [opened, synchronize]
    branches:
      - main
\`\`\`

### Activity Types

Many events have specific activity types that you can filter on:

\`\`\`yaml
on:
  issues:
    types: [opened, labeled, milestoned]
\`\`\`

### Context and Expression Syntax

GitHub Actions provides context objects that contain information about the workflow run, environment, and events that triggered the workflow.

#### Available Contexts

- **github**: Information about the workflow run and event that triggered it
- **env**: Environment variables set in the workflow
- **job**: Information about the current job
- **steps**: Information about the steps in the current job
- **runner**: Information about the runner executing the job
- **secrets**: Access to secrets defined in the repository
- **strategy**: Information about the matrix strategy for the current job
- **matrix**: Information about the matrix parameters for the current job
- **needs**: Outputs from all jobs that are defined as a dependency

#### Expression Syntax

Expressions are enclosed in \`\${{ }}\` and can be used in most places in workflow files:

\`\`\`yaml
steps:
  - name: Conditional step
    if: \${{ github.event_name == 'push' }}
    run: echo "This was a push event"
    
  - name: Dynamic value
    run: echo "Repository is \${{ github.repository }}"
\`\`\`

## Using Actions from the Marketplace

One of the most powerful features of GitHub Actions is the ability to use pre-built actions from the GitHub Marketplace.

### Finding Actions

1. Visit the [GitHub Marketplace](https://github.com/marketplace?type=actions)
2. Browse or search for actions by category or keyword
3. Review the action's documentation, usage, and popularity

### Popular Actions

#### Checkout Code

\`\`\`yaml
- uses: actions/checkout@v3
  with:
    fetch-depth: 0  # Fetch all history for all branches and tags
\`\`\`

#### Setup Language Environments

\`\`\`yaml
- uses: actions/setup-node@v3
  with:
    node-version: '16'
    cache: 'npm'
    
- uses: actions/setup-python@v4
  with:
    python-version: '3.10'
\`\`\`

#### Caching Dependencies

\`\`\`yaml
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-node-
\`\`\`

#### Uploading Artifacts

\`\`\`yaml
- uses: actions/upload-artifact@v3
  with:
    name: my-artifact
    path: dist/
\`\`\`

#### Deployment Actions

\`\`\`yaml
- uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1
\`\`\`

### Creating Custom Actions

You can also create your own actions:

1. **JavaScript Actions**: Written in JavaScript, run directly on the runner
2. **Docker Container Actions**: Packaged in a Docker container, more flexible
3. **Composite Actions**: Combine multiple steps into a single action

## Hands-on Exercise: Create a Basic CI Workflow

Let's create a simple CI workflow for a JavaScript project:

1. Create a \`.github/workflows/ci.yml\` file in your repository
2. Add the following content:

\`\`\`yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Lint
      run: npm run lint
      
    - name: Test
      run: npm test
      
    - name: Build
      run: npm run build
      
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build
        path: build/
\`\`\`

3. Commit and push this file to your repository
4. Go to the "Actions" tab in your repository to see the workflow run

In the next chapter, we'll build on this foundation to create a complete deployment pipeline for our Next.js application.`,
  exercise: null
};