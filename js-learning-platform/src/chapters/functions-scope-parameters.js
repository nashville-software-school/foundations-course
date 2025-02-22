export const functionsScopeParametersChapter = {
  id: 'functions-scope-parameters',
  title: 'Parameters and Scope',
  path: '/functions-scope-parameters',
  sectionId: 'functions',
  previousChapterId: 'functions-scope-basics',
  nextChapterId: 'functions-conditions',
  content: `## How Parameters Work with Scope

Parameters are special variables that are local to a function. Let's understand how they work with scope and how we can use them effectively.

### Parameters are Local Variables

When you create a parameter, it becomes a local variable in your function:

\`\`\`js
function greet(name) {      // 'name' is a local variable
    console.log("Hello, " + name)
}

greet("Alex")              // Works: "Hello, Alex"
console.log(name)          // Error! 'name' only exists inside greet
\`\`\`

### Parameters vs Global Variables

What happens when a parameter has the same name as a global variable?

\`\`\`js
const name = "Global Name"    // Global variable

function greet(name) {        // Parameter
    // Inside here, 'name' refers to the parameter
    // not the global variable
    console.log("Hello, " + name)
}

greet("Alex")                 // Displays: Hello, Alex
console.log(name)             // Displays: Global Name
\`\`\`

### Using Parameters with Other Variables

Parameters can work with both local and global variables:

\`\`\`js
const taxRate = 0.1         // Global variable

function calculateTotal(price) {
    const tax = price * taxRate    // Using parameter with global
    const total = price + tax      // Using parameter with local
    return total
}

console.log(calculateTotal(50))    // Displays: 55
\`\`\`

### Modifying Parameters

Changes to parameters don't affect the original values:

\`\`\`js
function doubleNumber(num) {
    num = num * 2              // Only changes the local copy
    console.log("Inside: " + num)
}

let myNumber = 5
doubleNumber(myNumber)         // Displays: Inside: 10
console.log(myNumber)          // Still displays: 5
\`\`\`

### Parameters in Nested Functions

Inner functions can see parameters from outer functions:

\`\`\`js
function createGame(playerName) {
    function start() {
        console.log(playerName + " is starting the game")
    }

    function end() {
        console.log(playerName + " finished the game")
    }

    start()
    end()
}

createGame("Mario")
\`\`\`

### Best Practices for Parameters

1. Give parameters clear, descriptive names
2. Don't rely on global variables if you can use parameters
3. Keep track of what your parameters represent
4. Remember that parameters are local to their function

## Exercise: Score Keeper

Create a score keeping system with parameters and scope. You'll need to:
1. Track a player's name (parameter)
2. Use a global high score
3. Update the high score when beaten
`,
  exercise: {
    starterCode: `// Create a global high score
let highScore = 0

// Create your function here
// It should:
// 1. Take player name and score as parameters
// 2. Compare score to high score
// 3. Update high score if beaten
// 4. Return a message about the result

`,
    solution: `let highScore = 0

function checkHighScore(playerName, score) {
    if (score > highScore) {
        highScore = score
        return playerName + " set a new high score of " + score + "!"
    } else {
        return playerName + " scored " + score + ". High score is still " + highScore
    }
}`,
    tests: [
      {
        name: "Function Structure",
        test: (code) => {
          return code.includes('function checkHighScore') &&
                 code.includes('playerName') &&
                 code.includes('score') &&
                 code.includes('highScore')
        },
        message: "Make sure your function takes both playerName and score parameters"
      },
      {
        name: "High Score Logic",
        test: (code) => {
          return code.includes('score > highScore') &&
                 code.includes('highScore = score')
        },
        message: "Your function should compare and update the high score when beaten"
      },
      {
        name: "Return Messages",
        test: (code) => {
          return code.includes('return') &&
                 code.includes('new high score') &&
                 code.includes('High score is still')
        },
        message: "Make sure to return appropriate messages for both new high scores and regular scores"
      }
    ]
  }
}