/**
 * Defines the available sections in the learning platform.
 * Each section represents a major topic area that contains related chapters.
 */

export const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Essential setup steps to begin your learning journey",
  },
  {
    id: "variables-and-values",
    title: "Variables and Values",
    description: "Understanding data storage and manipulation in JavaScript",
  },
  {
    id: "arrays",
    title: "Arrays",
    description: "Working with collections of data",
  },
  {
    id: "objects",
    title: "Objects",
    description: "Organizing related data and behavior",
  },
  {
    id: "functions",
    title: "Functions",
    description: "Creating reusable code blocks",
  },
  {
    id: "modules",
    title: "Modules",
    description:
      "Building maintainable applications by organizing code across multiple files",
  },
  {
    id: "leonids",
    title: "Leonid's Toys",
    optional: true,
    description:
      "Practice Javascript concepts by manipulating the inventory for Leonid's Toy Shoppe",
    },
  {
    id: "daily-notes",
    title: "Daily Notes",
    optional: true,
    description: "Practice Javascript by building a note taking application",
  },
  {
    id: "assessment",
    title: "Self-Assessment",
    description: "TBD",
  },
  {
    id: 'workshops',
    title: 'Workshops',
    description: 'Various workshops as supplemental course content.',
    optional: true,
  }
];

/**
 * Get a section by its ID
 * @param {string} id - The section ID to find
 * @returns {Object|undefined} The section object if found, undefined otherwise
 */
export const getSectionById = (id) => {
  return sections.find((section) => section.id === id);
};

/**
 * Get all section IDs
 * @returns {string[]} Array of section IDs
 */
export const getSectionIds = () => {
  return sections.map((section) => section.id);
};

/**
 * Validate if a section ID exists
 * @param {string} id - The section ID to validate
 * @returns {boolean} True if the section exists, false otherwise
 */
export const isValidSectionId = (id) => {
  return sections.some((section) => section.id === id);
};
