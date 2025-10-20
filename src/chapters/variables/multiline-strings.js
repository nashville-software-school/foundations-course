import { TestResult } from "@nss-workshops/nss-core";

export const multilineStringsChapter = {
  id: 'multiline-strings',
  title: 'Multi-line Strings',
  sectionId: 'variables-and-values',
  previousChapterId: 'math-operations',
  nextChapterId: 'string-methods',
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

When you run your code, it should look exactly like this. Notice that each sentence ends with a period, and each sentence is on a new line. You will need to use the backtick character to format the output:

\`\`\`html
Our combined monthly income is 9506.
Our total monthly expenses are 3128.
Our net monthly income is 6378.
\`\`\`

`,
  exercise: {
    starterCode: `// Monthly income
const myIncome = 5478
const spouseIncome = 4028

// Monthly expenses
const phoneBill = 254
const mortgage = 2161
const carInsurance = 205
const healthInsurance = 508

// Create a multi-line string that shows:
// 1. Combined monthly income
// 2. Total monthly expenses
// 3. Net monthly income

const statement = "";  // Use backticks and calculations here`,
    solution: `// Monthly income
const myIncome = 5478
const spouseIncome = 4028

// Monthly expenses;
const phoneBill = 254
const mortgage = 2161
const carInsurance = 205
const healthInsurance = 508

const statement = \`Our combined monthly income is \${myIncome + spouseIncome}.
Our total monthly expenses are \${phoneBill + mortgage + carInsurance + healthInsurance}.
Our net monthly income is \${(myIncome + spouseIncome) - (phoneBill + mortgage + carInsurance + healthInsurance)}.\`

console.log(statement)
`,
    tests: [
      {
        name: "Multi-line Format",
        test: (code) => {
          return new TestResult({passed:code.includes('`') &&
                 code.includes('\n') &&
                 code.includes('statement')})
        },
        message: "Make sure to use backticks for multi-line string formatting"
      },
      {
        name: "Calculations",
        test: (code) => {
          const res = new Function(code + '\n  return statement;')();
          return new TestResult({passed:res.includes('Our combined monthly income is 9506.') &&
            res.includes('Our total monthly expenses are 3128.') &&
            res.includes('Our net monthly income is 6378.')});
        },
        message: "Make sure to calculate total income and expenses correctly"
      }
    ]
  }
}