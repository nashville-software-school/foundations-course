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
# Move your API repository
mv ~/path/to/your/rock-of-ages-api ./

# Move your client repository  
mv ~/path/to/your/rock-of-ages-client ./
```

Your structure should now look like:
```
rock-of-ages-development/
├── rock-of-ages-api/
│   ├── Dockerfile
│   ├── manage.py
│   ├── requirements.txt
│   └── ... (other API files)
└── rock-of-ages-client/
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
      context: ./rock-of-ages-api
      dockerfile: Dockerfile
    container_name: api-container
    env_file:
      - ./rock-of-ages-api/.env.local
    ports:
      - "8000:8000"
    volumes:
      - ./rock-of-ages-api:/app
      - /app/.venv  # Preserve the virtual environment
    depends_on:
      postgres-db:
        condition: service_healthy
    command: pipenv run python manage.py runserver 0.0.0.0:8000

  # React Client Service
  client:
    build:
      context: ./rock-of-ages-client
      dockerfile: Dockerfile
    container_name: client-container
    env_file:
      - ./rock-of-ages-client/.env.local
    ports:
      - "3000:3000"
    volumes:
      - ./rock-of-ages-client:/app
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

### Understanding the Docker Compose File

Let's break down what each section does:

**version: '3.8'**
- Specifies the Docker Compose file format version
- Version 3.8 provides all modern features we need

**services:**
- Defines all containers that make up your application
- Each service can be built from a Dockerfile or use a pre-built image

**postgres-db service:**
- `image: postgres:15` - Uses the official PostgreSQL image
- `environment:` - Sets database configuration (same as our -e flags)
- `volumes:` - Persists database data between container restarts
- `healthcheck:` - Ensures database is ready before starting dependent services

**api service:**
- `build:` - Builds from your Dockerfile instead of using an image
- `context:` - Where to find the Dockerfile
- `env_file:` - Loads environment variables from a file
- `volumes:` - **Key feature!** Mounts your code directory into the container
  - `./rock-of-ages-api:/app` - Maps your local API code to `/app` in the container
  - `/app/.venv` - Preserves the pipenv virtual environment (prevents override)
- `depends_on:` - Ensures database is healthy before starting
- `command:` - Uses pipenv to run Django with the correct Python environment

**client service:**
- Similar to API service but for React
- `- /app/node_modules` - Prevents overwriting container's node_modules

**volumes:**
- `postgres_data:` - Named volume for database persistence

**networks:**
- Automatically creates a network for all services
- Services can reach each other by name (postgres-db, api, client)

### Key Improvements Over Manual Setup

1. **Volume Mounts**: The `volumes:` sections mount your local code into the containers. When you change code, the changes appear instantly inside the container!

2. **Automatic Networking**: No need to manually create networks - Docker Compose handles it

3. **Dependency Management**: `depends_on` ensures services start in the right order

4. **Health Checks**: Services wait for dependencies to be truly ready, not just started

5. **Named Volumes**: Database data persists between container restarts

## Running Your Docker Compose Setup

### Step 4: Start Everything with One Command

```bash
# From the rock-of-ages-development directory
docker compose up
```

That's it! This single command:
- Creates the network
- Builds images if needed
- Starts all containers in the correct order
- Shows combined logs from all services

### Troubleshooting: ModuleNotFoundError

If you see an error like `ModuleNotFoundError: No module named 'django'`, this is because the volume mount is overriding the virtual environment. Here's how to fix it:

**Option 1 - Rebuild without cache:**
```bash
# Stop everything
docker compose down

# Rebuild without using cache
docker compose build --no-cache

# Start again
docker compose up
```

**Option 2 - Install dependencies inside the running container:**
```bash
# While containers are running, in a new terminal:
docker compose exec api pipenv install

# This installs the dependencies in the mounted volume
```

**Why this happens**: The Rock of Ages API uses pipenv to create a virtual environment at `.venv` inside the container. When we mount our local code as a volume, it can override this directory. The `- /app/.venv` line in the volumes section prevents this, but sometimes you need to rebuild to get everything synced properly.

### Step 5: Run in Background Mode

If you prefer to run everything in the background:

```bash
docker compose up -d
```

To see logs when running in background:
```bash
docker compose logs -f
```

### Useful Docker Compose Commands

**Stop everything:**
```bash
docker compose down
```

**Rebuild images (after Dockerfile changes):**
```bash
docker compose build
```

**Restart a specific service:**
```bash
docker compose restart api
```

**View logs for a specific service:**
```bash
docker compose logs client
```

**Run a command in a service:**
```bash
# Access the database
docker compose exec postgres-db psql -U rockadmin -d rockofages

# Run Django migrations
docker compose exec api python manage.py migrate
```

## Setting Up VS Code Dev Containers

Now let's add the final piece: seamless debugging and development inside your containers.

### Step 6: Install Dev Containers Extension

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

This means you get full IntelliSense, debugging, and all your favorite extensions working inside the container environment!

## Testing Hot Reload and Debugging

### Step 7: Experience the Magic

Let's add a simple feature to see hot reloading in action. We'll add the ability to favorite rocks.

**API Change** - Add to `rock-of-ages-api/rockapi/models/rock.py`:

```python
class Rock(models.Model):
    name = models.CharField(max_length=100)
    weight = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rocks')
    type = models.ForeignKey(RockType, on_delete=models.CASCADE, related_name='rocks')
    # Add this new field
    favorited_by = models.ManyToManyField(User, related_name='favorite_rocks', blank=True)
```

**Client Change** - Add to `rock-of-ages-client/src/components/RockCard.jsx`:

```jsx
// Add this inside your RockCard component
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
2. Watch your terminal - Django automatically reloads!
3. Refresh your browser - React updates automatically!
4. No rebuilding, no restarting containers!

### Setting a Breakpoint in VS Code

1. Click the Dev Containers icon in the bottom-left corner of VS Code
2. Select "Attach to Running Container" → "api-container"
3. Open any Python file and click in the gutter to set a breakpoint
4. Make an API request from your browser
5. VS Code stops at your breakpoint with full debugging capabilities!

## Summary: Your New Development Workflow

You've transformed from this:
- 10+ commands to see code changes
- Manual container management
- No debugging capability
- Fragile, error-prone setup

To this:
- `docker compose up` to start everything
- Instant hot reload on code changes
- Full debugging with breakpoints
- Professional development environment

With Docker Compose and Dev Containers, you now have:
- **One command** to rule them all
- **Live code updates** without rebuilding
- **Integrated debugging** that just works
- **Consistent environment** for your entire team
- **Production-like architecture** running locally

This is the same development workflow used by professional teams at companies like Microsoft, Google, and Netflix. You're not just learning tools - you're adopting industry best practices that will serve you throughout your career!