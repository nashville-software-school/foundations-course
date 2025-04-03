export const stringMethodsChapter = {
  id: 'string-methods',
  title: 'String Methods',
  sectionId: 'variables-and-values',
  previousChapterId: 'multiline-strings',
  nextChapterId: 'boolean-logic',
  content: `JavaScript provides many powerful built-in methods to work with strings. These methods help you manipulate and transform text data in various ways. Let's explore the most commonly used string methods with practical examples.

## Length Property

The \`length\` property returns the number of characters in a string.

\`\`\`js
const patientName = "John Doe"
console.log(patientName.length) // Output: 8

const empty = ""
console.log(empty.length) // Output: 0
\`\`\`

## Case Transformation

### toUpperCase()
Converts all characters to uppercase.

\`\`\`js
const message = "Hello, World!"
console.log(message.toUpperCase()) // Output: "HELLO, WORLD!"
\`\`\`

### toLowerCase()
Converts all characters to lowercase.

\`\`\`js
const shout = "PLEASE BE QUIET"
console.log(shout.toLowerCase()) // Output: "please be quiet"
\`\`\`

## Whitespace Removal

### trim()
Removes whitespace from both ends of a string. This is particularly useful when working with user input.

\`\`\`js
const userInput = "   hello@email.com   "
console.log(userInput.trim()) // Output: "hello@email.com"
\`\`\`

### trimStart() / trimLeft()
Removes whitespace only from the beginning.

\`\`\`js
const leftPadded = "   Text"
console.log(leftPadded.trimStart()) // Output: "Text"
\`\`\`

### trimEnd() / trimRight()
Removes whitespace only from the end.

\`\`\`js
const rightPadded = "Text   "
console.log(rightPadded.trimEnd()) // Output: "Text"
\`\`\`

## Substring Extraction

In software languages, the position of a character in a string is often referred to as its index. The first character has an index of 0, the second character has an index of 1, and so on. This is known as zero-based indexing, and can be confusing for beginners.

You can use the index to extract a substring from a string. The following methods are commonly used for this purpose:

### slice(startIndex, endIndex)
Extracts a portion of a string. The endIndex is optional and not included in the result.

\`\`\`js
const text = "JavaScript"
console.log(text.slice(0, 4)) // Output: "Java"
console.log(text.slice(4)) // Output: "Script"
console.log(text.slice(-6)) // Output: "Script" (counting from end)
\`\`\`

### substring(startIndex, endIndex)
Similar to slice but doesn't accept negative indices.

\`\`\`js
const language = "JavaScript"
console.log(language.substring(0, 4)) // Output: "Java"
\`\`\`

## Search and Replace

### includes(searchString)
Checks if a string contains another string.

\`\`\`js
const sentence = "The quick brown fox"
console.log(sentence.includes("fox")) // Output: true
console.log(sentence.includes("cat")) // Output: false
\`\`\`

### startsWith(searchString)
Checks if a string begins with another string.

\`\`\`js
const filename = "document.pdf"
console.log(filename.startsWith("doc")) // Output: true
\`\`\`

### endsWith(searchString)
Checks if a string ends with another string.

\`\`\`js
const filename = "report.txt"
console.log(filename.endsWith(".txt")) // Output: true
\`\`\`

### replace(searchValue, replaceValue)
Replaces the first occurrence of a string with another string.

\`\`\`js
const message = "Hello, John"
console.log(message.replace("John", "Jane")) // Output: "Hello, Jane"
\`\`\`

### replaceAll(searchValue, replaceValue)
Replaces all occurrences of a string with another string.

\`\`\`js
const text = "cat cat cat"
console.log(text.replaceAll("cat", "dog")) // Output: "dog dog dog"
\`\`\`

## Simple Examples for Practice

### Removing Spaces
\`\`\`js
const username = "   JohnDoe123   "
const trimmedUsername = username.trim()
// Result: "JohnDoe123"
\`\`\`

### Converting to Uppercase
\`\`\`js
const message = "hello world"
const shoutedMessage = message.toUpperCase()
// Result: "HELLO WORLD"
\`\`\`

### Replacing Text
\`\`\`js
const greeting = "Hello Sam"
const newGreeting = greeting.replace("Sam", "Kim")
// Result: "Hello Kim"
\`\`\`

### Getting Part of a String
\`\`\`js
const message = "Hello World"
const firstFive = message.slice(0, 5)
// Result: "Hello"
\`\`\`

## Exercise

You'll be working with user data that needs cleaning and formatting. Use various string methods to transform the data as specified in the comments.

In the editor, you will see several strings defined, with a comment indicating what you need to do with each string. Your task is to write the code that performs the required transformations. Refer to the examples above for guidance.
`,
  exercise: {
    starterCode: `// Remove spaces from the beginning and end of the email
const email = "   hello@email.com   "

// Replace the space with a hyphen in the phone number
const phone = "555 0123"

// Convert the name to all uppercase
const name = "john"

// Check if the password contains the letter "x"
const password = "SecurePass"

// Get the first 4 characters of the filename
const filename = "vacation.jpg"

// Your code here (use only ONE string method for each task):
const cleanEmail =
const formattedPhone =
const formattedName =
const containsX =
const fileStart = `,
    solution: `const email = "   hello@email.com   "
const phone = "555 0123"
const name = "john"
const password = "SecurePass"
const filename = "vacation.jpg"

// Remove spaces from beginning and end
const cleanEmail = email.trim()

// Replace space with hyphen
const formattedPhone = phone.replace(" ", "-")

// Convert to uppercase
const formattedName = name.toUpperCase()

// Check if contains "x"
const containsX = password.includes("x")

// Get first 4 characters
const fileStart = filename.slice(0, 4)`,
    tests: [
      {
        name: "Email Formatting",
        test: (code) => {
          try {
            const func = new Function(code + '\n return cleanEmail')
            const cleanEmail = func()
            return cleanEmail === "hello@email.com"
          } catch (error) {
            return false
          }
        },
        message: "The email should be trimmed to remove spaces"
      },
      {
        name: "Phone Formatting",
        test: (code) => {
          try {
            const func = new Function(code + '\n return formattedPhone')
            const formattedPhone = func()
            return formattedPhone === "555-0123"
          } catch (error) {
            return false
          }
        },
        message: "The phone number should be formatted with a hyphen (555-0123)"
      },
      {
        name: "Name Formatting",
        test: (code) => {
          try {
            const func = new Function(code + '\n return formattedName')
            const formattedName = func()
            return formattedName === "JOHN"
          } catch (error) {
            return false
          }
        },
        message: "The name should be converted to uppercase (JOHN)"
      },
      {
        name: "Password Check",
        test: (code) => {
          try {
            const containsX = new Function(code + '\n return containsX')()
            return containsX === false
          } catch (error) {
            return false
          }
        },
        message: "Check if the password contains the letter 'x'"
      },
      {
        name: "Filename Start",
        test: (code) => {
          try {
            const fileStart = new Function(code + '\n return fileStart')()
            return fileStart === "vaca"
          } catch (error) {
            return false
          }
        },
        message: "Extract the first 4 characters of the filename"
      }
    ]
  }
}