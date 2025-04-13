import { TestResult } from "../../utils/test_utils";

export const flexboxIntroChapter = {
  id: 'flexbox-intro',
  title: 'Introduction to Flexbox',
  sectionId: 'html-css',
  previousChapterId: 'css-selectors',
  nextChapterId: 'flexbox-container',
  content: `## Introduction to Flexbox

Flexbox (Flexible Box Layout) is a one-dimensional layout method designed for laying out items in rows or columns. It makes it easier to design flexible responsive layouts without using float or positioning.

### The Flex Container

To create a flex container, set the \`display\` property to \`flex\` or \`inline-flex\`:

\`\`\`css
.container {
  display: flex;
}
\`\`\`

When you set an element as a flex container:
- Its direct children become "flex items"
- The container establishes a "flex formatting context" for these items
- The default flow is horizontal (row)

### Main Axis and Cross Axis

Flexbox operates on two axes:

1. **Main Axis**: The primary axis along which flex items are laid out
2. **Cross Axis**: The axis perpendicular to the main axis

Understanding these axes is crucial because many flexbox properties reference them.

### Flex Direction

The \`flex-direction\` property defines the direction of the main axis, determining how flex items are placed within the container:

- \`row\` (default): Items flow horizontally from left to right
- \`row-reverse\`: Items flow horizontally from right to left
- \`column\`: Items flow vertically from top to bottom
- \`column-reverse\`: Items flow vertically from bottom to top

\`\`\`css
.container {
  display: flex;
  flex-direction: row; /* default */
}
\`\`\`

### Example: Basic Flex Container

Let's see a simple example of a flex container with different flex directions:

\`\`\`html
<div class="flex-container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
\`\`\`

\`\`\`css
.flex-container {
  display: flex;
  /* Try changing to: row-reverse, column, or column-reverse */
  flex-direction: row;
  background-color: #f0f0f0;
  padding: 10px;
}

.item {
  background-color: #3498db;
  color: white;
  padding: 20px;
  margin: 10px;
  text-align: center;
}
\`\`\`

## Exercise: Creating a Basic Flex Container

In this exercise, you'll create a simple navigation bar using flexbox. Your task is to:

1. There is an existing CSS block for the \`.nav-links\` class
2. Add the rules to make it a flex container
3. Set the \`flex-direction\` to all 4 possible values _(see above)_ to see the difference
4. Set the \`justify-content\` to \`space-evenly\`
5. Add some basic styling to make it look like a horizontal navigation menu. For example, you can set the background color, border, text color, and padding.

Use the editor to write your HTML and CSS code, then click the "Run" button to see the result.
`,
  exercise: {
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>Flexbox Navigation</title>
</head>
<body>
  <nav class="navbar">
    <div class="logo">My Website</div>
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</body>
</html>`,
      'styles.css': `/* Add your flexbox styles here */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.nav-links {
  list-style: none;
}

/* Make the navbar a flex container and style it */

`
    },
    solution: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>Flexbox Navigation</title>
</head>
<body>
  <nav class="navbar">
    <div class="logo">My Website</div>
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</body>
</html>`,
      'styles.css': `/* Base styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* Navbar styles with flexbox */
.nav-links {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border: 1px solid lightgray;
  padding: 0.25rem;
  margin: 0.25rem 0.5rem;
  background-color: aliceblue;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-left: 1.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

.nav-links a:hover {
  text-decoration: underline;
}
`
    },
    tests: [
      {
        name: "Flexbox Usage",
        test: (files) => {
          try {
            const cssContent = files['styles.css'];

            // Check for flexbox properties
            const hasDisplayFlex = /display\s*:\s*flex/i.test(cssContent);
            const hasFlexDirection = /flex-direction/i.test(cssContent);
            const hasJustify = /justify-content/i.test(cssContent);

            const result =  new TestResult({
              passed: hasDisplayFlex && hasFlexDirection && hasJustify,
            });
            result.addMessage(!hasDisplayFlex ? "You should use 'display: flex' to create a flex container" : null)
            result.addMessage(!hasFlexDirection ? "You should set 'flex-direction' to define the direction of the flex items" : null)
            result.addMessage(!hasJustify ? "You should set 'justify-content' to control the alignment of flex items" : null)
            return result;

          } catch (error) {
            return new TestResult({
              passed: false,
              messages: () => ["Error parsing CSS: " + error.message]
            });
          }
        },
        message: "Make sure your CSS uses 'display: flex' to create a flex container for the navbar."
      }
    ]
  }
};