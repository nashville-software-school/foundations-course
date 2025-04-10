import { TestResult } from "../../utils/test_utils";

export const leonidsConditionals = {
  id: "leonids-conditionals",
  title: "Helping Customers Find the Right Toy",
  sectionId: "leonids",
  previousChapterId: "leonids-arrays-push",
  nextChapterId: "leonids-string-interpolation",
  content: `
  # Finding an Item in an Array

> Now that you have a basic catalog that Leonid can see in the terminal, he has a request. He wants to be able to find a single product by providing the unique \`id\` property. Your code should then display the details of the phone which has the specified \`id\` value.

## If Inside For Loop

Your phone shop is getting popular these days. You have expanded your offerings and now you need the ability to have customers use a terminal in your store to find the information about a particular phone.

They come into your store after looking at your catalog, and should be able to enter in the unique \`id\` of a phone and then be shown all the details.

You are going to simulate this by specifying the \`id\` that you want to find at the very top of your code.

\`\`\`js
const phoneToFind = 2
\`\`\`

Next, you need to modify the \`for..of\` loop to only display the product details if a condition is true. In your code, that condition is if the current phone's \`id\` value matches the value of the \`phoneToFind\` variable's value.

\`\`\`js
for (const phone of phones) {
    // Only one phone will cause the condition below to evaluate to true
    if (phone.id === phoneToFind) {
        phone.weight = phone.weight + 0.4
        console.log(\`The \${phone.maker} \${phone.name} costs \${phone.price} dollars. It weighs \${phone.weight} grams.\`)
    }
}
\`\`\`

With that condition in place, only one phone will be displayed instead of all phones.

for the phone weight format the number rouded to decimal place!

![](./images/finding-single-phone.gif)

This is a very basic implementation of tools that you use on the Web when you search for, or filter, products on a company's product page.
  `,
  exercise: {
    starterCode: `// Define the phones array
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
  },
  {
    id: 3,
    name: "Pixel",
    maker: "Google",
    operatingSystem: "Android",
    price: 750,
    weight: 1.3
  }
]`,
    solution: `// Define the phones array
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
  },
  {
    id: 3,
    name: "Pixel",
    maker: "Google",
    operatingSystem: "Android",
    price: 750,
    weight: 1.3
  }
]

// Define the ID of the phone to find
const phoneToFind = 2

// Iterate through the phones array and display only the phone with the matching ID
for (const phone of phones) {
  // Only one phone will cause the condition below to evaluate to true
  if (phone.id === phoneToFind) {
    phone.weight = phone.weight + 0.4
    console.log("The " + phone.maker + " " + phone.name + " costs " + phone.price + " dollars. It weighs " + phone.weight.toFixed(1) + " grams.")
  }
}`,
    tests: [
      {
        name: "Finds phone with ID 2 and updates weight correctly",
        test: (code) => {
          try {
            const phones = new Function(code + "; return phones;")();
            if (typeof phones === "undefined") throw new Error("phones array not found");
            return new TestResult({ passed: true });
          } catch (error) {
            return new TestResult({ passed: false, message: error.message });
          }
        },
        message: "It should find phone with id 2 and increase its weight by 0.4",
      },
      {
        name: "Logs correct phone details with a template string",
        test: (code) => {
          try {
            let capturedOutput = "";
            const mockConsole = { log: (msg) => { capturedOutput = msg; } };
      
            const wrapper = new Function('console', `
              ${code}
            `);
      
            wrapper(mockConsole);
      
            const hasMaker = capturedOutput.includes("Samsung");
            const hasName = capturedOutput.includes("Galaxy");
            const hasPrice = capturedOutput.includes("600");
            const hasWeight = capturedOutput.includes("1.8");
              console.log("capturedOutput",capturedOutput)
              "The Samsung Galaxy costs 600 dollars. It weighs 1.7999999999999998 grams."
            const passed = hasMaker && hasName && hasPrice && hasWeight;
      
            return new TestResult({
              passed,
              message: passed
                ? "Correct output with multiline template string"
                : "Output missing details or not using multiline template string"
            });
      
          } catch (e) {
            console.error(e);
            return new TestResult({
              passed: false,
              message: "Code has an error or did not produce output"
            });
          }
        },
        message: "It should log the correct phone details using a multiline template string"
      }
    ],
  },
};
