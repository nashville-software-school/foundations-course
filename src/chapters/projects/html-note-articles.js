import { TestResult } from "../../utils/test_utils";

export const htmlNoteArticlesId = {
    id: "html-note-articles",
    title: "HTML Note Articles",
    sectionId: "daily-notes",
    previousChapterId: "list-of-notes-by-topic",
    nextChapterId: "note-topics-subsection",
    content: `
In preparation for when you are going to be contructing HTML representations of your data to be displayed in a web browser, you are going to be constructing some strings in this chapter that contain the \`<article>\` element, with the text from each note contained _(interpolated)_ inside it.

# 📰Practice: Display Notes as HTML Articles

You’ve listed topics and filtered notes. Now Leonid wants to wrap each note’s text in an HTML \`<article>\` element. It’s not going on the web — just good practice!

1. Start by printing this header: \`console.log("***  Note Articles  ***");\`
2. Use a for...of loop to go through the notes array.
3. In each loop, use console.log() to print the text of the note wrapped in an HTML-style article tag, like this:
\`<article>Note text here</article>\`

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
    topics: ["thinking", "help"],
    text: "I have found that slowing down and thinking about the problem, and writing out the comments makes it vastly easier to write code.",
    author: "Gib Jeffries",
    date: "2021-01-18"
  },
  {
    id: 3,
    topics: ["strategy", "professional", "help"],
    text: "Review all my old code before asking for help or looking at hints.",
    author: "Samantha Maas",
    date: "2020-11-09"
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
    topics: ["thinking", "help"],
    text: "I have found that slowing down and thinking about the problem, and writing out the comments makes it vastly easier to write code.",
    author: "Gib Jeffries",
    date: "2021-01-18"
  },
  {
    id: 3,
    topics: ["strategy", "professional", "help"],
    text: "Review all my old code before asking for help or looking at hints.",
    author: "Samantha Maas",
    date: "2020-11-09"
  }
];
      console.log("***  Note Articles  ***");

for (const note of notes) {
  console.log(\`<article>\${note.text}</article>\`);
}`,
      tests: [
        {
          name: "Logs the header",
          test: (code) => {
            try {
              const logs = [];
              const mockConsole = { log: (msg) => logs.push(msg) };
        
              const func = new Function("console", code);
              func(mockConsole);
        
              const passed = logs[0] === "***  Note Articles  ***";
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "You should log the header: ***  Note Articles  ***"
        },
        {
          name: "Logs each note wrapped in <article>",
          test: (code) => {
            try {
              const logs = [];
              const mockConsole = { log: (msg) => logs.push(msg) };
              const func = new Function( "console", code);
              func(mockConsole);
              const expected = ["<article>Always work on a branch and submit a PR, even if I'm working on my own project.</article>",
              "<article>I have found that slowing down and thinking about the problem, and writing out the comments makes it vastly easier to write code.</article>",
              "<article>Review all my old code before asking for help or looking at hints.</article>"]
              const passed = logs.slice(1).join("|") === expected.join("|");
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Each note should be printed as <article>Note Text</article>"
        },
        {
          name: "Uses for...of loop",
          test: (code) => {
            try {
              const passed = /\bfor\s*\(\s*const\s+\w+\s+of\s+notes\s*\)/.test(code);
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Use a for...of loop to iterate through notes"
        },
        {
          name: "Uses template literals and string interpolation",
          test: (code) => {
            try {
              const passed = /`<article>\$\{.*\.text\}<\/article>`/.test(code);
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Use a template literal to wrap note.text in <article> tags"
        }
      ],
    },
  };
