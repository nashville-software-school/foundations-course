import { leonidsChapters } from "./projects";
import { gettingStartedChapters } from './getting-started'
import { keyboardShortcutsChapters } from './keyboard-shortcuts'
import { variablesChapters } from './variables'
import { arrayChapters } from './arrays'
import { objectChapters } from './objects'
import { functionChapters } from './functions'
import { htmlCssChapters } from './html-css'
import { workshopChapters } from './workshops'
import { projects } from './assessments'

// Helper function to add requiresAuth flag based on section
const addAuthRequirement = (chapter) => ({
  ...chapter,
  requiresAuth: ["variables-and-values", "arrays", "objects", "functions", "modules"].includes(
    chapter.sectionId
  ),
});

// Helper function to add prerequisite requirements
const addPrerequisiteRequirement = (chapter) => ({
  ...chapter,
  requiresPrerequisite: chapter.sectionId === 'keyboard-shortcuts' ? {
    type: 'section-completion',
    sectionId: 'getting-started',
    completionPercentage: 100
  } : undefined,
});

// Apply requiresAuth to all chapters
const protectedLeonidsChapters = leonidsChapters.map(addAuthRequirement);
const protectedVariablesChapters = variablesChapters.map(addAuthRequirement)
const protectedArrayChapters = arrayChapters.map(addAuthRequirement)
const protectedObjectChapters = objectChapters.map(addAuthRequirement)
const protectedFunctionChapters = functionChapters.map(addAuthRequirement)
const protectedWorkshopChapters = workshopChapters.map(addAuthRequirement)
const protectedAssessments = projects.map(addAuthRequirement)
const protectedHtmlCssChapters = htmlCssChapters.map(addAuthRequirement)

// Apply prerequisite requirements to keyboard shortcut chapters
const prerequisiteKeyboardShortcutsChapters = keyboardShortcutsChapters.map(addPrerequisiteRequirement)

export const chapters = [
  ...gettingStartedChapters,
  ...prerequisiteKeyboardShortcutsChapters,
  ...protectedVariablesChapters,
  ...protectedArrayChapters,
  ...protectedObjectChapters,
  ...protectedFunctionChapters,
  ...protectedHtmlCssChapters,
  ...protectedLeonidsChapters,
  ...protectedAssessments,
  ...protectedWorkshopChapters
]

/**
 * Helper function to get chapter by ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return chapters.find((chapter) => chapter.id === id);
};

/**
 * Helper function to get chapter content
 * @param {string} id - The chapter ID
 * @returns {Object|null} The chapter content and exercise if found, null otherwise
 */
export const getChapterContent = (id) => {
  const chapter = getChapterById(id);
  return chapter
    ? {
        content: chapter.content,
        exercise: chapter.exercise,
      }
    : null;
};

/**
 * Helper function to get the first chapter in a section
 * @param {string} sectionId - The section ID
 * @returns {Object|undefined} The first chapter in the section
 */
export const getFirstChapterInSection = (sectionId) => {
  return chapters.find(
    (chapter) => chapter.sectionId === sectionId && !chapter.previousChapterId
  );
};

/**
 * Helper function to get all chapters in a section
 * @param {string} sectionId - The section ID
 * @returns {Array} Array of chapters in the section
 */
export const getChaptersInSection = (sectionId) => {
  return chapters.filter((chapter) => chapter.sectionId === sectionId);
};
