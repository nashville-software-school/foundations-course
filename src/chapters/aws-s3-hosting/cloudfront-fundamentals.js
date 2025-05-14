export const cloudfrontFundamentalsChapter = {
  id: 'cloudfront-fundamentals',
  title: 'CloudFront Fundamentals',
  sectionId: 'aws-s3-hosting',
  previousChapterId: 'hosting-nextjs',
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

## Creating and Configuring a CloudFront Distribution

### Step 1: Create a CloudFront Distribution

1. Sign in to the AWS Management Console
2. Navigate to the CloudFront service
3. Click "Create Distribution"
4. Choose your origin settings:
   - **Origin Domain**: Select your S3 bucket or custom origin
   - **Origin Path**: Optionally specify a directory path
   - **Origin Access**: Choose how CloudFront accesses your origin
   - **Origin Shield**: Optionally enable an additional caching layer
5. Configure cache behavior settings:
   - **Path Pattern**: Define which requests this behavior applies to
   - **Viewer Protocol Policy**: HTTP and HTTPS, redirect to HTTPS, or HTTPS only
   - **Allowed HTTP Methods**: GET/HEAD, GET/HEAD/OPTIONS, or All methods
   - **Cache Key and Origin Requests**: Control what CloudFront includes in the cache key
6. Configure distribution settings:
   - **Price Class**: Choose geographic coverage based on your budget
   - **WAF Web ACL**: Optionally associate a Web Application Firewall
   - **Alternate Domain Names (CNAMEs)**: Add custom domain names
   - **SSL Certificate**: Select a certificate for HTTPS connections
   - **Supported HTTP Versions**: HTTP/2, HTTP/3, etc.
   - **Default Root Object**: Specify a default file to serve (e.g., index.html)
7. Review and create the distribution

### Step 2: Configure Cache Behaviors

Cache behaviors allow you to configure different settings for different types of content:

- **Path Pattern**: Determines which requests use this cache behavior (e.g., /images/*)
- **Origin**: The source for this content
- **Viewer Protocol Policy**: How CloudFront handles HTTP and HTTPS requests
- **Cache Policy**: Controls the cache key and TTL settings
- **Origin Request Policy**: Controls what CloudFront includes in origin requests
- **Response Headers Policy**: Controls HTTP headers in responses

### Step 3: Configure Cache Policies

Cache policies determine what CloudFront includes in the cache key and how long content stays in the cache:

1. Go to the Policies tab in CloudFront
2. Click "Create cache policy"
3. Configure settings:
   - **Minimum TTL**: Shortest time objects stay in cache
   - **Maximum TTL**: Longest time objects stay in cache
   - **Default TTL**: Default time if no Cache-Control header
   - **Headers**: Which HTTP headers to include in the cache key
   - **Cookies**: Which cookies to include in the cache key
   - **Query Strings**: Which query strings to include in the cache key

## Integrating CloudFront with S3

CloudFront works seamlessly with S3 to deliver content with low latency worldwide.

### Benefits of Using CloudFront with S3

- **Improved Performance**: Reduces latency by serving content from edge locations
- **Cost Savings**: Reduces load on your origin and can lower data transfer costs
- **Enhanced Security**: Restricts direct access to S3 buckets
- **HTTPS Support**: Provides HTTPS support even if your origin doesn't
- **Field-level Encryption**: Adds an additional layer of security for sensitive data

### Setting Up CloudFront with S3

1. Create an S3 bucket and upload your content
2. Create a CloudFront distribution with the S3 bucket as the origin
3. Configure Origin Access Control (OAC) to restrict direct access to the S3 bucket
4. Update your S3 bucket policy to allow access from CloudFront
5. Use the CloudFront distribution domain name to access your content

### Example S3 Bucket Policy for CloudFront Access

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::your-account-id:distribution/your-distribution-id"
        }
      }
    }
  ]
}
\`\`\`

## CloudFront Security Features

CloudFront provides several security features to protect your content and applications:

### 1. HTTPS and TLS

- **Viewer HTTPS**: Secure connections between users and CloudFront
- **Origin HTTPS**: Secure connections between CloudFront and your origin
- **TLS Versions**: Control which TLS versions are supported
- **SSL/TLS Certificates**: Use AWS Certificate Manager (ACM) or import your own certificates

### 2. Access Control

- **Signed URLs**: Grant temporary access to specific files
- **Signed Cookies**: Grant temporary access to multiple restricted files
- **Origin Access Control (OAC)**: Restrict access to S3 origins
- **Geographic Restrictions**: Block or allow users based on country

### 3. Protection Features

- **AWS WAF Integration**: Filter malicious web traffic
- **AWS Shield Integration**: DDoS protection
- **Field-level Encryption**: Encrypt specific data throughout the system

## CloudFront Performance Optimization

### 1. Cache Optimization

- **Optimal TTL Settings**: Configure appropriate cache durations
- **Cache Key Management**: Include only necessary components in the cache key
- **Compression**: Enable compression for applicable content types
- **Origin Shield**: Add an additional caching layer to reduce origin load

### 2. Content Optimization

- **Object Invalidation**: Remove objects from edge caches when needed
- **Versioned Object Names**: Use unique names for updated content
- **Cache-Control Headers**: Set appropriate headers from your origin
- **Origin Failover**: Configure backup origins for high availability

### 3. Monitoring and Analytics

- **CloudFront Reports**: View usage, popular objects, and cache statistics
- **Real-time Logs**: Stream logs to Kinesis Data Streams for real-time analysis
- **Standard Logs**: Detailed logs delivered to an S3 bucket
- **CloudWatch Integration**: Monitor distribution metrics and set alarms

## Hands-on Exercise: Setting Up CloudFront for a Static Website

1. Sign in to the AWS Management Console
2. Navigate to the S3 service and ensure your static website is properly configured
3. Navigate to the CloudFront service and create a new distribution
4. Configure the distribution with the following settings:
   - Origin domain: Your S3 website endpoint
   - Origin access: Public
   - Viewer protocol policy: Redirect HTTP to HTTPS
   - Cache policy: CachingOptimized
   - Price class: Use only North America and Europe
   - Default root object: index.html
5. Create the distribution and wait for it to deploy
6. Test your website using the CloudFront domain name
7. Configure a custom domain name (optional):
   - Request or import an SSL certificate using AWS Certificate Manager
   - Add your domain name as an alternate domain name in the distribution
   - Update your DNS records to point to the CloudFront distribution

## Troubleshooting Common CloudFront Issues

### 1. Content Not Being Cached

- Verify cache behavior settings
- Check Cache-Control headers from your origin
- Ensure the request includes the correct cache key components

### 2. Origin Connection Issues

- Verify origin settings and accessibility
- Check security group and network ACL settings
- Ensure your origin server can handle the traffic

### 3. HTTPS Configuration Problems

- Verify SSL/TLS certificate validity
- Ensure certificate covers all domain names
- Check viewer and origin protocol policies

### 4. Custom Domain Issues

- Verify DNS configuration
- Ensure the domain is added as an alternate domain name
- Check certificate coverage for the domain

## Best Practices for CloudFront

1. **Use appropriate cache policies** for different types of content
2. **Implement versioning** for static assets to improve cache efficiency
3. **Enable compression** for text-based content types
4. **Use Origin Shield** for origins with global viewers
5. **Implement proper security measures** like HTTPS, OAC, and signed URLs
6. **Monitor performance** using CloudFront and CloudWatch metrics
7. **Use real-time logs** for immediate visibility into distribution activity
8. **Implement origin failover** for critical content
9. **Optimize cache key** to include only necessary components
10. **Use Lambda@Edge or CloudFront Functions** for customized content delivery

In the next chapter, we'll explore how to automate the deployment of your website to S3 and CloudFront using CI/CD with GitHub Actions.`,
  exercise: null
};