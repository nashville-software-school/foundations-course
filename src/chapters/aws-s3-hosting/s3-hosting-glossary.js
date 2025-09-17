export const s3GlossaryChapter = {
  id: "s3-glossary",
  title: "S3 Glossary",
  sectionId: "aws-s3-hosting",
  previousChapterId: "s3-bucket-setup",
  content: `

This glossary provides definitions for key terms introduced in the AWS S3 Hosting module.

| Term | Description |
|------|-------------|
| **S3 (Simple Storage Service)** | Amazon's cloud storage service that provides highly scalable and reliable object storage, perfect for hosting static websites. |
| **Bucket** | A container for storing objects in Amazon S3. Each bucket must have a globally unique name and acts like a root folder for your files. |
| **Object** | Any file stored in S3, along with its metadata. Can be HTML files, images, videos, or any other type of content. |
| **Object Storage** | A storage architecture that manages files as objects containing the data, metadata, and a unique identifier, different from traditional file systems. |
| **Static Website Hosting** | An S3 feature that allows a bucket to serve web content directly to browsers, making it possible to host websites without servers. |
| **Bucket Policy** | A JSON document that defines permissions for an S3 bucket, controlling who can access the bucket and what actions they can perform. |
| **Index Document** | The default webpage (usually index.html) that S3 serves when someone visits your website's root URL. |
| **Error Document** | The webpage S3 serves when an error occurs. For single-page applications like React, this is typically also set to index.html. |
| **Build** | The process of creating optimized, production-ready files from your source code. For React apps, this creates the dist or build folder. |
| **Distribution Files** | The optimized files in the dist or build folder that are ready to be deployed to production. |
| **Public Access** | The ability for anyone on the internet to read (view/download) objects from your S3 bucket. Required for website hosting. |
`,
  exercise: null,
}
