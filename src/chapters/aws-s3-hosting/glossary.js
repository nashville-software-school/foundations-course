export const s3HostingGlossaryChapter = {
  id: 's3-hosting-glossary',
  title: 'S3 & Hosting Glossary',
  sectionId: 'aws-s3-hosting',
  previousChapterId: 'cloudfront-fundamentals',
  content: `## S3 & Hosting Glossary

This glossary provides definitions for key terms introduced in the AWS S3 Hosting module.

| Term | Description | Week Introduced |
|------|-------------|----------------|
| **Cloud Computing** | The delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet, offering faster innovation, flexible resources, and economies of scale. | Week 1 |
| **On-demand Self-service** | A cloud computing feature that allows users to provision computing capabilities as needed without requiring human interaction with service providers. | Week 1 |
| **Provision** | Provisioning means setting up and making resources ready for use. | Week 1 |
| **Resource Pooling** | A cloud computing characteristic where the provider's computing resources are pooled to serve multiple consumers using a multi-tenant model. | Week 1 |
| **Rapid Elasticity** | The ability to quickly scale resources up or down based on demand, making it appear as though resources are unlimited from the consumer's perspective. | Week 1 |
| **Infrastructure as a Service (IaaS)** | A cloud service model that provides virtualized computing resources over the internet, where users manage the OS, middleware, and applications while the provider manages hardware and virtualization. | Week 1 |
| **Platform as a Service (PaaS)** | A cloud service model that provides a platform for developing, testing, and deploying applications, where users manage applications and data while the provider manages hardware, OS, and middleware. | Week 1 |
| **Software as a Service (SaaS)** | A cloud service model that provides ready-to-use applications over the internet, where users only manage data input and configuration while the provider manages everything else. | Week 1 |
| **Horizontal Scaling** | Adding more instances of resources (like servers) as demand increases, also known as "scaling out." | Week 1 |
| **Vertical Scaling** | Increasing the capacity of existing resources (like adding more CPU or RAM to a server), also known as "scaling up." | Week 1 |
| **AWS Region** | A physical location around the world where AWS clusters data centers, completely independent and isolated from other regions. | Week 1 |
| **Availability Zone (AZ)** | An isolated location within an AWS Region, physically separated but connected with high-bandwidth, low-latency networking to other AZs in the same region. | Week 1 |
| **Edge Location** | An endpoint for AWS used for caching content, part of Amazon CloudFront (Content Delivery Network), located in many more cities than AWS regions. | Week 1 |
| **Object Storage** | A storage architecture that manages data as objects (containing data, metadata, and a unique identifier) rather than as files in folders or blocks in sectors. | Week 2 |
| **S3 (Simple Storage Service)** | Amazon's object storage service that offers industry-leading scalability, data availability, security, and performance. | Week 2 |
| **Bucket** | A container for objects stored in Amazon S3, similar to a root folder in a file system but with a globally unique name. | Week 2 |
| **Object** | The fundamental entity stored in S3, consisting of data, metadata, and a key (unique identifier). | Week 2 |
| **Prefix** | A logical grouping of objects within an S3 bucket, similar to a folder structure (e.g., "images/" in "bucket-name/images/photo.jpg"). | Week 2 |
| **Bucket Policy** | A JSON-based access policy language document that defines permissions for an S3 bucket, controlling who can access the bucket and what actions they can perform. | Week 2 |
| **Static Website Hosting** | An S3 feature that allows you to configure a bucket to serve static web content (HTML, CSS, JavaScript) directly to web browsers. | Week 2 |
| **Presigned URL** | A temporary URL that grants time-limited access to a specific S3 object without requiring AWS credentials. | Week 2 |
| **Static Export** | The process of pre-rendering a Next.js application into static HTML, CSS, and JavaScript files at build time for deployment to static hosting services like S3. | Week 2 |
| **CloudFront** | Amazon's content delivery network (CDN) service that speeds up distribution of static and dynamic web content to users by caching content at edge locations worldwide. | Week 2 |
| **Route 53** | Amazon's scalable domain name system (DNS) web service used to route end users to Internet applications by translating domain names into IP addresses. | Week 2 |
| **CORS (Cross-Origin Resource Sharing)** | A security feature that allows or restricts web applications running at one origin to request resources from a different origin. | Week 2 |
`,
  exercise: null
};