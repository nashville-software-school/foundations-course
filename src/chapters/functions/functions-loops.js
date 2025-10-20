import { TestResult } from "@nss-workshops/nss-core";

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
      for (const score of scores) {
          console.log(\`Score: \${score}\`)
      }
  }

  const gameScores = [85, 92, 78, 95, 88];
  displayAllScores(gameScores);
  // Displays:
  // Score: 85
  // Score: 92
  // Score: 78
  // Score: 95
  // Score: 88
  \`\`\`

  ### Calculating with Loops

  Functions can use loops to calculate results from arrays:

  \`\`\`js
  const calculateAverage = (numbers) => {
      let total = 0

      for (const number of numbers) {
          total = total + number
      }

      return total / numbers.length
  }

  const temperatures = [72, 75, 79, 73, 71];
  const avgTemperature = calculateAverage(temperatures);
  console.log(\`Average: \${avgTemperature}\`);
  // Displays: Average: 74
  \`\`\`

  ### Finding Values

  We can use functions with loops to find specific values:

  \`\`\`js
  const findHighestScore = (scores) => {
      // Check if array is empty first
      if (scores.length === 0) {
          return null;  // Return null for empty arrays
      }

      let highest = 0    // Start with first score

      for (const score of scores) {
          if (score > highest) {
              highest = score
          }
      }

      return highest
  }

  const scores = [85, 92, 78, 95, 88];
  const highestScore = findHighestScore(scores);
  console.log(\`Highest score: \${highestScore}\`);
  // Displays: Highest score: 95
  \`\`\`

  ### Processing Strings

  Loops in functions can also process strings character by character:

  \`\`\`js
  const countVowels = (text) => {
      let vowelCount = 0
      const vowels = ["a", "e", "i", "o", "u"]

      for (const letter of text) {
          if (vowels.includes(letter.toLowerCase())) {
              vowelCount = vowelCount + 1
          }
      }

      return vowelCount
  }

  const helloVowels = countVowels("Hello World");
  console.log(helloVowels);    // Displays: 3

  const jsVowels = countVowels("JavaScript");
  console.log(jsVowels);       // Displays: 3
  \`\`\`

  ### Building New Arrays

  Functions can use loops to create new arrays:

  \`\`\`js
  const doubleAllNumbers = (numbers) => {
      const doubled = []

      for (const number of numbers) {
          doubled.push(number * 2)
      }

      return doubled
  }

  const values = [1, 2, 3, 4, 5];
  const doubledValues = doubleAllNumbers(values);
  console.log(doubledValues);
  // Displays: [2, 4, 6, 8, 10]
  \`\`\`

  ### Best Practices for Loops in Functions

  1. Check if the array is empty first
  2. Use clear variable names for counters and totals
  3. Consider what should happen with empty or invalid inputs
  4. Test with different array sizes

  ### Properly Invoking Functions with Arrays

  When working with functions that process arrays, always follow these steps:

  1. **Invoke the function** with your array
  2. **Store the return value** in a descriptive variable
  3. **Pass that variable to console.log()** to see the result

  For example:
  \`\`\`js
  // DON'T do this (calling console.log directly on the function):
  console.log(doubleAllNumbers([1, 2, 3]));

  // DO this instead (storing the result first):
  const doubledResult = doubleAllNumbers([1, 2, 3]);
  console.log(doubledResult);
  \`\`\`

  ## Exercise: Shopping Cart Total

  You are given a function named \`calculateCartTotal\` in the starter code. Your job is to write the logic that calculates the total cost of items in a shopping cart. The function should:

  1. Take an array of prices
  2. Add them all up
  3. Apply a 10% discount if the total is over $100
  4. Return the final total
  `,
    exercise: {
        starterCode: `const calculateCartTotal = (prices) => {
      // 1. Create a variable to store the total, starting at 0

      // 2. Loop through all prices in the array and add each to total

      // 3. Check if total is over $100, and if so apply a 10% discount

      // 4. Return the final total
  }

  // Test your function with following steps:
  // 1. Invoke the function
  // 2. Store the return value in a variable
  // 3. Log the variable to the console



`,
        solution: `const calculateCartTotal = (prices) => {
      let total = 0

      for (const price of prices) {
          // Add each price to the total
          total += price
      }

      if (total > 100) {
          total = total * 0.9    // Apply 10% discount
      }

      return total
  }

  // Invoke the function and display results
  const smallCartTotal = calculateCartTotal([20, 30, 40]);
  console.log(smallCartTotal);  // Displays: 90

  const largeCartTotal = calculateCartTotal([50, 60, 70]);
  console.log(largeCartTotal);  // Displays: 162`,
        tests: [
            {
                name: "Small Cart Calculation",
                test: (code) => {
                    try {
                        const body = `${code};\nreturn calculateCartTotal;`
                        const func = new Function(body)()
                        const total = func([20, 30, 40]);
                        const passed = total === 90;
                        return new TestResult({passed});
                    } catch (error) {
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Your function should return 90 for a cart with prices [20, 30, 40]"
            },
            {
                name: "Large Cart with Discount",
                test: (code) => {
                    try {
                        const fn = new Function(code + `; return calculateCartTotal([50, 60, 70]);`);
                        const passed = Math.abs(fn() - 162) < 0.01;
                        return new TestResult({passed});
                    } catch (error) {
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Your function should return 162 (after 10% discount) for a cart with prices [50, 60, 70]"
            },
            {
                name: "Empty Cart",
                test: (code) => {
                    try {
                        const fn = new Function(code + `; return calculateCartTotal([]);`);
                        const passed = fn() === 0;
                        return new TestResult({passed});
                    } catch (error) {
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Your function should handle empty carts (return 0)"
            },
            {
                name: "Exactly $100 (No Discount)",
                test: (code) => {
                    try {
                        const fn = new Function(code + `; return calculateCartTotal([25, 25, 50]);`);
                        const passed = Math.abs(fn() - 100) < 0.01;
                        return new TestResult({passed});
                    } catch (error) {
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Your function should not apply a discount for a total of exactly $100"
            },
            {
                name: "Just Over $100 (With Discount)",
                test: (code) => {
                    try {
                        const fn = new Function(code + `; return calculateCartTotal([25, 25, 51]);`);
                        const passed = Math.abs(fn() - 90.9) < 0.01;
                        return new TestResult({passed});
                    } catch (error) {
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Your function should apply a discount for a total just over $100"
            },
            {
                name: "Function structure check",
                test: (code) => {
                    try {
                        const passed = code.includes('const calculateCartTotal = (') &&
                            code.includes('for') &&
                            code.includes('of prices') &&
                            code.includes('return');
                        return new TestResult({passed});
                    } catch (error) {
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Make sure you're using a for..of loop to process all prices in the array"
            }
        ]
    }
}