export const functionsMultipleParametersChapter = {
  id: 'functions-multiple-parameters',
  title: 'Multiple Parameters',
  path: '/functions-multiple-parameters',
  sectionId: 'functions',
  previousChapterId: 'functions-arguments',
  nextChapterId: 'functions-return-intro',
  content: `## Working with Multiple Parameters

Sometimes a function needs more than one piece of information to do its job. We can give functions multiple parameters by separating them with commas.

### Adding More Parameters

Here's how to create a function with multiple parameters:

\`\`\`js
//                  First     Second
//                parameter parameter
//                    ↓         ↓
function createFullName(firstName, lastName) {
    console.log(firstName + " " + lastName)
}

createFullName("John", "Smith")  // Displays: John Smith
\`\`\`

### Parameter Order Matters

When using multiple parameters, the order is important. The arguments you provide must match the order of the parameters:

\`\`\`js
function showPrice(item, price) {
    console.log("The " + item + " costs $" + price)
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

    console.log("Area: " + area)
    console.log("Perimeter: " + perimeter)
}

// Calculate for a rectangle that is 5 units wide and 3 units tall
calculateRectangle(5, 3)
// Displays:
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
    console.log("Name: " + name)
    console.log("Age: " + age)
    console.log("Email: " + email)
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

Create a function that displays a player's game score. It should take two parameters:
1. The player's name
2. The number of points they scored

The function should display a message like: "Mario scored 100 points!"
`,
  exercise: {
    starterCode: `// Create your function here
// Remember to use both parameters in the message

`,
    solution: `function displayGameScore(playerName, points) {
    console.log(playerName + " scored " + points + " points!")
}`,
    tests: [
      {
        name: "Function Definition",
        test: (code) => {
          return code.includes('function') &&
                 code.includes('playerName') &&
                 code.includes('points') &&
                 code.includes('console.log')
        },
        message: "Make sure you've created a function with two parameters: playerName and points"
      },
      {
        name: "Message Format",
        test: (code) => {
          return code.includes('scored') &&
                 code.includes('points') &&
                 code.includes('+')
        },
        message: "Your function should create a message using both parameters"
      }
    ]
  }
}