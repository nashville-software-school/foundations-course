export const dockerComposeGlossaryChapter = {
  id: "compose-glossary",
  title: "Glossary",
  sectionId: "docker-compose",
  previousChapterId: "workshop3-dev-containers-setup",
  content: `

This glossary provides definitions for key terms introduced in the Docker Compose and Dev Containers module.

| Term | Description |
|------|-------------|
| **Docker Compose** | A tool for defining and running multi-container Docker applications using a YAML file. Instead of managing containers individually with lengthy \`docker run\` commands, you describe your entire application stack in a single \`docker-compose.yml\` file. |
| **Services** | In Docker Compose, services are the different components of your application (like database, API, client). Each service can be built from a Dockerfile or use a pre-built image from Docker Hub. |
| **docker-compose.yml** | The configuration file that describes all your services, networks, and volumes. This is your "infrastructure as code" for development environments. |
| **Volume Mounts** | A way to share files and directories between your host machine and containers. In Docker Compose, volume mounts enable live code synchronization without rebuilding images. |
| **Health Checks** | Docker Compose feature that monitors whether a service is ready to accept connections. Used to ensure databases are fully started before dependent services try to connect. |
| **Service Dependencies (depends_on)** | Docker Compose configuration that controls the startup order of services. Services wait for their dependencies to be healthy before starting. |
| **Dev Containers** | A VS Code extension that lets you develop inside Docker containers. Your IDE runs inside the container, giving you the same debugging experience as local development. |
| **devcontainer.json** | Configuration file that tells VS Code how to connect to and set up a development container, including which extensions to install and how to configure the environment. |
| **overrideCommand** | A Dev Container setting that prevents the automatic command from docker-compose.yml from running, giving you manual control over when to start services. |
| **Infrastructure as Code** | Defining your development environment setup in code (docker-compose.yml) rather than manual setup instructions, making it reproducible and version-controlled. |`,
  exercise: null,
}
