export const deletingResourcesChapter = {
  id: "deleting-resources",
  title: "Deleting AWS Resources",
  sectionId: "conclusion",
  previousChapterId: "summary",
  content: `Amazon web services cost money and now that you have completed the course, it is time to delete the resources you've created in order to reduce the cost to NSS. That way we have more "resources" to continue providing these workshops to future students.

## IMPORTANT! If you intend to go on to workshop 2, do not delete your cloudfront distribution and s3 bucket. Only delete the IAM user.

### Cloudfront Distribution

1. In the AWS console, navigate to CloudFront. 

2. Select your distribution and click Disable.

3. Once the Status has been updated to Disabled, select your distribution and click Delete.


### s3 Bucket

1. In the AWS console, navigate to s3. 

2. Select your bucket and click empty. Follow the prompts to empty your bucket. Amazon requires the bucket to be empty before deletion.

2. Select your bucket and click delete


### Github IAM User 

1. In the AWS console, navigate to IAM (just IAM, not IAM Identity Center). 

2. On the left hand side click Users.

3. Select gh_user and click Delete (This will render the security credentials you saved in your github secrets useless. Feel free to delete and clean those up as well.)


`,
  exercise: null,
}