export const multilineStringsChapter = {
  id: 'multiline-strings',
  title: 'Multi-line Strings',
  path: '/multiline-strings',
  sectionId: 'variables-and-values',
  previousChapterId: 'math-operations',
  content: `So far you have used \`console.log()\` to produce strings of output in the console. Sometimes, developers want their output to be more attractive, especially if the output requires a multi-line format to be more readable.

Just a quick example to show you what happens when you tell JavaScript to output a multi-line string. Place the following code in the code editor and click the "run >" button. You will see a red error message in the console.

\`\`\`js
console.log("
Line 1
Line 2
")
\`\`\`

## Backticks for Prettier Output

In the last two chapters, you used the backtick (\`) character to do string interpolation - where you can inject one string into another one. The other benefit of the backtick character is to produce multi-line strings.

In your code, replace the double quote characters with backticks and run it again. JavaScript will no longer yell at you.

## Carpeting the House

\`\`\`js
// Downstairs rooms
const livingRoom =  595
const kitchen =  408
const office =  235
const powderRoom =  68

// Upstairs rooms
const mainBedroom =  475
const mainBath =  270
const guestBath =  100
const guestBedroom =  415

/* To avoid variable making overload,
   you can do the addition inside the
   interpolation */

console.log(\`Living room: \${livingRoom}\`)
console.log(\`Kitchen: \${kitchen}\`)
console.log(\`Office: \${office}\`)
console.log(\`Powder room: \${powderRoom}\`)
console.log(\`Total area of first floor: \${livingRoom + kitchen + office + powderRoom}\`)
\`\`\`

## Exercise: Formatted Income Statement

You are going to practice adding and subtracting variables again, but this time, the output will be more readable.

Try it in the editor!
`,
  exercise: {
    starterCode: `// Monthly income
const myIncome = 5478.84
const spouseIncome = 4028.37

// Monthly expenses
const phoneBill = 254.91
const mortgage = 2161.12
const carInsurance = 205.31
const healthInsurance = 508.18

// Create a multi-line string that shows:
// 1. Combined monthly income
// 2. Total monthly expenses
// 3. Net monthly income

const statement = ""  // Use backticks and calculations here`,
    solution: `// Monthly income
const myIncome = 5478.84
const spouseIncome = 4028.37

// Monthly expenses
const phoneBill = 254.91
const mortgage = 2161.12
const carInsurance = 205.31
const healthInsurance = 508.18

const statement = \`Our combined monthly income is \${myIncome + spouseIncome}.
Our total monthly expenses are \${phoneBill + mortgage + carInsurance + healthInsurance}.
Our net monthly income is \${(myIncome + spouseIncome) - (phoneBill + mortgage + carInsurance + healthInsurance)}.\``,
    tests: [
      {
        name: "Multi-line Format",
        test: (code) => {
          return code.includes('`') &&
                 code.includes('\n') &&
                 code.includes('statement')
        },
        message: "Make sure to use backticks for multi-line string formatting"
      },
      {
        name: "Calculations",
        test: (code) => {
          return code.includes('myIncome + spouseIncome') &&
                 code.includes('phoneBill + mortgage + carInsurance + healthInsurance')
        },
        message: "Make sure to calculate total income and expenses correctly"
      }
    ]
  }
}