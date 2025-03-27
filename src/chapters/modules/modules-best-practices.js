export const modulesBestPracticesChapter = {
  id: 'modules-best-practices',
  title: 'Module Best Practices',
  sectionId: 'modules',
  previousChapterId: 'modules-dependencies',
  nextChapterId: 'modules-final-project',
  content: `## Simple Rules for Good Modules

Let's look at some simple ways to write better modules.

### 1. Give Files Clear Names

❌ Bad names:
\`\`\`js
// stuff.js
export function doThing() { /* ... */ }

// x.js
export function calc() { /* ... */ }
\`\`\`

✅ Good names:
\`\`\`js
// greetings.js
export function sayHello() { /* ... */ }

// math.js
export function add() { /* ... */ }
\`\`\`

### 2. Keep Functions Simple

❌ Function doing too much:
\`\`\`js
export function handleEverything(name) {
    name = name.toUpperCase()
    name = "Mr. " + name
    console.log(name)
    return name
}
\`\`\`

✅ Simple functions:
\`\`\`js
export function makeUpperCase(name) {
    return name.toUpperCase()
}

export function addTitle(name) {
    return "Mr. " + name
}
\`\`\`

### 3. Only Export What's Needed

❌ Exporting everything:
\`\`\`js
// Don't export helper functions
export function helper1() { /* ... */ }
export function helper2() { /* ... */ }
export function mainFunction() { /* ... */ }
\`\`\`

✅ Export only what others need:
\`\`\`js
// Keep helpers private
function helper1() { /* ... */ }
function helper2() { /* ... */ }

// Only export the main function
export function mainFunction() { /* ... */ }
\`\`\`

### 4. Keep Related Code Together

❌ Mixed up code:
\`\`\`js
// random.js
export function formatDate() { /* ... */ }
export function calculateTotal() { /* ... */ }
export function sendEmail() { /* ... */ }
\`\`\`

✅ Related code together:
\`\`\`js
// dates.js
export function formatDate() { /* ... */ }

// math.js
export function calculateTotal() { /* ... */ }

// email.js
export function sendEmail() { /* ... */ }
\`\`\`

### 5. Use Simple Imports

❌ Messy imports:
\`\`\`js
import {something} from'./somewhere.js'
import{thing1,thing2,thing3}from './things.js'
\`\`\`

✅ Clean imports:
\`\`\`js
import { something } from './somewhere.js'
import {
    thing1,
    thing2,
    thing3
} from './things.js'
\`\`\`

## Exercise: Fix Bad Code

Take some messy code and make it better using these rules.`,
  exercise: {
    starterCode: {
      'stuff.js': `// This file needs to be split up!

// Math stuff
export function calc(x) {
    return x + 1
}

// Text stuff
export function text(t) {
    return t.toUpperCase()
}

// Helper (shouldn't be exported)
export function help() {
    return "helper"
}`,
      'math.js': `// Create a proper math module`,
      'text.js': `// Create a proper text module`
    },
    solution: {
      'math.js': `// Helper function - not exported
function addOne(number) {
    return number + 1
}

export function calculate(number) {
    return addOne(number)
}`,
      'text.js': `export function makeUpperCase(text) {
    return text.toUpperCase()
}`
    },
    tests: [
      {
        name: "Math Module",
        test: (files) => {
          return files['math.js'].includes('export function calculate') &&
                 !files['math.js'].includes('export function addOne')
        },
        message: "Create a math module with proper exports."
      },
      {
        name: "Text Module",
        test: (files) => {
          return files['text.js'].includes('export function makeUpperCase')
        },
        message: "Create a text module with clear function names."
      },
      {
        name: "No Helpers Exported",
        test: (files) => {
          return !files['math.js'].includes('export function help') &&
                 files['math.js'].includes('function addOne')
        },
        message: "Keep helper functions private (don't export them)."
      }
    ]
  }
}