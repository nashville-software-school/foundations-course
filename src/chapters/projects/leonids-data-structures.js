export const leonidsDataStructures = {
  id: "leonids-data-structures",
  title: "Data Structures",
  sectionId: "leonids",
  previousChapterId: "leonids-data-types",
  nextChapterId: "leonids-objects",
  content: `
Data structures are also types in a software language, and therefore can be referred to as _structural types_, that are more complex than their more primitive cousins that you learned about in the previous chapter. There are two common data structures that you will be using in the course.

## Learning Objectives

* You should be able to remember the two data structures you will be working with in JavaScript.
* You should be able to explain the purpose of each data structure.
* You should be able to understand that each individual resource in a data system requires a unique identifier.
* You should be able to identify which property on an object is the unique identifier.

## Arrays

Arrays are used to store a list, or collection, of things. Just like when you go to the grocery store and you write down a list of things you need to buy. You could represent your list of grocery items in an array.

Instead of curly braces, an array of items is surrounded by square brackets \`[]\`.

\`\`\`js
const groceryList = [ "Milk", "Tomato Sauce", "Bananas", "Taco Shells", "Jalapeno", "Sour cream"]
\`\`\`

## Object

An object is a collection of values that have keys assigned to them. Much the way you define variables to store values...

\`\`\`js
const age = 31
\`\`\`

A key is used on an object to refer to values about the object. For example, you want to store all of the properties of a patient visiting a doctor's office. You would create an object to store all of those properties in a single data structure instead of in separate variables.

\`\`\`js
const megan = {
    id: 1,
    age: 31,
    firstName: "Megan",
    lastName: "Debity"
}

const jack = {
    id: 2,
    age: 28,
    firstName: "Jack",
    lastName: "Parsons"
}
\`\`\`

You could also be selling phones and want to represent each phone as an object.

\`\`\`js
const iPhone = {
    id: 1,
    name: "iPhone",
    maker: "Apple",
    operatingSystem: "iOS",
    price: 900,
    weight: 1.2
}

const galaxy = {
    id: 2,
    name: "Galaxy",
    maker: "Samsung",
    operatingSystem: "Android",
    price: 600,
    weight: 1.4
}
\`\`\`

All of the keys and values are contained within the opening and closing curly braces \`{}\`. Each key/value pair is separated by a comma _(except after the last one)_.

## Unique Identifier

You may be wondering why all of the objects above have that weird \`id\` property on them. The reason is that nearly all data storage systems that you will use as a professional will have the requirement that every single time you create a new thing to be stored, it must have a unique, integer identifier.

Therefore, the first thing you create will have an \`id\` value of 1. The second thing you create will have an \`id\` value of 2. The unique identifier continues to get incremented by one every time you create something.

Because of this, you are going to add an \`id\` property to every single object you create from now one.

Eventually, you won't even need to do it. It will be handled for you. You just need to get used to the fact that everything will have that property.

## Practice: Leonid’s Toy Inventory

Write a function called \`findToyById(toys, id)\` that:

- Takes an **array** of toy objects (\`toys\`)

Each toy has:

- \`id\`: a **unique identifier** (number)  
- \`name\`: the name of the toy (string)  
- \`maker\`: who crafted it (string — usually just “Leonid” for now)

The function should:

- Return the **toy object** that matches the given \`id\`  
- If no toy is found, return \`null\`
  `,
  exercise: {
    starterCode: `
    const inventory = [
  { id: 101, name: "Hand-Carved Wooden Train", maker: "Leonid" },
  { id: 102, name: "Painted Rocking Horse", maker: "Leonid" },
  { id: 103, name: "Stuffed Bear with Bow Tie", maker: "Leonid" },
  { id: 104, name: "Miniature Sailboat", maker: "Leonid" },
  { id: 105, name: "Patchwork Doll", maker: "Leonid" },
  { id: 106, name: "Wooden Puzzle Box", maker: "Leonid" },
  { id: 107, name: "Knitted Sock Monkey", maker: "Leonid" },
  { id: 108, name: "Spinning Top", maker: "Leonid" },
  { id: 109, name: "Tiny Puppet Theater", maker: "Leonid" },
  { id: 110, name: "Hand-Painted Marbles", maker: "Leonid" },
  { id: 111, name: "Fabric Kite with Tail", maker: "Leonid" },
  { id: 112, name: "Wool-Stuffed Bunny", maker: "Leonid" },
  { id: 113, name: "Wooden Xylophone", maker: "Leonid" },
  { id: 114, name: "Tin Wind-Up Robot", maker: "Leonid" },
  { id: 115, name: "Miniature Toy Chest", maker: "Leonid" }
];

function findToyById(toys, id) {
  // Your code here
}`,
    solution: ``,
    tests: [
      {
        name: "Finds toy with id 101",
        test: (code) => {
          try {
            const func = new Function(code + `\n return findToyById([{ id: 101, name: 'Hand-Carved Wooden Train', maker: 'Leonid' }], 101);`);
            const toy = func();
            return toy.name === "Hand-Carved Wooden Train";
          } catch {
            return false;
          }
        },
        message: "Should return the toy with id 101"
      },
      {
        name: "Returns null for nonexistent id",
        test: (code) => {
          try {
            const func = new Function(code + `\n return findToyById([{ id: 101, name: 'Hand-Carved Wooden Train', maker: 'Leonid' }], 999);`);
            const toy = func();
            return toy === null;
          } catch {
            return false;
          }
        },
        message: "Should return null when id is not found"
      },
      {
        name: "Finds toy with id 110",
        test: (code) => {
          try {
            const func = new Function(code + `\n return findToyById([
              { id: 110, name: 'Hand-Painted Marbles', maker: 'Leonid' },
              { id: 111, name: 'Fabric Kite with Tail', maker: 'Leonid' }
            ], 110);`);
            const toy = func();
            return toy.name === "Hand-Painted Marbles";
          } catch {
            return false;
          }
        },
        message: "Should return the toy with id 110"
      },
      {
        name: "Returns correct object type",
        test: (code) => {
          try {
            const func = new Function(code + `\n return findToyById([{ id: 105, name: 'Patchwork Doll', maker: 'Leonid' }], 105);`);
            const toy = func();
            return typeof toy === "object" && toy !== null;
          } catch {
            return false;
          }
        },
        message: "Should return a non-null object"
      },
      {
        name: "Does not return incorrect toy",
        test: (code) => {
          try {
            const func = new Function(code + `\n return findToyById([
              { id: 115, name: 'Miniature Toy Chest', maker: 'Leonid' },
              { id: 114, name: 'Tin Wind-Up Robot', maker: 'Leonid' }
            ], 115);`);
            const toy = func();
            return toy.name !== "Tin Wind-Up Robot";
          } catch {
            return false;
          }
        },
        message: "Should not return a different toy with a wrong id"
      }
    ],
  },
};
