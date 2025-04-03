# File Naming Convention for Chapter Audio

To ensure audio files are loaded correctly under each chapter, follow this naming convention.

Currently, audio files must be in `.wav` format, which is the default output format from the notebook LLM.

### 🎧 Types of Audio Files

We support three types of audio overviews:

- **Overview** — provides a summary or explanation of the lesson content.  
  _Appears under the lesson title if a properly named audio file is present._

- **Exercise** — explains the exercise prompt or context.  
  _Appears under the exercise titles if a properly named audio file is present._

- **Solution** — walks through the official solution.  
  _Appears only after all tests pass and a properly named solution file exists._

### ✅ Required File Naming Format

`{chapter.id}-overview.wav` 
`{chapter.id}-excercise.wav` 
`{chapter.id}-solution.wav`

> Replace `{chapter.id}` with the actual ID of the chapter.

#### Example:
```shell
multiline-strings-overview.wav 
multiline-strings-excercise.wav 
multiline-strings-solution.wav
```

# How to Create or Update Audio Overview Files

These instructions apply to all three types of overviews: **Overview**, **Exercise**, and **Solution**.

NotebookLM's audio overview feature was used to generate supplemental audio.  
👉 Log in using your `nashvillesoftwareschool.com` Google account to automatically access the Pro features, which enable more audio overviews.

---

## General Setup for All Audio Types

1. Go to [NotebookLM](https://notebooklm.google.com/).
2. Create a **new note**.
3. Name it using the format:  
   **`{chapter-id}-{type}`**  
   Examples: `array-methods-overview`, `array-methods-solution`.
4. Copy the relevant JavaScript file content into the note.
   - File example: [`array-methods.js`](src/chapters/arrays/array-methods.js)
5. Rename the source to **"Lesson"** (very important for consistency in the audio narration).

---

## Audio Overview Instructions

### 📘 **Overview Audio**

**Content to paste:**  
- Copy only the **`.content`** section from the JS file.

**Customization Instructions to paste in NotebookLM:**

```
• Focus on concepts and fundamentals with real-world examples  
• Explain to someone new to JavaScript  
• About 5 minutes in length  
```

**Save as:**  
`public/audio/chapters/{chapter-id}-overview.wav`  
Example: `public/audio/chapters/array-methods-overview.wav`

---

### 🧪 **Exercise Audio**

**Content to paste:**  
- Copy only the **`.exercise`** text and **`.startingCode`** from the JS file.

**Customization Instructions to paste in NotebookLM:**

```
• Focus on .exercise and .startingCode from the Lesson  
• Do not solve the exercise  
• Interpret the exercise instructions  
• Explain the starting code  
• Explain to someone new to JavaScript  
• About 5 minutes in length  
```

**Save as:**  
`public/audio/chapters/{chapter-id}-exercise.wav`  
Example: `public/audio/chapters/array-methods-exercise.wav`

---

### ✅ **Solution Audio**

**Content to paste:**  
- Use **`.startingCode`**, **`.exercise`**, and **`.solution`** from the JS file.

**Customization Instructions to paste in NotebookLM:**

```
• Focus on .startingCode, .exercise, and .solution from the Lesson  
• Discuss how we follow the exercise instructions to go from startingCode to solution  
• Explain the solution line by line  
• Explain to someone new to JavaScript  
• About 5 minutes in length  
```

**Save as:**  
`public/audio/chapters/{chapter-id}-solution.wav`  
Example: `public/audio/chapters/array-methods-solution.wav`
