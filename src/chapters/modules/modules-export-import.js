export const modulesExportImportChapter = {
  id: 'modules-export-import',
  title: 'Basic Export/Import Syntax',
  path: '/modules-export-import',
  sectionId: 'modules',
  previousChapterId: 'modules-intro',
  nextChapterId: 'modules-single-responsibility',
  content: `## Understanding Export and Import

When we split our code into different files, we need a way to share code between files. That's what \`export\` and \`import\` do.

### Exporting Code

To share code from a file, we use the \`export\` keyword. There are two simple ways to do this:

1. Export individual functions (named exports)
2. Export one main thing (default export)

Let's look at both:

\`\`\`js
// greetings.js - Named exports
export function sayHello(name) {
    return "Hello, " + name
}

export function sayGoodbye(name) {
    return "Goodbye, " + name
}
\`\`\`

\`\`\`js
// math.js - Default export
function add(a, b) {
    return a + b
}

// Only one default export per file
export default add
\`\`\`

### Importing Code

To use code from another file, we use the \`import\` keyword:

\`\`\`js
// app.js
// Import named exports - use curly braces
import { sayHello, sayGoodbye } from './greetings.js'

// Import default export - no curly braces needed
import add from './math.js'

// Now we can use these functions
console.log(sayHello("Bob"))    // "Hello, Bob"
console.log(add(5, 3))         // 8
\`\`\`

### Simple Example

Let's see how this works with a simple colors example:

\`\`\`js
// colors.js
export function makeRed(text) {
    return "🔴 " + text
}

export function makeBlue(text) {
    return "🔵 " + text
}
\`\`\`

\`\`\`js
// message.js
import { makeRed, makeBlue } from './colors.js'

const redMessage = makeRed("Stop")
const blueMessage = makeBlue("Go")

console.log(redMessage)    // "🔴 Stop"
console.log(blueMessage)   // "🔵 Go"
\`\`\`

## Exercise: Text Decorators

Create simple functions that decorate text with emojis. Split the code into two files:
1. A module with text decorator functions
2. A main file that uses these decorators`,
  exercise: {
    starterCode: {
      'decorators.js': `// Create and export two functions:
// 1. addStar(text) - Adds ⭐ before the text
// 2. addHeart(text) - Adds ❤️ before the text`,
      'main.js': `// Import the decorator functions
// Use them to put the correct message into the variables below

const starMessage =
const lovedMessage =
`
    },
    solution: {
      'decorators.js': `export function addStar(text) {
    return "⭐ " + text
}

export function addHeart(text) {
    return "❤️ " + text
}
`,
      'main.js': `import { addStar, addHeart } from './decorators.js'

const starMessage = addStar("Great job!")
const lovedMessage = addHeart("Thank you!")
`
    },
    tests: [
      {
        name: "Decorator Exports",
        test: (files) => {
          return files['decorators.js'].includes('export function addStar') &&
                 files['decorators.js'].includes('export function addHeart') &&
                 files['decorators.js'].includes('return') &&
                 files['decorators.js'].includes('export function addHeart')
        },
        message: "Make sure to export both decorator functions."
      },
      {
        name: "String Returns",
        test: (files) => {
          return files['decorators.js'].includes('return "⭐ ') &&
                 files['decorators.js'].includes('return "❤️ ')
        },
        message: "Make sure to return the modified string from each function."
      },
      {
        name: "Main Imports",
        test: (files) => {
          return files['main.js'].includes('import {') &&
                 files['main.js'].includes('decorator.js') &&
                 files['main.js'].includes('addStar') &&
                 files['main.js'].includes('addHeart')
        },
        message: "Import both decorator functions in main.js"
      },
      {
        name: "Using Decorators",
        test: (files) => {
          const start = files['main.js'].indexOf('const star')
          const codeToTest1 = files['decorators.js'].replace(/export/g, '')
          const codeToTest2 = files['main.js'].slice(start)
          const {starMessage, lovedMessage} = new Function(codeToTest1 + codeToTest2 + '\n return { starMessage, lovedMessage }')()
          return starMessage?.includes('⭐') && lovedMessage?.includes('❤️') && starMessage?.length > 2 && lovedMessage?.length > 2
        },
        message: "Create and print two decorated messages."
      }
    ]
  }
}