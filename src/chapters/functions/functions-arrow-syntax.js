import { TestResult } from "../../utils/test_utils";

export const functionsArrowSyntaxChapter = {
  id: "functions-arrow-syntax",
  title: "Arrow Function Syntax",
  sectionId: "functions",
  content: `JavaScript provides an alternative way to write functions using what's called "arrow function syntax". This modern syntax was introduced in ES6 (ECMAScript 2015) and has become very popular among JavaScript developers.

## The Arrow Function Syntax

Here's how we convert a traditional function to an arrow function:

\`\`\`javascript
// Traditional function
function add(x, y) {
    return x + y
}

// Same function as an arrow function
const add = (x, y) => {
    return x + y
}
\`\`\`

The arrow function syntax:
1. Removes the \`function\` keyword
2. Uses an arrow (\`=>\`) between the parameters and the function body
3. Is typically assigned to a variable using \`const\`

## Shorter Syntax for Simple Functions

Arrow functions have a special "concise body" syntax when the function body is a single expression. It is important to note that this only works when the function body is a single expression that returns a value. In this case, we can omit the curly braces and the \`return\` keyword.

\`\`\`javascript
// Traditional function
function double(number) {
    return number * 2
}

// Arrow function with regular syntax
const double = (number) => {
    return number * 2
}

// Arrow function with concise syntax
const double = number => number * 2

/*
 This function cannot be written in concise
 syntax because it has multiple lines
*/
const calculateTaxes = (income) => {
    const taxRate = 0.2
    const adjustedIncome = income * taxRate
    return adjustedIncome
}
\`\`\`

Notice in the concise syntax:
1. We removed the curly braces \`{}\`
2. We removed the \`return\` keyword
3. For a single parameter, we can remove the parentheses
4. The expression after the arrow is automatically returned

## When to Use Parentheses

For parameters:
- No parameters: Empty parentheses are required
- One parameter: Parentheses are optional
- Multiple parameters: Parentheses are required

\`\`\`javascript
// No parameters - parentheses required
const sayHello = () => "Hello!"

// One parameter - parentheses optional
const double = number => number * 2
const square = (number) => number * number

// Multiple parameters - parentheses required
const add = (x, y) => x + y
\`\`\`

## When to Use Curly Braces

Use curly braces and the \`return\` keyword when:
1. You have multiple lines of code
2. You need to do more than just return a value

\`\`\`javascript
// Multiple lines need curly braces and return
const calculateTotal = (price, tax) => {
    const taxAmount = price * tax
    return price + taxAmount
}

// Single expression can use concise syntax
const calculateTotal = (price, tax) => price + (price * tax)
\`\`\`

From this point forward, we'll be using arrow function syntax in our examples as it's the more modern approach to writing JavaScript functions.
`,
  exercise: {
    starterCode: `// Convert these traditional functions to arrow functions

function add(x, y) {
    return x + y
}

function greet(name) {
    return "Hello, " + name + "!"
}

function getRandomNumber() {
    return Math.random()
}

// After converting, test your functions by invoking them here
`,
    tests: [
      {
        name: "Convert add function",
        test: (code) => {
          try {
            // Check for arrow syntax
            const hasArrowSyntax = code.includes("=>") &&
              (code.includes("const add =") ||
                code.includes("let add =") ||
                code.includes("var add ="));

            // Test functionality by executing the function
            const func = new Function(code + `;
          if (typeof add !== "function") {
            return false;
          }
          return add(5, 3) === 8;
        `);

            const passed =  hasArrowSyntax && func();
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Convert the add function to use arrow syntax. Make sure it still adds two numbers correctly."
      },

      {
        name: "Convert greet function",
        test: (code) => {
          try {
            // Check for arrow syntax
            const hasArrowSyntax = code.includes("=>") &&
              (code.includes("const greet =") ||
                code.includes("let greet =") ||
                code.includes("var greet ="));

            // Test functionality
            const func = new Function(code + `;
          if (typeof greet !== "function") {
            return false;
          }
          return greet("Alice") === "Hello, Alice!";
        `);
            return new TestResult({passed:hasArrowSyntax && func()});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Convert the greet function to use arrow syntax. Make sure it still returns the correct greeting."
      },

      {
        name: "Convert getRandomNumber function",
        test: (code) => {
          try {
            // Check for arrow syntax with empty parentheses
            const hasArrowSyntax = (code.includes("const getRandomNumber = () =>") ||
              code.includes("let getRandomNumber = () =>") ||
              code.includes("var getRandomNumber = () =>"));

            // Test functionality
            const func = new Function(code + `;
          if (typeof getRandomNumber !== "function") {
            return false;
          }
          const result = getRandomNumber();
          return typeof result === "number" && result >= 0 && result < 1;
        `);

            const passed =  hasArrowSyntax && func();
            return new TestResult({passed})
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Convert the getRandomNumber function to use arrow syntax with empty parentheses. Make sure it still returns a random number."
      },

      {
        name: "Use of concise syntax",
        test: (code) => {
          try {
            // Check if at least one function uses concise syntax (no curly braces)
            // We'll look for arrow functions without curly braces
            const arrowFuncRegex = /=>\s*[^{]/;
            const passed = arrowFuncRegex.test(code);
            return new TestResult({passed})
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Try using the concise arrow syntax (without curly braces) for at least one of your functions."
      },

      {
        name: "All functions are converted",
        test: (code) => {
          try {
            // Make sure there are no traditional function declarations left
            const passed = !code.includes("function add") &&
              !code.includes("function greet") &&
              !code.includes("function getRandomNumber");
              return new TestResult({passed})
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Make sure you've converted all three functions to arrow syntax."
      }
    ]
  },
  nextChapterId: "functions-return-intro",
  previousChapterId: "functions-multiple-parameters"
}