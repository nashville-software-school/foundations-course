import { createContext, useContext, useState, useEffect } from 'react'

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

    const value = {
        progress,
        trackAttempt,
        trackCompletion,
        getExerciseProgress
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