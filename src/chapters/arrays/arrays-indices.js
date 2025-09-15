import { TestResult } from "@nss-workshops/nss-core";

export const arrayIndicesChapter = {
  id: 'arrays-indices',
  title: 'Array Positions',
  sectionId: 'arrays',
  previousChapterId: 'arrays-intro',
  nextChapterId: 'arrays-iteration',
  content: `## Position of Items in an Array

As mentioned in the introduction, the most common type of collection in JavaScript is the array. An array can be identified by use of square brackets. The [ and the ] characters define an array. Here's a simple definition of an array. Think of it as an empty basket. Nothing is in it yet.

\`\`\`js
const appleBasket = []
\`\`\`

This is different than previous exercises where you assigned very concrete values to variables, like these.

\`\`\`js
const age = 37  // Clear, concrete numeric value
const name = "Edward McKnight" // Clear, concrete string value
\`\`\`

You can either declare a new array as empty, like above, or you can provide it with initial values upon declaration. For example, if you want some common color names to be in your array, you can provide those inside the square brackets.

\`\`\`js
const myFavoriteColors = [ "red", "violet", "pink", "green", "white", "orange" ]
\`\`\`

The myFavoriteColors variable still has a single value, but it is more abstract. Its value is a collection of strings, or more specifically, an array of strings.

The placement of each number in that array is called its "index". The indexing of an array starts at zero, not one. That is, the item at index 0 of the above array is the string value "red".

-   The item at index 0 is the string "red"
-   The item at index 1 is the string "violet"
-   The item at index 2 is the string "pink"
-   The item at index 3 is the string "green"
-   The item at index 4 is the string "white"
-   The item at index 5 is the string "orange"

You can, if you need to, look at the item at a specific index by using the following syntax.

\`\`\`js
arrayVariable[index number]
\`\`\`

So if you want to console.log() the color "white", you would write the following code.

\`\`\`js
const whiteColor = myFavoriteColors[4]
console.log(whiteColor)
\`\`\`

If you want to console.log() the color "violet", you would write the following code.

\`\`\`js
const violetColor = myFavoriteColors[1]
console.log(violetColor)
\`\`\`

## Exercise: Glass Scrubber

You work in a fancy restaurant. You are in your first month, and everyone they hire starts in the kitchen as a dish cleaner. Your job, specifically, is to scrub the glasses clean. Over in the code editor, you will find an array of dirty dishes. This represents the large sink in the back of the restaurant where the waiter place all of the dirty dishes.

Your job is to identify the 3 dirty glasses by using their index in the array and assign them to a corresponding variable. When you run the code, it should display the following.

\`\`\`html
I am cleaning the following glasses:
- Water glass
- Wine glass
- Whiskey glass
\`\`\``,
  exercise: {
    starterCode: `// Here are all the dirty dishes
const dirtyDishes = [
    "Soup bowl",
    "Water glass",
    "Salad plate",
    "Wine glass",
    "Dinner plate",
    "Whiskey glass"
]

// Your code here
const firstGlass =
const secondGlass =
const thirdGlass =

// Display the glasses to clean
console.log("I am cleaning the following glasses:")
console.log(\`- \${firstGlass}\`)
console.log(\`- \${secondGlass}\`)
console.log(\`- \${thirdGlass}\`)`,
    solution: `const firstGlass = dirtyDishes[1]  // Water glass
const secondGlass = dirtyDishes[3] // Wine glass
const thirdGlass = dirtyDishes[5]  // Whiskey glass`,
    tests: [
      {
        name: "First Glass",
        test: (code) => {
          try {
            const wrapper = new Function(`${code} \n return firstGlass === dirtyDishes[1];
            `);
            const passed = wrapper();
            return new TestResult({passed:passed});
          } catch {
            return new TestResult({passed:false, message:"Code error. Did you define firstGlass?"});
          }
        },
        message: "Make sure to get the Water glass at index 1"
      },
      {
        name: "Second Glass",
        test: (code) => {
          try {
            const wrapper = new Function(`${code}\nreturn secondGlass === dirtyDishes[3];
            `);
            const passed = wrapper();
            return new TestResult({passed});
          } catch {
            return new TestResult({passed:false, message:"Code error. Did you define secondGlass?"});
          }
        },
        message: "Make sure to get the Wine glass at index 3"
      },
      {
        name: "Third Glass",
        test: (code) => {
          try {
            const wrapper = new Function(`${code}\nreturn thirdGlass === dirtyDishes[5];
            `);
            const passed = wrapper();
            return new TestResult({passed:passed});
          } catch {
            return new TestResult({passed:false, message:"Code error. Did you define thirdGlass?"});
          }
        },
        message: "Make sure to get the Whiskey glass at index 5"
      },
      {
        name: "First Glass",
        test: (code) => new TestResult({passed:code.includes('dirtyDishes[1]')}),
        message: "Make sure to use square bracket notation array[index] to access index 1 and get the Water glass."
      },
      {
        name: "Second Glass",
        test: (code) => new TestResult({passed:code.includes('dirtyDishes[3]')}),
        message: "Make sure to use square bracket notation array[index] to access index 3 and get the Wine glass."
      },
      {
        name: "Third Glass",
        test: (code) => new TestResult({passed:code.includes('dirtyDishes[5]')}),
        message: "Make sure to use square bracket notation array[index] to access index 5 and get the Whiskey glass."
      }
    ]
  }
}