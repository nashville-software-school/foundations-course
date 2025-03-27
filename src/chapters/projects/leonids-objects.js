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
    solution: ``,
    tests: [
      {
        name: "Defines woodenTrain as an object",
        test: (code) => {
          try {
            const func = new Function(code + `\n return woodenTrain;`);
            const toy = func();
            console.log("toy",toy)
            return typeof toy === "object" && toy !== null;
          } catch {
            return false;
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
            return typeof toy === "object" && toy !== null;
          } catch {
            return false;
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
            return typeof toy === "object" && toy !== null;
          } catch {
            return false;
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
            return toys.every(toy => {
              const keys = Object.keys(toy);
              return keys.includes("name") &&
                     keys.includes("manufacturer") &&
                     keys.includes("priceInDollars") &&
                     keys.includes("inStock") &&
                     keys.includes("recommendedAgeRange") &&
                     keys.includes("weightInGrams");
            });
          } catch {
            return false;
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
            return toys.every(toy => Object.values(toy).some(v => v === null));
          } catch {
            return false;
          }
        },
        message: "Each toy should have at least one property set to null"
      }
    ],
  },
};
