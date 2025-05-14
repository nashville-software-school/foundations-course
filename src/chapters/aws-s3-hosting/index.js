import { s3FundamentalsChapter } from './s3-fundamentals';
import { hostingNextjsChapter } from './hosting-nextjs';
import { cloudfrontFundamentalsChapter } from './cloudfront-fundamentals';
import { s3HostingGlossaryChapter } from './glossary';

export const awsS3HostingChapters = [
  s3FundamentalsChapter,
  hostingNextjsChapter,
  cloudfrontFundamentalsChapter,
  s3HostingGlossaryChapter
];

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return awsS3HostingChapters.find(chapter => chapter.id === id);
};

/**
 * Get all chapter IDs for the AWS S3 hosting section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return awsS3HostingChapters.map(chapter => chapter.id);
};

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = awsS3HostingChapters.findIndex(chapter => chapter.id === currentChapterId);
  return awsS3HostingChapters[currentIndex + 1];
};

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = awsS3HostingChapters.findIndex(chapter => chapter.id === currentChapterId);
  return currentIndex > 0 ? awsS3HostingChapters[currentIndex - 1] : undefined;
};