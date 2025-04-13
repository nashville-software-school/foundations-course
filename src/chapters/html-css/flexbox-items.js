import { TestResult } from "../../utils/test_utils";

export const flexboxItemsChapter = {
  id: 'flexbox-items',
  title: 'Flexbox Item Properties',
  sectionId: 'html-css',
  previousChapterId: 'flexbox-container',
  nextChapterId: null,
  content: `## Flexbox Item Properties

In the previous chapters, we learned about flex containers and their properties. Now, let's focus on the properties that can be applied to individual flex items to control their behavior within the container.

### Order

The \`order\` property controls the order in which flex items appear in the flex container. By default, items are laid out in the source order, but you can change this with the \`order\` property:

\`\`\`css
.item {
  order: 2; /* default is 0 */
}
\`\`\`

Items with the same order value are laid out in the source order. Items with a lower order value appear first.

### Flex Grow

The \`flex-grow\` property defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion:

\`\`\`css
.item {
  flex-grow: 1; /* default is 0 */
}
\`\`\`

If all items have \`flex-grow\` set to 1, the remaining space in the container will be distributed equally to all children. If one of the children has a value of 2, that child would take up twice as much of the available space as the others.

### Flex Shrink

The \`flex-shrink\` property defines the ability for a flex item to shrink if necessary:

\`\`\`css
.item {
  flex-shrink: 1; /* default is 1 */
}
\`\`\`

If set to 0, the item will not shrink. Higher values mean the item will shrink more compared to other items.

### Flex Basis

The \`flex-basis\` property defines the default size of an element before the remaining space is distributed:

\`\`\`css
.item {
  flex-basis: 200px; /* default is auto */
}
\`\`\`

It can be a length (e.g., 20%, 5rem, etc.) or a keyword like \`auto\` or \`content\`.

### Flex Shorthand

The \`flex\` property is a shorthand for \`flex-grow\`, \`flex-shrink\`, and \`flex-basis\` combined:

\`\`\`css
.item {
  flex: 1 1 auto; /* grow shrink basis */
}
\`\`\`

Common values:
- \`flex: 1\` - equivalent to \`flex: 1 1 0%\` (can grow and shrink, with 0 initial size)
- \`flex: auto\` - equivalent to \`flex: 1 1 auto\` (can grow and shrink, with size based on content)
- \`flex: none\` - equivalent to \`flex: 0 0 auto\` (cannot grow or shrink)

### Align Self

The \`align-self\` property allows the default alignment (set by the container's \`align-items\` property) to be overridden for individual flex items:

\`\`\`css
.item {
  align-self: flex-end;
}
\`\`\`

It accepts the same values as \`align-items\`: \`flex-start\`, \`flex-end\`, \`center\`, \`baseline\`, and \`stretch\`.

## Exercise: Creating a Complete Flexbox Layout

In this exercise, you'll create a complete layout using Flexbox. The HTML contains a navigation bar, a main content area with cards, and a sidebar. Your task is to:

1. Make the navigation bar a flex container with items aligned and spaced properly
2. Create a flexible layout for the main content and sidebar
3. Style the cards as a flex container to align their content
4. Use flex properties to control how items grow and shrink

Use the editor to write your CSS code, then click the "Run" button to see the result.
`,
  exercise: {
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>Flexbox Exercise</title>
</head>
<body>
  <header>
    <nav class="navbar">
      <div class="logo">FlexBox Demo</div>
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>

  <div class="container">
    <main class="content">
      <h1>Learning Flexbox</h1>

      <div class="cards">
        <div class="card">
          <h3>Flex Container</h3>
          <p>The parent element that has display: flex applied to it.</p>
          <button>Learn More</button>
        </div>

        <div class="card">
          <h3>Flex Items</h3>
          <p>The direct children of a flex container.</p>
          <button>Learn More</button>
        </div>

        <div class="card">
          <h3>Main Axis</h3>
          <p>The primary axis along which flex items are laid out.</p>
          <button>Learn More</button>
        </div>
      </div>
    </main>

    <aside class="sidebar">
      <h2>Resources</h2>
      <ul>
        <li><a href="#">Flexbox Guide</a></li>
        <li><a href="#">CSS Tricks</a></li>
        <li><a href="#">MDN Documentation</a></li>
      </ul>

      <div class="info-box">
        <p>Flexbox makes it easier to design flexible responsive layouts.</p>
      </div>
    </aside>
  </div>

  <footer>
    <p>&copy; 2025 Flexbox Tutorial</p>
  </footer>
</body>
</html>`,
      'styles.css': `/* Add your flexbox styles here */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  color: #333;
}

/* Add your flexbox properties below */

`
    },
    solution: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>Flexbox Exercise</title>
</head>
<body>
  <header>
    <nav class="navbar">
      <div class="logo">FlexBox Demo</div>
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>

  <div class="container">
    <main class="content">
      <h1>Learning Flexbox</h1>

      <div class="cards">
        <div class="card">
          <h3>Flex Container</h3>
          <p>The parent element that has display: flex applied to it.</p>
          <button>Learn More</button>
        </div>

        <div class="card">
          <h3>Flex Items</h3>
          <p>The direct children of a flex container.</p>
          <button>Learn More</button>
        </div>

        <div class="card">
          <h3>Main Axis</h3>
          <p>The primary axis along which flex items are laid out.</p>
          <button>Learn More</button>
        </div>
      </div>
    </main>

    <aside class="sidebar">
      <h2>Resources</h2>
      <ul>
        <li><a href="#">Flexbox Guide</a></li>
        <li><a href="#">CSS Tricks</a></li>
        <li><a href="#">MDN Documentation</a></li>
      </ul>

      <div class="info-box">
        <p>Flexbox makes it easier to design flexible responsive layouts.</p>
      </div>
    </aside>
  </div>

  <footer>
    <p>&copy; 2025 Flexbox Tutorial</p>
  </footer>
</body>
</html>`,
      'styles.css': `/* Base styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  color: #333;
}

/* Navbar styles with flexbox */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
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

/* Main container with flexbox */
.container {
  display: flex;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.content {
  flex: 3;
  margin-right: 2rem;
}

.sidebar {
  flex: 1;
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 5px;
}

/* Cards with flexbox */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2rem;
}

.card {
  display: flex;
  flex-direction: column;
  flex: 1 1 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin-top: 0;
  color: #2c3e50;
}

.card p {
  flex-grow: 1;
}

.card button {
  align-self: flex-start;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  cursor: pointer;
}

.card button:hover {
  background-color: #2980b9;
}

/* Sidebar styles */
.sidebar h2 {
  margin-top: 0;
  color: #2c3e50;
}

.sidebar ul {
  padding-left: 1.5rem;
}

.sidebar li {
  margin-bottom: 0.5rem;
}

.sidebar a {
  color: #3498db;
  text-decoration: none;
}

.sidebar a:hover {
  text-decoration: underline;
}

.info-box {
  background-color: #e8f4fc;
  border-left: 4px solid #3498db;
  padding: 1rem;
  margin-top: 2rem;
}

/* Footer styles */
footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: 2rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .content {
    margin-right: 0;
    margin-bottom: 2rem;
  }

  .navbar {
    flex-direction: column;
    padding: 1rem;
  }

  .nav-links {
    margin-top: 1rem;
  }

  .nav-links li {
    margin-left: 1rem;
    margin-right: 1rem;
  }
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
            const hasJustifyContent = /justify-content/i.test(cssContent);
            const hasAlignItems = /align-items/i.test(cssContent);
            const hasFlexDirection = /flex-direction/i.test(cssContent);
            const hasFlexProperty = /flex\s*:/i.test(cssContent);

            return new TestResult({
              passed: hasDisplayFlex && (hasJustifyContent || hasAlignItems || hasFlexDirection || hasFlexProperty),
              messages: () => [
                !hasDisplayFlex ? "You should use 'display: flex' to create at least one flex container" : null,
                !(hasJustifyContent || hasAlignItems || hasFlexDirection || hasFlexProperty) ?
                  "You should use at least one of these flexbox properties: justify-content, align-items, flex-direction, or the flex shorthand" : null
              ].filter(Boolean)
            });
          } catch (error) {
            return new TestResult({
              passed: false,
              messages: () => ["Error parsing CSS: " + error.message]
            });
          }
        },
        message: "Make sure your CSS uses flexbox properties to create the layout. At minimum, use 'display: flex' and at least one other flexbox property like justify-content, align-items, flex-direction, or the flex shorthand."
      }
    ]
  }
};