export const stringMethodsChapter = {
  id: 'string-methods',
  title: 'String Methods',
  path: '/string-methods',
  sectionId: 'strings',
  previousChapterId: 'multiline-strings', // Updated to link to multiline-strings chapter
  content: `JavaScript provides many built-in methods to work with strings. These methods help you manipulate and transform text data.

## Common String Methods

1. length - Property that returns the string length
2. toUpperCase() - Converts to uppercase
3. toLowerCase() - Converts to lowercase
4. trim() - Removes whitespace from both ends
5. substring() - Extracts part of a string

## Exercise

Use string methods to transform the text as specified in the comments.

\`\`\`js
const text = "  Hello World  "
// Should become: "HELLO WORLD"
\`\`\`

Try it in the editor!
`,
  exercise: {
    starterCode: `const text = "  Hello World  "

// 1. Remove extra spaces
// 2. Convert to uppercase
// Your code here:
const result = `,
    solution: `const text = "  Hello World  "
const result = text.trim().toUpperCase()`,
    tests: [
      {
        name: "String Transformation",
        test: (code) => {
          return code.includes('trim') &&
                 code.includes('toUpperCase') &&
                 code.includes('result')
        },
        message: "Make sure to use trim() to remove spaces and toUpperCase() to convert to uppercase"
      }
    ]
  }
}