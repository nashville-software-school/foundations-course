import awsEml from "../../assets/aws_email.png";
import accSelect from "../../assets/account_select.png";

export const awsAccountSetupChapter = {
  id: 'aws-account-setup',
  title: 'AWS Account Setup',
  sectionId: 'cloud-fundamentals',
  previousChapterId: 'why-use-cloud',
  content: `
You should have an email titled:

> **"Invitation to join AWS IAM Identity Center"**

<img width=700 src="${awsEml}"/>

- 🕒 **This invitation is valid for 7 days** — be sure to activate it promptly.
- 📧 **Your username** is listed in that email.
- 🔗 **Your AWS access portal URL**:  
  [https://nss-se.awsapps.com/start/](https://nss-se.awsapps.com/start/)

---

### 🖼️ How to Access AWS

- Follow the email instructions to provision your account and set a strong password.  
- Once you're logged in, you'll see a screen like this:
<img width="700" src="${accSelect}" />

- Click the triangle to reveal your available options,  
then select the **\`intro_to_cloud\`** link

At this point, you are now in your **student AWS account**.

> 🧾 All resources you create here are **yours** and are **not shared** with other students.  
> 👨‍🏫 Your instructor can access your account if support is needed.

---

### 🎓 About This Account

This is your **student AWS account** for the duration of the course.  
It includes access to the following AWS services:

- \`AmazonS3FullAccess\`
- \`CloudFrontFullAccess\`
- \`AmazonEC2FullAccess\`
- \`AmazonRDSFullAccess\`

> 🚨 **Please check in with your instructor before launching any resources outside of class.**  
> 🧹 Don’t forget to **delete your resources** at the end of the course (your instructor will show you how!).  

> NSS will delete resources after the course is over — **please do not expect anything to stick around**.  
> This is partly how we’re able to **keep this course free**.


### ❓Trouble Logging In?

If you didn’t receive the email or are having trouble accessing your account,  
please reach out to your instructor **via Slack as soon as possible**.

--- 

### Key Areas of the Console

1. **Navigation Bar**:
   - **Services dropdown**: Access all AWS services
   - **Search bar**: Quickly find services, features, or documentation
   - **Region selector**: Change your current AWS region (use us-east2 Ohio)

2. **Recently Visited Services**: Quick access to services you've recently used

<iframe width="560" height="315" src="https://www.youtube.com/embed/i331jNgsL_4?si=53Zsbmz3XprkTsx7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

--- 

### Services covered in class

- **S3 (Simple Storage Service)**: Object storage service  
- **CloudFront**: Global content delivery network (CDN) that caches and serves content closer to users for faster access  
- **EC2 (Elastic Compute Cloud)**: Scalable virtual servers in the cloud for running applications  
- **RDS (Relational Database Service)**: Managed relational database service supporting engines like MySQL, PostgreSQL, and more  

## AWS Regions and Availability Zones

Understanding AWS's global infrastructure is crucial for designing resilient and performant applications.

Watch this short video about Regions and availability zones.
<iframe width="560" height="315" src="https://www.youtube.com/embed/Fi1KaVrWYTE?si=aI0l2L-qAGkhKQ5p" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Regions

A **Region** is a physical location around the world where AWS clusters data centers. Each region is completely independent and isolated from other regions.

Key points about regions:
- Currently, AWS has 34+ regions worldwide
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

1. Log in to your AWS account 
2. Identify your current region in the top-right corner (use us-east-2 Ohio for the course)
3. Change to a different region and note any differences
4. Use the Services dropdown to navigate to the S3 service

In the next module, we'll dive deeper into AWS S3 and learn how to 
host a static website.`,
  exercise: null
};