export const objectsLibrariesChapter = {
    id: 'objects-libraries',
    title: 'Libraries and Books',
    path: '/objects-libraries',
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

// Assign the author's last name to this variable
const bookAuthor =

// Assign the librarian's last name to this variable
const checkedInBy =


console.log(\`Book Author: \${bookAuthor}\`)
console.log(\`Checked In By: \${checkedInBy}\`)

`,
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

// Assign the author's last name to this variable
const bookAuthor = book.author.lastName

// Assign the librarian's last name to this variable
const checkedInBy = book.checkedIn.librarian.lastName


console.log(\`Book Author: \${bookAuthor}\`)
console.log(\`Checked In By: \${checkedInBy}\`)
`,
        tests: [
            {
                name: "bookAuthor Variable Has Correct Value",
                test: (code) => {
                    try {
                        // Create a function that executes the student's code and returns the bookAuthor variable
                        const evalFunction = new Function(code + '; return bookAuthor;');
                        const result = evalFunction();

                        // Check if the result matches the expected author last name
                        return result === "Thompson";
                    } catch (error) {
                        // If there's an error in execution, the test fails
                        return false;
                    }
                },
                message: "Make sure you've correctly assigned the author's last name 'Thompson' to the bookAuthor variable."
            },
            {
                name: "checkedInBy Variable Has Correct Value",
                test: (code) => {
                    try {
                        // Create a function that executes the student's code and returns the checkedInBy variable
                        const evalFunction = new Function(code + '; return checkedInBy;');
                        const result = evalFunction();

                        // Check if the result matches the expected librarian last name
                        return result === "Wilson";
                    } catch (error) {
                        // If there's an error in execution, the test fails
                        return false;
                    }
                },
                message: "Make sure you've correctly assigned the librarian's last name 'Wilson' to the checkedInBy variable."
            },
            {
                name: "Using Proper Dot Notation for Author",
                test: (code) => {
                    // Check if they're using proper dot notation to access the author's last name
                    return code.includes('book.author.lastName');
                },
                message: "Make sure you're using dot notation (book.author.lastName) to access the author's last name property."
            },
            {
                name: "Using Proper Dot Notation for Librarian",
                test: (code) => {
                    // Check if they're using proper dot notation to access the librarian's last name
                    return code.includes('book.checkedIn.librarian.lastName');
                },
                message: "Make sure you're using dot notation (book.checkedIn.librarian.lastName) to access the librarian's last name property."
            }
        ]
    }
}