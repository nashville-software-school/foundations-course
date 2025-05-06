export const s3FundamentalsChapter = {
  id: 's3-fundamentals',
  title: 'S3 Fundamentals',
  sectionId: 'aws-s3-hosting',
  previousChapterId: null,
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

## Creating and Configuring S3 Buckets

### Creating an S3 Bucket

1. Sign in to the AWS Management Console
2. Navigate to the S3 service
3. Click "Create bucket"
4. Choose a unique bucket name:
   - Must be globally unique across all AWS accounts
   - Must be 3-63 characters long
   - Can only contain lowercase letters, numbers, dots, and hyphens
   - Must start with a letter or number
5. Select a region:
   - Choose a region close to your users for better performance
   - Consider compliance requirements for data storage location
6. Configure bucket options:
   - Block all public access (recommended for most cases)
   - Bucket versioning (enables keeping multiple versions of objects)
   - Server-side encryption (encrypts objects automatically)
   - Object lock (prevents objects from being deleted)
7. Review and create the bucket

### S3 Storage Classes

S3 offers different storage classes optimized for different use cases:

- **S3 Standard**: General-purpose storage for frequently accessed data
- **S3 Intelligent-Tiering**: Automatically moves objects between access tiers based on usage patterns
- **S3 Standard-IA** (Infrequent Access): For data accessed less frequently but requiring rapid access
- **S3 One Zone-IA**: Like Standard-IA but stored in only one Availability Zone
- **S3 Glacier Instant Retrieval**: For archived data that needs immediate access
- **S3 Glacier Flexible Retrieval**: For archived data with retrieval times from minutes to hours
- **S3 Glacier Deep Archive**: Lowest-cost storage for long-term archiving with retrieval times of hours
- **S3 Outposts**: For on-premises object storage

### Bucket Policies and Settings

Key configuration options for S3 buckets include:

- **Versioning**: Keeps multiple versions of objects to protect against accidental deletion or overwrites
- **Lifecycle rules**: Automatically transition objects between storage classes or expire them
- **Replication**: Copy objects automatically to another bucket in the same or different region
- **Event notifications**: Trigger actions when certain events occur in your bucket
- **Static website hosting**: Configure a bucket to host a static website
- **Transfer acceleration**: Speed up uploads and downloads using Amazon CloudFront
- **Object lock**: Prevent objects from being deleted or overwritten
- **Requester pays**: Make the requester pay for data transfer costs

## S3 Permissions and Access Control

S3 provides multiple ways to control access to your data:

### 1. S3 Block Public Access

A set of security controls that ensure buckets and objects don't have public access. This setting can be applied at:
- Account level (applies to all buckets)
- Bucket level (applies to a specific bucket)
- Object level (applies to specific objects)

### 2. IAM Policies

Identity and Access Management (IAM) policies specify what actions are allowed or denied on AWS resources. For S3, you can:
- Attach policies to IAM users, groups, or roles
- Control access to specific buckets or objects
- Define conditions for access (IP address, time of day, etc.)

Example IAM policy allowing read access to a specific bucket:

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::example-bucket",
        "arn:aws:s3:::example-bucket/*"
      ]
    }
  ]
}
\`\`\`

### 3. Bucket Policies

JSON-based policies attached directly to buckets. They can:
- Control access to the bucket and its objects
- Be used to grant cross-account access
- Enforce encryption or other security requirements

Example bucket policy allowing public read access to all objects:

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::example-bucket/*"
    }
  ]
}
\`\`\`

### 4. Access Control Lists (ACLs)

A legacy access control mechanism that defines which AWS accounts or groups are granted access and the type of access. ACLs can be applied to:
- Buckets
- Individual objects

> **Note**: AWS recommends using IAM policies and bucket policies instead of ACLs whenever possible.

### 5. Presigned URLs

Temporary URLs that grant time-limited access to specific objects:
- Can be created by any user with valid AWS credentials
- Allow temporary access without requiring AWS credentials
- Useful for allowing uploads to specific locations or providing temporary download links

Example use case: Allowing a user to upload a profile picture directly to S3 without having AWS credentials.

## Hands-on Exercise: Creating and Configuring an S3 Bucket

1. Sign in to the AWS Management Console
2. Navigate to the S3 service
3. Create a new bucket with a unique name
4. Enable versioning on the bucket
5. Upload a few test files to the bucket
6. Create a folder structure using prefixes
7. Apply a bucket policy that restricts access to your account only
8. Set up a lifecycle rule to move objects to S3 Standard-IA after 30 days

In the next chapter, we'll learn how to use S3 to host a static Next.js website.`,
  exercise: null
};