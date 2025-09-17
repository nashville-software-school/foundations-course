# JavaScript Foundations Course

A comprehensive, interactive learning platform for JavaScript fundamentals, designed with a progressive chapter-based structure to build skills from the ground up.

## Table of Contents

- [Purpose and Overview](#purpose-and-overview)
- [Structure: Sections and Chapters](#structure-sections-and-chapters)
- [Testing Chapter Exercises](#testing-chapter-exercises)
- [Deployment Process](#deployment-process)
- [OAuth Authentication](#oauth-authentication)
- [Local Development](#local-development)
- [Contributing](#contributing)

## Purpose and Overview

The JavaScript Foundations Course is an interactive learning platform designed to teach JavaScript fundamentals through structured, hands-on exercises. This application provides:

- **Organized Learning Path**: A progressive curriculum that builds skills step-by-step
- **Interactive Exercises**: Code exercises with real-time feedback
- **Authentication**: GitHub integration for tracking progress
- **Modern Interface**: Clean, distraction-free learning environment

The platform guides learners from basic JavaScript concepts through more advanced topics like functions, arrays, objects, and modules, with each concept building on previous knowledge.

## Structure: Sections and Chapters

The course is organized into logical sections, each containing multiple chapters.

### Sections

Sections represent major topic areas in JavaScript:

```javascript
// From src/sections/index.js
export const sections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Essential setup steps to begin your learning journey'
  },
  {
    id: 'variables-and-values',
    title: 'Variables and Values',
    description: 'Understanding data storage and manipulation in JavaScript'
  },
  // more sections...
]
```

Each section groups related chapters together and provides a high-level organization of the curriculum.

### Chapters

Chapters are individual lessons within a section:

```javascript
// Example chapter object
{
  id: 'arrays-intro',
  title: 'Introduction',
  path: '/arrays-intro',
  sectionId: 'arrays',
  previousChapterId: null,
  nextChapterId: 'arrays-indices',
  content: `## Arrays (a.k.a. collections of things)...`,
  exercise: {
    starterCode: `// Example starter code...`,
    solution: `// Example solution...`,
    tests: [/* tests */]
  }
}
```

Each chapter includes:

- **Content**: Markdown-formatted instructional material
- **Exercise**: Interactive coding challenge with starter code
- **Solution**: Reference implementation for the exercise
- **Tests**: Automated tests to validate the learner's solution
- **Navigation**: Links to previous and next chapters

Chapters are organized in a sequence, with each chapter building on knowledge from previous ones. The application dynamically loads and displays chapters as the user navigates through the course.

## Testing Chapter Exercises

### Function-Based Testing

A robust approach is using the Function constructor to evaluate the student's code and test the actual functionality. The application provides two ways to implement function-based tests: using boolean returns or using the structured TestResult utility.



### Implementing Tests with TestResult

The application includes a `TestResult` utility that provides a more structured approach to test results. This is the recommended approach for new tests:

```javascript
import { TestResult } from "../../utils/test_utils";

// Example test using TestResult
{
  name: "Array Creation",
  test: (code) => {
    try {
      const topicsArray = new Function(code + `\nreturn topics`)();
      const passed = topicsArray.length === 7 &&
        topicsArray[0] === "Variables" &&
        topicsArray[1] === "Loops";
        // Additional checks...

      return new TestResult({ passed });
    } catch {
      return new TestResult({ passed: false });
    }
  },
  message: "Make sure you've included all topics in the correct order"
}
```

#### Steps to Implement TestResult Tests

1. **Import the utility**:
   ```javascript
   import { TestResult } from "../../utils/test_utils";
   ```

2. **Create a Function constructor** that combines:
   - The student's code
   - A return statement for the variable/result you want to test

3. **Execute the function** to retrieve the actual value

4. **Test the value** against expected results

5. **Return a TestResult object**:
   ```javascript
   return new TestResult({
     passed: true|false,  // Required: Test pass/fail status
     testName: "Test Name",  // Optional: Name of the test
     message: "Additional info"  // Optional: Informative message
   });
   ```

6. **Add additional messages** (optional):
   ```javascript
   const result = new TestResult({ passed: true });
   result.add_message("Additional context");
   return result;
   ```

#### Benefits of TestResult Approach

- **Structured results**: Consistent format for test outcomes
- **Multiple messages**: Can include multiple feedback messages
- **Cleaner code**: Separates test logic from result formatting
- **Extensible**: The TestResult object can be enhanced with additional methods
- **Better error handling**: Provides more context when tests fail

## Deployment Process

This application uses GitHub Actions to automatically deploy to GitHub Pages when changes are pushed to the main branch.

### How the Deployment Works

The deployment process is defined in `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      # Checkout code, setup Node, etc.

      - name: Create env file
        run: |
          echo "VITE_OAUTH_CLIENT_ID=${{ secrets.OAUTH_CLIENT_ID }}" > .env
          echo "VITE_OAUTH_CLIENT_SECRET=${{ secrets.OAUTH_CLIENT_SECRET }}" >> .env
          echo "VITE_PROXY_DOMAIN=https://authproxy.nss.team" >> .env

      # Install dependencies, build, deploy
```

The workflow does the following:

1. **Triggers automatically** when code is pushed to the main branch or manually via workflow_dispatch
2. **Sets up the environment** by checking out the code and setting up Node.js
3. **Creates environment variables** from GitHub repository secrets
4. **Builds the application** using Vite
5. **Deploys to GitHub Pages** using GitHub's deployment actions

### Environment Variables for Deployment

The GitHub Actions workflow creates a `.env` file at build time with the following variables:

- `VITE_OAUTH_CLIENT_ID`: The GitHub OAuth application client ID
- `VITE_OAUTH_CLIENT_SECRET`: The GitHub OAuth application client secret
- `VITE_PROXY_DOMAIN`: The domain where the auth proxy server is hosted

These variables are stored as secrets in the GitHub repository settings and are only accessible during the build process, ensuring secure handling of sensitive credentials.

### Static Site Considerations

Because GitHub Pages only serves static files, the application uses:

1. A separate auth proxy server to handle GitHub OAuth token exchange
2. Client-side routing with React Router
3. A custom 404.html page to handle direct navigation to routes
4. Environment variables injected at build time

## OAuth Authentication

This application uses GitHub OAuth for authentication, allowing users to sign in with their GitHub accounts. This provides a seamless authentication experience and enables tracking progress across sessions.

### OAuth Flow Overview

The GitHub OAuth flow works as follows:

1. **User initiates login**: Clicks the "Sign in with GitHub" button
2. **Redirect to GitHub**: User is redirected to GitHub's authorization page
3. **User authorizes the app**: Grants permission to the application
4. **GitHub redirects back**: Returns to the application with an authorization code
5. **Code exchange**: The application exchanges the code for an access token via proxy server
6. **Fetch user data**: The token is used to retrieve the user's GitHub profile
7. **Session created**: User is authenticated in the application

### Implementation Components

#### 1. Client-Side Authentication Context

The `AuthContext.jsx` provides authentication state and methods:

```javascript
// From src/context/AuthContext.jsx
export const AuthProvider = ({ children }) => {
    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

    // Login method redirects to GitHub OAuth
    const login = () => {
        const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID
        const redirectUri = `${window.location.origin}${basePath}/auth`
        // Generate state parameter for security
        const state = Math.random().toString(36).substring(2, 15)
        sessionStorage.setItem('oauth_state', state)

        // Redirect to GitHub authorization page
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user&state=${state}`
    }

    // Other authentication methods...
}
```

#### 2. Auth Callback Component

The `AuthCallback.jsx` component handles the OAuth redirect and token exchange:

```javascript
// From src/components/AuthCallback.jsx
const handleAuth = async () => {
    // Get code and state from URL params
    const code = params.get('code')
    const state = params.get('state')

    // Verify state parameter
    if (state !== storedState) {
        setError('Security error: Invalid state parameter')
        return
    }

    try {
        // Get proxy domain from environment variables
        const proxyDomain = import.meta.env.VITE_PROXY_DOMAIN

        // Exchange code for token via proxy server
        const response = await fetch(`${proxyDomain}/oauth/github/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code,
                redirect_uri: `${window.location.origin}${basePath}/auth`
            })
        })

        const data = await response.json()

        // Store token and fetch user data
        localStorage.setItem('github_token', data.access_token)
        await fetchUserData(data.access_token)
    } catch (error) {
        // Handle errors...
    }
}
```

#### 3. Auth Proxy Server

Since GitHub Pages only supports static content, a separate server handles the OAuth token exchange:

- Runs on a separate domain (configured as VITE_PROXY_DOMAIN)
- Securely stores OAuth client secret
- Handles the GitHub API request to exchange authorization code for access token
- Returns the token to the client application

This architecture separates sensitive credentials from the client-side code while maintaining a seamless authentication experience.

## Local Development

### Local OAuth CORS Proxy

1. Clone the [auth-proxy](https://github.com/stevebrownlee/authproxy) repo into its own directory.
2. Run `npm install`.
3. Follow the instruction in that README to set up the local `.env` file with the Github OAuth app info and port number _(e.g. 3003)_. Allow origin will be the local domain of the client app.
4. Run `npm run start` to start the simple CORS Proxy.

### Foundations Course

To set up the project for local development:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nashville-software-school/foundations-course
   cd foundations-course
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment variables**:
   Create a `.env.local` file in the project root:
   ```
   VITE_OAUTH_CLIENT_ID=your_github_oauth_client_id
   VITE_PROXY_DOMAIN=http://localhost:3003
   VITE_LEARNING_PLATFORM_API=http://localhost:8000
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Start the auth proxy server** (in a separate terminal):
   ```bash
   cd path/to/auth-proxy
   npm install
   npm start
   ```

The application will be available at http://localhost:5173/foundations-course/

## Contributing

Contributions to the JavaScript Foundations Course are welcome! Here's how you can contribute:

### Adding or Modifying Chapters

1. Create a new chapter file in `src/chapters/` following the existing pattern:
   ```javascript
   export const newChapter = {
     id: 'unique-id',
     title: 'Chapter Title',
     path: '/unique-id',
     sectionId: 'section-id',
     previousChapterId: 'previous-chapter',
     nextChapterId: 'next-chapter',
     content: `## Markdown Content...`,
     exercise: {
       starterCode: `// Starter code...`,
       solution: `// Solution...`,
       tests: [/* tests */]
     }
   }
   ```

2. Import and add the chapter in `src/chapters/index.js`

### Modifying Tests

When creating tests for chapter exercises, use the Function-based testing approach described in the Testing Chapter Exercises section for more robust validation.

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
