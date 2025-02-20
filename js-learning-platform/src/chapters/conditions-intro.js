export const conditionsIntroChapter = {
  id: 'conditions-intro',
  title: 'Introduction',
  path: '/conditions-intro',
  sectionId: 'conditional-logic',
  previousChapterId: null, // First chapter in Conditional Logic section
  content: `Conditional logic allows your code to make decisions and execute different code based on different conditions.

## If Statements

The most basic form of conditional logic is the if statement:

\`\`\`js
if (condition) {
    // code to run if condition is true
}
\`\`\`

You can also use else to handle the alternative case:

\`\`\`js
if (condition) {
    // code to run if condition is true
} else {
    // code to run if condition is false
}
\`\`\`

## Exercise

Write an if/else statement that checks if a number is positive or negative.

Try it in the editor!
`,
  exercise: {
    starterCode: `const number = 5

// Write an if/else statement that:
// 1. Prints "Positive" if the number is greater than 0
// 2. Prints "Negative" if the number is less than 0
// 3. Prints "Zero" if the number is 0

let result = ""
// Your code here:
`,
    solution: `const number = 5
let result = ""

if (number > 0) {
    result = "Positive"
} else if (number < 0) {
    result = "Negative"
} else {
    result = "Zero"
}`,
    tests: [
      {
        name: "Conditional Logic",
        test: (code) => {
          return code.includes('if') &&
                 code.includes('else') &&
                 code.includes('number > 0') &&
                 code.includes('number < 0')
        },
        message: "Make sure to use if/else statements to check if the number is positive, negative, or zero"
      }
    ]
  }
}