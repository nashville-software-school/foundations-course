import {js_mem_img} from "./js_mem.js";

export const primitiveVsReferenceChapter = {
    id: 'primitive-vs-reference',
    title: 'Neil Armstrong\'s Guide to JavaScript Memory',
    path: '/primitive-vs-reference',
    sectionId: 'workshops',
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
<img src="data:image/png;base64,${js_mem_img}"/>

---
### 🛑 **Quiz Break #1**  
---

### **🛠️ Try this Code Snippet:**
\`\`\`js
let planet1 = "Mars"; // Primitive
let planet2 = planet1; 
planet1 = "Venus";
console.log(planet1); // What will print?
console.log(planet2); // What will print?
\`\`\`

✅ **Discussion:** *Why does \`planet2\` still say "Mars" after \`planet1\` changes?*

---
### 🛑 **Quiz Break #2**  
---
## 🕒 **Checkpoint 2: Copying Across the Universe (Stack vs. Heap)**

👩‍🚀 *Mission Log:* "Next, let’s examine how JavaScript copies data when variables are assigned."  

### **How Are Values Copied?**  

1️⃣ **Primitives → Copied by Value**  
2️⃣ **Reference Types → Copied by Reference**  

### **🛠️ Try this Code Snippet:**
\`\`\`js
let spaceship1 = { captain: "Buzz Aldrin" }; // Reference type
let spaceship2 = spaceship1; 
spaceship1.captain = "Sally Ride";
console.log(spaceship2.captain); // What will print?
\`\`\`

🚀 Houston, we have a problem! 🛑

✅ **Discussion:** *Why does \`spaceship2.captain\` change to "Sally Ride" too?*  

---
### 🛑 **Quiz #3**  
---

## 🕑 **Checkpoint 3: Cloning with Shallow vs. Deep Copies**

👩‍🚀 *Mission Log:* "Let’s test our ship’s cloning technology! Shallow copies are quick but imperfect, while deep copies ensure a full duplicate."  

### **Shallow Copy Example (Using \`...\`)**
\`\`\`js
let alien1 = { species: "Zorgon", abilities: { laser: true } };
let alien2 = { ...alien1 }; // Shallow copy
alien1.abilities.laser = false;
console.log(alien2.abilities.laser); // What will print?
\`\`\`

🚀 Houston, we have a problem! 🛑

✅ **Discussion:** *Why does \`alien2.abilities.laser\` change too?*  

### **Deep Copy Example (Using \`structuredClone\`)**
\`\`\`js
let deepClone = structuredClone(alien1));
alien1.abilities.laser = true;
console.log(deepClone.abilities.laser); // What will print?
\`\`\`
🚀 Houston, systems are nominal. ✅

✅ **Discussion:** *Why does \`deepClone.abilities.laser\` remain \`false\` this time?*  

---
### 🛑 **Quiz #4**  
---

## 🕐 **Checkpoint 4: Fixing "Monkey Math" - Type Conversion**

👩‍🚀 *Mission Log:* "In space, numbers and strings sometimes get mixed up in weird ways—like ‘Monkey Math’!"  
### **🛠️ Try This:**

\`\`\`js
console.log("2" + "2"); // What will print?
\`\`\`
🚀 Houston, we have a problem! 🛑

✅ **Discussion:** *Why does \`"2" + "2"\` behave like this?*  

### **Fixing the Monkey Math 🐵 ➡️ 🚀**

\`\`\`js
console.log(Number("2") + Number("2")); // Corrected version
\`\`\`
🚀 Houston, systems are nominal. ✅

✅ **Discussion:** *Why does \`Number("2")\` fix the issue?*  

---
### 🛑 **Quiz #5**  
---

## 🌟 **Mission Debrief & Wrap-up**


🎉 Congratulations! You’ve explored JavaScript’s **memory system, copying mechanics, cloning, and type conversion**!  

💡 **Final Thought:** Next time you see unexpected behavior in your code, **check whether you're working with a primitive or reference type**! 🚀

---

### 🎯 **Final Quiz: Rank Up Your JS Knowledge!**

### **Thanks for joining the mission! 🚀**  

👨‍🚀 Remember JavaScript’s universe is vast, keep **exploring**!!! 🌌
  `,
    exercise: {
        starterCode: `// January's electric bill
let januaryBill = 145.32

// Create variables for the remaining months.
// Give them any value you want.



// Then calculate the total yearly charges by
// declaring a constant variable named "yearlyTotal"
// that is the sum of all twelve months.
`,
        solution: `// Monthly electric bills
let januaryBill = 145.32
let februaryBill = 155.89
let marchBill = 132.45
let aprilBill = 98.76
let mayBill = 87.65
let juneBill = 203.55
let julyBill = 187.34
let augustBill = 198.65
let septemberBill = 143.21
let octoberBill = 112.87
let novemberBill = 128.98
let decemberBill = 159.43

const yearlyTotal = januaryBill + februaryBill + marchBill +
                    aprilBill + mayBill + juneBill +
                    julyBill + augustBill + septemberBill +
                    octoberBill + novemberBill + decemberBill

console.log(yearlyTotal)`,
        tests: [
            {
                name: "Variable Declaration",
                test: (code) => {

                    try {
                        const func = new Function(code + '\nreturn yearlyTotal')
                        const result = func()
                        if (result > 0 &&
                            code.includes('let februaryBill') &&
                            code.includes('let marchBill') &&
                            code.includes('let aprilBill') &&
                            code.includes('let mayBill') &&
                            code.includes('let juneBill') &&
                            code.includes('let julyBill') &&
                            code.includes('let augustBill') &&
                            code.includes('let septemberBill') &&
                            code.includes('let octoberBill') &&
                            code.includes('let novemberBill') &&
                            code.includes('let decemberBill')) {
                            return true
                        }

                    } catch (error) {
                        return false
                    }

                },
                message: `- Make sure to declare variables for all twelve months
                - Make sure to use the correct variable names (e.g. octoberBill, novemberBill)
                - Make sure to use the \`let\` keyword for each month variable
                - Make sure you use \`const\` for the yearlyTotal variable`
            },
            {
                name: "Total Calculation",
                test: (code) => {
                    return code.includes('const') &&
                        code.includes('yearlyTotal')
                },
                message: "Make sure to calculate the total using const and output it with console.log"
            }
        ]
    }
}