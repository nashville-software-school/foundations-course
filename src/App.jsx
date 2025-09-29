import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Layout, Chapter, Login, AuthCallback, IntroPage } from '@nss-workshops/nss-core'
import { ChapterProvider, LearnerProgressProvider, AuthProvider, useLearnerProgress } from '@nss-workshops/nss-core'
import Cookies from 'js-cookie'
import { chapters, getChapterContent } from './chapters'
import { getSectionById, sections } from './sections'

import './App.css'

// Component to handle redirect logic based on whether user has seen intro
function IntroRedirect() {
  const { progress } = useLearnerProgress()
  const location = useLocation()

  // Check URL parameter
  const searchParams = new URLSearchParams(location.search)
  const hasSeenIntroParam = searchParams.get('hasSeenIntro') === 'true'

  // Check if there is a `cohort` query parameter
  const cohortParam = searchParams.get('cohort')
  if (cohortParam) {
    // Store the cohort parameter in a cookie
    Cookies.set('cohort', cohortParam, { expires: 90 })
  }

  // Check all possible storage locations
  const hasSeenIntroContext = progress.hasSeenIntro
  const hasSeenIntroCookie = Cookies.get('hasSeenIntro') === 'true'

  // If any of them is true, consider the intro as seen
  console.log('IntroRedirect - hasSeenIntro from context:', hasSeenIntroContext)
  console.log('IntroRedirect - hasSeenIntro from cookie:', hasSeenIntroCookie)

  // Only redirect to intro if neither cookie nor URL parameter indicate the intro was seen
  if (!hasSeenIntroCookie && !hasSeenIntroParam) {
    return <Navigate to="/intro" replace />
  }

  console.log('Redirecting to main content')
  // If hasSeenIntroParam is true, preserve it when redirecting
  return <Navigate to={hasSeenIntroParam ? "introduction?hasSeenIntro=true" : "introduction"} replace />
}

function App() {
  return (
    <Router basename="/intro-to-cloud-student-facing">
      <AuthProvider>
        <LearnerProgressProvider>
          <ChapterProvider
              chapters={chapters} 
              getChapterContent={getChapterContent} 
              getSectionById={getSectionById}>
            <Routes>
              {/* Add intro page route outside of Layout */}
              <Route path="/intro" element={<IntroPage />} />

              <Route path="/" element={<Layout sections={sections}/>}>
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
