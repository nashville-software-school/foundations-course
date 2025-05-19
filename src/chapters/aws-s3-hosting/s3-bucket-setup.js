export const s3BucketSetupChapter = {
  id: "s3-bucket-setup",
  title: "Setting up the S3 Bucket",
  sectionId: "aws-s3-hosting",
  previousChapterId: "s3-fundamentals",
  content: `## Creating and Configuring S3 Buckets

### 1. Creating an S3 Bucket
[NOTE: The steps here are perfect]
[TODO: Add beginner-friendly explanation of the "what" and "why" here]
1. Navigate to the **[S3 Console](https://us-east-2.console.aws.amazon.com/s3/get-started?region=us-east-2)**
2. Click **Create bucket**
3. Create a unique bucket name:
   - Set the name to \`rock-of-ages-frontend-origin-[your first, middle, and last name initials]\`
   - The bucket name *must* be globally unique, so if adding your initials does not create a unique bucket, add more characters. 
   - The bucket name can only contain lowercase letters, numbers, dots, and hyphens
4. Confirm the region:
   - Make sure \`us-east-2\` (Ohio) is selected
5. *Un*check: ☐ **Block all public access**
   - Acknowledge the warning
6. Scroll past the remaining configurations
7. Click **Create bucket**

### 2. Enable Static Website Hosting
[NOTE: The steps here are perfect]
[TODO: Add beginner-friendly explanation of the "what" and "why" here]
1. Open the bucket
2. Go to the **Properties** tab
3. Scroll to **Static website hosting**
4. Click **Edit**
5. Enable hosting: ☑︎ **Enabled**
6. Hosting type: **Host a static website**
7. Index document: \`index.html\`
8. Error document: \`index.html\`
9. Click **Save changes**

### 3. Set Public Read Bucket Policy
[NOTE: The steps here are perfect]
[TODO: Add beginner-friendly explanation of the "what" and "why" here]
1. Go to the **Permissions** tab → **Bucket policy** → Click **Edit**, then paste:

\`\`\`json
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
\`\`\`
2. In the pasted json, replace \`your-bucket-here\` with your bucket name. (ex. *rock-of-ages-frontend-origin-vbf*)
3. Click **Save changes**

[TODO: Complete the following instructions by adding formatting and fleshing out the wording of each step. The steps are correct and are all accounted for, they just need to be written better.]
[TODO: Add beginner-friendly explanation of the "what" and "why" for all of the following]

Open the repo in your terminal and run \`npm run build\` to create the list [briefly explain what the dist folder is/is for]

Click on Objects
Click on Upload
Add files > go to repo > dist > add index.html and cite.svg
Add folder > go to repo > dist > add assets 
Click Upload 

Click on Properties
Scroll down to Static Website hosting
Here’s your site url for testing
Test it out
This is not your production url [briefly explain why and how this is only available in the us-east-2 region], next we will use cloud front to globally distribute your site
`,
  exercise: null,
}
