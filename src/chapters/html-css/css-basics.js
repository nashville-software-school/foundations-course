import { TestResult } from "@nss-workshops/nss-core";

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

For example, the following style sets the color of all \`<h1>\` elements to blue and the font size to 24 pixels:

\`\`\`css
h1 {
  color: blue;
  font-size: 24px;
}
\`\`\`

### Adding CSS to HTML

The most common, modern way of include styles with your HTML is by using a separate CSS file linked with the \`<link>\` element.

   \`\`\`html
   <head>
     <link rel="stylesheet" href="styles.css">
   </head>
   \`\`\`

Look to the right at the code editor, and you will see that there is a tab named \`styles.css\`. This is where you will write your CSS code.

🧨 The CSS will automatically be applied to the HTML file when you run the code. You don't need to worry about linking it yourself.

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

In this exercise, you'll style the HTML page provided using CSS. The HTML contains a simple article with headings, paragraphs, and a list. Your task is to add the following styles to the CSS file:

After you implement each style, click the "Run" button to see the changes applied to the HTML page.

1. Update the body element to have a background-color of "lightblue"
2. Give the article a border using the following value: \`1px solid black;\`
3. Give the article a padding rule with a value of \`1rem;\`
4. Give p elements a color of \`purple;\`
5. Give img elements a height of \`10rem;\`

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

    <img src="https://picsum.photos/200/300" alt="Sample Image" />
  </article>
</body>
</html>`,
      'styles.css': `body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 20px;
  color: #333;
}

/* Add your CSS styles here */

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

            // Check for the required CSS properties
            const hasBodyBackgroundColor = /body\s*\{[^}]*background-color\s*:\s*lightblue/i.test(cssContent);
            const hasArticleBorder = /article\s*\{[^}]*border\s*:\s*1px\s+solid\s+black/i.test(cssContent);
            const hasArticlePadding = /article\s*\{[^}]*padding\s*:\s*1rem/i.test(cssContent);
            const hasPurpleText = /p\s*\{[^}]*color\s*:\s*purple/i.test(cssContent);
            const hasImgHeight = /img\s*\{[^}]*height\s*:\s*10rem/i.test(cssContent);

            const result = new TestResult({
              passed: hasBodyBackgroundColor && hasArticleBorder && hasArticlePadding && hasPurpleText && hasImgHeight
            });

            if (!hasBodyBackgroundColor) {
              result.addMessage("You should set the body element's background-color to lightblue");
            }

            if (!hasArticleBorder) {
              result.addMessage("You should give the article element a border of 1px solid black");
            }

            if (!hasArticlePadding) {
              result.addMessage("You should give the article element a padding of 1rem");
            }

            if (!hasPurpleText) {
              result.addMessage("You should set the color of p elements to purple");
            }

            if (!hasImgHeight) {
              result.addMessage("You should set the height of img elements to 10rem");
            }

            return result;
          } catch (error) {
            const result = new TestResult({
              passed: false
            });
            result.addMessage("Error parsing CSS: " + error.message);
            return result;
          }
        },
        message: "Make sure your CSS includes the required styles for body, article, p, and img elements."
      }
    ]
  }
};