export const functionsScopeBasicsChapter = {
  id: 'functions-scope-basics',
  title: 'Understanding Scope Basics',
  sectionId: 'functions',
  previousChapterId: 'functions-return-practice',
  nextChapterId: 'functions-scope-parameters',
  content: `## Understanding Variable Scope

When we write functions, it's important to understand which variables our code can "see" and use. This is called **scope** - the area where a variable can be accessed.

### Local Variables (Function Scope)

Variables created inside a function can only be used inside that function:

\`\`\`js
const calculateTotal = () => {
    const tax = 0.1          // Local variable
    const price = 50         // Local variable
    const total = price + (price * tax)
    console.log(total)
}

calculateTotal()             // Works fine
console.log(tax)            // Error! Can't see 'tax' out here
console.log(price)          // Error! Can't see 'price' out here
\`\`\`

### Global Variables

Variables created outside any function can be used anywhere:

\`\`\`js
const taxRate = 0.1         // Global variable

const calculateTotal = (price) => {
    // We can use taxRate here
    const total = price + (price * taxRate)
    return total
}

// We can also use taxRate here
console.log("Tax rate is: " + taxRate)
\`\`\`

### Why Scope Matters

Scope helps us:
1. Keep our variables organized
2. Prevent naming conflicts
3. Control what parts of our code can see what variables

\`\`\`js
// This works fine - each function has its own 'message'
const sayHello = () => {
    const message = "Hello!"
    console.log(message)
}

const sayGoodbye = () => {
    const message = "Goodbye!"
    console.log(message)
}

sayHello()      // Displays: Hello!
sayGoodbye()    // Displays: Goodbye!
\`\`\`

### Scope Rules

1. Local variables can only be used in their function
2. Global variables can be used anywhere
3. Each function creates its own scope
4. Inner scopes can see outer variables

\`\`\`js
const playerName = "Mario"    // Global

const startGame = () => {
    const lives = 3          // Local to startGame
    console.log(playerName + " starts with " + lives + " lives")

    const loseLife = () => {
        const remaining = lives - 1    // Can see 'lives' from outer function
        console.log(playerName + " has " + remaining + " lives left")
    }
}
\`\`\`

### Best Practices

1. Prefer local variables when possible
2. Use clear, unique names
3. Be careful with global variables
4. Keep track of what scope you're in

## Exercise: Fix the Scope

The code below has some scope problems. Fix them by moving variables to the right place or making them accessible where needed.
`,
  exercise: {
    starterCode: `// This code has scope problems!
const displayScore = () => {
    console.log("Score: " + score)
}

const updateScore = () => {
    score = score + 100
}

const score = 0
displayScore()
updateScore()
displayScore()`,
    solution: `let score = 0    // Changed to let since we're updating it

const displayScore = () => {
    console.log("Score: " + score)
}

const updateScore = () => {
    score = score + 100
}

displayScore()
updateScore()
displayScore()`,
    tests: [
      {
        name: "Global Score Variable",
        test: (code) => {
          return (code.match(/score\s*=/g) || []).length === 1 &&
                 code.includes('let score = 0')
        },
        message: "Make sure score is declared as a global variable using 'let'"
      },
      {
        name: "Arrow Function Structure",
        test: (code) => {
          return code.includes('const displayScore = () =>') &&
                 code.includes('const updateScore = () =>') &&
                 code.includes('score + 100')
        },
        message: "Make sure to use arrow function syntax and ensure they can access the score variable"
      }
    ]
  }
}