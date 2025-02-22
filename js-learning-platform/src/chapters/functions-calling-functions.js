export const functionsCallingFunctionsChapter = {
  id: 'functions-calling-functions',
  title: 'Functions Calling Functions',
  path: '/functions-calling-functions',
  sectionId: 'functions',
  previousChapterId: 'functions-loops',
  nextChapterId: 'functions-review',
  content: `## Making Functions Work Together

Just like we can break a big task into smaller steps, we can break complex code into smaller functions that work together. This makes our code easier to understand and maintain.

### Basic Function Composition

Here's a simple example of one function using another:

\`\`\`js
function double(number) {
    return number * 2
}

function addFive(number) {
    return number + 5
}

function doubleThenAddFive(number) {
    const doubled = double(number)    // First double it
    return addFive(doubled)          // Then add five
}

console.log(doubleThenAddFive(10))   // Displays: 25
// Because: 10 doubled is 20, then add 5 is 25
\`\`\`

### Breaking Down Complex Tasks

Complex operations become clearer when split into functions:

\`\`\`js
function calculateTax(price) {
    return price * 0.1    // 10% tax
}

function calculateShipping(price) {
    if (price < 20) {
        return 5.99       // Standard shipping
    } else {
        return 0          // Free shipping over $20
    }
}

function calculateTotal(price) {
    const tax = calculateTax(price)
    const shipping = calculateShipping(price)
    return price + tax + shipping
}

console.log(calculateTotal(15))    // Price + tax + shipping
console.log(calculateTotal(50))    // Price + tax (free shipping)
\`\`\`

### Functions Helping Functions

Functions can help each other do their jobs:

\`\`\`js
function isValidUsername(username) {
    return username.length >= 3
}

function isValidPassword(password) {
    return password.length >= 8
}

function createUser(username, password) {
    if (!isValidUsername(username)) {
        return "Username too short"
    }

    if (!isValidPassword(password)) {
        return "Password too short"
    }

    return "User created successfully"
}

console.log(createUser("jo", "password123"))     // Username too short
console.log(createUser("john", "pass"))          // Password too short
console.log(createUser("john", "password123"))   // User created successfully
\`\`\`

### Building Complex Behavior

Multiple functions can work together to create complex behavior:

\`\`\`js
function getRandomNumber(max) {
    return Math.floor(Math.random() * max)
}

function createPassword(length) {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
    let password = ""

    for (let i = 0; i < length; i++) {
        const randomIndex = getRandomNumber(characters.length)
        password = password + characters[randomIndex]
    }

    return password
}

function createSecurePassword() {
    // Keep trying until we get a password with both letters and numbers
    let password = createPassword(8)

    while (!password.match(/[a-z]/) || !password.match(/[0-9]/)) {
        password = createPassword(8)
    }

    return password
}

console.log(createSecurePassword())
// Displays something like: "a7b2x9kp"
\`\`\`

### Best Practices

1. Keep functions focused on one task
2. Use clear names that show what functions do
3. Break complex operations into smaller functions
4. Test functions both individually and together

## Exercise: Game Score System

Create a scoring system for a game using multiple functions:
1. One function to calculate points based on time and targets hit
2. Another function to determine bonus points
3. A main function that uses both to calculate final score
`,
  exercise: {
    starterCode: `// 1. Calculate base points (time * 100 + targets * 50)
function calculateBasePoints(time, targets) {
    // Your code here
}

// 2. Calculate bonus (if targets > 10, bonus = 1000)
function calculateBonus(targets) {
    // Your code here
}

// 3. Calculate final score (base points + bonus)
function calculateFinalScore(time, targets) {
    // Your code here
}`,
    solution: `function calculateBasePoints(time, targets) {
    return (time * 100) + (targets * 50)
}

function calculateBonus(targets) {
    if (targets > 10) {
        return 1000
    }
    return 0
}

function calculateFinalScore(time, targets) {
    const basePoints = calculateBasePoints(time, targets)
    const bonus = calculateBonus(targets)
    return basePoints + bonus
}`,
    tests: [
      {
        name: "Base Points Calculation",
        test: (code) => {
          return code.includes('time * 100') &&
                 code.includes('targets * 50')
        },
        message: "Make sure calculateBasePoints multiplies time by 100 and targets by 50"
      },
      {
        name: "Bonus Calculation",
        test: (code) => {
          return code.includes('targets > 10') &&
                 code.includes('1000')
        },
        message: "Make sure calculateBonus returns 1000 when targets is greater than 10"
      },
      {
        name: "Final Score Calculation",
        test: (code) => {
          return code.includes('calculateBasePoints(time, targets)') &&
                 code.includes('calculateBonus(targets)') &&
                 code.includes('basePoints + bonus')
        },
        message: "Make sure calculateFinalScore uses both helper functions and adds their results"
      }
    ]
  }
}