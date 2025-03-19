import jsMemImg from "./js_mem.png";

export const primitiveVsReferenceChapter = {
  id: "primitive-vs-reference",
  title: "Neil Armstrong's Guide to JavaScript Memory",
  path: "/primitive-vs-reference",
  sectionId: "workshops",
  previousChapterId: null,
  nextChapterId: null,
  content: `👩‍🚀 Welcome aboard! You’re about to embark on a journey through **JavaScript’s memory universe** with some legendary astronauts. Each stop will take us deeper into **primitive planets, reference black holes, cloning technology, and type transformation!**

## 🛰 **Mission Overview**

### **🔭 Goals for This Mission:**

1️⃣ **Primitive (value) types** vs. **reference types** in JavaScript
2️⃣ **How values are copied** (stack vs. heap).
3️⃣ **Shallow vs. deep copying** and when to use them.
4️⃣ **Type conversion** for intergalactic data compatibility.

Each stop on our journey includes **hands-on code, discussions, and quiz challenges** to keep eyes on the prize!

**Countdown initiated!** 🚀

---


## 🕓 **Checkpoint 1: Primitive Planets & Reference Black Holes**

👩‍🚀 *Mission Log:* "Our first challenge is to categorize **JavaScript data types**. Some are simple planets (primitives), while others are deep, mysterious black holes (references)."

### **📝 What are the two types of data in JavaScript?**

✅ **Primitive/Value Types (Stored in Stack)**:
- \`string\`, \`number\`, \`boolean\`, \`null\`, \`undefined\`, \`symbol\`, \`bigint\`

✅ **Reference Types (Stored in Heap, Passed by Reference)**:

- \`object\`, \`array\`, \`function\`
<img width=700 src="${jsMemImg}"/>

### 🛑 **Quiz Break #1**
<a href="https://www.menti.com/alc5a2bfvfvr" target="_blank">Data Types Quiz</a>

⚠️ **Note:** When you click 'Run Tests' in this workshop, \`console.log\` will show as **alerts** 🚨 due to a custom-built interpreter.
It’s not a full JS environment, some behaviors may be different. Use this code space only for the provided exercises, not for experimenting with random JS code!
### **🛠️ Run Code Snippet One:**

✅ **Discussion:** *Why does \`planet2\` still say "Mars" after \`planet1\` changes?*

### 🛑 **Quiz Break #2**
<a href="https://www.menti.com/alc5a2bfvfvr" target="_blank">Reference Types Quiz</a>


---
## 🕒 **Checkpoint 2: Copying Across the Universe (Stack vs. Heap)**

👩‍🚀 *Mission Log:* "Next, let’s examine how JavaScript copies data when variables are assigned."

### **How Are Values Copied?**

1️⃣ **Primitives → Copied by Value**
2️⃣ **Reference Types → Copied by Reference**

### **🛠️ Run Code Snippet Two**

🚀 Houston, we have a problem! 🛑

✅ **Discussion:** *Why does \`spaceship2.captain\` change to "Sally Ride" too?*

### 🛑 **Quiz #3**
<a href="https://www.menti.com/alc5a2bfvfvr" target="_blank">Deep Copy Quiz</a>


---
## 🕑 **Checkpoint 3: Cloning with Shallow vs. Deep Copies**

👩‍🚀 *Mission Log:* "Let’s test our ship’s cloning technology! Shallow copies are quick but imperfect, while deep copies ensure a full duplicate."

### **Shallow Copy Example (Using \`...\`)**
### **🛠️ Run Code Snippet Three**

🚀 Houston, we have a problem! 🛑

✅ **Discussion:** *Why does \`alien2.abilities.laser\` change too?*

### **Deep Copy Example (Using \`structuredClone\`)**
### **🛠️ Run Code Snippet Four**

🚀 Houston, systems are nominal. ✅

✅ **Discussion:** *Why does \`deepClone.abilities.laser\` remain \`false\` this time?*

### 🛑 **Quiz #4**
<a href="https://www.menti.com/alc5a2bfvfvr" target="_blank">Deep Copy Quiz</a>



---
## 🕐 **Checkpoint 4: Fixing "Monkey Math" - Type Conversion**

👩‍🚀 *Mission Log:* "In space, numbers and strings sometimes get mixed up in weird ways—like ‘Monkey Math’!"
### **🛠️ Run Code Snippet Five**

🚀 Houston, we have a problem! 🛑

✅ **Discussion:** *Why does \`"2" + "2"\` behave like this?*

### **Fixing the Monkey Math 🐵 ➡️ 🚀**
### **🛠️ Run Code Snippet Six**


🚀 Houston, systems are nominal. ✅

✅ **Discussion:** *Why does \`Number("2")\` fix the issue?*

### 🛑 **Quiz #5**
<a href="https://www.menti.com/alc5a2bfvfvr" target="_blank">Data Conversion Quiz</a>


## 🌟 **Mission Debrief & Wrap-up**


🎉 Congratulations! You’ve explored JavaScript’s **memory system, copying mechanics, cloning, and type conversion**!

💡 **Final Thought:** Next time you see unexpected behavior in your code, **check whether you're working with a primitive or reference type**! 🚀

---

### 🎯 **Final Quiz: Rank Up Your JS Knowledge!**

<a href="https://www.menti.com/alc5a2bfvfvr" target="_blank">Deep copy or not to deep copy quiz</a>

### **Thanks for joining the mission! 🚀**

👨‍🚀 Remember JavaScript’s universe is vast, keep **exploring**!!! 🌌
  `,
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
// let deepClone = structuredClone(alien1));
// alien1.abilities.laser = true;
// console.log(deepClone.abilities.laser); // What will show?
/*
 **************************************************
 *             Code Snippet Five                  *
 **************************************************
 **************************************************
 */
// let result1 = "2" + "2"
// console.log(result1)); // What will show?
/*
 **************************************************
 *             Code Snippet Six                   *
 **************************************************
 **************************************************
 */
// let result2 = Number("2") + Number("2")
// console.log(result2); // Corrected version
`,
    solution: ``,
    tests: [],
  },
};
