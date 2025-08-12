export const cicdGlossaryChapter = {
  id: 'ec2-cicd-glossary',
  title: 'Glossary',
  sectionId: 'cicd-ec2-docker',
  previousChapterId: 'ci-cd-artifact-breakdown',
  content: `## Advanced CI/CD Glossary

This glossary expands on key concepts introduced in the advanced CI/CD module, particularly around Docker-based workflows and AWS integrations.

| Term | Description |
|------|-------------|
| **Artifact** | A file or bundle (e.g., compiled binary, Docker image tarball) generated during a CI job and passed to later jobs using GitHub Actions' \`upload-artifact\` and \`download-artifact\` features. Used to share data across isolated jobs. |
| **SSM (AWS Systems Manager)** | A secure AWS service that allows remote command execution, patching, and instance management **without needing SSH access**. In CI/CD, SSM enables safe deployments to EC2 without opening ports. |
| **workflow_dispatch** | A GitHub Actions trigger that allows you to manually start a workflow through the GitHub UI or API. Useful for controlled, intentional deployments. |
| **needs** | A GitHub Actions keyword that defines job dependencies. It ensures jobs run in a specific order — e.g., don’t run the \`push\` job unless the \`test\` job succeeds. |
| **Docker Image** | A snapshot of a containerized application that includes the app, dependencies, environment, and instructions. Built once and can be run on any machine with Docker. |
| **Build Once, Run Anywhere** | A core principle of Docker and containerization that ensures the same image works across different environments (e.g., dev, test, prod). |
| **Manual Deployment** | A deployment triggered intentionally by a person, often using \`workflow_dispatch\`. Preferred for production workflows where automation needs to pause for approval or verification. |
| **Job Separation** | The CI/CD practice of splitting build, test, and deploy tasks into distinct jobs. Improves visibility, rerun control, and modularity. |
| **ECR (Elastic Container Registry)** | AWS's Docker-compatible registry service where you can push and pull container images. Used to store production-ready Docker images. |
| **OpenID Connect (OIDC)** | An authentication mechanism that allows GitHub Actions to assume AWS IAM roles securely **without storing static secrets**. Enables temporary, scoped access. |
| **Conditional Execution** | Workflow design where one job only runs if another completes successfully. Prevents untested or broken code from being deployed. |
| **Container Registry** | A repository for storing and distributing container images (e.g., Docker Hub, AWS ECR). |
| **Secure Deployment** | A deployment strategy that avoids static secrets, uses limited access roles, and leverages encrypted communications like SSM or OIDC. |

## Further Learning Resources!

### Expanding on CICD
<iframe width="560" height="315" src="https://www.youtube.com/embed/AknbizcLq4w?si=qupUBBwHjGWjNRXe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`,
  exercise: null
};