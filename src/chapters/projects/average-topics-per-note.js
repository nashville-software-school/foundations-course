import { TestResult } from "../../utils/test_utils";

export const averageTopicsPerNoteId = {
    id: "average-topics-per-note",
    title: "Average Topics per Note",
    sectionId: "daily-notes",
    previousChapterId: "list-of-topics",
    nextChapterId: "list-of-notes-by-topic",
    content: `## Practice: Calculate average

Calculate and display the **average number of topics** used across all notes.

You already have a \`notes\` array where each note has a \`topics\` array. 
Your task is to:

1. Count the **total number of topics** across all notes
2. Count the **number of notes**
3. Calculate the **average topics per note**
4. Use \`console.log()\` to print the results

### ✅ Your output should start with this line:
*** Average Topics Per Note ***

Then log the **average as a number**, rounded to one decimal place (e.g., \`2.0\` or \`2.3\`).
## 💡 Example Output
*** Average Topics Per Note *** 2.0

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
      solution: `const notes = [
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
];
console.log("*** Average Topics Per Note ***");

let totalTopics = 0;

for (const note of notes) {
  totalTopics += note.topics.length;
}

const average = (totalTopics / notes.length).toFixed(1);
console.log(average);`,
      tests: [
        {
          name: "Prints the correct header line",
          test: (code) => {
            try {
              const logs = [];
              const mockConsole = { log: (msg) => logs.push(msg) };
        
              const func = new Function( "console", code);
              func(mockConsole);
              const passed = logs[0] === "*** Average Topics Per Note ***";
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "You should start with console.log(\"*** Average Topics Per Note ***\")"
        },
        {
          name: "Calculates and logs the correct average",
          test: (code) => {
            try {
              const logs = [];
              const mockConsole = { log: (msg) => logs.push(msg) };
        
              const func = new Function("console", code);
              func(mockConsole);
              const passed = logs.includes("2.0");
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "You must calculate and display the correct average number of topics per note"
        },
        {
          name: "Uses .toFixed(1)",
          test: (code) => {
            try {
              const passed = /\.toFixed\s*\(\s*1\s*\)/.test(code);
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "You should use .toFixed(1) to round the average to one decimal place"
        }
      ],
    },
  };