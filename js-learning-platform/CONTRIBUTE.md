# Contributing to the Learning Platform

This guide explains how to contribute new content to the learning platform.

## Creating a New Section

1. Navigate to `src/sections/index.js`
2. Add your new section object to the sections array:
```js
{
  id: "unique_section_id",
  name: "Section Display Name",
  description: "Brief description of the section's content"
}
```
3. Create a new directory in `src/chapters` for your section's chapters (optional, but recommended for organization)

## Creating a New Chapter

1. Create a new file in `src/chapters` (e.g., `my-new-chapter.js`)
2. Use the following template for your chapter:
```js
export default {
    id: "unique_chapter_id",
    title: "Chapter Title",
    sectionId: "parent_section_id", // Must match a section ID
    previous: "previous_chapter_id", // ID of the chapter that comes before
    next: "next_chapter_id", // ID of the chapter that comes after
    content: [
        // Your chapter content here
    ]
}
```

3. Import and add your chapter in `src/chapters/index.js`:
```js
import myNewChapter from './my-new-chapter.js'

export default [
    // ... existing chapters
    myNewChapter
]
```

### Updating Chapter Links

When inserting a new chapter between existing ones:

1. Update the new chapter's `previous` and `next` properties to point to the correct chapters
2. Update the `next` property of the previous chapter to point to your new chapter
3. Update the `previous` property of the next chapter to point to your new chapter

Example:
```js
// Original chapters: A -> B -> C
// Adding X between B and C: A -> B -> X -> C

// In chapter B:
next: "chapter_x_id" // Was "chapter_c_id"

// In new chapter X:
previous: "chapter_b_id",
next: "chapter_c_id"

// In chapter C:
previous: "chapter_x_id" // Was "chapter_b_id"
```

## Writing Test Cases

The platform uses the `new Function()` strategy for testing code submissions. Here's how to write test cases:

1. Add test cases in your chapter's `tests` array:
```js
tests: [
      {
        name: "Name of Test 1",
        test: (code) => {
          try {
            const func = new Function(code + '\n return variableToTest1;');
            const result = func()

            if (result === undefined) return false;

            const expectedOutput1 = whatYouExpect;
            return result === expectedOutput;
          } catch (error) {
            return false;
          }
        },
        message: "Message about failing test 1"
      },
      {
        name: "Name of Test 2",
        test: (code) => {
          try {
            const func = new Function(code + '\n return variableToTest2;');
            const result = func()

            if (result === undefined) return false;

            const expectedOutput1 = whatYouExpect;
            return result === expectedOutput;
          } catch (error) {
            return false;
          }
        },
        message: "Message about failing test 2"
      },
    ]
```

1. Best Practices for Test Cases:
   - Always validate the type of the submission's return value
   - Test edge cases and invalid inputs
   - Provide clear error messages in your test logic
   - Use try/catch blocks to handle potential errors in student code
