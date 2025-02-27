export const modulesMultipleExportsChapter = {
  id: 'modules-multiple-exports',
  title: 'Working with Multiple Exports',
  path: '/modules-multiple-exports',
  sectionId: 'modules',
  previousChapterId: 'modules-single-responsibility',
  nextChapterId: 'modules-functions',
  content: `## Different Ways to Export

Sometimes we want to share more than one or two things from a file. Let's look at different ways to do this.

### Named Exports

You can export multiple things in two ways:

\`\`\`js
// numbers.js

// Way 1: Export when you create something
export function addFive(number) {
    return number + 5
}

export function addTen(number) {
    return number + 10
}

// Way 2: Export at the bottom
function double(number) {
    return number * 2
}

function triple(number) {
    return number * 3
}

// Export multiple things at once
export {
    double,
    triple
}
\`\`\`

### Importing Multiple Things

You can import multiple things in different ways:

\`\`\`js
// Way 1: Import specific things
import { addFive, addTen } from './numbers.js'

// Way 2: Import with different names
import {
    double as multiplyByTwo,
    triple as multiplyByThree
} from './numbers.js'

// Way 3: Import everything as one object
import * as numberTools from './numbers.js'
// Use as: numberTools.addFive(10)
\`\`\`

### Simple Groups

You can group related things together:

\`\`\`js
// colors.js
export const colors = {
    red: "🔴",
    blue: "🔵",
    green: "💚"
}

export const messages = {
    error: "❌ Error",
    success: "✅ Success",
    warning: "⚠️ Warning"
}
\`\`\`

Using groups:

\`\`\`js
// app.js
import { colors, messages } from './colors.js'

console.log(colors.red)        // "🔴"
console.log(messages.success)  // "✅ Success"
\`\`\`

## Exercise: Number Tools

Create a module with different number tools and use them in different ways.`,
  exercise: {
    starterCode: {
      'numbers.js': `// Create and export:
// 1. add(a, b) - Adds two numbers
// 2. subtract(a, b) - Subtracts b from a
// 3. math object with:
//    - double(n) - Multiplies by 2
//    - half(n) - Divides by 2`,
      'main.js': `// Import the functions and math object
// Use them to:
// 1. Add 5 and 3
// 2. Double the result
// Print the answers`
    },
    solution: {
      'numbers.js': `export function add(a, b) {
    return a + b
}

export function subtract(a, b) {
    return a - b
}

export const math = {
    double: function(n) {
        return n * 2
    },
    half: function(n) {
        return n / 2
    }
}`,
      'main.js': `import { add, math } from './numbers.js'

const sum = add(5, 3)
const doubled = math.double(sum)

console.log("Sum:", sum)
console.log("Doubled:", doubled)`
    },
    tests: [
      {
        name: "Basic Functions",
        test: (files) => {
          return files['numbers.js'].includes('export function add') &&
                 files['numbers.js'].includes('export function subtract')
        },
        message: "Create and export the add and subtract functions."
      },
      {
        name: "Math Object",
        test: (files) => {
          return files['numbers.js'].includes('export const math') &&
                 files['numbers.js'].includes('double:') &&
                 files['numbers.js'].includes('half:')
        },
        message: "Create and export the math object with double and half functions."
      },
      {
        name: "Main Usage",
        test: (files) => {
          return files['main.js'].includes('import { add, math }') &&
                 files['main.js'].includes('add(5, 3)') &&
                 files['main.js'].includes('math.double')
        },
        message: "Import and use the number tools correctly."
      }
    ]
  }
}