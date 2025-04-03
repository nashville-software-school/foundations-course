import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
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
    const { user } = useAuth()

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

        // Only send progress to API if lastUpdatedExerciseId exists
        if (progress.lastUpdatedExerciseId && progress.exercises[progress.lastUpdatedExerciseId]) {
            console.log('Sending progress for exercise:', progress.lastUpdatedExerciseId);
            sendProgressToAPI(
                progress.lastUpdatedExerciseId,
                progress.exercises[progress.lastUpdatedExerciseId]
            );
        }
    }, [progress, user]) // Added user as a dependency since it's used in sendProgressToAPI

    // Function to do a PUT request to the Learning Platform API. Must accept the current exercise being worked on as a parameter. The exercise is stringified and sent to the API
    const sendProgressToAPI = async (exerciseId, currentProgress) => {
        // Validate parameters
        if (!exerciseId || !currentProgress) {
            console.warn('sendProgressToAPI called with invalid parameters:', { exerciseId, currentProgress });
            return;
        }

        // Validate user is authenticated
        if (!user || !user.id) {
            console.warn('sendProgressToAPI called without authenticated user');
            return;
        }

        const payload = {
            ...currentProgress,
            userId: user.id,
            username: user.name,
        }

        try {
            // Use dedicated environment variable for learning platform API
            // Default to localhost for development if not set
            const apiDomain = import.meta.env.VITE_LEARNING_PLATFORM_API || 'http://localhost:8000';
            const apiUrl = `${apiDomain}/foundations/${exerciseId}`;

            console.log(`Sending progress to API: ${apiUrl}`);

            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                console.warn(`API response not OK: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error sending progress to API:', error)
        }
    }

    const trackAttempt = (exerciseId, chapterTitle) => {
        return setProgress(prev => {
            const exercise = prev.exercises[exerciseId] || {
                attempts: 0,
                completed: false,
                firstAttempt: null,
                lastAttempt: null,
                title: chapterTitle
            }

            const newState = {
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
                lastUpdated: new Date().toISOString(),
                lastUpdatedExerciseId: exerciseId
            }

            return newState
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
                lastUpdated: new Date().toISOString(),
                lastUpdatedExerciseId: exerciseId // Add this to track which exercise was completed
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
                lastUpdated: new Date().toISOString(),
                // Preserve lastUpdatedExerciseId if it exists
                lastUpdatedExerciseId: prev.lastUpdatedExerciseId
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
        markIntroAsSeen,
        sendProgressToAPI
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