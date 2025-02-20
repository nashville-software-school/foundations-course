export const arrayIntroChapter = {
  id: 'arrays-intro',
  title: 'Introduction',
  path: '/arrays-intro',
  sectionId: 'arrays', // Added section ID
  previousChapterId: null, // This is the first chapter in the Arrays section
  content: `Arrays are ordered collections of values. They allow you to store multiple items in a single variable.

## Exercise

Convert the individual fruit variables into an array.

\`\`\`js
// Instead of this:
const yellowFruit = "Banana"
const orangeFruit = "Orange"
const redFruit = "Apple"

// Create this:
const fruits = ["Banana", "Orange", "Apple"]
\`\`\`

Try it yourself in the editor!
`,
  exercise: {
    starterCode: `// Current setup
const yellowFruit = "Banana"
const orangeFruit = "Orange"
const redFruit = "Apple"
const greenFruit = "Watermelon"
const blueFruit = "Blueberry"

const fruits = []

// Your code here`,
    solution: `const fruits = ["Banana", "Orange", "Apple", "Watermelon", "Blueberry"]`,
    tests: [
      {
        name: "Array Creation",
        test: (code) => code.includes('["Banana", "Orange", "Apple", "Watermelon", "Blueberry"]'),
        message: "Make sure you've included all fruits in the array"
      }
    ]
  }
}