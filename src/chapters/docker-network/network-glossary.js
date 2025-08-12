export const dockerNetworkGlossaryChapter = {
  id: 'docker-network-glossary',
  title: 'Glossary',
  sectionId: 'docker-network',
  previousChapterId: "workshop3-understanding-docker-network", 
  content: `

| Term | Description |
|------|-------------|
| **Docker Network** | A virtual bridge that allows multiple containers to communicate with each other using container names as hostnames. |
| **Container Isolation** | The default behavior of Docker where containers cannot access each other’s network, filesystem, or environment unless explicitly configured. |
| **Container Name as Hostname** | In a shared Docker network, containers can reach each other using their given names (e.g., \`db-container\` for the database). |
| **GitHub Codespaces** | A GitHub feature that provides pre-configured, container-based cloud development environments for rapid, consistent onboarding. |
| **Dev Containers** | A standardized container-based development environment, defined with configuration files and supported by tools like VS Code. |
| **docker network create** | A command used to create a named Docker network that can be shared among containers to allow communication. |
| **Production Parity** | The practice of keeping local development environments as similar as possible to production, minimizing surprises during deployment. |

`,
};
