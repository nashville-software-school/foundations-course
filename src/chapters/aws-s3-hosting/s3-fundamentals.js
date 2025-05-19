export const s3FundamentalsChapter = {
  id: "s3-fundamentals",
  title: "S3 Fundamentals",
  sectionId: "aws-s3-hosting",
  previousChapterId: "client-repo-setup",
  content: `## What is S3 (Simple Storage Service)?

Amazon Simple Storage Service (S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. It's one of AWS's oldest and most widely used services, launched in 2006.

### Key Features of S3

- **Unlimited storage**: Store as much data as you want without worrying about capacity planning
- **High durability**: 99.999999999% (11 nines) durability for objects
- **High availability**: 99.99% availability SLA
- **Secure**: Multiple security features including encryption, access control, and audit capabilities
- **Scalable**: Handles any amount of data and any number of requests simultaneously
- **Cost-effective**: Pay only for what you use with no minimum fees
- **Versatile**: Suitable for a wide range of use cases from static website hosting to data lakes

## Object Storage Concepts

S3 is an **object storage** service, which differs from traditional file systems and block storage.

### What is Object Storage?

Object storage manages data as objects rather than as files or blocks. Each object includes:

- **Data**: The actual content (file)
- **Metadata**: Information about the data (creation date, size, content type, etc.)
- **Key**: A unique identifier (essentially the file name and path)

### Object Storage vs. File Storage vs. Block Storage

| Characteristic | Object Storage (S3) | File Storage | Block Storage |
|----------------|---------------------|--------------|---------------|
| Structure | Flat namespace with buckets and objects | Hierarchical with folders and files | Raw volumes divided into blocks |
| Access | RESTful HTTP API | File system protocols (NFS, SMB) | SCSI, iSCSI, Fibre Channel |
| Metadata | Rich, customizable | Limited (file attributes) | None (just raw blocks) |
| Scalability | Virtually unlimited | Limited by file system | Limited by volume size |
| Use Cases | Static content, backups, big data | Shared files, applications | Databases, boot volumes |

### S3 Terminology

- **Bucket**: A container for objects stored in S3 (similar to a root folder)
- **Object**: Any file and its metadata stored in S3
- **Key**: The unique identifier for an object within a bucket (includes the file name and any prefix)
- **Prefix**: A logical grouping of objects (similar to a folder structure)
- **Version ID**: The identifier for a specific version of an object (when versioning is enabled)
- **Object URL**: The web address to access an object (https://bucket-name.s3.region.amazonaws.com/key)
`,
  exercise: null,
}
