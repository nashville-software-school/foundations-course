# Authentication Implementation Plan

## Overview
Implement Github OAuth authentication for a static web app deployed on Github Pages, using Github Actions for build-time configuration and Github OAuth web flow for authentication.

## Content Access Structure

### Free Access (No Authentication Required)
- Getting Started section
  - Github Account Setup
  - Anthropic Account
  - VS Code Installation
  - Slack Installation
- Variables and Values section
  - All chapters in this section remain free to encourage initial learning

### Protected Access (Requires Github Authentication)
- Arrays section
- Objects section
- Functions section
- Modules section

## Technical Implementation

### 1. Github OAuth Configuration

#### Github OAuth App Setup
1. Create OAuth application in Github:
   - Homepage URL: https://[username].github.io/foundations-course
   - Authorization callback URL: https://[username].github.io/foundations-course/auth

#### Repository Secret Configuration
1. Add repository secret:
   ```
   OAUTH_CLIENT_ID=your_oauth_client_id
   ```

#### Github Actions Workflow
Update existing `.github/workflows/deploy.yml`:
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

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Create env file
        run: |
          echo "VITE_OAUTH_CLIENT_ID=${{ secrets.OAUTH_CLIENT_ID }}" > .env

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

For local development, create a `.env.local` file (gitignored):
```
VITE_OAUTH_CLIENT_ID=your_oauth_client_id
```

### 2. Authentication Implementation

#### OAuth Flow
Use Github OAuth web flow (client-side only):
1. Redirect to Github OAuth authorize URL
2. Github redirects back with temporary code
3. Exchange code for token using CORS proxy
4. Store token in localStorage

#### Authentication Context
```jsx
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem('github_token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const login = () => {
    const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID;
    const redirectUri = `${window.location.origin}/foundations-course/auth`;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
  };

  const logout = () => {
    localStorage.removeItem('github_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 3. Frontend Components

#### Protected Route Component
```jsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
```

#### Auth Button Component
```jsx
const AuthButton = () => {
  const { isAuthenticated, user, login, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <div>
        <img src={user.avatar_url} alt="Profile" />
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <button onClick={login}>Sign in with Github</button>;
};
```

### 4. Progress Data Management

#### Local Storage Strategy
- Store progress data in localStorage
- Associate progress with Github username when authenticated
- Implement data persistence logic in LearnerProgressContext

```jsx
const getStorageKey = (user) => {
  return user ? `learnerProgress_${user.login}` : 'learnerProgress';
};

export const LearnerProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const storageKey = getStorageKey(user);

  // ... existing progress logic, using dynamic storageKey
};
```

### 5. Chapter Protection Implementation

#### Chapter Metadata
Add protection level to chapter definitions:
```javascript
export const arrayIntroChapter = {
  id: 'arrays-intro',
  title: 'Introduction to Arrays',
  requiresAuth: true,
  // ... other properties
};
```

#### Protected Chapter Wrapper
```jsx
const Chapter = () => {
  const { chapterId } = useParams();
  const chapter = getChapterById(chapterId);

  if (chapter.requiresAuth) {
    return (
      <ProtectedRoute>
        <ChapterContent chapter={chapter} />
      </ProtectedRoute>
    );
  }

  return <ChapterContent chapter={chapter} />;
};
```

## Implementation Phases

### Phase 1: Setup
1. Create Github OAuth app
2. Add OAUTH_CLIENT_ID repository secret
3. Update deploy.yml workflow
4. Set up local development environment

### Phase 2: Frontend Integration
1. Create auth-related components
2. Implement protected routes
3. Update navigation with auth status

### Phase 3: Content Protection
1. Add protection flags to chapters
2. Implement protected chapter wrapper
3. Update progress tracking for authenticated users

### Phase 4: Testing & Polish
1. Test OAuth flow
2. Verify protected content access
3. Test progress persistence
4. Cross-browser testing

## Security Considerations

1. Use HTTPS for all OAuth operations
2. Implement proper token storage
3. Clear sensitive data on logout
4. Handle OAuth errors gracefully

## Future Enhancements

1. Offline access capabilities
2. Progress sync across devices
3. Social features for authenticated users
4. Achievement system