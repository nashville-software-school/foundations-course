import { createContext, useContext, useState, useEffect } from 'react'
import { chapters } from '../chapters'

const LearnerProgressContext = createContext()

export const LearnerProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState(() => {
        // Initialize from localStorage or create new manifest
        const stored = localStorage.getItem('learnerProgress')
        return stored ? JSON.parse(stored) : {
            exercises: {},
            lastUpdated: new Date().toISOString()
        }
    })

    // Persist to localStorage whenever progress changes
    useEffect(() => {
        localStorage.setItem('learnerProgress', JSON.stringify(progress))
    }, [progress])

    const trackAttempt = (exerciseId) => {
        setProgress(prev => {
            const exercise = prev.exercises[exerciseId] || {
                attempts: 0,
                completed: false,
                firstAttempt: null,
                lastAttempt: null
            }

            return {
                ...prev,
                exercises: {
                    ...prev.exercises,
                    [exerciseId]: {
                        ...exercise,
                        attempts: exercise.attempts + 1,
                        firstAttempt: exercise.firstAttempt || new Date().toISOString(),
                        lastAttempt: new Date().toISOString()
                    }
                },
                lastUpdated: new Date().toISOString()
            }
        })
    }

    const trackCompletion = (exerciseId, code = null) => {
        setProgress(prev => {
            const exercise = prev.exercises[exerciseId] || {
                attempts: 0,
                completed: false,
                firstAttempt: null,
                lastAttempt: null,
                completedCode: null
            }

            return {
                ...prev,
                exercises: {
                    ...prev.exercises,
                    [exerciseId]: {
                        ...exercise,
                        completed: true,
                        completedAt: new Date().toISOString(),
                        lastAttempt: new Date().toISOString(),
                        completedCode: code
                    }
                },
                lastUpdated: new Date().toISOString()
            }
        })
    }

    const getExerciseProgress = (exerciseId) => {
        return progress.exercises[exerciseId] || {
            attempts: 0,
            completed: false,
            firstAttempt: null,
            lastAttempt: null
        }
    }

    // Calculate global progress excluding "Getting Started" section
    const getGlobalProgress = () => {
        // Filter out chapters from "Getting Started" section
        const relevantChapters = chapters.filter(chapter =>
            chapter.sectionId !== 'getting-started'
        )

        const totalChapters = relevantChapters.length
        const completedChapters = relevantChapters.filter(chapter =>
            progress.exercises[chapter.id]?.completed
        ).length

        // Calculate percentage
        const percentage = totalChapters > 0
            ? Math.round((completedChapters / totalChapters) * 100)
            : 0

        // Determine level (0-4 for the 5 stars)
        // Each level represents 20% of progress
        const level = Math.min(Math.floor(percentage / 20), 4)

        return {
            totalChapters,
            completedChapters,
            percentage,
            level
        }
    }

    const value = {
        progress,
        trackAttempt,
        trackCompletion,
        getExerciseProgress,
        getGlobalProgress
    }

    return (
        <LearnerProgressContext.Provider value={value}>
            {children}
        </LearnerProgressContext.Provider>
    )
}

export const useLearnerProgress = () => {
    const context = useContext(LearnerProgressContext)
    if (!context) {
        throw new Error('useLearnerProgress must be used within a LearnerProgressProvider')
    }
    return context
}