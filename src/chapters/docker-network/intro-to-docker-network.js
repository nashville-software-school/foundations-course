export const introToDNChapter = {
  id: "workshop3-intro-to-docker-network",
  title: "Intro to Local Development with Docker",
  sectionId: "docker-network",
  previousChapterId: null,
  content: `

In Part 1, you successfully set up an AWS RDS PostgreSQL database and updated your Rock of Ages API to connect to it in production. Your API is now running on EC2, connected to RDS, and you have a complete cloud-based backend.

Now it's time to create a local development environment that mirrors your production setup. Instead of developing against your production database (which would be dangerous!), you'll run a complete development stack locally using Docker containers.

## What You're Building

You'll create a complete containerized development environment that includes:
- **PostgreSQL Database Container**: Local database for development (separate from your production RDS)
- **Django API Container**: Your backend API running locally but connecting to the local database
- **React Client Container**: Your frontend application for testing the complete stack

**The Goal**: Create a local development environment that mirrors your production architecture while keeping your data completely separate and safe.

## Why Containerize Your Development Environment?

### The Traditional Development Problem

**Before containerization**, when a new developer joined your team, they faced this setup nightmare:
1. Install the correct Node.js version for the React client
2. Install the correct Python version for Django
3. Install and configure PostgreSQL locally
4. Set up database users and permissions
5. Install system dependencies (different on every OS)
6. Deal with version conflicts between different projects
7. Spend hours debugging environment issues
8. Finally start coding (maybe)

**Result**: The dreaded "It works on my machine" syndrome and frustrated developers.

### The Container Solution

**With containerized development**:
1. Clone the repository
2. Run one command to start everything
3. Start coding immediately
4. Identical environment for every team member
5. No local software installation required
6. Easy to reset, experiment, or switch between projects

**Result**: Consistent, predictable development environment that mirrors production.

### Real-World Examples

This approach has become the industry standard:
- **GitHub Codespaces**: Built entirely on containerized development environments
- **Microsoft**: Actively promotes Dev Containers for all development teams
- **Open source projects**: Many major projects (including VS Code itself) use Dev Containers
- **Enterprise teams**: Standard practice for maintaining consistency across large development teams

---

## Understanding Docker Networks

Before we build our multi-container environment, let's understand how containers communicate with each other.

### Container Isolation by Default

By default, Docker containers are completely isolated - they can't see or communicate with each other. Think of it like having separate apartments in a building with no hallways connecting them.

\`\`\`bash
# These containers CAN'T communicate
docker run --name api-container django-api
docker run --name db-container postgres
\`\`\`

### Docker Networks: Creating Communication Channels

A Docker network is like adding hallways between apartments - containers on the same network can find and communicate with each other using their container names as addresses.

\`\`\`bash
# Create a network (the "hallway")
docker network create my-app-network

# Containers on the same network CAN communicate
docker run --name api-container --network my-app-network django-api
docker run --name db-container --network my-app-network postgres
\`\`\`

### Container-to-Container Communication

Within a Docker network, containers reach each other using **container names as hostnames**:

\`\`\`python
# In your API container's configuration
DATABASE_HOST = "db-container"  # Uses container name, not localhost!
\`\`\`

**Important**: Your React app JavaScript runs in your browser, not in the container, so it still uses \`localhost\` to reach the API. Only server-to-server communication uses container names.


    `,
  exercise: null,
}
