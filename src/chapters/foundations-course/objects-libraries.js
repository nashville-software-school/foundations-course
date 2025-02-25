export const objectsLibrariesChapter = {
  id: 'objects-libraries',
  title: 'Libraries and Books',
  path: '/foundations-course/objects-libraries',
  sectionId: 'objects',
  previousChapterId: 'objects-complex',
  nextChapterId: null,
  content: `## Libraries and Books

In this exercise, you are going to practice accessing properties on nested objects again. Remember that for each nested object, you need to use the dot \`.\` character to access it.

\`\`\`js
const flower = {
    color: "Yellow",
    species: {
        name: "Tulip",
        rare: false,
        idealCondition: {
            shade: false,
            dailyWater: true,
            clay: false,
            soil: true
        }
    },
    price: 1.29,
    arrangements: ["Birthday", "Mother's Day"]
}
\`\`\`

If you want to check if the ideal condition for a flower includes growing it in clay, you would write the following code.

\`\`\`js
console.log(flower.species.idealCondition.clay)

> false
\`\`\`

## Practice: Librarian and Book Author

The starter code has two functions. The \`bookAuthor()\` function should return the last name of the author of a book. The \`checkedInBy()\` function should return the last name of the librarian that checked the book in.

All you need to do is write the proper code after each \`return\` keyword to access the correct key on the objects.`,
  exercise: {
    starterCode: `const book = {
    isbn: "0192837465",
    title: "Dreamland Chronicles",
    author: {
        firstName: "Sarah",
        lastName: "Thompson",
        awards: ["Hugo Award", "Nebula Award"]
    },
    checkedIn: {
        date: "2024-02-21",
        librarian: {
            firstName: "Marcus",
            lastName: "Wilson",
            branch: "Main"
        }
    }
}

const bookAuthor = () => {
    return // Add your code here to return the author's last name
}

const checkedInBy = () => {
    return // Add your code here to return the librarian's last name
}`,
    solution: `const book = {
    isbn: "0192837465",
    title: "Dreamland Chronicles",
    author: {
        firstName: "Sarah",
        lastName: "Thompson",
        awards: ["Hugo Award", "Nebula Award"]
    },
    checkedIn: {
        date: "2024-02-21",
        librarian: {
            firstName: "Marcus",
            lastName: "Wilson",
            branch: "Main"
        }
    }
}

const bookAuthor = () => {
    return book.author.lastName
}

const checkedInBy = () => {
    return book.checkedIn.librarian.lastName
}`,
    tests: [
      {
        name: "Book Author Access",
        test: (code) => code.includes('book.author.lastName'),
        message: "Make sure you're using dot notation to access the author's last name"
      },
      {
        name: "Librarian Access",
        test: (code) => code.includes('book.checkedIn.librarian.lastName'),
        message: "Make sure you're using dot notation to access the librarian's last name"
      }
    ]
  }
}