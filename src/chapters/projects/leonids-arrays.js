import { TestResult } from "../../utils/test_utils";

export const leonidsArrays = {
  id: "leonids-arrays",
  title: "Toy Collection",
  sectionId: "leonids",
  previousChapterId: "leonids-objects",
  nextChapterId: "leonids-iteration",
  content: `
In this chapter, you will build an array filled with objects. Each item in the array will be one of your toys.

## Learning Objectives

* You should be able to define an array that contains multiple objects.
* You should be able to explain that objects defined directly in an array do not need to be assigned to variables.
* You should be able to demonstrate that you can create an array of objects using the correct syntax.

## Objects in Arrays

In the previous chapters, you created multiple objects and assigned each one to its own variable to be used later.

\`\`\`js
const iPhone = {
    maker: "Apple",
    operatingSystem: "iOS",
    price: 900,
    weight: 1.2
}

const galaxy = {
    maker: "Samsung",
    operatingSystem: "Android",
    price: 600,
    weight: 1.4
}
\`\`\`

Now you are going to put both of those objects into an array, rather than being discrete variables. Here's how you would put those phone objects into an array as one, large data structure.

\`\`\`js
const phones = [
    {
        id: 1,
        name: "iPhone",
        maker: "Apple",
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
\`\`\`

Notice that the individual variables for each phone are gone. Now the **entire array of phones** is assigned to a single variable named, shockingly, \`phones\`. Naming the variable whose value is an array should always be plural. If you have an array of farm animals, call the variable \`animals\`, or even more descriptively, \`farmAnimals\`.

You get the point.

One thing you might do as a beginner is forget to put a comma between the two objects. Look at the array above again and notice that there is a comma after the first closing curly brace, and before the second opening one.

\`\`\`js
[
    {

    },  <-- Don't forget this comma
    {

    },  <-- Or this one
    {

    }   <-- Don't need one at the end
]
\`\`\`

## Practice: Array of Toy Objects

In this exercise, you’ll define an array that contains 
**three toy objects**, each using full and descriptive property names.


## 📝 Instructions

- Define a constant variable named \`toyInventory\`
- It should be assigned to an array that contains **three toy objects**
- Each toy object should have the following **required properties**:
  - \`name\` (string)
  - \`manufacturer\` (string)
  - \`priceInDollars\` (number)
- **Do not** assign each toy object to a separate variable — define them directly in the array
- You may add more properties if you like, but at least one object must include a \`null\` value for one of its properties
  `,
  exercise: {
    starterCode: ``,
    solution: ``,
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
        message: "toyInventory should be an array"
      },
      {
        name: "toyInventory contains three objects",
        test: (code) => {
          try {
            const func = new Function(code + "\n return toyInventory.length === 3 && toyInventory.every(t => typeof t === 'object' && t !== null);");
            const passed = func();
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "toyInventory should contain three non-null objects"
      },
      {
        name: "Each object has required properties",
        test: (code) => {
          try {
            const func = new Function(code + "\n return toyInventory.every(t => 'name' in t && 'manufacturer' in t && 'priceInDollars' in t);");
            const passed = func();
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Each object should have name, manufacturer, and priceInDollars properties"
      },
      {
        name: "At least one object has a null value",
        test: (code) => {
          try {
            const func = new Function(code + "\n return toyInventory.some(t => Object.values(t).includes(null));");
            const passed = func();
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "At least one toy should have a property set to null"
      },
      {
        name: "Only toyInventory is declared",
        test: (code) => {
          try {
            // Match all variable declarations: const, let, or var
            const matches = [...code.matchAll(/\b(?:const|let|var)\s+([a-zA-Z_$][\w$]*)/g)];
      
            const declaredVariables = matches.map(m => m[1]);
      
            // Only one declared variable: toyInventory
            const passed = declaredVariables.length === 1 && declaredVariables[0] === "toyInventory";
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "Only the toyInventory array should be declared—no extra object variables"
      }
      
    ],
  },
};
