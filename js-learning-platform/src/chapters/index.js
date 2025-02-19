import { arrayIntroChapter } from './arrays-intro'
import { arrayMethodsChapter } from './array-methods'

export const chapters = [
  arrayIntroChapter,
  arrayMethodsChapter
]

// Helper function to get chapter by ID
export const getChapterById = (id) => {
  return chapters.find(chapter => chapter.id === id)
}

// Helper function to get chapter content
export const getChapterContent = (id) => {
  const chapter = getChapterById(id)
  return chapter ? {
    content: chapter.content,
    exercise: chapter.exercise
  } : null
}