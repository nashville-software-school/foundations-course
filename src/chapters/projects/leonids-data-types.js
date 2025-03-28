export const leonidsDataTypes = {
  id: "leonids-data-types",
  title: "Data Types",
  sectionId: "leonids",
  previousChapterId: null,
  nextChapterId: "leonids-data-structures",
  content: `
  ## Leonid's Toys

> Leonid Androvsky is a second-generation Lithuanian who took over the hand-made toy shoppe that his father, Antonin, started and managed for 42 years. What was once known as Antonin's Toy World got renamed by Leonid to Leonid's Bespoke Toy Shoppe to attract more modern parents.
>
> Leonid has hired you to write some code that will help him keep track of his toy inventory. He knows nothing about code or software, so you need to learn the basics so that he can start to automate his business practices.

## Learning Objectives

* You should be able to remember the basic data types you will be working with in JavaScript.
* You should be able to describe the data type of different properties of real-world things that you represent in code.

## Describing Toys as Data

As a software developer, you will always be thinking about data - the type of your data, the structure of your data, the format of your data, and how to display your data to humans in a Web browser. In the beginning of the course, here are the basic data types you will be working with.

## Strings

You will use strings to represent words to be stored in your applications. A string is surrounded by double-quotes.

\`\`\`js
const firstName = "Emily"
const lastName = "Lemmon"
\`\`\`

## Numbers

If you store a person's age, or a measurement, or a count of something, you will store it as a number. There are two types of numbers.

### Integers

These are whole numbers: 1, 3, 45, 1024

\`\`\`js
const applesInTheBasket = 16
\`\`\`

### Floats

Any fraction represented in decimal format: 1.333, 2.414, 3.14159, 86.75, 309.1

\`\`\`js
const pi = 3.14159
\`\`\`

## Booleans

The logical values of \`true\` and \`false\`. You will use these values as you might expect in your applications. For example, if you want to track if a user account is currently active or not, you can use \`true\` if the account is active, or \`false\` if it is inactive.

\`\`\`js
const accountIsActive = true
\`\`\`

## Practice: Toy Data Types

Leonid wants to keep track of his toys. The function createToy is already provided, 
but it's up to you to call the function with the correct data types for each slot.
The values are up to you as long as they have the correct data type!

Instructions:

- Call createToy with appropriate values.
- Ensure each argument matches the correct data type.
- Toy dimensions should are specified as numbers with width & height 
    name, category, ageRecommendation, isBatteryOperated, features, dimensions
- Your solution should pass the provided test cases.`,
  exercise: {
    starterCode: `function createToy(name, category, ageRecommendation, isBatteryOperated, features, dimensions) {
    return {
        name,
        category,
        ageRecommendation,
        isBatteryOperated,
        features,
        dimensions
    };
}

// TODO: Call createToy with the correct data types
const myToy = createToy( /* Fill in the arguments correctly */ );`,
    solution: ``,
    tests: [
      {
        name: "Test Name",
        test: (code) => {
          try {
            const func = new Function(code + "\n return myToy;");
            const toy = func();
            return typeof toy.name === "string";
          } catch {
            return false;
          }
        },
        message: "What data should represent a toy name?",
      },
      {
        name: "Test Category",
        test: (code) => {
          try {
            const func = new Function(code + "\n return myToy;");
            const toy = func();
            return typeof toy.category === "string";
          } catch {
            return false;
          }
        },
        message: "What data should represent a toy category?",
      },
      {
        name: "Test Age Recommendation",
        test: (code) => {
          try {
            const func = new Function(code + "\n return myToy;");
            const toy = func();
            return typeof toy.ageRecommendation === "number";
          } catch {
            return false;
          }
        },
        message: "What data type should store the recommended age?",
      },
      {
        name: "Test Battery Operated",
        test: (code) => {
          try {
            const func = new Function(code + "\n return myToy;");
            const toy = func();
            return typeof toy.isBatteryOperated === "boolean";
          } catch {
            return false;
          }
        },
        message: "How do we represent a yes/no property?",
      },
      {
        name: "Test Features",
        test: (code) => {
          try {
            const func = new Function(code + "\n return myToy;");
            const toy = func();
            return (
              Array.isArray(toy.features) &&
              toy.features.every((f) => typeof f === "string")
            );
          } catch {
            return false;
          }
        },
        message: "What data type should store multiple features?",
      },
      {
        name: "Test Features",
        test: (code) => {
          try {
            const func = new Function(code + "\n return myToy;");
            const toy = func();
            return (
              typeof toy.dimensions === "object" && toy.dimensions !== null &&
              typeof toy.dimensions.height === "number" &&
                        typeof toy.dimensions.width === "number");
          } catch {
            return false;
          }
        },
        message: "What data type should represent the toy’s dimensions? What data type should dimensions height and width be?",
      },
    ],
  },
};
