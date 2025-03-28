export const booleanLogicChapter = {
  id: 'boolean-logic',
  title: 'Conditional Logic',
  sectionId: 'variables-and-values',
  previousChapterId: 'string-methods',
  nextChapterId: 'evaluations',
  content: `You're sick.

You had to call in and tell your team that you need to spend the day at home, and in all likelihood, go to the clinic and see if it is a serious condition. You have vague symptoms, but until you know what the condition is, you won't know how to take care of yourself.

You could just have a cold. If that condition is true, then you just need rest.

You could have the flu. If that condition is true, you hopefully can take Tamiflu and you need to drink copious amounts of water.

You could have strep throat. If that condition is true, then you need to start on antibiotics right away.

You just need to find out. So you hop into your beat up 2002 Ford Escort and drive to your local clinic to talk to a nurse practitioner. You deeply hope that you don't have strep throat, and you don't believe you have all of the conditions needed for that.

## Boolean Values

Therefore, you just make an initial assumption that you don't have it.

\`\`\`js
let haveStrep = false
\`\`\`

You use the \`let\` keyword, because your assumption could turn out to be incorrect, so that \`false\` may change to \`true\` later.  By the way, \`true\` and \`false\` are the only boolean values. There is no value in JavaScript for \`maybe\` or \`kinda\`. Something either is, or it isn't, and nothing in between.

As you pull into the clinic parking lot, you have convinced yourself that you just have a cold; not strep throat, and not the flu.

\`\`\`js
let haveStrep = false
let haveCommonCold = true
let haveInfluenza = false
\`\`\`

You think again about what you would need to do if any of those conditions is true.

\`\`\`js
let haveStrep = false
let haveCommonCold = true
let haveInfluenza = false

/*
    You could just have a cold. If that condition is true, then you just
    need rest.
*/
if (haveCommonCold === true) {
    console.log("Go home and get plenty of rest for 7 days.")
}

/*
    You could have the flu. If that condition is true, you hopefully can take
    Tamiflu and you need to drink copious amounts of water.
*/
if (haveInfluenza === true) {
    console.log("Use Tamiflu and drink a minimum of 6 glasses of water every day.")
}

/*
    You could have strep throat. If that condition is true, then you need to
    start on antibiotics right away.
*/
if (haveStrep === true) {
    console.log("Get antibiotics prescription filled and take them every day.")
}
\`\`\`

Those are your first \`if\` code blocks in JavaScript. You may notice that you used the equal sign again, but instead of just one, you had to put three in there. You can go ahead and copy that entire chunk of code, paste it into the code editor and run it to see what happens. You are encouraged to change the values of the three variables between \`true\` and \`false\` to see how the output changes.

* One \`=\` is used for assignment. Assign the value on the right to the variable on the left.
* Three \`===\` is used for evaluation. Is the value on the left the exact same as the value on the right?

## If Breakdown

In an \`if\` statement, you write a condition inside the parenthesis after the \`if\` keyword. If the value on both sides of the \`===\` are exactly the same, then the condition evaluates to \`true\`. When the condition evaluates to \`true\` then the logic within the curly brances executes. If the condition evaluates to false, JavaScript jumps immediately to the ending curly brace of the \`if\` block and continues.

## If/Else

Remember the good old days, back in Part 1, when you were recording the quantity of things that you bought on your trips to the grocery store? Ah, memories of oranges and bread and milk. It's like it all happened yesterday.

Well, your tastes have matured since then, and your trips to the store have become more complex. Some weeks you are in the mood for proteins, and some weeks you are in the mood for carbohydrates. This week is a protein week.

Delete all of the code you currently have in the code editor.

\`\`\`js
const proteinWeek = true
\`\`\`

If it is protein week, you always buy 1 pound of bacon, 2 pounds of ground sirloin and 1 pound of sliced turkey.

\`\`\`js
if (proteinWeek === true) {
    console.log("Reminder: Buy 1 pound of bacon, 2 pounds of ground sirloin and 1 pound of sliced turkey.")
}
\`\`\`

Otherwise, it's carb week and you buy 2 boxes of spaghetti, 4 packets of flavored rice, and 2 bags of frozen corn. Anytime you think the word "otherwise" or "on the other hand" or "unless it's not true", then you need to use an \`else\` code block in coordination with the \`if\` code block.

\`\`\`js
if (proteinWeek === false) {
    // Since it's not protein week, it must be carb week.
    console.log("Reminder: Buy 2 boxes of spaghetti, 4 packets of flavored rice, and 2 bags of frozen corn.")
}
else {
    // It's protein week
    console.log("Reminder: Buy 1 pound of bacon, 2 pounds of ground sirloin and 1 pound of sliced turkey.")
}
\`\`\`

## Exercise: Hot Yoga or Netflix Binge

You've had a veeeery long week at work. Friday night comes around and you're exhausted. Now, you know that going to your Saturday morning hot yoga class is the right thing to do. It will clear your mind, refresh your body and spirit, and stretch out and strengthen your muscles.

But sometimes you just don't wanna. You decide that if you get up before 9, then you will go to yoga. Otherwise, you'll skip it and watch your favorite shows on Netflix all day.

Try it in the editor!`,
  exercise: {
    starterCode: `// Set this to false since you slept in
const iWokeUpEarly =

// Use an if/else statement to output the appropriate message
if () {
    console.log("Yoga was fun today.")
}`,
    solution: `// Set this to false since you slept in
const iWokeUpEarly = false

// Use an if/else statement to output the appropriate message
if (iWokeUpEarly === true) {
    console.log("Yoga was fun today.")
} else {
    console.log("I fell asleep on the couch after the 12th straight episode of The Office")
}`,
    tests: [
      {
        name: "Boolean Variable Declaration",
        test: (code) => {
          try {
            const iWokeUpEarly = new Function(code + '\n return iWokeUpEarly')()
            return typeof iWokeUpEarly === 'boolean' && iWokeUpEarly === false;
          } catch (error) {
            return false;
          }
        },
        message: "Make sure to declare iWokeUpEarly as false"
      },
      {
        name: "If/Else Structure",
        test: (code) => {
          return code.includes('if') && code.includes('else') &&
                 code.includes('===') && code.includes('true');
        },
        message: "Your code should include an if/else statement with proper condition checking"
      },
      {
        name: "Netflix Message",
        test: (code) => {
          try {
            let consoleOutput = '';
            const originalLog = console.log;
            console.log = (msg) => { consoleOutput = msg; };
            eval(code);
            console.log = originalLog;
            return consoleOutput === "I fell asleep on the couch after the 12th straight episode of The Office";
          } catch (error) {
            return false;
          }
        },
        message: "When iWokeUpEarly is false, output the Netflix binge message"
      }
    ]
  }
}