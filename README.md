# Intro to Cloud Course - Student Facing Curriculum

A comprehensive, interactive learning platform for cloud development fundamentals, designed to help junior software engineers gain practical AWS experience and confidently discuss cloud technologies in interviews.

## Table of Contents

- [Course Overview](#course-overview)
- [Local Development Setup](#local-development-setup)
- [Contributing to the Curriculum](#contributing-to-the-curriculum)
- [Content Creation Guidelines](#content-creation-guidelines)
- [Course Structure](#course-structure)
- [Learning Resources](#learning-resources)

## Course Overview

This course provides hands-on experience with cloud development concepts, focusing on AWS services and modern deployment practices. Students will deploy a complete React application using S3, CloudFront, and CI/CD pipelines, gaining practical skills they can immediately apply in their job search.

### Target Audience
Junior software engineers who have completed foundational web development training and are seeking to add cloud development skills to their resume.

### Learning Philosophy
Following Bloom's Taxonomy, this course focuses on:
- **Remember**: What is it? (Core concepts and terminology)
- **Understand**: Why do we need this? (Benefits and use cases)
- **Apply**: How do I use it? (Hands-on implementation)

## Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- Git
- A modern web browser

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone git@github.com:NSS-Workshops/intro-to-cloud-student-facing.git
   cd intro-to-cloud-student-facing
   ```

### 1.1 Access to GitHubs Package manager

First-time setup for a project that depends on **nss-core**:

- Create and set your **NPM token (`NPM_TOKEN`)** as described [here](https://github.com/NSS-Workshops/platform?tab=readme-ov-file#installation-consumer-projects-installation)


1.2. **Create environment variables**:
   Create a `.env.local` file in the project root:
   ```
   VITE_LEARNING_PLATFORM_API=http://localhost:8000
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173/intro-to-cloud-student-facing/`

## Contributing to the Curriculum

### Repository Structure

The course content is organized into sections and chapters:

```
src/
├── chapters/
│   ├── introduction/
│   ├── cloud-fundamentals/
│   ├── aws-s3-hosting/
│   ├── cloudfront/
│   └── intro-to-cicd/
├── sections/
│   └── index.js
└── components/
```

### Adding a New Section

1. **Create the section directory**:
   ```bash
   mkdir src/chapters/your-new-section
   ```

2. **Create an index.js file** in the section directory:
   ```javascript
   import { chapter1 } from './chapter1';
   import { chapter2 } from './chapter2';
   
   export const yourNewSectionChapters = [
     chapter1,
     chapter2
   ];
   
   // Helper functions for navigation
   export const getChapterById = (id) => {
     return yourNewSectionChapters.find(chapter => chapter.id === id);
   };
   
   export const getNextChapter = (currentChapterId) => {
     const currentIndex = yourNewSectionChapters.findIndex(chapter => chapter.id === currentChapterId);
     return yourNewSectionChapters[currentIndex + 1];
   };
   
   export const getPreviousChapter = (currentChapterId) => {
     const currentIndex = yourNewSectionChapters.findIndex(chapter => chapter.id === currentChapterId);
     return currentIndex > 0 ? yourNewSectionChapters[currentIndex - 1] : undefined;
   };
   ```

3. **Add the section to the main chapters index**:
   ```javascript
   // In src/chapters/index.js
   import { yourNewSectionChapters } from "./your-new-section"
   
   export const chapters = [
     ...existingChapters,
     ...yourNewSectionChapters,
   ]
   ```

### Adding a New Chapter

Each chapter follows a consistent structure:

```javascript
export const yourChapter = {
  id: 'unique-chapter-id',
  title: 'Chapter Title',
  sectionId: 'section-id',
  previousChapterId: 'previous-chapter-id', // or null for first chapter
  content: `## Chapter Content
  
  Your markdown content here...
  `,
  exercise: null // or exercise object for hands-on activities
};
```

### Chapter Properties

- **id**: Unique identifier (kebab-case)
- **title**: Display title for the chapter
- **sectionId**: Must match the parent section ID
- **previousChapterId**: ID of the preceding chapter (maintains navigation order)
- **content**: Markdown-formatted instructional content
- **exercise**: Optional object for interactive coding exercises

## Content Creation Guidelines

### Pedagogical Principles

#### 1. Beginner-Friendly Explanations
- Start with familiar concepts and build up to cloud-specific terms
- Use clear, jargon-free language
- Define technical terms when first introduced
- Provide context for why concepts matter

#### 2. Minimize Extraneous Cognitive Load
- Focus on essential concepts only
- Avoid tangential topics that don't support learning objectives
- Present information in logical, sequential order
- Use consistent terminology throughout

#### 3. Real-World Analogies
- Connect abstract cloud concepts to familiar experiences
- Use concrete examples that students can relate to
- Explain the "why" behind technical decisions

Example:
```markdown
Think of S3 like a digital filing cabinet with unlimited drawers:
- You can store any kind of file in it
- You can retrieve those files anytime from anywhere with internet connectivity
- You never have to worry about running out of space
```

### Content Structure Pattern

Each chapter should follow this pattern:

1. **Explanation**: Introduce the concept with clear definitions and context
2. **Practice**: Provide hands-on exercises or examples
3. **Glossary**: Define all key terms introduced in the chapter

### Writing Guidelines

#### Chapter Length
- Keep chapters focused and digestible (15-20 minutes reading time)
- Break complex topics into multiple shorter chapters
- Each chapter should cover one main concept

#### Tone and Style
- Use encouraging, supportive language
- Write in second person ("you will learn...")
- Be conversational but professional
- Acknowledge that learning cloud concepts can be challenging

#### Technical Accuracy
- Test all code examples and instructions
- Verify that all steps work as described
- Include troubleshooting tips for common issues
- Keep content current with AWS service changes

#### Accessibility
- Use descriptive headings and subheadings
- Include alt text for images
- Ensure code examples are properly formatted
- Provide clear navigation between concepts

### Knowledge Assumptions

**Do NOT assume students know**:
- Cloud computing concepts or terminology
- AWS services or console navigation
- DevOps practices or CI/CD
- Infrastructure concepts

**You CAN assume students know**:
- Basic web development (HTML, CSS, JavaScript)
- Git and GitHub fundamentals
- Command line basics
- React development concepts

### Example Content Structure

```markdown
## What is CloudFront?

Amazon CloudFront is a Content Delivery Network (CDN) - a system of distributed servers that deliver web content to users based on their geographic location.

Think of CloudFront like a network of local libraries. Instead of everyone traveling to one central library (your S3 bucket), CloudFront creates copies of your books (website files) at libraries in every major city. When someone wants to read a book, they go to their local library instead of traveling across the country.

### Why Your Website Benefits from CloudFront

Your S3 website is already working, so why add CloudFront? Here's why CloudFront transforms your basic S3 website into a professional, production-ready application:

[Continue with detailed explanation...]

### Key CloudFront Terms

- **Distribution**: Your complete CloudFront configuration
- **Origin**: The source of your content (your S3 bucket)
- **Edge Location**: A data center where CloudFront caches your content
```

## Course Structure

The course is organized into workshops, each containing multiple modules:

### Workshop 1: Introduction to Cloud and CI/CD with React
- **Module 1**: Cloud Fundamentals
- **Module 2**: AWS S3 for Static Website Hosting  
- **Module 3**: CloudFront
- **Module 4**: Introduction to CI/CD

## Learning Resources

### Course Documentation
- [Learning Objectives](./documentation/learning-objectives.md)
- [Workshop 1 Outline](./documentation/workshop1-overview.md)
- [Workshop 2 Outline](./documentation/workshop2-overview.md)
- [Workshop 3 Outline](./documentation/workshop3-overview.md)
- [Workshop 4 Outline](./documentation/workshop4-overview.md)

## Deployment

This application automatically deploys to GitHub Pages when changes are pushed to the main branch. The deployment process is configured in `.github/workflows/deploy.yml` and handles:

- Environment variable injection
- Production build creation
- Static site deployment with proper routing

---

*This course is developed by Nashville Software School to provide free, accessible cloud development education to junior software engineers.*