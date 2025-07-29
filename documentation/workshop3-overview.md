# Workshop 3 Overview

## Outline

### Part 1: Cloud Database (RDS)

- Set up AWS RDS PostgreSQL instance
- Modify API to connect to RDS instead of SQLite
- Update GitHub Actions and secrets for RDS connection
- Deploy updated API to EC2

### Part 2: Local Development with Docker Network

- **Why**: Mimic production environment locally
- Containerize React client (development server)
- Run all three containers in a Docker network
- Learn container-to-container communication
- Manual container orchestration

### Part 3: Docker Compose Optimization

- **Why**: Simplify the multi-container setup
- Convert manual Docker network to docker-compose.yml
- One command to start entire development environment
- Using Dev Containers extension for debugging
- Learn benefits of orchestration tools

## Key Learning Objectives

### Database in the Cloud:

- RDS setup and configuration
- Environment variables for database connection
- Separating development and production databases

### Container Networking:

- Docker networks for multi-container apps
- Container-to-container communication
- Port mapping vs internal networking

### Development Environment:

- Mimicking production in development
- Container orchestration concepts
- Docker Compose benefits and usage

