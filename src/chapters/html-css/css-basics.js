import { TestResult } from "../../utils/test_utils";

export const cssBasicsChapter = {
  id: 'css-basics',
  title: 'CSS Basics',
  sectionId: 'html-css',
  previousChapterId: 'html-elements',
  nextChapterId: 'css-selectors',
  content: `## CSS Basics

CSS (Cascading Style Sheets) is used to style and layout web pages. It allows you to control the color, font, size, spacing, and many other aspects of HTML elements.

### CSS Syntax

CSS consists of a selector and a declaration block:

\`\`\`css
selector {
  property: value;
  property: value;
}
\`\`\`

- The **selector** points to the HTML element you want to style
- The **declaration block** contains one or more declarations separated by semicolons
- Each declaration includes a CSS property name and a value, separated by a colon

For example:

\`\`\`css
h1 {
  color: blue;
  font-size: 24px;
}
\`\`\`

### Adding CSS to HTML

There are three ways to add CSS to HTML:

1. **Inline CSS**: Using the style attribute in HTML elements
   \`\`\`html
   <h1 style="color: blue; font-size: 24px;">Heading</h1>
   \`\`\`

2. **Internal CSS**: Using the \`<style>\` element in the \`<head>\` section
   \`\`\`html
   <head>
     <style>
       h1 {
         color: blue;
         font-size: 24px;
       }
     </style>
   </head>
   \`\`\`

3. **External CSS**: Using a separate CSS file linked with the \`<link>\` element
   \`\`\`html
   <head>
     <link rel="stylesheet" href="styles.css">
   </head>
   \`\`\`

For this exercise, we'll be using the external CSS approach, with our styles in the styles.css file.

### Common CSS Properties

Here are some common CSS properties you'll use frequently:

#### Text Properties
- \`color\`: Sets the color of text
- \`font-family\`: Specifies the font
- \`font-size\`: Sets the size of the font
- \`font-weight\`: Sets the thickness of the font (normal, bold, etc.)
- \`text-align\`: Aligns the text (left, right, center, justify)

#### Box Model Properties
- \`margin\`: Sets the space outside an element
- \`padding\`: Sets the space inside an element
- \`border\`: Sets the border around an element
- \`width\` and \`height\`: Set the dimensions of an element

#### Background Properties
- \`background-color\`: Sets the background color
- \`background-image\`: Sets a background image
- \`background-size\`: Specifies the size of the background image

#### Display and Positioning
- \`display\`: Specifies how an element is displayed (block, inline, flex, etc.)
- \`position\`: Sets the positioning method (static, relative, absolute, fixed)

## Exercise: Styling a Web Page

In this exercise, you'll style the HTML page provided using CSS. The HTML contains a simple article with headings, paragraphs, and a list. Your task is to:

1. Set appropriate colors for headings and text
2. Style the background
3. Add margins and padding to improve spacing
4. Style the list items

Use the editor to write your CSS code, then click the "Run" button to see the result.
`,
  exercise: {
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>CSS Basics Exercise</title>
</head>
<body>
  <article>
    <h1>Understanding CSS</h1>
    <p class="intro">CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML.</p>

    <h2>Why CSS is Important</h2>
    <p>CSS allows web developers to:</p>
    <ul>
      <li>Control the layout of multiple web pages all at once</li>
      <li>Create more attractive and professional-looking websites</li>
      <li>Improve user experience with responsive design</li>
      <li>Separate content from presentation for better maintenance</li>
    </ul>

    <h2>Learning CSS</h2>
    <p>Learning CSS is essential for anyone interested in web development. It complements HTML and JavaScript to create modern web applications.</p>

    <div class="note">
      <p>Note: This is just a basic introduction to CSS. There's much more to learn!</p>
    </div>
  </article>
</body>
</html>`,
      'styles.css': `/* Add your CSS styles here */

`
    },
    solution: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>CSS Basics Exercise</title>
</head>
<body>
  <article>
    <h1>Understanding CSS</h1>
    <p class="intro">CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML.</p>

    <h2>Why CSS is Important</h2>
    <p>CSS allows web developers to:</p>
    <ul>
      <li>Control the layout of multiple web pages all at once</li>
      <li>Create more attractive and professional-looking websites</li>
      <li>Improve user experience with responsive design</li>
      <li>Separate content from presentation for better maintenance</li>
    </ul>

    <h2>Learning CSS</h2>
    <p>Learning CSS is essential for anyone interested in web development. It complements HTML and JavaScript to create modern web applications.</p>

    <div class="note">
      <p>Note: This is just a basic introduction to CSS. There's much more to learn!</p>
    </div>
  </article>
</body>
</html>`,
      'styles.css': `/* Basic page styling */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f8f8;
  margin: 0;
  padding: 20px;
}

article {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Heading styles */
h1 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

h2 {
  color: #3498db;
  margin-top: 25px;
}

/* Paragraph styles */
p {
  margin-bottom: 15px;
}

p.intro {
  font-size: 1.1em;
  font-weight: bold;
  color: #555;
}

/* List styles */
ul {
  background-color: #f5f5f5;
  padding: 20px 20px 20px 40px;
  border-left: 4px solid #3498db;
  border-radius: 0 4px 4px 0;
}

li {
  margin-bottom: 8px;
}

li:last-child {
  margin-bottom: 0;
}

/* Note box */
.note {
  background-color: #fffde7;
  border: 1px solid #ffd54f;
  border-radius: 4px;
  padding: 10px 15px;
  margin-top: 30px;
}

.note p {
  margin: 0;
  font-style: italic;
  color: #5d4037;
}
`
    },
    tests: [
      {
        name: "CSS Styling",
        test: (files) => {
          try {
            const cssContent = files['styles.css'];

            // Check for various CSS properties
            const hasBodyStyles = /body\s*\{[^}]*font-family/i.test(cssContent);
            const hasHeadingStyles = /h1\s*\{[^}]*color/i.test(cssContent);
            const hasMarginOrPadding = /margin|padding/i.test(cssContent);
            const hasBackgroundColor = /background-color/i.test(cssContent);
            const hasListStyles = /ul\s*\{|li\s*\{/i.test(cssContent);

            return new TestResult({
              passed: hasBodyStyles && hasHeadingStyles && hasMarginOrPadding && hasBackgroundColor && hasListStyles,
              messages: () => [
                !hasBodyStyles ? "You should style the body element with at least a font-family property" : null,
                !hasHeadingStyles ? "You should style at least one heading (h1 or h2) with a color property" : null,
                !hasMarginOrPadding ? "You should use margin or padding properties to improve spacing" : null,
                !hasBackgroundColor ? "You should use the background-color property somewhere in your CSS" : null,
                !hasListStyles ? "You should style the list (ul) or list items (li)" : null
              ].filter(Boolean)
            });
          } catch (error) {
            return new TestResult({
              passed: false,
              messages: () => ["Error parsing CSS: " + error.message]
            });
          }
        },
        message: "Make sure your CSS includes styles for the body, headings, spacing (margin/padding), background colors, and list elements."
      }
    ]
  }
};