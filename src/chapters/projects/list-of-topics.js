export const listOfTopicsId = {
    id: "list-of-topics",
    title: "List of Topics",
    sectionId: "daily-notes",
    previousChapterId: "list-of-notes",
    nextChapterId: "average-topics-per-note",
    content: `
Now that you have listed all of the notes, you need to list all of the topics that have been used to describe the notes.

## Instructions

In this chapter you will need to write a \`for..of\` loop inside of another one since the topics on each note is an array as well.

## Practice: Notes Topics display

Each note in your \`notes\` array contains a \`topics\` property, which is an array of strings. 
Your goal is to:

1. Print the header line exactly as \`*** All Note Topics ***\`
2. List topics each on it's own line. The order of topics should follow the order of the notes and the order of topics within each note.
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

console.log("*** All Note Topics ***");

for (const note of notes) {
  for (const topic of note.topics) {
    console.log(topic);
  }
}
`,
      tests: [
        {
          name: "Prints header line first",
          test: (code) => {
            const logs = [];
            let con = { log: (msg) => logs.push(msg) };
            try {
              const func = new Function( "console", code);
              func(con);
              
              return logs[0] === "*** All Note Topics ***";
            } catch {
              return false;
            }
          },
          message: "You should start by logging '*** All Note Topics ***'"
        },
        {
          name: "Prints all topics in order",
          test: (code) => {
            const logs = [];
            const console = { log: (msg) => logs.push(msg) };
      
            try {
              const func = new Function( "console", code);
              func(console);
              const expected = [
                "*** All Note Topics ***",
                "pricing",
                "marketing",
                "inventory",
                "stocking",
                "meetings",
                "planning",
                "strategy",
                "professional",
                "help",
                "thinking",
                "reminder",
                "github",
              ];
              return JSON.stringify(logs) === JSON.stringify(expected);
            } catch {
              return false;
            }
          },
          message: "You should log each topic in order after the header"
        },
        {
          name: "Uses nested for...of loop",
          test: (code) => {
            return /\bfor\s*\(\s*const\s+\w+\s+of\s+\w+\s*\)[\s\S]*for\s*\(\s*const\s+\w+\s+of\s+\w+\.topics\s*\)/.test(code);
          },
          message: "You should use a for...of loop inside another for...of loop"
        }
      ],
    },
  };