export const stringMethodsChapter = {
  id: 'string-methods',
  title: 'String Methods',
  path: '/foundations-course/string-methods',
  sectionId: 'variables-and-values',
  previousChapterId: 'multiline-strings',
  nextChapterId: 'boolean-logic',
  content: `JavaScript provides many powerful built-in methods to work with strings. These methods help you manipulate and transform text data in various ways. Let's explore the most commonly used string methods with practical examples.

## Length Property

The \`length\` property returns the number of characters in a string.

\`\`\`js
const name = "John Doe"
console.log(name.length) // Output: 8

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

## Real-World Examples

### Formatting User Input
\`\`\`js
const username = "   JohnDoe123   "
const cleanUsername = username.trim().toLowerCase()
// Result: "johndoe123"
\`\`\`

### Validating File Types
\`\`\`js
const filename = "document.pdf"
const isImage = filename.toLowerCase().endsWith(".jpg") ||
                filename.toLowerCase().endsWith(".png")
// Result: false
\`\`\`

### Extracting Domain from Email
\`\`\`js
const email = "user@example.com"
const domain = email.slice(email.indexOf("@") + 1)
// Result: "example.com"
\`\`\`

## Exercise

You'll be working with user data that needs cleaning and formatting. Use various string methods to transform the data as specified in the comments.

Try it in the editor!`,
  exercise: {
    starterCode: `// 1. Clean up the email address (remove spaces, convert to lowercase)
const email = "   User.Name@Email.COM   "

// 2. Format the phone number (should be "555-0123")
const phone = "555 0123"

// 3. Format the name (first letter uppercase, rest lowercase)
const name = "jOHN dOE"

// 4. Check if the password ends with a number
const password = "SecurePass123"

// 5. Extract the file type (e.g., "jpg" from "photo.jpg")
const filename = "vacation-photo.jpg"

// Your code here:
const cleanEmail =
const formattedPhone =
const formattedName =
const hasNumberAtEnd =
const fileType = `,
    solution: `const email = "   User.Name@Email.COM   "
const phone = "555 0123"
const name = "jOHN dOE"
const password = "SecurePass123"
const filename = "vacation-photo.jpg"

const cleanEmail = email.trim().toLowerCase()
const formattedPhone = phone.replace(" ", "-")
const formattedName = name.toLowerCase().split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ")
const hasNumberAtEnd = /[0-9]$/.test(password)
const fileType = filename.slice(filename.lastIndexOf(".") + 1)`,
    tests: [
      {
        name: "Email Formatting",
        test: (code) => {
          try {
            let cleanEmail;
            eval(code);
            return cleanEmail === "user.name@email.com";
          } catch (error) {
            return false;
          }
        },
        message: "The email should be trimmed and converted to lowercase"
      },
      {
        name: "Phone Formatting",
        test: (code) => {
          try {
            let formattedPhone;
            eval(code);
            return formattedPhone === "555-0123";
          } catch (error) {
            return false;
          }
        },
        message: "The phone number should be formatted with a hyphen (555-0123)"
      },
      {
        name: "Name Capitalization",
        test: (code) => {
          try {
            let formattedName;
            eval(code);
            return formattedName === "John Doe";
          } catch (error) {
            return false;
          }
        },
        message: "The name should be properly capitalized (John Doe)"
      },
      {
        name: "Password Validation",
        test: (code) => {
          try {
            let hasNumberAtEnd;
            eval(code);
            return hasNumberAtEnd === true;
          } catch (error) {
            return false;
          }
        },
        message: "Check if the password ends with a number using string methods or regex"
      },
      {
        name: "File Extension Extraction",
        test: (code) => {
          try {
            let fileType;
            eval(code);
            return fileType === "jpg";
          } catch (error) {
            return false;
          }
        },
        message: "Extract the file extension (jpg) from the filename"
      }
    ]
  }
}