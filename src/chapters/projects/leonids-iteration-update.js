import { TestResult } from "../../utils/test_utils";

export const leonidsIterationUpdate = {
  id: "leonids-iteration-update",
  title: "Raising Prices",
  sectionId: "leonids",
  previousChapterId: "leonids-string-interpolation",
  nextChapterId: "leonids-conditionals",
  content: `
In the last chapter, you used string interpolation to output a more human-readable string based on the less human-readable JavaScript object properties. You used a \`for..of\` loop to step through an array and perform the same operation on every item in the array.

In this chapter, you will do one more operation before you output the string representation of your toys.

> Times are tough for Leonid. He's finding that the market for bespoke, artisanal, locally sourced, hand crafted toys doesn't have quite the broad appeal that he thought. He has some loyal customers, but he does have the number of sales each month that he feels he needs to become more profitable.
>
> To account for lower number of sales, he decides to increase the price of all of his toys across the board. After a few months of increased revenue, he believes he will have the cash needed to buy from other distributors and expand his offerings to appeal to a broader audience.
>
> He thinks that having vegan-friendly toys with zero carbon footprint will be the extra appeal needed to start moving more products.

## Heavier Phones

Your phone store just got notified by all of the major  manufacturers that a new battery technology was just implemented in all of their phones. The battery will last 3x longer, but it has the side-effect of adding 0.4 grams of weight to **every** phone.

Rather than going and modifying every phone in your inventory _(yeah, I know you only have 3 phones right now, but let's just imagine that you have 529)_, you decide to just display the increased weight when you print the catalog.

Since your output is done in a loop, and logic done in a loops is run for every item in the loop, you can write the following code.

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
// Step through the array of phones
for (const phone of phones) {
    // Add 0.4 grams to the weight of each phone
    phone.weight = phone.weight + 0.4

    // Add the weight to the output
    console.log(\`The \${phone.maker} \${phone.name} costs \${phone.price} dollars. It weighs \${phone.weight} grams.\`)
}
\`\`\`

> **ℹ️ Info:** Go ahead and copy the code above into the code editor and click "Run Code" it. 
 
Yep. We see it, too. There's tons of extra numbers in the decimal places for some of those numbers. Don't worry. You didn't do anything wrong. Your computer isn't broken.

It's just an issue with how floats work with JavaScript. You can dig into that later in your career. Just ignore it for now.

## Practice: Increasing Leonid's Prices

Leonid has decided to increase prices by 5%. Your task is to:

1. Use the provided \`toyCatalog\` array  
2. Define an empty \`displayCatalog\` array  
3. Use a \`for...of\` loop to:
   - Access each toy’s properties using **dot notation**
   - Increase its \`priceInDollars\` by 5%
   - Format a string using **template literals** like this:
   Toy: Wooden Train | Price: $31.50 | Color: Red
4. Push each formatted string into \`displayCatalog\`
   `,
  exercise: {
    starterCode: `const toyCatalog = [
  { name: "Wooden Train", priceInDollars: 30, color: "Red" },
  { name: "Stuffed Rabbit", priceInDollars: 25, color: "Gray" },
  { name: "Painted Kite", priceInDollars: 20, color: "Blue" }
];`,
    solution: `let displayCatalog = [];
  for (const toy of toyCatalog) {
  const increasedPrice = (toy.priceInDollars * 1.05).toFixed(2);
  const line = \`Toy: \${toy.name} | Price: \$\${increasedPrice} | Color: \${toy.color}\`;
  displayCatalog.push(line);
}`,
    tests: [
      {
        name: "Defines toyCatalog with original prices",
        test: (code) => {
          try {
            const func = new Function(code + "\n return toyCatalog;");
            const toys = func();
            const passed = toys[0].priceInDollars === 30 &&
                   toys[1].priceInDollars === 25 &&
                   toys[2].priceInDollars === 20;
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "toyCatalog must contain the original prices before any increase"
      },
      {
        name: "Uses for...of loop over toyCatalog",
        test: (code) => {
          try {
            const passed = /\bfor\s*\(\s*const\s+\w+\s+of\s+toyCatalog\s*\)/.test(code);
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "You should use a for...of loop to iterate over toyCatalog"
      },
      {
        name: "Uses .toFixed(2) to format prices",
        test: (code) => {
          try {
            const passed = /\.toFixed\s*\(\s*2\s*\)/.test(code);
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "You should use .toFixed(2) to format the price"
      },
      {
        name: "Pushes increased-price strings into displayCatalog",
        test: (code) => {
          try {
            const func = new Function(code + "\n return displayCatalog;");
            const result = func();
            const passed = Array.isArray(result) &&
                   result[0] === "Toy: Wooden Train | Price: $31.50 | Color: Red" &&
                   result[1] === "Toy: Stuffed Rabbit | Price: $26.25 | Color: Gray" &&
                   result[2] === "Toy: Painted Kite | Price: $21.00 | Color: Blue";
            return new TestResult({passed});
          } catch (error) {
            return new TestResult({passed: false, message: error.message});
          }
        },
        message: "displayCatalog should include correctly formatted strings with increased prices"
      }
    ],
  },
};
