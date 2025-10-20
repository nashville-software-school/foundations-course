import { TestResult } from "@nss-workshops/nss-core";

export const functionsParametersChapter = {
  id: 'functions-parameters',
  title: 'Introducing Parameters',
  sectionId: 'functions',
  previousChapterId: 'functions-naming',
  nextChapterId: 'functions-arguments',
  content: `## Making Functions Flexible with Parameters

Parameters make our functions more flexible by letting them work with different values each time we use them.

### Understanding Parameters

Think of a parameter as a special variable that a function can use. When we define a function, we can add parameters inside the parentheses:

\`\`\`js
function greet(name) {
    console.log(\`Hello \${name}!\`)
}
\`\`\`

In this example:
- \`name\` is a parameter
- It's like a placeholder that will be filled in when we use the function
- We can use this parameter inside our function just like a regular variable

### Parameters Make Functions Reusable

Without parameters:
\`\`\`js
// We'd need separate functions for each name
function greetJohn() {
    console.log("Hello, John!")
}

function greetSarah() {
    console.log("Hello, Sarah!")
}
\`\`\`

With parameters:
\`\`\`js
// One function works for any name!
function greet(name) {
    console.log(\`Hello, \${name}!\`)
}

// We can use it with different names
greet("John")   // Displays: Hello, John!
greet("Sarah")  // Displays: Hello, Sarah!
greet("Miguel") // Displays: Hello, Miguel!
\`\`\`

### Parameters vs No Parameters

Let's compare functions with and without parameters:

\`\`\`js
// Without parameters - can only do one specific thing
function sayGoodMorning() {
    console.log("Good morning!")
}

// With a parameter - flexible and reusable
function sayTimeOfDay(timeOfDay) {
    console.log(\`Good \${timeOfDay}!\`)
}

// The function with parameters is more flexible
sayTimeOfDay("morning")  // Displays: Good morning!
sayTimeOfDay("evening")  // Displays: Good evening!
sayTimeOfDay("night")    // Displays: Good night!
\`\`\`

### Key Points About Parameters
- Parameters make functions more flexible
- They work like variables inside the function
- You can name parameters anything (but use clear, descriptive names)
- Parameters let one function work with different values

## Exercise: Add a Parameter

The function below always says the same thing. Modify it to use a parameter so it can work with different activities.
`,
  exercise: {
    starterCode: `/*
  Currently this function can only talk about running.
  Change it to work with any activity.
*/
function describeActivity() {
    console.log("I love running!")
}

`,
    solution: `function describeActivity(activity) {
    console.log(\`I love \${activity}!\`)
}`,
    tests: [
      {
        name: "Function Has Parameter",
        test: (code) => {
          try {
            // Check if the function is defined with a parameter
            const functionMatch = code.match(/function\s+describeActivity\s*\(\s*([a-zA-Z][a-zA-Z0-9]*)\s*\)/);
            const passed = functionMatch !== null && functionMatch[1].length > 0;
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Make sure your function has a parameter. Example: function describeActivity(activity) { ... }"
      },
      {
        name: "Parameter Used in Output",
        test: (code) => {
          try {
            // Extract the parameter name
            const paramMatch = code.match(/function\s+describeActivity\s*\(\s*([a-zA-Z][a-zA-Z0-9]*)\s*\)/);
            if (!paramMatch) return new TestResult({passed: false});

            const paramName = paramMatch[1];

            // Check if the parameter is used in the console.log statement
            const passed = code.includes(`console.log`) &&
              (code.includes(`+ ${paramName} +`) ||
                code.includes(`+${paramName}+`) ||
                code.includes(`\${${paramName}}`) ||  // Template literals
                code.includes(`, ${paramName},`));    // console.log format strings
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Make sure you're using the parameter in your console.log message to make the function flexible."
      },
      {
        name: "Function Works with Different Activities",
        test: (code) => {
          try {
            // Replace console.log with a return statement for testing
            code = code.replace(/console\.log\s*\(\s*["'`]I love /g, "return `I love ");
            // Replace closing parenthesis with a closing backtick
            // Replace the `) character sequence with just a backtick
            code = code.replace(/`\)\s*}/g, "`}");

            const evalFunction = new Function(`${code}; return describeActivity`)();
            // Test the function with different activities
            const activities = ["running", "swimming", "reading"];
            for (const activity of activities) {
              const output = evalFunction(activity);
              if (!output.includes(`I love ${activity}!`)) {
                return new TestResult({passed: false});
              }
            }

            return new TestResult({passed: true});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Your function should work with any activity. Make sure you're using the parameter correctly."
      },
      {
        name: "Output Format is Correct",
        test: (code) => {
          try {
            // Extract the parameter name
            const paramMatch = code.match(/function\s+describeActivity\s*\(\s*([a-zA-Z][a-zA-Z0-9]*)\s*\)/);
            if (!paramMatch) return new TestResult({passed: false});

            const paramName = paramMatch[1];

            // Check if the output format matches "I love [activity]!"
            const passed = code.includes(`console.log`) &&
              (code.includes(`"I love " + ${paramName} + "!"`) ||
                code.includes(`'I love ' + ${paramName} + '!'`) ||
                code.includes("`I love ${") || // Check for template literal pattern
                code.match(/console\.log\s*\(\s*["'`]I love /)); // Check beginning of string
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Make sure your output format is correct: 'I love [activity]!'"
      }
    ]
  }
}