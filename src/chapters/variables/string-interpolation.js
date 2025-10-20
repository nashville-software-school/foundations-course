import { TestResult } from "@nss-workshops/nss-core";

export const stringInterpolationChapter = {
  id: 'string-interpolation',
  title: 'String Values',
  sectionId: 'variables-and-values',
  previousChapterId: 'variables-intro',
  nextChapterId: 'math-operations',
  content: `In the previous exercise, you worked with variables that represented numeric values. In this chapter, you are going to work with different kinds of values: strings. A string value is a series of numbers, letters, and symbols surrounded by either a single quote \`'\` or a double quote \`"\`.

You are going to be using double quotes around all of your strings, just so that you can be consistent.

## Your First String Variable

Imagine that you want to use JavaScript to keep track of all of the electronic items that you have in your house for insurance purposes. For the first example, you want to record what the manufacturer, brand, and size of your TV is.

\`\`\`js
const tv = "50-inch Sony A9G Master Series"
\`\`\`

That string contains numbers, a symbol _(the dash)_, and letters. Trust me, you only want to type all of that once in your code. That's why you reference that string with a variable of \`tv\`.

## String Interpolation

Yeah, we know it's a weird word. What it means is that you can insert a string value into another string by using the variable name. Here's a quick example of what it looks like. It can be hard to notice, but the string below is surrounded by backticks (\`), not quotes. The backtick is the key right beneath your ESCAPE key on your keyboard.

Remember the \`const\` keyword? It means that I cannot change the value of the variable after it has been declared.

\`\`\`js
const gameConsole = "Sony Playstation"
const computer = "2017 Macbook Pro"

// Interpolation example
const gameSystems = \`I play games on my \${gameConsole} and my \${computer}\`
console.log(gameSystems)
\`\`\`

This would produce the output of the following string.

\`\`\`
I play games on my Sony Playstation and my 2017 Macbook Pro
\`\`\`

| Character | Description |
|-----------|-------------|
| \`         | Backtick, used for inserting the value of a variable into a larger string |
| ' or "     | Single or double quotes, used for simple string value with nothing dynamic added |

## Exercise

Now you can practice making variables that reference strings which describe electronics in your house and use string interpolation to combine them.

Try it in the editor!
`,
  exercise: {
    starterCode: `// Create variables for your electronics
const computer = ""
const phone = ""
const television = ""
const refrigerator = ""

// Use string interpolation to create a sentence with all electronics
const allElectronics = ""

// Your sentence should look like:
// "I have the following electronic devices. My xxx television, my xxx computer, my xxx refrigerator, and my xxx phone"

console.log(allElectronics)
`,
    solution: `const computer = "2023 Macbook Pro"
const phone = "iPhone 14 Pro"
const television = "65-inch LG OLED"
const refrigerator = "Samsung French Door"

const allElectronics = \`I have the following electronic devices. My \${television} television, my \${computer} computer, my \${refrigerator} refrigerator, and my \${phone} phone\`
`,
    tests: [
      {
        name: "String Interpolation Correct Syntax",
        test: (code) => {
            try {
                new Function(code)(); // Just check that it executes
                return new TestResult({passed:true})
            } catch {
                return new TestResult({passed:false});
            }
          },
          message: "Make sure your string interpolation code runs without errors."
      },
      {
        name: "Variable Creation",
        test: (code) => {
          return new TestResult({passed:code.includes('const computer') &&
                 code.includes('const phone') &&
                 code.includes('const television') &&
                 code.includes('const refrigerator')})
        },
        message: "Make sure to create all four electronic device variables"
      },
      {
        name: "String Interpolation",
        test: (code) => {
          return new TestResult({passed:code.includes('`') &&
                 code.includes('${television}') &&
                 code.includes('${computer}') &&
                 code.includes('${refrigerator}') &&
                 code.includes('${phone}')})
        },
        message: "Make sure to use string interpolation with backticks and ${} syntax"
      }
    ]
  }
}