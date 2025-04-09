import { TestResult } from "../../utils/test_utils";

export const arrayReviewChapter = {
    id: 'arrays-review',
    title: 'Section Project',
    path: '/arrays-review',
    sectionId: 'arrays',
    previousChapterId: 'arrays-split-join',
    nextChapterId: null,
    content: `## Categorizing Monthly Expenses

Concepts you used in this part of the course.

* \`for..of\` loops
* Logical operators AND \`&&\` and OR \`||\`
* Arrays
* \`if/else\` code blocks for conditional logic
* \`.push()\` method for arrays
* \`.length\` property for arrays
* \`.includes()\` method for strings
* \`+=\` operator to add a any number to a variable's existing value
* \`++\` operator to add 1 to a variable's existing value
* Division \`/\` operator to find averages

That's a lot. We also want to remind you that it's expected for these concepts and skills to not be solidified just yet. You need a significant amount of practice to become proficient at determining when you need to use these tools when you write code.

Up next is going to be learning about JavaScript Objects. Before you go, we would like to present you with this optional final challenge exercise. This is truly a challenge that requires you to use all the skills you have practiced so far. It's up to you to work on this until you feel you have it right. If you want to just move on to Objects instead, that's perfectly fine.

## Exercise: Where Do I Spend My Money?

Have you ever used online banking, or a service like Mint to track your monthly expenses? They can tell you in a concise report how much you spend on food, fuel, utilities, travel, clothing, and entertainment every month.

In the code editor, there is some sample code. It starts with an array filled with your monthly expenses. Each string in the array contains a \`:\` delimited string. On the left side of the colon is the vendor, and on the right is the amount of money you spent.

### Task 1

Correctly categorize each expense and put the amount spent in the correct target array.

* If the vendor contains the sub-string of "Clothing" place the expense amount in the \`clothing\` array.
* If the vendor contains the sub-string of "Movie" place the expense amount in the \`entertainment\` array.
* If the vendor contains the sub-string of "Fuel" place the expense amount in the \`fuel\` array.
* If the vendor contains the sub-string of "Utility" place the expense amount in the \`utilities\` array.
* If the vendor contains the sub-string of "Groceries" or the sub-string of "Restaurant" place the expense amount in the \`food\` array.
* If the vendor contains the sub-string of "Lyft" or the sub-string of "Uber" place the expense amount in the \`travel\` array.
* If the expense amount is greater than 100.00, place the expense amount in the \`largePurchases\` array.

### Task 2

Calculate your total monthly expenses and your average monthly expenses using the variables provided.

## Helpful Hints

### Turning a String into a Number

To convert a string into a number, you can use the \`parseFloat()\` function as shown in the following code.

\`\`\`js
const accountBalance = "2551.30"
console.log(accountBalance)  // Output is "2551.30"
console.log(parseFloat(accountBalance))  // Output is 2551.30
\`\`\`

### Splitting a String

\`\`\`js
const [leftValue, rightValue] = stringVariable.split(":")
\`\`\`

### Logical Operators

You will need to use the logical OR \`||\` operator in some of your \`if\` conditions.`,
    exercise: {
        starterCode: `// Sample monthly expenses
const monthlyExpenses = [
    "Kroger Groceries:251", "Uber:39", "Netflix Movie Service:12",
    "Utility Internet:85", "Old Navy Clothing:145", "Lyft:34",
    "Utility Electric:91", "Clothing Outlet:122",
    "Fast Food Restaurant:18", "Shell Fuel:42", "Movie Theater:44",
    "Utility Water:27", "Best Buy Electronics:299", "Apple Store:899",
    "Gas Station:31", "Movie Rental:4", "Amazon:112", "Gas Station:33",
    "Movie Theater:47", "Utility Electric:88", "Clothing Outlet:112",
    "Fast Food Restaurant:21", "Shell Fuel:42", "Movie Theater:44"
]

// Arrays for categories and the words to look for
const clothing = []        // "Clothing"
const entertainment = []   // "Movie"
const food = []            // "Groceries" or "Restaurant"
const fuel = []            // "Fuel" or "Gas"
const travel = []          // "Lyft" or "Uber"
const utilities = []       // "Utility"
const largePurchases = []  // Expenses over 100.00

// Totals and averages
let totalExpenses = 0
let averageExpense = 0


/*
 Use your algorithmic thinking for the steps to
 categorize, total, and average the expenses.

 Be patient and take your time. This is challenging.
*/


`,
        solution: `// Sample monthly expenses
const monthlyExpenses = [
    "Kroger Groceries:251", "Uber:39", "Netflix Movie Service:12", "Utility Internet:85", "Old Navy Clothing:145",
    "Lyft:34", "Utility Electric:91", "Clothing Outlet:122", "Fast Food Restaurant:18", "Shell Fuel:42",
    "Movie Theater:44", "Utility Water:27", "Best Buy Electronics:299", "Apple Store:899", "Gas Station:31",
    "Movie Rental:4", "Amazon:112", "Gas Station:33", "Movie Theater:47", "Utility Electric:88", "Clothing Outlet:112",
    "Fast Food Restaurant:21", "Shell Fuel:42", "Movie Theater:44"
]

// Create arrays for each category of expenses
const clothing = []
const entertainment = []
const food = []
const fuel = []
const travel = []
const utilities = []
const largePurchases = []

// Totals and averages
let totalExpenses = 0
let averageExpense = 0


// Process each expense
for (const expense of monthlyExpenses) {
    // Split the expense into vendor and amount
    const [vendor, amount] = expense.split(":")
    const cost = parseFloat(amount)

    // Add to total
    totalExpenses += cost

    // Check amount for large purchases
    if (cost > 100.00) {
        largePurchases.push(cost)
    }

    // Categorize based on vendor
    if (vendor.includes("Clothing")) {
        clothing.push(cost)
    }
    else if (vendor.includes("Movie")) {
        entertainment.push(cost)
    }
    else if (vendor.includes("Fuel") || vendor.includes("Gas")) {
        fuel.push(cost)
    }
    else if (vendor.includes("Utility")) {
        utilities.push(cost)
    }
    else if (vendor.includes("Groceries") || vendor.includes("Restaurant")) {
        food.push(cost)
    }
    else if (vendor.includes("Lyft") || vendor.includes("Uber")) {
        travel.push(cost)
    }
}

// Calculate the average
averageExpense = totalExpenses / monthlyExpenses.length

// Display the categorized expenses
console.log("Expense Categories:")
console.log(\`Clothing: \${clothing.join(", ")}\`)
console.log(\`Entertainment: \${entertainment.join(", ")}\`)
console.log(\`Food: \${food.join(", ")}\`)
console.log(\`Fuel: \${fuel.join(", ")}\`)
console.log(\`Travel: \${travel.join(", ")}\`)
console.log(\`Utilities: \${utilities.join(", ")}\`)
console.log(\`Large Purchases: \${largePurchases.join(", ")}\`)

// Display the totals
console.log(\`Total Expenses: \${totalExpenses}\`)
console.log(\`Average Expense: \${averageExpense.toFixed(2)}\`)

`,
        tests: [
            {
                name: "Total Calculation",
                test: (code) => {
                    try {
                        const total = new Function(`${code}; return totalExpenses;`)()
                        const passed =  total === 2642
                        return new TestResult({passed})
                    }
                    catch (e) {
                        return new TestResult({passed:false,message:e.message})
                    }
                },
                message: "Make sure you're adding each expense to the total. Should be 2642."
            },
            {
                name: "Average Calculation",
                test: (code) => {
                    try {
                        const average = new Function(`${code}; return averageExpense;`)()
                        return new TestResult({passed:parseFloat(average.toFixed(2)) === 110.08})
                    }
                    catch (e) {
                        return new TestResult({passed:false,message:e.message})
                    }
                },
                message: "Make sure you're calculating the average. Should be 110.08."
            },
            {
                name: "Category counts",
                test: (code) => {
                    try {
                        const { clothing, entertainment, food, fuel, travel, utilities, largePurchases } = new Function(`${code}; return { clothing, entertainment, food, fuel, travel, utilities, largePurchases };`)()
                        const passed = clothing.length === 3
                            && entertainment.length === 5
                            && food.length === 3
                            && fuel.length === 4
                            && travel.length === 2
                            && utilities.length === 4
                            && largePurchases.length === 7
                        return new TestResult({passed})
                    }
                    catch (e) {
                        return new TestResult({passed:false,message:e.message})
                    }
                },
                message: "Make sure you're categorizing each expense correctly"
            }
        ]
    }
}
