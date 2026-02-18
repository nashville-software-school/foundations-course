import jsMemImg from "./js_mem.png";
import { Checkpoint, QUESTION_TYPES } from "@nss-workshops/nss-core";

const questions = [
  {
    type: QUESTION_TYPES.CHECKBOX,
    questionJsx: (
      <p>
        Which of the following are JavaScript primitive types? Choose all that apply.
      </p>
    ),
    answers: [
      "number",
      "object",
      "string",
      "function",
      "array",
      "boolean",
      "null"
    ],
    correctAnswers: [0, 2, 5, 6],
    explanation: (
      <ul>
        <li><strong>number:</strong> ✅ Correct — Primitive type stored by value.</li>
        <li><strong>object:</strong> ❌ Incorrect — This is a reference type.</li>
        <li><strong>string:</strong> ✅ Correct — Primitive type stored by value.</li>
        <li><strong>function:</strong> ❌ Incorrect — This is a reference type.</li>
        <li><strong>array:</strong> ❌ Incorrect — This is a reference type (arrays are objects).</li>
        <li><strong>boolean:</strong> ✅ Correct — Primitive type stored by value.</li>
        <li><strong>null:</strong> ✅ Correct — Primitive type (special value).</li>
      </ul>
    )
  },
    {
    type: QUESTION_TYPES.CHECKBOX,
    questionJsx: (
      <p>
        Which of these values is a reference type in JavaScript? Choose all that apply.
      </p>
    ),
    answers: [
      "42",
      '{ name: "Saturn" }',
      '"Hello, World!"',
      "true",
      "[1,2,3]"
    ],
    correctAnswers: [1, 4],
    explanation: (
      <ul>
        <li><strong>42:</strong> ❌ Incorrect — This is a number (primitive type).</li>
        <li><strong>{`{ name: "Saturn" }`}:</strong> ✅ Correct — This is an object (reference type).</li>
        <li><strong>"Hello, World!":</strong> ❌ Incorrect — This is a string (primitive type).</li>
        <li><strong>true:</strong> ❌ Incorrect — This is a boolean (primitive type).</li>
        <li><strong>[1,2,3]:</strong> ✅ Correct — This is an array (reference type).</li>
      </ul>
    )
  },
    {
    type: QUESTION_TYPES.RADIO,
    questionJsx: (
      <p>
        What happens when you copy a reference type in JavaScript?
        <pre><code>{`// Create an object (reference type)
let planetA = { name: "Saturn" };
// Copy the reference
let planetB = planetA;`}</code></pre>
      </p>
    ),
    answers: [
      "A completely new independent copy is created",
      "Both variables planetA and planetB point to the same memory location",
      "JavaScript randomly decides what to do"
    ],
    correctAnswer: 1,
    explanation: (
      <ul>
        <li><strong>A completely new independent copy is created:</strong> ❌ Incorrect — Reference types are copied by reference, not by value.</li>
        <li><strong>Both variables planetA and planetB point to the same memory location:</strong> ✅ Correct — When you copy a reference type, both variables point to the same object in memory.</li>
        <li><strong>JavaScript randomly decides what to do:</strong> ❌ Incorrect — JavaScript has consistent, predictable behavior for reference types.</li>
      </ul>
    )
  },
  {
    type: QUESTION_TYPES.CHECKBOX,
    questionJsx: (
      <p>
        Which JavaScript method creates a true deep copy of an object?
      </p>
    ),
    answers: [
      "{ ...obj }",
      "structuredClone(obj)",
      "JSON.parse(JSON.stringify(obj))",
      "copy = obj"
    ],
    correctAnswers: [1,2],
    explanation: (
      <ul>
        <li><strong>{`{ ...obj }`}:</strong> ❌ Incorrect — The spread operator creates a shallow copy, not a deep copy.</li>
        <li><strong>structuredClone(obj):</strong> ✅ Correct — This method creates a true deep copy of an object.</li>
        <li><strong>JSON.parse(JSON.stringify(obj)):</strong> ✅ Correct — This technique creates a deep copy (though it has limitations with functions and special objects).</li>
        <li><strong>copy = obj:</strong> ❌ Incorrect — This just copies the reference, not the object itself.</li>
      </ul>
    )
  },
  {
    type: QUESTION_TYPES.CHECKBOX,
    questionJsx: (
      <p>
        Which JavaScript method converts the string "42" into the number 42?
      </p>
    ),
    answers: [
      'parseInt("42")',
      'Number("42")',
      '42 = "42"'
    ],
    correctAnswers: [0, 1],
    explanation: (
      <ul>
        <li><strong>parseInt(&quot;42&quot;):</strong> ✅ Correct — Converts a string to an integer number.</li>
        <li><strong>Number(&quot;42&quot;):</strong> ✅ Correct — Converts a string to a number.</li>
        <li><strong>42 = &quot;42&quot;:</strong> ❌ Incorrect — This is invalid syntax and would cause an error.</li>
      </ul>
    )
  },
  {
    type: QUESTION_TYPES.CHECKBOX,
    questionJsx: (
      <p>
        Which of the following values require a deep copy to avoid shared references? Choose all that apply.
      </p>
    ),
    answers: [
      "[ { id: 1 } ]",
      "null",
      '"Hello"',
      "{ theme: { mode: true } }",
      "boolean",
      "function"
    ],
    correctAnswers: [0, 3, 5],
    explanation: (
      <ul>
        <li><strong>[ {`{ id: 1 }`} ]:</strong> ✅ Correct — Array containing an object requires deep copy to avoid shared references.</li>
        <li><strong>null:</strong> ❌ Incorrect — Primitive value, no deep copy needed.</li>
        <li><strong>&quot;Hello&quot;:</strong> ❌ Incorrect — String is a primitive type, no deep copy needed.</li>
        <li><strong>{`{ theme: { mode: true } }`}:</strong> ✅ Correct — Nested object requires deep copy to avoid shared references.</li>
        <li><strong>boolean:</strong> ❌ Incorrect — Primitive type, no deep copy needed.</li>
        <li><strong>function:</strong> ✅ Correct — Functions are reference types and may need deep copying in certain contexts.</li>
      </ul>
    )
  }
];
  



