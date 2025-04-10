import { TestResult } from "../../utils/test_utils";

export const functionsCallingFunctionsChapter = {
    id: 'functions-calling-functions',
    title: 'Functions Calling Functions',
    sectionId: 'functions',
    previousChapterId: 'functions-loops',
    nextChapterId: 'functions-review',
    content: `## Making Functions Work Together

  Just like we can break a big task into smaller steps, we can break complex code into smaller functions that work together. This makes our code easier to understand and maintain.

  ### Basic Function Composition

  Here's a simple example of one function using another:

  \`\`\`js
  const double = (number) => {
      return number * 2
  }

  const addFive = (number) => {
      return number + 5
  }

  const doubleThenAddFive = (number) => {
      const doubled = double(number)    // First double it
      return addFive(doubled)          // Then add five
  }

  // Invoke the function, store the result, then log it
  const result = doubleThenAddFive(10);
  console.log(result);   // Displays: 25
  // Because: 10 doubled is 20, then add 5 is 25
  \`\`\`

  ### Breaking Down Complex Tasks

  Complex operations become clearer when split into functions:

  \`\`\`js
  const calculateTax = (price) => {
      return price * 0.1    // 10% tax
  }

  const calculateShipping = (price) => {
      if (price < 20) {
          return 5.99       // Standard shipping
      } else {
          return 0          // Free shipping over $20
      }
  }

  const calculateTotal = (price) => {
      const tax = calculateTax(price)
      const shipping = calculateShipping(price)
      return price + tax + shipping
  }

  // Invoke the functions, store results, then log them
  const smallOrderTotal = calculateTotal(15);
  console.log(\`Small order total: \${smallOrderTotal}\`);    // Price + tax + shipping

  const largeOrderTotal = calculateTotal(50);
  console.log(\`Large order total: \${largeOrderTotal}\`);    // Price + tax (free shipping)
  \`\`\`

  ### Functions Helping Functions

  Functions can help each other do their jobs:

  \`\`\`js
  const isValidUsername = (username) => {
      return username.length >= 3
  }

  const isValidPassword = (password) => {
      return password.length >= 8
  }

  const createUser = (username, password) => {
      if (!isValidUsername(username)) {
          return "Username too short"
      }

      if (!isValidPassword(password)) {
          return "Password too short"
      }

      return "User created successfully"
  }

  // Invoke the function, store results, then log them
  const shortUsernameResult = createUser("jo", "password123");
  console.log(shortUsernameResult);     // Displays: Username too short

  const shortPasswordResult = createUser("john", "pass");
  console.log(shortPasswordResult);     // Displays: Password too short

  const successResult = createUser("john", "password123");
  console.log(successResult);           // Displays: User created successfully
  \`\`\`

  ### Building Complex Behavior

  Multiple functions can work together to create complex behavior:

  \`\`\`js
  const getRandomNumber = (max) => {
      return Math.floor(Math.random() * max)
  }

  const createPassword = (length) => {
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
      let password = ""

      for (let i = 0; i < length; i++) {
          const randomIndex = getRandomNumber(characters.length)
          password = password + characters[randomIndex]
      }

      return password
  }

  const createSecurePassword = () => {
      // Keep trying until we get a password with both letters and numbers
      let password = createPassword(8)

      while (!password.match(/[a-z]/) || !password.match(/[0-9]/)) {
          password = createPassword(8)
      }

      return password
  }

  // Invoke the function, store result, then log it
  const securePassword = createSecurePassword();
  console.log(\`Generated secure password: \${securePassword}\`);
  // Displays something like: "a7b2x9kp"
  \`\`\`

  ### Best Practices for Functions Calling Functions

  1. Keep functions focused on one task
  2. Use clear names that show what functions do
  3. Break complex operations into smaller functions
  4. Test functions both individually and together
  5. Follow proper invocation pattern:
     - Invoke the function
     - Store the result in a descriptive variable
     - Pass that variable to console.log()

  ### Function Dependency Flow

  When functions work together, they follow a pattern:

  1. **Helper functions** perform specific tasks and return values
  2. **Main functions** use helper functions to build more complex behavior
  3. **Results flow** from helper functions to main functions to your program

  This pattern makes your code:
  - More **readable**: Each function has a clear purpose
  - More **testable**: You can test each function separately
  - More **maintainable**: Change one function without breaking others

  ## Exercise: Game Score System

  Create a scoring system for a game using multiple arrow functions:
  1. One function to calculate points based on time and targets hit
  2. Another function to determine bonus points
  3. A main function that uses both to calculate final score
  `,
    exercise: {
        starterCode: `// 1. Calculate base points (time * 100 + targets * 50)
const calculateBasePoints = (time, targets) => {

}

// 2. Calculate bonus (if targets > 10, bonus = 1000, otherwise 0)
const calculateBonus = (targets) => {

}

// 3. Calculate final score (base points + bonus)
const calculateFinalScore = (time, targets) => {
    // Get the base points and bonus points

    // Add the results together and return the sum
}

/*
    Invoke calculateFinalScore with time=2 and targets=5,
    store the result, then log it
*/

`,
        solution: `// 1. Calculate base points (time * 100 + targets * 50)
const calculateBasePoints = (time, targets) => {
    return (time * 100) + (targets * 50)
}

// 2. Calculate bonus (if targets > 10, bonus = 1000, otherwise 0)
const calculateBonus = (targets) => {
    if (targets > 10) {
        return 1000
    }
    return 0
}

// 3. Calculate final score (base points + bonus)
const calculateFinalScore = (time, targets) => {
    const basePoints = calculateBasePoints(time, targets)
    const bonus = calculateBonus(targets)
    return basePoints + bonus
}

const finalScoreNoBonus = calculateFinalScore(2, 12)
console.log(finalScoreNoBonus)
  `,
        tests: [
            {
                name: "Base Points Calculation",
                test: (code) => {
                    try {
                        const fn = new Function(code + `; return calculateBasePoints(2, 5);`);
                        const passed = fn() === 450;
                        return new TestResult({passed});
                    } catch (error) {
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Your calculateBasePoints function should return 450 when given time=2 and targets=5"
            },
            {
                name: "Bonus Calculation - No Bonus",
                test: (code) => {
                    try {
                        const fn = new Function(code + `; return calculateBonus(5);`);
                        const passed = fn() === 0;
                        return new TestResult({passed});
                    } catch (error) {
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Your calculateBonus function should return 0 when targets=5 (not enough for bonus)"
            },
            {
                name: "Bonus Calculation - With Bonus",
                test: (code) => {
                    try {
                        const fn = new Function(code + `; return calculateBonus(12);`);
                        const passed = fn() === 1000;
                        return new TestResult({passed});
                    } catch (error) {
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Your calculateBonus function should return 1000 when targets=12 (enough for bonus)"
            },
            {
                name: "Bonus Calculation - Edge Case",
                test: (code) => {
                    try {
                        const fn = new Function(code + `; return calculateBonus(10);`);
                        const passed = fn() === 0;
                        return new TestResult({passed});
                    } catch (error) {
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Your calculateBonus function should return 0 when targets=10 (exactly at threshold)"
            },
            {
                name: "Final Score - No Bonus",
                test: (code) => {
                    try {
                        const fn = new Function(code + `; return calculateFinalScore(2, 5);`);
                        const passed = fn() === 450;
                        return new TestResult({passed});
                    } catch (error) {
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Your calculateFinalScore function should return 450 when time=2 and targets=5 (no bonus)"
            },
            {
                name: "Final Score - With Bonus",
                test: (code) => {
                    try {
                        const fn = new Function(code + `; return calculateFinalScore(2, 12);`);
                        const passed = fn() === 1800;
                        return new TestResult({passed});
                    } catch (error) {
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Your calculateFinalScore function should return 1800 when time=2 and targets=12 (with bonus)"
            },
            {
                name: "Function Calling Structure",
                test: (code) => {
                    try {
                        const passed = code.includes('calculateBasePoints(time, targets)') &&
                            code.includes('calculateBonus(targets)');
                        return new TestResult({passed});
                    } catch (error) {
                        return new TestResult({passed:false,message:error.message});
                    }
                },
                message: "Your calculateFinalScore function needs to call both helper functions"
            }
        ]
    }
}