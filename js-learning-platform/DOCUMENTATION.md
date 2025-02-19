# JavaScript Learning Platform Documentation

## Overview

This learning platform is designed to provide an interactive learning experience for JavaScript beginners. It features a side-by-side layout with educational content and a live code editor, allowing students to practice concepts as they learn them.

## Adding New Chapters

### Chapter File Structure

Chapters are stored in the `src/chapters` directory. Each chapter is a separate JavaScript file that exports a chapter object. Here's how to add a new chapter:

1. Create a new file in `src/chapters` (e.g., `loops.js`):

```javascript
export const loopsChapter = {
  id: 'loops',
  title: 'JavaScript Loops',
  content: `# JavaScript Loops

Your markdown content here...

## Exercise

Your exercise description here...

\`\`\`js
// Code examples here
\`\`\`
`,
  exercise: {
    starterCode: `// Code that appears in editor
// Include helpful comments
// Leave space for student's solution`,
    solution: `// The correct solution
// Used for test validation`,
    tests: [
      {
        name: "Test Name",
        test: (code) => {
          // Test logic here
          return code.includes('expected solution');
        },
        message: "Message shown when test fails"
      }
    ]
  }
}
```

2. Add the chapter to `src/chapters/index.js`:

```javascript
import { loopsChapter } from './loops'

export const chapters = [
  // ... other chapters
  loopsChapter
]
```

### Chapter Object Structure

Each chapter object must have the following properties:

- `id` (string): Unique identifier for the chapter
- `title` (string): Chapter title shown in navigation
- `content` (string): Markdown content including explanations and examples
- `exercise` (object):
  - `starterCode` (string): Initial code shown in editor
  - `solution` (string): Correct solution for reference
  - `tests` (array): Array of test objects

### Test Configuration

Each test object should have:

- `name` (string): Name of the test
- `test` (function): Function that takes code string and returns boolean
- `message` (string): Message shown when test fails

Example test configurations:

```javascript
// Simple string matching
{
  name: "Array Creation",
  test: (code) => code.includes('["Banana", "Orange"]'),
  message: "Create an array with the specified fruits"
}

// Function output testing
{
  name: "Function Return",
  test: (code) => {
    try {
      const func = new Function(code + '\nreturn sum([1,2,3]);');
      return func() === 6;
    } catch (error) {
      return false;
    }
  },
  message: "Function should return the sum of array elements"
}

// Pattern matching
{
  name: "Loop Implementation",
  test: (code) => {
    return code.includes('for') || code.includes('while');
  },
  message: "Use a loop to solve this exercise"
}
```

### Content Writing Guidelines

1. **Markdown Content**
   - Use clear headings with proper hierarchy
   - Include code examples in markdown blocks
   - Break concepts into digestible sections
   - Use lists and emphasis where appropriate

2. **Exercise Design**
   - Start with clear objectives
   - Provide helpful starter code
   - Include comments to guide students
   - Make success criteria explicit

3. **Test Writing**
   - Test for specific outcomes
   - Include helpful error messages
   - Consider edge cases
   - Test both syntax and logic

### Example Chapter Implementation

Here's a complete example of a chapter about array methods:

```javascript
export const arrayMethodsChapter = {
  id: 'array-methods',
  title: 'Array Methods',
  content: `# Array Methods

Arrays in JavaScript come with powerful built-in methods for manipulation and transformation.

## Exercise

Use the \`filter\` method to create a new array containing only numbers greater than 5.

\`\`\`js
// Example:
const numbers = [2, 8, 4, 10, 1, 7];
const filtered = numbers.filter(num => num > 5);
// filtered is [8, 10, 7]
\`\`\`

Try it yourself!
`,
  exercise: {
    starterCode: `const numbers = [3, 7, 1, 9, 4, 6, 2, 8];

// Use filter to create largeNumbers array
const largeNumbers =

console.log(largeNumbers);`,
    solution: `const numbers = [3, 7, 1, 9, 4, 6, 2, 8];
const largeNumbers = numbers.filter(num => num > 5);
console.log(largeNumbers);`,
    tests: [
      {
        name: "Filter Implementation",
        test: (code) => {
          try {
            return code.includes('.filter') && code.includes('> 5');
          } catch (error) {
            return false;
          }
        },
        message: "Make sure you're using the filter method to keep numbers greater than 5"
      }
    ]
  }
}
```

## Best Practices

1. **Content Organization**
   - Keep one chapter per file
   - Use descriptive file names
   - Maintain consistent structure
   - Order chapters logically

2. **Testing Strategy**
   - Write clear test descriptions
   - Test for understanding, not just syntax
   - Provide helpful feedback
   - Consider common mistakes

3. **Code Quality**
   - Follow JavaScript best practices
   - Use consistent formatting
   - Add helpful comments
   - Handle errors gracefully

## Troubleshooting

Common issues and solutions:

1. **Tests Not Running**
   - Check test function syntax
   - Verify code string manipulation
   - Console.log test results for debugging
   - Check for runtime errors

2. **Content Not Displaying**
   - Verify markdown syntax
   - Check chapter object structure
   - Ensure chapter is exported correctly
   - Verify chapter is added to index.js

3. **Editor Issues**
   - Check Monaco Editor configuration
   - Verify starter code formatting
   - Ensure proper height/width settings
   - Check for syntax errors

## Contributing

When contributing new chapters:

1. Follow the file structure
2. Test thoroughly
3. Update documentation
4. Follow coding standards
5. Add meaningful tests
6. Include clear instructions

Remember to run the application locally and test all functionality before submitting new chapters.