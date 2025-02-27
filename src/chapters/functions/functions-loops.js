export const functionsLoopsChapter = {
  id: 'functions-loops',
  title: 'Functions with Loops',
  sectionId: 'functions',
  previousChapterId: 'functions-conditions',
  nextChapterId: 'functions-calling-functions',
  content: `## Processing Collections with Functions

Functions become even more powerful when we combine them with loops. This lets us process arrays and other collections of data efficiently.

### Processing Arrays

Here's a simple function that uses a loop to process an array:

\`\`\`js
const displayAllScores = (scores) => {
    for (let i = 0; i < scores.length; i++) {
        console.log("Score " + (i + 1) + ": " + scores[i])
    }
}

const gameScores = [85, 92, 78, 95, 88]
displayAllScores(gameScores)
// Displays:
// Score 1: 85
// Score 2: 92
// Score 3: 78
// Score 4: 95
// Score 5: 88
\`\`\`

### Calculating with Loops

Functions can use loops to calculate results from arrays:

\`\`\`js
const calculateAverage = (numbers) => {
    let total = 0

    for (let i = 0; i < numbers.length; i++) {
        total = total + numbers[i]
    }

    return total / numbers.length
}

const temperatures = [72, 75, 79, 73, 71]
console.log("Average: " + calculateAverage(temperatures))
// Displays: Average: 74
\`\`\`

### Finding Values

We can use functions with loops to find specific values:

\`\`\`js
const findHighestScore = (scores) => {
    let highest = scores[0]    // Start with first score

    for (let i = 1; i < scores.length; i++) {
        if (scores[i] > highest) {
            highest = scores[i]
        }
    }

    return highest
}

const scores = [85, 92, 78, 95, 88]
console.log("Highest score: " + findHighestScore(scores))
// Displays: Highest score: 95
\`\`\`

### Processing Strings

Loops in functions can also process strings character by character:

\`\`\`js
const countVowels = (text) => {
    let vowelCount = 0
    const vowels = ["a", "e", "i", "o", "u"]

    for (let i = 0; i < text.length; i++) {
        if (vowels.includes(text[i].toLowerCase())) {
            vowelCount = vowelCount + 1
        }
    }

    return vowelCount
}

console.log(countVowels("Hello World"))    // Displays: 3
console.log(countVowels("JavaScript"))     // Displays: 2
\`\`\`

### Building New Arrays

Functions can use loops to create new arrays:

\`\`\`js
const doubleAllNumbers = (numbers) => {
    const doubled = []

    for (let i = 0; i < numbers.length; i++) {
        doubled.push(numbers[i] * 2)
    }

    return doubled
}

const values = [1, 2, 3, 4, 5]
console.log(doubleAllNumbers(values))
// Displays: [2, 4, 6, 8, 10]
\`\`\`

### Best Practices for Loops in Functions

1. Check if the array is empty first
2. Use clear variable names for counters and totals
3. Consider what should happen with empty or invalid inputs
4. Test with different array sizes

## Exercise: Shopping Cart Total

Create an arrow function that calculates the total cost of items in a shopping cart. The function should:
1. Take an array of prices
2. Add them all up
3. Apply a 10% discount if the total is over $100
4. Return the final total
`,
  exercise: {
    starterCode: `const calculateCartTotal = (prices) => {
    // Your code here
    // Remember to:
    // 1. Add up all prices
    // 2. Apply 10% discount if total > 100
    // 3. Return the final total
}

// Example usage:
// calculateCartTotal([20, 30, 40])  should return 90
// calculateCartTotal([50, 60, 70])  should return 162 (180 - 10%)`,
    solution: `const calculateCartTotal = (prices) => {
    let total = 0

    for (let i = 0; i < prices.length; i++) {
        total = total + prices[i]
    }

    if (total > 100) {
        total = total * 0.9    // Apply 10% discount
    }

    return total
}`,
    tests: [
      {
        name: "Loop Implementation",
        test: (code) => {
          return code.includes('const calculateCartTotal = (') &&
                 code.includes('=>') &&
                 code.includes('for') &&
                 code.includes('prices.length') &&
                 code.includes('total') &&
                 code.includes('prices[i]')
        },
        message: "Make sure you're using an arrow function with a loop to add up all prices"
      },
      {
        name: "Discount Logic",
        test: (code) => {
          return code.includes('> 100') &&
                 code.includes('0.9') &&
                 code.includes('return total')
        },
        message: "Your function should apply a 10% discount for totals over $100"
      }
    ]
  }
}