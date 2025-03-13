export const arrayStringsChapter = {
  id: 'arrays-strings',
  title: 'Strings Within Strings',
  path: '/arrays-strings',
  sectionId: 'arrays',
  previousChapterId: 'arrays-conditions-practice',
  nextChapterId: 'arrays-split-join',
  content: `## A String Within a String

In this exercise, you will use a \`for..of\` loop and conditional logic with \`if/else\` blocks again. You will also use a new tool to find a smaller string value within a bigger string value. You will also use the logical OR operator \`||\`, which is similar to the logical AND operator \`&&\` you have used in previous exercises.

#### Quick Incrementing Review

If a variable has a numeric value, you can increase the value by 1 by putting two plus signs after the variable.

\`\`\`js
let pears = 4
pears++
console.log(pears)  // Will output 5
\`\`\`

#### Logical Operators Review

You have used \`&&\` before to check if BOTH conditions are true in order to run some logic.

\`\`\`js
const pineappleBelongsOnPizza = true
const theyWereOnABreak = true
const theOfficeIsFunny = false

if (pineappleBelongsOnPizza && theyWereOnABreak) {
  // Both variables are true, so this code runs
  console.log("Basic")
}

if (pineappleBelongsOnPizza && theOfficeIsFunny) {
  // This won't run
  console.log("Bad")
}
\`\`\`

The OR \`||\` operator is for when you want to check if EITHER of the conditions are true. They both don't need to be.

\`\`\`js
const pineappleBelongsOnPizza = true
const theyWereOnABreak = true
const theOfficeIsFunny = false

if (pineappleBelongsOnPizza || theOfficeIsFunny) {
  // One of the variables' value is true, so this runs
  console.log("Basic")
}

if (theyWereOnABreak || theOfficeIsFunny) {
  // One of the variables' value is true, so this runs
  console.log("Bad")
}
\`\`\`

## Includes a Smaller String

As a software developer, you will often need to determine if a string contains a certain sub-string. For example, if you have an array where people filled out feedback for a play they attended, you want to determine how many people felt a certain emotion. You would look for the words "happy", or "delight", or "disappointed", or "bored" anywhere in their feedback.

Their feedback won't have those words in any predictable location in the entire string.

#### Example Feedback

\`\`\`js
const allFeedback = [
    "I don't regret coming, but I won't recommend it to a friend.",
    "I would say I was disappointed in the production.",
    "I was happy. The whole play had me smiling.",
    "What a delightful evening. Money well spent.",
    "Meh. It was fine.",
    "While there was nothing terrible, I was disappointed in the music.",
    "I was delighted by the fun music and the whimsical dances.",
    "I didn't hate it, but the last 20 minutes had me completely bored."
]
\`\`\`

To find these keywords within the feedback, you can use the \`String.includes()\` method provided by JavaScript. Here is an example.

\`\`\`js
let happyCustomers = 0
let unhappyCustomers = 0

for (const feedback of allFeedback) {
  /*
    If the current feedback includes the string of "delight" or the string
    of "happy", increase the value of the happyCustomers variable by 1
  */
  if (feedback.includes("delight") || feedback.includes("happy")) {
    happyCustomers++
  }
  /*
    If the current feedback includes the string of "disappointed" or
    the string of "bored", increase the value of the unhappyCustomers
    variable by 1
  */
  else if (feedback.includes("disappointed") || feedback.includes("bored")) {
    unhappyCustomers++
  }
}

console.log(\`Happy customers: \${happyCustomers}
Unhappy customers: \${unhappyCustomers}
\`)
\`\`\`

## Exercise: How Do You Take Your Coffee?

There is an array in the code editor of different coffee roasts around the world that you enjoy. Depending on the roast, you prepare the coffee differently.

* If it is a light roast, you drink it black.
* If it is a medium roast, you put cream in it.
* If it is a toasty, or dark, roast you put cream and sugar in it.

Your job is to iterate the \`coffees\` array and output the following sentences for each coffee. Replace the \`00\` placeholder with the full name of the coffee.

\`I need 00 orders of the light coffee with nothing in them\`
\`I need 00 orders of the medium coffee with cream in them\`
\`I need 00 orders of the toasty and dark coffees with cream and sugar in them\`
`,
  exercise: {
    starterCode: `const coffees = [
    "light colombian roast", "ethiopian toasty bean",
    "hawaiian dark roast", "guatemalan blend medium roast",
    "dark madagascar blend", "jamaican dark blue",
    "jamaican medium roast", "salvador robusto light",
    "vietnamese toasty blend", "peruvian light roast"
]

// Provide the correct default value for these variables
let light
let medium
let toastyDark



for (const coffee of coffees) {
  // Add your logic here
}

// Use a multi-line template string to generate the expected results
let output = \`\`

// Log your output to the console
console.log(output)`,
    solution: `const coffees = [
    "light colombian roast", "ethiopian toasty bean",
    "hawaiian dark roast", "guatemalan blend medium roast",
    "dark madagascar blend", "jamaican dark blue",
    "jamaican medium roast", "salvador robusto light",
    "vietnamese toasty blend", "peruvian light roast"
]

// Provide the correct default value for these variables
let light = 0
let medium = 0
let toastyDark = 0

for (const coffee of coffees) {
    if (coffee.includes("light")) {
        light++
    }
    else if (coffee.includes("medium")) {
        medium++
    }
    else if (coffee.includes("dark") || coffee.includes("toasty")) {
        toastyDark++
    }
}

// Use a multi-line template string to generate the expected results
let output = \`I need \${light} orders of the light coffee with nothing in them
I need \${medium} orders of the medium coffee with cream in them
I need \${toastyDark} orders of the medium-dark and dark coffees with cream and sugar in them
\`

// Log your output to the console
console.log(output)
`,
    tests: [
      {
        name: "Correct count of each roast type",
        test: (code) => {
          const { light, medium, toastyDark } = new Function(`${code}; return { light, medium, toastyDark }`)()
          return light === 3 && medium === 2 && toastyDark === 5
        },
        message: "Make sure you're incrementing the correct variable for each roast"
      },
      {
        name: "Output is correct",
        test: (code) => {
          const output = new Function(`${code}; return output`)()
          return output.includes("I need 3 orders of the light coffee with nothing in them") &&
                 output.includes("I need 2 orders of the medium coffee with cream in them") &&
                 output.includes("I need 5 orders of the toasty and dark coffees with cream and sugar")
        },
        message: "Make sure you're outputting the correct number of each roast type"
      },
      {
        name: "String.includes() Usage",
        test: (code) => {
          return code.includes('.includes("light")') &&
                 code.includes('.includes("medium")') &&
                 code.includes('.includes("toasty")') &&
                 code.includes('.includes("dark")');
        },
        message: "Make sure you're using String.includes() to check for each roast type"
      }
    ]
  }
}