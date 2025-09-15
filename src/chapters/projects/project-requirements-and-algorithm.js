import { TestResult } from "@nss-workshops/nss-core";

export const projectRequirementsAndAlgorithmId = {
  id: "project-requirements-and-algorithm",
  title: "Project Requirements and Algorithm",
  sectionId: "daily-notes",
  previousChapterId: null,
  nextChapterId: 'note-objects-and-array',
  content: `## Algorithm

The most important part of this project is that you write your algorithms out in comments before you code. Starting this practice right now will have a significantly positive impact on your ability to understand what code you need to write.

## How A Senior Developer Would Do It

Here are the first requirements for this project.

1. You need to store many notes for a user in a collection.
1. Each note needs to store the following information.
    1. The note of the text
    1. The author of the note
    1. The date the note was entered
    1. The category of the note
1. A note can be assigned any number of topics. For example...
    1. "task"
    1. "observation"
    1. "code"
    1. "learning"
    1. "feelings"
    1. etc...

### Beginning Algorithm Comments

Given those requirements, here is how each would be described by a professional developer.

\`\`\`
/*
    Define a variable named \`notes\` and assign a value of an empty array
*/


/*
    Fill the array with several starter objects that have
    the following properties.
        * id (number)
        * text (string)
        * author (string)
        * date (string)
        * topics (array of strings)

    Either define the objects within the initial array or
    use the .push() method to add them after initialization.
*/
\`\`\`

Why do developers do this? The two main reasons are...

1. Reflecting on the problem and writing comments saves time. If you start with code, without thinking it through, you waste large amounts of time in the long run.
1. When you come back and look at this code again in the future, there is a ready-made explanation for the code. Again, this saves large amounts of time for "future you".

Since you are a beginner, you **must** start with algorithm development with comments before you write code.

## Practice: Define a Notes Array with Structured Objects

Create an array called \`notes\` that holds several note objects, each with specific properties.

## 📝 Instructions

1. Define a variable named \`notes\` and assign it an empty array.
Each note object should include the following properties:

| Property | Type             | Example                        |
|----------|------------------|--------------------------------|
| \`id\`     | number           | \`1\`                            |
| \`text\`   | string           | \`"Meeting with Leonid"\`        |
| \`author\` | string           | \`"Andrea"\`                     |
| \`date\`   | string (ISO date)| \`"2025-03-25"\`                 |
| \`topics\` | array of strings | \`["inventory", "pricing"]\`     |


#### Example Object
\`\`\`{
  id: 1,
  text: "Discussed pricing strategy",
  author: "Andrea",
  date: "2025-03-25",
  topics: ["pricing", "marketing"]
}
`,
  exercise: {
    starterCode: ``,
    solution: `const notes = [];
notes.push({
  id: 1,
  text: "Discussed pricing strategy with Leonid.",
  author: "Andrea",
  date: "2025-03-25",
  topics: ["pricing", "marketing"]
});
notes.push({
  id: 2,
  text: "Inventory review and shelf restocking.",
  author: "Leonid",
  date: "2025-03-24",
  topics: ["inventory", "stocking"]
});
notes.push({
  id: 3,
  text: "Scheduled next team meeting.",
  author: "Andrea",
  date: "2025-03-23",
  topics: ["meetings", "planning"]
});`,
    tests: [
      {
        name: "Defines notes as an array",
        test: (code) => {
          try {
            const func = new Function(code + "\n return Array.isArray(notes);");
            const passed = func();
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "You must define a variable named `notes` as an array"
      },
      {
        name: "Includes at least three note objects",
        test: (code) => {
          try {
            const func = new Function(code + "\n return notes;");
            const result = func();
            const passed = Array.isArray(result) && result.length >= 3;
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "The notes array should contain at least three objects"
      },
      {
        name: "Each note has the correct properties and types",
        test: (code) => {
          try {
            const func = new Function(code + "\n return notes;");
            const result = func();
            const passed = result.every(note =>
              typeof note.id === "number" &&
              typeof note.text === "string" &&
              typeof note.author === "string" &&
              typeof note.date === "string" &&
              Array.isArray(note.topics) &&
              note.topics.every(topic => typeof topic === "string")
            );
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Each note must have id, text, author, date, and topics (an array of strings)"
      },
      {
        name: "Each note has at least one topic",
        test: (code) => {
          try {
            const func = new Function(code + "\n return notes;");
            const result = func();
            const passed = result.every(note => Array.isArray(note.topics) && note.topics.length > 0);
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Each note must include at least one topic"
      }
    ],
  },
};