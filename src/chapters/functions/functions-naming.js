import { TestResult } from "@nss-workshops/nss-core";

export const functionsNamingChapter = {
  id: 'functions-naming',
  title: 'Function Names and Purpose',
  sectionId: 'functions',
  previousChapterId: 'functions-defining-invoking',
  nextChapterId: 'functions-parameters',
  content: `## Naming Functions Well

Just like how we name variables, the names we give our functions are very important. A good function name tells us exactly what the function does.

### Function Names Should Be Actions

Since functions do things, they should be named with verbs (action words):

\`\`\`js
// Good function names - they describe actions
function calculateTotal() { }
function sendEmail() { }
function saveUser() { }
function displayMessage() { }

// Not so good function names - they're not actions
function total() { }
function email() { }
function user() { }
function message() { }
\`\`\`

### Be Specific

The more specific your function name, the better:

\`\`\`js
// Too vague
function process() { }
function handle() { }
function doStuff() { }

// Much better!
function calculateSalesTax() { }
function handleLoginError() { }
function updateUserProfile() { }
\`\`\`

### One Function, One Job

Each function should do just one thing. This makes your code easier to understand and fix:

\`\`\`js
// Bad: This function does too many things
function processUser() {
    // Validates email
    // Updates database
    // Sends welcome email
    // Updates UI
}

// Better: Each function has one clear purpose
function validateEmail() { }
function updateUserDatabase() { }
function sendWelcomeEmail() { }
function updateUserInterface() { }
\`\`\`

### Common Naming Patterns

Here are some common patterns for function names:
- \`get...\` - for functions that return something (\`getUsername\`)
- \`calculate...\` - for math operations (\`calculateTotal\`)
- \`show...\` or \`display...\` - for showing something (\`showError\`)
- \`update...\` - for changing existing data (\`updateProfile\`)
- \`is...\` or \`has...\` - for yes/no questions (\`isValid\`, \`hasPermission\`)

## Exercise: Fix the Names

Look at these poorly named functions and rename them to better describe what they do. The comments tell you what each function is supposed to do.
`,
  exercise: {
    starterCode: `// This function checks if a number is greater than 100
function number(num) {
    return num > 100
}

// This function adds "Welcome" before a name
function text(name) {
    console.log("Welcome " + name)
}

// This function calculates the price after a 20% discount
function math(price) {
    return price * 0.8
}`,
    solution: `function isGreaterThanHundred(num) {
    return num > 100
}

function displayWelcomeMessage(name) {
    console.log("Welcome " + name)
}

function calculateDiscountedPrice(price) {
    return price * 0.8
}`,
    tests: [
      {
        name: "No Original Function Names",
        test: (code) => {
          try {
            // Check that none of the original poor function names remain
            const passed = !(/function\s+number\s*\(/i.test(code)) &&
              !(/function\s+text\s*\(/i.test(code)) &&
              !(/function\s+math\s*\(/i.test(code));
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Make sure you've renamed all the original functions (number, text, and math) to more descriptive names."
      },
      {
        name: "First Function Uses Verb and Describes Purpose",
        test: (code) => {
          try {
            // Extract the first function name using regex
            const match = code.match(/function\s+([a-zA-Z][a-zA-Z0-9]*)\s*\(\s*num\s*\)/);
            if (!match) return new TestResult({passed:false});

            const functionName = match[1].toLowerCase();

            // Check if the name contains appropriate verbs/descriptors
            const hasVerb = /^(is|check|validate|compare|exceeds|isabove|verify)/i.test(functionName);
            const hasContext = /(greater|above|exceed|more|over|beyond|hundred|100)/i.test(functionName);

            return new TestResult({passed: hasVerb && hasContext});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "The first function should start with a verb (like 'is', 'check', 'validate')."
      },
      {
        name: "Second Function Uses Verb and Describes Purpose",
        test: (code) => {
          try {
            // Extract the second function name using regex
            const match = code.match(/function\s+([a-zA-Z][a-zA-Z0-9]*)\s*\(\s*name\s*\)/);
            if (!match) return new TestResult({passed:false});

            const functionName = match[1].toLowerCase();

            // Check if the name contains appropriate verbs/descriptors
            const hasVerb = /^(display|show|print|log|create|generate|format|get|write)/i.test(functionName);
            const hasContext = /(welcome|greeting|message)/i.test(functionName);

            return new TestResult({passed: hasVerb && hasContext});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "The second function should start with a verb (like 'display', 'show', 'create')."
      },
      {
        name: "Third Function Uses Verb and Describes Purpose",
        test: (code) => {
          try {
            // Extract the third function name using regex
            const match = code.match(/function\s+([a-zA-Z][a-zA-Z0-9]*)\s*\(\s*price\s*\)/);
            if (!match) return new TestResult({passed:false});

            const functionName = match[1].toLowerCase();

            // Check if the name contains appropriate verbs/descriptors
            const hasVerb = /^(calculate|compute|get|apply|determine|find)/i.test(functionName);
            const hasContext = /(discount|sale|reduced|final|after|percent|percentage|price)/i.test(functionName);

            return new TestResult({passed: hasVerb && hasContext});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "The third function should start with a verb (like 'calculate', 'compute', 'apply')."
      },
      {
        name: "Function Behavior Unchanged",
        test: (code) => {
          try {
            // Replace function declarations with assignments to check behavior
            const modifiedCode = code
              .replace(/function\s+([a-zA-Z][a-zA-Z0-9]*)\s*\(\s*num\s*\)/, 'const firstFunction = function(num)')
              .replace(/function\s+([a-zA-Z][a-zA-Z0-9]*)\s*\(\s*name\s*\)/, 'const secondFunction = function(name)')
              .replace(/function\s+([a-zA-Z][a-zA-Z0-9]*)\s*\(\s*price\s*\)/, 'const thirdFunction = function(price)');

            // Execute the code and check behavior
            const evalFunction = new Function(modifiedCode + `;
            // Check if first function correctly compares to 100
            const firstResult1 = firstFunction(50);
            const firstResult2 = firstFunction(150);

            // Check if third function correctly calculates 80%
            const thirdResult = thirdFunction(100);

            return firstResult1 === false &&
                   firstResult2 === true &&
                   thirdResult === 80;
          `);

            const passed = evalFunction();
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Make sure you've only changed the function names, not the functionality of the functions."
      }
    ]
  }
}