export const arraySplitJoinChapter = {
  id: 'arrays-split-join',
  title: 'Strings and Arrays Conversion',
  path: '/arrays-split-join',
  sectionId: 'arrays',
  previousChapterId: 'arrays-strings',
  nextChapterId: 'arrays-review',
  content: `## Strings into Arrays into Strings

Now that you have worked with arrays and strings in various contexts, this chapter will cover how to convert strings into arrays, and vice versa.

## Split String into an Array

Take a look at the following string. It represents a person's full name, but in a very particular format. The first name, middle name, and last name are separated by commas. Juan is the first name. Carlos is the middle name. Rodriguez is the surname. You want to have each of those names stored in their own variable.

\`\`\`js
const fullName = "Juan,Carlos,Rodriguez"
\`\`\`

### Split Into Multiple Variables

You can use \`.split()\` method on any string to pull out sub-strings that are separated by a common character - also called the delimiter. The following code both declares each variable, and assigns each a value all in one line of code.

Note that within the parenthesis after \`.split\`, there is a comma character.

\`\`\`js
const fullName = "Juan,Carlos,Rodriguez"
const [ firstName, middleName, surName ] = fullName.split(",")

console.log(firstName)  // Juan
console.log(middleName)  // Carlos
console.log(surName)  // Rodriguez
\`\`\`

If the sub-strings were separated by a colon instead, you would use that character inside the parenthesis.

\`\`\`js
const fullName = "Juan:Carlos:Rodriguez"
const [ firstName, middleName, surName ] = fullName.split(":")

console.log(firstName)  // Juan
console.log(middleName)  // Carlos
console.log(surName)  // Rodriguez
\`\`\`

What if the names are separated by two colons, though?? Send two colons to the split method.

\`\`\`js
const fullName = "Juan::Carlos::Rodriguez"
const [ firstName, middleName, surName ] = fullName.split("::")

console.log(firstName)  // Juan
console.log(middleName)  // Carlos
console.log(surName)  // Rodriguez
\`\`\`

## Join Array into a String

You can do the complete opposite as well. If you have an existing array that contains string values, you can combine them into a single string with the \`.join()\` method.

Here is an example. A poem is currently stored in an array. Each line of the poem is one string value in the array. You want to combine all of them into one, single string to be displayed.

\`\`\`js
const sentences = [
  "Praise the spells and bless the charms,",
  "I found April in my arms.",
  "April golden, April cloudy,",
  "Gracious, cruel, tender, rowdy;"
]

const wholePoem = sentences.join("")

console.log(wholePoem)
\`\`\`

That output would be the following single string.

\`\`\`html
Praise the spells and bless the charms, I found April in my arms. April golden, April cloudy,  Gracious, cruel, tender, rowdy;
\`\`\`

Much like the \`.split()\` method on a string, you can specify a character by which all the individual strings in the array will be joined. Another example below.

\`\`\`js
const surprises = [ "lions", "tigers", "bears" ]
const exclamation = surprises.join(" and ")

console.log(\`\${exclamation}, oh my\`)
\`\`\`

The output would be the following string.

\`\`\`html
lions and tigers and bears, oh my
\`\`\`

You could also wrap the strings in HTML elements.

\`\`\`js
const employees = [ "Mary Bulshear", "Kelley Avignon", "Brian Wellington", "Cherie Midreaux" ]
const listItems = employees.join("</li><li>")

console.log(\`<li>\${listItems}</li>\`)
\`\`\`

That would generate the following HTML string.

\`\`\`
<li>Mary Bulshear</li>
<li>Kelley Avignon</li>
<li>Brian Wellington</li>
<li>Cherie Midreaux</li>
\`\`\`

## Exercise: Split Personalities

The Luminous Association of Personality Disorders (LAPD) has a yearly conference in Las Vegas where professional psychologists and cognitive scientists gather to discuss the latest research into aberrant mental disorders that affect people around the world. The software developer that maintain the entire list of known personality disorders have sent you the list so that you can display them on the LAPD conference website. The format for the data is somewhat bizarre.

They sent them all in one large string, with each disorder separated by the following characters: \`|$|\`.`,
  exercise: {
    starterCode: `// The string containing all personality disorders
const disorders = "Depression|$|Bipolar|$|Manic|$|Anxiety|$|Anorexia|$|Posttraumtic Stress|$|Seasonal Affective|$|Bulimia"

// Add your code here to:
// 1. Split the string into an array
// 2. Join the array back into a string with HTML tags`,
    solution: `const disorders = "Depression|$|Bipolar|$|Manic|$|Anxiety|$|Anorexia|$|Posttraumtic Stress|$|Seasonal Affective|$|Bulimia"

// Split the string into an array
const disorderArray = disorders.split("|$|")

// Join the array back into a string with HTML div tags
const htmlString = disorderArray.join("</div><div>")

// Add the opening and closing div tags
console.log(\`<div>\${htmlString}</div>\`)`,
    tests: [
      {
        name: "String Split",
        test: (code) => code.includes('.split("|$|")'),
        message: "Make sure you're splitting the string using the correct delimiter |$|"
      },
      {
        name: "Array Join",
        test: (code) => code.includes('.join("</div><div>")'),
        message: "Make sure you're joining the array with closing and opening div tags"
      },
      {
        name: "HTML Output",
        test: (code) => {
          return code.includes('<div>') &&
                 code.includes('</div>') &&
                 code.includes('${') &&
                 code.includes('}');
        },
        message: "Make sure you're wrapping the final string in div tags using template literals"
      }
    ]
  }
}