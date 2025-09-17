import { createContext, useContext, useState } from 'react'
import { chapters, getChapterContent } from '../chapters'
import { getSectionById } from '../sections'
import { useProgress } from './LearnerProgressContext'

const ChapterContext = createContext()

export function useChapter() {
  return useContext(ChapterContext)
}

// Track which sections are expanded
const initialExpandedSections = new Set()

/**
 * Gets the previous chapter in sequence
 * @param {string} currentChapterId - The ID of the current chapter
 * @returns {Object|null} The previous chapter object or null if not found
 */
const getPreviousChapter = (currentChapterId) => {
  const currentChapter = chapters.find(chapter => chapter.id === currentChapterId)
  return chapters.find(chapter => chapter.id === currentChapter?.previousChapterId)
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
  const [expandedSections, setExpandedSections] = useState(initialExpandedSections)
  const { checkPrerequisites } = useProgress()

  const loadChapter = (chapterId) => {
    const chapter = chapters.find(c => c.id === chapterId)
    if (chapter) {
      // Check prerequisites before loading
      if (chapter.requiresPrerequisite && !checkPrerequisites(chapter)) {
        console.warn(`Chapter ${chapterId} prerequisites not met`)
        // Could show a modal or notification here in the future
        return false
      }

      setCurrentChapter(chapter)
      setChapterContent(getChapterContent(chapter.id))
      // Auto-expand the section containing the loaded chapter
      setExpandedSections(prev => {
        const newSet = new Set(prev)
        newSet.add(chapter.sectionId)
        return newSet
      })
      return true
    }
    return false
  }

  // Helper function to check if a chapter is accessible
  const isChapterAccessible = (chapter) => {
    if (!chapter.requiresPrerequisite) {
      return true
    }
    return checkPrerequisites(chapter)
  }

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const value = {
    chapters,
    currentChapter,
    chapterContent,
    loadChapter,
    // Section management
    expandedSections,
    toggleSection,
    isSectionExpanded: (sectionId) => expandedSections.has(sectionId),
    // Helper functions
    getPreviousChapter,
    getNextChapter,
    getChaptersBySection,
    isChapterAccessible,
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