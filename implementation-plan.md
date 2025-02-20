# Implementation Plan: Chapter Sections and Navigation

## Current Structure
- Chapters are individual JS files in `src/chapters/`
- Each chapter has: id, title, path, content, and exercise properties
- Chapters are imported and combined in `src/chapters/index.js`
- Navigation displays chapters in a flat list structure

## Required Changes

### 1. Create Sections Module
Create a new file `src/sections/index.js` to define available sections:
```js
export const sections = [
  {
    id: 'strings',
    title: 'Strings',
    description: 'Working with text in JavaScript' // Optional
  },
  {
    id: 'conditional-logic',
    title: 'Conditional Logic',
    description: 'Making decisions in code'
  },
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Working with collections of data'
  },
  {
    id: 'objects',
    title: 'Objects',
    description: 'Organizing related data and behavior'
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Creating reusable code blocks'
  }
]

// Helper function to get section by ID
export const getSectionById = (id) => {
  return sections.find(section => section.id === id)
}
```

### 2. Update Chapter Data Structure
Each chapter object will need two new properties:
```js
{
  id: 'chapter-id',
  title: 'Chapter Title',
  path: '/chapter-path',
  sectionId: 'strings', // NEW: References section ID instead of name
  previousChapterId: 'previous-chapter-id', // NEW: Links to previous chapter
  content: '...',
  exercise: {...}
}
```

### 3. Navigation Component Updates
The Navigation component needs to be updated to:
- Group chapters by section using sectionId
- Display section headers using section titles from sections module
- Order chapters within sections based on previousChapterId links
- Update styling to accommodate the new hierarchy

### 4. Implementation Steps

1. **Create Sections Module**
   - Create `src/sections/index.js`
   - Define section objects with ids and titles
   - Add helper functions for section operations

2. **Update Chapter Files**
   - Add sectionId and previousChapterId to each chapter file
   - Example structure:
   ```js
   export const stringsIntroChapter = {
     id: 'strings-intro',
     title: 'Introduction to Strings',
     path: '/strings-intro',
     sectionId: 'strings',
     previousChapterId: null, // First chapter in section
     ...
   }
   ```

3. **Update Navigation Component**
   - Import sections and helper functions
   - Create a function to group chapters by section
   - Update the JSX to render sections and their chapters
   - Add new CSS styles for section headers
   - Implement logic to order chapters within sections using previousChapterId

4. **Update ChapterContext**
   - Add helper functions for:
     - Getting chapters by section
     - Getting next chapter based on previousChapterId links
     - Getting all available sections
   - Import and expose section-related functionality

### 5. Benefits
- Clear organization of content by topic
- Centralized section management
- Type safety through section IDs
- Flexible ordering system using previousChapterId
- Easy to add new chapters without renumbering
- Better visual hierarchy in navigation
- Easier to maintain and update section information
- Reduced chance of errors from mistyped section names

### 6. Testing Plan
1. Verify sections are correctly defined and accessible
2. Verify chapters are correctly grouped by section
3. Ensure chapters are ordered correctly within sections
4. Test adding new chapters in middle of sequence
5. Verify navigation styling and hierarchy
6. Test chapter navigation flow
7. Verify section information is correctly displayed

## Next Steps
After approval of this plan, we should:
1. Switch to Code mode to implement the changes
2. Start with creating the sections module
3. Update one chapter as a prototype
4. Once prototype is working, update remaining chapters
5. Implement navigation changes
6. Test and refine the implementation