export const cloudfrontSetupChapter = {
  id: "cloudfront-setup",
  title: "CloudFront Setup",
  sectionId: "cloudfront",
  previousChapterId: "cloudfront-fundamentals",
  content: `## Creating and Configuring a CloudFront Distribution

### 1. Go to the CloudFront Console

- Visit [https://console.aws.amazon.com/cloudfront](https://console.aws.amazon.com/cloudfront)
- Click **Create Distribution**
### 2. Configure the Origin

- Select **Single website or app** 
- **Origin domain**: Select your bucket name (ex. \`rock-of-ages-frontend-origin-jms.s3-website.us-east-2.amazonaws.com\` 
- A yellow warning box should appear below , click the > **Use website endpoint** button
-  Select protocol **HTTP only**
- Make sure Enable Origin Shield is set to **No**

### 3. Set Default Behavior

- **Compress objects automatically**: ☑︎ Yes
- **Viewer Protocol Policy**: \`HTTP and HTTPS\`
- **Allowed HTTP Methods**: \`GET, HEAD\`
- **Cache Policy**: Leave as \`CachingOptimized\` 

### 4. ## Web Application Firewall (WAF)
- Select **Do not enable security protections**
### 5. Configure Distribution Settings

- **Price Class**: Choose based on geographic reach (e.g., \`Use Only US, Canada and Europe\` to reduce cost)
- **Alternate domain name (CNAME)**: Leave blank

Click **Create Distribution**

### 6. Wait for Distribution to Deploy

- Takes ~5–15 minutes
- You'll get a **Domain Name** like: https://dsjkhfsdjkfhdsk.cloudfront.net

### 7. Access Your Site via CloudFront

Visit your CloudFront URL listed under the General / Details /  Distribution domain name like:
	https://dsjkhfsdjkfhdsk.cloudfront.net

✅ Your site will now be globally cached and securely served over HTTPS

## ❓ Why Access the Site via CloudFront and Not S3 Directly

| Feature                 | S3 Website URL                    | CloudFront URL                             |
| ----------------------- | --------------------------------- | ------------------------------------------ |
| 🔒 HTTPS secure support | ❌ No                              | ✅ Yes                                      |
| 🚀 Global performance   | ❌ Regional only                   | ✅ Cached at edge locations worldwide       |
| 🔧 Custom domain & SSL  | ❌ Hard to configure               | ✅ Easy                                     |
| 📈 Analytics & logs     | ❌ Limited                         | ✅ Detailed access logs, monitoring options |
| 🎛 Fine-grained control | ❌ Limited headers/caching control | ✅ Full control via Cache/Origin policies   |
| 🔄 Version invalidation | ❌ Manual + slow cache expiration  | ✅ \`aws cloudfront create-invalidation\`     |

**CloudFront is a CDN (Content Delivery Network)**. It makes your static site:

- Faster for users anywhere in the world
- Served securely via HTTPS
- More customizable and production-ready`,
  exercise: null,
}
