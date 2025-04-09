import { TestResult } from "../../utils/test_utils";

export const evaluationsChapter = {
  id: 'evaluations',
  title: 'Less Than, More Than',
  sectionId: 'variables-and-values',
  previousChapterId: 'boolean-logic',
  nextChapterId: 'variables-review',
  content: `In this part of the course, you will be practicing using the greater than \`>\` operator, the greater than or equal to \`>=\` operator, the less than \`<\` operator, the \`&&\` operator to test for more than one condition, and writing more than one condition using the \`else if\` combination of keywords.

## The Big Party

Your big party is happening in about 2 weeks. You have invited all of your friends, and most of them have planned on bringing their partner with them. You are expecting a large group of attendees, but you're not quite sure how many, because not everyone has responded to your  RSVP yet. The problem is that you need to plan your trip to the grocery store and the party goods store.

If there are 50 people or more coming to the party, then you need to buy 20 bags of chips, 3 vegetable trays, 15 bottles of soda, and 5 cases of beer.

If there are less than 50, you will buy 15 bags of chips, 2 vegetable trays, 10 bottles of soda, and 3 cases of beer.

If there are less than 25, you will buy 10 bags of chips, 1 vegetable tray, 5 bottles of soda, and 2 cases of beer.

> **Reminder:** Use the \`let\` keyword to declare variables if you intend to change their values later on in the code. \`const\` is for when the value should never change. JavaScript doesn't care what you name your variables. It only cares about their values.

\`\`\`js
let bagsOfChips = 0
let vegetableTrays = 0
let sodaBottles = 0
let beerCases = 0

const attendees = 32

if (attendees >= 50) {
    // First condition is true: 50 people or more
    bagsOfChips = 20
    vegetableTrays = 3
    sodaBottles = 15
    beerCases = 5
}
else if (attendees < 50 && attendees >= 25) {
    // Second condition is true: Less than 50, but 25 or more
    bagsOfChips = 15
    vegetableTrays = 2
    sodaBottles = 10
    beerCases = 3
}
else {
    // Final condition is true: Less than 25
    bagsOfChips = 10
    vegetableTrays = 1
    sodaBottles = 5
    beerCases = 2
}

// String interpolation practice with multi-line string output
console.log(\`I need to buy the following supplies
\${bagsOfChips} bags of chips
\${vegetableTrays} vegetable trays
\${sodaBottles} bottles of soda
\${beerCases} cases of beer
\`)
\`\`\`

Since the current value of \`attendees\` is 32, then it meets both of the conditions in the \`else if\` code block. 32 is less than 50, and it is also greater than 25.

Now change the value of the \`attendees\` variable to make the other conditions true and verify the output works as intended.

## Operator and Keyword Review

* To check if a numeric value is greater than or equal to a number, you use \`>=\`
* To check if a numeric value is less than a number, you use \`<\`
* To combine two evaluations in a single \`if\` statement, you use \`&&\`, which means "and" in English. This first condition must be true, and this second condition must be true.
* When multiple things could possibly happen in code based on certain conditions, you can use multiple \`if\`, \`else if\`, and \`else\` statement to write all of your conditions. In the above example, only one block will run that assigns new values to your grocery variables.

In this next exercise, you are going to practice writing multiple conditions with \`if\`, \`else if\`, and \`else\` code blocks. You are also going to practice using the \`>=\`, \`<\`, and \`&&\` operators in your conditions.

## Exercise: What Should I Wear?

What you wear to work today will depend on the weather forecast. Here are all the decisions you will make depending on what the temperature is. Your clothing choices will be a jacket, a sweater, a t-shirt, pants or shorts, and boots or sneakers or sandals.

* If the temperature is 95 degrees or more, you will wear a t-shirt. You will wear shorts. You will wear sandals.
* If the temperature is less than 95 degrees, and 75 degrees or more, you will wear a t-shirt, shorts, and sneakers.
* If the temperature is less than 75 degrees, and 50 degrees or more, you will wear a sweater, pants, and sneakers.
* If the temperature is less than 50 degrees, and 35 degrees or more, you will wear a jacket, pants, and sneakers.
* If the temperature is less than 35 degrees, you will wear a jacket, pants, and boots.

Practice your boolean logic in the editor.

You will need more than one \`else if\` condition to write this code. You will also need to use the \`>=\` and \`<\` operators to check the temperature. You will also need to use the \`&&\` operator to check for multiple conditions in a single \`if\` statement.`
,
  exercise: {
    starterCode: `let torsoClothing = ""
let legClothing = ""
let footWear = ""

const temperature = 48

/*
   The first condition is already written for you.
   Add your \`else if\` and \`else\` conditions below this one.
*/
if (temperature >= 95) {
    // Add your code here
}


`
,
    solution: `let torsoClothing = ""
let legClothing = ""
let footWear = ""

const temperature = 48

if (temperature >= 95) {
    torsoClothing = "T-shirt"
    legClothing = "Shorts"
    footWear = "Sandals"
}
else if (temperature < 95 && temperature >= 75) {
    torsoClothing = "T-shirt"
    legClothing = "Shorts"
    footWear = "Sneakers"
}
else if (temperature < 75 && temperature >= 50) {
    torsoClothing = "Sweater"
    legClothing = "Pants"
    footWear = "Sneakers"
}
else if (temperature < 50 && temperature >= 35) {
    torsoClothing = "Jacket"
    legClothing = "Pants"
    footWear = "Sneakers"
}
else {
    torsoClothing = "Jacket"
    legClothing = "Pants"
    footWear = "Boots"
}

console.log(\`This is what I'm wearing today:
\${torsoClothing} on my torso
\${legClothing} on my legs
\${footWear} on my feet
\`)`,
    tests: [
      {
        name: "Multiple Conditions",
        test: (code) => {
          return code.includes('&&');
        },
        message: "Make sure to use the && for multiple conditions in a single if statement"
      },
      {
        name: "Correct Clothing for 48 Degrees",
        test: (code) => {
          try {
            const { torsoClothing, legClothing, footWear } = new Function(code + "\n return { torsoClothing, legClothing, footWear}")();
            return new TestResult({passed:torsoClothing === "Jacket" &&
                   legClothing === "Pants" &&
                   footWear === "Sneakers"});
          } catch {
            return new TestResult({passed:false});
          }
        },
        message: "When temperature is 48 degrees, you should wear a Jacket, Pants, and Sneakers"
      },
      {
        name: "Using Proper Conditions",
        test: (code) => {
          return new TestResult({passed:code.includes('if') &&
                 code.includes('else if') &&
                 code.includes('>=') &&
                 code.includes('<')});
        },
        message: "Make sure to use if/else if statements with proper comparison operators (>=, <)"
      }
    ]
  }
}