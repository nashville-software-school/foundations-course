import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Chapter from './components/Chapter'
import { ChapterProvider } from './context/ChapterContext'
import './App.css'

function App() {
  return (
    <Router>
      <ChapterProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Chapter />} />
            <Route path=":chapterId" element={<Chapter />} />
          </Route>
        </Routes>
      </ChapterProvider>
    </Router>
  )
}

export default App
