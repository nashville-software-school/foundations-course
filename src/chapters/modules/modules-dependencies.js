export const modulesDependenciesChapter = {
  id: 'modules-dependencies',
  title: 'Module Dependencies',
  sectionId: 'modules',
  previousChapterId: 'modules-organization',
  nextChapterId: 'modules-best-practices',
  content: `## Understanding Dependencies

When one file needs another file to work, we call that a dependency. Let's see how this works with simple examples.

### Simple Dependencies

When one function needs another:

\`\`\`js
// decorations.js
export function addStars(text) {
    return "⭐ " + text + " ⭐"
}

export function addHearts(text) {
    return "❤️ " + text + " ❤️"
}
\`\`\`

\`\`\`js
// greetings.js
import { addStars } from './decorations.js'

export function makeGreeting(name) {
    const message = "Hello, " + name
    return addStars(message)  // Uses addStars from decorations.js
}
\`\`\`

Here, \`greetings.js\` depends on \`decorations.js\` because it needs the \`addStars\` function.

### Dependency Chain

Files can form a chain of dependencies:

\`\`\`js
// card.js
import { makeGreeting } from './greetings.js'

export function createCard(name) {
    const greeting = makeGreeting(name)
    return {
        message: greeting,
        date: "Today"
    }
}
\`\`\`

The chain is:
\`card.js\` → \`greetings.js\` → \`decorations.js\`

### Avoiding Circular Dependencies

Don't let files depend on each other in a circle:

❌ Bad:
\`\`\`js
// a.js
import { getB } from './b.js'
export function getA() {
    return getB()  // Uses B
}

// b.js
import { getA } from './a.js'
export function getB() {
    return getA()  // Uses A - This creates a circle!
}
\`\`\`

✅ Good:
\`\`\`js
// helpers.js
export function getMessage() {
    return "Hello!"
}

// a.js
import { getMessage } from './helpers.js'
export function getA() {
    return getMessage()
}

// b.js
import { getMessage } from './helpers.js'
export function getB() {
    return getMessage()
}
\`\`\`

## Exercise: Greeting Card Maker

Create a simple greeting card system where files work together.`,
  exercise: {
    starterCode: {
      'decorations.js': `// Create two functions:
// 1. addEmoji(text, emoji) - Adds emoji before and after text
// 2. makeUpperCase(text) - Makes text all caps`,
      'message.js': `// Import decoration functions
// Create makeMessage(name) that:
// 1. Makes text uppercase
// 2. Adds "👋" emoji
// Example: "👋 HELLO BOB 👋"`,
      'card.js': `// Import message function
// Create createCard(name) that returns:
// { greeting: (the message), from: "Your friend" }`
    },
    solution: {
      'decorations.js': `export function addEmoji(text, emoji) {
    return emoji + " " + text + " " + emoji
}

export function makeUpperCase(text) {
    return text.toUpperCase()
}`,
      'message.js': `import { addEmoji, makeUpperCase } from './decorations.js'

export function makeMessage(name) {
    const text = "Hello " + name
    const upper = makeUpperCase(text)
    return addEmoji(upper, "👋")
}`,
      'card.js': `import { makeMessage } from './message.js'

export function createCard(name) {
    return {
        greeting: makeMessage(name),
        from: "Your friend"
    }
}`
    },
    tests: [
      {
        name: "Decoration Functions",
        test: (files) => {
          return files['decorations.js'].includes('export function addEmoji') &&
                 files['decorations.js'].includes('export function makeUpperCase')
        },
        message: "Create and export both decoration functions."
      },
      {
        name: "Message Function",
        test: (files) => {
          return files['message.js'].includes('import { addEmoji, makeUpperCase }') &&
                 files['message.js'].includes('export function makeMessage')
        },
        message: "Import decorations and create message function."
      },
      {
        name: "Card Creation",
        test: (files) => {
          return files['card.js'].includes('import { makeMessage }') &&
                 files['card.js'].includes('export function createCard') &&
                 files['card.js'].includes('greeting:') &&
                 files['card.js'].includes('from:')
        },
        message: "Create card function that uses message function."
      }
    ]
  }
}