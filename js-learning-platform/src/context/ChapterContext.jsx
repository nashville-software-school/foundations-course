import { createContext, useContext, useState } from 'react'

const ChapterContext = createContext()

export function useChapter() {
  return useContext(ChapterContext)
}

export function ChapterProvider({ children }) {
  const [chapters] = useState([
    {
      id: 'arrays-intro',
      title: 'Introduction to Arrays',
      path: '/arrays-intro'
    },
    {
      id: 'arrays-methods',
      title: 'Array Methods',
      path: '/arrays-methods'
    },
    {
      id: 'arrays-iteration',
      title: 'Array Iteration',
      path: '/arrays-iteration'
    }
  ])

  const [currentChapter, setCurrentChapter] = useState(chapters[0])

  const value = {
    chapters,
    currentChapter,
    setCurrentChapter
  }

  return (
    <ChapterContext.Provider value={value}>
      {children}
    </ChapterContext.Provider>
  )
}

export default ChapterContext