export const primitiveVsReferenceChapter = {
  id: "primitive-vs-reference",
  title: "Neil Armstrong's Guide to JavaScript Memory",
  path: "/primitive-vs-reference",
  sectionId: "workshops",
  previousChapterId: null,
  nextChapterId: null,
  content: `Welcome aboard! You’re about to embark on a journey through **JavaScript’s memory universe** with some legendary astronauts. Each stop will take
  us dr into **primitive planets, reference black holes, cloning technology, and type transformation!

## 🛰 **Mission Overview**

### **🔭 Goals for This Mission:**

1️⃣ **Primitive (value) types** vs. **reference types** in JavaScript
2️⃣ **How values are copied** (stack vs. heap).
3️⃣ **Shallow vs. deep copying** and when to use them.
4️⃣ **Type conversion** for intergalactic data compatibility.

Each stop on our journey includes **hands-on code, discussions, and quiz challenges** to keep eyes on the prize!

**Countdown initiated!**

---


## **Checkpoint 1: Primitive Planets & Reference Black Holes**

*Mission Log:* "Our first challenge is to categorize **JavaScript data types**. Some are simple planets (primitives), while others are deep, mysterious black holes (references)."

### What are the two types of data in JavaScript?

**1. Primitive/Value Types (Stored in Stack)**:

- \`string\`, \`number\`, \`boolean\`, \`null\`, \`undefined\`, \`symbol\`, \`bigint\`

Out of these, \`null\` and \`undefined\` are special values that represent the absence of a value. Symbol and BigInt are more advanced types that are not commonly used in basic programming. Nearly all of the time, you will be using the first four types.

**2. Reference Types (Stored in Heap, Passed by Reference)**:

- \`object\`, \`array\`, \`function\`
<img width=700 src="${jsMemImg}"/>

### **🛠️ Run Code Snippet One:**
⚠️ **Note:** When you click 'Run Tests' in this workshop, \`console.log\` will show as **alerts** due to a custom-built interpreter.
It’s not a full JS environment, some behaviors may be different. Use this code space only for the provided exercises, not for experimenting with random JS code!

**Discussion:**

*Why does \`planet2\` still say "Mars" after \`planet1\` changes?*

---
## **Checkpoint 2: Copying Across the Universe (Stack vs. Heap)**

*Mission Log:* "Next, let’s examine how JavaScript copies data when variables are assigned."

### How Are Values Copied?

1️⃣ **Primitives → Copied by Value**
2️⃣ **Reference Types → Copied by Reference**

### Run Code Snippet Two

Houston, we have a problem!

#### Discussion

Why does \`spaceship2.captain\` change to "Sally Ride" too?

---

## Checkpoint 3: Cloning with Shallow vs. Deep Copies

*Mission Log:* "Let’s test our ship’s cloning technology! Shallow copies are quick but imperfect, while deep copies ensure a full duplicate."

### Shallow Copy Example (Using \`...\`)

The spread operator \`...\` creates a shallow copy of an object. This means that it copies the top-level properties, but nested objects are still shared by reference. In the following code, \`lassie\` and \`laddie\` are two different objects, but they share the same nested object for \`abilities\`.

\`\`\`js
let lassie = { species: "Collie", abilities: { speaking: true } };
let laddie = { ...lassie };                 // Shallow copy
lassie.abilities.speaking = false;          // Change the original object
console.log(laddie.abilities.speaking);     // Is this still true on the copy?

> false   // Because the nested object wasn't copied, just referenced
\`\`\`

### Run Code Snippet Three

🚀 Houston, we have a problem!

### Discussion

Why does \`alien2.abilities.laser\` change too?

### Deep Copy Example (Using \`structuredClone\`)

Using the \`structuredClone\` function creates a deep copy of an object. This means that all properties, including nested objects, are fully duplicated.
\`\`\`js
let product1 = { name: "Balloon", price: 2.5, details: { color: "red", size: "large" } };
let product2 = structuredClone(product1); // Deep copy
product1.details.color = "blue";          // Change the original object
console.log(product2.details.color);      // Is this still red on the copy?

> "red"   // Because the nested object was fully copied
\`\`\`

### Run Code Snippet Four

Houston, systems are nominal.

### Discussion

Why does \`alien2.abilities.laser\` remain \`false\` this time?

---

## Checkpoint 4: Fixing "Mystery Math" - Type Conversion

*Mission Log:* "In space, numbers and strings sometimes get mixed up in weird ways—like ‘Mystery Math’!"

### Run Code Snippet Five

🚀 Houston, we have a problem!

### Discussion

Why does \`"2" + "2"\` behave like this?

### Fixing the Mystery Math

To fix the issue, we need to convert the strings to numbers before adding them.

### Run Code Snippet Six

🚀 Houston, systems are nominal.

### Discussion

Why does \`Number("2")\` fix the issue?

## Mission Debrief & Wrap-up

Congratulations! You’ve explored JavaScript’s **memory system, copying mechanics, cloning, and type conversion**!

**Final Thought:** Next time you see unexpected behavior in your code, **check whether you're working with a primitive or reference type**! 🚀

### Thanks for joining the mission!

Remember JavaScript’s universe is vast, keep **exploring**!

---

# Please take the quiz below to assess your understanding of these concepts.
`,
  quiz: {
      component: () => <Checkpoint questions={questions}/>
  },
  exercise: {
    starterCode: `
/*
 **************************************************
 *             Code Snippet One                   *
 **************************************************
 **************************************************
 */
// let planet1 = "Mars"; // Primitive
// let planet2 = planet1;
// planet1 = "Venus";
// console.log(planet1); // What will show?
// console.log(planet2); // What will show?
/*
 **************************************************
 *             Code Snippet Two                   *
 **************************************************
 **************************************************
 */
// let spaceship1 = { captain: "Buzz Aldrin" }; // Reference type
// let spaceship2 = spaceship1;
// spaceship1.captain = "Sally Ride";
// console.log(spaceship2.captain); // What will show?
/*
 **************************************************
 *             Code Snippet Three                 *
 **************************************************
 **************************************************
 */
// let alien1 = { species: "Zorgon", abilities: { laser: true } };
// let alien2 = { ...alien1 }; // Shallow copy
// alien1.abilities.laser = false;
// console.log(alien2.abilities.laser); // What will show?
/*
 **************************************************
 *             Code Snippet Four                  *
 **************************************************
 **************************************************
 */
// let alien1 = { species: "Zorgon", abilities: { laser: true } };
// let alien2 = structuredClone(alien1);
// alien1.abilities.laser = true;
// console.log(alien2.abilities.laser); // What will show?
/*
 **************************************************
 *             Code Snippet Five                  *
 **************************************************
 **************************************************
 */
// let result1 = "2" + "2"
// console.log(result1); // What will show?
/*
 **************************************************
 *             Code Snippet Six                   *
 **************************************************
 **************************************************
 */
// let result2 = Number("2") + Number("2")
// console.log(result2); // Corrected version
`,
    solution: `
/*
 **************************************************
 *             Code Snippet One                   *
 **************************************************
 **************************************************
 */
let planet1 = "Mars"; // Primitive
let planet2 = planet1;
planet1 = "Venus";
console.log(planet1); // Venus
console.log(planet2); // Mars

/*
 **************************************************
 *             Code Snippet Two                   *
 **************************************************
 **************************************************
 */
let spaceship1 = { captain: "Buzz Aldrin" }; // Reference type
let spaceship2 = spaceship1;
spaceship1.captain = "Sally Ride";
console.log(spaceship2.captain); // Sally Ride

/*
 **************************************************
 *             Code Snippet Three                 *
 **************************************************
 **************************************************
 */
let alien1 = { species: "Zorgon", abilities: { laser: true } };
let alien2 = { ...alien1 }; // Shallow copy
alien1.abilities.laser = false;
console.log(alien2.abilities.laser); // false - because nested objects are still shared by reference

/*
 **************************************************
 *             Code Snippet Four                  *
 **************************************************
 **************************************************
 */
let alien1 = { species: "Zorgon", abilities: { laser: true } };
let alien2 = structuredClone(alien1); // Deep copy
alien1.abilities.laser = false;
console.log(alien2.abilities.laser); // true - deep copy creates a completely separate copy

/*
 **************************************************
 *             Code Snippet Five                  *
 **************************************************
 **************************************************
 */
let result1 = "2" + "2"
console.log(result1); // "22" - string concatenation, not addition

/*
 **************************************************
 *             Code Snippet Six                   *
 **************************************************
 **************************************************
 */
let result2 = Number("2") + Number("2")
console.log(result2); // 4 - converts strings to numbers before addition`,
    tests: [],
  },
};
