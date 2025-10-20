import { TestResult } from "@nss-workshops/nss-core";

export const leonidsIteration = {
  id: "leonids-iteration",
  title: "Displaying Toy Properties",
  sectionId: "leonids",
  previousChapterId: "leonids-arrays",
  nextChapterId: "leonids-arrays-push",
  content: `
## Learning Objectives

* You should be able to demonstrate how to display a properties's value on an object.
* You should be able to explain the purpose of a \`for..of\` loop in JavaScript.
* You should be able to identify the variable that represents the array in a \`for..of\` loop.
* You should be able to identify the variable that represents each individual item in a \`for..of\` loop.

## Accessing Properties

To access a property of an object, you use a dot (\`.\`). You start with the variable name whose value is the object, type a dot, then type the name of the property you want to see. Let's use our phones as an example again.

\`\`\`js
const iPhone = {
    maker: "Apple",
    operatingSystem: "iOS",
    price: 900,
    weight: 1.2
}
\`\`\`

If you want to see **just the price** of the iPhone, and nothing else, here's how you would display it with \`console.log()\`.

\`\`\`js
const iPhone = {
    name: "iPhone",
    maker: "Apple",
    operatingSystem: "iOS",
    price: 900,
    weight: 1.2
}

console.log(iPhone.price)
\`\`\`

There's the pattern. \`iPhone\` is the variable whose value is the entire object, followed by a dot, then the name of the property to display.

## Display All Prices with Iteration

You want to see the price of all phones that are stored in an array, like the one from the previous chapter.

\`\`\`js
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
\`\`\`

Since those objects in the array aren't assigned to their own variables, then you have to iterate the array with a \`for..of\` loop. Here's how you do it.

\`\`\`js
for (const phone of phones) {
    console.log(phone)
}
\`\`\`

> **ℹ️ Info:** Go ahead and copy the code snippets to the editor and click "Run Code" to see what happens.

What will be displayed in the console? The entire array? No, it won't. This \`for\` loop iterates the array, which is a fancy word for "access the first item in the array, then the next, then the next until there are no more items to access".

In this loop, the individual objects will now be stored in the variable \`phone\`. Each time. Here you see the power of variables. That's the definition of variable. Something whose value _varies_.

In this case, the value of the \`phone\` value varies as the \`for\` loop moves through the array one item at a time.

![](images/iterating-phones.gif)

Notice that there are no square brackets \`[]\` around the output. Each object is displayed, one at a time.

Now you can use the dot notation to just display the prices instead of the entire object.

\`\`\`js
for (const phone of phones) {
    console.log(phone.price)
}
\`\`\`

![](images/display-phone-prices.gif)


You can even be fancy and use string interpolation to put a dollar sign in front of the prices when they are output.

\`\`\`js
for (const phone of phones) {
    console.log(\`Price is $\${phone.price}\`)
}
\`\`\`

![](images/display-phone-prices-interpolation.gif)

## Practice: Display Property of All Toys
## 📝 Instructions

Leonid has an array of toy objects. Your task is to:

1. Define a variable named \`toyInventory\`  
2. Assign it to an array of exactly **three toy objects**, each with:
   - \`name\` (string)
   - \`priceInDollars\` (number)

3. Use a \`for...of\` loop to print **just the name** of each toy using \`console.log()\`  
4. Use the **exact toy names** below, in this order:

Wooden Train
Stuffed Rabbit
Painted Kite
  `,
  exercise: {
    starterCode: ``,
    solution: `// Define the toyInventory array with three toy objects
const toyInventory = [
  {
    name: "Wooden Train",
    priceInDollars: 24.99
  },
  {
    name: "Stuffed Rabbit",
    priceInDollars: 19.95
  },
  {
    name: "Painted Kite",
    priceInDollars: 14.50
  }
];

// Use a for...of loop to print the name of each toy
for (const toy of toyInventory) {
  console.log(toy.name);
}`,
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
          message: "You should define a toyInventory array"
        },
        {
          name: "Array has three toys with correct names",
          test: (code) => {
            try {
              const func = new Function(code + "\n return toyInventory.map(t => t.name);");
              const names = func();
              const passed = Array.isArray(names) &&
                     names.length === 3 &&
                     names[0] === "Wooden Train" &&
                     names[1] === "Stuffed Rabbit" &&
                     names[2] === "Painted Kite";
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "toyInventory should contain the 3 specific toys in the correct order"
        },
        {
          name: "Uses for...of loop",
          test: (code) => {
            try {
              const passed = /\bfor\s*\(\s*(?:const|let|var)\s+\w+\s+of\s+toyInventory\s*\)/.test(code);
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "You should use a for...of loop to iterate through toyInventory"
        },
        {
          name: "Accesses and logs toy.name in loop",
          test: (code) => {
            try {
              const passed = /console\.log\s*\(\s*\w+\.name\s*\)/.test(code);
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Inside the loop, you should access and log the 'name' property"
        },
        {
          name: "Logs all three toy names in correct order",
          test: (code) => {
            try {
              const logs = [];
              const mockConsole = {
                log: (...args) => {
                  logs.push(args.join(" "))
                },
              };

              const func = new Function("console", code);

              func(mockConsole);
              const passed = logs[0].includes("Wooden Train") &&
                logs[1].includes("Stuffed Rabbit") &&
                logs[2].includes("Painted Kite");
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed: false, message: error.message});
            }
          },
          message: "Your code should log all three toy names in the correct order"
        }
    ],
  },
};
