import diagram from "../../../assets/cloudfront-s3-diagram.png"


export const cloudfrontSetupChapter = {
  id: "cloudfront-setup",
  title: "CloudFront Setup",
  sectionId: "cloudfront",
  previousChapterId: "cloudfront-fundamentals",
  content: `## Creating and Configuring a CloudFront Distribution

Now that we understand what CloudFront is and how it works, let's create our own CloudFront distribution to serve our Rock of Ages application faster and more securely to users around the world.

### 1. Navigate to the CloudFront Console

1. Visit the **[CloudFront Console](https://console.aws.amazon.com/cloudfront)**
2. Click **Create Distribution**

💡 **What's happening here?** You're accessing AWS's content delivery network service to create a new distribution. A distribution is CloudFront's term for a configuration that tells AWS exactly how you want your website content delivered to users around the world - which files to serve, from where, and how to optimize them.

### 2. Configure the Origin

The origin is where CloudFront will fetch your website files from - in our case, your S3 bucket.

1. Select **Single website or app**
2. **Origin domain**: Select your S3 bucket from the dropdown (it should look like \`rock-of-ages-frontend-origin-jms.s3-website.us-east-2.amazonaws.com\`)
3. A yellow warning box should appear below - click the **Use website endpoint** button
4. Select protocol: **HTTP only**
   - This tells CloudFront to communicate with your S3 bucket using HTTP protocol
5. Make sure **Enable Origin Shield** is set to **No**
   - Origin Shield is an additional caching layer that costs extra and isn't needed for our simple setup

💡 **What's happening here?** You're telling CloudFront where to find your website files and how to retrieve them. The "Use website endpoint" option is crucial because it ensures CloudFront treats your S3 bucket as a website that can handle routing (not just a file storage system). The HTTP protocol setting controls how CloudFront communicates with your S3 bucket, while Origin Shield would add an extra caching layer between CloudFront and S3 that we don't need for this project.

### 3. Configure Default Cache Behavior

These settings control how CloudFront handles requests for your content.

1. **Compress objects automatically**: ☑︎ **Yes**
   - This makes your files smaller for faster loading
2. **Viewer Protocol Policy**: **HTTP and HTTPS**
   - This allows users to access your site with either protocol
3. **Allowed HTTP Methods**: **GET, HEAD**
   - These are the methods needed for serving static websites
4. **Cache Policy**: Leave as **CachingOptimized**
   - This uses AWS's recommended caching settings for static content

💡 **What's happening here?** You're configuring how CloudFront handles user requests and optimizes your content. Compression automatically reduces file sizes (like zipping files) which makes your website load faster. The cache policy determines how long CloudFront stores your files at edge locations (data centers near major population centers around the world) before checking your S3 bucket for updates.

### 4. Configure Web Application Firewall (WAF)

For this workshop, we'll keep things simple and not enable additional security features.

1. Select **Do not enable security protections**

💡 **What's happening here?** WAF (Web Application Firewall) provides additional security filtering to block malicious traffic before it reaches your website. For a simple static website like ours, CloudFront's built-in security features are sufficient, so we're skipping this extra layer to keep things simple and avoid additional costs.

### 5. Configure Distribution Settings

These settings control the global reach and domain setup for your distribution.

1. **Price Class**: Choose based on geographic reach (e.g., **Use Only US, Canada and Europe** to reduce cost)
   - This determines which edge locations CloudFront uses
2. **Alternate domain name (CNAME)**: Leave blank for now
   - This is where you'd add a custom domain like \`www.mywebsite.com\` if you had one

3. Click **Create Distribution**

💡 **What's happening here?** You're choosing the geographic scope of your CDN and any custom domain settings. CloudFront has edge locations (data centers) all over the world, but using all of them costs more. By selecting "US, Canada and Europe," you're telling CloudFront to only use edge locations in those regions, which covers most users while keeping costs lower. The CNAME field is for custom domains - since we're using CloudFront's provided domain for now, we leave this blank.

### 6. Wait for Distribution to Deploy

1. Your distribution will begin deploying immediately and take approximately **5-15 minutes** to fully complete
2. You'll be automatically taken to your distribution's details page
3. The status will show "Deploying" during this time, but you can actually test your site even while it's still deploying

💡 **What's happening here?** AWS is configuring your content across its global network of edge locations. This process takes time because CloudFront is literally copying your website configuration to dozens of data centers worldwide. Even though it shows "Deploying," the basic functionality often works before the process is 100% complete.

### 7. Access Your Site via CloudFront

You can test your CloudFront distribution right away:

1. On your distribution details page (where you're automatically taken after clicking "Create Distribution")
2. Look on the left side under **Details**
3. Find **Distribution domain name** - it will look like: \`dsjkhfsdjkfhdsk.cloudfront.net\`
4. **Important**: When visiting your site, use HTTP instead of HTTPS:
   - Copy the domain name (e.g., \`dsjkhfsdjkfhdsk.cloudfront.net\`)
   - In your browser, navigate to: \`http://dsjkhfsdjkfhdsk.cloudfront.net\` (note the **http://** prefix)
   - Do **not** use \`https://\` for now

**Why use HTTP instead of HTTPS?** While CloudFront provides HTTPS support, our Rock of Ages application connects to an API that isn't configured for HTTPS. When you try to log in using the HTTPS version of your site, your browser's security protocols will block the network call to the HTTP API, preventing login from working. By accessing your site with HTTP, both your frontend and the API use the same protocol, allowing the login functionality to work properly.

**What's happening here?** You're accessing your CloudFront distribution using HTTP protocol to ensure compatibility with the application's API calls. This is a common scenario in development environments where different parts of an application may be configured with different security protocols.

Congratulations! Your site is now being served through CloudFront's global content delivery network!

## How Everything Connects: Your Complete AWS Architecture

Below is a detailed diagram showing how all the pieces of your architecture work together:

<img width=900 src="${diagram}"/>

**How Your Architecture Works:**

1. **Users worldwide** access your application using the CloudFront URL (\`https://d1a2b3c4d5e6f7.cloudfront.net\`)

2. **CloudFront** serves as a global front door to your application, with edge locations around the world for faster delivery

3. **S3 Bucket** stores your actual website files (HTML, CSS, JavaScript, images) and serves as the origin for CloudFront

This architecture gives you several key benefits:
- **Global reach**: Users anywhere in the world can access your site quickly
- **Content caching**: CloudFront stores copies of your files at edge locations, making repeat visits faster
- **Secure HTTPS**: CloudFront automatically provides secure connections
- **Reduced load**: Your S3 bucket doesn't have to handle all user requests directly
- **Optimized delivery**: Files are compressed and delivered efficiently

**Real-world example**: If a user in Amsterdam and a user in New York both visit your website, the Amsterdam user gets content from a European edge location while the New York user gets it from a North American edge location - both experiencing fast local performance even though your S3 bucket is only in the us-east-2 (Ohio) region.

## What We've Accomplished

In this chapter, you've:
- Created a CloudFront distribution connected to your S3 bucket
- Configured caching and compression for optimal performance  
- Set up global content delivery for your React application
- Gained access to HTTPS and professional-grade hosting features
- Built a complete, scalable web hosting architecture using AWS services

Your Rock of Ages application is now served through AWS's global content delivery network, making it faster and more secure for users worldwide. In the next module, we'll set up automated deployments using GitHub Actions so you can update your site without manually uploading files.`,
  exercise: null,
}
