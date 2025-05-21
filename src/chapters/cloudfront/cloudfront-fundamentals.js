export const cloudfrontFundamentalsChapter = {
  id: "cloudfront-fundamentals",
  title: "CloudFront Fundamentals",
  sectionId: "cloudfront",
  previousChapterId: null,
  content: `## What is Amazon CloudFront?

Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency and high transfer speeds. CloudFront works seamlessly with other AWS services like S3, EC2, and Elastic Load Balancing, as well as with non-AWS origin servers.

<iframe width="560" height="315" src="https://www.youtube.com/embed/AT-nHW3_SVI?si=Or4OLxn-IEdqFMq7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Key Features of CloudFront

- **Global Edge Network**: Delivers content through 410+ Points of Presence (PoPs) in 90+ cities across 48 countries
- **High Performance**: Reduces latency by serving content from locations closest to users
- **Security**: Provides built-in DDoS protection and integrates with AWS Shield and AWS WAF
- **Programmable**: Customizable with Lambda@Edge and CloudFront Functions
- **Cost-effective**: Pay-as-you-go pricing with no upfront fees
- **Easy to use**: Simple to set up and integrate with other AWS services
- **Highly customizable**: Extensive configuration options for content delivery optimization

## How CloudFront Works

CloudFront delivers content through a worldwide network of data centers called edge locations. When a user requests content that you're serving with CloudFront, the request is routed to the edge location that provides the lowest latency.

### CloudFront Distribution Workflow

1. **User makes a request**: A user requests your content via your website or application
2. **DNS routes to the nearest edge location**: CloudFront uses DNS to route the request to the edge location that can best serve the user's request
3. **CloudFront checks its cache**: The edge location checks if the requested content is already cached
4. **If cached**: The content is immediately delivered to the user
5. **If not cached**: CloudFront forwards the request to your origin server (e.g., S3 bucket)
6. **Origin returns content**: Your origin server sends the content back to the edge location
7. **CloudFront caches the content**: The edge location caches the content for future requests
8. **Content is delivered to the user**: The content is delivered to the user who requested it

### CloudFront Terminology

- **Distribution**: The basic CloudFront configuration unit that defines how content should be delivered
- **Origin**: The source of the content that CloudFront will distribute (e.g., S3 bucket, EC2 instance)
- **Cache Behavior**: Rules that determine how CloudFront handles requests for different types of content
- **TTL (Time to Live)**: The amount of time content stays in the CloudFront cache before CloudFront forwards another request to the origin
- **Invalidation**: The process of removing content from CloudFront edge caches before it expires
- **Edge Location**: A data center where CloudFront caches copies of your content
- **Regional Edge Cache**: A CloudFront location that sits between your origin server and the edge locations
`,
  exercise: null,
}
