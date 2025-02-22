export const functionsReturnWorkingChapter = {
  id: 'functions-return-working',
  title: 'Working with Return Values',
  path: '/functions-return-working',
  sectionId: 'functions',
  previousChapterId: 'functions-return-intro',
  nextChapterId: 'functions-return-practice',
  content: `## Using Values from Functions

Now that we know functions can return values, let's explore the different ways we can use these values in our code.

### Storing Return Values

The most common way to use a return value is to store it in a variable:

\`\`\`js
const calculateArea = (width, height) => {
    return width * height
}

// Store the return value in a variable
const roomArea = calculateArea(10, 12)
console.log("The room is " + roomArea + " square feet")
\`\`\`

### Using Return Values in Calculations

We can use return values directly in calculations:

\`\`\`js
const getPrice = (item) => {
    if (item === "book") {
        return 9.99
    } else if (item === "pen") {
        return 1.99
    } else {
        return 0
    }
}

// Calculate total for 3 books
const bookTotal = getPrice("book") * 3
console.log("Three books cost: $" + bookTotal)

// Calculate total for 2 books and 3 pens
const total = (getPrice("book") * 2) + (getPrice("pen") * 3)
console.log("Total order: $" + total)
\`\`\`

### Chaining Function Results

We can use the return value from one function as an argument for another:

\`\`\`js
const addTax = (price) => {
    return price * 1.1    // Adds 10% tax
}

const formatPrice = (price) => {
    return "$" + price.toFixed(2)   // Adds $ and fixes decimals
}

// Use the functions together
const basePrice = 19.99
const withTax = addTax(basePrice)
const formatted = formatPrice(withTax)
console.log(formatted)    // Displays: $21.99

// Or chain them directly
console.log(formatPrice(addTax(19.99)))   // Same result!
\`\`\`

### Using Return Values in Conditions

Return values work great in if statements:

\`\`\`js
const isOldEnough = (age) => {
    return age >= 16
}

const canDrive = (age) => {
    if (isOldEnough(age)) {
        console.log("Yes, you can drive!")
    } else {
        console.log("Sorry, not yet")
    }
}

canDrive(15)    // Displays: Sorry, not yet
canDrive(17)    // Displays: Yes, you can drive!
\`\`\`

### Different Ways to Use Return Values

Here's a summary of what you can do with return values:

1. Store them in variables
2. Use them in calculations
3. Pass them to other functions
4. Use them in conditions
5. Display them with console.log

## Exercise: Shopping Cart Functions

Create two arrow functions that work together to calculate a shopping total:
1. \`calculateSubtotal\` - takes quantity and price, returns their product
2. \`calculateTotal\` - takes a subtotal, adds 8% tax, and returns the final amount
`,
  exercise: {
    starterCode: `// Create calculateSubtotal here


// Create calculateTotal here


// Test your functions:
// 1. Calculate subtotal for 3 items at $4.99 each
// 2. Calculate the final total with tax
`,
    solution: `const calculateSubtotal = (quantity, price) => {
    return quantity * price
}

const calculateTotal = (subtotal) => {
    return subtotal * 1.08
}

const subtotal = calculateSubtotal(3, 4.99)
const finalTotal = calculateTotal(subtotal)`,
    tests: [
      {
        name: "Subtotal Function",
        test: (code) => {
          return code.includes('const calculateSubtotal') &&
                 code.includes('=>') &&
                 code.includes('quantity') &&
                 code.includes('price') &&
                 code.includes('return') &&
                 code.includes('*')
        },
        message: "Make sure calculateSubtotal is an arrow function that multiplies quantity and price"
      },
      {
        name: "Total Function",
        test: (code) => {
          return code.includes('const calculateTotal') &&
                 code.includes('=>') &&
                 code.includes('subtotal') &&
                 code.includes('return') &&
                 code.includes('1.08')
        },
        message: "Make sure calculateTotal is an arrow function that adds 8% tax to the subtotal"
      },
      {
        name: "Using Functions",
        test: (code) => {
          return code.includes('calculateSubtotal(3, 4.99)') &&
                 code.includes('calculateTotal(subtotal)')
        },
        message: "Make sure you're testing your functions with the correct values"
      }
    ]
  }
}