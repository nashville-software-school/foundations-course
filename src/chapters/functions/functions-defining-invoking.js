export const functionsDefiningInvokingChapter = {
  id: 'functions-defining-invoking',
  title: 'Defining vs Invoking Functions',
  sectionId: 'functions',
  previousChapterId: 'functions-intro',
  nextChapterId: 'functions-naming',
  content: `## Creating vs Using Functions

There are two main things we do with functions:
1. Create them (defining)
2. Use them (invoking)

### Defining a Function

When we create a function, we're **defining** it. This is like writing down a recipe - we're just writing the instructions, not actually cooking anything yet.

\`\`\`js
// This is defining a function
function makeSound() {
    console.log("Beep!")
}
\`\`\`

The definition includes:
- The \`function\` keyword
- The function name (\`makeSound\`)
- Parentheses \`()\`
- Curly braces \`{}\` containing the code to run

### Invoking a Function

When we want to actually use a function, we **invoke** it (also called "calling" the function). This is like actually following the recipe to cook the dish.

\`\`\`js
// This is invoking (calling) the function
makeSound()  // Displays: Beep!
\`\`\`

To invoke a function:
- Write the function's name
- Add parentheses \`()\`

### The Difference is Important

Look at these examples:

\`\`\`js
// Definition (nothing happens yet)
function jumpForJoy() {
    console.log("Jump!")
    console.log("Jump!")
    console.log("Jump!")
}

// Nothing has happened yet...

// Invocation (now the code runs!)
jumpForJoy()  // Displays: Jump! Jump! Jump!

// We can use it again!
jumpForJoy()  // Displays: Jump! Jump! Jump!
\`\`\`

Remember:
- Defining a function just creates it
- The code inside doesn't run until you invoke it
- You can invoke the same function many times

## Exercise: Define and Invoke

Complete this exercise by:
1. Defining a function called \`celebrateScore\`
2. Making it display "Touchdown!"
3. Invoking the function twice
`,
  exercise: {
    starterCode: `// 1. Define your function here


// 2. Invoke it twice below


`,
    solution: `function celebrateScore() {
    console.log("Touchdown!")
}

celebrateScore()
celebrateScore()`,
    tests: [
      {
        name: "Function Definition",
        test: (code) => {
          return code.includes('function celebrateScore') &&
                 code.includes('console.log') &&
                 code.includes('"Touchdown!"')
        },
        message: "Make sure you've defined the celebrateScore function that displays 'Touchdown!'"
      },
      {
        name: "Function Invocation",
        test: (code) => {
          const invocations = (code.match(/celebrateScore\(\)/g) || []).length
          return invocations >= 2
        },
        message: "Remember to invoke (call) the celebrateScore function twice"
      }
    ]
  }
}