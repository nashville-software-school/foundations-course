export const objectsPropertiesChapter = {
  id: 'objects-properties',
  title: 'Adding Properties',
  path: '/objects-properties',
  sectionId: 'objects',
  previousChapterId: 'objects-libraries',
  nextChapterId: 'objects-voting',
  content: `Just because you create an object that has 4 properties on it, it doesn't mean that the object will always have 4 properties on it. You can create more properties on it any time you wish. You just need to use dot \`.\` notation and assign a value.

Here's an example where a flute object is initially created with no owner, but after it is purchased, an owner is added.

\`\`\`js
// Create a flute object
const flute = {
    material: "Steel",
    length: 15,
    manufacturer: "Bloomgarden",
    price: 56.39
}

// Later, add a new property
flute.owner = "Richard Bywater"
console.log(flute)

// The flute object now has a new property
{
    material: "Steel",
    length: 15,
    manufacturer: "Bloomgarden",
    price: 56.39,
    owner: "Richard Bywater"
}
\`\`\`

## Practice: Goldfish Tanks

In the sample code provided, there is an object that represents a goldfish. Your job is to add a new property named \`location\` whose value is "Large Tank" so that you can keep track of where your goldfish is currently located amongst all the different tanks you have in your house.`,
  exercise: {
    starterCode: `const goldfish = {
    name: "Angela",
    type: "Fantail",
    size: "Small",
    color: "Golden"
}`,
    solution: `const goldfish = {
    name: "Angela",
    type: "Fantail",
    size: "Small",
    color: "Golden"
}

goldfish.location = "Large Tank"`,
    tests: [
      {
        name: "Location Property Added",
        test: (code) => {
          const func = new Function(code + '\nreturn goldfish');
          const goldfish = func();
          return goldfish.hasOwnProperty('location');
        },
        message: "Make sure you're using dot notation to add the location property"
      },
      {
        name: "Correct Tank Value",
        test: (code) => {
          const func = new Function(code + '\nreturn goldfish');
          const goldfish = func();
          return goldfish.location === "Large Tank";
        },
        message: "Make sure you set the location to 'Large Tank'"
      }
    ]
  }
}