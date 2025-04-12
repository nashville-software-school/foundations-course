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

### Semantic HTML Elements

Semantic elements clearly describe their meaning to both the browser and the developer. Here are some important semantic elements:

#### Headers (h1-h6)

Headers define headings with different levels of importance:

\`\`\`html
<h1>Main Heading (Most Important)</h1>
<h2>Subheading</h2>
<h3>Sub-subheading</h3>
<h4>Sub-sub-subheading</h4>
<h5>Sub-sub-sub-subheading</h5>
<h6>Least Important Heading</h6>
\`\`\`

#### Articles

The article element represents a self-contained composition that could be distributed independently:

\`\`\`html
<article>
  <h2>Article Title</h2>
  <p>This is content within an article. Articles are meant to be independent, self-contained content that could stand alone.</p>
</article>
\`\`\`

#### Sections

The section element represents a standalone section of content:

\`\`\`html
<section>
  <h2>Section Heading</h2>
  <p>This is content within a section. Sections group related content together.</p>
</section>
\`\`\`

#### Paragraphs

Paragraphs are used to group related text content:

\`\`\`html
<p>This is a paragraph of text. Paragraphs are block-level elements that typically have space above and below them.</p>
<p>This is another paragraph. Notice how it starts on a new line.</p>
\`\`\`

#### Ordered Lists

Ordered lists create numbered lists of items:

\`\`\`html
<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>
\`\`\`

### Combining Semantic Elements

Semantic elements can be nested to create structured content:

\`\`\`html
<article>
  <h1>My Blog Post</h1>

  <section>
    <h2>Introduction</h2>
    <p>This is the introduction to my blog post.</p>
  </section>

  <section>
    <h2>Main Points</h2>
    <ol>
      <li>First important point</li>
      <li>Second important point</li>
      <li>Third important point</li>
    </ol>
  </section>
</article>
\`\`\`

## Exercise: Creating a Structured HTML Page

In this exercise, you'll create an HTML page using semantic elements to structure your content. You'll practice using headers, articles, sections, paragraphs, and ordered lists.

Create a page with the following elements, in the following order:
<ul>
  <li>An h1 element with the text "How I Became A Software Developer"</li>
  <li>An article element that contains:</li>
  <ul>
    <li>An h2 with the text "Nashville Software School"</li>
    <li>A section that contains any text you want about attending NSS</li>
    <li>Another section that contains:</li>
    <ul>
      <li>A paragraph with the text "I learned the following skills"</li>
      <li>An ordered list with the following items</li>
      <ul>
        <li>Variables</li>
        <li>Arrays</li>
        <li>Objects</li>
        <li>Functions</li>
        <li>HTML</li>
        <li>CSS</li>
      </ul>
    </ul>
  </ul>
</ul>

`,
  exercise: {
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>My Developer Journey</title>
</head>
<body>
      <!-- Your content goes here -->

</body>
</html>`,
      'styles.css': `/* Add your styles here */

`
    },
    solution: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>My Developer Journey</title>
</head>
<body>
  <h1>How I Became A Software Developer</h1>

  <article>
    <h2>Nashville Software School</h2>

    <section>
      <p>My journey into software development began when I enrolled at Nashville Software School. The instructors were amazing and the curriculum was challenging but rewarding.</p>
    </section>

    <section>
      <p>I learned the following skills</p>
      <ol>
        <li>Variables</li>
        <li>Arrays</li>
        <li>Objects</li>
        <li>Functions</li>
        <li>HTML</li>
        <li>CSS</li>
      </ol>
    </section>
  </article>
</body>
</html>`,
      'styles.css': `/* Basic styles */
body {
  font-family: Arial, sans-serif;
  margin: 20px;
  line-height: 1.6;
}

h1 {
  color: #2c3e50;
}

h2 {
  color: #3498db;
}

article {
  border: 1px solid #e0e0e0;
  padding: 15px;
  border-radius: 5px;
}

section {
  margin: 15px 0;
}

ol {
  color: #34495e;
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

            // Check for h1 with correct text
            const h1 = doc.querySelector('h1');
            const hasCorrectH1 = h1 !== null && h1.textContent === "How I Became A Software Developer";

            // Check for article
            const article = doc.querySelector('article');
            const hasArticle = article !== null;

            // Check for h2 inside article with correct text
            const h2 = article?.querySelector('h2');
            const hasCorrectH2 = h2 !== null && h2.textContent === "Nashville Software School";

            // Check for sections inside article
            const sections = article?.querySelectorAll('section');
            const hasTwoSections = sections !== null && sections.length >= 2;

            // Check for paragraph in the second section
            const sectionParagraph = sections?.[1]?.querySelector('p');
            const hasCorrectParagraph = sectionParagraph !== null && sectionParagraph.textContent === "I learned the following skills";

            // Check for ordered list in the second section
            const ol = sections?.[1]?.querySelector('ol');
            const hasOrderedList = ol !== null;

            // Check list items
            const listItems = ol?.querySelectorAll('li');
            const requiredItems = ["Variables", "Arrays", "Objects", "Functions", "HTML", "CSS"];
            const hasAllItems = listItems !== null &&
              listItems.length === requiredItems.length &&
              [...listItems].every((li, index) =>
                li.textContent.includes(requiredItems[index]));


            const result = new TestResult({
              passed: hasCorrectH1 && hasArticle && hasCorrectH2 && hasTwoSections && hasCorrectParagraph && hasOrderedList && hasAllItems
            })
            result.addMessage(!hasCorrectH1 ? "Your page should include an h1 with the text 'How I Became A Software Developer'" : null)
            result.addMessage(!hasArticle ? "Your page should include an article element" : null)
            result.addMessage(!hasCorrectH2 ? "Your article should include an h2 with the text 'Nashville Software School'" : null)
            result.addMessage(!hasTwoSections ? "Your article should include at least two section elements" : null)
            result.addMessage(!hasCorrectParagraph ? "Your second section should include a paragraph (p)" : null)
            result.addMessage(!hasOrderedList ? "Your second section should include an ordered list (ol)" : null)
            result.addMessage(!hasAllItems ? "Your ordered list should include the items: Variables, Arrays, Objects, Functions, HTML, and CSS" : null)
            return result;
          } catch (error) {
            return new TestResult({
              passed: false,
              messages: () => ["Error parsing HTML: " + error.message]
            });
          }
        },
        message: "You are missing all required items"
      }
    ]
  }
};