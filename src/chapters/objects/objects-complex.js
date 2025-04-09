import { TestResult } from "../../utils/test_utils";

export const objectsComplexChapter = {
  id: 'objects-complex',
  title: 'Complex Objects',
  sectionId: 'objects',
  previousChapterId: 'objects-collections',
  nextChapterId: 'objects-libraries',
  content: `## Complex Objects That Contain Other Objects

Data structures can get even more complex when you are working with objects. Consider a dog and her favorite toy. You can represent the dog and the toy seperately.

\`\`\`js
const gypsy = {
    name: "Gypsy",
    age: 5,
    breed: "Schnauzer",
    weight: 25
}

const favoriteToy = {
    brand: "Hasbro",
    name: "Mean Kitty",
    price: 8.99
}
\`\`\`

You can also make the toy a property of the dog itself.

\`\`\`js
const gypsy = {
    name: "Gypsy",
    age: 5,
    breed: "Schnauzer",
    weight: 25,
    favoriteToy: {
        brand: "Hasbro",
        name: "Mean Kitty",
        price: 8.99
    }
}
\`\`\`

You have an object contained within the scope of another object. To access the \`price\` property for the favorite toy, you have use the dot \`.\` character twice.

\`\`\`js
const toyPrice = gypsy.favoriteToy.price
\`\`\`

If you want the age of the dog, you only need one dot.

\`\`\`js
const dogAge = gypsy.age
\`\`\`

Again, to access the brand of the toy, you need two dots in order to get to the nested object.

\`\`\`js
const toyBrand = gypsy.favoriteToy.brand
\`\`\`

## Practice: Sales Associate Email

You work for a car dealership, and you want to get the email address of each sales associate. In the starter code provided, return the email address of the sales associate.`,
  exercise: {
    starterCode: `const salesAssociate = {
    firstName: "Rachel",
    lastName: "Martinez",
    contact: {
        phone: "123-456-7890",
        email: "rachel.martinez@dealership.com",
        address: "123 Car Street"
    }
}

// Update this code here to assign the email address to this variable
const associateEmail =

console.log(associateEmail)
`,
    solution: `const salesAssociate = {
    firstName: "Rachel",
    lastName: "Martinez",
    contact: {
        phone: "123-456-7890",
        email: "rachel.martinez@dealership.com",
        address: "123 Car Street"
    }
}

const associateEmail = salesAssociate.contact.email
console.log(associateEmail)`,
    tests: [
      {
        name: "Correct Email Value",
        test: (code) => {
          try {
            // Create a function that executes the student's code and returns the associateEmail value
            const evalFunction = new Function(code + '; return associateEmail;');
            const result = evalFunction();

            // Check if the result matches the expected email
            return new TestResult({passed:result === "rachel.martinez@dealership.com"});
          } catch (error) {
            // If there's an error in execution, the test fails
            return new TestResult({passed:false,message:error.message});
          }
        },
        message: "Make sure your code correctly assigns the email address 'rachel.martinez@dealership.com' to the associateEmail variable."
      },
      {
        name: "Using Proper Object Notation",
        test: (code) => {
         try {
           const logs = [];
           const mockConsole = { log: (msg) => logs.push(msg) };
           new Function("console",code)(mockConsole)
           return new TestResult({passed:logs[0] === "rachel.martinez@dealership.com"});
         } catch (error) {
            return new TestResult({passed:false,message:error.message});
         }
        },
        message: "Make sure you're using console.log to print email."
      },
      
    ]

  }
}