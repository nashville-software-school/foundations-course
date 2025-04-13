import { TestResult } from "../../utils/test_utils";

export const flexboxContainerChapter = {
  id: 'flexbox-container',
  title: 'Flexbox Container Properties',
  sectionId: 'html-css',
  previousChapterId: 'flexbox-intro',
  nextChapterId: 'flexbox-items',
  content: `## Flexbox Container Properties

In the previous chapter, we learned about the basics of flexbox and the \`flex-direction\` property. Now, let's explore more properties that control how flex items are arranged within a flex container.

### Flex Wrap

The \`flex-wrap\` property specifies whether flex items should wrap or not if they run out of space:

- \`nowrap\` (default): All items will be on one line, potentially overflowing the container
- \`wrap\`: Items will wrap onto multiple lines from top to bottom
- \`wrap-reverse\`: Items will wrap onto multiple lines from bottom to top

\`\`\`css
.container {
  display: flex;
  flex-wrap: wrap;
}
\`\`\`

### Justify Content

The \`justify-content\` property aligns flex items along the main axis (horizontally for row, vertically for column). It helps distribute extra free space when items don't use all available space:

- \`flex-start\` (default): Items are packed toward the start of the flex direction
- \`flex-end\`: Items are packed toward the end of the flex direction
- \`center\`: Items are centered along the line
- \`space-between\`: Items are evenly distributed; the first item is at the start, the last item at the end
- \`space-around\`: Items are evenly distributed with equal space around them
- \`space-evenly\`: Items are evenly distributed with equal space between them

\`\`\`css
.container {
  display: flex;
  justify-content: center;
}
\`\`\`

### Gap

The \`gap\` property (formerly known as \`grid-gap\`) is used to define the space between flex items. It can be used to create consistent spacing without using margins:
- \`gap\`: Defines the space between items
- \`row-gap\`: Defines the space between rows
- \`column-gap\`: Defines the space between columns

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
\`\`\`

## Exercise: Working with Flex Container Properties

In this exercise, you'll create a card layout using flexbox container properties. Your task is to:

1. Create flex rule for the card container
2. Make the cards wrap to new lines when the screen is too narrow
3. Justify the content to center the cards
4. Add some space between the cards using \`gap\` property

Use the editor to write your HTML and CSS code, then click the "Run" button to see the result.
`,
  exercise: {
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>Flexbox Cards</title>
</head>
<body>
  <h1>Flexbox Card Layout</h1>

  <div class="card-container">
    <div class="card">
      <h3>Card 1</h3>
      <p>This is the first card in our flexbox layout.</p>
    </div>

    <div class="card">
      <h3>Card 2</h3>
      <p>This is the second card in our flexbox layout.</p>
    </div>

    <div class="card">
      <h3>Card 3</h3>
      <p>This is the third card in our flexbox layout.</p>
    </div>

    <div class="card">
      <h3>Card 4</h3>
      <p>This is the fourth card in our flexbox layout.</p>
    </div>

    <div class="card">
      <h3>Card 5</h3>
      <p>This is the fifth card in our flexbox layout.</p>
    </div>
  </div>
</body>
</html>`,
      'styles.css': `/* Add your flexbox styles here */
body {
  font-family: Arial, sans-serif;
  font-size: 0.8rem;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
}

.card {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin: 10px;
  flex-basis: 20%;
  min-height: 8rem;
}

/* Add your flexbox container properties below */

`
    },
    solution: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>Flexbox Cards</title>
</head>
<body>
  <h1>Flexbox Card Layout</h1>

  <div class="card-container">
    <div class="card">
      <h3>Card 1</h3>
      <p>This is the first card in our flexbox layout.</p>
    </div>

    <div class="card">
      <h3>Card 2</h3>
      <p>This is the second card in our flexbox layout.</p>
    </div>

    <div class="card">
      <h3>Card 3</h3>
      <p>This is the third card in our flexbox layout.</p>
    </div>

    <div class="card">
      <h3>Card 4</h3>
      <p>This is the fourth card in our flexbox layout.</p>
    </div>

    <div class="card">
      <h3>Card 5</h3>
      <p>This is the fifth card in our flexbox layout.</p>
    </div>
  </div>
</body>
</html>`,
      'styles.css': `/* Base styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
}

/* Card styles */
.card {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin: 10px;
  flex-basis: 20%;
  min-height: 8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin-top: 0;
  color: #2c3e50;
}

/* Flexbox container properties */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  padding: 10px;
}
`
    },
    tests: [
      {
        name: "Flexbox Container Properties",
        test: (files) => {
          try {
            const cssContent = files['styles.css']

            // Check for flexbox properties
            const hasDisplayFlex = /display\s*:\s*flex/i.test(cssContent)
            const hasFlexWrap = /flex-wrap\s*:\s*wrap/i.test(cssContent)
            const hasJustifyContent = /justify-content/i.test(cssContent)
            const hasGap = /gap\s*:\s*\d+px/i.test(cssContent)

            const result =  new TestResult({
              passed: hasDisplayFlex && hasFlexWrap && hasJustifyContent && hasGap
            })
            if (!hasDisplayFlex) {
              result.addMessage("The card container should use 'display: flex'.")
            }
            if (!hasFlexWrap) {
              result.addMessage("The card container should use 'flex-wrap: wrap'.")
            }
            if (!hasJustifyContent) {
              result.addMessage("The card container should use 'justify-content: center'.")
            }
            if (!hasGap) {
              result.addMessage("The card container should use 'gap' to add space between cards.")
            }
            return result
          } catch (error) {
            return new TestResult({
              passed: false,
              messages: () => ["Error parsing CSS: " + error.message]
            });
          }
        },
        message: "Make sure your CSS uses 'display: flex' and 'flex-wrap: wrap' for the card container to create a responsive card layout."
      }
    ]
  }
};