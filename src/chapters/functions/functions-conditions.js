import { TestResult } from "../../utils/test_utils";

export const functionsConditionsChapter = {
    id: 'functions-conditions',
    title: 'Functions with Conditions',
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

  // Invoke the function, store the result, then log the result
  const hotWeatherResult = isItHot(90);
  console.log(hotWeatherResult);    // Displays: Yes, it's hot!

  const mildWeatherResult = isItHot(75);
  console.log(mildWeatherResult);    // Displays: No, it's not too bad.
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

  // Invoke the function, store the result, then log the result
  const excellentGrade = getLetterGrade(95);
  console.log(excellentGrade);    // Displays: A

  const goodGrade = getLetterGrade(82);
  console.log(goodGrade);    // Displays: B

  const failingGrade = getLetterGrade(45);
  console.log(failingGrade);    // Displays: F
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

  // Invoke the function, store the result, then log the result
  const teenagerResult = canRideRollerCoaster(52, 14);
  console.log(teenagerResult);    // Displays: Welcome aboard!

  const shortPersonResult = canRideRollerCoaster(46, 15);
  console.log(shortPersonResult);    // Displays: Too short to ride

  const youngPersonResult = canRideRollerCoaster(50, 10);
  console.log(youngPersonResult);    // Displays: Too young to ride
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

      // This final condition is redundant given the early returns
      // A simpler approach would be to just return "Password accepted" here
      return "Password accepted"
  }

  // Invoke the function, store the result, then log the result
  const shortPasswordResult = isValidPassword("cat");
  console.log(shortPasswordResult);           // Displays: Password too short

  const commonPasswordResult = isValidPassword("password123");
  console.log(commonPasswordResult);          // Displays: Password too common

  const goodPasswordResult = isValidPassword("Zebra8891");
  console.log(goodPasswordResult);            // Displays: Password accepted
  \`\`\`

  ### Best Practices for Conditions in Functions

  1. Check invalid cases first
  2. Return early when possible
  3. Use clear condition names
  4. Keep conditions simple
  5. Test all possible paths

  ### Properly Testing Function Results

  When testing your functions, always follow these three steps:

  1. **Invoke the function** with the appropriate arguments
  2. **Store the return value** in a clearly named variable
  3. **Pass that variable to console.log()** to display the result

  For example:
  \`\`\`js
  // DON'T do this (calling console.log directly on the function):
  console.log(calculateAge(1990));

  // DO this instead (storing the result first):
  const age = calculateAge(1990);
  console.log(age);
  \`\`\`

  This approach makes your code more:
  - Readable: Clear variable names explain what the result represents
  - Reusable: You can use the result in multiple places
  - Debuggable: You can inspect the variable value if needed

  ## Exercise: Ticket Price Calculator

  Create an arrow function that calculates ticket prices based on:
  - Age (children under 12 and seniors over 65 get 50% off)
  - Day of week (weekends cost $2 more)
  - Base ticket price is $10
  `,
    exercise: {
      starterCode: `const calculateTicketPrice = (age, isWeekend) => {
      // 1. Start with the base ticket price of $10

      // 2. Add $2 to the price if it's a weekend (isWeekend is true)

      // 3. Apply a 50% discount if the person is under 12 OR 65 or older

      // 4. Return the final ticket price
  }

  // Test your function with these scenarios for different ages and days:
  // 1. Invoke the function
  // 2. Store the return value in a variable
  // 3. Output the value with console.log()

  // Example:
  // const adultWeekdayPrice = calculateTicketPrice(25, false);
`,
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
          name: "Regular Adult on Weekday",
          test: (code) => {
            try {
              const fn = new Function(code + `; return calculateTicketPrice(25, false);`);
              const passed = fn() === 10;
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed:false,message:error.message});
            }
          },
          message: "Your function should return $10 for an adult on a weekday"
        },
        {
          name: "Regular Adult on Weekend",
          test: (code) => {
            try {
              const fn = new Function(code + `; return calculateTicketPrice(30, true);`);
              const passed = fn() === 12;
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed:false,message:error.message});
            }
          },
          message: "Your function should return $12 for an adult on a weekend"
        },
        {
          name: "Child on Weekday",
          test: (code) => {
            try {
              const fn = new Function(code + `; return calculateTicketPrice(8, false);`);
              const passed = fn() === 5;
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed:false,message:error.message});
            }
          },
          message: "Your function should return $5 for a child on a weekday"
        },
        {
          name: "Child on Weekend",
          test: (code) => {
            try {
              const fn = new Function(code + `; return calculateTicketPrice(10, true);`);
              const passed = fn() === 6;
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed:false,message:error.message});
            }
          },
          message: "Your function should return $6 for a child on a weekend"
        },
        {
          name: "Senior on Weekday",
          test: (code) => {
            try {
              const fn = new Function(code + `; return calculateTicketPrice(65, false);`);
              const passed = fn() === 5;
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed:false,message:error.message});
            }
          },
          message: "Your function should return $5 for a senior on a weekday"
        },
        {
          name: "Senior on Weekend",
          test: (code) => {
            try {
              const fn = new Function(code + `; return calculateTicketPrice(70, true);`);
              const passed = fn() === 6;
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed:false,message:error.message});
            }
          },
          message: "Your function should return $6 for a senior on a weekend"
        },
        {
          name: "Function structure check",
          test: (code) => {
            try {
              const passed = code.includes('const calculateTicketPrice = (') &&
                     code.includes('=>') &&
                     code.includes('return');
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed:false,message:error.message});
            }
          },
          message: "Make sure you're using an arrow function syntax with a proper return statement"
        },
        {
          name: "Result variable and console.log",
          test: (code) => {
            try {
              // Look for variable assignment and console.log pattern
              // This is still a pattern match but necessary to validate proper function invocation
              const hasVariableAssignment = /const\s+\w+\s*=\s*calculateTicketPrice\(\s*\d+\s*,\s*(true|false)\s*\)/.test(code);
              const hasConsoleLog = /console\.log\(\s*\w+\s*\)/.test(code);
              const passed = hasVariableAssignment && hasConsoleLog;
              return new TestResult({passed});
            } catch (error) {
              return new TestResult({passed:false,message:error.message});
            }
          },
          message: "Make sure you invoke your function, store the result in a variable, and pass that variable to console.log()"
        }
      ]
    }
  }