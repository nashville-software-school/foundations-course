# Docker Compose: Simplifying Multi-Container Development

## The Current Pain Points

Let's be honest about what you're experiencing with your current Docker network setup. You've successfully created a local development environment with three containers, but the workflow is... less than ideal.

### Scenario 1: Making a Code Change

You've just implemented a new feature to allow users to favorite other people's rocks. Here's what you need to do to see your changes:

**For the API change:**
1. Stop the running API container: `docker stop api-container`
2. Remove the old container: `docker rm api-container`
3. Rebuild the image with your changes: `docker build -t rock-of-ages-api .`
4. Run the new container with all the parameters: 
   ```bash
   docker run -d \
     --name api-container \
     --network rock-of-ages-network \
     --env-file .env.local \
     -p 8000:8000 \
     rock-of-ages-api
   ```
5. Check the logs to ensure it started correctly: `docker logs api-container`

**For the client change:**
1. Stop the client container: `docker stop client-container`
2. Remove it: `docker rm client-container`
3. Rebuild: `docker build -t rock-of-ages-client .`
4. Run with all parameters:
   ```bash
   docker run -d \
     --name client-container \
     --network rock-of-ages-network \
     --env-file .env.local \
     -p 3000:3000 \
     rock-of-ages-client
   ```

That's **10 commands** just to see a simple code change!

### Scenario 2: Debugging Your Feature

There's a bug in your new favorite rocks feature. Here's your current debugging options with the manual setup:

**Option 1: Print Statements**
1. Add `print()` statements to your Python code
2. Stop, remove, rebuild, and restart the API container (5 commands)
3. Check the logs: `docker logs api-container`
4. Repeat for each debugging iteration

**Option 2: Terminal-Based Debugging**
1. Stop the API container: `docker stop api-container`
2. Remove it: `docker rm api-container` 
3. Run with Python debugger: 
   ```bash
   docker run -it \
     --name api-container \
     --network rock-of-ages-network \
     --env-file .env.local \
     -p 8000:8000 \
     rock-of-ages-api \
     python -m pdb manage.py runserver 0.0.0.0:8000
   ```
4. Use terminal commands like `n`, `s`, `pp rocks` to navigate (no VS Code breakpoints!)
5. When done, stop, remove, and restart normally

**The frustration is real**: No VS Code debugging, no breakpoints, mostly print statements and terminal-only debugging tools.

### Why No Hot Reload in Manual Setup?

The manual Docker network setup has a critical limitation: **no volume mounts between your host machine and containers**.

**What this means:**
- Your code changes stay on your host machine
- The container runs the code that was copied during `docker build`
- The running container has no knowledge of your file changes

**For both API and Client**: To see any code changes, you must stop, remove, rebuild, and restart containers - that's why you need those 10 commands every time!

## Enter Docker Compose

Docker Compose is about to transform your development experience from frustrating to delightful. Instead of managing individual containers with lengthy commands, you'll define your entire multi-container application in a single YAML file and control everything with simple commands.

### How Docker Compose Works

Docker Compose reads a `docker-compose.yml` file that describes:
- All your services (containers)
- How they connect to each other
- Their configuration and environment variables
- Volume mounts for live code updates
- Port mappings

Think of it as "infrastructure as code" for your development environment.

### Why Project Structure Matters

Docker Compose works best when all related services are organized under a single parent directory. This allows:
- Relative path references in the compose file
- Shared networks automatically
- Easy volume mounting for development
- Single command to manage everything

## Clean Slate: Remove Existing Containers

Before we set up Docker Compose, let's clean up all the containers, images, and networks from the previous section to avoid any conflicts:

```bash
# Stop and remove ALL containers
docker stop $(docker ps -aq) && docker rm $(docker ps -aq)

# Remove ALL images
docker rmi -f $(docker images -q)

# Remove all custom networks
docker network prune -f
```

**What this does:**
- Stops any running containers
- Removes all containers (running or stopped)
- Deletes all Docker images from your system
- Removes custom networks like `rock-of-ages-network`

This gives you a completely clean Docker environment to start fresh with Docker Compose.

#### ⚠️ **Receiving an error?**
If you see this error: 
```bash
"docker stop" requires at least 1 argument.
See 'docker stop --help'.

Usage:  docker stop [OPTIONS] CONTAINER [CONTAINER...]

Stop one or more running containers
```
This just means you don't have any containers running currently. Go ahead and move on to the next command.

## Setting Up Your Project Structure

Let's organize your repositories properly for Docker Compose:

### Step 1: Create the Development Directory

