
## Setting Up Your Project Structure

Let's organize your repositories properly for Docker Compose:

### Why Project Structure Matters

Docker Compose works best when all related services are organized under a single parent directory. This allows:
- Relative path references in the compose file
- Shared networks automatically
- Easy volume mounting for development
- Single command to manage everything

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
```

**⚠️ IMPORTANT**: 
1. Replace `your-api-repo-name` with your actual API repository folder name (4 places)
2. Replace `your-client-repo-name` with your actual client repository folder name (4 places)
3. Make sure the PostgreSQL environment values match what's in your existing `.env.local` file!

**Notice the API command**: We're using the full Django startup command including database seeding. This means when you run `docker compose up\