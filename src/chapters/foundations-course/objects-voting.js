export const objectsVotingChapter = {
  id: 'objects-voting',
  title: 'Section Project',
  path: '/foundations-course/objects-voting',
  sectionId: 'objects',
  previousChapterId: 'objects-properties',
  nextChapterId: null,
  content: `## Voting Booth Volunteers

In this exercise, you are going to access some nested object properties, and practice adding properties. Then you will use string interpolation to display the name, location, and manager of a voting booth location.

### Step 1

In the starter code provided, add a new property to the booth object after it is created. Do not modify the original object.

* Property name should be \`manager\`
* Property value should be "Abigail Brown"

### Step 2

Use string interpolation to return the following string from the function. Remember to use the backticks and \`\${}\` to inject variables into the string.

"Abigail Brown manages the Commonwealth Community Center at 70 Main Street in Nashville, TN"

## Next Steps

After you complete this exercise, go back to the classroom and open the Closet Inventory project to see how software developers use objects to display information in the browser.

\`\`\`js
{
    name: "Commonwealth Community Center",
    address: {
        street: {
            number: 70,
            name: "Main Street"
        },
        city: "Nashville",
        state: "TN",
        zipCode: "37021"
    }
}
\`\`\``,
  exercise: {
    starterCode: `const votingBooth = () => {
    const votingLocation = {
        name: "Commonwealth Community Center",
        address: {
            street: {
                number: 70,
                name: "Main Street"
            },
            city: "Nashville",
            state: "TN",
            zipCode: "37021"
        }
    }
    // Add the new property
    votingLocation. = ""

    // Use string interpolation after the \`return\` keyword to produce the required string
    return
}`,
    solution: `const votingBooth = () => {
    const votingLocation = {
        name: "Commonwealth Community Center",
        address: {
            street: {
                number: 70,
                name: "Main Street"
            },
            city: "Nashville",
            state: "TN",
            zipCode: "37021"
        }
    }
    // Add the new property
    votingLocation.manager = "Abigail Brown"

    // Use string interpolation after the \`return\` keyword to produce the required string
    return \`\${votingLocation.manager} manages the \${votingLocation.name} at \${votingLocation.address.street.number} \${votingLocation.address.street.name} in \${votingLocation.address.city}, \${votingLocation.address.state}\`
}`,
    tests: [
      {
        name: "Manager Property Added",
        test: (code) => code.includes('votingLocation.manager'),
        message: "Make sure you're using dot notation to add the manager property"
      },
      {
        name: "Manager Value Set",
        test: (code) => code.includes('"Abigail Brown"') || code.includes("'Abigail Brown'"),
        message: "Make sure you set the manager to 'Abigail Brown'"
      },
      {
        name: "String Interpolation Used",
        test: (code) => code.includes('`${'),
        message: "Make sure you're using string interpolation with backticks and ${}"
      },
      {
        name: "Correct Output Format",
        test: (code) => code.includes('manages the') && code.includes('at') && code.includes('in'),
        message: "Make sure your output matches the required format"
      }
    ]
  }
}