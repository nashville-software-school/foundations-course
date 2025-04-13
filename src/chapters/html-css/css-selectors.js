import { TestResult } from "../../utils/test_utils";

export const cssSelectorsChapter = {
  id: 'css-selectors',
  title: 'CSS Selectors',
  sectionId: 'html-css',
  previousChapterId: 'css-basics',
  nextChapterId: 'flexbox-intro',
  content: `## CSS Selectors

CSS selectors are patterns used to select and style HTML elements. Understanding selectors is crucial for applying styles effectively.

### Basic Selectors

There are three fundamental CSS selectors that every web developer should master:

1. **Element Selector**: Selects all elements of a specified type
   \`\`\`css
   p {
     color: blue;
   }
   \`\`\`
   This selector applies styles to every paragraph element on the page.

2. **Class Selector**: Selects elements with a specific class attribute
   \`\`\`css
   .highlight {
     background-color: yellow;
   }
   \`\`\`
   Class selectors are versatile and can be applied to multiple elements. They are prefixed with a dot (.) followed by the class name.

3. **ID Selector**: Selects an element with a specific id attribute
   \`\`\`css
   #header {
     background-color: black;
     color: white;
   }
   \`\`\`
   ID selectors target a unique element on the page. They are prefixed with a hash (#) followed by the ID name. Each ID should only be used once per page.

### When to Use Each Selector

- **Element Selectors**: Use when you want to apply a consistent style to all instances of a particular HTML element.
- **Class Selectors**: Use when you need to apply the same style to multiple elements, regardless of their type.
- **ID Selectors**: Use when styling a unique element that appears only once on the page.

## Exercise: Using Basic CSS Selectors

In this exercise, you'll practice using the three basic types of CSS selectors to style a webpage. The HTML contains various elements with different classes and IDs. Your task is to:

1. Use element selectors to style all paragraphs and headings
2. Use class selectors to style elements with specific classes
3. Use ID selectors to style unique elements with IDs

Here's a review of popular CSS rules. Be as creative as you want with your styles!

- \`color\`: Sets the color of text. Use any named colors from the <a href="https://www.w3schools.com/cssref/css_colors.php" target="_blank">Color Reference</a>
- \`font-family\`: Specifies the font
- \`font-size\`: Sets the size of the font
- \`font-weight\`: Sets the thickness of the font (normal, bold, etc.)
- \`text-align\`: Aligns the text (left, right, center, justify)
- \`margin\`: Sets the space outside an element
- \`padding\`: Sets the space inside an element
- \`border\`: Sets the border around an element
- \`width\` and \`height\`: Set the dimensions of an element
- \`background-color\`: Sets the background color
- \`background-image\`: Sets a background image
- \`background-size\`: Specifies the size of the background image

`,
  exercise: {
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>CSS Selectors Exercise</title>
</head>
<body>
  <header id="main-header">
    <h1>Understanding CSS Selectors</h1>
    <p>Learn how to target HTML elements effectively</p>
  </header>

  <nav>
    <ul>
      <li><a href="#basics">Basics</a></li>
      <li><a href="#advanced">Advanced</a></li>
      <li><a href="#practice">Practice</a></li>
    </ul>
  </nav>

  <main>
    <section id="basics">
      <h2>Basic Selectors</h2>
      <p>CSS selectors are patterns used to select HTML elements.</p>
      <p class="highlight">Understanding selectors is crucial for effective styling.</p>
      <div class="example">
        <h3>Example</h3>
        <p>This is an example of a <span class="code">class selector</span>.</p>
      </div>
    </section>

    <section id="advanced">
      <h2>Advanced Selectors</h2>
      <p>Advanced selectors provide more precise targeting.</p>
      <div class="example">
        <h3>Combinators</h3>
        <p>Combinators allow you to target elements based on their relationships.</p>
        <ul class="features">
          <li>Descendant selectors</li>
          <li>Child selectors</li>
          <li>Adjacent sibling selectors</li>
        </ul>
      </div>
    </section>

    <section id="practice">
      <h2>Practice</h2>
      <p>Practice is essential for mastering CSS selectors.</p>
      <form>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" placeholder="Your name">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" placeholder="Your email">
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  </main>

  <footer>
    <p>&copy; 2025 CSS Selectors Tutorial</p>
  </footer>
</body>
</html>`,
      'styles.css': `body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 3rem;
  color: #333;
}

/* Add your CSS styles using element, class, and ID selectors */

`
    },
    solution: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>CSS Selectors Exercise</title>
</head>
<body>
  <header id="main-header">
    <h1>Understanding CSS Selectors</h1>
    <p>Learn how to target HTML elements effectively</p>
  </header>

  <nav>
    <ul>
      <li><a href="#basics">Basics</a></li>
      <li><a href="#advanced">Advanced</a></li>
      <li><a href="#practice">Practice</a></li>
    </ul>
  </nav>

  <main>
    <section id="basics">
      <h2>Basic Selectors</h2>
      <p>CSS selectors are patterns used to select HTML elements.</p>
      <p class="highlight">Understanding selectors is crucial for effective styling.</p>
      <div class="example">
        <h3>Example</h3>
        <p>This is an example of a <span class="code">class selector</span>.</p>
      </div>
    </section>

    <section id="advanced">
      <h2>Advanced Selectors</h2>
      <p>Advanced selectors provide more precise targeting.</p>
      <div class="example">
        <h3>Combinators</h3>
        <p>Combinators allow you to target elements based on their relationships.</p>
        <ul class="features">
          <li>Descendant selectors</li>
          <li>Child selectors</li>
          <li>Adjacent sibling selectors</li>
        </ul>
      </div>
    </section>

    <section id="practice">
      <h2>Practice</h2>
      <p>Practice is essential for mastering CSS selectors.</p>
      <form>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" placeholder="Your name">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" placeholder="Your email">
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  </main>

  <footer>
    <p>&copy; 2025 CSS Selectors Tutorial</p>
  </footer>
</body>
</html>`,
      'styles.css': `/* Base styles using element selectors */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

h2 {
  color: #3498db;
  margin-top: 25px;
}

h3 {
  color: #555;
}

p {
  margin-bottom: 15px;
}

/* Class selectors */
.highlight {
  background-color: #fffde7;
  padding: 10px;
  border-left: 4px solid #ffd54f;
}

.example {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  margin: 20px 0;
}

.code {
  font-family: monospace;
  background-color: #f0f0f0;
  padding: 2px 5px;
  border-radius: 3px;
  border: 1px solid #ddd;
}

.form-group {
  margin-bottom: 15px;
}

/* ID selectors */
#main-header {
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
}

#basics {
  border-left: 3px solid #3498db;
  padding-left: 15px;
}

#advanced {
  border-left: 3px solid #e74c3c;
  padding-left: 15px;
}

#practice {
  border-left: 3px solid #2ecc71;
  padding-left: 15px;
}
`
    },
    tests: [
        {
          name: "Basic CSS Selectors Usage",
          test: (files) => {
            try {
              const cssContent = files['styles.css'];

              // Check for basic selector types only
              const hasElementSelector = /^[a-z]+\s*\{/im.test(cssContent);
              const hasClassSelector = /\.[a-z][a-z0-9_-]*\s*\{/i.test(cssContent);
              const hasIdSelector = /#[a-z][a-z0-9_-]*\s*\{/i.test(cssContent);

              const result = new TestResult({
                passed: hasElementSelector && hasClassSelector && hasIdSelector
              });

              if (!hasElementSelector) {
                result.addMessage("You should use at least one element selector (e.g., p { ... })");
              }

              if (!hasClassSelector) {
                result.addMessage("You should use at least one class selector (e.g., .highlight { ... })");
              }

              if (!hasIdSelector) {
                result.addMessage("You should use at least one ID selector (e.g., #main-header { ... })");
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
          message: "Make sure your CSS includes the three basic types of selectors: element selectors, class selectors, and ID selectors."
        }
      ]
  }
};