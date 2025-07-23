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

# Draft Chapter

# Part 2: Local Development with Docker Network

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

```bash
# These containers CAN'T communicate
docker run --name api-container django-api
docker run --name db-container postgres
```

### Docker Networks: Creating Communication Channels

A Docker network is like adding hallways between apartments - containers on the same network can find and communicate with each other using their container names as addresses.

```bash
# Create a network (the "hallway")
docker network create my-app-network

# Containers on the same network CAN communicate
docker run --name api-container --network my-app-network django-api
docker run --name db-container --network my-app-network postgres
```

### Container-to-Container Communication

Within a Docker network, containers reach each other using **container names as hostnames**:

```python
# In your API container's configuration
DATABASE_HOST = "db-container"  # Uses container name, not localhost!
```

**Important**: Your React app JavaScript runs in your browser, not in the container, so it still uses `localhost` to reach the API. Only server-to-server communication uses container names.

---

## Step 1: Set Up Docker Network

### Create the Network
```bash
# Create a custom network for our development environment
docker network create rock-of-ages-network
```

### Verify Network Creation
```bash
# List all Docker networks
docker network ls

# You should see your new network in the list
```

**Understanding this step**: This network acts like a private virtual network where your containers can find each other by name, similar to how computers connect on an office network.

---

## Step 2: Set Up PostgreSQL Database Container

Instead of using your production RDS database for local development, you'll run PostgreSQL in a container. This gives you a clean, isolated database that you can reset, experiment with, or break without affecting production.

### Run PostgreSQL Container
```bash
docker run -d \
  --name postgres-db \
  --network rock-of-ages-network \
  -e POSTGRES_DB=rockofages \
  -e POSTGRES_USER=rockadmin \
  -e POSTGRES_PASSWORD=localpassword123 \
  -p 5432:5432 \
  postgres:15
```

**Understanding this command**:
- `-d`: Run in background (detached mode)
- `--name postgres-db`: Container name (other containers will use this to connect)
- `--network rock-of-ages-network`: Connect to our custom network
- `-e`: Set environment variables to configure PostgreSQL
- `-p 5432:5432`: Map port 5432 to your host (for database tools like pgAdmin)
- `postgres:15`: Use PostgreSQL version 15 image from Docker Hub

**About the environment variables**:
These `-e` flags are **creating new database configuration**:
- `POSTGRES_DB=rockofages`: **Creates** a database named "rockofages"
- `POSTGRES_USER=rockadmin`: **Creates** a user named "rockadmin"
- `POSTGRES_PASSWORD=localpassword123`: **Sets** the password for that user

**Can you customize these values?** Absolutely! You're defining the database configuration, not referencing something that already exists. Just make sure your API configuration (in the next step) uses the same values.

### Verify Database is Running
```bash
# Check container status
docker ps

# Check database startup logs
docker logs postgres-db
```

**Expected output from `docker logs postgres-db`:**
```
The files belonging to this database system will be owned by user "postgres"...
PostgreSQL init process complete; ready for start up.

2024-01-15 10:30:45.123 UTC [1] LOG:  starting PostgreSQL 15.5 on x86_64-pc-linux-gnu
2024-01-15 10:30:45.124 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2024-01-15 10:30:45.135 UTC [56] LOG:  database system is ready to accept connections
```

**✅ Success indicators to look for:**
- "PostgreSQL init process complete; ready for start up"
- "database system is ready to accept connections"
- No error messages about authentication or connection failures

---

## Step 3: Set Up API Container for Local Development

Now you'll configure your API to connect to the local PostgreSQL container instead of your production RDS database.

### Understanding Environment Variables: Local vs Production

In Part 1, you learned how environment variables keep database secrets safe and separate from code. Now you'll see how this pattern enables using **different databases for different environments** without changing any application code.

**Quick Recap**: Environment variables solve the problem of:
- Keeping secrets separate from code
- Using different configurations for different environments
- Sharing code safely without exposing passwords

**The Two-Environment Pattern**:

**Production Environment (GitHub Secrets → Docker)**:
```bash
# GitHub Secrets automatically become environment variables in your container
DB_HOST=rock-of-ages-db.xyz123.us-east-2.rds.amazonaws.com  # AWS RDS
DB_PASSWORD=YourSecureRDSPassword123!                       # Real password
```

