export const functionsParametersChapter = {
  id: 'functions-parameters',
  title: 'Introducing Parameters',
  path: '/functions-parameters',
  sectionId: 'functions',
  previousChapterId: 'functions-naming',
  nextChapterId: 'functions-arguments',
  content: `## Making Functions Flexible with Parameters

Parameters make our functions more flexible by letting them work with different values each time we use them.

### Understanding Parameters

Think of a parameter as a special variable that a function can use. When we define a function, we can add parameters inside the parentheses:

\`\`\`js
function greet(name) {
    console.log("Hello, " + name + "!")
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
    console.log("Hello, " + name + "!")
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
    console.log("Good " + timeOfDay + "!")
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
    starterCode: `// Currently this function can only talk about running
function describeActivity() {
    console.log("I love running!")
}

// Change it to work with any activity`,
    solution: `function describeActivity(activity) {
    console.log("I love " + activity + "!")
}`,
    tests: [
      {
        name: "Parameter Added",
        test: (code) => {
          return code.includes('function describeActivity(activity)') ||
                 code.includes('function describeActivity( activity )') ||
                 code.includes('function describeActivity(hobby)') ||
                 code.includes('function describeActivity(sport)')
        },
        message: "Make sure you've added a parameter to the function"
      },
      {
        name: "Using Parameter",
        test: (code) => {
          return code.includes('+ activity +') ||
                 code.includes('+activity+') ||
                 code.includes('+ hobby +') ||
                 code.includes('+ sport +')
        },
        message: "Make sure you're using the parameter in the console.log message"
      }
    ]
  }
}