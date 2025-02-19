# JavaScript Learning Platform Documentation

## Overview

This learning platform is designed to provide an interactive learning experience for JavaScript beginners. It features a side-by-side layout with educational content and a live code editor, allowing students to practice concepts as they learn them.

## System Architecture

### Core Components

1. **Navigation System**
   - Located in `src/components/Navigation.jsx`
   - Manages chapter navigation
   - Displays numbered chapters with active state
   - Uses React Router for navigation

2. **Content Display**
   - Located in `src/components/Chapter.jsx`
   - Renders markdown content
   - Supports code blocks with syntax highlighting
   - Uses `marked` library for markdown parsing

3. **Code Editor**
   - Uses Monaco Editor (same as VS Code)
   - Supports JavaScript syntax highlighting
   - Real-time code validation
   - Configurable options (font size, line numbers, etc.)

4. **Test System**
   - Integrated with the code editor
   - Provides immediate feedback
   - Supports custom test cases
   - Clear success/failure messaging

## Adding New Chapters

### 1. Create Chapter Content

Create a new chapter by adding an entry to the `chapters` array in `src/context/ChapterContext.jsx`:

```javascript
const chapters = [
  {
    id: 'chapter-slug',
    title: 'Chapter Title',
    path: '/chapter-slug'
  }
]
```

### 2. Chapter Content Structure

Each chapter should follow this structure:

```javascript
const chapterContent = {
  content: `# Chapter Title

Description of the concept being taught.

## Exercise

Description of what the student needs to do.

\`\`\`js
// Example code if needed
\`\`\`

Try it yourself in the editor!
`,
  exercise: {
    starterCode: `// Code that appears in editor
// Include helpful comments
// Leave space for student's solution`,
    solution: `// The correct solution
// Used for test validation`
  }
}
```

### 3. Test Configuration

Tests are configured in the Chapter component. Here's how to add custom tests:

```javascript
const runTests = () => {
  // Example test structure
  const tests = [
    {
      name: 'Basic Functionality',
      test: (code) => {
        // Test logic here
        return code.includes('expected solution');
      },
      message: 'Success message if test passes'
    }
  ];

  // Run all tests
  const results = tests.every(test => test.test(code));
  setTestResults({
    passed: results,
    message: results
      ? 'Great job! All tests passed!'
      : 'Not quite right. Check the requirements and try again.'
  });
};
```

## Test Types and Examples

### 1. Simple String Matching

```javascript
// Test if code contains specific string
const test = (code) => code.includes('const fruits = ["Banana"');
```

### 2. Function Output Testing

```javascript
// Test function output
const test = (code) => {
  try {
    const func = new Function(code + '\nreturn functionName();');
    const result = func();
    return result === expectedOutput;
  } catch (error) {
    return false;
  }
};
```

### 3. Array Testing

```javascript
// Test array operations
const test = (code) => {
  try {
    const func = new Function(code + '\nreturn arrayName;');
    const result = func();
    return Array.isArray(result) && result.length === expectedLength;
  } catch (error) {
    return false;
  }
};
```

### 4. Object Testing

```javascript
// Test object properties
const test = (code) => {
  try {
    const func = new Function(code + '\nreturn objectName;');
    const result = func();
    return result.hasOwnProperty('expectedProperty');
  } catch (error) {
    return false;
  }
};
```

## Best Practices

1. **Content Writing**
   - Use clear, concise language
   - Include relevant code examples
   - Break concepts into digestible chunks
   - Provide context for exercises

2. **Exercise Design**
   - Start with simple tasks
   - Gradually increase complexity
   - Include helpful comments in starter code
   - Make success criteria clear

3. **Test Writing**
   - Test for specific outcomes
   - Include helpful error messages
   - Consider edge cases
   - Test both positive and negative scenarios

4. **Code Editor**
   - Set appropriate editor options
   - Include helpful starter code
   - Use consistent formatting
   - Add guiding comments

## Example Chapter Implementation

Here's a complete example of implementing a chapter about array methods:

```javascript
// In ChapterContext.jsx
const chapters = [
  // ... other chapters
  {
    id: 'array-methods',
    title: 'Array Methods',
    path: '/array-methods'
  }
];

// In Chapter.jsx
const arrayMethodsChapter = {
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
console.log(largeNumbers);`
  }
};

// Test implementation
const runTests = () => {
  try {
    // Execute student's code
    const func = new Function(code + '\nreturn largeNumbers;');
    const result = func();

    // Test cases
    const tests = [
      {
        name: 'Array Creation',
        test: () => Array.isArray(result),
        message: 'Result should be an array'
      },
      {
        name: 'Correct Filtering',
        test: () => {
          const expected = [7, 9, 6, 8];
          return result.length === expected.length &&
                 result.every(num => num > 5);
        },
        message: 'Array should only contain numbers greater than 5'
      }
    ];

    // Run all tests
    const passed = tests.every(t => t.test());
    setTestResults({
      passed,
      message: passed
        ? 'Great job! You\'ve correctly filtered the array!'
        : 'Make sure you\'re using filter to keep only numbers greater than 5.'
    });
  } catch (error) {
    setTestResults({
      passed: false,
      message: 'There was an error in your code. Check your syntax and try again.'
    });
  }
};
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. The built files will be in the `dist` directory

3. Deploy to your preferred hosting platform

## Troubleshooting

Common issues and solutions:

1. **Monaco Editor Not Loading**
   - Check that `@monaco-editor/react` is installed
   - Verify editor container has proper dimensions
   - Check browser console for errors

2. **Tests Not Running**
   - Verify code syntax is valid
   - Check test function implementation
   - Ensure all required variables are defined

3. **Markdown Not Rendering**
   - Verify `marked` is installed
   - Check markdown syntax
   - Ensure content is properly escaped

4. **Navigation Issues**
   - Check React Router setup
   - Verify chapter paths are correct
   - Check for duplicate routes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Remember to:
- Follow the existing code style
- Add tests for new features
- Update documentation
- Test all changes thoroughly