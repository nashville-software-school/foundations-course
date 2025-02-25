export const functionsReturnPracticeChapter = {
  id: 'functions-return-practice',
  title: 'Return Value Practice',
  path: '/foundations-course/functions-return-practice',
  sectionId: 'functions',
  previousChapterId: 'functions-return-working',
  nextChapterId: 'functions-scope-basics',
  content: `## Practicing with Return Values

Let's get more practice with return values by solving some real-world problems. We'll see different types of values that functions can return and how to use them.

### Returning Different Types

Functions can return any type of value:

\`\`\`js
// Returning a number
const calculateDiscount = (price) => {
    return price * 0.2    // Returns 20% of the price
}

// Returning a string
const getGreeting = (timeOfDay) => {
    if (timeOfDay === "morning") {
        return "Good morning!"
    } else if (timeOfDay === "afternoon") {
        return "Good afternoon!"
    } else {
        return "Good evening!"
    }
}

// Returning a boolean
const isOnSale = (price) => {
    return price < 20    // Returns true if price is less than 20
}
\`\`\`

### Building More Complex Functions

Let's combine what we've learned to build useful functions:

\`\`\`js
const calculateGrade = (score) => {
    if (score >= 90) {
        return "A"
    } else if (score >= 80) {
        return "B"
    } else if (score >= 70) {
        return "C"
    } else if (score >= 60) {
        return "D"
    } else {
        return "F"
    }
}

const isPassing = (score) => {
    // Use the previous function's result
    const grade = calculateGrade(score)
    return grade !== "F"    // Returns true for any grade except F
}

// Using both functions
const studentScore = 85
console.log("Grade: " + calculateGrade(studentScore))  // Displays: Grade: B
console.log("Passing: " + isPassing(studentScore))     // Displays: Passing: true
\`\`\`

### When to Use Return Values

Return values are great for:
1. Calculations that you'll use later
2. Checking conditions (true/false)
3. Creating formatted text
4. Converting data from one form to another

\`\`\`js
// Calculation example
const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32
}

// Condition example
const canRideRollerCoaster = (height, age) => {
    return height >= 48 && age >= 12
}

// Text formatting example
const formatPhoneNumber = (number) => {
    return "(" + number.slice(0,3) + ") " +
           number.slice(3,6) + "-" +
           number.slice(6)
}

// Data conversion example
const letterToNumber = (grade) => {
    if (grade === "A") return 4
    if (grade === "B") return 3
    if (grade === "C") return 2
    if (grade === "D") return 1
    return 0
}
\`\`\`

## Exercise: Game Score Calculator

Create an arrow function that calculates a player's final score in a game. The function should:
1. Take base points and bonus multiplier as parameters
2. Calculate total points (base points × multiplier)
3. Return "High Score!" if total is 1000 or more, otherwise return "Keep trying!"
`,
  exercise: {
    starterCode: `// Create your arrow function here
// Example: calculateGameScore(500, 2.5) should return "High Score!"
// because 500 × 2.5 = 1250, which is >= 1000

`,
    solution: `const calculateGameScore = (points, multiplier) => {
    const total = points * multiplier
    if (total >= 1000) {
        return "High Score!"
    } else {
        return "Keep trying!"
    }
}`,
    tests: [
      {
        name: "High Score Test",
        test: (code) => {
          return code.includes('const calculateGameScore') &&
                 code.includes('=>') &&
                 code.includes('points') &&
                 code.includes('multiplier') &&
                 code.includes('* multiplier') &&
                 code.includes('>= 1000') &&
                 code.includes('"High Score!"') &&
                 code.includes('"Keep trying!"')
        },
        message: "Make sure your arrow function calculates the total score and returns the appropriate message"
      },
      {
        name: "Return Values",
        test: (code) => {
          return code.includes('return "High Score!"') &&
                 code.includes('return "Keep trying!"')
        },
        message: "Your function should return either 'High Score!' or 'Keep trying!'"
      }
    ]
  }
}