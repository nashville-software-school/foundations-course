export const stringsIntroChapter = {
  id: 'strings-intro',
  title: 'Introduction',
  path: '/strings-intro',
  sectionId: 'strings',
  previousChapterId: null, // First chapter in Strings section
  content: `Strings are used to store and manipulate text in JavaScript. They can be created using single quotes, double quotes, or backticks.

## String Creation

There are three ways to create strings:
\`\`\`js
const singleQuotes = 'Hello'
const doubleQuotes = "World"
const backticks = \`Hello World\`
\`\`\`

## Exercise

Create three variables using different string creation methods.

Try it in the editor!
`,
  exercise: {
    starterCode: `// Create three greeting variables
// 1. Use single quotes
// 2. Use double quotes
// 3. Use backticks

`,
    solution: `const greeting1 = 'Hello'
const greeting2 = "World"
const greeting3 = \`Hello World\``,
    tests: [
      {
        name: "String Creation",
        test: (code) => {
          return code.includes("'") &&
                 code.includes('"') &&
                 code.includes('`')
        },
        message: "Make sure to create strings using all three methods: single quotes, double quotes, and backticks"
      }
    ]
  }
}