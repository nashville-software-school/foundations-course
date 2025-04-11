import { TestResult } from "../../utils/test_utils";

export const cssSelectorsChapter = {
  id: 'css-selectors',
  title: 'CSS Selectors',
  sectionId: 'html-css',
  previousChapterId: 'css-basics',
  nextChapterId: 'flexbox-basics',
  content: `## CSS Selectors

CSS selectors are patterns used to select and style HTML elements. Understanding selectors is crucial for applying styles effectively.

### Basic Selectors

1. **Element Selector**: Selects all elements of a specified type
   \`\`\`css
   p {
     color: blue;
   }
   \`\`\`

2. **Class Selector**: Selects elements with a specific class attribute
   \`\`\`css
   .highlight {
     background-color: yellow;
   }
   \`\`\`

3. **ID Selector**: Selects an element with a specific id attribute
   \`\`\`css
   #header {
     background-color: black;
     color: white;
   }
   \`\`\`

### Combinators

1. **Descendant Selector**: Selects all elements that are descendants of a specified element
   \`\`\`css
   article p {
     font-style: italic;
   }
   \`\`\`

2. **Child Selector**: Selects all elements that are direct children of a specified element
   \`\`\`css
   ul > li {
     font-weight: bold;
   }
   \`\`\`

3. **Adjacent Sibling Selector**: Selects an element that is directly after another specific element
   \`\`\`css
   h1 + p {
     font-size: 1.2em;
   }
   \`\`\`

4. **General Sibling Selector**: Selects all elements that are siblings of a specified element
   \`\`\`css
   h1 ~ p {
     color: gray;
   }
   \`\`\`

### Attribute Selectors

1. **Attribute Selector**: Selects elements with a specific attribute
   \`\`\`css
   input[type="text"] {
     border: 1px solid gray;
   }
   \`\`\`

2. **Attribute Value Selector**: Selects elements with a specific attribute value
   \`\`\`css
   a[href="https://example.com"] {
     color: green;
   }
   \`\`\`

### Pseudo-classes and Pseudo-elements

1. **Pseudo-classes**: Select elements based on a certain state
   \`\`\`css
   a:hover {
     text-decoration: underline;
   }

   li:first-child {
     font-weight: bold;
   }
   \`\`\`

2. **Pseudo-elements**: Select and style a part of an element
   \`\`\`css
   p::first-line {
     font-variant: small-caps;
   }

   p::before {
     content: "→ ";
   }
   \`\`\`

### Specificity

When multiple selectors apply to the same element, the browser determines which CSS declaration to use based on specificity:

1. Inline styles (highest specificity)
2. IDs
3. Classes, attributes, and pseudo-classes
4. Elements and pseudo-elements (lowest specificity)

If two selectors have the same specificity, the last one defined will be used.

## Exercise: Using CSS Selectors

In this exercise, you'll practice using different types of CSS selectors to style a webpage. The HTML contains various elements with different classes and IDs. Your task is to:

1. Style all paragraphs with a base style
2. Use class selectors to style specific elements
3. Use ID selectors for unique elements
4. Use combinators to target specific element relationships
5. Use pseudo-classes for interactive elements

Use the editor to write your CSS code, then click the "Run" button to see the result.
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
      'styles.css': `/* Add your CSS styles using different selectors */

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
      'styles.css': `/* Base styles */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

/* Element selector */
p {
  margin-bottom: 15px;
}

/* ID selector */
#main-header {
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
}

/* Descendant selector */
#main-header p {
  font-size: 1.2em;
  margin-top: 5px;
}

/* Class selector */
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

/* Child selector */
nav > ul {
  list-style: none;
  display: flex;
  background-color: #f5f5f5;
  padding: 0;
  border-radius: 5px;
}

nav > ul > li {
  margin: 0;
  padding: 0;
}

/* Adjacent sibling selector */
h2 + p {
  font-weight: bold;
}

/* Class and element selector */
.code {
  font-family: monospace;
  background-color: #f0f0f0;
  padding: 2px 5px;
  border-radius: 3px;
  border: 1px solid #ddd;
}

/* Attribute selector */
input[type="text"], input[type="email"] {
  width: 100%;
  padding: 8px;
  margin: 5px 0 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Pseudo-class selectors */
a:hover {
  color: #e74c3c;
  text-decoration: none;
}

li:first-child {
  font-weight: bold;
}

/* Form styles */
.form-group {
  margin-bottom: 15px;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

/* Footer */
footer {
  margin-top: 30px;
  text-align: center;
  color: #7f8c8d;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

/* Navigation links */
nav a {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
}

nav a:hover {
  background-color: #e0e0e0;
}

/* Section styling */
section {
  margin-bottom: 30px;
}

/* List styling */
.features li {
  margin-bottom: 5px;
}
`
    },
    tests: [
      {
        name: "CSS Selectors Usage",
        test: (files) => {
          try {
            const cssContent = files['styles.css'];

            // Check for various selector types
            const hasElementSelector = /^[a-z]+\s*\{/im.test(cssContent);
            const hasClassSelector = /\.[a-z][a-z0-9_-]*\s*\{/i.test(cssContent);
            const hasIdSelector = /#[a-z][a-z0-9_-]*\s*\{/i.test(cssContent);
            const hasDescendantSelector = /[a-z0-9_-]+\s+[a-z0-9_-]+\s*\{/i.test(cssContent);
            const hasChildSelector = /[a-z0-9_-]+\s*>\s*[a-z0-9_-]+\s*\{/i.test(cssContent);
            const hasPseudoClass = /:[a-z-]+/i.test(cssContent);

            return new TestResult({
              passed: hasElementSelector && hasClassSelector && hasIdSelector &&
                     (hasDescendantSelector || hasChildSelector) && hasPseudoClass,
              messages: () => [
                !hasElementSelector ? "You should use at least one element selector (e.g., p { ... })" : null,
                !hasClassSelector ? "You should use at least one class selector (e.g., .highlight { ... })" : null,
                !hasIdSelector ? "You should use at least one ID selector (e.g., #main-header { ... })" : null,
                !(hasDescendantSelector || hasChildSelector) ? "You should use at least one combinator (descendant or child selector)" : null,
                !hasPseudoClass ? "You should use at least one pseudo-class (e.g., :hover)" : null
              ].filter(Boolean)
            });
          } catch (error) {
            return new TestResult({
              passed: false,
              messages: () => ["Error parsing CSS: " + error.message]
            });
          }
        },
        message: "Make sure your CSS includes different types of selectors: element selectors, class selectors, ID selectors, combinators, and pseudo-classes."
      }
    ]
  }
};