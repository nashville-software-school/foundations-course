export const arrayConditionsPracticeChapter = {
  id: 'arrays-conditions-practice',
  title: 'Conditions in Loops',
  path: '/foundations-course/arrays-conditions-practice',
  sectionId: 'arrays',
  previousChapterId: 'arrays-practice',
  nextChapterId: 'arrays-strings',
  content: `You are going to practice your \`for..of\` loops some more. In this exercise, you are going to add a \`if/else\` code block inside the loop.

A quick example first.

\`\`\`js
const wines = [ "red", "white", "white", "white", "red", "white", "red" ]
const wineCellar = []
const wineRefrigerator = []

for (const wine of wines) {
  if (wine === "red") {
    wineCellar.push(wine)
  }
  else {
    wineRefrigerator.push(wine)
  }
}

console.log(\`
Contents of wine cellar: \${wineCellar}
Contents of wine refrigerator: \${wineRefrigerator}
\`)
\`\`\`

Feel free to copy that code into the editor and run it to see what happens.

In that example, you still iterate the entire array, but depending on the value of the \`wine\` variable, one of two different things could happen.

## Exercise: Sleep Mode

You decide to track how much your sleep affects your mood on a day-to-day basis. You notice that if you get less than 7 hours of sleep, you are grumpy all day long. If you get 7 or more hours of sleep, you are in a happy mood all day.

You start recording how many hours of sleep you get every night for two weeks. Based on the hours of sleep, you want to generate a readable report that shows you how many days you were grumpy and how many days you were happy.

There is an array already in the code editor of your tracked hours of sleep. You need to complete the code using the above code as an example. One thing you will do differently is instead of putting the array in the output like the example does, you need to display the number of items in \`grumpyHours\` and the number of items in the \`happyHours\` arrays.

##### Example Output

This is just an example. Your output will have different numbers.

\`\`\`html
I was grumpy on 14 days.
I was happy on 22 days.
\`\`\``,
  exercise: {
    starterCode: `const hours = [ 6, 9, 7, 8, 6, 6, 8, 5, 9, 8, 7, 6, 7, 7, 8, 6, 9 ]
const grumpyHours = []
const happyHours = []`,
    solution: `const hours = [ 6, 9, 7, 8, 6, 6, 8, 5, 9, 8, 7, 6, 7, 7, 8, 6, 9 ]
const grumpyHours = []
const happyHours = []

for (const sleep of hours) {
  if (sleep < 7) {
    grumpyHours.push(sleep)
  }
  else {
    happyHours.push(sleep)
  }
}

console.log(\`I was grumpy on \${grumpyHours.length} days.
I was happy on \${happyHours.length} days.\`)`,
    tests: [
      {
        name: "For..of Loop",
        test: (code) => code.includes('for (const') && code.includes(' of hours)'),
        message: "Make sure you're using a for..of loop to iterate the hours array"
      },
      {
        name: "Conditional Logic",
        test: (code) => {
          return code.includes('if (') &&
                 code.includes('< 7') &&
                 code.includes('else');
        },
        message: "Make sure you have the correct if/else condition checking for less than 7 hours of sleep"
      },
      {
        name: "Array Push",
        test: (code) => {
          return code.includes('grumpyHours.push(') &&
                 code.includes('happyHours.push(');
        },
        message: "Make sure you're pushing hours to both the grumpyHours and happyHours arrays"
      },
      {
        name: "Output Format",
        test: (code) => {
          return code.includes('grumpyHours.length') &&
                 code.includes('happyHours.length') &&
                 code.includes('I was grumpy on') &&
                 code.includes('I was happy on') &&
                 code.includes('days');
        },
        message: "Make sure your output shows the count of days for both moods in the correct format"
      }
    ]
  }
}