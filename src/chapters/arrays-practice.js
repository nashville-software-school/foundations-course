export const arrayPracticeChapter = {
  id: 'arrays-practice',
  title: 'Array Practice',
  sectionId: 'arrays',
  previousChapterId: 'arrays-length',
  nextChapterId: 'arrays-conditions-practice',
  content: `## Practice For Of Loops

In this exercise, you will be doing what you did in the last one, but you will need to write more code yourself. You can even open up the last exercise in another browser window so that you can easily look at that code, and write code here.

### Sample Output

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
          // Check if array has at least 5 numeric values
          const arrayMatch = code.match(/weeklyMiles\s*=\s*\[(.*?)\]/);
          if (!arrayMatch) return false;
          const values = arrayMatch[1].split(',').map(v => v.trim()).filter(v => !isNaN(v));
          return values.length >= 5;
        },
        message: "Make sure to create an array with at least 5 numeric values for weekly miles"
      },
      {
        name: "Total Variable",
        test: (code) => code.includes('let totalMiles = 0') || code.includes('let totalMiles=0'),
        message: "Make sure to declare a totalMiles variable initialized to 0"
      },
      {
        name: "For..of Loop",
        test: (code) => code.includes('for (const') && code.includes(' of weeklyMiles)'),
        message: "Make sure you're using a for..of loop to iterate the weeklyMiles array"
      },
      {
        name: "Average Calculation",
        test: (code) => code.includes('totalMiles / weeklyMiles.length'),
        message: "Make sure you're calculating the average using the array length"
      },
      {
        name: "Output Format",
        test: (code) => {
          return code.includes('I average') &&
                 code.includes('miles each week') &&
                 code.includes('I have driven a total of') &&
                 code.includes('miles');
        },
        message: "Make sure your output matches the required format"
      }
    ]
  }
}