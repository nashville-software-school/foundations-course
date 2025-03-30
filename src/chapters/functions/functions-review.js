export const functionsReviewChapter = {
    id: 'functions-review',
    title: 'Review and Practice',
    sectionId: 'functions',
    previousChapterId: 'functions-calling-functions',
    nextChapterId: null,
    content: `## Reviewing Function Concepts

  Let's review everything we've learned about functions by seeing how all the concepts work together.

  ### Core Concepts Review

  1. **Function Basics**
  \`\`\`js
  // Creating (defining) a function
  const greet = (name) => {
      console.log(\`Hello, \${name}!\`)
  }

  // Using (invoking) the function
  greet("Alex")    // Displays: Hello, Alex!
  \`\`\`

  2. **Parameters and Arguments**
  \`\`\`js
  // Parameters make functions flexible
  const calculateArea = (width, height) => {
      return width * height
  }

  // Different arguments give different results
  const smallArea = calculateArea(5, 3);
  console.log(smallArea);     // Displays: 15

  const largeArea = calculateArea(10, 20);
  console.log(largeArea);     // Displays: 200
  \`\`\`

  3. **Return Values**
  \`\`\`js
  const isEven = (number) => {
      return number % 2 === 0
  }

  const formatResult = (number) => {
      if (isEven(number)) {
          return \`\${number} is even\`
      } else {
          return \`\${number} is odd\`
      }
  }

  const result1 = formatResult(4);
  console.log(result1);    // Displays: "4 is even"

  const result2 = formatResult(7);
  console.log(result2);    // Displays: "7 is odd"
  \`\`\`

  4. **Scope**
  \`\`\`js
  const taxRate = 0.1    // Global scope

  const calculateTotal = (price) => {
      const tax = price * taxRate    // Function scope
      return price + tax
  }

  const totalPrice = calculateTotal(50);
  console.log(totalPrice);    // Displays: 55
  // console.log(tax)    // Would cause error - tax only exists in function
  \`\`\`

  5. **Functions Working Together**
  \`\`\`js
  const validateInput = (text) => {
      return text.length >= 3
  }

  const formatInput = (text) => {
      return text.trim().toLowerCase()
  }

  const processUsername = (username) => {
      if (!validateInput(username)) {
          return "Username too short"
      }
      return formatInput(username)
  }

  const processedName1 = processUsername("  Bob  ");
  console.log(processedName1);    // Displays: "bob"

  const processedName2 = processUsername("A");
  console.log(processedName2);    // Displays: "Username too short"
  \`\`\`

  ### Proper Function Invocation Pattern

  Remember to always follow these three steps when using functions:

  1. **Invoke the function** with appropriate arguments
  2. **Store the return value** in a clearly named variable
  3. **Pass that variable to console.log()** to display the result

  For example:
  \`\`\`js
  // DON'T do this (calling console.log directly on the function):
  console.log(calculateTotal(50));

  // DO this instead (storing the result first):
  const total = calculateTotal(50);
  console.log(total);
  \`\`\`

  ## Exercise: Friendly Robot Helper

  You're building a friendly robot that can greet people, tell jokes, and give compliments. Let's create some functions to make our robot more interactive and fun!

  ### Requirements

  1. **Create a greeting function**
     - Function name: \`createGreeting\`
     - Parameters: \`name\` (string), \`time\` (string)
     - If time is "morning" OR the name starts with "A", say "Good morning, [name]!"
     - If time is "afternoon", say "Good afternoon, [name]!"
     - Otherwise, say "Hello, [name]!"
     - Return the greeting as a string

  2. **Create a joke function**
     - Function name: \`tellJoke\`
     - Parameter: \`topic\` (string)
     - If topic is "weather", return "What do you call a stormy robot? A thunder-bot!"
     - If topic is "animals", return "Why did the robot go to the zoo? To study creature features!"
     - Otherwise, return "Why was the robot tired? Because it had too many bytes!"
     - Return the joke as a string

  3. **Create a function to greet multiple people**
     - Function name: \`greetPeople\`
     - Parameters: \`people\` (array of names), \`time\` (string)
     - Use a loop to iterate through the array of names
     - Use the \`createGreeting\` function to create a greeting for each person
     - Return an array of all the greetings

  4. **Create a robot interaction function**
     - Function name: \`robotInteraction\`
     - Parameters: \`name\` (string), \`time\` (string), \`topic\` (string)
     - Create a greeting for the person using \`createGreeting\`
     - Get a joke on the given topic using \`tellJoke\`
     - Return both as a combined message: "[greeting] [joke]"
  `,
    exercise: {
        starterCode: `// 1. Create a greeting function
const createGreeting = (name, time) => {
  // If time is "morning" OR the name starts with "A", say "Good morning, [name]!"
  // If time is "afternoon", say "Good afternoon, [name]!"
  // Otherwise, say "Hello, [name]!"

}

// 2. Create a joke function
const tellJoke = (topic) => {
  // If topic is "weather", return the weather joke
  // If topic is "animals", return the animals joke
  // Otherwise, return the default joke

}

// 3. Create a function to greet multiple people
const greetPeople = (people, time) => {
  // Create an empty array to store all the greetings

  // Loop through each person in the people array

  // Create a greeting for each person

  // Add the greeting to the array

  // Return the array of greetings

}

// 4. Create a robot interaction function
const robotInteraction = (name, time, topic) => {
  // Get the greeting

  // Get the joke

  // Return both together

}

// Test your functions
// Create a greeting
const greeting = createGreeting("Sam", "morning");
console.log(greeting);

// Tell a joke
const joke = tellJoke("weather");
console.log(joke);

// Greet multiple people
const people = ["Taylor", "Jamie", "Alex"];
const greetings = greetPeople(people, "afternoon");
console.log(greetings);

// Create a complete interaction
const interaction = robotInteraction("Taylor", "afternoon", "animals");
console.log(interaction);
`,
        solution: `// 1. Create a greeting function
const createGreeting = (name, time) => {
  // If time is "morning" OR the name starts with "A", say "Good morning, [name]!"
  // If time is "afternoon", say "Good afternoon, [name]!"
  // Otherwise, say "Hello, [name]!"
  if (time === "morning" || name.startsWith("A")) {
    return \`Good morning, \${name}!\`;
  } else if (time === "afternoon") {
    return \`Good afternoon, \${name}!\`;
  } else {
    return \`Hello, \${name}!\`;
  }
}

// 2. Create a joke function
const tellJoke = (topic) => {
  // If topic is "weather", return the weather joke
  // If topic is "animals", return the animals joke
  // Otherwise, return the default joke
  if (topic === "weather") {
    return "What do you call a stormy robot? A thunder-bot!";
  } else if (topic === "animals") {
    return "Why did the robot go to the zoo? To study creature features!";
  } else {
    return "Why was the robot tired? Because it had too many bytes!";
  }
}

// 3. Create a function to greet multiple people
const greetPeople = (people, time) => {
  // Create an empty array to store all the greetings
  const allGreetings = [];

  // Loop through each person in the people array
  for (const person of people) {
    // Create a greeting for each person
    const personGreeting = createGreeting(person, time);

    // Add the greeting to the array
    allGreetings.push(personGreeting);
  }

  // Return the array of greetings
  return allGreetings;
}

// 4. Create a robot interaction function
const robotInteraction = (name, time, topic) => {
  // Get the greeting
  const greeting = createGreeting(name, time);

  // Get the joke
  const joke = tellJoke(topic);

  // Return both together
  return \`\${greeting} \${joke}\`;
}

// Test your functions
// Create a greeting
const greeting = createGreeting("Sam", "morning");
console.log(greeting);

// Tell a joke
const joke = tellJoke("weather");
console.log(joke);

// Greet multiple people
const people = ["Taylor", "Jamie", "Alex"];
const greetings = greetPeople(people, "afternoon");
console.log(greetings);

// Create a complete interaction
const interaction = robotInteraction("Taylor", "afternoon", "animals");
console.log(interaction);
`,
        tests: [
            {
                name: "Morning Greeting",
                test: function(studentCode) {
                    try {
                        const createGreeting = new Function(studentCode + `; return createGreeting;`)();
                        // Test morning greeting
                        const result = createGreeting("Jamie", "morning");
                        // Check if the result is correct
                        return result === "Good morning, Jamie!";
                    } catch (e) {
                        return false;
                    }
                },
                message: "Your createGreeting function should return 'Good morning, Jamie!' when time is 'morning'"
            },
            {
                name: "Name Starting with A",
                test: function(studentCode) {
                    try {
                        const createGreeting = new Function(studentCode + `; return createGreeting;`)();
                        // Test name starting with A
                        const result = createGreeting("Alex", "evening");
                        // Check if the result is correct
                        return result === "Good morning, Alex!";
                    } catch (e) {
                        return false;
                    }
                },
                message: "Your createGreeting function should return 'Good morning, Alex!' when name starts with 'A', regardless of time"
            },
            {
                name: "Afternoon Greeting",
                test: function(studentCode) {
                    try {
                        const createGreeting = new Function(studentCode + `; return createGreeting;`)();
                        const result = createGreeting("Taylor", "afternoon");
                        return result === "Good afternoon, Taylor!";
                    } catch (e) {
                        return false;
                    }
                },
                message: "Your createGreeting function should return 'Good afternoon, Taylor!' when time is 'afternoon'"
            },
            {
                name: "Default Greeting",
                test: function(studentCode) {
                    try {
                        const createGreeting = new Function(studentCode + `; return createGreeting;`)();
                        const result = createGreeting("Riley", "evening");
                        return result === "Hello, Riley!";
                    } catch (e) {
                        return false;
                    }
                },
                message: "Your createGreeting function should return 'Hello, Riley!' for other times"
            },
            {
                name: "Weather Joke",
                test: function(studentCode) {
                    try {
                        const tellJoke = new Function(studentCode + `; return tellJoke;`)();
                        const result = tellJoke("weather");

                        return result === "What do you call a stormy robot? A thunder-bot!";
                    } catch (e) {
                        return false;
                    }
                },
                message: "Your tellJoke function should return the correct weather joke"
            },
            {
                name: "Greet Multiple People",
                test: function(studentCode) {
                    try {
                        const greetPeople = new Function(studentCode + `; return greetPeople;`)();
                        const createGreeting = new Function(studentCode + `; return createGreeting;`)();
                        const people = ["Sam", "Jo", "Alex"];
                        const result = greetPeople(people, "evening");
                        console.log("result", result)

                        // Check if result is an array with the right length
                        if (!Array.isArray(result) || result.length !== 3) return false;

                        // Check if each greeting is correct
                        const expected = [
                            createGreeting("Sam", "evening"),
                            createGreeting("Jo", "evening"),
                            createGreeting("Alex", "evening")
                        ];
                        console.log(expected)
                        return result[0] === expected[0] &&
                               result[1] === expected[1] &&
                               result[2] === expected[2];
                    } catch (e) {

                        return false;
                    }
                },
                message: "Your greetPeople function should return an array of greetings for each person"
            },
            {
                name: "Robot Interaction",
                test: function(studentCode) {
                    try {
                        // Create a test environment
                        const robotInteraction = new Function(studentCode + `; return robotInteraction;`)();
                        const createGreeting = new Function(studentCode + `; return createGreeting;`)();
                        const tellJoke = new Function(studentCode + `; return tellJoke;`)();

                        // Test robot interaction
                        const result = robotInteraction("Jordan", "morning", "weather");
                        const expectedGreeting = createGreeting("Jordan", "morning");
                        const expectedJoke = tellJoke("weather");

                        return result === `${expectedGreeting} ${expectedJoke}`;
                    } catch (e) {
                        return false;
                    }
                },
                message: "Your robotInteraction function should combine the greeting and joke correctly"
            },
            {
                name: "Using Logical Operator",
                test: function(studentCode) {
                    try {
                        // Check if the code uses || operator in createGreeting
                        return studentCode.includes('||') || studentCode.includes('&&');
                    } catch (e) {
                        return false;
                    }
                },
                message: "Your createGreeting function should use the || (OR) or && (AND) operator"
            },
            {
                name: "Using Array Iteration",
                test: function(studentCode) {
                    try {
                        // Check if the code uses a loop in greetPeople
                        return (studentCode.includes('for (') ||
                                studentCode.includes('while (') ||
                                studentCode.includes('forEach(')) &&
                               studentCode.includes('push(');
                    } catch (e) {
                        return false;
                    }
                },
                message: "Your greetPeople function should use a loop to iterate through the array"
            }
        ]
    }
}