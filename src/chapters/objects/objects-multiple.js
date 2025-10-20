import { TestResult } from "@nss-workshops/nss-core";

export const objectsMultipleChapter = {
  id: 'objects-multiple',
  title: 'Multiple Objects',
  sectionId: 'objects',
  previousChapterId: 'objects-intro',
  nextChapterId: 'objects-collections',
  content: `Since software developers utilize objects to represent real-world things that need to be automated with software, it is critical to know that the properties of the "things" are. Consider an example where a fire chief needs to assign some firefighters to fire stations. What would need to be an object in this scenario.

1. An object representing each firefighter
2. An object representing each fire station
3. An object representing the fire chief

First, the fire chief.

\`\`\`js
const fireChief = {
  firstName: "Samantha",
  lastName: "Robinson",
  yearsOfService: 13,
  emtCertification: true,
  paramedicCertification: true,
  firefighterCertification: true
}
\`\`\`

Now some firefighters.

\`\`\`js
const matthew = {
  firstName: "Matthew",
  lastName: "Ingersoll",
  yearsOfService: 4,
  emtCertification: false,
  paramedicCertification: true,
  firefighterCertification: true
}

const jamal = {
  firstName: "Jamal",
  lastName: "Ross",
  yearsOfService: 5,
  emtCertification: true,
  paramediaCertification: false,
  firefighterCertification: true
}

const erin = {
  firstName: "Erin",
  lastName: "McNamara",
  yearsOfService: 3,
  emtCertification: false,
  paramediaCertification: true,
  firefighterCertification: true
}
\`\`\`

Now, two objects for the fire stations.

\`\`\`js
const eastStation = {
  address: "1002 Main Street",
  squareFootage: 4720,
  kitchen: true,
  beds: true,
  showers: true
}

const northStation = {
  address: "9 Lighthouse Road",
  squareFootage: 3233,
  kitchen: false,
  beds: false,
  showers: true
}
\`\`\`

## Different Properties

Some of the objects represent the people, and some objects represent buildings. Therefore, the properties vary. Each JavaScript object should have only the properties that describe the real-world object it is representing. The value of each property can be different, depending on the current state of the real-world object. Just because two objects represent the same kind of thing does not mean the property values will always match.

## Exercise: Flower Shop

In this exercise, you are going to create two objects that represent flowers - a Tulip and a Rose. The objects will be largely the same, but since roses have thorns and tulips do not, there will be a difference between the properties on each one.

Both flower objects should have the following keys.

* \`color\`, which will be a string
* \`stemLength\`, which will be a number
* \`growingSeason\`, which will be a string like "Summer" or "Spring"
* \`thorny\` will be be a boolean value of true or false.

You can decide on the values for each of the properties.`,
  exercise: {
    starterCode: `// Create the properties for a tulip object here.
const tulip = {

}

// Complete the rose object
const rose = {

}

console.log(tulip.color)
console.log(rose.stemLength)
`,
    solution: `
const tulip = {
    color: "yellow",
    stemLength: 10,
    growingSeason: "Spring",
    thorny: false
}

const rose = {
    color: "red",
    stemLength: 12,
    growingSeason: "Summer",
    thorny: true
}
`,
    tests: [
      {
        name: "Tulip Object Creation",
        test: (code) => {
        try {
            const func = new Function(code + '\nreturn {tulip, rose}');
            const { tulip, rose } = func();
            const passed =  Object.prototype.hasOwnProperty.call(tulip, 'color') &&
                    Object.prototype.hasOwnProperty.call(tulip,'stemLength') &&
                    Object.prototype.hasOwnProperty.call(tulip,'growingSeason') &&
                    Object.prototype.hasOwnProperty.call(tulip,'thorny') &&
                    Object.prototype.hasOwnProperty.call(rose,'color') &&
                    Object.prototype.hasOwnProperty.call(rose,'stemLength') &&
                    Object.prototype.hasOwnProperty.call(rose,'growingSeason') &&
                    Object.prototype.hasOwnProperty.call(rose,'thorny');
            return new TestResult({passed})
        } catch (error) {
          return new TestResult({passed:false,message:error.message})
        }
        },
        message: "Make sure you add all required properties to the tulip and rose objects"
      },
      {
        name: "Property Types",
        test: (code) => {
         try {
           const func = new Function(code + '\nreturn {tulip, rose}');
           const { tulip, rose } = func();
           const passed = typeof tulip.color === 'string' &&
                   typeof tulip.stemLength === 'number' &&
                   typeof tulip.growingSeason === 'string' &&
                   typeof tulip.thorny === 'boolean' &&
                   typeof rose.color === 'string' &&
                   typeof rose.stemLength === 'number' &&
                   typeof rose.growingSeason === 'string' &&
                   typeof rose.thorny === 'boolean';
            return new TestResult({passed})
         } catch (error) {
            return new TestResult({passed:false,message:error.message})
         }
        },
        message: `Make sure you're using the correct data types for each property.
Color should be a string. stemLength should be a number. growingSeason should be a string. thorny should be a boolean.`
      }
    ]
  }
}