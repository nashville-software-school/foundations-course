import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Chapter from './components/Chapter'
import Login from './components/Login'
import AuthCallback from './components/AuthCallback'
import IntroPage from './components/IntroPage'
import { ChapterProvider } from './context/ChapterContext'
import { LearnerProgressProvider } from './context/LearnerProgressContext'
import { AuthProvider } from './context/AuthContext'
import { useLearnerProgress } from './context/LearnerProgressContext'
import './App.css'

// Component to handle redirect logic based on whether user has seen intro
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
              {/* Add intro page route outside of Layout */}
              <Route path="/intro" element={<IntroPage />} />

              <Route path="/" element={<Layout />}>
                {/* Use IntroRedirect to conditionally redirect */}
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