```bash
# Create a parent directory for your development environment
mkdir rock-of-ages-development
cd rock-of-ages-development
```

### Step 2: Move Your Repositories

Move (don't copy) your existing repositories into this directory:

```bash
# Move your API repository (use YOUR actual repo name)
mv ~/path/to/your/rock-of-ages-api ./

# Move your client repository (use YOUR actual repo name)
mv ~/path/to/your/rock-of-ages-client ./
```

**Important**: Use your actual repository names! They might be:
- `rock-of-ages-api-yourname`
- `yourname-rock-api`
- etc.

Your structure should now look like:
```
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
```

**Why this structure?** Docker Compose will use the parent directory as its "project" context, making it easy to reference both repositories and create a unified development environment.

## Creating Your Docker Compose File

### Step 3: Create docker-compose.yml

In the `rock-of-ages-development` directory, create a file named `docker-compose.yml`:

```yaml
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
```

**⚠️ IMPORTANT**: 
1. Replace `your-api-repo-name` with your actual API repository folder name (4 places)
2. Replace `your-client-repo-name` with your actual client repository folder name (4 places)
3. Make sure the PostgreSQL environment values match what's in your existing `.env.local` file!

**Notice the API command**: We're using the full Django startup command including database seeding. This means when you run `docker compose up`, you get a complete working application immediately!

### Step 4: Verify Your Environment Files

Before running Docker Compose, confirm that your `.env.local` files still exist from the previous section:

**Check your API's `.env.local` file:**
```bash
cat ./your-api-repo-name/.env.local
```

It should contain:
```
DB_NAME=rockofages
DB_USER=rockadmin
DB_PASSWORD=localpassword123
DB_HOST=postgres-db
DB_PORT=5432
SSLMODE=disable
```

**Check your client's `.env.local` file:**
```bash
cat ./your-client-repo-name/.env.local
```

It should contain:
```
VITE_API_URL=http://localhost:8000
```

**Critical**: The database values in your `.env.local` MUST match what you put in the docker-compose.yml file!

### Understanding the Docker Compose File

Let's break down what each section does and compare it to the manual commands you used before:

**version: '3.8'**
- Specifies the Docker Compose file format version
- Version 3.8 provides all modern features we need

**services:**
- Defines all containers that make up your application
- Each service can be built from a Dockerfile or use a pre-built image

**postgres-db service:**
- `image: postgres:15` - Uses the official PostgreSQL image
- **Previously**: You ran `docker run -d --name postgres-db --network rock-of-ages-network -e POSTGRES_DB=rockofages -e POSTGRES_USER=rockadmin -e POSTGRES_PASSWORD=localpassword123 -p 5432:5432 postgres:15`
- **Now**: All those flags are organized clearly in the YAML file
- `healthcheck:` - Ensures database is ready before starting dependent services (NEW feature!)

**api service:**
- **Previously**: You ran `docker build -t rock-of-ages-api .` then `docker run -d --name api-container --network rock-of-ages-network --env-file .env.local -p 8000:8000 rock-of-ages-api`
- **Now**: Build and run configuration is declared in one place
- `volumes:` - **Game changer!** Your local code is mounted into the container
- `depends_on:` - Waits for database to be healthy before starting
- `command:` - Automatically seeds the database and starts Django server

**client service:**
- **Previously**: You built and ran with multiple commands
- **Now**: Everything is defined declaratively
- `command:` - This starts your React development server! When this runs, your app is live at localhost:3000
- **No dependencies**: The client doesn't depend on the API, giving you more flexibility

**Key Improvements Over Manual Setup**

1. **One Network**: No need to manually create with `docker network create`
2. **Automatic Building**: No separate `docker build` commands
3. **Health Checks**: Services wait for dependencies to be truly ready
4. **Volume Mounts**: **Game changer!** Live code synchronization enables hot reload
5. **Single Command**: Replace 10+ commands with just `docker compose up`

### The Magic of Volume Mounts

Volume mounts are what make hot reload possible:

```yaml
volumes:
  - ./your-client-repo-name:/app  # Host code → Container code (live sync)
  - ./your-api-repo-name:/app     # Host code → Container code (live sync)
```

**How this works:**
- **Edit a React file** on your host → Volume mount reflects change in container → Vite dev server detects change → **Instant hot reload in browser!**
- **Edit a Python file** on your host → Volume mount reflects change in container → Django dev server detects change and restarts → **New code is live immediately!**

**No rebuilding, no restarting containers, no waiting around** - just save and see your changes!

## Running Your Docker Compose Setup

### Step 5: Start Everything with One Command

Make sure you've verified your `.env.local` files exist (see Step 4), then:

```bash
# From the rock-of-ages-development directory
docker compose up
```

That's it! This single command:
- Creates the network automatically
- Builds images if needed  
- Starts all containers in the correct order
- Seeds your database with sample data
- Starts Django and React development servers
- Shows combined logs from all services

### Expected Output

You should see output similar to this:
```
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
```

**✅ Success indicators:**
- All containers show "Started"
- PostgreSQL: "ready to accept connections"
- API: "Starting development server at http://0.0.0.0:8000/"
- Client: "ready" and showing localhost:3000

**🎉 Congratulations!** You now have a complete full-stack application running with one command!

## Complete Application Testing

Let's verify that your entire full-stack application is working perfectly:

### 1. Test the Database
In a new terminal (keep docker compose running):
```bash
docker exec -it postgres-db psql -U rockadmin -d rockofages
```

Run this query:
```sql
SELECT COUNT(*) FROM rockapi_rock;
```

You should see 3 rocks (from the seed data). Type `\q` to exit.

### 2. Test The Complete Application Flow
- **Open your browser** to `http://localhost:3000`
- **You should see** the Rock of Ages application
- **Open Developer Tools** and go to the **Network** tab
- **Try to register** a new user account
- **In the Network tab**, confirm that API calls are going to `localhost:8000`
- **Login** and try to view the rocks collection
- **Test adding** a rock to your collection  
- **Verify in Network tab** that all API requests show `localhost:8000` as the target

**🎉 If all tests pass, your complete Docker Compose environment is working perfectly!**

You now have a **professional full-stack development environment** that starts with a single command!

### Step 6: Run in Background Mode (Optional)

If you prefer to run everything in the background without seeing the logs:

```bash
docker compose up -d
```

To see logs when running in background:
```bash
docker compose logs -f
```

To see logs for just one service:
```bash
docker compose logs api -f
```

### Useful Docker Compose Commands

Here are the most helpful commands with real-world scenarios:

**Stop everything:**
```bash
docker compose down
```
*When to use*: End of your work day, switching to a different project, or when you need to free up system resources.

**Rebuild images:**
```bash
docker compose build
```
*When to use*: After updating your Dockerfile, adding new dependencies to requirements.txt or package.json, or when Docker seems to be using an old cached version.

**Restart a specific service:**
```bash
docker compose restart api
```
*When to use*: The API crashed or is acting weird, you've made configuration changes that require a restart, or you want to clear the application's memory.

**View logs for a specific service:**
```bash
docker compose logs client
docker compose logs api -f  # -f follows the logs in real-time
```
*When to use*: Debugging why the React app won't compile, checking API error messages, or monitoring database queries.

**Run a command in a service:**
```bash
# Run Django migrations after adding a new model
docker compose exec api pipenv run python manage.py makemigrations
docker compose exec api pipenv run python manage.py migrate

# Access the Django shell for debugging
docker compose exec api pipenv run python manage.py shell

# Install a new npm package in the client
docker compose exec client npm install axios

# Access the database directly
docker compose exec postgres-db psql -U rockadmin -d rockofages
```
*When to use*: Running migrations after model changes, debugging data issues, adding new dependencies, or running one-off scripts.

**View running containers:**
```bash
docker compose ps
```
*When to use*: Checking which services are running, verifying all containers started successfully, or getting container names for other commands.

## Setting Up VS Code Dev Containers

Now let's add the final piece: seamless debugging and development inside your containers. This is where the real professional development magic happens!

## Understanding Development vs. Debugging Workflows

Your Docker Compose setup now gives you **two powerful workflows**:

### **Full-Stack Development Workflow** (Default)
Perfect for:
- 👥 **Team members** working on frontend, design, or testing
- 🚀 **Quick demos** or stakeholder reviews  
- 🔍 **Integration testing** of the complete application
- 📱 **Client-focused development** where you just need the API running

**Command**: `docker compose up` → Everything starts automatically!

### **API Debugging Workflow** (Advanced)
Perfect for:
- 🐛 **Backend developers** who need to debug API logic
- 🔬 **Investigating complex issues** with breakpoints and variable inspection
- 🎯 **Precise development** with step-through debugging
- 🛠️ **Advanced troubleshooting** of business logic

**Commands**: `docker compose up postgres-db client` + VS Code Dev Container → Selective control!

Let's set up the debugging workflow:

### What We're About to Achieve

By the end of this section, you'll be able to:
- ✅ Set breakpoints in your Django code by clicking in VS Code
- ✅ Step through your code line by line 
- ✅ Inspect variables and see their values in real-time
- ✅ Use all of VS Code's debugging features inside the container
- ✅ Restart the debugger quickly to see code changes

### Step 7: Install Dev Containers Extension

1. Open VS Code
2. Go to Extensions (Cmd/Ctrl + Shift + X)
3. Search for "Dev Containers"
4. Install the official Microsoft extension "Dev Containers"

### Understanding How Dev Containers Work

Here's the key insight: **Dev Containers move your VS Code development environment inside the container**.

**Without Dev Containers:**
```
Your Computer: VS Code + Python Debugger
     ↕ (barrier)
Container: Django App + Python Runtime
```

**With Dev Containers:**
```
Your Computer: VS Code UI only
Container: VS Code Server + Python Debugger + Django App + Python Runtime
```

This means you get the exact same debugging experience as local development, but everything runs in your containerized environment!

### Step 8: Create Dev Container Configuration

We need to tell VS Code how to connect to our API container. In your API repository, create the configuration:

```bash
# From your rock-of-ages-development directory
mkdir ./your-api-repo-name/.devcontainer
```

Create `./your-api-repo-name/.devcontainer/devcontainer.json`:

```json
{
  "name": "Rock of Ages API",
  "dockerComposeFile": "../../docker-compose.yml",
  "service": "api",
  "workspaceFolder": "/app",
  "overrideCommand": true,
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "ms-python.vscode-pylance",
        "ms-python.debugpy"
      ],
      "settings": {
        "python.defaultInterpreterPath": "/app/.venv/bin/python",
        "python.linting.enabled": true,
        "python.linting.pylintEnabled": true
      }
    }
  },
  "postCreateCommand": "pipenv install --dev",
  "remoteUser": "root",
  "runArgs": [
    "--cap-add=SYS_PTRACE",
    "--security-opt", "seccomp=unconfined"
  ],
  "settings": {
  "python.pythonPath": "/usr/local/bin/python"
  }
}
```

**Key settings explained:**
- `"dockerComposeFile": "../../docker-compose.yml"` - Points to your compose file
- `"service": "api"` - Connects to the API container
- `"overrideCommand": true` - **Critical!** This prevents the automatic Django startup from docker-compose.yml, allowing you to manually start the service and attach the debug process. 
- `"workspaceFolder": "/app"` - Sets the working directory inside the container

### Step 9: Start the Debugging Environment

For debugging, we want to start only the database and client and control the API ourselves:

1. **Stop your full stack** if it's running:
   ```bash
   docker compose down
   ```

2. **Start only database and client**:
   ```bash
   docker compose up postgres-db client
   ```
   
   This gives you:
   - ✅ Database running and ready
   - ✅ React client running at localhost:3000  
   - ❌ No competing Django process on port 8000

3. **Open VS Code** and open your **individual API repository folder** (not the parent directory)

4. **Click "Reopen in Container"** when prompted, or use F1 → "Dev Containers: Open Folder in Container"

### What Happens Next

VS Code will:
1. Connect to your running API container
2. Install the VS Code server inside the container
3. Install Python extensions
4. Run `pipenv install --dev` to set up development dependencies
5. Give you a terminal that's inside the container

You'll see output like:
```
[7177 ms] Start: Run in container: /bin/sh -c pipenv install --dev
Installing dependencies from Pipfile.lock...
Done. Press any key to close the terminal.
```

**Important**: You might see a popup about port forwarding (like port 5474) - this is normal VS Code communication. Just dismiss it.

### Step 10: Set Up Django Debugging

Now we need to configure VS Code to debug Django properly. Create a debug configuration in your API repository:

**Create `.vscode/launch.json` in your API repo:**

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Django: Debug Server",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}/manage.py",
            "args": ["runserver", "0.0.0.0:8000", "--noreload"],
            "django": true,
            "justMyCode": false,
            "console": "integratedTerminal",
            "env": {
                "PYTHONPATH": "${workspaceFolder}",
                "DJANGO_SETTINGS_MODULE": "rockproject.settings"
            }
        }
    ]
}
```

**What this configuration does:**
- `"program": "${workspaceFolder}/manage.py"` - Tells VS Code to run Django's manage.py
- `"args": ["runserver", "0.0.0.0:8000", "--noreload"]` - Starts the development server
- `"--noreload"` - Prevents Django from restarting (which can interfere with debugging)
- `"django": true` - Enables Django-specific debugging features

### Step 11: Start Debugging Django

Here's the moment of truth! We'll start Django with the integrated debugger:

1. **In VS Code** (now connected to the container), press **F5** 
   
   OR
   
   Go to the **Run and Debug** panel (Ctrl+Shift+D), select "Django: Debug Server", and click the green play button

2. **You should see Django start** in the **Integrated Terminal**:
   ```
   Django version 5.2.4, using settings 'rockproject.settings'
   Starting development server at http://0.0.0.0:8000/
   Quit the server with CONTROL-C.
   ```

3. **Notice the debug toolbar** at the top of VS Code - this means the debugger is active!

### Step 12: Test Your First Breakpoint

Time for the magic moment:

1. **Open `rockapi/views/rock_view.py`** in VS Code
2. **Find the `list` method** (this handles GET requests to `/rocks`)
3. **Place a breakpoint** next to the line `rocks = Rock.objects.all()` 
4. **Open your browser** to `http://localhost:3000`
5. **Login** and **click "All Rocks"**
6. **VS Code should immediately pause** at your breakpoint! 🎉

