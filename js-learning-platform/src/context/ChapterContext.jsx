import { createContext, useContext, useState } from 'react'
import { chapters, getChapterContent } from '../chapters'
import { getSectionById } from '../sections'

const ChapterContext = createContext()

export function useChapter() {
  return useContext(ChapterContext)
}

/**
 * Gets the next chapter in sequence based on previousChapterId links
 * @param {string} currentChapterId - The ID of the current chapter
 * @returns {Object|null} The next chapter object or null if not found
 */
const getNextChapter = (currentChapterId) => {
  return chapters.find(chapter => chapter.previousChapterId === currentChapterId)
}

/**
 * Gets all chapters for a specific section
 * @param {string} sectionId - The ID of the section
 * @returns {Array} Array of chapter objects in the section
 */
const getChaptersBySection = (sectionId) => {
  return chapters.filter(chapter => chapter.sectionId === sectionId)
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
    loadChapter,
    // New helper functions
    getNextChapter,
    getChaptersBySection,
    // Section information
    getCurrentSection: () => currentChapter ? getSectionById(currentChapter.sectionId) : null
  }

  return (
    <ChapterContext.Provider value={value}>
      {children}
    </ChapterContext.Provider>
  )
}

export default ChapterContext