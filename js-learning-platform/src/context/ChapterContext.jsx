import { createContext, useContext, useState } from 'react'
import { chapters, getChapterContent } from '../chapters'

const ChapterContext = createContext()

export function useChapter() {
  return useContext(ChapterContext)
}

export function ChapterProvider({ children }) {
  const [currentChapter, setCurrentChapter] = useState(chapters[0])
  const [chapterContent, setChapterContent] = useState(getChapterContent(chapters[0].id))

  const loadChapter = (chapterId) => {
    const chapter = chapters.find(c => c.id === chapterId)
    if (chapter) {
      setCurrentChapter(chapter)
      setChapterContent(getChapterContent(chapter.id))
    }
  }

  const value = {
    chapters,
    currentChapter,
    chapterContent,
    loadChapter
  }

  return (
    <ChapterContext.Provider value={value}>
      {children}
    </ChapterContext.Provider>
  )
}

export default ChapterContext