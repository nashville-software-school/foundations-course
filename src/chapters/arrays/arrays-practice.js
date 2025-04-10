import { TestResult } from "../../utils/test_utils";

export const arrayPracticeChapter = {
  id: 'arrays-practice',
  title: 'Array Practice',
  sectionId: 'arrays',
  previousChapterId: 'arrays-length',
  nextChapterId: 'arrays-conditions-practice',
  content: `## Practice For Of Loops

In this exercise, you will be doing what you did in the last one, but you will need to write more code yourself. You can even open up the last exercise in another browser window so that you can easily look at that code, and write code here.

Use the following variable names and values:
* \`weeklyMiles\` - An array of miles traveled each week
* \`totalMiles\` - A variable to store the total miles
* \`averageMiles\` - A variable to store the average miles

### Sample Output

Use those variables to display this output using a multi-line template string:

\`\`\`html
I average xxx miles each week.
I have driven a total of xxx miles.
\`\`\``,
  exercise: {
    starterCode: `// You fill in some sample weekly miles traveled in this array
const weeklyMiles = [  ]

// Declare a variable to store the total. Initial value is 0.

/*
  Iterate the array of miles with a for..of loop.
  Add each mileage to the total mileage variable.
*/
for () {

}

// Declare a new variable to store the average miles over time
`,
    solution: `// You fill in some sample weekly miles traveled in this array
const weeklyMiles = [ 89, 105, 75, 92, 86, 93, 78 ]

// Declare a variable to store the total. Initial value is 0.
let totalMiles = 0

/*
  Iterate the array of miles with a for..of loop.
  Add each mileage to the total mileage variable.
*/
for (const miles of weeklyMiles) {
  totalMiles += miles
}

// Declare a new variable to store the average miles over time
const averageMiles = totalMiles / weeklyMiles.length

console.log(\`I average \${averageMiles.toFixed(1)} miles each week.
I have driven a total of \${totalMiles} miles.\`)`,
    tests: [
      {
        name: "Array Creation",
        test: (code) => {
          const weeklyMiles = new Function(`${code}; return weeklyMiles`)()
          return new TestResult({passed:Array.isArray(weeklyMiles) && weeklyMiles.length > 0})
        },
        message: "Make sure define the `weeklyMiles` array and add some sample miles"
      },
      {
        name: "Total Variable",
        test: (code) => {
          try {
            const {totalMiles, weeklyMiles } = new Function(`${code}; return {totalMiles, weeklyMiles}`)()
            return new TestResult({passed:totalMiles === weeklyMiles.reduce((a, b) => a + b, 0)})
          }
          catch {
            return new TestResult({passed:false})
          }
        },
        message: "Make sure to declare a totalMiles variable and add each weekly mileage to it"
      },
      {
        name: "Average Miles",
        test: (code) => {
          try {
            const { averageMiles, totalMiles, weeklyMiles } = new Function(`${code}; return {averageMiles, totalMiles, weeklyMiles}`)()
            return new TestResult({passed:averageMiles === totalMiles / weeklyMiles.length})
          }
          catch {
            return new TestResult({passed:false})
          }
        },
        message: "Make sure to calculate the average miles using the total miles and the array length"
      },
      {
        name: "Output Message",
        test: (code) => {
          try {
            let capturedOutput = "";
            const mockConsole = {log: (msg) => {capturedOutput = msg;}};
            const wrapper = new Function('console', `
              ${code}
            `);
            wrapper(mockConsole);
            const passed = capturedOutput.includes('\n');
            return new TestResult({passed,
              message:
                passed ? "Output uses a multi-line template string"
                : "Make sure to use a template string with both average and total miles, and include a line break"});
      
          } catch (e) {
            console.error(e)
            return new TestResult({passed:false, message:" Code has an error or did not produce output"});
          }
        },
        message: "Make sure to use a multi-line template string to output the average and total miles"
      }
    ]
  }
}