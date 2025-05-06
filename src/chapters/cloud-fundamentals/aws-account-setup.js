export const awsAccountSetupChapter = {
  id: 'aws-account-setup',
  title: 'AWS Account Setup',
  sectionId: 'cloud-fundamentals',
  previousChapterId: 'why-use-cloud',
  content: `In this chapter, we'll walk through the process of creating an AWS account, understanding the AWS Free Tier, navigating the AWS Management Console, and learning about AWS regions and availability zones.

## Creating an AWS Account

To get started with AWS, you'll need to create an account. Follow these steps:

1. **Visit the AWS homepage**: Go to [aws.amazon.com](https://aws.amazon.com)

2. **Click "Create an AWS Account"**: This button is usually in the top-right corner of the page

3. **Provide your email address and account name**: 
   - Use a professional email address
   - Choose an account name (often your company or project name)

4. **Create a password**: Choose a strong, unique password

5. **Provide contact information**:
   - Your name
   - Company name (if applicable)
   - Phone number
   - Address

6. **Add payment information**:
   - AWS requires a credit card even for the free tier
   - Your card will only be charged if you exceed free tier limits
   - Consider setting up billing alerts (we'll cover this later)

7. **Verify your identity**:
   - AWS will call or text the phone number you provided with a verification code

8. **Choose a support plan**:
   - For beginners, the free "Basic Support" plan is sufficient
   - You can upgrade later if needed

9. **Complete registration and access your account**

> **Important**: After creating your account, set up Multi-Factor Authentication (MFA) for the root user to enhance security. We'll cover this in the security best practices section.

## Understanding the AWS Free Tier

AWS offers a Free Tier to help new users explore services without incurring significant costs. There are three types of free tier offers:

### 1. 12 Months Free
- Available for 12 months following your initial sign-up date
- Includes popular services like:
  - Amazon EC2 (750 hours per month of t2.micro or t3.micro instance)
  - Amazon S3 (5GB of standard storage)
  - Amazon RDS (750 hours of db.t2.micro database usage)

### 2. Always Free
- Services that are always free within certain limits
- Examples include:
  - AWS Lambda (1 million free requests per month)
  - Amazon DynamoDB (25GB of storage)
  - Amazon CloudFront (1TB of data transfer out)

### 3. Trials
- Short-term free trials that start when you begin using the service
- Examples include Amazon Inspector, Amazon Lightsail, and more

> **Cost Management Tip**: Set up AWS Budgets to create alerts when your usage approaches free tier limits. Go to the Billing Dashboard → Budgets → Create budget.

## AWS Management Console Navigation

The AWS Management Console is your central interface for accessing and managing AWS services.

### Key Areas of the Console

1. **Navigation Bar**:
   - **Services dropdown**: Access all AWS services
   - **Search bar**: Quickly find services, features, or documentation
   - **Region selector**: Change your current AWS region
   - **Account information**: Access account settings and billing
   - **Support**: Get help and support resources

2. **Recently Visited Services**: Quick access to services you've recently used

3. **Resource Groups**: Organize and manage resources across services

4. **AWS Health Dashboard**: View service health and your account's health events

### Essential Services for Beginners

- **IAM (Identity and Access Management)**: Manage users and permissions
- **EC2 (Elastic Compute Cloud)**: Virtual servers in the cloud
- **S3 (Simple Storage Service)**: Object storage service
- **RDS (Relational Database Service)**: Managed database service
- **Lambda**: Serverless compute service
- **CloudWatch**: Monitoring and observability service
- **CloudFormation**: Infrastructure as code service

## AWS Regions and Availability Zones

Understanding AWS's global infrastructure is crucial for designing resilient and performant applications.

### Regions

A **Region** is a physical location around the world where AWS clusters data centers. Each region is completely independent and isolated from other regions.

Key points about regions:
- Currently, AWS has 25+ regions worldwide
- Each region has a name (e.g., us-east-1, eu-west-2)
- Not all services are available in all regions
- Data stored in a region stays in that region unless you explicitly move it
- Pricing can vary between regions

**How to choose a region**:
1. **Proximity to users**: Choose regions close to your target audience to reduce latency
2. **Service availability**: Ensure the services you need are available in your chosen region
3. **Compliance requirements**: Some regulations require data to be stored in specific geographic locations
4. **Pricing**: Costs can vary between regions

### Availability Zones

Each AWS Region consists of multiple, isolated locations called **Availability Zones** (AZs).

Key points about AZs:
- Each region has multiple AZs (typically 3-6)
- AZs are physically separated but connected with high-bandwidth, low-latency networking
- AZs are identified by letters (e.g., us-east-1a, us-east-1b)
- AZs allow you to build highly available applications by distributing resources across multiple zones

### Edge Locations

In addition to regions and AZs, AWS has **Edge Locations** that are part of Amazon CloudFront (Content Delivery Network).

- Edge locations are endpoints for AWS used for caching content
- Located in many more cities than regions (200+ edge locations globally)
- Help deliver content with lower latency to users worldwide

## Hands-on Exercise: Exploring the AWS Console

1. Log in to your AWS account at [console.aws.amazon.com](https://console.aws.amazon.com)
2. Identify your current region in the top-right corner
3. Change to a different region and note any differences
4. Use the Services dropdown to navigate to the S3 service
5. Use the search bar to find the "IAM" service
6. Explore the AWS Health Dashboard
7. Visit the Billing Dashboard to review your Free Tier usage

In the next module, we'll dive deeper into AWS S3 and learn how to host a static website.`,
  exercise: null
};