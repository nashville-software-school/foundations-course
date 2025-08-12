export const ec2GlossaryChapter = {
  id: 'ec2-glossary',
  title: 'Glossary',
  sectionId: 'ec2',
  previousChapterId: "ec2-setup",
  content: `## EC2 Glossary

  This glossary provides definitions for key terms introduced in the EC2 module.

| Term | Description |
|------|-------------|
| **EC2 (Elastic Compute Cloud)** | A core AWS service that provides resizable virtual servers (instances) in the cloud. |
| **Instance** | A virtual machine running on AWS. You control its OS, configuration, and software. |
| **AMI (Amazon Machine Image)** | A pre-configured image that defines the OS and base software for an instance. Common choices include Amazon Linux, Ubuntu, and Windows. |
| **Instance Type** | Defines the hardware resources (CPU, memory, network performance) for an EC2 instance. Examples: \`t2.micro\`, \`t3.medium\`. |
| **Key Pair** | A set of cryptographic keys used to securely access an instance via SSH. You download the private key when creating the pair. |
| **SSH (Secure Shell)** | A protocol used to securely log in to remote machines. EC2 supports SSH login using your key pair. |
| **Security Group** | A virtual firewall that controls inbound and outbound traffic to your EC2 instance. Rules define which ports and IPs are allowed. |
| **Elastic IP** | A static public IP address you can associate with an EC2 instance, ensuring it has a consistent address even after restarting. |
| **User Data** | An optional script that runs automatically when an instance launches. Useful for automating setup tasks like installing Docker. |
| **EBS (Elastic Block Store)** | Persistent disk storage attached to an instance. Stores your operating system, application files, and data. |
| **Public IP** | An IP address assigned to your EC2 instance that allows it to be accessed over the internet. Can change if the instance is stopped. |
| **Private IP** | An internal IP address used for communication within a VPC (not exposed to the public internet). |
| **Terminate** | The action of permanently deleting an EC2 instance. Unlike stopping, this cannot be undone. |
| **Stop** | A command that shuts down an instance while preserving its attached storage and configuration. |
| **Start** | A command that powers on a stopped EC2 instance, restoring its previous state (but possibly changing the public IP). |
| **Lambda** | A serverless compute service that lets you run code without provisioning or managing servers. You only pay for the compute time your code uses. |
| **ECS (Elastic Container Service)** | A container orchestration service used to run and manage Docker containers at scale on AWS. |
| **Fargate** | A serverless compute engine for ECS and EKS that allows you to run containers without managing EC2 instances. |
| **VM (Virtual Machine)** | A software emulation of a physical computer. EC2 instances are examples of VMs running in the AWS cloud. |
| **CPU (Central Processing Unit)** | The processing power of a virtual machine. Instance types define how many vCPUs are allocated. |
| **Memory (RAM)** | Temporary working storage for applications running on a VM. Determines how much data can be held in memory at once. |

## Further Learning Resources!

### Autoscaling on EC2
Autoscaling and load balancing are not learning objectives for this course. However, if working with AWS at a job in the future you will likely encounter these concepts. Please don't try to implement autoscaling on your NSS accounts.
<iframe width="560" height="315" src="https://www.youtube.com/embed/cf9jQc4xzpo?si=aHV86j9kgAyyTg0E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

`,
  exercise: null
};