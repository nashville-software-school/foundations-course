export const arrayMethodsChapter = {
  id: 'array-methods',
  title: 'Array Methods',
  path: '/array-methods',
  content: `# Array Methods

Arrays in JavaScript come with powerful built-in methods for manipulation and transformation.

## Exercise

Use the \`filter\` method to create a new array containing only numbers greater than 5.

\`\`\`js
// Example:
const numbers = [2, 8, 4, 10, 1, 7];
const filtered = numbers.filter(num => num > 5);
// filtered is [8, 10, 7]
\`\`\`

Try it yourself!
`,
  exercise: {
    starterCode: `const numbers = [3, 7, 1, 9, 4, 6, 2, 8];

// Use filter to create largeNumbers array
const largeNumbers =

console.log(largeNumbers);`,
    solution: `const numbers = [3, 7, 1, 9, 4, 6, 2, 8];
const largeNumbers = numbers.filter(num => num > 5);
console.log(largeNumbers);`,
    tests: [
      {
        name: "Filter Implementation",
        test: (code) => {
          try {
            return code.includes('.filter') && code.includes('> 5');
          } catch (error) {
            return false;
          }
        },
        message: "Make sure you're using the filter method to keep numbers greater than 5"
      }
    ]
  }
}