**Local Development Environment (.env.local → Docker)**:
```bash
# Docker loads these from .env.local and passes them as environment variables
DB_HOST=postgres-db           # Container name on Docker network
DB_PASSWORD=localpassword123  # Simple local password
```

**Same Code, Different Sources**: Your Django application uses `os.environ.get('DB_HOST')` in both cases - it receives environment variables whether they come from GitHub Secrets or Docker's `--env-file`. This is the cleanest, most professional approach.

### Create Local Environment File
Create `.env.local` in your API repository:

```bash
# Database Configuration for Local Development
# These values REFERENCE what we created in Step 2 when setting up the PostgreSQL container

DB_NAME=rockofages           # ← References the database we CREATED with POSTGRES_DB=rockofages
DB_USER=rockadmin           # ← References the user we CREATED with POSTGRES_USER=rockadmin  
DB_PASSWORD=localpassword123 # ← References the password we SET with POSTGRES_PASSWORD=localpassword123
DB_HOST=postgres-db         # ← References the container NAME we gave with --name postgres-db
DB_PORT=5432               # ← References the standard PostgreSQL port
SSLMODE=disable            # ← Disable SSL for local development (container doesn't support SSL)
```

**Key Points**:
- `DB_HOST=postgres-db`: This is how containers communicate within the network
- `SSLMODE=disable`: Tells Django not to require SSL for the local database connection

### Build and Run API Container
```bash
# Navigate to your API repository directory
cd path/to/your/rock-of-ages-api

# Build the Docker image
docker build -t rock-of-ages-api .

# Run API container connected to the network
docker run -d \
  --name api-container \
  --network rock-of-ages-network \
  --env-file .env.local \
  -p 8000:8000 \
  rock-of-ages-api
```

### Verify API Connection
```bash
# Check API container logs
docker logs api-container
```

**Expected output from `docker logs api-container`:**
```
🗄️  Setting up PostgreSQL database...
⚙️  Running Django migrations...
📋 Creating app-specific migrations...
🔧 Applying app migrations...
📊 Loading seed data...
✅ Database setup complete!
🔗 Database connection: postgres-db:5432/rockofages  # ← Should show postgres-db, not RDS endpoint
👤 Database user: rockadmin
System check identified no issues (0 silenced).
Django version 5.2.3, using settings 'rockproject.settings'
Starting development server at http://0.0.0.0:8000/
Quit the server with CONTROL-C.
```

**✅ Success indicators to look for:**
- `🔗 Database connection: postgres-db:5432/rockofages` (should show **postgres-db**, not an RDS endpoint)
- "✅ Database setup complete!"
- "Starting development server at http://0.0.0.0:8000/"
- No error messages about SSL or authentication failures

**🚨 Troubleshooting**: If you see an RDS endpoint (like `rock-of-ages-db.xyz123.us-east-2.rds.amazonaws.com`) in the database connection, your container is using the wrong environment variables. Make sure you:
1. Added SSL options to your `settings.py`
2. Created the `.env.local` file with the correct values  
3. Used `--env-file .env.local` in your docker run command
4. The `.env.local` file has `DB_HOST=postgres-db` (not your RDS endpoint)
5. Rebuilt your Docker image after changing `settings.py`

---

## Step 4: Set Up React Client Container

Now you'll containerize your React client to complete the development environment.

