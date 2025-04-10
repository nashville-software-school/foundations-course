import { TestResult } from "../../utils/test_utils";

export const functionsScopeBasicsChapter = {
  id: 'functions-scope-basics',
  title: 'Understanding Scope Basics',
  sectionId: 'functions',
  previousChapterId: 'functions-return-practice',
  nextChapterId: 'functions-scope-parameters',
  content: `## Understanding Variable Scope

When we write functions, it's important to understand which variables our code can "see" and use. This is called **scope** - the area where a variable can be accessed.

### Local Variables (Function Scope)

Variables created inside a function can only be used inside that function:

\`\`\`js
const calculateTotal = () => {
    const tax = 0.1          // Local variable
    const price = 50         // Local variable
    const total = price + (price * tax)
    console.log(total)
}

calculateTotal()             // Works fine
console.log(tax)            // Error! Can't see 'tax' out here
console.log(price)          // Error! Can't see 'price' out here
\`\`\`

### Global Variables

Variables created outside any function can be used anywhere:

\`\`\`js
const taxRate = 0.1         // Global variable

const calculateTotal = (price) => {
    // We can use taxRate here
    const total = price + (price * taxRate)
    return total
}

// We can also use taxRate here
console.log(\`Tax rate is: \${taxRate}\`)
\`\`\`

### Why Scope Matters

Scope helps us:
1. Keep our variables organized
2. Prevent naming conflicts
3. Control what parts of our code can see what variables

\`\`\`js
// This works fine - each function has its own 'message'
const sayHello = () => {
    const message = "Hello!"
    console.log(message)
}

const sayGoodbye = () => {
    const message = "Goodbye!"
    console.log(message)
}

sayHello()      // Displays: Hello!
sayGoodbye()    // Displays: Goodbye!
\`\`\`

### Scope Rules

1. Local variables can only be used in their function
2. Global variables can be used anywhere
3. Each function creates its own scope
4. Inner scopes can see outer variables

\`\`\`js
const playerName = "Mario"    // Global

const startGame = () => {
    const lives = 3          // Local to startGame
    console.log(\`\${playerName} starts with \${lives} lives\`)

    const loseLife = () => {
        const remaining = lives - 1    // Can see 'lives' from outer function
        console.log(\`\${playerName} has \${remaining} lives left\`)
    }
}
\`\`\`

### Best Practices

1. Prefer local variables when possible
2. Use clear, unique names
3. Be careful with global variables
4. Keep track of what scope you're in

## Exercise: Fix the Scope

The code below has some scope problems. Fix them by moving variables to the right place or making them accessible where needed. You'll need to:

1. Make sure the score variable is declared in the correct scope
2. Use the right variable type so the score can be updated
3. Make sure both functions can access and modify the score variable
`,
  exercise: {
    starterCode: `// This code has scope problems!
const displayScore = () => {
    console.log("Score: " + score)
}

const updateScore = () => {
    score = score + 100
}

const score = 0
displayScore()
updateScore()
displayScore()`,
    solution: `// This code has scope problems!
let score = 0    // Changed to let since we're updating it

const displayScore = () => {
    console.log(\`Score: \${score}\`)
}

const updateScore = () => {
    score = score + 100
}

displayScore()
updateScore()
displayScore()`,
    tests: [
      {
        name: "Global Score Variable",
        test: (code) => {
          try {
            // Check if score is declared at the global level (outside functions)
            const functionCode = code.match(/const\s+\w+\s*=\s*\(\)\s*=>\s*{[^}]*}/g) || [];
            const codeWithoutFunctions = functionCode.reduce((acc, func) => acc.replace(func, ''), code);

            // Check if score is declared with let or var (not const)
            const passed = (codeWithoutFunctions.includes('let score = 0') ||
                   codeWithoutFunctions.includes('var score = 0'));
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Make sure score is declared as a global variable using 'let' (not 'const') since its value will change."
      },

      {
        name: "Functions Access Score",
        test: (code) => {
          try {
            // Run the code and check if it executes without errors
            // We need to capture console.log output
            const originalConsoleLog = console.log;

            let loggedMessages = [];
            console.log = (...args) => {
              loggedMessages.push(args.join(' '));
            };

            // Execute the code
            new Function(code)();

            // Restore console.log
            console.log = originalConsoleLog;

            // Check if displayScore successfully logs a value both times
            const passed = loggedMessages.length >= 2 &&
                  loggedMessages[0].includes('Score: 0') &&
                  loggedMessages[1].includes('Score: 100');
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Your code should run without errors, showing 'Score: 0' first and 'Score: 100' after updating."
      },

      {
        name: "Function Declarations",
        test: (code) => {
          try {
            // Check if both functions are declared correctly as arrow functions
            const displayScoreRegex = /const\s+displayScore\s*=\s*\(\)\s*=>/;
            const updateScoreRegex = /const\s+updateScore\s*=\s*\(\)\s*=>/;

            const passed = displayScoreRegex.test(code) && updateScoreRegex.test(code);
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Make sure both functions are declared with arrow function syntax."
      },

      {
        name: "Functions Execute Correctly",
        test: (code) => {
          try {
            // Create a test environment
            const testFunc = new Function(code.replace(/console\.log/g, '// console.log') + `
              // Return values to check
              return {
                initialScore: typeof score === 'number' ? score : undefined,
                // Reset score to test
                finalCheck: (function() {
                  score = 0;
                  displayScore();
                  updateScore();
                  return score === 100;
                })()
              };
            `);

            const result = testFunc();
            const passed = result.initialScore === 100 && result.finalCheck === true;
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Make sure your updateScore function correctly adds 100 to the score variable."
      },

      {
        name: "No Local Score Variables",
        test: (code) => {
          try {
            // Check if score is redeclared inside functions
            const displayScoreFunc = code.match(/const\s+displayScore\s*=\s*\(\)\s*=>[\s\n]*{([^}]*)}/)?.[1] || '';
            const updateScoreFunc = code.match(/const\s+updateScore\s*=\s*\(\)\s*=>[\s\n]*{([^}]*)}/)?.[1] || '';

            const passed = !displayScoreFunc.includes('let score') &&
                  !displayScoreFunc.includes('const score') &&
                  !displayScoreFunc.includes('var score') &&
                  !updateScoreFunc.includes('let score') &&
                  !updateScoreFunc.includes('const score') &&
                  !updateScoreFunc.includes('var score');
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Don't declare 'score' inside the functions - they should both use the global score variable."
      }
    ]
  }
}