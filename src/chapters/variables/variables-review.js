import { TestResult } from "../../utils/test_utils";

export const variablesReviewChapter = {
  id: 'variables-review',
  title: 'Section Project',
  sectionId: 'variables-and-values',
  previousChapterId: 'evaluations',
  nextChapterId: 'array-intro',
  content: `You are going to have to come up with your own variable names and values in this review. You will likely need to go back to previous exercises to review the concepts and look at the code that you have already written. That is highly encouraged, because that's what professional software developers do. No experienced developer will tell you that all of the information is memorized. They review their previous code all the time in order to apply it in new situations.

You will be using the following concepts in this exercise:

* Variables and their values
* Integer values
* String values
* Boolean values
* Mathematical operations
* Multi-line strings for output
* If/Else blocks for conditional logic
* \`>=\`, \`<\`, \`>\`, and \`&&\` operators

## Exercise: Family Photo Album

> We will provide some initial ideas for variable names. Feel free to change them to suit your own style. All that matters is their value.

You inherited a collection of family photos from your grandparents. They are currently stored in several envelopes of varying sizes. You decide that you have three options.

1. If there are more than 110 photos, then you decide that you need to purchase a **Photo Album** and put them in it.
2. If there are less than 110, but 50 or more, you will purchase a **Shoe Box** and put all of the photos in it.
3. If there are less than 50, you will keep them in **Envelopes**.

\`\`\`js
let photoStorage = "Envelopes"
\`\`\`

You are also going to categorize the photos into picture of the men in the family, and the women in the family. You want to keep track of those categories and the total.

\`\`\`js
let totalPhotos = 0  // To start off with
const femalePhotos = 52
\`\`\`

If there are more women than men in the photos, you will buy a plum photo album. If there are more men than women, you will buy a gray photo album.

\`\`\`js
let albumColor = ""
\`\`\`

When your logic is done, you need to check if it is correct.

* Change the number of photos of men and women to different amounts to verify that all three storage types are used in the right conditions.
* Have more male photos and check the logic
* Have more female photos and check the logic

### Expected Output

Our test will assume that there are 124 photos, and will have a majority of pictures of women. Use \`console.log()\` - with a string temple - to output the following string:

\`\`\`html
There are xxx total photos
There are xxx photos of women
There are xxx photos of men
Photos will be stored in a xxx colored xxx
\`\`\`

Try it in the editor!`,
  exercise: {
    starterCode: `// Initialize variables for photo counts
let photoStorage = "Envelopes"
const femalePhotos = 72  // More women for our test case
const malePhotos = 52    // Total will be 124
let totalPhotos = 0
let albumColor = ""

// Calculate total photos


// Determine storage type based on total


// Determine album color based on gender comparison


// Create the expected output string using string interpolation
const output = \`\`

// Log your output
console.log()
`,
    solution: `// Initialize variables for photo counts
let photoStorage = "Envelopes"
const femalePhotos = 72  // More women for our test case
const malePhotos = 52    // Total will be 124
let totalPhotos = 0
let albumColor = ""

// Calculate total photos
totalPhotos = femalePhotos + malePhotos

// Determine storage type based on total
if (totalPhotos > 110) {
    photoStorage = "Photo Album"
} else if (totalPhotos >= 50) {
    photoStorage = "Shoe Box"
} else {
    photoStorage = "Envelopes"
}

// Determine album color based on gender comparison
if (femalePhotos > malePhotos) {
    albumColor = "plum"
} else {
    albumColor = "gray"
}

// Create the output string using string interpolation
const output = \`There are \${totalPhotos} total photos
There are \${femalePhotos} photos of women
There are \${malePhotos} photos of men
Photos will be stored in a \${photoStorage} colored \${albumColor}\`

console.log(output)
`,
    tests: [
      {
        name: "Total Photos Calculation",
        test: (code) => {
          try {
            const func = new Function(code + '\n return output')
            const result = func()
            if (result === undefined) return false

            const expectedOutput = `There are 124 total photos
There are 72 photos of women
There are 52 photos of men
Photos will be stored in a Photo Album colored plum`
            // Remove spaces and newlines for comparison
            const resultOutput = result.replace(/\s+/g, ' ').trim()
            const expectedOutputTrimmed = expectedOutput.replace(/\s+/g, ' ').trim()
            return new TestResult({passed:resultOutput === expectedOutputTrimmed})
          } catch (error) {
            return  new TestResult({passed:false})
          }
        },
        message: "Make sure your string matches exactly the expected output. Check for spaces, periods, and new lines."
      },
      {
        name: "Storage Type Selection",
        test: (code) => {
          try {
            const func = new Function(code + '; return photoStorage')
            const result = func()
            if (result === undefined) return false
            return  new TestResult({passed:result === "Photo Album" &&
                   code.includes('if') &&
                   code.includes('else') &&
                   code.includes('110') &&
                   code.includes('50')})
          } catch {
            return  new TestResult({passed:false})
          }
        },
        message: "Use if/else statements to determine storage type based on total photos (>110 for album, >=50 for shoe box)"
      },
      {
        name: "Album Color Selection",
        test: (code) => {
          try {
            const func = new Function(code + '\n return albumColor;')
            const result = func()
            if (result === undefined) return false
            return  new TestResult({passed:result === "plum"})
          } catch {
            return  new TestResult({passed:false})
          }
        },
        message: "Determine album color based on comparing femalePhotos and malePhotos"
      }
    ]
  }
}