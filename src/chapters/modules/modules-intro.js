export const modulesIntroChapter = {
  id: 'modules-intro',
  title: 'Introduction to Modules',
  sectionId: 'modules',
  previousChapterId: null,  // First chapter in the Modules section
  nextChapterId: 'modules-export-import',
  content: `## Why Split Code Into Multiple Files?

When your code gets bigger, it's helpful to split it into different files. Think of it like having different notebooks for different subjects at school, instead of writing everything in one notebook.

### The Problem with One Big File

Let's look at a simple example. Here's what happens when we put everything in one file:

\`\`\`js
// All in one file: games.js

// Score tracking
let score = 0

function addPoints(points) {
    score = score + points
}

function getScore() {
    return score
}

// Player info
let playerName = ""
let playerLevel = 1

function setPlayerName(name) {
    playerName = name
}

function getPlayerName() {
    return playerName
}

// Messages
function showWelcome() {
    return "Welcome, " + playerName + "!"
}

function showScore() {
    return "Score: " + score
}
\`\`\`

This file is:
1. Hard to read (too many things in one place)
2. Hard to fix (if something breaks, you have to look through everything)
3. Hard to share (what if another game wants to use just the score functions?)

### A Better Way: Using Modules

Instead of one big file, we can split our code into smaller files:

\`\`\`js
// score.js - Just score functions
export function addPoints(points) {
    score = score + points
}

export function getScore() {
    return score
}
\`\`\`

\`\`\`js
// player.js - Just player functions
export function setPlayerName(name) {
    playerName = name
}

export function getPlayerName() {
    return playerName
}
\`\`\`

Then we can use just what we need:

\`\`\`js
// game.js - Main game file
import { addPoints, getScore } from './score.js'
import { setPlayerName, getPlayerName } from './player.js'

// Now we can use these functions...
setPlayerName("Steve")
addPoints(10)
\`\`\`

### Benefits of Using Modules

1. **Easier to Read**: Each file does one simple thing
2. **Easier to Fix**: When something breaks, you know which file to check
3. **Easier to Share**: You can use the same code in different places

## Exercise: Your First Module

Let's create a simple score tracking system using modules. We'll split the code into two files:
1. A module for handling the score
2. A main file that uses the score module`,
  exercise: {
    starterCode: {
      'score.js': `// Create two simple functions:
// 1. addPoints(points) - Adds points to score
// 2. getScore() - Returns the current score

let score = 0

// Write your functions here and don't forget to export them!`,
      'game.js': `// Import the functions from score.js
// Then:
// 1. Add 10 points
// 2. Print the score to the console`
    },
    solution: {
      'score.js': `let score = 0

export function addPoints(points) {
    score = score + points
}

export function getScore() {
    return score
}`,
      'game.js': `import { addPoints, getScore } from './score.js'

addPoints(10)
console.log(getScore())`
    },
    tests: [
      {
        name: "Score Functions",
        test: (files) => {
          return files['score.js'].includes('export function addPoints') &&
                 files['score.js'].includes('export function getScore')
        },
        message: "Make sure to export both functions from score.js using the 'export' keyword."
      },
      {
        name: "Game Imports",
        test: (files) => {
          return files['game.js'].includes('import {') &&
                 files['game.js'].includes('addPoints') &&
                 files['game.js'].includes('getScore')
        },
        message: "Make sure to import both functions from score.js."
      },
      {
        name: "Using Functions",
        test: (files) => {
          return files['game.js'].includes('addPoints(10)') &&
                 files['game.js'].includes('getScore()')
        },
        message: "Add 10 points and then show the score."
      }
    ]
  }
}