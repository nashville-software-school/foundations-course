import { TestResult } from "../../utils/test_utils";

export const htmlElementsChapter = {
  id: 'html-elements',
  title: 'HTML Elements',
  sectionId: 'html-css',
  previousChapterId: 'html-intro',
  nextChapterId: 'css-basics',
  content: `## HTML Elements

In this chapter, we'll explore more HTML elements that you can use to structure your web pages.

### Semantic HTML Elements

Semantic elements clearly describe their meaning to both the browser and the developer. Using semantic HTML makes your code more readable and helps with accessibility and SEO.

Some common semantic elements include:

- \`<header>\`: Represents introductory content or a set of navigational links
- \`<nav>\`: Defines a section of navigation links
- \`<main>\`: Specifies the main content of a document
- \`<section>\`: Defines a section in a document
- \`<article>\`: Specifies independent, self-contained content
- \`<aside>\`: Defines content aside from the main content (like a sidebar)
- \`<footer>\`: Represents a footer for a document or section

### Lists

HTML provides three types of lists:

1. **Unordered Lists** (\`<ul>\`): Lists where the order doesn't matter
   \`\`\`html
   <ul>
     <li>Item 1</li>
     <li>Item 2</li>
     <li>Item 3</li>
   </ul>
   \`\`\`

2. **Ordered Lists** (\`<ol>\`): Lists where the order matters
   \`\`\`html
   <ol>
     <li>First step</li>
     <li>Second step</li>
     <li>Third step</li>
   </ol>
   \`\`\`

3. **Description Lists** (\`<dl>\`): Lists of terms and their descriptions
   \`\`\`html
   <dl>
     <dt>HTML</dt>
     <dd>HyperText Markup Language</dd>
     <dt>CSS</dt>
     <dd>Cascading Style Sheets</dd>
   </dl>
   \`\`\`

### Images and Media

To add images to your page, use the \`<img>\` tag:

\`\`\`html
<img src="image.jpg" alt="Description of the image">
\`\`\`

The \`alt\` attribute provides alternative text for screen readers and is displayed if the image cannot be loaded.

### Links

Links are created using the \`<a>\` (anchor) element:

\`\`\`html
<a href="https://example.com">Visit Example.com</a>
\`\`\`

You can also link to sections within the same page:

\`\`\`html
<a href="#section-id">Jump to Section</a>
\`\`\`

### Tables

Tables are used to display data in rows and columns:

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>25</td>
      <td>USA</td>
    </tr>
    <tr>
      <td>Emma</td>
      <td>28</td>
      <td>Canada</td>
    </tr>
  </tbody>
</table>
\`\`\`

## Exercise: Building a Profile Page

In this exercise, you'll create a simple profile page using various HTML elements. Your page should include:

1. A header with your name
2. A section about you with a paragraph
3. A list of your skills
4. A table with your education or work experience

Use the editor to write your HTML code, then click the "Run" button to see the result.
`,
  exercise: {
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>My Profile</title>
</head>
<body>
  <!-- Create your profile page here -->

</body>
</html>`,
      'styles.css': `/* Add your styles here */

`
    },
    solution: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>My Profile</title>
</head>
<body>
  <header>
    <h1>John Doe</h1>
    <p>Web Developer</p>
  </header>

  <section>
    <h2>About Me</h2>
    <p>I am a passionate web developer with experience in HTML, CSS, and JavaScript. I enjoy creating responsive and user-friendly websites.</p>
  </section>

  <section>
    <h2>My Skills</h2>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
      <li>Responsive Design</li>
      <li>UI/UX Basics</li>
    </ul>
  </section>

  <section>
    <h2>Education</h2>
    <table>
      <thead>
        <tr>
          <th>Degree</th>
          <th>Institution</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bachelor of Science in Computer Science</td>
          <td>University of Technology</td>
          <td>2020</td>
        </tr>
        <tr>
          <td>Web Development Bootcamp</td>
          <td>Code Academy</td>
          <td>2021</td>
        </tr>
      </tbody>
    </table>
  </section>

  <footer>
    <p>Contact me at: john.doe@example.com</p>
  </footer>
</body>
</html>`,
      'styles.css': `/* Basic styles */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 20px;
  color: #333;
}

header {
  background-color: #f4f4f4;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
}

h1, h2 {
  color: #2c3e50;
}

section {
  margin-bottom: 30px;
}

ul {
  list-style-type: square;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

footer {
  text-align: center;
  padding: 10px;
  background-color: #f4f4f4;
  margin-top: 20px;
}
`
    },
    tests: [
      {
        name: "HTML Structure",
        test: (files) => {
          try {
            const htmlContent = files['index.html'];
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');

            const hasHeader = doc.querySelector('header') !== null;
            const hasH1 = doc.querySelector('h1') !== null;
            const hasSection = doc.querySelector('section') !== null;
            const hasParagraph = doc.querySelector('p') !== null;
            const hasList = doc.querySelector('ul') !== null || doc.querySelector('ol') !== null;
            const hasListItems = doc.querySelectorAll('li').length >= 3;
            const hasTable = doc.querySelector('table') !== null;
            const hasTableRows = doc.querySelectorAll('tr').length >= 2;

            return new TestResult({
              passed: hasHeader && hasH1 && hasSection && hasParagraph && hasList && hasListItems && hasTable && hasTableRows,
              messages: () => [
                !hasHeader ? "Your page should include a header element" : null,
                !hasH1 ? "Your page should include an h1 heading" : null,
                !hasSection ? "Your page should include at least one section element" : null,
                !hasParagraph ? "Your page should include at least one paragraph" : null,
                !hasList ? "Your page should include a list (ul or ol)" : null,
                !hasListItems ? "Your list should have at least 3 items" : null,
                !hasTable ? "Your page should include a table" : null,
                !hasTableRows ? "Your table should have at least 2 rows" : null
              ].filter(Boolean)
            });
          } catch (error) {
            return new TestResult({
              passed: false,
              messages: () => ["Error parsing HTML: " + error.message]
            });
          }
        },
        message: "Make sure your profile page includes a header with an h1, sections with paragraphs, a list with at least 3 items, and a table with at least 2 rows."
      }
    ]
  }
};