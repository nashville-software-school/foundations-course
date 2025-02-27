# Introduction Page Implementation Plan

## Overview

This document outlines the plan for modifying the Foundations Course application to display an introduction page for first-time visitors. The introduction page will include content about the course, a video demonstration, and a "Start Learning!" button. Once a user clicks the button, their preference will be stored in localStorage, and they will never see the intro page again on subsequent visits.

## Current Application Structure

Based on the analysis of the codebase:

- React application using React Router for navigation
- Main layout with navigation sidebar, content area, and footer
- LearnerProgressContext already uses localStorage to track user progress
- Current entry point redirects to "/github-account" by default

## Implementation Steps

### 1. Extend the LearnerProgressContext

Modify the LearnerProgressContext to track whether the user has seen the intro page:

- Add a new property `hasSeenIntro` to the progress state object
- Initialize it to `false` by default
- Create a new function `markIntroAsSeen()` to update this property

```jsx
// In the initial state
const [progress, setProgress] = useState(() => {
    const stored = localStorage.getItem('learnerProgress')
    return stored ? JSON.parse(stored) : {
        exercises: {},
        hasSeenIntro: false,  // Add this new property
        lastUpdated: new Date().toISOString()
    }
})

// Add a new function to mark intro as seen
const markIntroAsSeen = () => {
    setProgress(prev => ({
        ...prev,
        hasSeenIntro: true,
        lastUpdated: new Date().toISOString()
    }))
}

// Add to the context value
const value = {
    progress,
    trackAttempt,
    trackCompletion,
    getExerciseProgress,
    getGlobalProgress,
    markIntroAsSeen  // Add this new function
}
```

### 2. Create an Introduction Page Component

Create a new component `src/components/IntroPage.jsx` that will:

- Display welcome content and information about the course
- Include an embedded video demonstrating how the app works
- Have a prominent "Start Learning!" button
- Use the LearnerProgressContext to mark the intro as seen when the button is clicked

```jsx
import { useNavigate } from 'react-router-dom';
import { useLearnerProgress } from '../context/LearnerProgressContext';

function IntroPage() {
  const navigate = useNavigate();
  const { markIntroAsSeen } = useLearnerProgress();

  const handleStartLearning = () => {
    markIntroAsSeen();
    navigate('/github-account');
  };

  return (
    <div className="intro-page">
      <h1>Welcome to the Foundations Course!</h1>

      <div className="intro-content">
        {/* Introduction content here */}
      </div>

      <div className="video-container">
        {/* Embedded video here */}
      </div>

      <button
        className="start-learning-button"
        onClick={handleStartLearning}
      >
        Start Learning!
      </button>
    </div>
  );
}

export default IntroPage;
```

### 3. Update Routing in App.jsx

Modify the routing in App.jsx to:

- Check if the user has seen the intro (using LearnerProgressContext)
- If not, show the IntroPage component
- If yes, proceed with the current routing logic

```jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Chapter from './components/Chapter'
import Login from './components/Login'
import AuthCallback from './components/AuthCallback'
import IntroPage from './components/IntroPage'  // New import
import { ChapterProvider } from './context/ChapterContext'
import { LearnerProgressProvider } from './context/LearnerProgressContext'
import { AuthProvider } from './context/AuthContext'
import { useLearnerProgress } from './context/LearnerProgressContext'
import './App.css'

// Create a component to handle the redirect logic
function IntroRedirect() {
  const { progress } = useLearnerProgress();

  if (!progress.hasSeenIntro) {
    return <Navigate to="/intro" replace />;
  }

  return <Navigate to="/github-account" replace />;
}

function App() {
  return (
    <Router basename="/foundations-course">
      <AuthProvider>
        <LearnerProgressProvider>
          <ChapterProvider>
            <Routes>
              {/* Add a new route for the intro page */}
              <Route path="/intro" element={<IntroPage />} />

              <Route path="/" element={<Layout />}>
                {/* Modify the index route to check if intro has been seen */}
                <Route index element={<IntroRedirect />} />
                <Route path="login" element={<Login />} />
                <Route path="auth" element={<AuthCallback />} />
                <Route path=":chapterId" element={<Chapter />} />
              </Route>
            </Routes>
          </ChapterProvider>
        </LearnerProgressProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
```

### 4. Create CSS for the Intro Page

Add styles for the intro page in `src/App.css` or create a new CSS file:

```css
.intro-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f9f5ee;
  text-align: center;
}

.intro-content {
  max-width: 800px;
  margin: 2rem 0;
  line-height: 1.6;
}

.video-container {
  width: 100%;
  max-width: 800px;
  margin: 2rem 0;
}

.video-container iframe {
  width: 100%;
  aspect-ratio: 16/9;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.start-learning-button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: rgb(46, 64, 97);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 2rem;
}

.start-learning-button:hover {
  background-color: rgb(70, 90, 126);
}
```

## 5. Create Assets for the Intro Page

- Prepare a video demonstrating the app's functionality
  - Record a screencast showing how to navigate the course
  - Highlight key features like code exercises, progress tracking
  - Keep it concise (2-3 minutes)
- Create any necessary graphics or illustrations
- Write compelling introduction content

## 6. Testing Plan

- Test the intro page on first visit
- Verify that clicking "Start Learning!" redirects to the main UI
- Confirm that localStorage correctly stores the user's preference
- Ensure returning users bypass the intro page
- Test across different browsers to ensure consistent behavior

## 7. Potential Challenges and Solutions

1. **Video Hosting**:
   - Challenge: Where to host the demo video
   - Solution: Use a service like YouTube or Vimeo, or host directly in the project if it's small enough

2. **First-time vs. Returning User Experience**:
   - Challenge: Ensuring a smooth transition for both new and returning users
   - Solution: Use localStorage to reliably track user state

3. **Mobile Responsiveness**:
   - Challenge: Ensuring the intro page works well on mobile devices
   - Solution: Use responsive design principles and test on various screen sizes

## 8. Implementation Timeline

1. Modify LearnerProgressContext - 1 hour
2. Create IntroPage component - 2 hours
3. Update routing in App.jsx - 1 hour
4. Create and style CSS - 1 hour
5. Create/obtain video and content - 3 hours
6. Testing and refinement - 2 hours

Total estimated time: 10 hours