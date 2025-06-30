export const githubActionsBasicsChapter = {
  id: 'github-actions-basics',
  title: 'GitHub Actions Basics',
  sectionId: 'intro-to-cicd',
  previousChapterId: 'cicd-fundamentals',
  content: `## What are GitHub Actions?

GitHub Actions is a CI/CD platform that allows you to automate your software development workflows 
directly in your GitHub repository. 
With GitHub Actions, you can build, test, and deploy your code right from GitHub, as well as automate 
other tasks like issue triage, dependency updates, and more.

### Key Features of GitHub Actions

- **Integrated with GitHub**: Built directly into the GitHub platform
- **Workflow as Code**: Define workflows using YAML files
- **Event-driven**: Trigger workflows based on GitHub events
- **Reusable Actions**: Use pre-built actions from the marketplace
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

## Anatomy of a Workflow File

GitHub Actions workflows are defined in YAML files stored in the \`.github/workflows\` directory of your repository. 
Let's examine an example workflow file that would run whenever code is pushed to the repository.

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

### 🏗️ How It Works
- 1️⃣ You push code to your GitHub repository.
- 2️⃣ GitHub looks in .github/workflows/ for YAML files.
- 3️⃣ For each workflow file:
  - GitHub checks if the trigger conditions match (e.g., on: push to main).
  - If yes, it launches a runner (like a mini virtual machine) to execute the steps.
- 4️⃣ The runner:
  - Reads and interprets each step (run:, uses:) 
  - Executes them in order until done or a failure occurs.


### Exploring a Real-World GitHub Actions Workflow in a Vite Project
To explore a real-world example of a GitHub Actions workflow for deploying a 
Vite-based frontend application, you can examine the [vite-deploy-demo](https://github.com/sitek94/vite-deploy-demo) 
repository. This project demonstrates how to automate the build and deployment process 
of a Vite app to GitHub Pages using GitHub Actions.

#### 🧭 Navigating to the Actions Tab

1. **Open the Repository**: Visit the [vite-deploy-demo repository](https://github.com/sitek94/vite-deploy-demo) in your web browser.
2. **Access the Actions Tab**: At the top of the repository page, click on the **"Actions"** tab.
3. **Explore Workflows**: Within the Actions tab, you'll see a list of workflows that have been set up for 
the repository. Clicking on any workflow will provide details about its configuration, recent runs, and logs.
This section is invaluable for understanding how the repository automates tasks like testing, 
building, and deploying code using GitHub Actions.


### Key Components Explained

<iframe width="560" height="315" src="https://www.youtube.com/embed/Szykgp7yl4s?si=mMBkadxVYGr7-sZT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

1. **name**: The name of the workflow (appears in the Actions tab)
2. **on**: Defines the events that trigger the workflow
3. **jobs**: Groups of steps that execute on the same runner
4. **runs-on**: Specifies the type of machine to run the job on
5. **steps**: Individual tasks that run commands or actions
6. **uses**: References a reusable action
7. **with**: Provides inputs to an action
8. **run**: Executes shell commands

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

1. **JavaScript Actions**: Written in JavaScript, run directly on the runner inline
  The run propertyof the action 'Run JavaScript inline' below is an example of writing custom action 
  inline (right inside the yaml template)
2. **JavaScript Actions**: Written in JavaScript, run directly on the runner logic specified in external js file
  The uses property in the "Run external JavaScript action" step below illustrates how to run a custom 
  JavaScript action defined in an external file that is part of the repository.

\`\`\`
name: Inline JavaScript in GitHub Actions

on:
  push:
    branches:
      - main

jobs:
  run-inline-js:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Run JavaScript inline
      run: |
        echo "Running inline JavaScript..."
        node -e "console.log('Hello from inline JavaScript!');"
    - name: Run external JavaScript action
      uses: ./.github/actions/my-js-action
      with:
        example-input: "Hello, world!"
\`\`\`

## Hands-on Exercise: Create a Basic CI Workflow

In the next chapter, we'll build on this foundation to create a complete deployment pipeline for our rock of ages frontend application.`,
  exercise: null
};