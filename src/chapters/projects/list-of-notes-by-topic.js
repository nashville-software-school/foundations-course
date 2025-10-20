import { TestResult } from "@nss-workshops/nss-core";

export const listOfNotesByTopicId = {
    id: "list-of-notes-by-topic",
    title: "List of Notes by Topic",
    sectionId: "daily-notes",
    previousChapterId: "average-topics-per-note",
    nextChapterId: "html-note-articles",
    content: `
A common task that software developers need to do is filter data by some criteria. You may have an array filled with thousands of objects, but you want to display a subset of those objects to your customers.

1. Products below a price
1. Houses in a zip code
1. Patients with a specific ailment
1. Equipment in a particular category

You need to examine every object in the array _(by iterating the array)_ and determine, for each one, if that object passes the condition _(with an \`if\` statement)_.


Use a loop and conditionals to filter notes based on a given topic and display the matching notes.

## Practice: Notes by Topics

You are given an array of \`notes\`. Each note has a \`topics\` property, which is an array of strings.

1. Create a new variable called \`filteredNotes\` and assign it to an empty array.
2. Create a variable called \`criteria\` with a string value \`"github"\`.
3. Use a \`for...of\` loop to iterate over \`notes\`.
4. Inside the loop, use \`.includes()\` to check if the \`topics\` array contains the value in \`criteria\`.
5. If it does, push the full note into \`filteredNotes\`.
6. After the loop, use \`console.log()\` to:
   - Print a heading: \`*** Notes with the <topic> topic ***\`
   - Print the \`filteredNotes\` array
`,
    exercise: {
      starterCode: `const notes = [
  {
    id: 1,
    topics: ["strategy", "professional", "help"],
    text: "Review all my old code before asking for help or looking at hints.",
    author: "Samantha Maas",
    date: "2020-11-09"
  },
  {
    id: 2,
    topics: ["thinking", "help"],
    text: "I have found that slowing down and thinking about the problem, and writing out the comments makes it vastly easier to write code.",
    author: "Gib Jeffries",
    date: "2021-01-18"
  },
  {
    id: 3,
    topics: ["reminder", "github"],
    text: "Need to have all my code backed up to Github by the end of the week.",
    author: "Rebecca Parker",
    date: "2021-02-25"
  },
  {
    id: 4,
    topics: ["strategy", "github"],
    text: "Always work on a branch and submit a PR, even if I'm working on my own project.",
    author: "Red Tilson",
    date: "2020-11-25"
  }
];`,
      solution: `const notes = [
  {
    id: 1,
    topics: ["strategy", "professional", "help"],
    text: "Review all my old code before asking for help or looking at hints.",
    author: "Samantha Maas",
    date: "2020-11-09"
  },
  {
    id: 2,
    topics: ["thinking", "help"],
    text: "I have found that slowing down and thinking about the problem, and writing out the comments makes it vastly easier to write code.",
    author: "Gib Jeffries",
    date: "2021-01-18"
  },
  {
    id: 3,
    topics: ["reminder", "github"],
    text: "Need to have all my code backed up to Github by the end of the week.",
    author: "Rebecca Parker",
    date: "2021-02-25"
  },
  {
    id: 4,
    topics: ["strategy", "github"],
    text: "Always work on a branch and submit a PR, even if I'm working on my own project.",
    author: "Red Tilson",
    date: "2020-11-25"
  }
];

const filteredNotes = [];
const criteria = "github";

for (const note of notes) {
  if (note.topics.includes(criteria)) {
    filteredNotes.push(note);
  }
}

console.log(\`*** Notes with the \${criteria} topic ***\`);
console.log(filteredNotes);
`,
      tests: [
        {
            name: "Defines filteredNotes as an array",
            test: (code) => {
              try {
                const func = new Function(code + "\n return Array.isArray(filteredNotes);");
                const passed = func();
                return new TestResult({passed});
              } catch (error) {
                return new TestResult({passed: false, message: error.message});
              }
            },
            message: "You should define filteredNotes as an empty array"
          },
          {
            name: "Uses criteria string for filtering",
            test: (code) => {
              try {
                const passed = /const\s+criteria\s*=\s*["'`](\w+)["'`]/.test(code);
                return new TestResult({passed});
              } catch (error) {
                return new TestResult({passed: false, message: error.message});
              }
            },
            message: "You should define a criteria string to filter by topic"
          },
          {
            name: "Pushes notes that match topic into filteredNotes",
            test: (code) => {
              try {
                const logs = [];
                const mockConsole = { log: (...args) => logs.push(args.join(' ')) };
                const codeWithExport = code + "\n return filteredNotes;";
                const func = new Function( "console", codeWithExport);
                const result = func(mockConsole);
                const passed = Array.isArray(result) &&
                       result.length === 2 &&
                       result[0].id === 3 &&
                       result[1].id === 4;
                return new TestResult({passed});
              } catch (error) {
                return new TestResult({passed: false, message: error.message});
              }
            },
            message: "You should correctly filter notes by topic"
          },
          {
            name: "Logs the header message with criteria topic",
            test: (code) => {
              try {
                const logs = [];
                const mockConsole = { log: (msg) => logs.push(msg) };
          
                const func = new Function( "console", code);
                func(mockConsole);
          
                const passed = logs.some(l => l.includes("*** Notes with the github topic ***"));
                return new TestResult({passed});
              } catch (error) {
                return new TestResult({passed: false, message: error.message});
              }
            },
            message: "You must log a header with the topic name using string interpolation"
          }
      ],
    },
  };