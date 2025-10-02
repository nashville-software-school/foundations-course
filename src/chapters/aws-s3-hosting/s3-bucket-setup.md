## Creating and Configuring Your S3 Bucket for Website Hosting

Now that we understand what S3 is and how it works, let's get our hands dirty by creating and configuring our own S3 bucket to host our Rock of Ages application.

### 1. Creating an S3 Bucket

Your S3 bucket will be the home for all your website files. Let's create one:

1. Navigate to the **[S3 Console](https://us-east-2.console.aws.amazon.com/s3/get-started?region=us-east-2)**
2. Click **Create bucket**
3. Create a unique bucket name:
   - Set the name to `rock-of-ages-frontend-origin-[your first, middle, and last name initials]`
   - For example, if your name is Jane Marie Smith, you'd use `rock-of-ages-frontend-origin-jms`
   - The bucket name *must* be globally unique across all AWS accounts
   - If adding your initials doesn't create a unique bucket, add more characters or a short random string
   - The bucket name can only contain lowercase letters, numbers, dots, and hyphens
4. Confirm the region:
   - Make sure `us-east-2` (Ohio) is selected
   - All students should use the same region to ensure consistency
5. *Un*check: ☐ **Block all public access**
   - This is necessary because we want our website to be publicly accessible
   - You'll see a warning - this is normal when hosting public websites
   - Check the acknowledgment box
6. Scroll past the remaining configurations (leave them at default settings)
7. Click **Create bucket**

💡 **What's happening here?** You're creating a container in the cloud that will store all your website files. The unique name ensures nobody else's bucket will conflict with yours.

### 2. Enable Static Website Hosting

Now we need to tell AWS that this bucket will host a website:

1. Open the bucket you just created
2. Go to the **Properties** tab
3. Scroll to **Static website hosting**
4. Click **Edit**
5. Enable hosting: ☑︎ **Enabled**
6. Hosting type: **Host a static website**
7. Index document: `index.html`
8. Error document: `index.html`
   - Setting the error document to index.html is important for single-page applications like React
   - This ensures that routes handled by React Router will work correctly
9. Click **Save changes**

💡 **What's happening here?** You're configuring your bucket to serve files as a website rather than just a file repository. Setting the index and error documents tells S3 which file to serve when someone visits your site or encounters an error.

### 3. Set Public Read Bucket Policy

For our website to be publicly accessible, we need to set permissions:

1. Go to the **Permissions** tab → **Bucket policy** → Click **Edit**, then paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name-here/*"
    }
  ]
}
```
2. In the pasted json, replace `your-bucket-name-here` with your bucket name. (ex. *rock-of-ages-frontend-origin-jms*)
3. Click **Save changes**

💡 **What's happening here?** This policy grants public read access to all files in your bucket. The asterisk in "Principal": "*" means "anyone," and the Resource path with "/*" at the end means "all files in this bucket."

### 4. Building and Uploading Your Website Files

Now let's get your React application files ready and upload them to your bucket:

1. Open your terminal and navigate to your Rock of Ages client repository
2. Run the build command to create optimized production files:
   ```bash
   npm run build
   ```
3. This creates a `dist` folder containing all the files needed for your website
   - The `dist` folder (short for "distribution") contains optimized, minified versions of your code that are ready for production
   - These files will be served to users' browsers when they visit your website
   - The browser automatically requests and renders these files

4. Now, let's upload these files to your S3 bucket:
   - Return to your S3 bucket in the AWS Console
   - Click on the **Objects** tab
   - Click **Upload**
   - Click **Add files** and select the `index.html` file from your `dist` folder
   - Click **Add files** again and select the `vite.svg` file (if present)
   - Click **Add folder** and select the `assets` folder from your `dist` folder
   - Click **Upload**

💡 **What's happening here?** You're building an optimized version of your React application and uploading all the necessary files to your S3 bucket. These files will now be served when someone visits your website.

### 5. Testing Your Website

Let's make sure everything is working:

1. Go back to the **Properties** tab of your S3 bucket
2. Scroll down to **Static website hosting**
3. You'll see a **Bucket website endpoint** URL - something like:
   `http://rock-of-ages-frontend-origin-jms.s3-website.us-east-2.amazonaws.com`
4. Click on this URL to visit your website

Congratulations! Your Rock of Ages application is now live on the internet!

**Note:** This URL is your website's direct S3 endpoint. It works, but it's only available from the US-East-2 region and isn't optimal for global users. In the next module, we'll use CloudFront to distribute your site globally with better performance.

## What We've Accomplished

In this chapter, you've:
- Created an S3 bucket with a unique name
- Configured it for static website hosting
- Set permissions to make your website publicly accessible
- Built and uploaded your React application
- Accessed your live website via its S3 endpoint

You've successfully deployed your first application to the AWS cloud! In the next modules, we'll enhance this setup with CloudFront for better performance and GitHub Actions for automated deployments.