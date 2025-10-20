import { TestResult } from "@nss-workshops/nss-core";

export const listOfNotesId = {
    id: "list-of-notes",
    title: "List of Notes",
    sectionId: "daily-notes",
    previousChapterId: "note-objects-and-array",
    nextChapterId: "list-of-topics",
    content: `
## Instructions

Now that you have an array filled with a good number of note objects, it's time to list all of the notes to the terminal.

Iterate the array with a \`for..of\` loop and use \`console.log()\` to display **only** the \`text\` property of each object - not the full object.

# Prectice: List Only the Text from Each Note

Use a \`for...of\` loop and \`console.log()\` to display only the \`text\` property of each note in the \`notes\` array.

Now you need to **print only the \`text\` properties values** to the terminal.

1. Use a \`for...of\` loop to iterate through the \`notes\` array  
2. In each loop iteration, use \`console.log()\`  
3. Log only the \`text\` property — do **not** log the entire object

## 💡 Example Output

When your code runs, it should print lines like:

"Discussed pricing strategy with Leonid." "I have found that slowing down and thinking about the problem..." "Need to have all my code backed up to Github by the end of the week."
`,
    exercise: {
      starterCode: `const notes = [
  {
    id: 1,
    text: "Discussed pricing strategy with Leonid.",
    author: "Andrea",
    date: "2025-03-25",
    topics: ["pricing", "marketing"]
  },
  {
    id: 2,
    text: "Inventory review and shelf restocking.",
    author: "Leonid",
    date: "2025-03-24",
    topics: ["inventory", "stocking"]
  },
  {
    id: 3,
    text: "Scheduled next team meeting.",
    author: "Andrea",
    date: "2025-03-23",
    topics: ["meetings", "planning"]
  },
  {
    id: 4,
    text: "Review all my old code before asking for help or looking at hints.",
    author: "Samantha Maas",
    date: "2020-11-09",
    topics: ["strategy", "professional", "help"]
  },
  {
    id: 5,
    text: "I have found that slowing down and thinking about the problem, and writing out the comments makes it vastly easier to write code.",
    author: "Gib Jeffries",
    date: "2021-01-18",
    topics: ["thinking"]
  },
  {
    id: 6,
    text: "Need to have all my code backed up to Github by the end of the week.",
    author: "Rebecca Parker",
    date: "2021-02-25",
    topics: ["reminder", "github"]
  }
];`,
      solution: `for (const note of notes) {
  console.log(note.text);
}`,
      tests: [
        {
          name: "Uses for...of loop on notes array",
          test: (code) => {
            try {
              const passed = /\bfor\s*\(\s*const\s+\w+\s+of\s+notes\s*\)/.test(code);
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "You must use a for...of loop to iterate the notes array"
        },
        {
          name: "Uses console.log to output text property",
          test: (code) => {
            try {
              const passed = /console\.log\s*\(\s*\w+\.text\s*\)/.test(code);
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "You must use console.log(note.text) inside the loop"
        },
        {
          name: "Does not log full object",
          test: (code) => {
            try {
              const passed = !/console\.log\s*\(\s*\w+\s*\)/.test(code);
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Do not log the full object — only note.text"
        }
      ],
    },
  };