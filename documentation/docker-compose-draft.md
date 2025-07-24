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

There's a bug in your new favorite rocks feature. You want to place a breakpoint in the API code to see exactly what's happening. Here's your current process:

1. Stop the API container: `docker stop api-container`
2. Remove it: `docker rm api-container`
3. Run the container in interactive mode with modified command:
   ```bash
   docker run -it \
     --name api-container \
     --network rock-of-ages-network \
     --env-file .env.local \
     -p 8000:8000 \
     rock-of-ages-api \
     python -m pdb manage.py runserver 0.0.0.0:8000
   ```
4. Navigate to the breakpoint in the debugger
5. When done debugging, you need to stop, remove, and restart normally

**The frustration is real**: No hot reloading, no easy debugging, constant container management.

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
    depends_on:
      - api
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
- `command:` - This is what actually starts your Django server! When this runs, your API is live at localhost:8000

**client service:**
- **Previously**: You built and ran with multiple commands
- **Now**: Everything is defined declaratively
- `command:` - This starts your React development server! When this runs, your app is live at localhost:3000

**Key Improvements Over Manual Setup**

1. **One Network**: No need to manually create with `docker network create`
2. **Automatic Building**: No separate `docker build` commands
3. **Health Checks**: Services wait for dependencies to be truly ready
4. **Volume Mounts**: Code changes appear instantly without rebuilding
5. **Single Command**: Replace 10+ commands with just `docker compose up`

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

## Quick Verification Test

Let's verify everything is working correctly before moving on:

### 1. Test the Database
In a new terminal (keep docker compose running):
```bash
docker exec -it postgres-db psql -U rockadmin -d rockofages
```

Run this query:
```sql
SELECT COUNT(*) FROM rockapi_rock;
```

You should see 3 rocks. Type `\q` to exit.

**2. Test The API and React Client**
- Open your browser to \`http://localhost:3000\`
- You should see the Rock of Ages application
- **Open Developer Tools** and go to the **Network** tab
- Try to register a new user account
- **In the Network tab**, confirm that API calls are going to \`localhost:8000\` (not your EC2 instance)
- Login and try to view the rocks collection
- Test adding a rock to your collection
- **Verify in Network tab** that all API requests show \`localhost:8000\` as the target

**If all three tests pass, your Docker Compose environment is working perfectly!**

### Step 6: Run in Background Mode

If you prefer to run everything in the background:

```bash
docker compose up -d
```

To see logs when running in background:
```bash
docker compose logs -f
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

Now let's add the final piece: seamless debugging and development inside your containers.

### Step 7: Install Dev Containers Extension

1. Open VS Code
2. Go to Extensions (Cmd/Ctrl + Shift + X)
3. Search for "Dev Containers"
4. Install the official Microsoft extension "Dev Containers"

### What Dev Containers Will Do For Us

The Dev Containers extension allows VS Code to:
- Open your project inside the running container
- Use the container's Python/Node environment
- Set breakpoints that work inside containers
- Access terminals inside containers
- Use all VS Code features as if running locally

### Step 8: Create Dev Container Configuration

For the Rock of Ages API, we need to create a configuration file that tells VS Code how to connect to our running container.

In your API repository, create a `.devcontainer` folder and add a `devcontainer.json` file:

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
  "features": {},
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
  "remoteUser": "root"
}
```

### Step 9: Open in Dev Container

1. Make sure your Docker Compose stack is running (`docker compose up`)
2. Open VS Code
3. Open your API repository folder
4. You'll see a popup: "Folder contains a Dev Container configuration file. Reopen folder to develop in a container"
5. Click "Reopen in Container"
6. VS Code will restart and connect to your running API container

**Alternative method:**
1. Press F1 or Cmd/Ctrl + Shift + P
2. Type "Dev Containers: Open Folder in Container"
3. Select your API repository

### Step 10: Test Debugging with Dev Containers

Now let's test that debugging works inside the container:

1. In VS Code (now connected to the container), open `rockapi/views/rock_view.py`
2. Find the `list` method
3. Click in the gutter next to `rocks = Rock.objects.all()` to set a breakpoint (red dot appears)
4. In your browser, navigate to http://localhost:3000
5. Login and click "All Rocks"
6. VS Code should stop at your breakpoint!
7. You can now:
   - Inspect variables
   - Step through code
   - Use the Debug Console
   - Everything works as if running locally!

## Testing Hot Reload and Debugging

### Step 11: Experience the Magic

Let's add a simple feature to see hot reloading in action. We'll add the ability to favorite rocks.

**API Change** - Add to `rockapi/models/rock.py`:

```python
class Rock(models.Model):
    name = models.CharField(max_length=100)
    weight = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rocks')
    type = models.ForeignKey(RockType, on_delete=models.CASCADE, related_name='rocks')
    # Add this new field
    favorited_by = models.ManyToManyField(User, related_name='favorite_rocks', blank=True)
```

After saving, you'll need to run migrations since you changed the model:
```bash
docker compose exec api pipenv run python manage.py makemigrations
docker compose exec api pipenv run python manage.py migrate
```

**Client Change** - Add to your React component that displays rocks:

```jsx
// Add this inside your rock display component
const [isFavorited, setIsFavorited] = useState(false);

const toggleFavorite = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rocks/${rock.id}/favorite`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      setIsFavorited(!isFavorited);
    }
  } catch (error) {
    console.error('Error favoriting rock:', error);
  }
};

// Add this to your JSX
<button 
  onClick={toggleFavorite} 
  className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
>
  {isFavorited ? '❤️' : '🤍'}
</button>
```

**The Magic Moment:**
1. Save these files
2. Watch your terminal - Django automatically detects the model change!
3. The React dev server hot reloads instantly!
4. No rebuilding, no restarting containers!

## Summary: Your New Development Workflow

You've transformed from this:
- 10+ commands to see code changes
- Manual container management
- No debugging capability
- Fragile, error-prone setup

To this:
- `docker compose up` to start everything
- Instant hot reload on code changes
- Full debugging with breakpoints in VS Code
- Professional development environment

With Docker Compose and Dev Containers, you now have:
- **One command** to rule them all
- **Live code updates** without rebuilding
- **Integrated debugging** that just works
- **Consistent environment** for your entire team
- **Production-like architecture** running locally

This is the same development workflow used by professional teams at companies like Microsoft, Google, and Netflix. You're not just learning tools - you're adopting industry best practices that will serve you throughout your career!