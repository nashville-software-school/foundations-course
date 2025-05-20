import { TestResult } from "../../utils/test_utils";

export const flowerShopId = {
    id: "flower-shop",
    title: "Finding the Flowers",
    sectionId: "assessment",
    previousChapterId: null,
    nextChapterId: null,
    content: `## What You Need to Do

You see the starter code in the editor already has some functionality:

1. Defines an array of flowers, filled with 9 objects.
1. Several functions, in which you will write your code, with the requirements written above each one.

Please do not remove the functions, or rename the functions. They are there for testing purposes. You just need to implement the correct code inside them.

The requirements are also below for convenience sake.

### Step 1: Find Inexpensive Flowers

In the first function named \`inexpensiveFlowers\`, you will write logic that populates the \`filteredFlowers\` array with only those flowers with a price less than 2.00 per flower.

### Step 2: Zoned Flowers

In the next function named \`zoneFlowers\`, you will write logic that populates the \`filteredFlowers\` array with only those flowers that grow in USDA zones 3 and 8.

### Step 3: Orange Flowers

In the next function named \`orangeFlowers\`, you will write logic that populates the \`filteredFlowers\` array with only those flowers that come in the color "Orange". Remember that JavaScript is case-sentitive.

\`\`\`js
"orange" !== "Orange"
\`\`\`

### Step 4: Flower HTML Representations

In the next function named \`flowersAsHTML\`, you will write logic produces one, large string that contains an \`<article>\` for each flower, a \`<section>\` for each flower's colors, and a \`<div>\` for each flower's USDA zones.

## Testing Your Code

When you believe you have code that works, click the "Run Tests" button

### All Tests Pass

If your code works you should see the following output.

\`\`\`sh
✅ Tests Passed!
Great job! All tests passed!
\`\`\`


### Errors in Your Logic or Syntax

If your code does not work, you will see a message that your code failed, with a brief message about why and possibly some helpful tips on how to fix it.
You can debug the code by adding console.log statements and clicking 'Run Code' button.

\`\`\`sh
❌ Some Tests Failed

- The inexpensiveFlowers function did not return an array.Did you modify code that you should not have?
\`\`\`

## Reviewing Your Code

If your code is successful, please review it with a member of the coaching team so that any questions you may have can be answered and a teammate can give your tips on how to deepen your knowledge.

If you cannot make the code work, make sure you do the three projects in this book of the course.

If you have already done all three projects, but still can't figure out how to make the test pass, sit with a member of the coaching team to help strengthen your knowledge and understanding of the concepts and get your code on the right track.`,
    exercise: {
        starterCode: `
const flowers = [
    {
        id: 1,
        type: "Rose",
        colors: ["White", "Red", "Violet", "Pink", "Black", "Yellow"],
        price: 2.59,
        usdaZones: [3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
        id: 2,
        type: "Tulip",
        colors: ["Orange", "White", "Yellow", "Violet", "Red"],
        price: 1.04,
        usdaZones: [5, 6, 7, 8, 9]
    },
    {
        id: 3,
        type: "Daisy",
        colors: ["Gold", "White", "Orange", "Crimson"],
        price: 0.89,
        usdaZones: [3, 4, 5, 6, 7, 8]
    },
    {
        id: 4,
        type: "Carnation",
        colors: ["Peach", "Yellow", "Magenta", "Pink", "Coral"],
        price: 1.59,
        usdaZones: [5, 6, 7, 8, 9]
    },
    {
        id: 5,
        type: "Bird of Paradise",
        colors: ["Orange", "White"],
        price: 2.33,
        usdaZones: [9, 10, 11]
    },
    {
        id: 6,
        type: "Delphinium",
        colors: ["Blue", "Violet", "White", "Pink"],
        price: 1.67,
        usdaZones: [3, 4, 5, 6, 7]
    },
    {
        id: 7,
        type: "Gladiolus",
        colors: ["White", "Cream", "Yellow", "Red", "Pink", "Green", "Lavender", "Voilet"],
        price: 1.85,
        usdaZones: [6, 7, 8, 9, 10]
    },
    {
        id: 8,
        type: "Lilly",
        colors: ["White", "Yellow", "Orange", "Red", "Pink", "Lavender"],
        price: 1.52,
        usdaZones: [3, 4, 5, 6, 7, 8, 9]
    },
    {
        id: 9,
        type: "Chinese Lantern",
        colors: ["Orange"],
        price: 2.33,
        usdaZones: [3, 4, 5, 6, 7, 8, 9]
    }
]

/*
    Below are some functions, in which you will write ALL of your
    code. Do not modify the code that defines the functions, and
    do not write any code outside of the functions.
*/


/*
    This function should return inexpensive flowers - ones that cost
    less than 2.00 per flower.
*/
const inexpensiveFlowers = () => {
    let filteredFlowers = []  // Do not modify


    // Write your algorithm first, and then your code. Feel free to remove this comment



    return filteredFlowers  // Do not modify

}

/*
    This function should return flowers that grow in
    USDA zones of 3 and 8.
*/
const zoneFlowers = () => {
    let filteredFlowers = []  // Do not modify


    // Write your algorithm first, and then your code. Feel free to remove this comment




    return filteredFlowers  // Do not modify
}



/*
    This function should return flowers that come in the color Orange
*/
const orangeFlowers = () => {
    let filteredFlowers = []  // Do not modify



    // Write your algorithm first, and then your code. Feel free to remove this comment




    return filteredFlowers  // Do not modify
}



/*
    This function should return an HTML representation of each flower.

    Expected string format:
        <article>
            <h1>Bird of Paradise</h1>

            <h2>Colors</h2>
            <section>White</section>
            <section>Orange</section>

            <h2>USDA Zones</h2>
            <div>9</div>
            <div>10</div>
            <div>11</div>
        </article>
*/
const flowersAsHTML = () => {
    let flowersHTMLString = ""  // Do not modify


    /*
        Algorithmic thinking is most important on this one.
        We would rather see the correct algorithm than the
        correct code. If you have code that works, but no
        algorithm, then you failed the exercise.
    */
    return flowersHTMLString  // Do not modify
}`,
        solution: `
const flowers = [
    {
        id: 1,
        type: "Rose",
        colors: ["White", "Red", "Violet", "Pink", "Black", "Yellow"],
        price: 2.59,
        usdaZones: [3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
        id: 2,
        type: "Tulip",
        colors: ["Orange", "White", "Yellow", "Violet", "Red"],
        price: 1.04,
        usdaZones: [5, 6, 7, 8, 9]
    },
    {
        id: 3,
        type: "Daisy",
        colors: ["Gold", "White", "Orange", "Crimson"],
        price: 0.89,
        usdaZones: [3, 4, 5, 6, 7, 8]
    },
    {
        id: 4,
        type: "Carnation",
        colors: ["Peach", "Yellow", "Magenta", "Pink", "Coral"],
        price: 1.59,
        usdaZones: [5, 6, 7, 8, 9]
    },
    {
        id: 5,
        type: "Bird of Paradise",
        colors: ["Orange", "White"],
        price: 2.33,
        usdaZones: [9, 10, 11]
    },
    {
        id: 6,
        type: "Delphinium",
        colors: ["Blue", "Violet", "White", "Pink"],
        price: 1.67,
        usdaZones: [3, 4, 5, 6, 7]
    },
    {
        id: 7,
        type: "Gladiolus",
        colors: ["White", "Cream", "Yellow", "Red", "Pink", "Green", "Lavender", "Voilet"],
        price: 1.85,
        usdaZones: [6, 7, 8, 9, 10]
    },
    {
        id: 8,
        type: "Lilly",
        colors: ["White", "Yellow", "Orange", "Red", "Pink", "Lavender"],
        price: 1.52,
        usdaZones: [3, 4, 5, 6, 7, 8, 9]
    },
    {
        id: 9,
        type: "Chinese Lantern",
        colors: ["Orange"],
        price: 2.33,
        usdaZones: [3, 4, 5, 6, 7, 8, 9]
    }
]

/*
    Below are some functions, in which you will write ALL of your
    code. Do not modify the code that defines the functions, and
    do not write any code outside of the functions.
*/


/*
    This function should return inexpensive flowers - ones that cost
    less than 2.00 per flower.
*/
const inexpensiveFlowers = () => {
    let filteredFlowers = []  // Do not modify

    // Filter flowers that cost less than 2.00
    for (const flower of flowers) {
        if (flower.price < 2.00) {
            filteredFlowers.push(flower)
        }
    }

    return filteredFlowers  // Do not modify

}

/*
    This function should return flowers that grow in
    USDA zones of 3 and 8.
*/
const zoneFlowers = () => {
    let filteredFlowers = []  // Do not modify

    // Filter flowers that grow in both USDA zones 3 and 8
    for (const flower of flowers) {
        if (flower.usdaZones.includes(3) && flower.usdaZones.includes(8)) {
            filteredFlowers.push(flower)
        }
    }

    return filteredFlowers  // Do not modify
}



/*
    This function should return flowers that come in the color Orange
*/
const orangeFlowers = () => {
    let filteredFlowers = []  // Do not modify

    // Filter flowers that come in the color Orange
    for (const flower of flowers) {
        if (flower.colors.includes("Orange")) {
            filteredFlowers.push(flower)
        }
    }

    return filteredFlowers  // Do not modify
}



/*
    This function should return an HTML representation of each flower.

    Expected string format:
        <article>
            <h1>Bird of Paradise</h1>

            <h2>Colors</h2>
            <section>White</section>
            <section>Orange</section>

            <h2>USDA Zones</h2>
            <div>9</div>
            <div>10</div>
            <div>11</div>
        </article>
*/
const flowersAsHTML = () => {
    let flowersHTMLString = ""  // Do not modify

    /*
        Algorithmic thinking is most important on this one.
        We would rather see the correct algorithm than the
        correct code. If you have code that works, but no
        algorithm, then you failed the exercise.
    */

    // Algorithm:
    // 1. Iterate through each flower in the flowers array
    // 2. For each flower, create an article element with:
    //    a. An h1 element with the flower type
    //    b. An h2 element for "Colors"
    //    c. A section element for each color
    //    d. An h2 element for "USDA Zones"
    //    e. A div element for each USDA zone
    // 3. Append each article to the flowersHTMLString

    for (const flower of flowers) {
        // Start the article
        flowersHTMLString += "<article>\n"

        // Add the flower type as h1
        flowersHTMLString += "    <h1>" + flower.type + "</h1>\n\n"

        // Add the colors section
        flowersHTMLString += "    <h2>Colors</h2>\n"
        for (const color of flower.colors) {
            flowersHTMLString += "    <section>" + color + "</section>\n"
        }

        // Add the USDA zones section
        flowersHTMLString += "\n    <h2>USDA Zones</h2>\n"
        for (const zone of flower.usdaZones) {
            flowersHTMLString += "    <div>" + zone + "</div>\n"
        }

        // Close the article
        flowersHTMLString += "</article>"

        // Add a newline between articles (except for the last one)
        if (flower !== flowers[flowers.length - 1]) {
            flowersHTMLString += "\n"
        }
    }

    return flowersHTMLString  // Do not modify
}`,
        tests: [
            {
                name: "inexpensiveFlowers is array",
                test: (code) => {
                    try {
                        const cheap = new Function(code + '\n return inexpensiveFlowers()')()
                        const result = new TestResult({
                            passed: Array.isArray(cheap)
                        })
                        result.addMessage(!result.passed ? "The inexpensiveFlowers function did not return an array.Did you modify code that you should not have?" : null)
                        return result;

                    } catch (e) {
                        return new TestResult({passed:false,message:e.message})
                    }
                },
                message: "The inexpensiveFlowers function did not return an array.Did you modify code that you should not have?",
            },
            {
                name: "inexpensiveFlowers has 6 items",
                test: (code) => {
                    try {
                        const cheap = new Function(code + '\n return inexpensiveFlowers()')()
                        const result = new TestResult({
                            passed: cheap.length === 6
                        })
                        result.addMessage(!result.passed ? "The test code expected that 6 flowers should be be the array of inexpensive flowers. There were not the expected number of items in the array. Make sure that you have an `if` condition that is checking the price property of each flower, and that only flowers whose price is < 2.00 are being added." : null)

                        return result;
                    } catch (e) {
                        return new TestResult({passed:false,message:e.message})
                    }
                },
                message: "The test code expected that 6 flowers should be be the array of inexpensive flowers. There were not the expected number of items in the array. Make sure that you have an \`if\` condition that is checking the price property of each flower, and that only flowers whose price is < 2.00 are being added.",
            },
            {
                name: "First item in inexpensiveFlowers return should be an object.",
                test: (code) => {
                    try {
                        const cheap = new Function(code + '\n return inexpensiveFlowers()')()
                        const result = new TestResult({
                            passed: cheap.length > 0 && Object.prototype.toString.call(cheap[0]) === "[object Object]"
                        })
                        result.addMessage(!result.passed ? "The test code expected that the array of inexpensive flowers should contain objects and not another data type like strings or numbers. Make sure that you are using the .push() method to add the entire flower object to the array, and not a specific property of the flower." : null)
                        return result;
                    } catch (e) {
                        return new TestResult({passed:false,message:e.message})
                    }
                },
                message: "The test code expected that the array of inexpensive flowers should contain objects and not another data type like strings or numbers. Make sure that you are using the .push() method to add the entire flower object to the array, and not a specific property of the flower."
            },
            {
                name: "zoneFlowers should return 4 items",
                test: (code) => {
                    try {
                        const zones = new Function(code + '\n return zoneFlowers()')()
                        const result = new TestResult({
                            passed: zones.length === 4
                        })
                        result.addMessage(!result.passed ? "The test code expected that 4 flowers should be be the array of flowers zoned to 3 and 8. There were unexpected number of items in the array." : null)
                        return result;
                    } catch (e) {
                        return new TestResult({passed:false,message:e.message})
                    }
                },
                message: `The test code expected that 4 flowers should be be the array of flowers zoned to 3 and 8. There were unexpected number of items in the array.`
            },
            {
                name: "First item in zoneFlowers return should be an object.",
                test: (code) => {
                    try {
                        const zones = new Function(code + '\n return zoneFlowers()')()
                        const result = new TestResult({
                            passed: zones.length > 0 && Object.prototype.toString.call(zones[0]) === "[object Object]"
                        })
                        result.addMessage(!result.passed ? "The test code expected that the array of zoned flowers should contain objects and not another data type like strings or numbers. Make sure that you are using the .push() method to add the entire flower object to the array, and not a specific property of the flower." : null)
                        return result;
                    } catch (e) {
                        return new TestResult({passed:false,message:e.message})
                    }
                },
                message: "The test code expected that the array of zoned flowers should contain objects and not another data type like strings or numbers. Make sure that you are using the .push() method to add the entire flower object to the array, and not a specific property of the flower."
            },
            {
                name: "orangeFlowers should return 5 items.",
                test: (code) => {
                    try {
                        const orange = new Function(code + '\n return orangeFlowers()')()
                        const result = new TestResult({
                            passed: orange.length === 5
                        })
                        result.addMessage(!result.passed ? "The test code expected that 5 flowers should be be the array of orange flowers. There were unexpected number of items in the array. Make sure that you have an `if` condition that is checking if the colors property array includes the string of Orange." : null)
                        return result;
                    } catch (e) {
                        return new TestResult({passed:false,message:e.message})
                    }
                },
                message: "The test code expected that 5 flowers should be be the array of orange flowers. There were unexpected number of items in the array. Make sure that you have an `if` condition that is checking if the colors property array includes the string of Orange."
            },
            {
                name: "First item in orangeFlowers return should be an object.",
                test: (code) => {
                    try {
                        const orange = new Function(code + '\n return orangeFlowers()')()
                        const result = new TestResult({
                            passed: orange.length > 0 && Object.prototype.toString.call(orange[0]) === "[object Object]"
                        })
                        result.addMessage(!result.passed ? "The test code expected that the array of orange flowers should contain objects and not another data type like strings or numbers. Make sure that you are using the .push() method to add the entire flower object to the array, and not a specific property of the flower." : null)
                        return result;
                    } catch (e) {
                        return new TestResult({passed:false,message:e.message})
                    }
                },
                message: "The test code expected that 5 flowers should be be the array of orange flowers. There were unexpected number of  items in the array.Make sure that you have an `if` condition that is checking if the colors property array includes the string of Orange"
            },
            {
                name: "htmlRepresentations return correct HTML.",
                test: (code) => {
                    try {
                        const htmlRepresentations = new Function(code + '\n return flowersAsHTML()')()
                        const htmlContainsArticleTags = htmlRepresentations.match(/article/g)?.length / 2 || 0
                        const htmlContainsSectionTags = htmlRepresentations.match(/section/g)?.length / 2 || 0
                        const htmlContainsDivTags = htmlRepresentations.match(/div/g)?.length / 2 || 0
                        const result = new TestResult({
                            passed: htmlContainsArticleTags === 9 && htmlContainsSectionTags === 41 && htmlContainsDivTags === 51
                        })
                        result.addMessage(!result.passed ? "The test code expected that 9 <article> elements should be in the HTML representation. There were unexpected number of articles in the string. The test code expected that 41 <section> elements should be in the HTML representation. There were unexpected number of sections in the string. The test code expected that 51 <div> elements should be in the HTML representation. There were unexpected number of divs in the string." : null)

                        return result;
                    } catch (e) {
                        return new TestResult({passed:false,message:e.message})
                    }
                },
                message: "The test code expected that 9 <article> elements should be in the HTML representation. There were unexpected number of articles in the string. The test code expected that 41 <section> elements should be in the HTML representation. There were unexpected number of sections in the string. The test code expected that 51 <div> elements should be in the HTML representation. There were unexpected number of divs in the string."
            },
        ],
    },
};