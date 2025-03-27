export const leonidsStringInterpolation = {
  id: "leonids-string-interpolation",
  title: "Toy Catalog",
  sectionId: "leonids",
  previousChapterId: "leonids-arrays-push",
  nextChapterId: "leonids-iteration-update",
  content: `
## String Interpolation

A quick reminder about string interpolation if you saw it in the pre-work. Otherwise, this is an introduction to string interpolation.

String interpolation is available in most high level languages like JavaScript, Python and C#. It allows you to easily build a long string with the value of variables injected into specific locations.

Here's a simple example first.

\`\`\`js
const age = 27
const name = "Melissa Bell"

const interpolatedString = \`\${name} is \${age} years old\`
console.log(interpolatedString)
\`\`\`

> **ℹ️ Info:** Go ahead and copy the code above into the code editor and click "Run Code" it. 

Note that the string is built with the backtick character. That's not a single quote at the beginning and end of the string. You can find the backtick character above the TAB key on your keyboard.

Then you use \`\${}\` to place the value of any variable into the string.

The above code would output the following string.

\`\`\`txt
Melissa Bell is 27 years old
\`\`\`

## Phone Catalog String

Say you want to display the string \`"The Apple, Inc. iPhone costs 900 dollars."\`

All of that data is currently contained in the object representation you have been using in the previous chapters.

\`\`\`js
{
    id: 1,
    name: "iPhone",
    maker: "Apple, Inc.",
    operatingSystem: "iOS",
    price: 900,
    weight: 1.2
}
\`\`\`

Here's how you could display that sentence for every phone in the array.

\`\`\`js
for (const phone of phones) {
    console.log(\`The \${phone.maker} \${phone.name} costs \${phone.price} dollars.\`)
}
\`\`\`

## Practice: Iterate Leonid's Toy Catalog

Leonid wants his catalog to look clean and professional. You’ve been asked to:

1. Define a variable called \`toyCatalog\` as an array
2. Add **exactly three objects** to it, each with these properties:
   - \`name\` (string)
   - \`priceInDollars\` (number)
   - \`color\` (string)
3. Define a new array named \`displayCatalog\`
4. Use a \`for...of\` loop to build a string for each toy with this exact format:
    \`Toy: <name> | Price: $<priceInDollars> | Color: <color>\`
5. Push each formatted string into the \`displayCatalog\` array.

### 🎯 Use these exact toys (in this order):

\`\`\`js
{ name: "Wooden Train", priceInDollars: 30, color: "Red" }
{ name: "Stuffed Rabbit", priceInDollars: 25, color: "Gray" }
{ name: "Painted Kite", priceInDollars: 20, color: "Blue" }
\`\`\`
  `,
  exercise: {
    starterCode: ``,
    solution: `const toyCatalog = [
  { name: "Wooden Train", priceInDollars: 30, color: "Red" },
  { name: "Stuffed Rabbit", priceInDollars: 25, color: "Gray" },
  { name: "Painted Kite", priceInDollars: 20, color: "Blue" }
];
const displayCatalog = [];
for (const toy of toyCatalog) {
  const line = \`Toy: \${toy.name} | Price: \$\${toy.priceInDollars} | Color: \${toy.color}\`;
  displayCatalog.push(line);
}`,
    tests: [
      {
        name: "Defines toyCatalog with three objects",
        test: (code) => {
          try {
            const func = new Function(code + "\n return toyCatalog;");
            const result = func();
            return Array.isArray(result) &&
                   result.length === 3 &&
                   result[0].name === "Wooden Train" &&
                   result[1].name === "Stuffed Rabbit" &&
                   result[2].name === "Painted Kite";
          } catch {
            return false;
          }
        },
        message: "toyCatalog must contain the three specific toy objects"
      },
      {
        name: "Uses for...of loop over toyCatalog",
        test: (code) => {
          return /\bfor\s*\(\s*const\s+\w+\s+of\s+toyCatalog\s*\)/.test(code);
        },
        message: "You should use a for...of loop to iterate over toyCatalog"
      },
      {
        name: "Pushes formatted strings into displayCatalog",
        test: (code) => {
          try {
            const func = new Function(code + "\n return displayCatalog;");
            const result = func();
            return Array.isArray(result) &&
                   result.length === 3 &&
                   result[0] === "Toy: Wooden Train | Price: $30 | Color: Red" &&
                   result[1] === "Toy: Stuffed Rabbit | Price: $25 | Color: Gray" &&
                   result[2] === "Toy: Painted Kite | Price: $20 | Color: Blue";
          } catch {
            return false;
          }
        },
        message: "displayCatalog should contain correctly formatted catalog entries"
      },
      {
        name: "Uses template literals and dot notation",
        test: (code) => {
          return /`\s*Toy:\s*\$\{.*\.name\}\s*\|\s*Price:\s*\$\$\{.*\.priceInDollars\}\s*\|\s*Color:\s*\$\{.*\.color\}\s*`/.test(code);
        },
        message: "You should use string interpolation and dot notation to access and format each toy's info"
      }
    ],
  },
};
