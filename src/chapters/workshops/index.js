import { primitiveVsReferenceChapter } from './primitive_reference/primitive-vs-reference.js'

export const workshopChapters = [
    primitiveVsReferenceChapter
]

export const getChapterById = (id) => {
  return workshopChapters.find(chapter => chapter.id === id)
}

export const getChapterIds = () => {
  return workshopChapters.map(chapter => chapter.id)
}

export const getNextChapter = (currentChapterId) => {
  const currentIndex = workshopChapters.findIndex(chapter => chapter.id === currentChapterId)
  return workshopChapters[currentIndex + 1]
}

export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = workshopChapters.findIndex(chapter => chapter.id === currentChapterId)
  return currentIndex > 0 ? workshopChapters[currentIndex - 1] : undefined
}