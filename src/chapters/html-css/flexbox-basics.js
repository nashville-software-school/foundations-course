import { TestResult } from "../../utils/test_utils";

export const flexboxBasicsChapter = {
  id: 'flexbox-basics',
  title: 'Flexbox Basics',
  sectionId: 'html-css',
  previousChapterId: 'css-selectors',
  nextChapterId: null,
  content: `## Flexbox Basics

Flexbox (Flexible Box Layout) is a one-dimensional layout method designed for laying out items in rows or columns. It makes it easier to design flexible responsive layouts without using float or positioning.

### The Flex Container

To create a flex container, set the \`display\` property to \`flex\` or \`inline-flex\`:

\`\`\`css
.container {
  display: flex;
}
\`\`\`

### Flex Container Properties

1. **flex-direction**: Defines the direction of the flex items
   - \`row\` (default): left to right
   - \`row-reverse\`: right to left
   - \`column\`: top to bottom
   - \`column-reverse\`: bottom to top

   \`\`\`css
   .container {
     display: flex;
     flex-direction: row;
   }
   \`\`\`

2. **flex-wrap**: Specifies whether flex items should wrap or not
   - \`nowrap\` (default): all items in one line
   - \`wrap\`: items wrap onto multiple lines
   - \`wrap-reverse\`: items wrap onto multiple lines in reverse

   \`\`\`css
   .container {
     display: flex;
     flex-wrap: wrap;
   }
   \`\`\`

3. **justify-content**: Aligns flex items along the main axis
   - \`flex-start\` (default): items are packed toward the start
   - \`flex-end\`: items are packed toward the end
   - \`center\`: items are centered
   - \`space-between\`: items are evenly distributed with the first item at the start and the last item at the end
   - \`space-around\`: items are evenly distributed with equal space around them
   - \`space-evenly\`: items are evenly distributed with equal space between them

   \`\`\`css
   .container {
     display: flex;
     justify-content: center;
   }
   \`\`\`

4. **align-items**: Aligns flex items along the cross axis
   - \`stretch\` (default): items are stretched to fit the container
   - \`flex-start\`: items are placed at the start of the cross axis
   - \`flex-end\`: items are placed at the end of the cross axis
   - \`center\`: items are centered
   - \`baseline\`: items are aligned by their baselines

   \`\`\`css
   .container {
     display: flex;
     align-items: center;
   }
   \`\`\`

5. **align-content**: Aligns flex lines within the flex container when there is extra space in the cross axis
   - \`stretch\` (default): lines stretch to take up the remaining space
   - \`flex-start\`: lines packed to the start of the container
   - \`flex-end\`: lines packed to the end of the container
   - \`center\`: lines packed to the center of the container
   - \`space-between\`: lines evenly distributed with the first line at the start and the last line at the end
   - \`space-around\`: lines evenly distributed with equal space around each line

   \`\`\`css
   .container {
     display: flex;
     flex-wrap: wrap;
     align-content: space-between;
   }
   \`\`\`

### Flex Item Properties

1. **order**: Controls the order in which the item appears in the flex container
   \`\`\`css
   .item {
     order: 2; /* default is 0 */
   }
   \`\`\`

2. **flex-grow**: Defines the ability for a flex item to grow if necessary
   \`\`\`css
   .item {
     flex-grow: 1; /* default is 0 */
   }
   \`\`\`

3. **flex-shrink**: Defines the ability for a flex item to shrink if necessary
   \`\`\`css
   .item {
     flex-shrink: 1; /* default is 1 */
   }
   \`\`\`

4. **flex-basis**: Defines the default size of an element before the remaining space is distributed
   \`\`\`css
   .item {
     flex-basis: 200px; /* default is auto */
   }
   \`\`\`

5. **flex**: Shorthand for flex-grow, flex-shrink, and flex-basis
   \`\`\`css
   .item {
     flex: 1 1 auto; /* grow shrink basis */
   }
   \`\`\`

6. **align-self**: Allows the default alignment to be overridden for individual flex items
   \`\`\`css
   .item {
     align-self: flex-end;
   }
   \`\`\`

## Exercise: Creating a Flexbox Layout

In this exercise, you'll create a simple layout using Flexbox. The HTML contains a navigation bar, a main content area with cards, and a sidebar. Your task is to:

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