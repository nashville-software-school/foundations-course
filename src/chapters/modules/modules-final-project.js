export const modulesFinalProjectChapter = {
  id: 'modules-final-project',
  title: 'Final Project: Emoji Sticker Maker',
  sectionId: 'modules',
  previousChapterId: 'modules-best-practices',
  nextChapterId: null,
  content: `## Building an Emoji Sticker Maker

Let's use everything we've learned to build a simple emoji sticker maker! This project will help you:

1. Organize code into simple modules
2. Use imports and exports
3. Keep functions simple
4. Work with basic data

### Project Overview

We'll create a program that:
- Stores emoji data
- Creates stickers with emojis
- Adds borders and effects
- Makes messages with stickers

### Project Structure

Your files should be organized like this:

\`\`\`
📁 sticker-maker/
  📄 emojis.js        (emoji data)
  📄 borders.js       (border styles)
  📄 effects.js       (simple effects)
  📄 sticker.js       (sticker creation)
  📄 main.js          (main program)
\`\`\`

### Features to Build

1. **Emoji Data**
   - List of emojis
   - Get random emoji
   - Get emoji by type

2. **Border Styles**
   - Add stars border
   - Add hearts border
   - Add dots border

3. **Simple Effects**
   - Make bigger
   - Make smaller
   - Add sparkles

4. **Sticker Creation**
   - Create basic sticker
   - Add border
   - Add effect

## Exercise: Emoji Sticker Maker

Build the sticker maker by completing each module.`,
  exercise: {
    starterCode: {
      'emojis.js': `// Create and export:
// 1. List of emojis (animals, foods, faces)
// 2. getRandomEmoji() function
// 3. getEmojisByType(type) function`,
      'borders.js': `// Create and export:
// 1. addStarBorder(text) - Adds ⭐ around text
// 2. addHeartBorder(text) - Adds ❤️ around text`,
      'effects.js': `// Create and export:
// 1. makeBigger(emoji) - Adds ⬆️ before emoji
// 2. addSparkle(emoji) - Adds ✨ after emoji`,
      'sticker.js': `// Import what you need
// Create makeSticker(emoji, border, effect) function
// Returns decorated emoji`,
      'main.js': `// Import everything you need
// 1. Get a random emoji
// 2. Add a star border
// 3. Add sparkles
// 4. Print the result`
    },
    solution: {
      'emojis.js': `export const emojis = {
    animals: ["🐶", "🐱", "🐰"],
    foods: ["🍎", "🍕", "🍦"],
    faces: ["😊", "😎", "🤠"]
}

export function getRandomEmoji() {
    const types = Object.keys(emojis)
    const type = types[Math.floor(Math.random() * types.length)]
    const list = emojis[type]
    return list[Math.floor(Math.random() * list.length)]
}

export function getEmojisByType(type) {
    return emojis[type] || []
}`,
      'borders.js': `export function addStarBorder(text) {
    return "⭐ " + text + " ⭐"
}

export function addHeartBorder(text) {
    return "❤️ " + text + " ❤️"
}`,
      'effects.js': `export function makeBigger(emoji) {
    return "⬆️ " + emoji
}

export function addSparkle(emoji) {
    return emoji + " ✨"
}`,
      'sticker.js': `import { addStarBorder, addHeartBorder } from './borders.js'
import { makeBigger, addSparkle } from './effects.js'

export function makeSticker(emoji, border, effect) {
    let sticker = emoji

    if (effect === "bigger") {
        sticker = makeBigger(sticker)
    }
    if (effect === "sparkle") {
        sticker = addSparkle(sticker)
    }

    if (border === "stars") {
        sticker = addStarBorder(sticker)
    }
    if (border === "hearts") {
        sticker = addHeartBorder(sticker)
    }

    return sticker
}`,
      'main.js': `import { getRandomEmoji } from './emojis.js'
import { makeSticker } from './sticker.js'

const emoji = getRandomEmoji()
const sticker = makeSticker(emoji, "stars", "sparkle")

console.log("Your sticker:", sticker)`
    },
    tests: [
      {
        name: "Emoji Data",
        test: (files) => {
          return files['emojis.js'].includes('export const emojis') &&
                 files['emojis.js'].includes('export function getRandomEmoji') &&
                 files['emojis.js'].includes('export function getEmojisByType')
        },
        message: "Create emoji data and functions to work with it."
      },
      {
        name: "Border Functions",
        test: (files) => {
          return files['borders.js'].includes('export function addStarBorder') &&
                 files['borders.js'].includes('export function addHeartBorder')
        },
        message: "Create functions for adding borders."
      },
      {
        name: "Effect Functions",
        test: (files) => {
          return files['effects.js'].includes('export function makeBigger') &&
                 files['effects.js'].includes('export function addSparkle')
        },
        message: "Create functions for adding effects."
      },
      {
        name: "Sticker Creation",
        test: (files) => {
          return files['sticker.js'].includes('import {') &&
                 files['sticker.js'].includes('export function makeSticker')
        },
        message: "Create sticker function that uses borders and effects."
      },
      {
        name: "Main Program",
        test: (files) => {
          return files['main.js'].includes('import { getRandomEmoji }') &&
                 files['main.js'].includes('import { makeSticker }') &&
                 files['main.js'].includes('console.log')
        },
        message: "Create main program that makes a sticker."
      }
    ]
  }
}