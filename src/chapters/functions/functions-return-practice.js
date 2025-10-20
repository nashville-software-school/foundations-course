import { TestResult } from "@nss-workshops/nss-core";

export const functionsReturnPracticeChapter = {
    id: 'functions-return-practice',
    title: 'Return Value Practice',
    sectionId: 'functions',
    previousChapterId: 'functions-return-working',
    nextChapterId: 'functions-scope-basics',
    content: `## Practicing with Return Values

  Let's get more practice with return values by solving some real-world problems. We'll see different types of values that functions can return and how to use them.

  ### Returning Different Types

  Functions can return any type of value:

  \`\`\`js
  // Returning a number
  const calculateDiscount = (price) => {
      return price * 0.2    // Returns 20% of the price
  }

  // Returning a string
  const getGreeting = (timeOfDay) => {
      if (timeOfDay === "morning") {
          return "Good morning!"
      } else if (timeOfDay === "afternoon") {
          return "Good afternoon!"
      } else {
          return "Good evening!"
      }
  }

  // Returning a boolean
  const isOnSale = (price) => {
      return price < 20    // Returns true if price is less than 20
  }
  \`\`\`

  ### Building More Complex Functions

  Let's combine what we've learned to build useful functions:

  \`\`\`js
  const calculateGrade = (score) => {
      if (score >= 90) {
          return "A"
      } else if (score >= 80) {
          return "B"
      } else if (score >= 70) {
          return "C"
      } else if (score >= 60) {
          return "D"
      } else {
          return "F"
      }
  }

  const isPassing = (score) => {
      // Use the previous function's result
      const grade = calculateGrade(score)
      return grade !== "F"    // Returns true for any grade except F
  }

  // Using both functions
  const studentScore = 85
  console.log(\`Grade: \${calculateGrade(studentScore)}\`)  // Displays: Grade: B
  console.log(\`Passing: \${isPassing(studentScore)}\`)     // Displays: Passing: true
  \`\`\`

  ### When to Use Return Values

  Return values are great for:
  1. Calculations that you'll use later
  2. Checking conditions (true/false)
  3. Creating formatted text
  4. Converting data from one form to another

  \`\`\`js
  // Calculation example
  const celsiusToFahrenheit = (celsius) => {
      return (celsius * 9/5) + 32
  }

  // Condition example
  const canRideRollerCoaster = (height, age) => {
      return height >= 48 && age >= 12
  }

  // Text formatting example
  const formatPhoneNumber = (number) => {
      return \`(\${number.slice(0,3)}) \${number.slice(3,6)}-\${number.slice(6)}\`
  }

  // Data conversion example
  const letterToNumber = (grade) => {
      if (grade === "A") return 4
      if (grade === "B") return 3
      if (grade === "C") return 2
      if (grade === "D") return 1
      return 0
  }
  \`\`\`

  ## Exercise: Game Score Calculator

  Create an arrow function called \`calculateGameScore\` that:
  1. Takes base points and bonus multiplier as parameters
  2. Calculates total points (base points × multiplier)
  3. Returns "High Score!" if total is 1000 or more, otherwise returns "Keep trying!"

  After creating your function:
  1. Call it with different values to test both outcomes
  2. Store a result in a variable
  3. Log the variable to display your result
  `,
    exercise: {
      starterCode: `// Create your arrow function here
  // Example: calculateGameScore(500, 2.5) should return "High Score!"
  // because 500 × 2.5 = 1250, which is >= 1000


  // Call your function with different values and store a result in a variable


  // Log the result to see the output

  `,
      solution: `// Create your arrow function here
  const calculateGameScore = (points, multiplier) => {
      const total = points * multiplier
      if (total >= 1000) {
          return "High Score!"
      } else {
          return "Keep trying!"
      }
  }

  // Call your function with different values and store a result in a variable
  const result1 = calculateGameScore(500, 2.5)
  const result2 = calculateGameScore(400, 2)

  // Log the result to see the output
  console.log(\`Result 1: \${result1}\`)
  console.log(\`Result 2: \${result2}\`)`,
      tests: [
        {
          name: "Function Definition",
          test: (code) => {
            try {
              // Check for arrow function syntax and name
              const hasArrowSyntax = code.includes("=>") &&
                                   (code.includes("const calculateGameScore =") ||
                                    code.includes("let calculateGameScore =") ||
                                    code.includes("var calculateGameScore ="));

              // Check function existence and parameters
              const func = new Function(code + `;
                return typeof calculateGameScore === "function" && calculateGameScore.length === 2;
              `);

              const passed = hasArrowSyntax && func();
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Make sure you've created an arrow function called 'calculateGameScore' that takes two parameters."
        },

        {
          name: "High Score Result",
          test: (code) => {
            try {
              // Test the function returns "High Score!" for high values
              const func = new Function(code + `;
                return calculateGameScore(500, 2.5) === "High Score!";
              `);

              const passed = func();
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Your function should return 'High Score!' when the total is 1000 or more."
        },

        {
          name: "Keep Trying Result",
          test: (code) => {
            try {
              // Test the function returns "Keep trying!" for low values
              const func = new Function(code + `;
                return calculateGameScore(300, 2) === "Keep trying!";
              `);

              const passed = func();
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Your function should return 'Keep trying!' when the total is less than 1000."
        },

        {
          name: "Calculation Logic",
          test: (code) => {
            try {
              // Test the calculation logic with a borderline case
              const func = new Function(code + `;
                // Test exactly 1000 (should be High Score)
                const test1 = calculateGameScore(500, 2) === "High Score!";

                // Test just under 1000 (should be Keep trying)
                const test2 = calculateGameScore(499, 2) === "Keep trying!";

                return test1 && test2;
              `);

              const passed = func();
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Make sure your function correctly calculates the total points and compares it to 1000."
        },

        {
          name: "Storing Function Result",
          test: (code) => {
            try {
              // Check if variable stores function result
              const variableAssignmentRegex = /(const|let|var)\s+\w+\s*=\s*calculateGameScore\s*\([^)]*\)/;
              const passed = variableAssignmentRegex.test(code);
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Make sure you store a function result in a variable."
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

              // Check if any message contains "High Score!" or "Keep trying!"
              const passed = loggedMessages.some(msg =>
                msg.includes("High Score!") || msg.includes("Keep trying!")
              );
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Make sure you log the result of your function to the console."
        }
      ]
    }
  }