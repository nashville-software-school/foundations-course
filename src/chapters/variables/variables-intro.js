export const variablesIntroChapter = {
    id: 'variables-intro',
    title: 'Introduction',
    sectionId: 'variables-and-values',
    previousChapterId: null, // First chapter in Variables and Values section
    content: `Software developers work with all kinds of data, produced by all kinds of people and processes. Medical records, food and drink sales, atmospheric condition, transportation patterns... these things all get produced from data.

## Going to the store

For example, imagine you make a trip to the grocery store this weekend. Here's what you buy.

1.  Four oranges
2.  One loaf of bread
3.  Two bags of chips
4.  One gallon of milk
5.  Three cans of tomato sauce

There are two ways to look at that data. First, you can describe the quantity of each thing you bought.

"I bought 4, 1, 2, 1, and 3 at the grocery store"

Of course, people would look at you funny. A better way would be to provide a label for what each of those numbers mean - which is how normal people talk.

"I bought 4 oranges, 1 loaf of bread, 2 bags of chips, 1 gallon of milk, and 3 cans of sauce."

An experienced software developer looks at that sentence very differently than you do. They see it as five, different data points about quantities. Each data point has two parts.

1.  The descriptive label for the quantity
2.  The quantity itself (i.e. the value of the quantity)

The labels are "oranges", "bread", "bags of chips", "milk", "tomato sauce".
The values are 4, 1, 2, 1, 3

## Second trip to the store

Two weeks later, you need to make another trip to the store. However, on this trip, the data is different. You buy the same things, but in different quantities because you know your sister is coming over for the weekend.

1.  Seven oranges
2.  Two loaves of bread
3.  Three bags of chips
4.  One gallon of milk
5.  Six cans of tomato sauce

Again, the labels are still "oranges", "bread", "bags of chips", "milk", "tomato sauce".
This time, though, the values are 7, 2, 3, 1, 6.

Each time you go to the store, the labels will remain the same, but the values attached to those labels varies. This are what developers use variables for. Words that human beings can read and understand (the label) which can be assigned a value.

## Your First Variables

Variables are labels for values that vary over time.

Time to see your first variables in JavaScript to represent the first trip to the store.

\`\`\`js
let oranges = 4
let breadLoaves = 1
let bagsOfChips = 2
let milk = 1
let tomatoSauce = 3
\`\`\`

You use the keyword of \`let\` to "declare a variable". In other words, it tells JavaScript that the word immediately to the right is going to be a variable. Then you type an equal sign, and then finally what value you want to be assigned to the variable.

You can make the variable name ANYTHING YOU WANT. You are the software developer, so you have that power. One thing that confuses many beginners is that they think the variable name matters. It doesn't. JavaScript doesn't care - at all - what your variables are. All it cares about is the values.

However, other developers do care what you name your variables. Imagine how frustrated you would be if instead of using the descriptive names above for the variables, you saw this code instead.

\`\`\`js
let o = 4
let bl = 1
let boc = 2
let m = 1
let ts = 3
\`\`\`

The developer who wrote this code knew that "o" was an abbreviation for "oranges", but you would have no idea that it was. How annoying!

## Camel Case

Speaking of naming variables, it is a convention in the JavaScript developer community to name variables with camel case. This means that the variable starts with a lower-case letter, but each additional word in the variable name should start with a capital letter.

Bad variable naming
\`\`\`js
let bagofdonuts = 2
\`\`\`
Good variable naming
\`\`\`js
let bagOfDonuts = 2
\`\`\`
Good variable naming because it is a single word
\`\`\`js
let cucumbers = 3
\`\`\`
Bad variable naming
\`\`\`js
let icecream = 1
\`\`\`
Good variable naming
\`\`\`js
let iceCream = 1
\`\`\`

## Exercise: Electric Bill Calculator

Now it is time for you to write your own code. Imagine that you want to determine what your electric bill costs are for an entire year. You gather all twelve electric bills in front of you and want to add them together.

Create variables for each month's electric bill and calculate the yearly total.
`,
    exercise: {
        starterCode: `// January's electric bill
let januaryBill = 145

// Create variables for the remaining months.
// Give them any value you want.



// Then calculate the total yearly charges by
// declaring a constant variable named "yearlyTotal"
// that is the sum of all twelve months.


console.log(yearlyTotal)
`,
        solution: `// Monthly electric bills
let januaryBill = 145
let februaryBill = 155
let marchBill = 132
let aprilBill = 98
let mayBill = 87
let juneBill = 203
let julyBill = 187
let augustBill = 198
let septemberBill = 143
let octoberBill = 112
let novemberBill = 128
let decemberBill = 159

const yearlyTotal = januaryBill + februaryBill + marchBill +
                    aprilBill + mayBill + juneBill +
                    julyBill + augustBill + septemberBill +
                    octoberBill + novemberBill + decemberBill

console.log(yearlyTotal)`,
        tests: [
            {
                name: "Variable Declaration",
                test: (code) => {

                    try {
                        const func = new Function(code + '; return yearlyTotal;')
                        const result = func()
                        if (result > 0 &&
                            code.includes('let februaryBill') &&
                            code.includes('let marchBill') &&
                            code.includes('let aprilBill') &&
                            code.includes('let mayBill') &&
                            code.includes('let juneBill') &&
                            code.includes('let julyBill') &&
                            code.includes('let augustBill') &&
                            code.includes('let septemberBill') &&
                            code.includes('let octoberBill') &&
                            code.includes('let novemberBill') &&
                            code.includes('let decemberBill')) {
                            return true
                        }

                    } catch (error) {
                        return false
                    }

                },
                message: `Make sure to declare variables for all twelve months
                - Make sure to use the correct variable names (e.g. octoberBill, novemberBill)
                - Make sure to use the \`let\` keyword for each month variable
                - Make sure you use \`const\` for the yearlyTotal variable`
            },
            {
                name: "Total Calculation",
                test: (code) => {
                    try {
                        const {januaryBill, februaryBill, marchBill, aprilBill, mayBill, juneBill, julyBill, augustBill, septemberBill, octoberBill, novemberBill, decemberBill, yearlyTotal} = new Function(code + '; return {januaryBill, februaryBill, marchBill, aprilBill, mayBill, juneBill, julyBill, augustBill, septemberBill, octoberBill, novemberBill, decemberBill, yearlyTotal}')()
                        return yearlyTotal === januaryBill + februaryBill + marchBill + aprilBill + mayBill + juneBill + julyBill + augustBill + septemberBill + octoberBill + novemberBill + decemberBill

                    }
                    catch (error) {
                        return false
                    }
                },
                message: "Make sure you add up all the months to get the yearly total"
            }
        ]
    }
}