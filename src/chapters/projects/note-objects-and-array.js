export const noteObjectsAndArrayId = {
    id: "note-objects-and-array",
    title: "Note Objects and Array",
    sectionId: "daily-notes",
    previousChapterId: "project-requirements-and-algorithm",
    nextChapterId: "list-of-notes",
    content: `
In the last chapter, you had an algorithm that defined the code you needed to write before you wrote any code.

That's smart.

Keep doing that.

## Instructions

For this chapter, you need to add at least 3 more notes to your array, but this time you must use the \`.push()\` array method on the array to add them, even if you did it in the last chapter. Chances are that you have already forgotten the syntax, or at least feel unsure about.

That's normal and part of the life of a professional - especially a beginner.

How a professional handles this situation?

1. Refer to old code where the syntax had been used previously.
1. Search the Web if the code has never been written before, or its location can't be recalled.

> A professional **never** thinks, "I should remember how to do this. I'll just stare at my screen and slap different code in here until it works."


Remember, use all the other resources at your disposal before looking at hints. 
Start thinking like a professional now and become an efficient learner, not a lazy one.

## Practice: Adding more notes

You already have a \`notes\` array with a few starter note objects. 
Your task now is to **add 3 more note objects** to the array using the \`.push()\` method.

Each object must include:

- \`id\` (number)
- \`topics\` (array of strings)
- \`text\` (string)
- \`author\` (string)
- \`date\` (string in \`YYYY-MM-DD\` format)

You must use **\`notes.push()\` three times**, once for each new object.

## 🧾 New Notes to Add
\`\`\`
{
  id: 4,
  topics: [ "strategy", "professional", "help" ],
  text: "Review all my old code before asking for help or looking at hints.",
  author: "Samantha Maas",
  date: "2020-11-09"
}
{
  id: 5,
  topics: [ "thinking" ],
  text: "I have found that slowing down and thinking about the problem, and writing out the comments makes it vastly easier to write code.",
  author: "Gib Jeffries",
  date: "2021-01-18"
}
{
  id: 6,
  topics: [ "reminder", "github" ],
  text: "Need to have all my code backed up to Github by the end of the week.",
  author: "Rebecca Parker",
  date: "2021-02-25"
}
`,
    exercise: {
      starterCode: `const notes = [{
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
}];`,
      solution: `notes.push({
  id: 4,
  topics: ["strategy", "professional", "help"],
  text: "Review all my old code before asking for help or looking at hints.",
  author: "Samantha Maas",
  date: "2020-11-09"
});

notes.push({
  id: 5,
  topics: ["thinking"],
  text: "I have found that slowing down and thinking about the problem, and writing out the comments makes it vastly easier to write code.",
  author: "Gib Jeffries",
  date: "2021-01-18"
});

notes.push({
  id: 6,
  topics: ["reminder", "github"],
  text: "Need to have all my code backed up to Github by the end of the week.",
  author: "Rebecca Parker",
  date: "2021-02-25"
});`,
      tests: [
        {
          name: "Adds notes with IDs 4, 5, and 6",
          test: (code) => {
            try {
              const func = new Function(code + "\n return notes;");
              const result = func();
              const ids = result.map(n => n.id);
              return ids.includes(4) && ids.includes(5) && ids.includes(6);
            } catch {
              return false;
            }
          },
          message: "notes should include objects with IDs 4, 5, and 6"
        },
        {
          name: "Each new note has the correct properties",
          test: (code) => {
            try {
              const func = new Function(code + "\n return notes.filter(n => n.id >= 4);");
              const result = func();
              return result.length === 3 && result.every(n =>
                typeof n.text === "string" &&
                typeof n.author === "string" &&
                typeof n.date === "string" &&
                Array.isArray(n.topics) &&
                n.topics.every(topic => typeof topic === "string")
              );
            } catch {
              return false;
            }
          },
          message: "Each new note must have text, author, date, and topics (array of strings)"
        },
        {
          name: "Uses .push() exactly three times",
          test: (code) => {
            const pushMatches = code.match(/notes\.push\s*\(/g);
            return pushMatches && pushMatches.length === 3;
          },
          message: "You should use notes.push() exactly three times"
        }
      ],
    },
  };