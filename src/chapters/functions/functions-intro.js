import { TestResult } from "../../utils/test_utils";

export const functionsIntroChapter = {
  id: 'functions-intro',
  title: 'Introduction to Functions',
  sectionId: 'functions',
  previousChapterId: null,  // First chapter in the Functions section
  nextChapterId: 'functions-defining-invoking',
  content: `## What is a Function?

A function is like a recipe - it's a set of instructions that you can use over and over again. Just like how a recipe tells you how to make a dish, a function tells the computer how to perform a specific task.

Let's look at a simple example:

\`\`\`js
function sayHello() {
    console.log("Hello, friend!")
}
\`\`\`

This function is named \`sayHello\`. When we use it, it will display the message "Hello, friend!" every time.

### Why Do We Use Functions?

Imagine you're building a house. Instead of explaining every single time how to hammer a nail, you can just say "hammer this nail" and the builder knows what to do. Functions work the same way in code - they let us write instructions once and use them many times.

Here's a real example:

\`\`\`js
// Without a function, we have to write the same code multiple times
console.log("Welcome to our site, John!")
console.log("Welcome to our site, Sarah!")
console.log("Welcome to our site, Miguel!")

// First, you need to define a function with a descriptive name
function welcomeUser (name) {
    console.log(\`Welcome to our site, \${name}!\`)
}

// Now you can run the function as many times as you want
welcomeUser("John")
welcomeUser("Sarah")
welcomeUser("Miguel")
\`\`\`

### Key Points About Functions

1. Functions help us organize our code into manageable pieces
2. We can reuse functions instead of writing the same code over and over
3. Functions make our code easier to read and understand
4. Functions can be used many times throughout our program

## Exercise: Your First Function

Create a basic function named \`greetPet\` that will display a message saying "Good dog!" when run. It will will look very similar to the \`sayHello\` example function above.
`,
  exercise: {
    starterCode: `// Write your function here



// This should display "Good dog!" when you run your code
greetPet()
`,
    solution: `function greetPet () {
    console.log("Good dog!")
}`,

    tests: [
      {
        name: "Function Exists with Correct Name",
        test: (code) => {
          try {
            // Create a function that executes the student's code and checks if greetPet exists
            const greetPet = new Function(`${code}; return greetPet`)()
            // Check if greetPet is defined and is a function
            return new TestResult({passed:typeof greetPet === 'function'});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Make sure you've created a function named exactly 'greetPet'."
      },
      {
        name: "Function Outputs Correct Message",
        test: (code) => {
          // Check if the function contains the exact string "Good dog!"
          const passed = (
            code.includes('"Good dog!"') ||
            code.includes("'Good dog!'") ||
            code.includes("`Good dog!`")
          );
          return new TestResult({passed})
        },
        message: "Make sure your function outputs exactly 'Good dog!' when called."
      }
    ]

  }
}