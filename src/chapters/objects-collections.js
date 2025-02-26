export const objectsCollectionsChapter = {
  id: 'objects-collections',
  title: 'Object Collections',
  sectionId: 'objects',
  previousChapterId: 'objects-multiple',
  nextChapterId: 'objects-complex',
  content: `## Object Collections

If previous work in the Foundations Course, you learned how to store a collection of related data in an array and how to use iteration to do something with everything in the array.

Example, an array of your teammates's names can be joined together using a for..of loop, which iterates the array.

\`\`\`js
// Array of strings
const names = ["Jameka", "Rose", "Martin", "Greg", "Mary"]

// Blank string
let team = ""

// Iterate teammate name array
for (const name of names) {

  // Append to the team variable's value
  team += \`Teammate: \${name}\n\`
} console.log(team)

/* Teammate: Jameka
Teammate: Rose
Teammate: Martin
Teammate: Greg
Teammate: Mary
*/
\`\`\`

In this exercise, you will be working with an array of objects.

Using the same kind of logic that was in the example above, you can replace the string values in the array with objects that represent each teammate. It's still a collection of your teammates, but instead of simple string representations of each person, you now have object representations.

\`\`\`js
// Array of objects
const teammateArray = [
  {
    firstName: "Jameka",
    lastName: "Williams"
  },
  {
    firstName: "Rose",
    lastName: "McCallister",
  },
  {
    firstName: "Martin",
    lastName: "Orodruin"
  },
  {
    firstName: "Greg",
    lastName: "Killgrew"
  },
  {
    firstName: "Mary",
    lastName: "Thomas"
  }
]

// Blank string
let team = ""

// Iterate teammate name array
for (const teammateObject of teammateArray) {

  // Append to the team variable's value.
  // Use dot notation to access properties on objects.
  team += \`Teammate: \${teammateObject.firstName} \${teammateObject.lastName}\n\`
}

console.log(team) /* Teammate: Jameka Williams
Teammate: Rose McCallister
Teammate: Martin Orodruin
Teammate: Greg Killgrew
Teammate: Mary Thomas
*/
\`\`\`

#### Line Breaks in Strings

In the code above, if you look at the end of the string template, you will notice two characters: a backslash and the letter n.

\`\`\`js
team += \`Teammate: \${teammateObject.firstName} \${teammateObject.lastName}\n\`
\`\`\`

Those two characters create a new line in the string. This allows you to have the output shown above, where each teammate is on a new line instead of one, continuous string.

## Exercise: Doctor's Office Schedule

The office manager of a doctor's office wants to provide a list each day that shows the name of each patient, and the time of their appointment. An array of objects is provided with some same patients represented as objects. Write a for..of loop that iterates the objects in the array, and then use dot notation to append the patient's full name, and the time of their appointment to the string value of the schedule variable.

#### Example output (yours will look different because the data is different)

Patient Nancy Johnson has an appointment at 9:30

Patient Clarrissa Ford has an appointment at 10:15

Patient Abigail Debrowski has an appointment at 11:00

Patient John Beury has an appointment at 1:20

> Note: Make sure you use \\n at the end of your string templates to make each appointment on its own line`,
  exercise: {
    starterCode: `// Sample appointments array
const appointments = [
    {
        firstName: "Maria",
        lastName: "Sanchez",
        appointmentTime: "2:15"
    },
    {
        firstName: "John",
        lastName: "McGrath",
        appointmentTime: "1:30"
    },
    {
        firstName: "Lamar",
        lastName: "Washington",
        appointmentTime: "10:15"
    }
]

// Create schedule string
let schedule = ""

// Add your code here`,
    solution: `// Sample appointments array
const appointments = [
    {
        firstName: "Maria",
        lastName: "Sanchez",
        appointmentTime: "2:15"
    },
    {
        firstName: "John",
        lastName: "McGrath",
        appointmentTime: "1:30"
    },
    {
        firstName: "Lamar",
        lastName: "Washington",
        appointmentTime: "10:15"
    }
]

// Create schedule string
let schedule = ""

// Iterate the array and create appointment strings
for (const appointment of appointments) {
    schedule += \`Patient \${appointment.firstName} \${appointment.lastName} has an appointment at \${appointment.appointmentTime}\n\`
}

console.log(schedule)`,
    tests: [
      {
        name: "For..of Loop",
        test: (code) => code.includes('for (const') && code.includes(' of appointments)'),
        message: "Make sure you're using a for..of loop to iterate the appointments array"
      },
      {
        name: "Object Property Access",
        test: (code) => {
          return code.includes('.firstName') &&
                 code.includes('.lastName') &&
                 code.includes('.appointmentTime');
        },
        message: "Make sure you're using dot notation to access all required object properties"
      },
      {
        name: "String Template",
        test: (code) => {
          return code.includes('`Patient ${') &&
                 code.includes('has an appointment at ${');
        },
        message: "Make sure your output string matches the required format"
      },
      {
        name: "Line Breaks",
        test: (code) => code.includes('\\n'),
        message: "Make sure to add line breaks after each appointment"
      }
    ]
  }
}