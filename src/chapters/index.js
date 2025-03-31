import { projectChapters, leonidsChapters } from "./projects";
import { gettingStartedChapters } from './getting-started'
import { variablesChapters } from './variables'
import { arrayChapters } from './arrays'
import { objectChapters } from './objects'
import { functionChapters } from './functions'
import { modulesChapters } from './modules'
import { workshopChapters } from './workshops'
import { assessments } from './assessments'

// Helper function to add requiresAuth flag based on section
const addAuthRequirement = (chapter) => ({
  ...chapter,
  requiresAuth: ["arrays", "objects", "functions", "modules"].includes(
    chapter.sectionId
  ),
});

// Apply requiresAuth to all chapters

const projectModulesChapters = projectChapters.map(addAuthRequirement);
const protectedLeonidsChapters = leonidsChapters.map(addAuthRequirement);

const protectedGettingStartedChapters = gettingStartedChapters.map(addAuthRequirement)
const protectedVariablesChapters = variablesChapters.map(addAuthRequirement)
const protectedArrayChapters = arrayChapters.map(addAuthRequirement)
const protectedObjectChapters = objectChapters.map(addAuthRequirement)
const protectedFunctionChapters = functionChapters.map(addAuthRequirement)
const protectedModulesChapters = modulesChapters.map(addAuthRequirement)
const protectedWorkshopChapters = workshopChapters.map(addAuthRequirement)
const protectedAssessments = assessments.map(addAuthRequirement)

export const chapters = [
  ...protectedGettingStartedChapters,
  ...protectedVariablesChapters,
  ...protectedArrayChapters,
  ...protectedObjectChapters,
  ...protectedFunctionChapters,
  ...projectModulesChapters,
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
