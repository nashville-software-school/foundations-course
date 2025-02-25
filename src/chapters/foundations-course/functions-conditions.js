export const functionsConditionsChapter = {
  id: 'functions-conditions',
  title: 'Functions with Conditions',
  path: '/foundations-course/functions-conditions',
  sectionId: 'functions',
  previousChapterId: 'functions-scope-parameters',
  nextChapterId: 'functions-loops',
  content: `## Making Decisions in Functions

Functions become more powerful when they can make decisions. By using conditions (if/else statements) inside functions, we can make them behave differently based on their inputs.

### Basic Decision Making

Here's a simple function that makes a decision:

\`\`\`js
const isItHot = (temperature) => {
    if (temperature > 85) {
        return "Yes, it's hot!"
    } else {
        return "No, it's not too bad."
    }
}

console.log(isItHot(90))    // Displays: Yes, it's hot!
console.log(isItHot(75))    // Displays: No, it's not too bad.
\`\`\`

### Multiple Conditions

Functions can handle multiple conditions:

\`\`\`js
const getLetterGrade = (score) => {
    if (score >= 90) {
        return "A"
    } else if (score >= 80) {
        return "B"
    } else if (score >= 70) {
        return "C"
    } else if (score >= 60) {
        return "D"
    } else {
        return "F"
    }
}

console.log(getLetterGrade(95))    // Displays: A
console.log(getLetterGrade(82))    // Displays: B
console.log(getLetterGrade(45))    // Displays: F
\`\`\`

### Using Multiple Parameters with Conditions

We can make decisions based on multiple inputs:

\`\`\`js
const canRideRollerCoaster = (height, age) => {
    if (height < 48) {
        return "Too short to ride"
    }

    if (age < 12) {
        return "Too young to ride"
    }

    if (height > 84) {
        return "Too tall to ride safely"
    }

    return "Welcome aboard!"
}

console.log(canRideRollerCoaster(52, 14))    // Welcome aboard!
console.log(canRideRollerCoaster(46, 15))    // Too short to ride
console.log(canRideRollerCoaster(50, 10))    // Too young to ride
\`\`\`

### Combining Conditions

You can use AND (&&) and OR (||) to check multiple conditions:

\`\`\`js
const isValidPassword = (password) => {
    if (password.length < 8) {
        return "Password too short"
    }

    if (password.includes("password") ||
        password.includes("123")) {
        return "Password too common"
    }

    if (password.length >= 8 &&
        !password.includes("password") &&
        !password.includes("123")) {
        return "Password accepted"
    }
}

console.log(isValidPassword("cat"))           // Password too short
console.log(isValidPassword("password123"))   // Password too common
console.log(isValidPassword("Zebra8891"))     // Password accepted
\`\`\`

### Best Practices for Conditions in Functions

1. Check invalid cases first
2. Return early when possible
3. Use clear condition names
4. Keep conditions simple
5. Test all possible paths

## Exercise: Ticket Price Calculator

Create an arrow function that calculates ticket prices based on:
- Age (children under 12 and seniors over 65 get 50% off)
- Day of week (weekends cost $2 more)
- Base ticket price is $10
`,
  exercise: {
    starterCode: `const calculateTicketPrice = (age, isWeekend) => {
    // Your code here
    // Return the final ticket price
}

// Example usage:
// calculateTicketPrice(25, false) should return 10
// calculateTicketPrice(8, true) should return 6
// calculateTicketPrice(70, true) should return 6`,
    solution: `const calculateTicketPrice = (age, isWeekend) => {
    let price = 10

    // Add weekend surcharge first
    if (isWeekend) {
        price += 2
    }

    // Apply age discount if applicable
    if (age < 12 || age >= 65) {
        price = price * 0.5
    }

    return price
}`,
    tests: [
      {
        name: "Regular Adult Weekday",
        test: (code) => {
          return code.includes('const calculateTicketPrice = (') &&
                 code.includes('=>') &&
                 code.includes('price = 10') &&
                 code.includes('isWeekend') &&
                 code.includes('age <') &&
                 code.includes('age >=') &&
                 code.includes('0.5')
        },
        message: "Make sure your arrow function handles base price, weekend surcharge, and age discounts"
      },
      {
        name: "Price Calculations",
        test: (code) => {
          return code.includes('price +=') &&
                 code.includes('price *') &&
                 code.includes('return price')
        },
        message: "Your function should modify the price based on conditions and return the final amount"
      }
    ]
  }
}