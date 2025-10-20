import { TestResult } from "@nss-workshops/nss-core";

export const noteTopicsSubsectionId = {
    id: "note-topics-subsection",
    title: "Note Topics Subsection",
    sectionId: "daily-notes",
    previousChapterId: "html-note-articles",
    nextChapterId: null,
    content: `
Now you need to create some \`<section>\` HTML elements for each note article.

# Practice: Topics Subsections

You’ll use nested \`for...of\` loops to generate an HTML-like article for each note. Each article will include the note's text and a list of its topics inside \`<section>\` elements.

1. Start with this line: \`console.log("***  Note Articles  ***");\`

2. Then build a string named allHTML using template literals.
Use a for...of loop to go through the notes array.

3. Inside the outer loop:
Add the note’s text wrapped in an \`<article>\` tag
Then loop through each topic using another \`for...of\` loop
Add each topic wrapped in a \`<section>\` tag
`,
    exercise: {
      starterCode: `const notes = [
  {
    id: 1,
    topics: ["strategy", "github"],
    text: "Always work on a branch and submit a PR, even if I'm working on my own project.",
    author: "Red Tilson",
    date: "2020-11-25"
  },
  {
    id: 2,
    topics: ["strategy", "help", "professional"],
    text: "Review all my old code before asking for help or looking at hints.",
    author: "Samantha Maas",
    date: "2020-11-09"
  },
  {
    id: 3,
    topics: ["thinking", "help"],
    text: "I have found that slowing down and thinking about the problem, and writing out the comments makes it vastly easier to write code.",
    author: "Gib Jeffries",
    date: "2021-01-18"
  }
];`,
      solution: `const notes = [
  {
    id: 1,
    topics: ["strategy", "github"],
    text: "Always work on a branch and submit a PR, even if I'm working on my own project.",
    author: "Red Tilson",
    date: "2020-11-25"
  },
  {
    id: 2,
    topics: ["strategy", "help", "professional"],
    text: "Review all my old code before asking for help or looking at hints.",
    author: "Samantha Maas",
    date: "2020-11-09"
  },
  {
    id: 3,
    topics: ["thinking", "help"],
    text: "I have found that slowing down and thinking about the problem, and writing out the comments makes it vastly easier to write code.",
    author: "Gib Jeffries",
    date: "2021-01-18"
  }
];
console.log("***  Note Articles  ***");

let allHTML = "";

for (const note of notes) {
  allHTML += \`<article>\n\${note.text}\n\`;
  for (const topic of note.topics) {
    allHTML += \`<section>\${topic}</section>\n\`;
  }
  allHTML += \`</article>\n\n\`;
}

console.log(allHTML);
`,
      tests: [
        {
            name: "Logs the header correctly",
            test: (code) => {
              try {
                const logs = [];
                const mockConsole = { log: (msg) => logs.push(msg) };
                const func = new Function( "console", code);
                func( mockConsole);
                const passed = logs[0] === "***  Note Articles  ***";
                return new TestResult({passed});
              } catch (error) {
                return new TestResult({passed: false, message: error.message});
              }
            },
            message: "Should log the header line: ***  Note Articles  ***"
          },
          {
            name: "Prints note text inside <article>",
            test: (code) => {
              try {
                const logs = [];
                const mockConsole = { log: (msg) => logs.push(msg) };
                const func = new Function( "console", code);
                func(mockConsole);
                const result = logs[1];
                const passed = result.includes("<article>") && result.includes("Always work on a branch and submit a PR, even if I'm working on my own project.") && result.includes("</article>");
                return new TestResult({passed});
              } catch (error) {
                return new TestResult({passed: false, message: error.message});
              }
            },
            message: "Each note text should be wrapped in an <article> tag"
          },
          {
            name: "Prints each topic inside <section>",
            test: (code) => {
              try {
                const logs = [];
                const mockConsole = { log: (msg) => logs.push(msg) };
                const func = new Function( "console", code);
                func( mockConsole);
                const html = logs[1];
                const passed = html.includes("<section>strategy</section>") && html.includes("<section>github</section>");
                return new TestResult({passed});
              } catch (error) {
                return new TestResult({passed: false, message: error.message});
              }
            },
            message: "Each topic should be wrapped in a <section> tag"
          },
          {
            name: "Uses nested for...of loop",
            test: (code) => {
              try {
                const passed = /for\s*\(\s*const\s+\w+\s+of\s+notes\s*\)[\s\S]*for\s*\(\s*const\s+\w+\s+of\s+\w+\.topics\s*\)/.test(code);
                return new TestResult({passed});
              } catch (error) {
                return new TestResult({passed: false, message: error.message});
              }
            },
            message: "You should use a nested for...of loop to iterate through topics"
          },
          {
            name: "Uses template literals with interpolation",
            test: (code) => {
              try {
                const passed = /`[\s\S]*\$\{[^}]+\}[\s\S]*`/.test(code);
                return new TestResult({passed});
              } catch (error) {
                return new TestResult({passed: false, message: error.message});
              }
            },
            message: "You should use template literals with ${} to format each string"
          }
      ],
    },
  };