import { TestResult } from "../../utils/test_utils";

export const functionsReturnIntroChapter = {
  id: 'functions-return-intro',
  title: 'Introduction to Return Values',
  sectionId: 'functions',
  previousChapterId: 'functions-arrow-syntax',
  nextChapterId: 'functions-return-working',
  content: `## Getting Values Back from Functions

So far, our functions have been displaying messages with \`console.log\`. But functions can also give us back values that we can use in other parts of our code. We do this with the \`return\` keyword.

### Understanding Return Values

Think of a function like a delivery service:
- Parameters are like sending ingredients to a restaurant
- The function is like the chef cooking the meal
- The return value is like the finished dish being served

\`\`\`js
const addFive = (number) => {
    return number + 5    // Gives back the number plus 5
}

const result = addFive(10)   // result will be 15
console.log(result)          // Displays: 15
\`\`\`

### The Difference Between Return and Console.log

Let's see the important difference:

\`\`\`js
// This function just displays a value
const showDouble = (number) => {
    console.log(number * 2)
}

// This function returns a value
const getDouble = (number) => {
    return number * 2
}

// Using showDouble - we can only see the result
showDouble(5)   // Displays: 10
// But we can't use the result for anything else

// Using getDouble - we can use the result
const doubled = getDouble(5)  // doubled is now 10
console.log(doubled + 3)      // We can use the result: Displays 13
\`\`\`

### Using Return Values

Return values are useful because we can:
1. Save them in variables
2. Use them in calculations
3. Pass them to other functions

\`\`\`js
const calculateTax = (price) => {
    return price * 0.1    // Returns 10% of the price
}

// Save in a variable
const tax = calculateTax(50)    // tax is 5

// Use in a calculation
const total = 50 + calculateTax(50)   // total is 55

// Pass to another function
console.log(calculateTax(50))   // Displays: 5
\`\`\`

### Return Stops the Function

When a function hits a return statement, it stops running right there:

\`\`\`js
const checkAge = (age) => {
    if (age < 0) {
        return "Invalid age"    // Function stops here if age is negative
    }

    return "Valid age"         // Only runs if age is not negative
}

console.log(checkAge(-5))    // Displays: Invalid age
console.log(checkAge(25))    // Displays: Valid age
\`\`\`

### Key Points About Return Values
- \`return\` gives back a value from a function
- The returned value can be used elsewhere in your code
- \`return\` immediately stops the function
- A function without \`return\` gives back \`undefined\`

## Exercise: Your First Return Value

Create an arrow function called \`makeGreeting\` that takes a name and returns a greeting message. Don't use \`console.log\` - use \`return\` instead!
`,
  exercise: {
    starterCode: `// Create an arrow function that returns "Hello, NAME!"
// For example: makeGreeting("John") should return "Hello, John!"



// Invoke the function and assign the return value to a variable


// Console log the variable you used above to see the greeting

`,
    solution: `// Create an arrow function that returns "Hello, NAME!"
// For example: makeGreeting("John") should return "Hello, John!"
const makeGreeting = (name) => \`Hello, \${name}!\`

// Invoke the function and assign the return value to a variable
const greeting = makeGreeting("John")

// Console log the variable you used above to see the greeting
console.log(greeting)
`,
    tests: [
      {
        name: "Arrow Function Definition",
        test: (code) => {
          try {
            // Check for arrow function syntax
            const hasArrowSyntax = code.includes("=>") &&
              (code.includes("const makeGreeting =") ||
                code.includes("let makeGreeting =") ||
                code.includes("var makeGreeting ="));

            // Check function existence and parameter
            const func = new Function(code + `;
              return typeof makeGreeting === "function" && makeGreeting.length === 1;
            `);

            const passed = hasArrowSyntax && func();
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Make sure you've created an arrow function called 'makeGreeting' that takes one parameter."
      },

      {
        name: "Function Returns Value",
        test: (code) => {
          try {
            // Test the function's return value
            const func = new Function(code + `;
              const result = makeGreeting("Test");
              return typeof result === "string" && result.includes("Hello,") && result.includes("Test");
            `);

            const passed = func();
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Your function should return a string that includes 'Hello,' and the name parameter."
      },

      {
        name: "Function Invocation",
        test: (code) => {
          try {
            // Check if the code calls makeGreeting and assigns the result
            const variableAssignmentRegex = /const\s+\w+\s*=\s*makeGreeting\s*\([^)]*\)/;
            const passed = variableAssignmentRegex.test(code);
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Make sure you invoke the function and assign its return value to a variable."
      },

      {
        name: "Console Output",
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

            // Check if any message contains "Hello," indicating the variable was logged
            const passed = loggedMessages.some(msg => msg.includes("Hello,"));
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Make sure you console.log the variable containing the greeting."
      }
    ]
  }
}