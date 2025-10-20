import { TestResult } from "@nss-workshops/nss-core";

export const leonidsObjects = {
  id: "leonids-objects",
  title: "Representing Toys as Objects",
  sectionId: "leonids",
  previousChapterId: "leonids-data-structures",
  nextChapterId: "leonids-arrays",
  content: `
In this chapter, you will be using the object data structure that you learned about in Chapter 2 to represent some toys in code.

## Learning Objectives

* You should be able to demonstrate that you can create objects with the correct syntax.
* You should be able to explain that variables are labels that refer to values, not the value itself.

## Practice: Define Toy Objects Using Descriptive Properties

## Define **three toy objects**:

- Assign each object to a descriptive variable name  
- Use full, meaningful property names  
- Each object must have the **same set of six required properties**  
- At least **one property in each toy must be set to \`null\`**

### 🧸 Required Properties (for every toy)

| Property Name         | Type     | Description                                      |
|-----------------------|----------|--------------------------------------------------|
| \`name\`                | string   | The name of the toy                             |
| \`manufacturer\`        | string   | Who made the toy                                |
| \`priceInDollars\`      | number   | The price of the toy in U.S. dollars            |
| \`inStock\`             | boolean  | Whether the toy is currently in stock           |
| \`recommendedAgeRange\`| string   | The appropriate age group for the toy           |
| \`weightInGrams\`       | number   | The weight of the toy in grams                  |

👉 If any value is missing, use \`null\` — not \`""\`, \`0\`, or \`undefined\`.

### 🧸 Toy Object Variables

You must create three separate toy objects using these variable names:

1. \`woodenTrain\`  
2. \`stuffedRabbit\`  
3. \`kite\`
  `,
  exercise: {
    starterCode: ``,
    solution: `// Define the woodenTrain object
const woodenTrain = {
  name: "Handcrafted Wooden Train",
  manufacturer: "Leonid's Toys",
  priceInDollars: 24.99,
  inStock: true,
  recommendedAgeRange: "3-10 years",
  weightInGrams: null // At least one property set to null
};

// Define the stuffedRabbit object
const stuffedRabbit = {
  name: "Plush Stuffed Rabbit",
  manufacturer: "Leonid's Toys",
  priceInDollars: 19.95,
  inStock: null, // At least one property set to null
  recommendedAgeRange: "0-5 years",
  weightInGrams: 250
};

// Define the kite object
const kite = {
  name: "Colorful Painted Kite",
  manufacturer: null, // At least one property set to null
  priceInDollars: 14.50,
  inStock: true,
  recommendedAgeRange: "5-12 years",
  weightInGrams: 180
};`,
    tests: [
      {
        name: "Defines woodenTrain as an object",
        test: (code) => {
          try {
            const func = new Function(code + `\n return woodenTrain;`);
            const toy = func();
            const passed = typeof toy === "object" && toy !== null;
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "woodenTrain should be a non-null object"
      },
      {
        name: "Defines stuffedRabbit as an object",
        test: (code) => {
          try {
            const func = new Function(code + `\n return stuffedRabbit;`);
            const toy = func();
            const passed = typeof toy === "object" && toy !== null;
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "stuffedRabbit should be a non-null object"
      },
      {
        name: "Defines kite as an object",
        test: (code) => {
          try {
            const func = new Function(code + `\n return kite;`);
            const toy = func();
            const passed = typeof toy === "object" && toy !== null;
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "kite should be a non-null object"
      },
      {
        name: "Each toy has 6 required properties",
        test: (code) => {
          try {
            const func = new Function(code + `\n return [woodenTrain, stuffedRabbit, kite];`);
            const toys = func();
            const passed = toys.every(toy => {
              const keys = Object.keys(toy);
              return keys.includes("name") &&
                     keys.includes("manufacturer") &&
                     keys.includes("priceInDollars") &&
                     keys.includes("inStock") &&
                     keys.includes("recommendedAgeRange") &&
                     keys.includes("weightInGrams");
            });
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Each toy should include all six required properties"
      },
      {
        name: "Each toy has at least one null property",
        test: (code) => {
          try {
            const func = new Function(code + `\n return [woodenTrain, stuffedRabbit, kite];`);
            const toys = func();
            const passed = toys.every(toy => Object.values(toy).some(v => v === null));
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Each toy should have at least one property set to null"
      }
    ],
  },
};
