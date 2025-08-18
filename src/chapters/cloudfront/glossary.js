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
| **Price Class** | A setting that determines which geographic regions CloudFront will use to distribute your content. |



## Further Learning Resources!
### Custom URLs and DNS (Domain Name System)

We realize that many of you may be curious about how to host your application using a custom URL. This was outside of the learning objectives for this course but it is possible by using a DNS web service such as Amazon Route53. Just be aware of the extra costs associated with registering a domain name with Route53.
<iframe width="560" height="315" src="https://www.youtube.com/embed/10JKpg-eqZU?si=RFRHSA56t8k50nHQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

And, of course, you can incorporate Amazon Route53 with CloudFront and s3 static website hosting! Here is a tutorial on a slightly more complex version of what we have built demonstrating just that.

<iframe width="560" height="315" src="https://www.youtube.com/embed/mls8tiiI3uc?si=xmlHGdPI6BF2aVfF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


### HTTPS and SSL Certificates
If you remember, during the Cloudfront chapter we had to make sure to update the URL to use HTTP, even though Cloudfront supports HTTPS. This is because our React client is calling our backend API at an HTTP endpoint which causes the initial HTTPS to fail. We could update our API endpoint to use HTTPS but that would require attaching an SSL certificate to the domain which would create too much complexity in our later workshops for most beginner students. Feel free to deep dive into these topics on your own!
<iframe width="560" height="315" src="https://www.youtube.com/embed/j9QmMEWmcfo?si=xnYnwPVT8uTG6YXw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

`,
  exercise: null,
}
