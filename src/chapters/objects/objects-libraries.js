import { TestResult } from "../../utils/test_utils";

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

The starter code contains a book object that has properties for the book's ISBN, title, author, and checked-in status. The author property is an object itself, containing the author's first and last name. The checked-in property is also an object, containing the date and librarian information.

Your task is to access the author's last name and the librarian's last name using dot notation. The variables \`bookAuthor\` and \`checkedInBy\` are already declared for you, but they are not assigned any values yet.

`,
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
                        const evalFunction = new Function(code + '\n return bookAuthor;');
                        const result = evalFunction();

                        // Check if the result matches the expected author last name
                        return new TestResult({passed:result === "Thompson"});
                    } catch (error) {
                        // If there's an error in execution, the test fails
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Make sure you've correctly assigned the author's last name 'Thompson' to the bookAuthor variable."
            },
            {
                name: "checkedInBy Variable Has Correct Value",
                test: (code) => {
                    try {
                        // Create a function that executes the student's code and returns the checkedInBy variable
                        const evalFunction = new Function(code + ';\n return checkedInBy;');
                        const result = evalFunction();

                        // Check if the result matches the expected librarian last name
                        return new TestResult({ passed:result === "Wilson"})
                    } catch (error) {
                        // If there's an error in execution, the test fails
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Make sure you've correctly assigned the librarian's last name 'Wilson' to the checkedInBy variable."
            },
            {
                name: "Using Proper Dot Notation for Author",
                test: (code) => {
                    // Check if they're using proper dot notation to access the author's last name
                    return new TestResult({passed:code.includes('book.author.lastName')});
                },
                message: "Make sure you're using dot notation (book.author.lastName) to access the author's last name property."
            },
            {
                name: "Using Proper Dot Notation for Librarian",
                test: (code) => {
                    // Check if they're using proper dot notation to access the librarian's last name
                    return new TestResult({passed:code.includes('book.checkedIn.librarian.lastName')});
                },
                message: "Make sure you're using dot notation (book.checkedIn.librarian.lastName) to access the librarian's last name property."
            }
        ]
    }
}