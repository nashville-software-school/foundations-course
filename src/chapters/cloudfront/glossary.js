export const cloudfrontGlossaryChapter = {
  id: "cloudfront-glossary",
  title: "CloudFront Glossary",
  sectionId: "cloudfront",
  previousChapterId: "cloudfront-setup",
  content: `
This glossary provides definitions for key terms introduced in the CloudFront module.

| Term | Description |
|------|-------------|
| **CloudFront** | Amazon's Content Delivery Network (CDN) service that speeds up distribution of static and dynamic web content to users worldwide. |
| **CDN (Content Delivery Network)** | A system of distributed servers that deliver web content to users based on their geographic location. |
| **Distribution** | The main CloudFront configuration that defines how content should be delivered to users, including origin settings and caching rules. |
| **Edge Location** | A data center where CloudFront caches your content for faster delivery to nearby users. Part of AWS's global infrastructure. |
| **Origin** | The source of your content (in our case, the S3 bucket) that CloudFront pulls from to populate its edge locations. |
| **Cache** | A temporary storage location at edge locations where CloudFront keeps copies of your content for faster delivery. |
| **Cache Policy** | Rules that determine how long CloudFront keeps content in its cache before checking the origin for updates. |
| **Domain Name** | The URL assigned to your CloudFront distribution (e.g., d1a2b3c4d5e6f7.cloudfront.net) that users use to access your content. |
| **HTTPS** | A secure protocol for transmitting data over the internet, automatically provided by CloudFront for all distributions. |
| **Compression** | The automatic process of making files smaller before sending them to users, improving load times. |
| **Origin Shield** | An optional additional caching layer between CloudFront's edge locations and your origin. |
| **Price Class** | A setting that determines which geographic regions CloudFront will use to distribute your content. |`,
  exercise: null,
}
