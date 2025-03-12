import { createContext, useContext, useState, useEffect } from 'react'
import { chapters } from '../chapters'
import Cookies from 'js-cookie'

const LearnerProgressContext = createContext()

export const LearnerProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState(() => {
        // Initialize from localStorage/cookies or create new manifest
        const stored = localStorage.getItem('learnerProgress')
        const hasSeenIntroCookie = Cookies.get('hasSeenIntro')

        // Create default state
        const defaultState = {
            exercises: {},
            hasSeenIntro: hasSeenIntroCookie === 'true',  // Check cookie first
            lastUpdated: new Date().toISOString()
        }

        // If we have stored data in localStorage, use it but prioritize the cookie for hasSeenIntro
        if (stored) {
            const parsedStored = JSON.parse(stored)
            return {
                ...parsedStored,
                hasSeenIntro: hasSeenIntroCookie === 'true' || parsedStored.hasSeenIntro
            }
        }

        return defaultState
    })

    // Persist to localStorage and cookies whenever progress changes
    useEffect(() => {
        // Save to localStorage
        localStorage.setItem('learnerProgress', JSON.stringify(progress));

        // Save hasSeenIntro to a cookie with 1-year expiration
        if (progress.hasSeenIntro) {
            console.log('Setting hasSeenIntro cookie to true');
            Cookies.set('hasSeenIntro', 'true', { expires: 365 });
        }

        // Verify what was saved
        const savedData = localStorage.getItem('learnerProgress');
        const cookieValue = Cookies.get('hasSeenIntro');
        console.log('Verified localStorage data:', savedData.length);
        console.log('Verified cookie value:', cookieValue);
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

    // Function to mark the intro page as seen
    const markIntroAsSeen = () => {
        console.log('markIntroAsSeen called');
        console.log('Previous progress state:', progress);

        setProgress(prev => {
            const newState = {
                ...prev,
                hasSeenIntro: true,
                lastUpdated: new Date().toISOString()
            };

            console.log('New progress state:', newState);
            return newState;
        });
    }

    const value = {
        progress,
        trackAttempt,
        trackCompletion,
        getExerciseProgress,
        getGlobalProgress,
        markIntroAsSeen
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