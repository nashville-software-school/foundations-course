import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Chapter from './components/Chapter'
import { ChapterProvider } from './context/ChapterContext'
import './App.css'

function App() {
  return (
    <Router basename="/foundations-course">
      <ChapterProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/variables-intro" replace />} />
            <Route path=":chapterId" element={<Chapter />} />
          </Route>
        </Routes>
      </ChapterProvider>
    </Router>
  )
}

export default App
