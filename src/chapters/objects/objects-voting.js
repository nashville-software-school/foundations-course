export const objectsVotingChapter = {
  id: 'objects-voting',
  title: 'Section Project',
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
\`\`\`
`,
  exercise: {
    starterCode: `const votingLocation = {
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

// First, add the new property


// Second, produce the required string
const output = \`\`


console.log(output)
`,
    solution: `const votingLocation = {
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

const output = \`\${votingLocation.manager} manages the \${votingLocation.name} at \${votingLocation.address.street.number} \${votingLocation.address.street.name} in \${votingLocation.address.city}, \${votingLocation.address.state}\`

console.log(output)

`,
    tests: [
      {
        name: "Manager Property Added Correctly",
        test: (code) => {
          try {
            // Execute the student's code and check if the manager property was added
            const evalFunction = new Function(code + '; return votingLocation.manager;');
            const managerValue = evalFunction();

            // Check if manager property has the correct value
            return managerValue === "Abigail Brown" && code.includes('votingLocation.manager')
          } catch (error) {
            return false;
          }
        },
        message: "Make sure you've added the 'manager' property with dot notation."
      },
      {
        name: "String Interpolation Used",
        test: (code) => {
          // Verify proper template literal syntax is used
          return code.includes('`${') && code.includes('}`');
        },
        message: "Make sure you're using string interpolation."
      },
      {
        name: "Output Has Exact Required Format",
        test: (code) => {
          try {
            // Execute the code and get the output value
            const evalFunction = new Function(code + '; return output;');
            const outputString = evalFunction();

            // Check against the exact expected string
            const expectedOutput = "Abigail Brown manages the Commonwealth Community Center at 70 Main Street in Nashville, TN";

            return outputString === expectedOutput;
          } catch (error) {
            return false;
          }
        },
        message: "Make sure your output string exactly matches the required format."
      }
    ]
  }
}