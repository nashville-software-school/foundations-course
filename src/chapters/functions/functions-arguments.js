export const functionsArgumentsChapter = {
  id: 'functions-arguments',
  title: 'Using Arguments',
  sectionId: 'functions',
  previousChapterId: 'functions-parameters',
  nextChapterId: 'functions-multiple-parameters',
  content: `## Passing Data Into Functions

When we learned about parameters, we saw how functions can be made flexible. Now let's learn how to actually give data to our functions when we use them.

### Parameters vs Arguments

There's an important difference between parameters and arguments:
- **Parameters** are in the function definition (the recipe)
- **Arguments** are the actual values we use (the ingredients)

\`\`\`js
//           parameter
//              ↓
function greet(name) {
    console.log("Hello, " + name + "!")
}

//              argument
//                 ↓
greet("Elizabeth")  // Displays: Hello, Elizabeth!
\`\`\`

### Different Arguments, Same Function

The beauty of functions is that we can use them with different arguments:

\`\`\`js
function displayScore(points) {
    console.log("You scored " + points + " points!")
}

// Using different arguments
displayScore(10)    // Displays: You scored 10 points!
displayScore(50)    // Displays: You scored 50 points!
displayScore(100)   // Displays: You scored 100 points!
\`\`\`

### Arguments Can Be Variables

We can use variables as arguments too:

\`\`\`js
function double(number) {
    console.log(number * 2)
}

// Using a variable as an argument
const myScore = 5
double(myScore)    // Displays: 10

// Using an expression as an argument
double(myScore + 3)  // Displays: 16
\`\`\`

### Arguments Make Functions Powerful

Look how arguments let us reuse the same function in different ways:

\`\`\`js
function createGreeting(name, emotion) {
    if (emotion === "happy") {
        console.log("😊 Welcome, " + name + "!")
    } else if (emotion === "excited") {
        console.log("🎉 WELCOME, " + name + "!!!")
    } else {
        console.log("👋 Welcome, " + name)
    }
}

// Same function, different results based on arguments
createGreeting("Alex", "happy")     // 😊 Welcome, Alex!
createGreeting("Sam", "excited")    // 🎉 WELCOME, Sam!!!
createGreeting("Jordan", "calm")    // 👋 Welcome, Jordan
\`\`\`

### Key Points About Arguments
- Arguments are the actual values we pass to functions
- We can use different arguments with the same function
- Arguments can be:
  * Direct values ("hello", 42, true)
  * Variables (myName, score, isValid)
  * Expressions (x + y, score * 2)

## Exercise: Using Arguments

Complete the exercise by calling the \`calculateTotal\` function with different arguments to calculate prices with tax.
`,
  exercise: {
    starterCode: `// This function adds 10% tax to a price
function calculateTotal(price) {
    const total = price + (price * 0.1)
    console.log("Total with tax: $" + total)
}

// Call the function three times:
// 1. Calculate total for $50
// 2. Calculate total for $99.99
// 3. Calculate total for $25.50

`,
    solution: `function calculateTotal(price) {
    const total = price + (price * 0.1)
    console.log("Total with tax: $" + total)
}

calculateTotal(50)
calculateTotal(99.99)
calculateTotal(25.50)`,
    tests: [
      {
        name: "Function Calls",
        test: (code) => {
          return code.includes('calculateTotal(50') &&
                 code.includes('calculateTotal(99.99') &&
                 code.includes('calculateTotal(25.50')
        },
        message: "Make sure you've called calculateTotal with all three prices: 50, 99.99, and 25.50"
      }
    ]
  }
}