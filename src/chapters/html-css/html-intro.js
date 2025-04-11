import { TestResult } from "../../utils/test_utils";

export const htmlIntroChapter = {
  id: 'html-intro',
  title: 'Introduction to HTML',
  sectionId: 'html-css',
  previousChapterId: null,
  nextChapterId: 'html-elements',
  content: `## Introduction to HTML

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page and consists of a series of elements that tell the browser how to display the content.

### What are HTML Elements?

HTML elements are represented by tags, written using angle brackets. Most HTML elements have an opening tag and a closing tag, with content in between.

\`\`\`html
<tagname>Content goes here...</tagname>
\`\`\`

For example, a paragraph is written as:

\`\`\`html
<p>This is a paragraph.</p>
\`\`\`

### Basic Structure of an HTML Document

Every HTML document follows a basic structure:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>
  <h1>My First Heading</h1>
  <p>My first paragraph.</p>
</body>
</html>
\`\`\`

Let's break down this structure:

- \`<!DOCTYPE html>\`: Declares the document type and version of HTML
- \`<html>\`: The root element of an HTML page
- \`<head>\`: Contains meta-information about the document
- \`<title>\`: Specifies a title for the document (shown in the browser tab)
- \`<body>\`: Contains the visible page content

### Common HTML Elements

Here are some common HTML elements you'll use frequently:

- Headings: \`<h1>\` to \`<h6>\` (from largest to smallest)
- Paragraphs: \`<p>\`
- Links: \`<a href="url">link text</a>\`
- Images: \`<img src="image.jpg" alt="description">\`
- Lists:
  - Unordered lists: \`<ul>\` with \`<li>\` items
  - Ordered lists: \`<ol>\` with \`<li>\` items

## Exercise: Your First HTML Page

In this exercise, you'll create a simple HTML page with a heading, a paragraph, and a link. Use the editor to write your HTML code, then click the "Run" button to see the result.
`,
  exercise: {
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Page</title>
</head>
<body>
  <!-- Add your content here -->

</body>
</html>`,
      'styles.css': `/* Add your styles here */

`
    },
    solution: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Page</title>
</head>
<body>
  <h1>Welcome to My First HTML Page</h1>
  <p>This is a paragraph on my web page.</p>
  <a href="https://www.example.com">Visit Example.com</a>
</body>
</html>`,
      'styles.css': `/* Basic styles */
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h1 {
  color: #2c3e50;
}

p {
  color: #34495e;
}

a {
  color: #3498db;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
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

            const hasH1 = doc.querySelector('h1') !== null;
            const hasP = doc.querySelector('p') !== null;
            const hasA = doc.querySelector('a') !== null;
            const hasHref = doc.querySelector('a')?.hasAttribute('href');

            return new TestResult({
              passed: hasH1 && hasP && hasA && hasHref,
              messages: () => [
                !hasH1 ? "Your page should include an h1 heading element" : null,
                !hasP ? "Your page should include a paragraph element" : null,
                !hasA ? "Your page should include a link (anchor) element" : null,
                hasA && !hasHref ? "Your link should have an href attribute" : null
              ].filter(Boolean)
            });
          } catch (error) {
            return new TestResult({
              passed: false,
              messages: () => ["Error parsing HTML: " + error.message]
            });
          }
        },
        message: "Make sure your HTML includes a heading (h1), a paragraph (p), and a link (a) with an href attribute."
      }
    ]
  }
};