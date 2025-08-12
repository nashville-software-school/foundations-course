export const dockerGlossaryChapter = {
  id: 'docker-glossary',
  title: 'Glossary',
  sectionId: 'intro-to-docker',
  previousChapterId: 'dockerfile-breakdown',
  content: `## Docker Glossary

  This glossary provides definitions for key terms introduced in the Docker modules.

| Term | Description |
|------|-------------|
| **Docker** | A platform for developing, shipping, and running applications inside lightweight, portable containers that work consistently across different environments. |
| **Container** | A running instance of a Docker image. Containers are isolated environments that bundle an application with its runtime, dependencies, and configuration. |
| **Image** | A snapshot of an application and its environment. Images are built from Dockerfiles and used to create containers. |
| **Dockerfile** | A text file containing instructions for building a Docker image. It defines the base image, installs dependencies, copies files, and specifies how the container should run. |
| **Docker Hub** | A public or private registry where Docker images can be stored and shared. It functions like GitHub but for container images. |
| **Build** | The process of creating a Docker image from a Dockerfile using the \`docker build\` command. |
| **Run** | The process of starting a container from a Docker image using the \`docker run\` command. |
| **Volume** | A Docker feature that allows containers to persist data or share data between the host system and other containers. |
| **Port Mapping** | A method of exposing a container's internal ports to the host system, allowing services inside the container to be accessed from outside (e.g., \`-p 3000:80\`). |
| **WORKDIR** | A Dockerfile instruction that sets the working directory for all subsequent instructions inside the image. |
| **CMD** | A Dockerfile instruction that defines the default command to run when the container starts. |
| **ENTRYPOINT** | A Dockerfile instruction that defines a command that will always run in the container, even if additional arguments are provided at runtime. |
| **EXPOSE** | A Dockerfile instruction that documents the port the container intends to use. It does not actually publish the port unless specified during \`docker run\`. |
| **Layer** | Each instruction in a Dockerfile creates a new layer in the image. Docker caches these layers to make builds faster and more efficient. |
| **Tag** | A label used to version or identify Docker images (e.g., \`node:18-alpine\` or \`myapp:latest\`). |
| **Context** | The set of files available to Docker when building an image, usually defined as the directory passed to \`docker build\`. |
| **Container Registry** | A storage system for container images, such as Docker Hub, GitHub Container Registry, or Amazon ECR. |
| **Base Image** | The starting point for a Docker image, such as \`node:alpine\` or \`ubuntu:20.04\`, which provides the OS and language runtime. |

## Further Learning Resources!

### Full Beginner Course on Docker
<iframe width="560" height="315" src="https://www.youtube.com/embed/3c-iBn73dDE?si=3xT6M9OeeScAnr_v" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


`,
  exercise: null
};