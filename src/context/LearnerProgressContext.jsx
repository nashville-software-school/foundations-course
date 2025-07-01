import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { chapters } from '../chapters'
import Cookies from 'js-cookie'

const LearnerProgressContext = createContext()

export const useProgress = () => {
    const context = useContext(LearnerProgressContext)
    if (!context) {
        throw new Error('useProgress must be used within a LearnerProgressProvider')
    }
    return context
}

export const LearnerProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState(() => {
        // Initialize from localStorage/cookies or create new manifest
        const stored = localStorage.getItem('learnerProgress')
        const hasSeenIntroCookie = Cookies.get('hasSeenIntro')

        // Create default state
        const defaultState = {
            exercises: {},
            hasSeenIntro: hasSeenIntroCookie === 'true',  // Check cookie first
            lastUpdated: new Date().toISOString(),
            shouldSendToAPI: false // New flag to control API updates
        }

        // If we have stored data in localStorage, use it but prioritize the cookie for hasSeenIntro
        if (stored) {
            const parsedStored = JSON.parse(stored)
            return {
                ...parsedStored,
                hasSeenIntro: hasSeenIntroCookie === 'true' || parsedStored.hasSeenIntro,
                shouldSendToAPI: false // Initialize to false when loading from storage
            }
        }

        return defaultState
    })
    const { user } = useAuth()

    // Persist to localStorage and cookies whenever progress changes
    useEffect(() => {
        // Save to localStorage
        localStorage.setItem('learnerProgress', JSON.stringify(progress))

        // Save hasSeenIntro to a cookie with 1-year expiration
        if (progress.hasSeenIntro) {
            console.log('Setting hasSeenIntro cookie to true')
            Cookies.set('hasSeenIntro', 'true', { expires: 365 })
        }

        // Verify what was saved
        const savedData = localStorage.getItem('learnerProgress')
        const cookieValue = Cookies.get('hasSeenIntro')
        console.log('Verified localStorage data:', savedData.length)
        console.log('Verified cookie value:', cookieValue)

        // Only send progress to API if shouldSendToAPI flag is true and lastUpdatedExerciseId exists
        if (progress.shouldSendToAPI && progress.lastUpdatedExerciseId &&
            progress.exercises[progress.lastUpdatedExerciseId]) {
            console.log('Sending progress for exercise:', progress.lastUpdatedExerciseId)
            sendProgressToAPI(
                progress.lastUpdatedExerciseId,
                progress.exercises[progress.lastUpdatedExerciseId]
            )

            // Reset the flag after sending to API
            setProgress(prev => ({
                ...prev,
                shouldSendToAPI: false
            }))
        }
    }, [progress, user]) // Added user as a dependency since it's used in sendProgressToAPI

    useEffect(() => {
        if (user && "name" in user) {
            // GET all learner progress from the API and merge it with local progress
            const fetchProgress = async () => {
                const progress = {}
                try {
                    // Use dedicated environment variable for learning platform API
                    // Default to localhost for development if not set
                    const apiDomain = import.meta.env.VITE_LEARNING_PLATFORM_API || 'http://localhost:8000'
                    const apiUrl = `${apiDomain}/foundations/${user.id}/exercises`

                    const response = await fetch(apiUrl)
                    if (!response.ok) {
                        throw new Error('Failed to fetch progress from API')
                    }

                    const data = await response.json()

                    const exercises = {}
                    for (const exercise of data) {
                        const slug = exercise.slug

                        // Extract the completed code using regex patterns instead of JSON parsing
                        let parsedCompletedCode = false;
                        if (exercise.completed_code) {
                            try {
                                const completedCode = exercise.completed_code;

                                // Check if it's a single-file code format: {'code': '...'}
                                const codeMatch = completedCode.match(/{'code': '([\s\S]*?)'}/);
                                if (codeMatch && codeMatch[1]) {
                                    // It's a single-file format
                                    parsedCompletedCode = {
                                        code: codeMatch[1].replace(/\\n/g, '\n')
                                                         .replace(/\\'/g, "'")
                                                         .replace(/\\"/g, '"')
                                                         .replace(/\\\\/g, '\\')
                                    };
                                    console.log('Extracted single-file code successfully');
                                }
                                // Check if it's a multi-file format: {'files': {...}}
                                else if (completedCode.includes("{'files':")) {
                                    // Extract the files object content
                                    parsedCompletedCode = { files: {} };

                                    // Use regex to find all file entries
                                    const filePattern = /'([^']+)': '([\s\S]*?)(?:(?<!\\)'(?:,|\}))/g;
                                    let match;

                                    // Create a copy of the string to work with
                                    let fileContent = completedCode;

                                    // Remove the outer {'files': and trailing }
                                    fileContent = fileContent.replace(/^{'files': {/, '').replace(/}}$/, '}');

                                    // Find all file matches
                                    while ((match = filePattern.exec(fileContent + "'")) !== null) {
                                        const fileName = match[1];
                                        let fileCode = match[2];

                                        // Unescape the content
                                        fileCode = fileCode.replace(/\\n/g, '\n')
                                                          .replace(/\\'/g, "'")
                                                          .replace(/\\"/g, '"')
                                                          .replace(/\\\\/g, '\\');

                                        parsedCompletedCode.files[fileName] = fileCode;
                                    }

                                    console.log('Extracted multi-file code successfully:',
                                                Object.keys(parsedCompletedCode.files));
                                }
                                else {
                                    console.warn('Unrecognized completed_code format:', completedCode);
                                }
                            } catch (error) {
                                console.error('Error extracting completed_code:', error);
                            }
                        }

                        // Ensure each exercise has a valid structure
                        exercises[slug] = {
                            attempts: exercise.attempts || 0,
                            completed: exercise.complete || false,
                            completedAt: exercise.completed_on || false,
                            completedCode: parsedCompletedCode,
                            firstAttempt: exercise.first_attempt || null,
                            lastAttempt: exercise.last_attempt || null,
                            codeHashes: [],
                            solutionShown: exercise.used_solution || false
                        }
                    }
                    progress.exercises = exercises
                    progress.hasSeenIntro = true
                    progress.lastUpdatedExerciseId = data[data.length - 1]?.slug || null

                } catch (error) {
                    console.error('Error fetching progress from API:', error)
                }

                localStorage.setItem('learnerProgress', JSON.stringify(progress))
                setProgress(prev => ({
                    ...prev,
                    ...progress,
                    lastUpdated: new Date().toISOString()
                }))
            }

            fetchProgress()
        }
    }, [])

    // Function to do a PUT request to the Learning Platform API. Must accept the current exercise being worked on as a parameter. The exercise is stringified and sent to the API
    const sendProgressToAPI = async (exerciseId, currentProgress) => {
        // Validate parameters
        if (!exerciseId || !currentProgress) {
            console.warn('sendProgressToAPI called with invalid parameters:', { exerciseId, currentProgress })
            return
        }

        // Validate user is authenticated
        if (!user || !user.id) {
            console.warn('sendProgressToAPI called without authenticated user')
            return
        }

        const payload = {
            ...currentProgress,
            userId: user.id,
            username: user.name,
            solutionShown: currentProgress.solutionShown || false
        }

        try {
            // Use dedicated environment variable for learning platform API
            // Default to localhost for development if not set
            const apiDomain = import.meta.env.VITE_LEARNING_PLATFORM_API || 'http://localhost:8000'
            const apiUrl = `${apiDomain}/foundations/${exerciseId}`
            // Get the `cohort` cookie value
            const cohort = Cookies.get('cohort')
            payload.cohort = cohort || null

            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                console.warn(`API response not OK: ${response.status} ${response.statusText}`)
            }
        } catch (error) {
            console.error('Error sending progress to API:', error)
        }
    }

    // Utility function to hash code content for detecting meaningful changes
    const hashCode = (code) => {
        // Simple string hashing function
        let hash = 0
        if (!code || code.length === 0) return hash.toString()

        // Normalize whitespace before hashing
        const normalizedCode = code.replace(/\s+/g, ' ').trim()

        for (let i = 0; i < normalizedCode.length; i++) {
            const char = normalizedCode.charCodeAt(i)
            hash = ((hash << 5) - hash) + char
            hash = hash & hash // Convert to 32bit integer
        }
        return hash.toString()
    }

    const trackAttempt = (exerciseId, chapterTitle, code, sendToAPI = false) => {
        return setProgress(prev => {
            const exercise = prev.exercises[exerciseId] || {
                attempts: 0,
                completed: false,
                firstAttempt: null,
                lastAttempt: null,
                title: chapterTitle,
                codeHashes: [],
                solutionShown: false
            }

            // Hash the current code
            const currentHash = hashCode(code)

            // Check if this code is different from previous attempts
            const isNewCode = !exercise.codeHashes || !exercise.codeHashes.includes(currentHash)

            // Only increment attempts if code has changed
            const newAttempts = isNewCode ? exercise.attempts + 1 : exercise.attempts

            // Add hash to history if it's new
            const newCodeHashes = isNewCode
                ? [...(exercise.codeHashes || []), currentHash]
                : (exercise.codeHashes || [])

            const newState = {
                ...prev,
                exercises: {
                    ...prev.exercises,
                    [exerciseId]: {
                        ...exercise,
                        attempts: newAttempts,
                        firstAttempt: exercise.firstAttempt || new Date().toISOString(),
                        lastAttempt: new Date().toISOString(),
                        codeHashes: newCodeHashes
                    }
                },
                lastUpdated: new Date().toISOString(),
                lastUpdatedExerciseId: exerciseId,
                shouldSendToAPI: sendToAPI // Set the flag based on the parameter
            }

            return newState
        })
    }

    // Track when a solution is shown to a learner
    const trackSolutionShown = (exerciseId) => {
        setProgress(prev => {
            const exercise = prev.exercises[exerciseId] || {
                attempts: 0,
                completed: false,
                firstAttempt: null,
                lastAttempt: null,
                codeHashes: [],
                solutionShown: false
            }

            return {
                ...prev,
                exercises: {
                    ...prev.exercises,
                    [exerciseId]: {
                        ...exercise,
                        solutionShown: true,
                        lastAttempt: new Date().toISOString()
                    }
                },
                lastUpdated: new Date().toISOString(),
                lastUpdatedExerciseId: exerciseId,
                shouldSendToAPI: true // Always send solution shown events to API
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
                lastUpdated: new Date().toISOString(),
                lastUpdatedExerciseId: exerciseId, // Add this to track which exercise was completed
                shouldSendToAPI: true // Always send completion events to API
            }
        })
    }

    const getExerciseProgress = (exerciseId) => {
        return progress.exercises[exerciseId] || {
            attempts: 0,
            completed: false,
            firstAttempt: null,
            lastAttempt: null,
            codeHashes: [],
            solutionShown: false
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
        console.log('markIntroAsSeen called')
        console.log('Previous progress state:', progress)

        setProgress(prev => {
            const newState = {
                ...prev,
                hasSeenIntro: true,
                lastUpdated: new Date().toISOString(),
                // Preserve lastUpdatedExerciseId if it exists
                lastUpdatedExerciseId: prev.lastUpdatedExerciseId
            }

            console.log('New progress state:', newState)
            return newState
        })
    }

    const value = {
        progress,
        trackAttempt,
        trackCompletion,
        trackSolutionShown,
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