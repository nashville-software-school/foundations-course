export const functionsReviewChapter = {
  id: 'functions-review',
  title: 'Review and Practice',
  path: '/functions-review',
  sectionId: 'functions',
  previousChapterId: 'functions-calling-functions',
  nextChapterId: null,
  content: `## Reviewing Function Concepts

Let's review everything we've learned about functions by seeing how all the concepts work together.

### Core Concepts Review

1. **Function Basics**
\`\`\`js
// Creating (defining) a function
function greet(name) {
    console.log("Hello, " + name + "!")
}

// Using (invoking) the function
greet("Alex")    // Displays: Hello, Alex!
\`\`\`

2. **Parameters and Arguments**
\`\`\`js
// Parameters make functions flexible
function calculateArea(width, height) {
    return width * height
}

// Different arguments give different results
console.log(calculateArea(5, 3))     // 15
console.log(calculateArea(10, 20))   // 200
\`\`\`

3. **Return Values**
\`\`\`js
function isEven(number) {
    return number % 2 === 0
}

function formatResult(number) {
    if (isEven(number)) {
        return number + " is even"
    } else {
        return number + " is odd"
    }
}

console.log(formatResult(4))    // "4 is even"
console.log(formatResult(7))    // "7 is odd"
\`\`\`

4. **Scope**
\`\`\`js
const taxRate = 0.1    // Global scope

function calculateTotal(price) {
    const tax = price * taxRate    // Function scope
    return price + tax
}

console.log(calculateTotal(50))    // 55
// console.log(tax)    // Would cause error - tax only exists in function
\`\`\`

5. **Functions Working Together**
\`\`\`js
function validateInput(text) {
    return text.length >= 3
}

function formatInput(text) {
    return text.trim().toLowerCase()
}

function processUsername(username) {
    if (!validateInput(username)) {
        return "Username too short"
    }
    return formatInput(username)
}

console.log(processUsername("  Bob  "))    // "bob"
console.log(processUsername("A"))          // "Username too short"
\`\`\`

### Putting It All Together

Here's a complete example using multiple function concepts:

\`\`\`js
// Global settings
const MIN_AGE = 13
const MAX_PLAYERS = 4

// Helper function to validate age
function isValidAge(age) {
    return age >= MIN_AGE
}

// Helper function to check team size
function hasTeamSpace(currentPlayers) {
    return currentPlayers < MAX_PLAYERS
}

// Helper function to create player object
function createPlayer(name, age, skill) {
    return {
        name: name,
        age: age,
        skillLevel: skill,
        isActive: true
    }
}

// Main function that uses all the helpers
function addPlayerToTeam(name, age, skill, currentPlayers) {
    // First check age
    if (!isValidAge(age)) {
        return "Player must be at least " + MIN_AGE + " years old"
    }

    // Then check team space
    if (!hasTeamSpace(currentPlayers)) {
        return "Team is full"
    }

    // If all checks pass, create and return the player
    const player = createPlayer(name, age, skill)
    return "Added " + player.name + " to the team!"
}

// Testing our system
console.log(addPlayerToTeam("Sam", 15, "Medium", 2))    // Added Sam to the team!
console.log(addPlayerToTeam("Alex", 11, "High", 2))     // Player must be at least 13 years old
console.log(addPlayerToTeam("Jo", 14, "Low", 4))        // Team is full
\`\`\`

## Exercise: Build a Quiz System

Create a complete quiz system using everything you've learned. You'll need to:
1. Create and validate questions
2. Process answers
3. Calculate scores
4. Display results
`,
  exercise: {
    starterCode: `// 1. Function to create a question
function createQuestion(text, correctAnswer) {
    // Return an object with the question text and correct answer
}

// 2. Function to check an answer
function checkAnswer(question, userAnswer) {
    // Return true if the answer is correct, false otherwise
}

// 3. Function to calculate score
function calculateScore(totalQuestions, correctAnswers) {
    // Return percentage score
}

// 4. Main function to process a quiz attempt
function processQuizAttempt(questions, answers) {
    // Use the helper functions to process the quiz and return results
}`,
    solution: `function createQuestion(text, correctAnswer) {
    return {
        text: text,
        correctAnswer: correctAnswer
    }
}

function checkAnswer(question, userAnswer) {
    return question.correctAnswer.toLowerCase() === userAnswer.toLowerCase()
}

function calculateScore(totalQuestions, correctAnswers) {
    return (correctAnswers / totalQuestions) * 100
}

function processQuizAttempt(questions, answers) {
    let correct = 0

    for (let i = 0; i < questions.length; i++) {
        if (checkAnswer(questions[i], answers[i])) {
            correct++
        }
    }

    const score = calculateScore(questions.length, correct)
    return "You got " + correct + " out of " + questions.length +
           " correct (" + score + "%)"
}`,
    tests: [
      {
        name: "Question Creation",
        test: (code) => {
          return code.includes('createQuestion') &&
                 code.includes('return {') &&
                 code.includes('text:') &&
                 code.includes('correctAnswer:')
        },
        message: "Make sure createQuestion returns an object with text and correctAnswer properties"
      },
      {
        name: "Answer Checking",
        test: (code) => {
          return code.includes('checkAnswer') &&
                 code.includes('toLowerCase') &&
                 code.includes('question.correctAnswer')
        },
        message: "Make sure checkAnswer compares answers case-insensitively"
      },
      {
        name: "Score Calculation",
        test: (code) => {
          return code.includes('calculateScore') &&
                 code.includes('/ totalQuestions') &&
                 code.includes('* 100')
        },
        message: "Make sure calculateScore returns a percentage"
      },
      {
        name: "Quiz Processing",
        test: (code) => {
          return code.includes('processQuizAttempt') &&
                 code.includes('for') &&
                 code.includes('questions.length') &&
                 code.includes('correct++')
        },
        message: "Make sure processQuizAttempt uses all helper functions and returns a complete result"
      }
    ]
  }
}