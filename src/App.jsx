import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Chapter from './components/Chapter'
import { ChapterProvider } from './context/ChapterContext'
import { LearnerProgressProvider } from './context/LearnerProgressContext'
import './App.css'

function App() {
  return (
    <Router basename="/">
      <LearnerProgressProvider>
        <ChapterProvider>
          <Routes>
            <Route path="foundations-course" element={<Layout />}>
              <Route index element={<Navigate to="github-account" replace />} />
              <Route path=":chapterId" element={<Chapter />} />
            </Route>
          </Routes>
        </ChapterProvider>
      </LearnerProgressProvider>
    </Router>
  )
}

export default App
