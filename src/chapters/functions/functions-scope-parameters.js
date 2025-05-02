import { TestResult } from "../../utils/test_utils";

export const functionsScopeParametersChapter = {
  id: 'functions-scope-parameters',
  title: 'Parameters and Scope',
  sectionId: 'functions',
  previousChapterId: 'functions-scope-basics',
  nextChapterId: 'functions-conditions',
  content: `## How Parameters Work with Scope

Parameters are special variables that are local to a function. Let's understand how they work with scope and how we can use them effectively.

### Parameters are Local Variables

When you create a parameter, it becomes a local variable in your function:

\`\`\`js
const greet = (name) => {      // 'name' is a local variable
    console.log(\`Hello, \${name}\`)
}

greet("Alex")              // Works: "Hello, Alex"
console.log(name)          // Error! 'name' only exists inside greet
\`\`\`

### Parameters vs Global Variables

What happens when a parameter has the same name as a global variable?

\`\`\`js
const name = "Global Name"    // Global variable

const greet = (name) => {     // Parameter
    // Inside here, 'name' refers to the parameter
    // not the global variable
    console.log(\`Hello, \${name}\`)
}

greet("Alex")                 // Displays: Hello, Alex
console.log(name)             // Displays: Global Name
\`\`\`

### Using Parameters with Other Variables

Parameters can work with both local and global variables:

\`\`\`js
const taxRate = 0.1         // Global variable

const calculateTotal = (price) => {
    const tax = price * taxRate    // Using parameter with global
    const total = price + tax      // Using parameter with local
    return total
}

console.log(calculateTotal(50))    // Displays: 55
\`\`\`

### Modifying Parameters

Changes to parameters don't affect the original values:

\`\`\`js
const doubleNumber = (num) => {
    num = num * 2              // Only changes the local copy
    console.log(\`Inside: \${num}\`)
}

let myNumber = 5
doubleNumber(myNumber)         // Displays: Inside: 10
console.log(myNumber)          // Still displays: 5
\`\`\`

### Parameters in Nested Functions

Inner functions can see parameters from outer functions:

\`\`\`js
const createGame = (playerName) => {
    const start = () => {
        console.log(\`\${playerName} is starting the game\`)
    }

    const end = () => {
        console.log(\`\${playerName} finished the game\`)
    }

    start()
    end()
}

createGame("Mario")
// Displays:
// Mario is starting the game
// Mario finished the game
\`\`\`

### Best Practices for Parameters

1. Give parameters clear, descriptive names
2. Don't rely on global variables if you can use parameters
3. Keep track of what your parameters represent
4. Remember that parameters are local to their function

## Exercise: Score Keeper

Create a score keeping system with parameters and scope. You'll need to:
1. Create an arrow function named \`checkHighScore\` that takes player name and score as parameters
2. Use the global high score variable that's already defined
3. Update the high score when the player's score is higher
4. Return an appropriate message about the result
5. Test your function with multiple calls
`,
  exercise: {
    starterCode: `// The global high score is already defined
let highScore = 0

// Create an arrow function named 'checkHighScore' that:
// 1. Takes playerName and score as parameters
// 2. Compares score to highScore
// 3. Updates highScore if the score is higher
// 4. Returns a message about the result



// Test your function with multiple calls below
// Example: console.log(checkHighScore("Alice", 50))

`,
    solution: `// The global high score is already defined
let highScore = 0

// Create an arrow function named 'checkHighScore' that:
// 1. Takes playerName and score as parameters
// 2. Compares score to highScore
// 3. Updates highScore if the score is higher
// 4. Returns a message about the result
const checkHighScore = (playerName, score) => {
    if (score > highScore) {
        highScore = score
        return \`\${playerName} set a new high score of \${score}!\`
    } else {
        return \`\${playerName} scored \${score}. High score is still \${highScore}\`
    }
}

// Test your function with multiple calls below
console.log(checkHighScore("Alice", 50))
console.log(checkHighScore("Bob", 30))
console.log(checkHighScore("Charlie", 80))`,
    tests: [
      {
        name: "Function Name and Structure",
        test: (code) => {
          try {
            // Check specifically for a function named checkHighScore
            const correctNameRegex = /(const|let|var)\s+checkHighScore\s*=\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>/;
            const passed = correctNameRegex.test(code);
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Make sure you've created an arrow function named 'checkHighScore' that takes two parameters."
      },

      {
        name: "Parameters",
        test: (code) => {
          try {
            // Check if function has exactly two parameters
            const func = new Function(code + `;
              return typeof checkHighScore === "function" && checkHighScore.length === 2;
            `);
            const passed = func();
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Your checkHighScore function should take exactly two parameters: playerName and score."
      },

      {
        name: "Condition Check",
        test: (code) => {
          try {
            // Look for a condition comparing score to highScore
            const hasComparison = code.includes('score >') ||
                                 code.includes('> highScore') ||
                                 code.includes('highScore <') ||
                                 code.includes('< score');

            const passed = hasComparison;
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Your function should compare the score parameter to the highScore variable."
      },

      {
        name: "Return Values",
        test: (code) => {
          try {
            // Look for return statements in conditional blocks
            const hasDifferentReturns =
              (code.match(/return/g) || []).length >= 2 ||  // Multiple returns
              (code.includes('return') && code.includes('if') && code.includes('else')); // Return in conditional

            const passed = hasDifferentReturns;
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Your function should return different messages depending on whether a high score was achieved."
      },

      {
        name: "Function Calls",
        test: (code) => {
          try {
            // Count checkHighScore function calls (at least 2 needed)
            const callPattern = /checkHighScore\s*\(/g;
            const calls = code.match(callPattern) || [];

            const passed = calls.length >= 2;
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Test your function by calling checkHighScore at least twice with different values."
      },

      {
        name: "Functional Test",
        test: (code) => {
          try {
            // This test runs a functional test of the student's implementation

            // Save original console.log
            const originalLog = console.log;
            console.log = () => {};

            try {
              // Execute and test the student's function
              const func = new Function(code + `;
                // Test sequence
                checkHighScore("Test1", 5000);  // Sets highScore to 5000
                if (highScore !== 5000) return new TestResult({passed:false,message:"High score not updated correctly"});

                checkHighScore("Test2", 25);  // Shouldn't change highScore
                if (highScore !== 5000) return new TestResult({passed:false,message:"High score changed when it shouldn't have"});

                checkHighScore("Test3", 7500);  // Updates highScore to 7500
                const passed = highScore === 7500;
                return {passed, message: "High score updated correctly"};
              `);

              const result = func();

              // Restore console.log
              console.log = originalLog;

              return new TestResult({passed:result.passed,message:result.message});
            } catch (error) {
              // Restore console.log in case of error
              console.log = originalLog;
              return new TestResult({passed:false,message:error.message});
            }
          } catch (error) {
            console.log = console.log || (() => {});
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Your function should update the high score when beaten but leave it unchanged otherwise."
      }
    ]
  }
}