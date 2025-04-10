import { TestResult } from "../../utils/test_utils";

export const leonidsArraysPush = {
  id: "leonids-arrays-push",
  title: "New Toys",
  sectionId: "leonids",
  previousChapterId: "leonids-iteration",
  nextChapterId: "leonids-string-interpolation",
  content: `
In this chapter you will learn about the \`push()\` method that is available on every array which allows you to add things to the array.

## Add a New Phone

Ok, so far, your phone business is pretty limited. You're only selling the iPhone and the Samsung Galaxy. You want to add the Google Pixel to your catalog. The first step is to define the new phone.

Make sure that each object you create has an \`id\` property value that is 1 greater than the last one.

\`\`\`js
// Existing phone catalog
const phones = [
    {
        id: 1,
        name: "iPhone",
        maker: "Apple, Inc.",
        operatingSystem: "iOS",
        price: 900,
        weight: 1.2
    },
    {
        id: 2,
        name: "Galaxy",
        maker: "Samsung",
        operatingSystem: "Android",
        price: 600,
        weight: 1.4
    }
]

// Define a new phone
const pixel = {
    id: 3,
    name: "Pixel",
    maker: "Google",
    operatingSystem: "Android",
    price: 750,
    weight: 1.3
}
\`\`\`

Now that you have a new phone object assigned as the value of the \`pixel\` variable, you can add that new object to the end of your array with \`push()\`.

\`\`\`js
phones.push(pixel)
\`\`\`

Now, when your \`for..of\` loop runs, you will see three prices listed instead of two.

![](./images/three-phones-after-push.gif)

## Practice: New Toys

Leonid is expanding his toy collection. 

### Your job (part 1):

1. Create an  **empty array** called \`toyInventory\`.
2. Add three new toy names to the \`toyInventory\` array using the \`.push()\` method  
3. Use \`.push()\` **one time for each toy** (no shortcuts like pushing multiple items at once)
4. Use the exact toy names shown below (case-sensitive)

#### 🧸 Toy names to add:
- \`"Wooden Train"\`
- \`"Stuffed Rabbit"\`
- \`"Painted Kite"\`

### Your job (part 2):
You’ve learned how to push strings into an array. Now Leonid wants each toy to be stored as a full **object** with both a name and a price.

1. Define a variable called \`toyInventoryCollection\` and set it to an empty array
2. Use \`.push()\` **three times**
3. Each \`.push()\` call must push a full object with two properties:
   - \`name\` (string)
   - \`priceInDollars\` (number)

Use these **exact toy names and prices**:

| name            | priceInDollars |
|-----------------|----------------|
| Wooden Train    | 30             |
| Stuffed Rabbit  | 25             |
| Painted Kite    | 20             |
  `,
  exercise: {
    starterCode: ``,
    solution: `
    const toyInventory = [];
toyInventory.push("Wooden Train");
toyInventory.push("Stuffed Rabbit");
toyInventory.push("Painted Kite");

const toyInventoryCollection = [];
toyInventoryCollection.push({ name: "Wooden Train", priceInDollars: 30 });
toyInventoryCollection.push({ name: "Stuffed Rabbit", priceInDollars: 25 });
toyInventoryCollection.push({ name: "Painted Kite", priceInDollars: 20 });`,
    tests: [
        {
          name: "Defines toyInventory as an array",
          test: (code) => {
            try {
              const func = new Function(code + "\n return Array.isArray(toyInventory);");
              const passed = func();
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "You should define toyInventory as an array"
        },
        {
          name: "Array contains the three correct toy names",
          test: (code) => {
            try {
              const func = new Function(code + "\n return toyInventory;");
              const result = func();
              const passed = Array.isArray(result) &&
                     result.length === 3 &&
                     result[0] === "Wooden Train" &&
                     result[1] === "Stuffed Rabbit" &&
                     result[2] === "Painted Kite";
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "toyInventory should contain all three toys in the correct order"
        },
        {
          name: "Each push adds only one item",
          test: (code) => {
            try {
              const pushCalls = code.match(/\.push\s*\([^,]+?\)/g);
              const passed = pushCalls && pushCalls.length === 3;
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Use .push() three separate times, each with a single argument"
        },
        {
          name: "Does not assign array all at once",
          test: (code) => {
            try {
              const passed = !/toyInventory\s*=\s*\[[^\]]+\]/.test(code);
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Do not use a full array literal to define toyInventory. Use .push() instead"
        },
        {
          name: "Defines toyInventoryCollection as an array",
          test: (code) => {
            try {
              const func = new Function(code + "\n return Array.isArray(toyInventoryCollection);");
              const passed = func();
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "You should define toyInventoryCollection as an array"
        },
        {
          name: "Array contains three toy objects",
          test: (code) => {
            try {
              const func = new Function(code + "\n return toyInventoryCollection;");
              const result = func();
              const passed = Array.isArray(result) &&
                     result.length === 3 &&
                     result.every(t => typeof t === "object" && t !== null);
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "toyInventoryCollection should contain three objects"
        },
        {
          name: "Each object has name and priceInDollars",
          test: (code) => {
            try {
              const func = new Function(code + "\n return toyInventoryCollection;");
              const result = func();
              const passed = result.every(toy =>
                'name' in toy &&
                'priceInDollars' in toy &&
                typeof toy.name === "string" &&
                typeof toy.priceInDollars === "number"
              );
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Each toy should have a name (string) and priceInDollars (number)"
        },
        {
          name: "Each object was added using push",
          test: (code) => {
            try {
              const pushCalls = code.match(/\.push\s*\(\s*{[^}]+}\s*\)/g);
              const passed = pushCalls && pushCalls.length === 3;
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Use .push() three times to add objects directly"
        },
        {
          name: "Objects have correct name and price values",
          test: (code) => {
            try {
              const func = new Function(code + "\n return toyInventoryCollection;");
              const result = func();
              const passed = result[0].name === "Wooden Train" && result[0].priceInDollars === 30 &&
                     result[1].name === "Stuffed Rabbit" && result[1].priceInDollars === 25 &&
                     result[2].name === "Painted Kite" && result[2].priceInDollars === 20;
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "The pushed objects must match the exact name and price values"
        }
    ],
  },
};
