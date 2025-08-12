export const advancedCicdWithDockerChapter = {
  id: 'advanced-cicd-docker',
  title: 'Advancing CICD Concepts',
  sectionId: 'cicd-ec2-docker',
  previousChapterId: null,
  content: `## Upgrading from Simple Workflows to Production-Ready CI/CD

In our earlier CI/CD workflow, we kept things simple — run tests whenever code changes, using GitHub Actions and your raw application environment.

Check out the [CI/CD Fundamentals]( ./cicd-fundamentals) from the first workshop for a refresher.

In this chapter, we take a **big step forward**:  separating responsibilities, containerizing the app, and introducing manual deployment control. These additions reflect what you’ll find in real-world engineering teams and production systems.


### 🧱 Job Separation

Instead of one big job that builds, tests, and deploys, we will now use **two distinct jobs**:

- One to run tests  
- One to build and push the Docker image


This separation gives us:

- ✅ **Better visibility**
- 🔁 **Rerun only what’s needed**
- 🚨 **Early failure detection**
- 🧩 **More flexibility**


### 🖱️ Manual Deployment Workflow

We also introduce a **manual GitHub Actions workflow** to deploy to EC2 via **AWS Systems Manager (SSM)**.

Benefits:
- ✅ Doesn’t require SSH or open ports
- ✅ Safer and auditable
- ✅ Only deploy when ready — ideal for production or staging control

This gives developers **intentional, secure deployment triggers** that don’t rely on automation alone.


### 🧠 Why This Workflow Structure Matters

Let’s unpack the *why* behind this structure — and why it’s the industry-preferred pattern for Docker-based pipelines.


#### ✅ 1. Separation of Concerns (Clarity & Modularity)

Each job does one thing: **test**, or **build/push**.

- Easier to debug — if tests fail, you don’t need to sift through push logs  
- Jobs can be rerun independently  
- Aligns with the idea of “stages” in a factory — testing shouldn’t happen after shipping


#### ✅ 2. Conditional Execution = Safety

- Jobs run in a **controlled order**  
- \`build-and-push\` depends on \`test\`, so if tests fail, the Docker image won’t be built or published  
- Prevents broken code from reaching production


#### ✅ 3. Secure AWS Access via OIDC

- No AWS secrets in your repo  
- Uses GitHub’s **OpenID Connect (OIDC)** to assume a role securely  
- Scope credentials only to jobs that need them (like \`push\` or \`deploy\`)


#### ✅ 4. GitHub-native Workflow Design

- Uses built-in features like \`needs\` and \`workflow_dispatch\` 
- Fully compatible with GitHub's ecosystem  
- Encourages scalable, maintainable automation


#### ✅ 5. AWS ECR Compatibility

- AWS ECR expects tested, production-ready images  
- This pattern ensures you’re only pushing **validated containers**  
- Makes integration with ECS, Lambda, or Fargate more seamless


### 🔁 TL;DR: Why It’s Ideal for Modern Pipelines

| Feature | Why it matters |
|--------|----------------|
| 🔐 **Secure AWS access** | Uses short-lived credentials (OIDC), no secrets |
| 🧪 **Test before deploy** | Ensures only clean images reach ECR |
| 🧱 **Job separation** | Easier to manage, test, and debug |
| 💡 **GitHub-native design** | Scalable, reliable, and maintainable |

📝 Real-World Tip:

Many engineering teams separate their CI (test/build) and CD (deploy) pipelines. This separation allows different teams to control deployments, implement approval gates, and reduce risks — all while keeping the CI pipeline fast and automated.

In your Development career you'll see teams approach CI/CD in different ways. Its really up to each team to figure out what practices to include in their CI/CD pipelines based on what works best for them and what the company policies are. For example, some teams deploy as soon as changes are merged while others have deployments scheduled on certain days so that they can more closely monitor any issues. Does your team want to include linting/code coverage/integration tests? etc. Here is an example of CI/CD planning. Don't worry about fully understanding all of the steps he is talking about in the video. The idea is to get a feel for how many options there are when designing pipelines. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/KnSBNd3b0qI?si=NU_jgREdjxGWDETO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### 📚 Up Next

In the next chapter, we’ll walk through how to set up github actions for the rock-of-ages-api using these more advanced concepts. 
`,
  exercise: null,
};