### What You Can Do Now

With the execution paused at your breakpoint, you can:

- **Inspect variables**: Hover over `rocks` to see its value
- **Use the Debug Console**: Type `print(rocks.count())` to run Python expressions
- **Step through code**: Use F10 to step over lines, F11 to step into functions
- **View the call stack**: See exactly how your code was reached
- **Add watch expressions**: Monitor variables as you step through code

This is **exactly the same debugging experience** as local development, but running inside your containerized environment!

### Step 13: Experience Code Changes

Let's test how code changes work in the debugging environment and understand the difference between debugging and regular development:

#### Understanding Hot Reload vs. Debugging

**Important Distinction:**
- **Regular development**: Hot reload works perfectly with Docker Compose volume mounts
- **Debugging mode**: Hot reload is intentionally disabled for stable debugging connections

#### Test Code Changes in Debugging Mode:

1. **Stop the debugger** (Ctrl+C or click the stop button in VS Code) 
2. **Open** `rockapi/views/rock_view.py`
3. **Add a print statement** in the `list` method:
   ```python
   def list(self, request):
       """Handle GET requests to get all rocks"""
       print("🔍 DEBUG: Fetching rocks from containerized database!")
       rocks = Rock.objects.all()
       # rest of your existing code
   ```
4. **Save the file**
5. **Press F5 again** to restart with your changes
6. **In your browser**, navigate to the rocks page
7. **Check the Integrated Terminal** in VS Code - you should see your print statement!

