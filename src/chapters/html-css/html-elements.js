import { TestResult } from "@nss-workshops/nss-core";

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

- \`<div>\`: A generic container for flow content, often used as a layout element
- \`<header>\`: Represents introductory content or a set of navigational links
- \`<nav>\`: Defines a section of navigation links: often a child of the \`<header>\` element
- \`<main>\`: Specifies the main content of a document
- \`<section>\`: Defines a section in a document
- \`<article>\`: Specifies independent, self-contained content
- \`<aside>\`: Defines content aside from the main content (like a sidebar)
- \`<footer>\`: Represents a footer for a document or section

### Example of Semantic HTML Structure

Here's an example of a basic webpage structure using semantic HTML elements:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>Acme, Inc</title>
</head>
<body>
  <header>
    <nav>
      <div>Home</div>
      <div>Products</div>
      <div>Contact</div>
    </nav>
  </header>

  <main>
    <article>
      <h1>Welcome to Acme, Inc</h1>

      <section>
        <p>Acme, Inc is a leading provider of innovative solutions for businesses of all sizes. We specialize in creating cutting-edge products that help our customers succeed.</p>
      </section>

      <section>
        <p>Founded in 2005, our company has grown from a small startup to an industry leader with clients worldwide.</p>
      </section>
    </article>
  </main>

  <footer>
    <p>&copy 2025 Acme, Inc. All rights reserved.</p>
  </footer>
</body>
</html>
\`\`\`

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

## Exercise: Building a Personal Profile Page

In this exercise, you'll create a simple profile page using semantic HTML elements. Your page should include:

1. A header element containing a \`nav\` element
2. The nav element should contain three \`div\` containing the following text:
   - Home
   - Projects
   - Education
3. A \`main\` element that contains a child \`article\`
4. The \`article\` element must include:
   - An \`h1\` heading with your name
   - A \`section\` element with some brief text about your career history
   - Another \`section\` element explaining why you want to be a software developer
5. A footer with your name, the current year, and your email address



`,
  exercise: {
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>My Profile</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Create your profile page here using semantic HTML elements -->
  <!-- Remember to include header with nav, main with article and sections, and a footer -->

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

/* Make navigation links display horizontally */
nav {
  display: flex;
}
nav div {
  margin-right: 20px;
}

/* Add your additional styles here */



`
    },
    solution: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>My Profile</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <div>Home</div>
      <div>Projects</div>
      <div>Education</div>
    </nav>
  </header>

  <main>
    <article>
      <h1>John Doe</h1>

      <section>
        <h2>Career History</h2>
        <p>I have worked in IT for 5 years, starting as a help desk technician and moving into network administration. I've always been fascinated by how software works and have been learning programming in my spare time.</p>
      </section>

      <section>
        <h2>Why I Want to Be a Software Developer</h2>
        <p>I'm passionate about creating solutions that make people's lives easier. Software development allows me to combine my problem-solving skills with my creativity to build useful applications that can have a real impact.</p>
      </section>
    </article>
  </main>

  <footer>
    <p>John Doe &copy 2025 | john.doe@example.com</p>
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

/* Make navigation links display horizontally */
nav {
  display: flex;
}
nav div {
  margin-right: 20px;
}

header {
  background-color: #f4f4f4;
  padding: 20px;
  margin-bottom: 20px;
}

main {
  max-width: 800px;
  margin: 0 auto;
}

h1, h2 {
  color: #2c3e50;
}

section {
  margin-bottom: 30px;
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
        name: "Semantic HTML Structure",
        test: (files) => {
          try {
            const htmlContent = files['index.html']
            const parser = new DOMParser()
            const doc = parser.parseFromString(htmlContent, 'text/html')

            // Check for header with nav
            const header = doc.querySelector('header')
            const nav = header ? header.querySelector('nav') : null
            const navDivs = nav ? nav.querySelectorAll('div') : []
            const hasCorrectNavLinks = Array.from(navDivs).some(div => div.textContent.includes('Home')) &&
                                      Array.from(navDivs).some(div => div.textContent.includes('Projects')) &&
                                      Array.from(navDivs).some(div => div.textContent.includes('Education'))

            // Check for main with article
            const main = doc.querySelector('main')
            const article = main ? main.querySelector('article') : null
            const h1 = article ? article.querySelector('h1') : null

            // Check for sections
            const sections = article ? article.querySelectorAll('section') : []

            // Check for footer
            const footer = doc.querySelector('footer')
            const footerText = footer ? footer.textContent : ''
            const hasNameInFooter = footerText.length > 0
            const hasYearInFooter = /\d{4}/.test(footerText)
            const hasEmailInFooter = /@/.test(footerText)

            const passed = header && nav && navDivs.length >= 3 && hasCorrectNavLinks &&
                     main && article && h1 && sections.length >= 2 &&
                     footer && hasNameInFooter && hasYearInFooter && hasEmailInFooter

            const result = new TestResult({ passed })

            if (!header) result.addMessage("Your page should include a header element")
            if (!nav) result.addMessage("Your header should include a nav element")
            if (navDivs.length < 3) result.addMessage("Your nav should include at least 3 div elements")
            if (!hasCorrectNavLinks) result.addMessage("Your nav should include links for Home, Projects, and Education")
            if (!main) result.addMessage("Your page should include a main element")
            if (!article) result.addMessage("Your main element should include an article element")
            if (!h1) result.addMessage("Your article should include an h1 heading")
            if (sections.length < 2) result.addMessage("Your article should include at least 2 section elements")
            if (!footer) result.addMessage("Your page should include a footer element")
            if (!hasNameInFooter) result.addMessage("Your footer should include your name")
            if (!hasYearInFooter) result.addMessage("Your footer should include the current year")
            if (!hasEmailInFooter) result.addMessage("Your footer should include your email address")

            return result
          } catch (error) {
            const result = new TestResult({ passed: false })
            result.addMessage("Error parsing HTML: " + error.message)
            return result
          }
        },
        message: "Make sure your profile page includes a header with navigation links (Home, Projects, Education), a main section with an article containing your name and two sections (career history and why you want to be a software developer), and a footer with your name, the current year, and your email address."
      }
    ]
  }
}