export const arrayLengthChapter = {
  id: 'arrays-length',
  title: 'Array Length',
  sectionId: 'arrays',
  previousChapterId: 'arrays-conditions',
  nextChapterId: 'arrays-practice',
  content: `## Using the Length of an Array

Arrays have a \`.length\` property that tells you how many items are in the array.

## Rainfall

You can perform whatever task you want inside a for loop. In the previous exercises, you have used the \`.push()\` methods to build up a new array based on the items in another array. Here is an example of building up a total value.

A meterologist wants to determine what the total rainfall for a year was, and then calculate the average rainfall per month.

\`\`\`js
const rainfallPerMonth = [ 5, 12, 18, 20, 22, 17, 29, 21, 20, 22, 30, 9 ]
let totalRainfall = 0  // Start at 0 and add to it in the loop

for (const rain of rainfallPerMonth) {
  totalRainfall += rain
}

// To find the average, you take the total and divide by the number of items
const averageRainfall = totalRainfall / rainfallPerMonth.length

console.log(\`Total rainfall was \${totalRainfall} inches
Average rainfall was \${averageRainfall} inches
\`)
\`\`\`

Put that code into the code editor and run it to see the output.

## Exercise: Grocery Shopper

In this exercise, you will write code to calculate your average monthly grocery expenses. So far, you have collected five months' worth of expenses.`,
  exercise: {
    starterCode: `const monthlyExpenses = [ 201, 189, 132, 238, 195 ]
let totalExpense = 0

for (const xxx of xxx) {
  // Add the current monthly cost to the value of totalExpense
}

// Calculate your average monthly food costs
const averageExpense =

// Replace the --- with the correct, interpolated values
console.log(\`My total expenses are --- and my average monthly expenses are ---\`)`,
    solution: `const monthlyExpenses = [ 201, 189, 132, 238, 195 ]
let totalExpense = 0

for (const expense of monthlyExpenses) {
  totalExpense += expense
}

// Calculate your average monthly food costs
const averageExpense = totalExpense / monthlyExpenses.length

console.log(\`On average, I spend \${averageExpense.toFixed(1)} dollars on groceries per month.
So far this year, I have spent \${totalExpense.toFixed(0)} dollars on groceries.\`)`,
    tests: [
      {
        name: "For..of Loop",
        test: (code) => code.includes('for (const') && code.includes(' of monthlyExpenses)'),
        message: "Make sure you're using a for..of loop to iterate the monthlyExpenses array"
      },
      {
        name: "Total Calculation",
        test: (code) => {
          try {
            const total = new Function(`${code}; return totalExpense;`)()
            return total === 955
          }
          catch (e) {
            return false
          }
        },
        message: "Make sure you're adding each expense to the total"
      },
      {
        name: "Average Calculation",
        test: (code) => {
          try {
            const average = new Function(`${code}; return averageExpense;`)()
            return average === 191
          }
          catch (e) {
            return false
          }
        },
        message: "Make sure you're calculating the average using the array length"
      },
      {
        name: "Output Format",
        test: (code) => {
          try {
            return code.includes('`My total expenses are ${totalExpense} and my average monthly expenses are ${averageExpense}`');
          }
          catch (e) {
            return false
          }
        },
        message: "Make sure your output matches the required format"
      }
    ]
  }
}