#### Why Manual Restart is Required for Debugging

When debugging with `--noreload`, Django doesn't automatically restart when files change. This is **intentional**:

- **Benefit**: Stable debugging connections that don't disconnect when you edit files
- **Trade-off**: You must manually restart (F5) to see code changes

## Comparing Your Development Workflows

### **Full-Stack Workflow** (`docker compose up`):
- ✅ **Instant complete application** - perfect for demos, testing, frontend work
- ✅ **Zero configuration** - just works for everyone on the team  
- ✅ **Automatic database seeding** - fresh data every time
- ✅ **Great for integration testing** - see how everything works together

### **API Debugging Workflow** (`docker compose up postgres-db client` + Dev Container):
- ✅ **Full debugging capabilities** - breakpoints, variable inspection, step-through
- ✅ **Precise control** - start and stop Django exactly when you need it
- ✅ **Perfect for backend development** - deep dive into API logic

### **Before Docker Compose + Dev Containers:**
- ❌ 10+ commands to see code changes
- ❌ Manual container management  
- ❌ Print statements for debugging
- ❌ Fragile, error-prone setup


**You now have the best of both worlds!** 🎯

## Summary: Your Professional Development Environment

Congratulations! You've just set up the same development workflow used by professional teams at major tech companies. You now have:

### **One Command to Rule Them All**
`docker compose up` starts your entire development infrastructure - database, API container, and client - with perfect networking and dependency management.

### **Integrated Debugging That Just Works**
Press F5 in VS Code and get full debugging capabilities: breakpoints, variable inspection, step-through debugging, and the debug console - all running inside your containerized environment.

### **Live Code Updates With Volume Mounts**
Docker Compose volume mounts enable true hot reload: save a React file and see instant browser updates, edit Python code and watch Django restart automatically. No rebuilding images, no restarting containers, no waiting around.

### **Consistent Environment for Your Entire Team**
Every developer gets the exact same Python version, Django version, PostgreSQL version, and system dependencies. Zero "works on my machine" issues.

### **Production-Like Architecture Running Locally**
Your development environment mirrors your production setup - containerized API connecting to a database - but with complete safety and isolation from production data.


**Welcome to professional containerized development!** 🚀