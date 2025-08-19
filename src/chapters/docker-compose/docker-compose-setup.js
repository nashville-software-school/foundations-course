export const dockerComposeSetupChapter = {
  id: "workshop3-docker-compose-setup",
  title: "Setting up Docker Compose",
  sectionId: "docker-compose",
  previousChapterId: "workshop3-intro-to-docker-compose",
  content: `
## Setting Up Your Project Structure

Let's organize your repositories properly for Docker Compose:

### Why Project Structure Matters

Docker Compose works best when all related services are organized under a single parent directory. This allows:
- Relative path references in the compose file
- Shared networks automatically
- Easy volume mounting for development
- Single command to manage everything

### Step 1: Create the Development Directory

\`\`\`bash
# Create a parent directory for your development environment
mkdir rock-of-ages-development
cd rock-of-ages-development
\`\`\`

### Step 2: Move Your Repositories

Move (don't copy) your existing repositories into this directory:

\`\`\`bash
# Move your API repository (use YOUR actual repo name)
mv ~/path/to/your/rock-of-ages-api ./

# Move your client repository (use YOUR actual repo name)
mv ~/path/to/your/rock-of-ages-client ./
\`\`\`

**Important**: Use your actual repository names! They might be:
- \`rock-of-ages-api-yourname\`
- \`yourname-rock-api\`
- etc.

Your structure should now look like:
\`\`\`
rock-of-ages-development/
├── your-api-repo-name/
│   ├── Dockerfile
│   ├── manage.py
│   ├── requirements.txt
│   └── ... (other API files)
└── your-client-repo-name/
    ├── Dockerfile
    ├── package.json
    ├── src/
    └── ... (other client files)
\`\`\`

**Why this structure?** Docker Compose will use the parent directory as its "project" context, making it easy to reference both repositories and create a unified development environment.

## Creating Your Docker Compose File

### Step 3: Create docker-compose.yml

In the \`rock-of-ages-development\` directory, create a file named \`docker-compose.yml\`:

\`\`\`yaml
version: '3.8'

services:
  # PostgreSQL Database Service
  postgres-db:
    image: postgres:15
    container_name: postgres-db
    environment:
      POSTGRES_DB: rockofages
      POSTGRES_USER: rockadmin
      POSTGRES_PASSWORD: localpassword123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U rockadmin -d rockofages"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Django API Service
  api:
    build: 
      context: ./your-api-repo-name  # CHANGE THIS to your actual repo name
      dockerfile: Dockerfile
    container_name: api-container
    env_file:
      - ./your-api-repo-name/.env.local  # CHANGE THIS to your actual repo name
    ports:
      - "8000:8000"
    volumes:
      - ./your-api-repo-name:/app  # CHANGE THIS to your actual repo name
      - /app/.venv  # Preserve the virtual environment
    depends_on:
      postgres-db:
        condition: service_healthy
    command: pipenv run bash -c "./seed_database.sh && python manage.py runserver 0.0.0.0:8000"

  # React Client Service
  client:
    app:
      environment:
      - VITE_HMR_HOST=host.docker.internal
      - VITE_WATCHER_POLLING=true
    build:
      context: ./your-client-repo-name  # CHANGE THIS to your actual repo name
      dockerfile: Dockerfile
    container_name: client-container
    env_file:
      - ./your-client-repo-name/.env.local  # CHANGE THIS to your actual repo name
    ports:
      - "3000:3000"
    volumes:
      - ./your-client-repo-name:/app  # CHANGE THIS to your actual repo name
      - /app/node_modules
    command: npm run dev -- --host 0.0.0.0 --port 3000

volumes:
  postgres_data:

networks:
  default:
    name: rock-of-ages-network
\`\`\`

**⚠️ IMPORTANT**: 
1. Replace \`your-api-repo-name\` with your actual API repository folder name (4 places)
2. Replace \`your-client-repo-name\` with your actual client repository folder name (4 places)
3. Make sure the PostgreSQL environment values match what's in your existing \`.env.local\` file!

**Notice the API command**: We're using the full Django startup command including database seeding. This means when you run \`docker compose up\`, you get a complete working application immediately!

### Step 4: Verify Your Environment Files

Before running Docker Compose, confirm that your \`.env.local\` files still exist from the previous section:

**Check your API's \`.env.local\` file:**

It should contain:
\`\`\`
DB_NAME=rockofages
DB_USER=rockadmin
DB_PASSWORD=localpassword123
DB_HOST=postgres-db
DB_PORT=5432
SSLMODE=disable
\`\`\`

**Check your client's \`.env.local\` file:**

It should contain:
\`\`\`
VITE_API_URL=http://localhost:8000
\`\`\`

**Critical**: The database values in your \`.env.local\` MUST match what you put in the docker-compose.yml file!

## Understanding the Docker Compose File

Let's break down what each section does and compare it to the manual commands you used before:

**version: '3.8'**
- Specifies the Docker Compose file format version
- Version 3.8 provides all modern features we need

**services:**
- Defines all containers that make up your application
- Each service can be built from a Dockerfile or use a pre-built image

**postgres-db service:**
- \`image: postgres:15\` - Uses the official PostgreSQL image
- **Previously**: You ran \`docker run -d --name postgres-db --network rock-of-ages-network -e POSTGRES_DB=rockofages -e POSTGRES_USER=rockadmin -e POSTGRES_PASSWORD=localpassword123 -p 5432:5432 postgres:15\`
- **Now**: All those flags are organized clearly in the YAML file
- \`healthcheck:\` - Ensures database is ready before starting dependent services (NEW feature!)

**api service:**
- **Previously**: You ran \`docker build -t rock-of-ages-api .\` then \`docker run -d --name api-container --network rock-of-ages-network --env-file .env.local -p 8000:8000 rock-of-ages-api\`
- **Now**: Build and run configuration is declared in one place
- \`volumes:\` - **Game changer!** Your local code is mounted into the container
- \`depends_on:\` - Waits for database to be healthy before starting
- \`command:\` - Automatically seeds the database and starts Django server

**client service:**
- **Previously**: You built and ran with multiple commands
- **Now**: Everything is defined declaratively
- \`command:\` - This starts your React development server! When this runs, your app is live at localhost:3000

**Key Improvements Over Manual Setup**

1. **One Network**: No need to manually create with \`docker network create\`
2. **Automatic Building**: No separate \`docker build\` commands
3. **Health Checks**: Services wait for dependencies to be truly ready
4. **Volume Mounts**: **Game changer!** Live code synchronization enables hot reload
5. **Single Command**: Replace 10+ commands with just \`docker compose up\`

### The Magic of Volume Mounts

Volume mounts are what make hot reload possible:

\`\`\`yaml
volumes:
  - ./your-client-repo-name:/app  # Host code → Container code (live sync)
  - ./your-api-repo-name:/app     # Host code → Container code (live sync)
\`\`\`

**How this works:**
- **Edit a React file** on your host → Volume mount reflects change in container → Vite dev server detects change → **Instant hot reload in browser!**
- **Edit a Python file** on your host → Volume mount reflects change in container → Django dev server detects change and restarts → **New code is live immediately!**

**No rebuilding, no restarting containers, no waiting around** - just save and see your changes!

## Running Your Docker Compose Setup

### Step 5: Start Everything with One Command

Make sure you've verified your \`.env.local\` files exist (see Step 4), then:

\`\`\`bash
# From the rock-of-ages-development directory
docker compose up
\`\`\`

That's it! This single command:
- Creates the network automatically
- Builds images if needed  
- Starts all containers in the correct order
- Seeds your database with sample data
- Starts Django and React development servers
- Shows combined logs from all services

#### Expected Output

You should see output similar to this:
\`\`\`
[+] Running 4/4
 ⠿ Network rock-of-ages-network        Created
 ⠿ Container postgres-db               Started
 ⠿ Container api-container             Started
 ⠿ Container client-container          Started

postgres-db       | PostgreSQL init process complete; ready for start up.
postgres-db       | LOG:  database system is ready to accept connections
api-container     | 🔗 Database connection: postgres-db:5432/rockofages
api-container     | 👤 Database user: rockadmin
api-container     | ✅ Database setup complete!
api-container     | Django version 5.0.1, using settings 'rockproject.settings'
api-container     | Starting development server at http://0.0.0.0:8000/
api-container     | Quit the server with CONTROL-C.
client-container  | VITE v4.4.9  ready in 543 ms
client-container  | ➜  Local:   http://localhost:3000/
client-container  | ➜  Network: http://0.0.0.0:3000/
\`\`\`

**✅ Success indicators:**
- All containers show "Started"
- PostgreSQL: "ready to accept connections"
- API: "Starting development server at http://0.0.0.0:8000/"
- Client: "ready" and showing localhost:3000

**🎉 Congratulations!** You now have a complete full-stack application running with one command!

## Complete Application Testing

Let's verify that your entire full-stack application is working perfectly:

#### 1. Test the Database
In a new terminal (keep docker compose running):
\`\`\`bash
docker exec -it postgres-db psql -U rockadmin -d rockofages
\`\`\`

Run this query:
\`\`\`sql
SELECT COUNT(*) FROM rockapi_rock;
\`\`\`

You should see 3 rocks (from the seed data). Type \`\\q\` to exit.

#### 2. Test The Complete Application Flow
- **Open your browser** to \`http://localhost:3000\`
- **You should see** the Rock of Ages application
- **Open Developer Tools** and go to the **Network** tab
- **Try to register** a new user account
- **In the Network tab**, confirm that API calls are going to \`localhost:8000\`
- **Login** and try to view the rocks collection
- **Test adding** a rock to your collection  
- **Verify in Network tab** that all API requests show \`localhost:8000\` as the target

**🎉 If all tests pass, your complete Docker Compose environment is working perfectly!**

You now have a **full-stack development environment** that starts with a single command!

### Step 6: Test Hot Reload

Let's see Docker Compose hot reload in action:

1. **Open any React component** in your client repository (e.g., a component in \`src/components/\`)
2. **Make a visible change** - add some text or change a heading in the JSX
4. **Save the file**
5. **Check your browser** at \`http://localhost:3000\` - **The change appears instantly!**

**Why this works**: Docker Compose volume mounts (\`./your-client-repo-name:/app\`) sync your file changes immediately to the container, and Vite's dev server detects and hot reloads automatically.

### Step 7: Run in Background Mode (Optional)

If you prefer to run everything in the background without seeing the logs:

\`\`\`bash
docker compose up -d
\`\`\`

To see logs when running in background:
\`\`\`bash
docker compose logs -f
\`\`\`

To see logs for just one service:
\`\`\`bash
docker compose logs api -f
\`\`\`

### Useful Docker Compose Commands

Here are the most helpful commands with real-world scenarios:

**Stop everything:**
\`\`\`bash
docker compose down
\`\`\`
*When to use*: End of your work day, switching to a different project, or when you need to free up system resources.

**Rebuild images:**
\`\`\`bash
docker compose build
\`\`\`
*When to use*: After updating your Dockerfile, adding new dependencies to requirements.txt or package.json, or when Docker seems to be using an old cached version.

**Restart a specific service:**
\`\`\`bash
docker compose restart api
\`\`\`
*When to use*: The API crashed or is acting weird, you've made configuration changes that require a restart, or you want to clear the application's memory.

**View logs for a specific service:**
\`\`\`bash
docker compose logs client
docker compose logs api -f  # -f follows the logs in real-time
\`\`\`
*When to use*: Debugging why the React app won't compile, checking API error messages, or monitoring database queries.

**Run a command in a service:**
\`\`\`bash
# Run Django migrations after adding a new model
docker compose exec api pipenv run python manage.py makemigrations
docker compose exec api pipenv run python manage.py migrate

# Access the Django shell for debugging
docker compose exec api pipenv run python manage.py shell

# Install a new npm package in the client
docker compose exec client npm install axios

# Access the database directly
docker compose exec postgres-db psql -U rockadmin -d rockofages
\`\`\`
*When to use*: Running migrations after model changes, debugging data issues, adding new dependencies, or running one-off scripts.

**View running containers:**
\`\`\`bash
docker compose ps
\`\`\`
*When to use*: Checking which services are running, verifying all containers started successfully, or getting container names for other commands.

---

## What's Next?

You now have a fantastic development environment with hot reload! In Chapter 3, you'll learn how to add professional debugging capabilities with VS Code Dev Containers, giving you the same debugging experience as local development but running entirely in containers.
`,
  exercise: null,
}
