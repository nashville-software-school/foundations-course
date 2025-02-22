export const functionsArrowSyntaxChapter = {
  id: "functions-arrow-syntax",
  title: "Arrow Function Syntax",
  sectionId: "functions",
  content: `
# Arrow Function Syntax

JavaScript provides a more concise way to write functions using what's called "arrow function syntax". This modern syntax was introduced in ES6 (ECMAScript 2015) and has become very popular among JavaScript developers.

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

Arrow functions have a special "concise body" syntax when the function body is a single expression:

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
}`,
    tests: [
      {
        name: "Convert add function",
        test: (code) => {
          return code.includes("const add = (x, y) =>") || code.includes("let add = (x, y) =>") || code.includes("var add = (x, y) =>");
        },
        message: "Convert the add function to use arrow syntax"
      },
      {
        name: "Convert greet function",
        test: (code) => {
          return code.includes("const greet = ") && code.includes("=>") && code.includes("name");
        },
        message: "Convert the greet function to use arrow syntax"
      },
      {
        name: "Convert getRandomNumber function",
        test: (code) => {
          return code.includes("const getRandomNumber = () =>") || code.includes("let getRandomNumber = () =>") || code.includes("var getRandomNumber = () =>");
        },
        message: "Convert the getRandomNumber function to use arrow syntax"
      }
    ]
  },
  nextChapterId: "functions-return-intro",
  previousChapterId: "functions-multiple-parameters"
}