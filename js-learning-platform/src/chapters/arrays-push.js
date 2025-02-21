export const arrayPushChapter = {
  id: 'arrays-push',
  title: 'Adding Items to Arrays',
  path: '/arrays-push',
  sectionId: 'arrays',
  previousChapterId: 'arrays-iteration',
  nextChapterId: 'arrays-conditions',
  content: `## Adding Items to an Array

In this chapter, you will learn how how to add items to an array.

## Review of String Interpolation

Before you read this chapter, this is a quick reminder about string interpolation. That weird word that means that you can inject a variable's value into a string.

#### Example

\`\`\`js
const giveUp = "give you up"
const letDown = "let you down"

console.log(\`Never gonna \${giveUp}, never gonna \${letDown}\`)
\`\`\`

Output is "Never gonna give you up, never gonna let you down"

## Array Push

There is a classic hip hop song from the 1980's that I always think of when I want to add a new value to an array. Arrays have a method on them named \`.push()\`. That method lets you add a new value as the last item in the array.

You will start off with this simple example where you have three pieces of paper that need to be copied. The original pieces of paper should not be touched. Therefore, you will end up with a new collection - or array - that will contain the copies.

Here's how you can add a new piece of paper to the collection that needs to be copies.

\`\`\`js
const originals = [ "Original paper 1", "Original paper 2", "Original paper 3" ]

originals.push("Original paper 4")

console.log(originals)
\`\`\`

This is the new contents of the array

\`\`\`js
[ "Original paper 1", "Original paper 2", "Original paper 3", "Original paper 4"]
\`\`\`

## Making Copies

Now it is time to combine the \`for\` loop with the \`push()\` method on an array to make a copy for each item in the \`originals\` array.

\`\`\`js
const originals = [ "Original paper 1", "Original paper 2", "Original paper 3" ]
const copies = []  // Blank array that will contain the copies

for (const paper of originals) {
  const copy = \`Copy of \${paper}\`
  copies.push(copy)
}

console.log(copies)
\`\`\`

Copy the code above and put it in the code editor and run it. You will see the new array displayed in the console below the editor.

## Exercise: The Hairy Potter

Your task is to iterate the array containing the chunks of clay and after your code is done, the \`toFireInKiln\` array should contain the string value "coffee mug" for every chunk of clay in the \`clay\` array.`,
  exercise: {
    starterCode: `const clay = [ "Chunk of clay", "Chunk of clay", "Chunk of clay", "Chunk of clay" ]
const toFireInKiln = []

for () {
   const mug = "coffee mug"
}

console.log(toFireInKiln)`,
    solution: `const clay = [ "Chunk of clay", "Chunk of clay", "Chunk of clay", "Chunk of clay" ]
const toFireInKiln = []

for (const chunk of clay) {
   const mug = "coffee mug"
   toFireInKiln.push(mug)
}

console.log(toFireInKiln)`,
    tests: [
      {
        name: "For..of Loop",
        test: (code) => code.includes('for (const') && code.includes(' of clay)'),
        message: "Make sure you're using a for..of loop to iterate the clay array"
      },
      {
        name: "Array Push",
        test: (code) => code.includes('toFireInKiln.push('),
        message: "Make sure to use the push() method to add mugs to the toFireInKiln array"
      },
      {
        name: "Coffee Mugs",
        test: (code) => code.includes('coffee mug'),
        message: "Make sure you're creating coffee mugs from the clay"
      }
    ]
  }
}