export const cicdGlossaryChapter = {
  id: 'cicd-glossary',
  title: 'CI/CD Glossary',
  sectionId: 'intro-to-cicd',
  previousChapterId: 'deployment-pipeline',
  content: `## CI/CD Glossary

This glossary provides definitions for key terms introduced in the CI/CD module.

| Term | Description |
|------|-------------|
| **Continuous Integration (CI)** | The practice of frequently integrating code changes into a shared repository, followed by automated building and testing, to find and address bugs quickly and improve software quality. |
| **Continuous Delivery (CD)** | An extension of CI that automatically deploys all code changes to a testing or staging environment after the build stage, ensuring code is always in a deployable state. |
| **Continuous Deployment** | An approach that goes beyond Continuous Delivery by automatically deploying every change that passes all stages of the production pipeline to production without human intervention. |
| **Pipeline** | A defined series of automated steps that code changes go through from development to production, typically including stages like build, test, and deploy. |
| **GitHub Actions** | GitHub's built-in CI/CD platform that allows you to automate software development workflows directly in your GitHub repository. |
| **Workflow** | In GitHub Actions, a configurable automated process defined in YAML files that runs one or more jobs and can be triggered by events in your GitHub repository. |
| **Runner** | A server that runs your GitHub Actions workflows, which can be hosted by GitHub or self-hosted on your own infrastructure. |
| **Job** | A set of steps in a workflow that execute on the same runner, allowing you to group related tasks together. |
| **Step** | An individual task that can run commands or actions as part of a job in a workflow. |
| **Action** | A reusable unit of code in GitHub Actions that can be used as a step in a workflow, often created to perform common tasks. |
| **Secrets** | Encrypted environment variables that you create in a repository or organization to store sensitive information like API keys or passwords. |
| **OIDC (OpenID Connect)** | A secure authentication protocol that allows identity providers (like GitHub) to authenticate users or systems directly. |
| **Cache Invalidation** | The process of telling a CDN to remove cached versions of content so users see the latest files. |
| **Env variable** | Short for "environment variable," env variables are key-value pairs used to pass configuration settings to programs and scripts. In workflows, the env: block defines these variables for jobs or steps. Environment variables allow dynamic, reusable configurations without hardcoding values in scripts or code. They can store information or configurable parameters, and are accessed using syntax like \${{ env.VARIABLE_NAME }} or $VARIABLE_NAME. Centralizing these values improves maintainability, readability, and security.|


## Further Learning Resources!
As you may know by now, there are a huge number of resources available to continue learning cloud and devops technologies. A good place to start is some of the trainings offered by [Amazon Skillbuilder](https://skillbuilder.aws/getstarted). There is a paid subscription plan available but it offers many trainings for free as well.
`,
  exercise: null
};