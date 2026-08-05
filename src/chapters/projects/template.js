import { TestResult } from "@nss-workshops/nss-core"

export const camelCasedId = {
  id: "<< chapter-section >>",
  title: "<< Section Title >>",
  sectionId: "<< chapter >>",
  previousChapterId: "<< previous id  || null >>",
  nextChapterId: "<< next id  || null >>",
  content: `<< Section content goes here >>`,
  exercises: [{
    starterCode: ``,
    solution: `// This is a template file, so no specific solution is required.
// The solution would depend on the specific exercise requirements.`,
    tests: [
      {
        name: "<< Title >>",
        test: () => new TestResult({passed: true}),
        message: "",
      },
    ],
  }],
};
