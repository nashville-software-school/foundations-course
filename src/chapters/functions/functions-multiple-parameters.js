import { TestResult } from "../../utils/test_utils";

export const functionsMultipleParametersChapter = {
  id: 'functions-multiple-parameters',
  title: 'Multiple Parameters',
  sectionId: 'functions',
  previousChapterId: 'functions-arguments',
  nextChapterId: 'functions-return-intro',
  content: `## Working with Multiple Parameters

Sometimes a function needs more than one piece of information to do its job. We can give functions multiple parameters by separating them with commas.

### Adding More Parameters

Here's how to create a function with multiple parameters:

\`\`\`js
//                       First      Second
//                     parameter   parameter
//                         ↓           ↓
function createFullName(firstName, lastName) {
    console.log(\`\${firstName} \${lastName}\`)
}

createFullName("John", "Smith")  // Displays: John Smith
\`\`\`

### Parameter Order Matters

When using multiple parameters, the order is important. The arguments you provide must match the order of the parameters:

\`\`\`js
function showPrice(item, price) {
    console.log(\`The \${item} costs \$\${price}\`)
}

// Correct order
showPrice("shirt", 25)      // Displays: The shirt costs $25

// Wrong order
showPrice(25, "shirt")      // Displays: The 25 costs $shirt
\`\`\`

### Real World Example

Here's a more complex example using multiple parameters:

\`\`\`js
function calculateRectangle(width, height) {
    const area = width * height
    const perimeter = 2 * (width + height)

    console.log(\`Area: \${area}\`)
    console.log(\`Perimeter: \${perimeter}\`)
}

// Calculate for a rectangle that is 5 units wide and 3 units tall
calculateRectangle(5, 3)

// Produces the following output
// Area: 15
// Perimeter: 16
\`\`\`

### Keeping Track of Parameters

When working with multiple parameters:
1. List them in a logical order
2. Give them clear, descriptive names
3. Try to keep the number of parameters small
4. Remember their order when using the function

\`\`\`js
// Hard to remember parameter order
function process(x, y, z, a, b) {
    // ...
}

// Much clearer!
function createUser(name, age, email) {
    console.log("Creating user:")
    console.log(\`Name: \${name}\`)
    console.log(\`Age: \${age}\`)
    console.log(\`Email: \${email}\`)
}

createUser("Sarah Johnson", 28, "sarah@email.com")
\`\`\`

### Common Patterns with Multiple Parameters

Here are some common ways functions use multiple parameters:

\`\`\`js
// Math operations
function add(number1, number2) { }

// User information
function updateProfile(username, email) { }

// Game scores
function updateScore(playerName, points) { }

// Messages
function sendMessage(recipient, message) { }
\`\`\`

## Exercise: Create a Game Score Function

Create a function named \`displayGameScore\` that displays a player's game score. It should take two parameters:

1. The player's name
2. The number of points they scored

The function should display a message like: "Mario scored 100 points!"
`,
  exercise: {
    starterCode: `/*
  Create your function here with two parameters.
  Remember to use both parameters in the message.
*/


// Then invoke the function with different player names and scores

`,
    solution: `/*
  Create your function here with two parameters.
  Remember to use both parameters in the message.
*/
function displayGameScore(playerName, points) {
    console.log(playerName + " scored " + points + " points!")
}


// Then invoke the function with different player names and scores
displayGameScore("William", 100)
displayGameScore("Elizabeth", 50)
displayGameScore("Jamal", 75)


`,
    tests: [
      // Simplified tests for the displayGameScore function
      {
        name: "Function Existence",
        test: (code) => {
          try {
            // Check if displayGameScore function exists
            const func = new Function(code + '; return typeof displayGameScore === "function";');
            const passed = func();
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Make sure you've created a function named 'displayGameScore'."
      },

      {
        name: "Parameter Count",
        test: (code) => {
          try {
            // Check if displayGameScore has 2 parameters
            const func = new Function(code + '; return displayGameScore.length;');
            const passed = func() === 2;
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Your displayGameScore function should have exactly two parameters."
      },

      {
        name: "Function Output with Mario",
        test: (code) => {
          try {
            // Save original console.log
            const originalConsoleLog = console.log;

            // Track logged messages
            let loggedMessages = [];
            console.log = (...args) => {
              loggedMessages.push(args.join(' '));
            };

            // Execute the code with "Mario" and 100
            new Function(code + '; displayGameScore("Mario", 100);')();

            // Restore console.log
            console.log = originalConsoleLog;

            // Check if output contains both "Mario" and "100" and "points"
            const passed = loggedMessages.some(msg =>
              msg.includes('Mario') &&
              msg.includes('100') &&
              msg.includes('points')
            );
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Your function should output a message that includes 'Mario', '100', and 'points'."
      },

      {
        name: "Function Output with Luigi",
        test: (code) => {
          try {
            // Save original console.log
            const originalConsoleLog = console.log;

            // Track logged messages
            let loggedMessages = [];
            console.log = (...args) => {
              loggedMessages.push(args.join(' '));
            };

            // Execute the code with "Luigi" and 50
            new Function(code + '; displayGameScore("Luigi", 50);')();

            // Restore console.log
            console.log = originalConsoleLog;

            // Check if output contains both "Luigi" and "50"
            const passed = loggedMessages.some(msg =>
              msg.includes('Luigi') &&
              msg.includes('50')
            );
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Your function should work with different names and scores."
      },

      {
        name: "Function Uses Parameters",
        test: (code) => {
          try {
            // Save original console.log
            console.clear()
            const originalConsoleLog = console.log;

            // Track logged messages for different inputs
            let firstCall = [];
            let secondCall = [];

            // First test with Mario/100
            console.log = (...args) => {
              firstCall.push(args.join(' '));
            };
            new Function(code + '; displayGameScore("Mario", 100);')();

            // Second test with Luigi/50
            console.log = (...args) => {
              secondCall.push(args.join(' '));
            };
            new Function(code + '; displayGameScore("Luigi", 50);')();

            // Restore console.log
            console.log = originalConsoleLog;

            // Make sure outputs are different, confirming parameters are used
            const passed = firstCall.length > 0 &&
              secondCall.length > 0 &&
              firstCall[firstCall.length-1] !== secondCall[firstCall.length-1];
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Your function should use both parameters to create different outputs for different inputs."
      }

    ]
  }
}