import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Chapter from './components/Chapter'
import Login from './components/Login'
import AuthCallback from './components/AuthCallback'
import { ChapterProvider } from './context/ChapterContext'
import { LearnerProgressProvider } from './context/LearnerProgressContext'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {
  return (
    <Router basename="/foundations-course">
      <AuthProvider>
        <LearnerProgressProvider>
          <ChapterProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/github-account" replace />} />
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
