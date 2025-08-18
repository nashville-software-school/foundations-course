export const settingUpDNChapter = {
  id: "workshop3-setting-up-docker-network",
  title: "Setting Up the Docker Network",
  sectionId: "docker-network",
  previousChapterId: "workshop3-intro-to-docker-network",
  content: `

## Step 1: Set Up Docker Network

### Create the Network
\`\`\`bash
# Create a custom network for our development environment
docker network create rock-of-ages-network
\`\`\`

### Verify Network Creation
\`\`\`bash
# List all Docker networks
docker network ls

# You should see your new network in the list
\`\`\`

**Understanding this step**: This network acts like a private virtual network where your containers can find each other by name, similar to how computers connect on an office network.

## Step 2: Set Up PostgreSQL Database Container

Instead of using your production RDS database for local development, you'll run PostgreSQL in a container. This gives you a clean, isolated database that you can reset, experiment with, or break without affecting production.

### Run PostgreSQL Container
\`\`\`bash
docker run -d \
  --name postgres-db \
  --network rock-of-ages-network \
  -e POSTGRES_DB=rockofages \
  -e POSTGRES_USER=rockadmin \
  -e POSTGRES_PASSWORD=localpassword123 \
  -p 5432:5432 \
  postgres:15
\`\`\`

**Understanding this command**:
- \`-d\`: Run in background (detached mode)
- \`--name postgres-db\`: Container name (other containers will use this to connect)
- \`--network rock-of-ages-network\`: Connect to our custom network
- \`-e\`: Set environment variables to configure PostgreSQL
- \`-p 5432:5432\`: Map port 5432 to your host (for database tools like pgAdmin)
- \`postgres:15\`: Use PostgreSQL version 15 image from Docker Hub

**About the environment variables**:
These \`-e\` flags are **creating new database configuration**:
- \`POSTGRES_DB=rockofages\`: **Creates** a database named "rockofages"
- \`POSTGRES_USER=rockadmin\`: **Creates** a user named "rockadmin"
- \`POSTGRES_PASSWORD=localpassword123\`: **Sets** the password for that user

**Can you customize these values?** Absolutely! You're defining the database configuration, not referencing something that already exists. Just make sure your API configuration (in the next step) uses the same values.

### Verify Database is Running
\`\`\`bash
# Check container status
docker ps

# Check database startup logs
docker logs postgres-db
\`\`\`

**Expected output from \`docker logs postgres-db\`:**
\`\`\`
The files belonging to this database system will be owned by user "postgres"...
PostgreSQL init process complete; ready for start up.

2024-01-15 10:30:45.123 UTC [1] LOG:  starting PostgreSQL 15.5 on x86_64-pc-linux-gnu
2024-01-15 10:30:45.124 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2024-01-15 10:30:45.135 UTC [56] LOG:  database system is ready to accept connections
\`\`\`

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
\`\`\`bash
# GitHub Secrets automatically become environment variables in your container
DB_HOST=rock-of-ages-db.xyz123.us-east-2.rds.amazonaws.com  # AWS RDS
DB_PASSWORD=YourSecureRDSPassword123!                       # Real password
\`\`\`

**Local Development Environment (.env.local → Docker)**:
\`\`\`bash
# Docker loads these from .env.local and passes them as environment variables
DB_HOST=postgres-db           # Container name on Docker network
DB_PASSWORD=localpassword123  # Simple local password
\`\`\`

**Same Code, Different Sources**: Your Django application uses \`os.environ.get('DB_HOST')\` in both cases - it receives environment variables whether they come from GitHub Secrets or Docker's \`--env-file\`. This is the cleanest, most professional approach.

### Create Local Environment File
Create \`.env.local\` in your API repository:

\`\`\`bash
DB_NAME=rockofages
DB_USER=rockadmin
DB_PASSWORD=localpassword123
DB_HOST=postgres-db
DB_PORT=5432
SSLMODE=disable
\`\`\`

**Key Points**:
- \`DB_HOST=postgres-db\`: This is how containers communicate within the network
- \`SSLMODE=disable\`: Tells Django not to require SSL for the local database connection

### Build and Run API Container
\`\`\`bash
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
\`\`\`

### Verify API Connection
\`\`\`bash
# Check API container logs
docker logs api-container
\`\`\`

**Expected output from \`docker logs api-container\`:**
\`\`\`
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
\`\`\`

**✅ Success indicators to look for:**
- \`🔗 Database connection: postgres-db:5432/rockofages\` (should show **postgres-db**, not an RDS endpoint)
- "✅ Database setup complete!"
- "Starting development server at http://0.0.0.0:8000/"
- No error messages about SSL or authentication failures

**🚨 Troubleshooting**: If you see an RDS endpoint (like \`rock-of-ages-db.xyz123.us-east-2.rds.amazonaws.com\`) in the database connection, your container is using the wrong environment variables. Make sure you:
1. Added SSL options to your \`settings.py\` (from Part 1)
2. Created the \`.env.local\` file with the correct values  
3. Used \`--env-file .env.local\` in your docker run command
4. The \`.env.local\` file has \`DB_HOST=postgres-db\` (not your RDS endpoint)
5. Rebuilt your Docker image after any changes: \`docker build -t rock-of-ages-api .\`

**🔥 Nuclear Option - Complete Environment Reset**: If you're still seeing RDS connections or other strange caching issues, completely wipe your Docker environment and rebuild everything:

\`\`\`bash
# Stop and remove ALL containers, remove ALL images, and clean networks
docker stop $(docker ps -aq) && docker rm $(docker ps -aq) && docker rmi -f $(docker images -q)
docker network prune -f

# Now rebuild everything from scratch:
# 1. Recreate the network
docker network create rock-of-ages-network

# 2. Start PostgreSQL container
docker run -d \
  --name postgres-db \
  --network rock-of-ages-network \
  -e POSTGRES_DB=rockofages \
  -e POSTGRES_USER=rockadmin \
  -e POSTGRES_PASSWORD=localpassword123 \
  -p 5432:5432 \
  postgres:15

# 3. Rebuild and run API container
docker build -t rock-of-ages-api .
docker run -d \
  --name api-container \
  --network rock-of-ages-network \
  --env-file .env.local \
  -p 8000:8000 \
  rock-of-ages-api

# 4. Check the logs
docker logs api-container
\`\`\`

This nuclear option removes all Docker containers, images, and networks, forcing everything to rebuild from scratch. Sometimes Docker caches old images or configurations, and this completely clears that cache.

---

## Step 4: Set Up React Client Container

Now you'll containerize your React client to complete the development environment.

### Create React Client Dockerfile
In your React client repository, create a \`Dockerfile\`:

\`\`\`dockerfile
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
\`\`\`

**Understanding this Dockerfile**:
- \`node:18-alpine\`: Lightweight Node.js runtime (Alpine Linux is smaller)
- \`--host 0.0.0.0\`: Allows connections from outside the container
- \`--port 3000\`: Explicit port configuration for the Vite dev server

### Create Local Environment for Client
Create \`.env.local\` in your React client repository:

\`\`\`bash
# API Configuration for Local Development
VITE_API_URL=http://localhost:8000
\`\`\`

**Important**: The React client uses \`localhost:8000\` because the JavaScript code runs in your browser, not inside the Docker container. Your browser connects to Docker's port mapping.

### Build and Run Client Container
\`\`\`bash
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
\`\`\`

## Step 5: Test Your Complete Development Environment

Now test that all three containers can communicate properly and your complete stack is working.

### Verify All Containers are Running
\`\`\`bash
# Check all running containers
docker ps

# You should see three containers:
# - postgres-db (PostgreSQL database)
# - api-container (Django API)
# - client-container (React app)
\`\`\`

### Test the Complete Application Flow

**1. Test Database Connection Directly**
\`\`\`bash
# Connect to database using PostgreSQL client
docker exec -it postgres-db psql -U rockadmin -d rockofages

# First, check what tables exist
\\dt

# Check if the rock table has data
SELECT * FROM rockapi_rock;
\`\`\`

**Expected results**:
- \`\\dt\` should show tables like \`rockapi_rock\`, \`rockapi_type\`, \`auth_user\`
- \`SELECT * FROM rockapi_rock;\` should show 3 sample rocks

**⚠️ Important**: Don't forget the semicolon (\`;\`) at the end of SQL commands! If you forget it, PostgreSQL will wait for you to complete the statement and show a different prompt. If this happens, just type \`\\q\` to exit the database client and try again.

\`\`\`bash
# Exit the database client
\\q
\`\`\`

**2. Test React Client**
- Open your browser to \`http://localhost:3000\`
- You should see the Rock of Ages application
- **Open Developer Tools** and go to the **Network** tab
- Try to register a new user account
- **In the Network tab**, confirm that API calls are going to \`localhost:8000\` (not your EC2 instance)
- Login and try to view the rocks collection
- Test adding a rock to your collection
- **Verify in Network tab** that all API requests show \`localhost:8000\` as the target

**Why this matters**: This confirms that your \`.env.local\` file is working correctly - your local React app is talking to your local API container, not your production EC2 instance. This is exactly what we want for safe local development!

**3. Verify Container Network Communication**
\`\`\`bash
# Test that API container can reach database container
docker exec -it api-container ping postgres-db

# Should show successful ping responses, confirming network connectivity
\`\`\`



    `,
  exercise: null,
}
