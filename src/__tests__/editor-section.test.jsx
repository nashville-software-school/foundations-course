/**
 * Regression test for the coding window (editorSection).
 *
 * Bug: chapters defined with  exercise: {}  (singular object) instead of
 *      exercises: [{}]  (array) caused the editor section to silently not
 *      render, because nss-core checks  exercises && exercises.length > 0.
 *
 * Two suites:
 *  1. Real pages  — renders Course with the actual project chapters so a
 *     broken chapter data shape is caught against real content.
 *  2. Regression guard — synthetic chapter that deliberately uses the buggy
 *     shape to prove the "absent editor" path is tested.
 */
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Course } from '@nss-workshops/nss-core'
import { chapters } from '../chapters/index.js'
import { sections } from '../sections/index.js'

// Monaco Editor requires browser APIs not available in jsdom.
vi.mock('@monaco-editor/react', () => ({
  default: ({ value, onChange }) => (
    <textarea
      data-testid="monaco-editor"
      defaultValue={value}
      onChange={e => onChange?.(e.target.value)}
    />
  )
}))

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const CHAPTER_ID = 'test-chapter'

const chapterWithExercises = {
  id: CHAPTER_ID,
  title: 'Test Chapter',
  sectionId: 'test-section',
  requiresAuth: false,
  content: '# Test',
  exercises: [
    {
      starterCode: 'console.log("hello")',
      tests: [
        {
          name: 'always passes',
          test: () => ({ passed: true }),
          message: 'should pass'
        }
      ]
    }
  ]
}

const testConfig = {
  courseName: 'Test Course',
  doAuth: false,
  baseUrl: '/',
  learningPlatformApi: 'http://localhost/api'
}

const testNav = [{ id: 'test-section', title: 'Test Section' }]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderCourse(chapter) {
  return render(
    <Course
      chapters={[chapter]}
      config={testConfig}
      nav={testNav}
    />
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isHtmlCssExercise(exercise) {
  if (!exercise?.starterCode) return false
  if (typeof exercise.starterCode === 'object') {
    return Object.keys(exercise.starterCode).some(
      k => k.endsWith('.html') || k.endsWith('.css')
    )
  }
  return false
}

// ---------------------------------------------------------------------------
// Tests — real chapter data
// ---------------------------------------------------------------------------

// Strip requiresAuth so ProtectedRoute doesn't redirect to /login in tests.
// (doAuth: false in config skips the auth UI but the per-chapter flag is
// checked independently inside nss-core before wrapping with ProtectedRoute.)
const chaptersNoAuth = chapters.map(ch => ({ ...ch, requiresAuth: false }))

describe('Real chapter pages — coding window renders', () => {
  const chaptersWithExercises = chaptersNoAuth.filter(
    ch => Array.isArray(ch.exercises) && ch.exercises.length > 0
  )

  afterEach(() => {
    window.history.pushState({}, '', '/')
  })

  it.each(chaptersWithExercises)(
    'chapter "$id" shows Reset and Copy (editor is present)',
    async ({ id, exercises }) => {
      window.history.pushState({}, '', `/${id}`)

      const { unmount } = render(
        <Course chapters={chaptersNoAuth} config={testConfig} nav={sections} />
      )

      // Reset and Copy are always rendered when the editor section exists.
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
      })
      expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()

      // Run Code is present for all non-HTML/CSS exercises.
      if (!isHtmlCssExercise(exercises[0])) {
        expect(screen.getByRole('button', { name: 'Run Code' })).toBeInTheDocument()
      }

      // Run Tests is present when the exercise declares tests.
      if (exercises[0]?.tests?.length > 0) {
        expect(screen.getByRole('button', { name: 'Run Tests' })).toBeInTheDocument()
      }

      unmount()
    }
  )
})

// ---------------------------------------------------------------------------
// Tests — starter code fails, solution passes
// ---------------------------------------------------------------------------
// Calls chapter test functions directly with (starterCode) and (solution).
// No UI rendering needed: test functions accept a plain code string and return
// { passed: boolean }.  A try-catch wrapper handles chapters whose test
// functions use `new Function(code)` on intentionally-incomplete starter code
// (which throws SyntaxError) — that counts as "not passing", which is correct.

describe('Real chapter pages — starter code fails, solution passes all tests', () => {
  const chaptersWithTests = chaptersNoAuth.filter(
    ch =>
      Array.isArray(ch.exercises) &&
      ch.exercises.length > 0 &&
      ch.exercises[0].tests?.length > 0 &&
      typeof ch.exercises[0].starterCode === 'string' &&
      typeof ch.exercises[0].solution === 'string'
  )

  it.each(chaptersWithTests)(
    'chapter "$id" — starter code fails, solution passes',
    ({ id, exercises }) => {
      const { starterCode, solution, tests } = exercises[0]

      const runTests = (code) =>
        tests.map(t => {
          try {
            const r = t.test(code)
            // Some older tests return a plain boolean instead of {passed: boolean}
            return typeof r === 'boolean' ? { passed: r } : r
          } catch {
            return { passed: false }
          }
        })

      const starterResults = runTests(starterCode)
      expect(
        starterResults.every(r => r?.passed),
        `Chapter "${id}": starter code should fail at least one test`
      ).toBe(false)

      const solutionResults = runTests(solution)
      expect(
        solutionResults.every(r => r?.passed),
        `Chapter "${id}": solution should pass all tests`
      ).toBe(true)
    }
  )
})

// ---------------------------------------------------------------------------
// Tests — regression guard (synthetic data)
// ---------------------------------------------------------------------------

describe('Coding window (editorSection) regression', () => {
  beforeEach(() => {
    // Point jsdom at the chapter URL so the :chapterId route matches.
    window.history.pushState({}, '', `/${CHAPTER_ID}`)
  })

  afterEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('renders Run Code, Run Tests, Reset and Copy when exercises is an array', async () => {
    renderCourse(chapterWithExercises)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Run Code' })).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: 'Run Tests' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
  })

  it('does NOT render the coding window when exercises is an object instead of an array', async () => {
    const brokenChapter = {
      ...chapterWithExercises,
      // This is the bug: exercises should be an array, not a plain object.
      exercises: { starterCode: 'console.log("hello")' }
    }

    renderCourse(brokenChapter)

    // Wait for the chapter heading to confirm the component has rendered.
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Test Chapter', level: 1 })).toBeInTheDocument()
    })

    // The coding window must NOT appear.
    expect(screen.queryByRole('button', { name: 'Run Code' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument()
  })
})
