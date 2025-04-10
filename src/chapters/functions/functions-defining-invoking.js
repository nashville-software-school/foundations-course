import { TestResult } from "../../utils/test_utils";

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
celebrateScore()

`,
    tests: [

      {
        name: "Function Uses Correct Syntax",
        test: (code) => {
          try {
            // Check if they're using the function keyword with the correct name
            const passed = /function\s+celebrateScore\s*\(\)/.test(code);
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Make sure you're using the correct syntax: 'function celebrateScore() { ... }'"
      },
      {
        name: "Function Invoked At Least Twice",
        test: (code) => {
          try {
            // Count how many times the function is invoked
            const invocations = (code.match(/celebrateScore\s*\(\)/g) || []).length;
            const passed = invocations >= 2;
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Remember to invoke (call) the celebrateScore function at least twice."
      },
      {
        name: "Function Works When Executed",
        test: (code) => {
          try {
            // Execute the code with a custom console.log that tracks invocations
            code = "let callCount = 0;" + code;

            const evalFunction = new Function(code.replace(
              /console\.log\s*\(['"´]Touchdown!['"´]\)/g,
              "callCount++;"
            ) + `;
            // Return if function was called enough times with correct message
            return callCount >= 2;
          `);

            const passed = evalFunction();
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Make sure your function is properly defined and called twice, outputting 'Touchdown!' each time."
      }
    ]
  }
}