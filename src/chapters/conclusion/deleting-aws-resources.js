export const deletingResourcesChapter = {
  id: "deleting-resources",
  title: "Deleting AWS Resources",
  sectionId: "conclusion",
  previousChapterId: "summary",
  content: `Amazon web services cost money and now that you have completed the course, it is time to delete the resources you've created to reduce the cost to NSS. That we have more "resources" to continue providing these workshops to future students.

### Cloudfront Distribution

1. In the AWS console, navigate to CloudFront. 

2. Select your distribution and click Disable.

3. Once the Status has been updated to Disabled, select your distribution and click Delete.


### s3 Bucket

1. In the AWS console, navigate to s3. 

2. Select your bucket and click delete


### Github IAM User 

1. In the AWS console, navigate to IAM (just IAM, not IAM Identity Center). 

2. On the left hand side click Users.

3. Select gh_user and click Delete

`,
  exercise: null,
}