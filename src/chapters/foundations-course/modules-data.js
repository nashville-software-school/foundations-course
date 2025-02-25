export const modulesDataChapter = {
  id: 'modules-data',
  title: 'Modules and Data',
  path: '/foundations-course/modules-data',
  sectionId: 'modules',
  previousChapterId: 'modules-functions',
  nextChapterId: 'modules-organization',
  content: `## Storing Data in Modules

Sometimes we want to store data (like lists or information) in our modules. Let's see how to do this simply.

### Sharing Simple Lists

We can store and share lists:

\`\`\`js
// favorites.js - Just stores data
export const colors = [
    "red",
    "blue",
    "green"
]

export const animals = [
    "dog",
    "cat",
    "rabbit"
]
\`\`\`

### Sharing Simple Information

We can also store and share information about things:

\`\`\`js
// foods.js - Just stores data
export const fruits = {
    apple: "🍎",
    banana: "🍌",
    orange: "🍊"
}

export const drinks = {
    water: "💧",
    juice: "🧃",
    soda: "🥤"
}
\`\`\`

### Using the Data

Here's how to use data from other files:

\`\`\`js
// app.js
import { colors, animals } from './favorites.js'
import { fruits } from './foods.js'

// Use the lists
console.log("My favorite color is: " + colors[0])
console.log("My favorite fruit is: " + fruits.apple)
\`\`\`

### Simple Data and Functions

We can use data with simple functions:

\`\`\`js
// lists.js
const items = ["hat", "coat", "shoes"]

export function addItem(item) {
    items.push(item)
}

export function getItems() {
    return items
}
\`\`\`

## Exercise: Favorite Things

Create modules that store and work with lists of favorite things.`,
  exercise: {
    starterCode: {
      'movies.js': `// Create and export:
// 1. A list of movies
// 2. addMovie(movie) function
// 3. getMovies() function`,
      'songs.js': `// Create and export:
// 1. A list of songs
// 2. getSongCount() function - returns number of songs`,
      'main.js': `// Import what you need
// Add a new movie
// Print all movies and song count`
    },
    solution: {
      'movies.js': `let movies = ["Star Wars", "Spider-Man"]

export function addMovie(movie) {
    movies.push(movie)
}

export function getMovies() {
    return movies
}`,
      'songs.js': `export const songs = [
    "Happy",
    "Don't Stop Believin'",
    "Sweet Caroline"
]

export function getSongCount() {
    return songs.length
}`,
      'main.js': `import { addMovie, getMovies } from './movies.js'
import { getSongCount } from './songs.js'

addMovie("Batman")
console.log("Movies:", getMovies())
console.log("Number of songs:", getSongCount())`
    },
    tests: [
      {
        name: "Movie Functions",
        test: (files) => {
          return files['movies.js'].includes('export function addMovie') &&
                 files['movies.js'].includes('export function getMovies')
        },
        message: "Create and export both movie functions."
      },
      {
        name: "Songs Data",
        test: (files) => {
          return files['songs.js'].includes('export const songs') &&
                 files['songs.js'].includes('export function getSongCount')
        },
        message: "Export the songs list and count function."
      },
      {
        name: "Main Usage",
        test: (files) => {
          return files['main.js'].includes('import { addMovie, getMovies }') &&
                 files['main.js'].includes('import { getSongCount }') &&
                 files['main.js'].includes('addMovie(')
        },
        message: "Import and use the functions to work with the lists."
      }
    ]
  }
}