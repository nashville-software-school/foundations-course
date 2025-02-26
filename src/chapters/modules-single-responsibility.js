export const modulesSingleResponsibilityChapter = {
  id: 'modules-single-responsibility',
  title: 'Single Responsibility',
  sectionId: 'modules',
  previousChapterId: 'modules-export-import',
  nextChapterId: 'modules-multiple-exports',
  content: `## What is Single Responsibility?

Each file should do one simple thing. Think about your room:
- Your closet is for clothes
- Your bookshelf is for books
- Your toy box is for toys

Each has one job. Our code should work the same way!

### A File That Does Too Much

Here's a file that's trying to do too many things:

\`\`\`js
// messyCounter.js
let count = 0

// Counting
function addOne() {
    count = count + 1
}

function subtractOne() {
    count = count - 1
}

// Messages
function getCountMessage() {
    return "Count is: " + count
}

function getDoubleMessage() {
    return "Double is: " + (count * 2)
}

// Saving
function saveCount() {
    localStorage.setItem('count', count)
}

function loadCount() {
    count = localStorage.getItem('count')
}
\`\`\`

This file is doing three different things:
1. Counting numbers
2. Creating messages
3. Saving data

### Better Organization

Let's split it into files that each do one thing:

\`\`\`js
// counter.js - Just counts numbers
let count = 0

export function addOne() {
    count = count + 1
}

export function getCount() {
    return count
}
\`\`\`

\`\`\`js
// messages.js - Just creates messages
export function makeCountMessage(number) {
    return "Count is: " + number
}

export function makeDoubleMessage(number) {
    return "Double is: " + (number * 2)
}
\`\`\`

Now each file has one simple job! We can use them together:

\`\`\`js
// app.js
import { addOne, getCount } from './counter.js'
import { makeCountMessage } from './messages.js'

addOne()
const message = makeCountMessage(getCount())
console.log(message)  // "Count is: 1"
\`\`\`

### Benefits

1. **Simpler Code**: Each file does one thing
2. **Easier to Understand**: You know exactly what each file is for
3. **Easier to Fix**: If something breaks, you know where to look

## Exercise: Animal Sounds

Let's organize some animal sound code. Split this into two simple modules:
1. One for animal sounds
2. One for creating messages`,
  exercise: {
    starterCode: {
      'sounds.js': `// Create two functions:
// 1. getDogSound() - Returns "Woof!"
// 2. getCatSound() - Returns "Meow!"`,
      'messages.js': `// Create one function:
// makeAnimalMessage(animal, sound)
// Example: makeAnimalMessage("dog", "Woof!") returns "The dog says: Woof!"`,
      'main.js': `// Import the functions
// Make messages for both dog and cat sounds
// Print them to the console`
    },
    solution: {
      'sounds.js': `export function getDogSound() {
    return "Woof!"
}

export function getCatSound() {
    return "Meow!"
}`,
      'messages.js': `export function makeAnimalMessage(animal, sound) {
    return "The " + animal + " says: " + sound
}`,
      'main.js': `import { getDogSound, getCatSound } from './sounds.js'
import { makeAnimalMessage } from './messages.js'

const dogMessage = makeAnimalMessage("dog", getDogSound())
const catMessage = makeAnimalMessage("cat", getCatSound())

console.log(dogMessage)
console.log(catMessage)`
    },
    tests: [
      {
        name: "Sound Functions",
        test: (files) => {
          return files['sounds.js'].includes('export function getDogSound') &&
                 files['sounds.js'].includes('export function getCatSound')
        },
        message: "Create and export both sound functions."
      },
      {
        name: "Message Function",
        test: (files) => {
          return files['messages.js'].includes('export function makeAnimalMessage')
        },
        message: "Create and export the message function."
      },
      {
        name: "Main Integration",
        test: (files) => {
          return files['main.js'].includes('import { getDogSound, getCatSound }') &&
                 files['main.js'].includes('import { makeAnimalMessage }') &&
                 files['main.js'].includes('console.log')
        },
        message: "Import and use both modules to create animal messages."
      }
    ]
  }
}