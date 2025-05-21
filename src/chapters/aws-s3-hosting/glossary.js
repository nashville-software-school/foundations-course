export const s3HostingGlossaryChapter = {
  id: 's3-hosting-glossary',
  title: 'S3 & Hosting Glossary',
  sectionId: 'aws-s3-hosting',
  previousChapterId: 'cloudfront-fundamentals',
  content: `## S3 & Hosting Glossary

This glossary provides definitions for key terms introduced in the AWS S3 Hosting module.

| Term | Description |
|------|-------------|
| **Object Storage** | A storage architecture that manages data as objects (containing data, metadata, and a unique identifier) rather than as files in folders or blocks in sectors. |
| **S3 (Simple Storage Service)** | Amazon's object storage service that offers industry-leading scalability, data availability, security, and performance. |
| **Bucket** | A container for objects stored in Amazon S3, similar to a root folder in a file system but with a globally unique name. |
| **Object** | The fundamental entity stored in S3, consisting of data, metadata, and a key (unique identifier). |
| **Prefix** | A logical grouping of objects within an S3 bucket, similar to a folder structure (e.g., "images/" in "bucket-name/images/photo.jpg"). |
| **Bucket Policy** | A JSON-based access policy language document that defines permissions for an S3 bucket, controlling who can access the bucket and what actions they can perform. |
| **Static Website Hosting** | An S3 feature that allows you to configure a bucket to serve static web content (HTML, CSS, JavaScript) directly to web browsers. |
| **Presigned URL** | A temporary URL that grants time-limited access to a specific S3 object without requiring AWS credentials. |
`,
  exercise: null
};