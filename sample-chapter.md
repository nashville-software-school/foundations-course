# Sample Interactive Chapter: Arrays

## Chapter Structure

```json
{
  "id": "arrays-intro",
  "title": "Introduction to Arrays",
  "content": {
    "theory": {
      "markdown": "# All About Arrays\n\n## Arrays (Collections of Things)\n\nIn software, values don't only have to be assigned individually to variables. Arrays allow us to store multiple related values in a single collection.\n\nFor example, instead of individual variables:\n\n```js\nconst flower1 = \"Tulip\"\nconst flower2 = \"Rose\"\nconst flower3 = \"Daffodil\"\nconst flower4 = \"Daisy\"\n```\n\nWe can use an array to store all flowers together:\n\n```js\nconst flowers = [ \"Tulip\", \"Rose\", \"Daffodil\", \"Daisy\" ]\n```\n\nWhen naming arrays, use plural forms to indicate they contain multiple items:\n\n```js\nconst dogs = [ \"Schnauzer\", \"Labrador\", \"Bulldog\" ]\nconst ages = [ 24, 54, 32, 27 ]\nconst prices = [ 71.54, 401.03, 89.59 ]\n```"
    },
    "exercise": {
      "title": "Your First Array",
      "description": "Convert individual fruit variables into an array of fruits.",
      "starterCode": "// Current setup - let's make this better!\nconst yellowFruit = \"Banana\"\nconst orangeFruit = \"Orange\"\nconst redFruit = \"Apple\"\nconst greenFruit = \"Watermelon\"\nconst blueFruit = \"Blueberry\"\n\nconst fruits = []\n\n// Your code here",
      "hints": [
        "Remember to remove the individual variables",
        "Use square brackets [ ] to create an array",
        "Separate items with commas"
      ],
      "tests": [
        {
          "name": "Array Creation",
          "test": "expect(fruits).toEqual([\"Banana\", \"Orange\", \"Apple\", \"Watermelon\", \"Blueberry\"]);",
          "message": "The fruits array should contain all five fruits in the correct order"
        },
        {
          "name": "Variable Cleanup",
          "test": "expect(typeof yellowFruit).toBe('undefined');",
          "message": "Remove the individual fruit variables after creating the array"
        }
      ],
      "successMessage": "Great job! You've created your first array. Notice how much cleaner the code looks with a single array instead of multiple variables.",
      "failureMessage": "Keep trying! Remember to include all fruits in the array and remove the individual variables."
    }
  },
  "nextChapter": "arrays-accessing",
  "previousChapter": "variables-intro"
}
```

## Implementation Notes

1. **Content Display**
   - Theory section renders as Markdown with syntax highlighting
   - Code examples are interactive but read-only
   - Clear visual separation between theory and practice

2. **Exercise Interface**
   - Split-screen layout:
     * Left: Instructions and tests
     * Right: Code editor
   - Real-time test execution
   - Progressive hints system

3. **Testing System**
   - Jest-compatible test syntax
   - Immediate feedback
   - Multiple test cases per exercise
   - Detailed error messages

4. **User Experience**
   - Clear progress indicators
   - Save work in progress
   - Reset to starting point
   - Show/hide hints
   - Celebration on completion

5. **Technical Features**
   - Code validation
   - Syntax highlighting
   - Error detection
   - Auto-completion
   - Format on save

This structure allows for:
- Clear progression of concepts
- Immediate hands-on practice
- Automated validation
- Instant feedback
- Guided learning experience