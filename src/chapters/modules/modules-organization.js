export const modulesOrganizationChapter = {
  id: 'modules-organization',
  title: 'Module Organization',
  sectionId: 'modules',
  previousChapterId: 'modules-data',
  nextChapterId: 'modules-dependencies',
  content: `## Organizing Your Files

When you have several files, it's helpful to organize them into folders. Think of it like organizing your school notebooks into different subjects.

### Simple Folder Structure

Here's a simple way to organize calculator files:

\`\`\`
📁 calculator/
  📁 math/
    📄 add.js        (addition functions)
    📄 subtract.js   (subtraction functions)
    📄 index.js      (collects all math functions)

  📁 display/
    📄 format.js     (formats numbers)
    📄 messages.js   (creates messages)
    📄 index.js      (collects all display functions)
\`\`\`

### Simple Files

Let's look at what goes in each file:

\`\`\`js
// math/add.js
export function add(a, b) {
    return a + b
}
\`\`\`

\`\`\`js
// math/subtract.js
export function subtract(a, b) {
    return a - b
}
\`\`\`

\`\`\`js
// display/format.js
export function formatNumber(number) {
    return "Number: " + number
}
\`\`\`

\`\`\`js
// display/messages.js
export function makeMessage(result) {
    return "The answer is: " + result
}
\`\`\`

### Using Index Files

Index files make importing easier. They collect exports from other files:

\`\`\`js
// math/index.js
export { add } from './add.js'
export { subtract } from './subtract.js'
\`\`\`

\`\`\`js
// display/index.js
export { formatNumber } from './format.js'
export { makeMessage } from './messages.js'
\`\`\`

Now we can import everything more easily:

\`\`\`js
// calculator.js
import { add, subtract } from './math/index.js'
import { formatNumber, makeMessage } from './display/index.js'

const result = add(5, 3)
console.log(makeMessage(result))
\`\`\`

## Exercise: Simple Calculator

Create a simple calculator with organized files.`,
  exercise: {
    starterCode: {
      'math/add.js': `// Create and export:
// add(a, b) - Adds two numbers`,
      'math/multiply.js': `// Create and export:
// multiply(a, b) - Multiplies two numbers`,
      'math/index.js': `// Export both math functions`,
      'display/message.js': `// Create and export:
// showResult(number) - Returns "Result: [number]"`,
      'main.js': `// Import the functions
// Add 5 and 3, then multiply by 2
// Show the result`
    },
    solution: {
      'math/add.js': `export function add(a, b) {
    return a + b
}`,
      'math/multiply.js': `export function multiply(a, b) {
    return a * b
}`,
      'math/index.js': `export { add } from './add.js'
export { multiply } from './multiply.js'`,
      'display/message.js': `export function showResult(number) {
    return "Result: " + number
}`,
      'main.js': `import { add, multiply } from './math/index.js'
import { showResult } from './display/message.js'

const sum = add(5, 3)
const result = multiply(sum, 2)
console.log(showResult(result))`
    },
    tests: [
      {
        name: "Math Functions",
        test: (files) => {
          return files['math/add.js'].includes('export function add') &&
                 files['math/multiply.js'].includes('export function multiply')
        },
        message: "Create and export both math functions."
      },
      {
        name: "Math Index",
        test: (files) => {
          return files['math/index.js'].includes('export { add }') &&
                 files['math/index.js'].includes('export { multiply }')
        },
        message: "Export both functions in the math index file."
      },
      {
        name: "Display Function",
        test: (files) => {
          return files['display/message.js'].includes('export function showResult')
        },
        message: "Create and export the display function."
      },
      {
        name: "Main Usage",
        test: (files) => {
          return files['main.js'].includes('import { add, multiply }') &&
                 files['main.js'].includes('import { showResult }') &&
                 files['main.js'].includes('console.log')
        },
        message: "Import and use the functions correctly."
      }
    ]
  }
}