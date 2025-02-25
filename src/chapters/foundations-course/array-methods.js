export const arrayMethodsChapter = {
  id: 'array-methods',
  title: 'Array Methods',
  path: '/foundations-course/array-methods',
  sectionId: 'arrays', // Added section ID
  previousChapterId: 'arrays-intro', // Links to the intro chapter
  content: `JavaScript provides many built-in methods to work with arrays. These methods help you manipulate and transform array data.

## Common Array Methods

1. push() - Adds elements to the end of an array
2. pop() - Removes the last element
3. shift() - Removes the first element
4. unshift() - Adds elements to the beginning

## Exercise

Use the appropriate array method to add "Grape" to the end of the fruits array.

\`\`\`js
const fruits = ["Apple", "Banana"]
// Add code to add "Grape" to the end
\`\`\`

Try it in the editor!
`,
  exercise: {
    starterCode: `const fruits = ["Apple", "Banana"]

// Add "Grape" to the end of the array
`,
    solution: `const fruits = ["Apple", "Banana"]
fruits.push("Grape")`,
    tests: [
      {
        name: "Array Push",
        test: (code) => {
          return code.includes('push') && code.includes('Grape')
        },
        message: "Make sure to use push() to add 'Grape' to the array"
      }
    ]
  }
}