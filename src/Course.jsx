import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Layout, Chapter, Login, AuthCallback, IntroPage } from '@nss-workshops/nss-core'
import { ChapterProvider, LearnerProgressProvider, AuthProvider, useLearnerProgress } from '@nss-workshops/nss-core'
import Cookies from 'js-cookie'
import { CoreProvider } from "@nss-workshops/nss-core";

import './Course.css'

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

/**
 * Helper function to get the first chapter in a section
 * @param {string} sectionId - The section ID
 * @returns {Object|undefined} The first chapter in the section
 */
export const getFirstChapterInSection = (sectionId) => {
  return chapters.find(
    (chapter) => chapter.sectionId === sectionId && !chapter.previousChapterId
  )
}

/**
 * Helper function to get all chapters in a section
 * @param {string} sectionId - The section ID
 * @returns {Array} Array of chapters in the section
 */
export const getChaptersInSection = (sectionId) => {
  return chapters.filter((chapter) => chapter.sectionId === sectionId)
}


function Course({config, nav, chapters}) {

  const getSectionById = (id) => {
    return nav.find((section) => section.id === id)
  }

  const getChapterContent = (id) => {
    const chapter = chapters.find((chapter) => chapter.id === id)
    return chapter
      ? {
          content: chapter.content,
          exercise: chapter.exercise,
        }
      : null
  }

  return (
    <CoreProvider 
      config={config} 
      courseName={config.courseName} 
      doAuth={config.doAuth}>
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

              <Route path="/" element={<Layout sections={nav}/>}>
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
    </CoreProvider>
  )
}

export default Course