### Create React Client Dockerfile
In your React client repository, create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files first (for better Docker layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
```

**Understanding this Dockerfile**:
- `node:18-alpine`: Lightweight Node.js runtime (Alpine Linux is smaller)
- `--host 0.0.0.0`: Allows connections from outside the container
- `--port 3000`: Explicit port configuration for the Vite dev server

### Create Local Environment for Client
Create `.env.local` in your React client repository:

```bash
# API Configuration for Local Development
VITE_API_URL=http://localhost:8000
```

**Important**: The React client uses `localhost:8000` because the JavaScript code runs in your browser, not inside the Docker container. Your browser connects to Docker's port mapping.

### Build and Run Client Container
```bash
# Navigate to your React client repository
cd path/to/your/rock-of-ages-client

# Build the client image
docker build -t rock-of-ages-client .

# Run client container
docker run -d \
  --name client-container \
  --network rock-of-ages-network \
  --env-file .env.local \
  -p 3000:3000 \
  rock-of-ages-client
```

---

## Step 5: Test Your Complete Development Environment

Now test that all three containers can communicate properly and your complete stack is working.

### Verify All Containers are Running
```bash
# Check all running containers
docker ps

# You should see three containers:
# - postgres-db (PostgreSQL database)
# - api-container (Django API)
# - client-container (React app)
```

### Test the Complete Application Flow

**1. Test Database Connection Directly**
```bash
# Connect to database using PostgreSQL client
docker exec -it postgres-db psql -U rockadmin -d rockofages

# Run a test query to see the sample data
SELECT * FROM rockapi_rock;

# Exit the database client
\q
```

**2. Test React Client**
- Open your browser to `http://localhost:3000`
- You should see the Rock of Ages application
- Try to register a new user account
- Login and try to view the rocks collection
- Test adding a rock to your collection

**3. Verify Container Network Communication**
```bash
# Test that API container can reach database container
docker exec -it api-container ping postgres-db

# Should show successful ping responses, confirming network connectivity
```

---

## Understanding Your Complete Architecture

### Network Communication Flow
```
Browser → localhost:3000 → Client Container
Browser → localhost:8000 → API Container → postgres-db:5432 → Database Container
```

### Development vs Production Comparison
**Development Environment (what you just built)**:
```
Client Container ←→ Docker Network ←→ API Container ←→ Database Container
```

**Production Environment (from Part 1)**:
```
S3 + CloudFront ←→ Internet ←→ EC2 (API Container) ←→ RDS Database
```

**Key Insight**: Your development environment now mirrors your production architecture! The same containerized API that runs on EC2 in production is running locally, just connected to different databases.

---

## Benefits You've Achieved

### 1. Streamlined Team Onboarding
**Before**: "Here's a 25-step setup guide with OS-specific instructions. Good luck, and call me when it breaks!"
**Now**: "Clone the repo, run these three Docker commands, start coding!"

### 2. Environment Consistency
- Same Node.js version for every developer
- Same Python version for every developer  
- Same PostgreSQL version for every developer
- Same system dependencies for every developer
- Zero "works on my machine" issues

### 3. Safe Experimentation
```bash
# Try a different database version without affecting anyone else
docker run postgres:14 --name postgres-test

# Reset your entire development environment in seconds
docker stop $(docker ps -q) && docker rm $(docker ps -aq)

# Start fresh with clean data
docker run postgres:15 --name postgres-db
```

### 4. Professional Development Workflow
- Complete isolation from production data
- Easy database inspection and debugging
- Ability to test with realistic production-like architecture
- No conflicts between different projects

### 5. Easy Cleanup and Resource Management
- No leftover processes cluttering your system
- Remove everything with simple Docker commands
- No global software installations to maintain
- Switch between projects instantly

---

## Common Issues and Solutions

### Container Won't Start
```bash
# Check container logs for error messages
docker logs container-name

# Check if ports are already in use
docker ps
netstat -an | grep :8000
```

### Database Connection Problems
```bash
# Verify database container is running and accepting connections
docker exec -it postgres-db psql -U rockadmin -d rockofages

# Test network connectivity between containers
docker exec -it api-container ping postgres-db
```

### Client Can't Reach API
- Verify API container is running: `docker ps`
- Check API is responding: `curl http://localhost:8000/rocks`
- Confirm client environment uses `localhost:8000` (not container name)
- Ensure both containers are on the same network

### SSL/Database Errors
- Verify `.env.local` has `SSLMODE=disable`
- Check that Django settings include SSL options
- Rebuild Docker image after changing settings: `docker build -t rock-of-ages-api .`

---

## What You've Accomplished

Congratulations! You now have:
- ✅ **Complete containerized development environment** that mirrors production
- ✅ **All services communicating** via Docker network using container names
- ✅ **Safe local development** completely isolated from production data
- ✅ **Professional development setup** used by major tech companies
- ✅ **Easy environment reset and experimentation** capabilities
- ✅ **Consistent development experience** for all team members

## Key Learning Concepts

**1. Container Networking**: How containers communicate using names as hostnames within Docker networks

**2. Environment Separation**: Using the same codebase with different configurations for development vs production

**3. Manual Container Orchestration**: Managing multiple connected services using individual Docker commands

**4. Development Environment Architecture**: Creating local environments that mirror production systems

**5. Environment Variables**: Professional patterns for managing configuration across different environments

In Part 3, you'll learn how Docker Compose simplifies managing this multi-container environment, making it even easier to work with and introducing professional development container workflows with VS Code.