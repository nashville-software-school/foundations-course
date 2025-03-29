export const functionsReturnWorkingChapter = {
  id: 'functions-return-working',
  title: 'Working with Return Values',
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

Then:
1. Calculate the subtotal for 3 items at $4.99 each
2. Calculate the final total with tax
3. Use console.log to display both the subtotal and the final total
`,
  exercise: {
    starterCode: `// Create calculateSubtotal here


// Create calculateTotal here


// Test your functions:
// 1. Calculate subtotal for 3 items at $4.99 each
// 2. Calculate the final total with tax
// 3. Use console.log to display both results
`,
    solution: `// Create calculateSubtotal here
const calculateSubtotal = (quantity, price) => {
    return quantity * price
}

// Create calculateTotal here
const calculateTotal = (subtotal) => {
    return subtotal * 1.08
}

// Test your functions:
// 1. Calculate subtotal for 3 items at $4.99 each
const subtotal = calculateSubtotal(3, 4.99)
console.log("Subtotal: $" + subtotal.toFixed(2))

// 2. Calculate the final total with tax
const finalTotal = calculateTotal(subtotal)
console.log("Total with tax: $" + finalTotal.toFixed(2))`,
    tests: [
      {
        name: "Subtotal Function Definition",
        test: (code) => {
          try {
            // Check for arrow function syntax
            const hasArrowSyntax = code.includes("=>") &&
                                 (code.includes("const calculateSubtotal =") ||
                                  code.includes("let calculateSubtotal =") ||
                                  code.includes("var calculateSubtotal ="));

            // Check function existence and parameters
            const func = new Function(code + `;
              return typeof calculateSubtotal === "function" && calculateSubtotal.length === 2;
            `);

            return hasArrowSyntax && func();
          } catch (error) {
            return false;
          }
        },
        message: "Make sure you've created an arrow function called 'calculateSubtotal' that takes two parameters (quantity and price)."
      },

      {
        name: "Subtotal Function Behavior",
        test: (code) => {
          try {
            // Test the function's return value with specific inputs
            const func = new Function(code + `;
              // Test several inputs
              const test1 = calculateSubtotal(2, 10) === 20;
              const test2 = calculateSubtotal(3, 4.99).toFixed(2) === "14.97";
              const test3 = calculateSubtotal(1, 5) === 5;

              return test1 && test2 && test3;
            `);

            return func();
          } catch (error) {
            return false;
          }
        },
        message: "Your calculateSubtotal function should multiply quantity and price correctly."
      },

      {
        name: "Total Function Definition",
        test: (code) => {
          try {
            // Check for arrow function syntax
            const hasArrowSyntax = code.includes("=>") &&
                                 (code.includes("const calculateTotal =") ||
                                  code.includes("let calculateTotal =") ||
                                  code.includes("var calculateTotal ="));

            // Check function existence and parameters
            const func = new Function(code + `;
              return typeof calculateTotal === "function" && calculateTotal.length === 1;
            `);

            return hasArrowSyntax && func();
          } catch (error) {
            return false;
          }
        },
        message: "Make sure you've created an arrow function called 'calculateTotal' that takes one parameter (subtotal)."
      },

      {
        name: "Total Function Behavior",
        test: (code) => {
          try {
            // Test the function's return value with specific inputs
            const func = new Function(code + `;
              // Test several inputs
              const test1 = Math.abs(calculateTotal(100) - 108) < 0.01;
              const test2 = Math.abs(calculateTotal(50) - 54) < 0.01;
              const test3 = Math.abs(calculateTotal(14.97) - 16.17) < 0.05;

              return test1 && test2 && test3;
            `);

            return func();
          } catch (error) {
            return false;
          }
        },
        message: "Your calculateTotal function should add 8% tax correctly."
      },

      {
        name: "Functions Working Together",
        test: (code) => {
          try {
            // Test both functions working together
            const func = new Function(code + `;
              // Calculate final total for 3 items at $4.99
              const expected = 16.17; // 3 * 4.99 * 1.08 = 16.17
              const actual = calculateTotal(calculateSubtotal(3, 4.99));

              // Allow for small floating point differences
              return Math.abs(actual - expected) < 0.05;
            `);

            return func();
          } catch (error) {
            return false;
          }
        },
        message: "Make sure your functions work together correctly to calculate the total with tax."
      },

      {
        name: "Using Functions with Variables",
        test: (code) => {
          try {
            // Check if variables are used to store results
            const subtotalVarRegex = /(const|let|var)\s+\w+\s*=\s*calculateSubtotal\s*\(/;
            const totalVarRegex = /(const|let|var)\s+\w+\s*=\s*calculateTotal\s*\(/;

            return subtotalVarRegex.test(code) && totalVarRegex.test(code);
          } catch (error) {
            return false;
          }
        },
        message: "Make sure you store your function results in variables."
      },

      {
        name: "Console Output for Subtotal",
        test: (code) => {
          try {
            // Save original console.log
            const originalConsoleLog = console.log;

            // Track logged messages
            let loggedMessages = [];
            console.log = (...args) => {
              loggedMessages.push(args.join(' '));
            };

            // Execute the code
            new Function(code)();

            // Restore console.log
            console.log = originalConsoleLog;

            // Check if any message contains "Subtotal" or subtotal value
            return loggedMessages.some(msg =>
              (msg.includes("Subtotal") || msg.includes("subtotal")) &&
              (msg.includes("14.97") || msg.includes("14.9") || msg.includes("15"))
            );
          } catch (error) {
            return false;
          }
        },
        message: "Make sure to log the subtotal result to the console."
      },

      {
        name: "Console Output for Total",
        test: (code) => {
          try {
            // Save original console.log
            const originalConsoleLog = console.log;

            // Track logged messages
            let loggedMessages = [];
            console.log = (...args) => {
              loggedMessages.push(args.join(' '));
            };

            // Execute the code
            new Function(code)();

            // Restore console.log
            console.log = originalConsoleLog;

            // Check if any message contains "Total" or "total" and an appropriate value
            return loggedMessages.some(msg =>
              (msg.includes("Total") || msg.includes("total")) &&
              (msg.includes("16.17") || msg.includes("16.1") || msg.includes("16.2"))
            );
          } catch (error) {
            return false;
          }
        },
        message: "Make sure to log the final total with tax to the console."
      }
    ]
  }
}