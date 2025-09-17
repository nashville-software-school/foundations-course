/**
 * Testing script for keyboard shortcuts prerequisite system
 * Session 4: Testing & Validation - Tasks 24-30
 */

// Test utilities for prerequisite system validation
export const testUtils = {
  // Clear all progress data for testing
  clearProgress: () => {
    localStorage.removeItem('learner-progress')
    localStorage.removeItem('chapter-context')
    console.log('✅ Progress data cleared')
  },

  // Set getting-started completion to specific percentage
  setGettingStartedProgress: (percentage) => {
    const gettingStartedChapters = [
      'github-account',
      'slack-installation',
      'visual-studio-code',
      'anthropic-account'
    ]

    const totalChapters = gettingStartedChapters.length
    const completedCount = Math.floor((percentage / 100) * totalChapters)

    const progressData = {}

    // Mark chapters as completed based on percentage
    gettingStartedChapters.forEach((chapterId, index) => {
      if (index < completedCount) {
        progressData[chapterId] = {
          completed: true,
          attempts: 1,
          completedAt: new Date().toISOString()
        }
      }
    })

    localStorage.setItem('learner-progress', JSON.stringify(progressData))
    console.log(`✅ Getting Started progress set to ${percentage}% (${completedCount}/${totalChapters} chapters)`)

    // Force page reload to update UI
    window.location.reload()
  },

  // Get current getting-started progress
  getGettingStartedProgress: () => {
    const progressData = JSON.parse(localStorage.getItem('learner-progress') || '{}')
    const gettingStartedChapters = [
      'github-account',
      'slack-installation',
      'visual-studio-code',
      'anthropic-account'
    ]

    const completed = gettingStartedChapters.filter(id => progressData[id]?.completed).length
    const total = gettingStartedChapters.length
    const percentage = Math.round((completed / total) * 100)

    return { completed, total, percentage }
  },

  // Test keyboard shortcuts lock status
  testKeyboardShortcutsLockStatus: () => {
    const keyboardChapters = document.querySelectorAll('[href*="shortcuts-"]')
    const results = {
      totalChapters: keyboardChapters.length,
      lockedChapters: 0,
      unlockedChapters: 0,
      prerequisiteIcons: 0,
      authIcons: 0
    }

    keyboardChapters.forEach(chapter => {
      const isPrerequisiteLocked = chapter.classList.contains('prerequisite-locked')
      const isAuthProtected = chapter.classList.contains('protected')
      const hasPrerequisiteIcon = chapter.querySelector('.lock-icon[aria-label="Prerequisites required"]')
      const hasAuthIcon = chapter.querySelector('.lock-icon[aria-label="Protected content"]')

      if (isPrerequisiteLocked) results.lockedChapters++
      else results.unlockedChapters++

      if (hasPrerequisiteIcon) results.prerequisiteIcons++
      if (hasAuthIcon) results.authIcons++
    })

    return results
  },

  // Test section positioning
  testSectionPositioning: () => {
    const sections = document.querySelectorAll('.section')
    const sectionTitles = Array.from(sections).map(section => {
      const header = section.querySelector('h3')
      return header ? header.textContent.trim() : 'Unknown'
    })

    const keyboardShortcutsIndex = sectionTitles.indexOf('Keyboard Shortcuts')

    return {
      allSections: sectionTitles,
      keyboardShortcutsPosition: keyboardShortcutsIndex + 1, // 1-based
      isSecondSection: keyboardShortcutsIndex === 1
    }
  },

  // Test visual indicators
  testVisualIndicators: () => {
    const results = {
      prerequisiteIconsFound: 0,
      authIconsFound: 0,
      prerequisiteStyledChapters: 0,
      authStyledChapters: 0
    }

    // Count 🤔 icons (prerequisite)
    const prerequisiteIcons = document.querySelectorAll('.lock-icon[aria-label="Prerequisites required"]')
    results.prerequisiteIconsFound = prerequisiteIcons.length

    // Count 🔒 icons (auth)
    const authIcons = document.querySelectorAll('.lock-icon[aria-label="Protected content"]')
    results.authIconsFound = authIcons.length

    // Count styled chapters
    results.prerequisiteStyledChapters = document.querySelectorAll('.prerequisite-locked').length
    results.authStyledChapters = document.querySelectorAll('.protected').length

    return results
  },

  // Run comprehensive test suite
  runTestSuite: () => {
    console.log('🧪 Running Keyboard Shortcuts Test Suite...\n')

    // Test 1: Section Positioning
    console.log('📍 Task 24: Section Positioning')
    const positioning = testUtils.testSectionPositioning()
    console.log('Sections found:', positioning.allSections)
    console.log('Keyboard Shortcuts position:', positioning.keyboardShortcutsPosition)
    console.log('Is second section:', positioning.isSecondSection ? '✅' : '❌')
    console.log('')

    // Test 2: Chapter Structure
    console.log('📚 Task 25: Chapter Structure')
    const keyboardChapters = document.querySelectorAll('[href*="shortcuts-"]')
    console.log('Keyboard shortcut chapters found:', keyboardChapters.length)
    console.log('Expected: 3 chapters')
    console.log('Chapter structure test:', keyboardChapters.length === 3 ? '✅' : '❌')
    console.log('')

    // Test 3: Access Control
    console.log('🔐 Task 26: Access Control')
    const gettingStartedProgress = testUtils.getGettingStartedProgress()
    const lockStatus = testUtils.testKeyboardShortcutsLockStatus()
    console.log('Getting Started progress:', `${gettingStartedProgress.percentage}%`)
    console.log('Locked keyboard chapters:', lockStatus.lockedChapters)
    console.log('Unlocked keyboard chapters:', lockStatus.unlockedChapters)
    console.log('')

    // Test 4: Visual Indicators
    console.log('👁️ Task 27: Visual Indicators')
    const visual = testUtils.testVisualIndicators()
    console.log('🤔 icons (prerequisite):', visual.prerequisiteIconsFound)
    console.log('🔒 icons (auth):', visual.authIconsFound)
    console.log('Prerequisite-styled chapters:', visual.prerequisiteStyledChapters)
    console.log('Auth-styled chapters:', visual.authStyledChapters)
    console.log('')

    console.log('🧪 Test Suite Complete!')

    return {
      positioning,
      lockStatus,
      gettingStartedProgress,
      visual
    }
  }
}

// Make available globally for browser console testing
if (typeof window !== 'undefined') {
  window.testUtils = testUtils
}

console.log('🧪 Test utilities loaded. Use testUtils.runTestSuite() to run all tests.')