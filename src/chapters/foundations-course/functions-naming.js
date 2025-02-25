export const functionsNamingChapter = {
  id: 'functions-naming',
  title: 'Function Names and Purpose',
  path: '/foundations-course/functions-naming',
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
        name: "First Function Rename",
        test: (code) => {
          return code.toLowerCase().includes('greaterthan') ||
                 code.toLowerCase().includes('isabove') ||
                 code.toLowerCase().includes('morethan')
        },
        message: "The first function should have a name that indicates it's checking if a number is greater than 100"
      },
      {
        name: "Second Function Rename",
        test: (code) => {
          return code.toLowerCase().includes('welcome')
        },
        message: "The second function should have a name that indicates it's displaying a welcome message"
      },
      {
        name: "Third Function Rename",
        test: (code) => {
          return code.toLowerCase().includes('discountprice') ||
                 code.toLowerCase().includes('calculatediscount')
        },
        message: "The third function should have a name that indicates it's calculating a discounted price. Perhaps `calculateDiscount` or `disacountPrice`?"
      }
    ]
  }
}