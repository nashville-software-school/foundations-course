export const hostingNextjsChapter = {
  id: 'hosting-nextjs',
  title: 'Hosting a Next.js Static App on S3',
  sectionId: 'aws-s3-hosting',
  previousChapterId: 's3-fundamentals',
  content: `In this chapter, we'll learn how to deploy a Next.js application as a static website on Amazon S3. This approach is cost-effective, highly scalable, and perfect for content-focused websites.

## Understanding Next.js Static Export

Next.js is a popular React framework that supports both server-side rendering (SSR) and static site generation (SSG). For S3 hosting, we'll use the static export feature.

### What is Static Export?

Static export (or static site generation) is the process of pre-rendering a Next.js application into static HTML, CSS, and JavaScript files at build time. These files can then be deployed to any static hosting service, including Amazon S3.

### When to Use Static Export

Static export is ideal for:
- Content-focused websites (blogs, documentation, marketing sites)
- Sites where content doesn't change frequently
- Projects where you want to minimize hosting costs
- Applications that don't require server-side functionality

### Limitations of Static Export

When using static export, you won't have access to:
- Server-side rendering (SSR)
- API routes
- Incremental Static Regeneration (ISR)
- Image Optimization (next/image) without additional configuration
- Middleware

### Configuring Next.js for Static Export

To enable static export in a Next.js project, you need to:

1. Update your \`next.config.js\` file:

\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Optional: Specify the output directory (default is 'out')
  // distDir: 'build',
  
  // Optional: Configure image optimization for static export
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
\`\`\`

2. Ensure all pages use getStaticProps instead of getServerSideProps
3. Remove any API routes or server-side only features

## Building the Provided Next.js Application for Production

Let's walk through the process of preparing a Next.js application for deployment to S3.

### Prerequisites

- Node.js installed (version 14.6.0 or newer)
- npm or yarn package manager
- A Next.js project ready for deployment

### Step 1: Install Dependencies

Ensure all dependencies are installed:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### Step 2: Configure for Static Export

Update your \`next.config.js\` as shown in the previous section.

### Step 3: Build the Application

Run the build command to generate the static files:

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

This will create a directory (usually \`out\` or your configured \`distDir\`) containing all the static files needed for your website.

### Step 4: Test the Build Locally

You can test the static build using a simple HTTP server:

\`\`\`bash
npx serve out
# or
npx http-server out
\`\`\`

Navigate to http://localhost:3000 (or the port specified by the server) to verify everything works correctly.

## Uploading Build Files to S3

Now that we have our static files ready, let's upload them to Amazon S3.

### Step 1: Create an S3 Bucket

1. Sign in to the AWS Management Console
2. Navigate to the S3 service
3. Click "Create bucket"
4. Choose a unique bucket name (e.g., \`my-nextjs-website\`)
5. Select a region close to your target audience
6. For now, keep "Block all public access" enabled (we'll configure public access later)
7. Click "Create bucket"

### Step 2: Upload the Static Files

There are multiple ways to upload your files to S3:

#### Option 1: Using the AWS Console

1. Open your newly created bucket
2. Click "Upload"
3. Click "Add files" or "Add folder" and select all files from your build directory
4. Click "Upload"

#### Option 2: Using the AWS CLI

1. Install the AWS CLI if you haven't already:
   \`\`\`bash
   npm install -g aws-cli
   # or
   pip install awscli
   \`\`\`

2. Configure your AWS credentials:
   \`\`\`bash
   aws configure
   \`\`\`

3. Upload the files:
   \`\`\`bash
   aws s3 sync out/ s3://my-nextjs-website
   \`\`\`

#### Option 3: Using the AWS SDK in a Script

You can create a deployment script using the AWS SDK:

\`\`\`javascript
// deploy.js
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

// Configure AWS
const s3 = new AWS.S3({
  region: 'us-east-1', // Change to your region
});

const BUCKET_NAME = 'my-nextjs-website';
const BUILD_DIR = path.join(__dirname, 'out');

// Function to upload a file
async function uploadFile(filePath) {
  const relativeFilePath = path.relative(BUILD_DIR, filePath);
  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || 'application/octet-stream';
  
  const params = {
    Bucket: BUCKET_NAME,
    Key: relativeFilePath.replace(/\\\\/g, '/'), // Convert Windows paths
    Body: fileContent,
    ContentType: contentType,
  };
  
  try {
    await s3.putObject(params).promise();
    console.log(\`Uploaded: \${relativeFilePath}\`);
  } catch (err) {
    console.error(\`Error uploading \${relativeFilePath}: \${err.message}\`);
  }
}

// Function to walk directory and upload all files
async function uploadDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await uploadDirectory(filePath);
    } else {
      await uploadFile(filePath);
    }
  }
}

// Start the upload process
uploadDirectory(BUILD_DIR)
  .then(() => console.log('Deployment complete!'))
  .catch(err => console.error('Deployment failed:', err));
\`\`\`

Run this script with:
\`\`\`bash
node deploy.js
\`\`\`

## Configuring S3 for Static Website Hosting

Now that your files are uploaded, you need to configure the bucket for static website hosting.

### Step 1: Enable Static Website Hosting

1. Open your bucket in the AWS Console
2. Go to the "Properties" tab
3. Scroll down to "Static website hosting"
4. Click "Edit"
5. Select "Enable"
6. For "Index document", enter "index.html"
7. For "Error document", enter "404.html" (or your custom error page)
8. Click "Save changes"

### Step 2: Set Bucket Policy for Public Access

To make your website publicly accessible:

1. Go to the "Permissions" tab
2. Under "Block public access (bucket settings)", click "Edit"
3. Uncheck "Block all public access"
4. Click "Save changes"
5. Type "confirm" in the confirmation dialog and click "Confirm"

6. Under "Bucket policy", click "Edit"
7. Add the following policy (replace \`my-nextjs-website\` with your bucket name):

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-nextjs-website/*"
    }
  ]
}
\`\`\`

8. Click "Save changes"

### Step 3: Access Your Website

Your website is now accessible at the S3 website endpoint, which follows this format:
\`http://bucket-name.s3-website-region.amazonaws.com\`

For example:
\`http://my-nextjs-website.s3-website-us-east-1.amazonaws.com\`

You can find your specific endpoint in the "Properties" tab under "Static website hosting".

## Adding a Custom Domain (Optional)

Using a custom domain with your S3 website requires Amazon CloudFront and Route 53.

### Step 1: Register a Domain (if you don't have one)

1. Go to Route 53 in the AWS Console
2. Click "Registered domains" > "Register domain"
3. Follow the steps to register a domain

### Step 2: Create a CloudFront Distribution

1. Go to CloudFront in the AWS Console
2. Click "Create distribution"
3. For "Origin domain", select your S3 website endpoint
4. Under "Default cache behavior", set "Viewer protocol policy" to "Redirect HTTP to HTTPS"
5. Under "Settings":
   - Enter your domain name in "Alternate domain names (CNAMEs)"
   - For "Custom SSL certificate", request or import a certificate using AWS Certificate Manager
6. Click "Create distribution"

### Step 3: Create DNS Records

1. Go to Route 53 > Hosted zones
2. Select your domain
3. Click "Create record"
4. Leave the subdomain field empty (or enter "www" for a www subdomain)
5. Select "A - Routes traffic to an IPv4 address and some AWS resources"
6. Enable "Alias"
7. In the "Route traffic to" dropdown, select "Alias to CloudFront distribution"
8. Select your CloudFront distribution
9. Click "Create records"

Your website should now be accessible at your custom domain!

## Best Practices for S3 Website Hosting

1. **Use CloudFront** for better performance and HTTPS support
2. **Enable versioning** on your S3 bucket to recover from accidental deletions
3. **Set up proper cache control headers** for optimal performance
4. **Use a CI/CD pipeline** for automated deployments (we'll cover this in the next module)
5. **Monitor costs** using AWS Budgets or Cost Explorer
6. **Back up important content** to another bucket or storage solution
7. **Use error documents** to handle 404 errors gracefully
8. **Optimize assets** (compress images, minify CSS/JS) before deployment

## Troubleshooting Common Issues

### 404 Errors for All Pages

- Ensure your bucket policy is correctly set up
- Verify that the index.html file is at the root of your bucket
- Check that static website hosting is enabled

### CSS/JS Not Loading

- Check the network tab in browser dev tools for specific errors
- Ensure file permissions are set correctly
- Verify that content types are set correctly (especially for .js and .css files)

### Routing Issues

- Next.js uses client-side routing which doesn't work with S3's default behavior
- Add a custom error document that redirects to index.html
- Consider using CloudFront with custom error responses

### CORS Issues

If your site needs to access resources from other domains:

1. Go to your bucket's "Permissions" tab
2. Scroll down to "Cross-origin resource sharing (CORS)"
3. Click "Edit" and add appropriate CORS rules

## Conclusion

You've now learned how to deploy a Next.js static website to Amazon S3. This approach provides a cost-effective, scalable hosting solution for static websites. In the next module, we'll explore how to automate this deployment process using CI/CD with GitHub Actions.`,
  exercise: null
};