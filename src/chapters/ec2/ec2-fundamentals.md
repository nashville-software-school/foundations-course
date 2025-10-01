## EC2: Your Virtual Server in the Cloud

Up to now, you’ve worked in the cloud with high-level tools like Docker, ECR, and S3. These services are powerful — but they all need somewhere to run.

Enter **Amazon EC2** — the foundation of AWS compute. EC2 (Elastic Compute Cloud) gives you a virtual server in the cloud that you can start, stop, and connect to, just like a real machine. You choose the operating system, install software, open network ports, and deploy your application.

It’s your own computer — but hosted on AWS and scalable with a click.


## What Is Amazon EC2?

**Amazon EC2** is AWS’s Infrastructure-as-a-Service (IaaS) offering for compute. It lets you rent a virtual machine (called an **instance**) with a flexible choice of:
- Operating system (Linux, Ubuntu, Windows)
- Hardware resources (CPU, memory, storage)
- Network and security settings

You can use EC2 to host almost anything:
- A website or API
- A database
- A background worker or cron job
- A full backend platform with Docker containers


## Why Use EC2?

While services like Lambda, ECS, and Fargate abstract away the infrastructure, EC2 gives you:
- 🔧 **Full control**: You choose how the machine is configured and what runs on it.
- 🧩 **Customizability**: Install any language, framework, runtime, or package.
- 🕹️ **SSH Access**: Connect directly into the instance to run commands and debug.
- 🌍 **Internet-facing deployments**: With the right setup, your EC2 can serve websites and APIs globally.


## Key Concepts in EC2

There’s a bit more to launching a virtual machine than pushing a button. Here are the important terms to know before you spin one up:

| Term | Description |
|------|-------------|
| **Instance** | A virtual machine running on AWS. You control the OS, installed software, and networking. |
| **AMI (Amazon Machine Image)** | A snapshot/template of a system, including the operating system and any preinstalled packages. You choose one when launching an instance. |
| **Instance Type** | Defines the hardware resources (CPU, RAM, network performance). For example: `t2.micro` (small) or `m5.large` (medium). |
| **Key Pair** | Used for secure SSH login. You download a private key when you create the pair, and EC2 stores the public key. |
| **Security Group** | Acts as a firewall. You define what kind of traffic (like HTTP, HTTPS, or SSH) is allowed to reach your instance. |
| **Elastic IP** | A static, public IP address that you can associate with your instance, so its address doesn’t change when restarted. |
| **User Data** | A script that runs when the instance boots. Great for automatic setup tasks (like installing Docker or pulling from ECR). |
| **EBS Volume** | Elastic Block Store. A virtual hard drive attached to your instance to store files, logs, or database data. |


## EC2 vs. Other AWS Compute Options

AWS has a lot of services that run code — so why use EC2?

| Use Case | Best AWS Service |
|----------|------------------|
| Full control over OS and environment | EC2 |
| Auto-scaling container deployments | ECS or Fargate |
| Serverless code (event-driven) | Lambda |
| High-performance computing | EC2 (specialized instance types) |

If your app needs full control or if you’re deploying something like a Docker container, EC2 is often the right choice.


## What You’ll Be Doing with EC2

In this course, you’ll use EC2 to host the **Rock of Ages** backend.

Here’s what that journey looks like:

1. **Launch an EC2 instance**  
   Choose an Amazon Linux or Ubuntu image, an instance type (like `t2.micro`), and set up your key pair.

2. **Connect to your instance via SSH**  
   Use your terminal to securely log in to your EC2 machine.

3. **Install software**  
   Install Docker, and any other packages your app needs.

4. **Pull your container image from ECR**  
   Use the AWS CLI inside the EC2 instance to authenticate and pull your image.

5. **Run your app**  
   Start your container and expose the correct ports in your security group (e.g. port 8000 for your API).

Check out this video, it goes over some of the core concepts covered here and dives deeper into some of the options offered by EC2. Don't follow the instructions in the video, just watch and learn. You'll follow along with our instructions in the next chapter.

<iframe width="560" height="315" src="https://www.youtube.com/embed/YH_DVenJHII?si=jNRJE8yq8I9NBxcv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


## What We’ll Do Next

In the next chapter, you’ll:
- Create and configure your EC2 instance
- Log in securely using SSH
- Set up your environment with Docker
- Pull and run your containerized backend

With EC2, your app moves from development to cloud-hosted — giving you real infrastructure to deploy, monitor, and scale.

You’re about to step into full-stack cloud engineering — and it starts by launching your first instance.