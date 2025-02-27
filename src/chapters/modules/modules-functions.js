export const modulesFunctionsChapter = {
  id: 'modules-functions',
  title: 'Modules and Functions',
  path: '/modules-functions',
  sectionId: 'modules',
  previousChapterId: 'modules-multiple-exports',
  nextChapterId: 'modules-data',
  content: `## Functions in Modules

When we put functions in modules, we want to keep them simple and focused. Let's look at how to organize simple functions in modules.

### Simple Function Groups

Think about functions that work together:

\`\`\`js
// names.js
export function getFirstName(fullName) {
    return fullName.split(" ")[0]
}

export function getLastName(fullName) {
    return fullName.split(" ")[1]
}
\`\`\`

### Helper Functions

Some functions are just helpers for other functions. We don't need to export these:

\`\`\`js
// greetings.js

// Helper function - not exported
function addExclamation(text) {
    return text + "!"
}

// Main function that we export
export function makeGreeting(name) {
    const greeting = "Hello, " + name
    return addExclamation(greeting)
}
\`\`\`

### Using Functions Together

Here's how to use these functions:

\`\`\`js
// app.js
import { getFirstName } from './names.js'
import { makeGreeting } from './greetings.js'

const firstName = getFirstName("John Smith")
const greeting = makeGreeting(firstName)

console.log(greeting)  // "Hello, John!"
\`\`\`

### Tips for Functions

1. Keep functions simple
2. Each function should do one thing
3. Only export the functions that other files need

## Exercise: Name Formatter

Create modules with simple functions that work with names.`,
  exercise: {
    starterCode: {
      'names.js': `// Create two functions:
// 1. makeUpperCase(name) - Makes name all caps
// 2. makeLowerCase(name) - Makes name all lowercase`,
      'format.js': `// Create one function:
// addTitle(name) - Adds "Mr." before the name`,
      'main.js': `// Import the functions
// Format the name "bob smith" to be:
// 1. Uppercase
// 2. Add title
// Print the result`
    },
    solution: {
      'names.js': `export function makeUpperCase(name) {
    return name.toUpperCase()
}

export function makeLowerCase(name) {
    return name.toLowerCase()
}`,
      'format.js': `export function addTitle(name) {
    return "Mr. " + name
}`,
      'main.js': `import { makeUpperCase } from './names.js'
import { addTitle } from './format.js'

const name = "bob smith"
const upperName = makeUpperCase(name)
const titled = addTitle(upperName)

console.log(titled)  // "Mr. BOB SMITH"`
    },
    tests: [
      {
        name: "Name Functions",
        test: (files) => {
          return files['names.js'].includes('export function makeUpperCase') &&
                 files['names.js'].includes('export function makeLowerCase')
        },
        message: "Create and export both name functions."
      },
      {
        name: "Format Function",
        test: (files) => {
          return files['format.js'].includes('export function addTitle')
        },
        message: "Create and export the title function."
      },
      {
        name: "Main Usage",
        test: (files) => {
          return files['main.js'].includes('import { makeUpperCase }') &&
                 files['main.js'].includes('import { addTitle }') &&
                 files['main.js'].includes('console.log')
        },
        message: "Import and use the functions to format the name."
      }
    ]
  }
}