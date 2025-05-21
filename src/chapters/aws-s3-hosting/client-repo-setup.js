export const clientRepoSetupChapter = {
  id: "client-repo-setup",
  title: "Setting up the Client",
  sectionId: "aws-s3-hosting",
  previousChapterId: null,
  content: `## What We're Building

In this workshop, we'll deploy the Rock of Ages client application to the cloud using AWS services. By the end of this workshop, you'll have a functioning React frontend application running in the cloud, accessible to users anywhere in the world!

### Our Deployment Goal

Before diving into the details, let's understand the big picture of what we're building:

1. **Frontend Hosting with Amazon S3**: We'll store our React application files in an S3 bucket, which serves as a simple, scalable storage solution.

2. **Content Delivery with CloudFront**: We'll set up CloudFront as a content delivery network (CDN) to serve our application faster to users around the world.

3. **Automated Deployment with GitHub Actions**: We'll create a CI/CD pipeline that automatically builds and deploys our application whenever we make changes to our code.

Think of it like this:
- S3 is like a storage unit where we'll keep our application files
- CloudFront is like a global network of delivery trucks that quickly get those files to users
- GitHub Actions is like an automated assembly line that packages and updates our application

Throughout the workshop, we'll learn the details of each of these components, but for now, let's focus on getting our application code ready.

## Getting the Repo

For this workshop, we'll be using a pre-built React application created with Vite. Follow these steps to get your own copy of the code:

1. Visit the repository at [https://github.com/NSS-Workshops/rock-of-ages-client](https://github.com/NSS-Workshops/rock-of-ages-client)

2. Click the "Fork" button in the top-right corner to create your own copy of the repository

3. Once forked, clone your repository to your local machine:
   \`\`\`bash
   git clone https://github.com/YOUR-USERNAME/rock-of-ages-client.git
   cd rock-of-ages-client
   \`\`\`

4. Install the dependencies:
   \`\`\`bash
   npm install
   \`\`\`

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to see the application running

### Exploring the Application

This is a simple Rock of Ages fan site where users can:
- Login or Register
- View all rocks
- Collect a rock
- View their rocks
- Delete a rock
- Logout

Take a few minutes to explore the application by following the **Testing the application** instructions in the README. Don't worry about the implementation details of the React application itself. Our focus in this workshop is on deploying the application to the cloud, not on developing the application.

Now that we have our application running locally, we're ready to learn about Amazon S3 in the next chapter.`,
  exercise: null,
}
