# Draft Chapters

# Setting up AWS RDS PostgreSQL Database

In this section, you'll create a managed PostgreSQL database using Amazon RDS (Relational Database Service). This database will store all the data for your Rock of Ages API.

## What You're Building

Instead of using a local SQLite database file, you'll create a PostgreSQL database that runs in the AWS cloud. This demonstrates how real-world applications separate their database from their application code for better scalability and reliability.

## Step 1: Create RDS Database Instance

### Navigate to RDS Console
1. Log in to your AWS account
2. Go to the [RDS Console](https://console.aws.amazon.com/rds/)
3. Click **Create database**

### Configure Your Database
Fill out the database creation form with these settings:

**Engine Options:**
- **Engine type**: PostgreSQL
- **Version**: PostgreSQL 15.x (use the default recommended version)

**Templates:**
- Select **Free tier** (this ensures you stay within free usage limits)

**Settings:**
- **DB instance identifier**: `rock-of-ages-db`
- **Master username**: `rockadmin`
- **Master password**: Create a secure password and **write it down** - you'll need it later!
- **Confirm password**: Re-enter your password

**DB Instance Class:**
- **DB instance class**: `db.t4g.micro` (this is free tier eligible)

**Storage:**
- **Storage type**: General Purpose SSD (gp2)
- **Allocated storage**: 20 GB (minimum)
- **Enable storage autoscaling**: Check this box
- **Maximum storage threshold**: 100 GB

**Connectivity:**
- **Virtual Private Cloud (VPC)**: Use default VPC
- **Subnet group**: default
- **Public access**: **Yes** (normally you wouldn't do this in production, but it's needed for this course)
- **VPC security group**: Create new
- **New VPC security group name**: `rock-of-ages-db-sg`
- **Database port**: 5432 (default PostgreSQL port)

**Database Authentication:**
- **Database authentication options**: Password authentication

**Additional Configuration:**
- Click **Additional configuration** to expand
- **Initial database name**: `rockofages` (no spaces or hyphens)
- **Backup retention period**: 1 day
- **Enable Enhanced monitoring**: Optional (you can leave unchecked to save costs)

### Create the Database
1. Review your settings
2. Click **Create database**
3. Wait for the database status to show **Available** (this takes 5-10 minutes)

## Step 2: Configure Security Group

Your database needs to allow connections from the internet (normally not recommended, but necessary for this course).

1. While your database is being created, go to **EC2 Console** → **Security Groups**
2. Find the security group that was created for your database (should be named `rock-of-ages-db-sg`)
3. Select it and click **Edit inbound rules**
4. Click **Add rule**:
   - **Type**: PostgreSQL
   - **Port**: 5432
   - **Source**: Anywhere-IPv4 (0.0.0.0/0)
   - **Description**: "Allow PostgreSQL connections for Rock of Ages course"
5. Click **Save rules**

## Step 3: Get Your Database Connection Information

Once your RDS instance shows **Available** status:

1. Click on your database instance (`rock-of-ages-db`)
2. In the **Connectivity & security** tab, copy the **Endpoint** 
   - It will look like: `rock-of-ages-db.c9xkv8example.us-east-2.rds.amazonaws.com`
   - **Save this endpoint** - you'll need it for your API configuration

## What You've Accomplished

You now have:
- ✅ A PostgreSQL database running in AWS
- ✅ Proper security group configuration for connections
- ✅ Database endpoint URL for your application to connect

**Keep handy for the next section:**
- Database endpoint URL
- Master password you created
- Database name: `rockofages`
- Username: `rockadmin`

Next, you'll configure your Rock of Ages API to connect to this database instead of using a local SQLite file.

"********************************************************************************************************************"

# Understanding the API Changes for Cloud Database

Before setting up your API, let's understand what changed when we moved from a local SQLite database to a cloud PostgreSQL database. This will help you understand why each piece is necessary and how they work together.

## Get the Repository First

To follow along with the explanations below, clone the Rock of Ages API repository:

```bash
git clone https://github.com/YOUR-INSTRUCTOR-REPO/rock-of-ages-api-rds.git
cd rock-of-ages-api-rds
```

Open this repository in your code editor so you can examine the files as we discuss them.

## The Big Picture: What Changed?

**Before (SQLite):**
- Database was a single file (`db.sqlite3`) stored locally
- No network connection needed
- Simple setup, but not suitable for production

**After (PostgreSQL on RDS):**
- Database runs on AWS servers
- Requires network connection and authentication
- More complex setup, but production-ready and scalable

Let's examine each change we made to support this transition.

## 1. New Dependency: PostgreSQL Adapter

### What Changed in Pipfile
Open the `Pipfile` in your repository and look for these additions:

```toml
[packages]
django = "*"
autopep8 = "*"
pylint = "*"
djangorestframework = "*"
django-cors-headers = "*"
pylint-django = "*"
psycopg2-binary = "*"  # ← This line was added
python-dotenv = "*"    # ← This line was added
```

### Why This Change Was Needed

**The Problem**: Django can talk to SQLite out of the box, but it needs a special "adapter" to communicate with PostgreSQL.

**The Solution**: 
- **`psycopg2-binary`**: This is like a translator between Django (Python) and PostgreSQL
- **`python-dotenv`**: This helps us securely manage sensitive information like passwords

**Real-world analogy**: If Django speaks English and PostgreSQL speaks French, `psycopg2-binary` is the translator that allows them to communicate.

## 2. Database Configuration Changes

### What Changed in settings.py

Open `rockproject/settings.py` in your repository and examine the database configuration:

**Before (SQLite):**
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',  # Just a file path
    }
}
```

**After (PostgreSQL):**
```python
from dotenv import load_dotenv
load_dotenv()  # Load environment variables from .env file

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',  # Different database type
        'NAME': os.getenv('DB_NAME', 'rockofages'),     # Database name
        'USER': os.getenv('DB_USER', 'rockadmin'),      # Username 
        'PASSWORD': os.getenv('DB_PASSWORD'),           # Password
        'HOST': os.getenv('DB_HOST'),                   # Server address
        'PORT': os.getenv('DB_PORT', '5432'),          # Port number
    }
}
```

### Why This Change Was Needed

**SQLite**: Just needed to know where the database file was stored on your computer.

**PostgreSQL**: Needs to know how to connect over the internet:
- **Where** is the database? (HOST)
- **What port** should I connect to? (PORT)
- **Who** am I? (USER)
- **What's my password**? (PASSWORD)
- **Which database** should I use? (NAME)

**Security Note**: We use `os.getenv()` instead of hardcoding values because database passwords should never be stored directly in code files.

## 3. Environment Variables: Keeping Secrets Safe

### What are .env.example and .env files?

Look at the `.env.example` file in your repository:

**`.env.example`** (included in the repository):
```bash
# Database Configuration
DB_NAME=rockofages
DB_USER=rockadmin
DB_PASSWORD=your-secure-password-here
DB_HOST=rock-of-ages-db.c9xexample.us-east-2.rds.amazonaws.com
DB_PORT=5432
```

**`.env`** (you'll create this with your actual values):
```bash
# Database Configuration  
DB_NAME=rockofages
DB_USER=rockadmin
DB_PASSWORD=MyActualPassword123!
DB_HOST=rock-of-ages-db.c9xkv8actual.us-east-2.rds.amazonaws.com
DB_PORT=5432
```

### Why Use Environment Variables?

**The Problem**: Database passwords are sensitive information that shouldn't be:
- Stored in code files
- Committed to Git repositories
- Shared accidentally

**The Solution**: Environment variables let you:
- Keep secrets separate from code
- Use different values for different environments (development, testing, production)
- Share code safely without exposing passwords

**How it works**:
1. `python-dotenv` reads your `.env` file when Django starts
2. `os.getenv('DB_PASSWORD')` retrieves the password from environment variables
3. Django uses these values to connect to the database

**Real-world analogy**: It's like having a locked box (`.env` file) for your house key (database password), instead of leaving the key under a rock (in your code) where anyone can find it.

## 5. Database Setup Script: seed_database.sh

### What This Script Does

Open the `seed_database.sh` file in your repository and examine its contents:

```bash
#!/bin/bash

# Load environment variables from .env file
set -a
source .env
set +a

echo "🗄️  Setting up PostgreSQL database..."

# Create Django's built-in tables (users, sessions, etc.)
echo "⚙️  Running Django migrations..."
python3 manage.py migrate

# Generate migration files for our Rock app
echo "📋 Creating app-specific migrations..."
python3 manage.py makemigrations rockapi

# Create our app's tables (Rock, Type)
echo "🔧 Applying app migrations..."
python3 manage.py migrate rockapi

# Load sample data from JSON files
echo "📊 Loading seed data..."
python3 manage.py loaddata users
python3 manage.py loaddata tokens  
python3 manage.py loaddata types
python3 manage.py loaddata rocks

echo "✅ Database setup complete!"
```

### How Each Step Works

**1. Loading Environment Variables (`source .env`)**
- Makes your database connection info available to Django
- Like giving Django the keys to connect to your database

**2. Running Migrations (`python3 manage.py migrate`)**
- Creates Django's standard tables (user accounts, sessions, etc.)
- Like building the foundation of a house

**3. Creating App Migrations (`makemigrations rockapi`)**
- Looks at your models (Rock.py, Type.py) and creates instructions for building tables
- Like creating blueprints for your custom rooms

**4. Applying App Migrations (`migrate rockapi`)**
- Actually creates your app's tables in the database
- Like building those custom rooms from the blueprints

**5. Loading Fixtures (`loaddata`)**
- Puts sample data into your tables
- Like furnishing the rooms with sample furniture

### Why This Order Matters

```
Environment Variables → Database Connection → Table Structure → Sample Data
```

Each step depends on the previous one:
- Can't connect without credentials
- Can't add data without tables
- Can't create app tables without Django's foundation tables

### How Docker Uses This Script

Look at the `Dockerfile` in your repository and find this line at the bottom:
```dockerfile
CMD pipenv run bash -c "./seed_database.sh && python manage.py runserver 0.0.0.0:8000"
```

This means when you start the container:
1. It sets up the database automatically
2. Then starts the API server
3. Your API is ready to use immediately

## 6. Containerization: Why Docker?

### The Problem with Traditional Setup
Without containers, every developer needs to:
- Install the correct Python version
- Install all the right packages (Django, psycopg2, etc.)
- Deal with version conflicts between projects
- Troubleshoot environment-specific issues

### The Container Solution
With Docker:
- All dependencies are packaged together
- Same environment everywhere (your laptop, AWS, teammate's computer)
- "It works on my machine" = "It works everywhere"

### How Our Dockerfile Works
```dockerfile
FROM python:latest
# ... setup steps ...
CMD pipenv run bash -c "./seed_database.sh && python manage.py runserver 0.0.0.0:8000"
```

When you run the container:
1. **Automatic Setup**: Database tables and data are created automatically
2. **Clean Environment**: No conflicts with other Python projects on your machine
3. **Production Ready**: Same container can be deployed to AWS

## How Everything Connects

Here's the complete flow of how all these pieces work together:

```
1. .env file → Contains your database credentials
2. settings.py → Reads .env and configures Django to use PostgreSQL
3. psycopg2-binary → Allows Django to communicate with PostgreSQL
4. Docker container → Packages everything together with dependencies
5. seed_database.sh → Creates tables and loads sample data (runs automatically)
6. Django app → Serves API requests from the containerized environment
```

**Real-world analogy**: 
- `.env` = Your ID and keys
- `settings.py` = GPS directions to the database
- `psycopg2-binary` = The vehicle that gets you there
- **Docker container** = A fully equipped mobile office that works anywhere
- `seed_database.sh` = Setting up your workspace automatically when you arrive
- Django app = Doing your actual work from your mobile office

Understanding these connections will help you understand how modern cloud applications use containers to ensure consistency across different environments - a key principle in DevOps and cloud deployment.

## Next Steps

Now that you understand what changed and why, you're ready to configure your own API to connect to your RDS database. Each step in the setup process will make more sense because you understand the purpose behind each component.
"********************************************************************************************************************"

# Setting up Rock of Ages API with RDS Database

Now that you understand how the API was modified to work with PostgreSQL, let's get it running with your AWS RDS database.

## Prerequisites

Before starting, make sure you have:
- ✅ Created an RDS PostgreSQL database (from previous section)
- ✅ Your database endpoint URL 
- ✅ Your database password
- ✅ Docker installed on your computer
- ✅ Yaak (or similar API testing tool) installed

## Step 1: Get the Repository

### Clone the Repository
Since you've already cloned the repository in the previous chapter, navigate to it:
```bash
cd rock-of-ages-api-rds
```

If you skipped the previous chapter, clone it now:
```bash
git clone https://github.com/YOUR-INSTRUCTOR-REPO/rock-of-ages-api-rds.git
cd rock-of-ages-api-rds
```

## Step 2: Configure Database Connection

### Create Your Environment File
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file in your code editor and replace the placeholder values with your actual RDS information:
   ```bash
   DB_NAME=rockofages
   DB_USER=rockadmin
   DB_PASSWORD=your-actual-password-here  # ← Replace with your RDS password
   DB_HOST=your-rds-endpoint.amazonaws.com  # ← Replace with your RDS endpoint
   DB_PORT=5432
   ```

### Example of what your .env should look like:
```bash
DB_NAME=rockofages
DB_USER=rockadmin  
DB_PASSWORD=MySecurePassword123!
DB_HOST=rock-of-ages-db.c9xkv8example.us-east-2.rds.amazonaws.com
DB_PORT=5432
```

## Step 3: Build and Run the Docker Container

### Build the Container
```bash
docker build -t rock-of-ages-api .
```

This creates a Docker image with all the necessary dependencies (Python, Django, PostgreSQL adapter, etc.).

### Run the Container
```bash
docker run --env-file .env -p 8000:8000 rock-of-ages-api
```

**What this command does:**
- `--env-file .env`: Loads your database connection info into the container
- `-p 8000:8000`: Maps port 8000 from the container to your computer
- `rock-of-ages-api`: The name of the Docker image we just built

**Expected output:**
```
🗄️ Setting up PostgreSQL database...
⚙️ Running Django migrations...
📋 Creating app-specific migrations...
🔧 Applying app migrations...
📊 Loading seed data...
✅ Database setup complete!
System check identified no issues (0 silenced).
Django version 5.2.3, using settings 'rockproject.settings'
Starting development server at http://0.0.0.0:8000/
Quit the server with CONTROL-C.
```

**If you see this output, everything worked!** The container:
1. ✅ Connected to your RDS database
2. ✅ Created all necessary tables
3. ✅ Loaded sample data (users, rock types, rocks)
4. ✅ Started the API server

## Step 4: Test Your API with Yaak

Now let's verify everything is working by testing your API endpoints using Yaak.

### Test 1: Check API Health (Unauthenticated)
**Purpose**: Verify the API is running and connected to the database.

1. **Open Yaak** and create a new request
2. **Method**: GET
3. **URL**: `http://localhost:8000/rocks`
4. **Send the request**

**Expected Response:**
```json
{
  "detail": "Authentication credentials were not provided."
}
```

**✅ This is good!** It means:
- Your API is running
- The database connection works
- Authentication is properly configured

### Test 2: Register a New User
**Purpose**: Test user creation and get an authentication token.

1. **Create a new request in Yaak**
2. **Method**: POST
3. **URL**: `http://localhost:8000/register`
4. **Headers**: 
   - Content-Type: `application/json`
5. **Body** (JSON):
   ```json
   {
     "email": "test@example.com",
     "password": "testpass123",
     "first_name": "Test",
     "last_name": "User"
   }
   ```
6. **Send the request**

**Expected Response:**
```json
{
  "token": "abc123def456..."
}
```

**✅ Save this token!** You'll need it for the next test.

### Test 3: Get Rocks with Authentication
**Purpose**: Test authenticated requests and verify sample data was loaded.

1. **Create a new request in Yaak**
2. **Method**: GET
3. **URL**: `http://localhost:8000/rocks`
4. **Headers**:
   - Authorization: `Token abc123def456...` (use your actual token from Test 2)
5. **Send the request**

**Expected Response:**
```json
[
  {
    "id": 1,
    "name": "Ernestina",
    "weight": "1.30",
    "type": {
      "label": "Sedimentary"
    },
    "user": {
      "first_name": "Jane",
      "last_name": "Smith"
    }
  },
  {
    "id": 2,
    "name": "Orpha", 
    "weight": "0.50",
    "type": {
      "label": "Metamorphic"
    },
    "user": {
      "first_name": "John",
      "last_name": "Doe"
    }
  },
  {
    "id": 3,
    "name": "Sasha",
    "weight": "0.29", 
    "type": {
      "label": "Basalt"
    },
    "user": {
      "first_name": "Jane",
      "last_name": "Smith"
    }
  }
]
```

**✅ Success!** You should see 3 sample rocks with their types and owners.

### Test 4: Get Rock Types
**Purpose**: Verify all seed data loaded correctly.

1. **Create a new request in Yaak**
2. **Method**: GET  
3. **URL**: `http://localhost:8000/types`
4. **Headers**:
   - Authorization: `Token abc123def456...` (your token)
5. **Send the request**

**Expected Response:**
```json
[
  {
    "id": 1,
    "label": "Metamorphic"
  },
  {
    "id": 2, 
    "label": "Igneous"
  },
  {
    "id": 3,
    "label": "Sedimentary"
  },
  {
    "id": 4,
    "label": "Shale"
  },
  {
    "id": 5,
    "label": "Basalt"
  }
]
```

**✅ Perfect!** All 5 rock types are loaded.

## Understanding What You Just Tested

Through these Yaak tests, you verified:

1. **Container Startup**: The Docker container started successfully
2. **Database Connection**: Your API connected to AWS RDS PostgreSQL
3. **Table Creation**: Django migrations created all necessary tables
4. **Data Loading**: Sample users, tokens, types, and rocks were loaded
5. **Authentication**: Token-based authentication is working
6. **API Functionality**: All endpoints are responding correctly

This is exactly how your React frontend will interact with the API!

## Troubleshooting Common Issues

### Container won't start / Database connection errors
**Error messages like**: "Connection refused", "Authentication failed", "Host not found"

**Solutions**:
1. **Check your .env file**: Ensure no extra spaces, correct endpoint URL, correct password
2. **Verify RDS status**: Your RDS instance must show "Available" in AWS Console
3. **Check security group**: Ensure port 5432 is open (see RDS setup instructions)
4. **Restart container**: Stop with `Ctrl+C` and run the docker run command again

### "No module named 'psycopg2'" or similar Python errors
**This should not happen with containers**, but if it does:
- Rebuild the container: `docker build -t rock-of-ages-api .`
- Check your Dockerfile is unchanged from the repository

### API returns 500 errors in Yaak
- Check the container logs for Django error messages
- Verify your database contains the expected tables and data
- Ensure you're using the correct token format: `Token abc123...`

### Can't connect to localhost:8000
- Ensure the container is running (you should see the Django server output)
- Verify you used `-p 8000:8000` in your docker run command
- Try `http://127.0.0.1:8000` instead of `http://localhost:8000`

## What You've Accomplished

You now have:
- ✅ Django API running in a Docker container
- ✅ Connected to AWS RDS PostgreSQL database
- ✅ Database tables created and populated with sample data
- ✅ Verified API functionality with Yaak testing
- ✅ Authentication system working with token-based access

Your API is now running in a containerized, cloud-ready configuration that demonstrates modern application architecture with proper separation between application and data layers.

## Next Steps

### Database Separation
**Before**: Your application and database were tightly coupled - if your server went down, you lost everything.

**Now**: Your database runs independently from your application. This means:
- **Scalability**: Multiple application servers can connect to the same database
- **Reliability**: Database survives even if application servers crash
- **Team Collaboration**: Developers can connect to shared development databases
- **Backup & Recovery**: AWS handles automated backups and point-in-time recovery

### Environment Configuration
You've implemented a professional pattern for managing configuration:
- **Development**: Uses local `.env` file
- **Production**: Uses GitHub Secrets → Environment Variables
- **Security**: Passwords never appear in code or logs
- **Flexibility**: Easy to change database settings without code changes

### Production Architecture
Your setup now mirrors real-world application deployments:
```
GitHub → GitHub Actions → ECR → EC2 (API Container) → RDS (Database)
```

This is the same pattern used by companies like:
- **Spotify**: Microservices connecting to managed databases
- **Netflix**: Containerized applications with cloud databases  
- **Airbnb**: APIs deployed to containers with separate data layer

## Key Learning Concepts

**1. Database as a Service (DBaaS)**
RDS is an example of "Database as a Service" - you get a production-ready database without managing servers, updates, or backups.

**2. The Twelve-Factor App**
Your environment variable usage follows the [Twelve-Factor App methodology](https://12factor.net/), a set of best practices for building modern applications.

**3. Infrastructure as Code**
While you created RDS manually, in larger organizations this would be defined in code using tools like Terraform (which you'll see later).

**4. Container Networking**
Your container can now communicate with external services (RDS) while remaining portable and isolated.

In the next section, you'll set up a local development environment that mimics this production architecture using Docker containers and networks.

# Part 2: Local Development with Docker Network

In this section, you'll set up a local development environment that mirrors your production architecture. Instead of running your API, database, and client separately on your machine, you'll run all three as connected Docker containers.

## What You're Building

You'll create a complete containerized development environment:
- **React Client Container**: Your frontend application
- **Django API Container**: Your backend API (same as production)
- **PostgreSQL Database Container**: Local database for development

**The Goal**: Mimic your production environment locally while maintaining a great development experience.

## Why Containerize Your Development Environment?

### The Traditional Development Problem

**Before containerization**, new team members faced this setup process:
1. Install specific Node.js version for React
2. Install specific Python version for Django
3. Install PostgreSQL database locally
4. Configure database connection settings
5. Install system dependencies (different per OS)
6. Deal with version conflicts between projects
7. Hope everything works together

**Result**: "It works on my machine" syndrome and hours of setup time.

### The Container Solution

**With containerized development**:
1. Clone repository
2. Run one command to start everything
3. Identical environment for every team member
4. No local software installation required
5. Easy to reset or experiment

**Result**: Consistent, predictable development environment that mirrors production.

### Real-World Examples

**This approach is becoming standard practice**:
- **GitHub Codespaces**: Built on Dev Containers technology for cloud development
- **Microsoft**: Created and actively promotes Dev Containers for development teams
- **Open source projects**: Many use Dev Containers for contributor onboarding (like VS Code itself)
- **Enterprise teams**: Increasingly adopting containerized development for consistency

---

## Understanding Docker Networks

Before we build our environment, let's understand how containers communicate with each other.

### Container Isolation by Default

Each Docker container is isolated - it can't see or talk to other containers by default. This is like having separate apartments in a building with no way to visit each other.

```bash
# These containers CAN'T communicate
docker run --name api-container django-api
docker run --name db-container postgres
```

### Docker Networks: Connecting Containers

A Docker network is like adding a hallway between apartments - containers can now find and talk to each other using their names.

```bash
# Create a network
docker network create my-app-network

# Containers on the same network CAN communicate
docker run --name api-container --network my-app-network django-api
docker run --name db-container --network my-app-network postgres
```

### Container-to-Container Communication

Within a Docker network, containers can reach each other using **container names as hostnames**:

```python
# In your API container
DATABASE_HOST = "db-container"  # Not "localhost"!
```

**Important**: Your React app code runs in the browser, not in the container. Therefore it still uses `localhost` to reach the API. Only server-to-server communication uses container names.

---

## Step 1: Set Up Docker Network

### Create the Network
```bash
# Create a custom network for our containers
docker network create rock-of-ages-network
```

### Verify Network Creation
```bash
# List all networks
docker network ls

# You should see your new network listed
```

**Understanding networks**: This network acts like a private virtual network where your containers can find each other by name, just like computers on an office network.

---

## Step 2: Set Up PostgreSQL Database Container

Instead of using AWS RDS for local development, you'll run PostgreSQL in a container. This gives you a clean, isolated database that's easy to reset and experiment with, completely separate from your production data.

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
- `-d`: Run in background (detached)
- `--name postgres-db`: Container name (other containers will use this to connect)
- `--network rock-of-ages-network`: Connect to our custom network
- `-e`: Set environment variables for database configuration
- `-p 5432:5432`: Map port 5432 to your host (for database tools)
- `postgres:15`: Use PostgreSQL version 15 image

**About the environment variables**:
These `-e` flags are **defining new values** that configure how PostgreSQL sets itself up:
- `POSTGRES_DB=rockofages`: **Creates** a database named "rockofages" 
- `POSTGRES_USER=rockadmin`: **Creates** a user named "rockadmin"
- `POSTGRES_PASSWORD=localpassword123`: **Sets** the password for that user

**Can you change these values?** Yes! You can name them whatever you want - you're creating the database configuration, not referencing something that already exists. Just make sure when we create the API's `.env.local` file in the next step, it uses the same values you define here.

### Verify Database is Running
```bash
# Check container status
docker ps

# Check database logs
docker logs postgres-db
```

**Expected output from `docker logs postgres-db`:**
```
The files belonging to this database system will be owned by user "postgres"...
PostgreSQL init process complete; ready for start up.

2024-01-15 10:30:45.123 UTC [1] LOG:  starting PostgreSQL 15.5 on x86_64-pc-linux-gnu
2024-01-15 10:30:45.124 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2024-01-15 10:30:45.125 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2024-01-15 10:30:45.128 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2024-01-15 10:30:45.135 UTC [56] LOG:  database system is ready to accept connections
```

**✅ Look for these success indicators:**
- "PostgreSQL init process complete; ready for start up"
- "database system is ready to accept connections"
- No error messages about failed connections or authentication

---

## Step 3: Set Up API Container for Local Development

Your API container needs to connect to the local PostgreSQL container instead of AWS RDS.

### Create Local Environment File
Create `.env.local` in your API repository:

```bash
# Database Configuration for Local Development
DB_NAME=rockofages
DB_USER=rockadmin
DB_PASSWORD=localpassword123
DB_HOST=postgres-db  # ← Container name, not localhost!
DB_PORT=5432
```

**Key Point**: Notice `DB_HOST=postgres-db` - this is how containers communicate within the network.

### Build and Run API Container
```bash
# Make sure you're in your API repository directory
cd path/to/your/rock-of-ages-api

# Build the API image (if you haven't already)
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

# You should see successful database connection and setup
# Test API endpoint
curl http://localhost:8000/rocks
```

---

## Step 4: Set Up React Client Container

Now containerize your React client to complete the development environment.

### Create React Client Dockerfile
In your React client repository, create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
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
- `node:18-alpine`: Lightweight Node.js runtime
- `--host 0.0.0.0`: Allows connections from outside the container
- `--port 3000`: Explicit port configuration

### Create Local Environment for Client
Create `.env.local` in your React client repository:

```bash
# API Configuration for Local Development
VITE_API_URL=http://localhost:8000
```

**Important**: The React client still uses `localhost:8000` because the JavaScript runs in your browser, not inside the container.

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

## Step 5: Set Up Development Container (VS Code)

To make development easier, we'll use VS Code's Dev Containers extension, which lets you develop inside the container with full debugging support.

### Install Dev Containers Extension
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Dev Containers" by Microsoft
4. Install the extension

### Create Dev Container Configuration
In your API repository, create `.devcontainer/devcontainer.json`:

```json
{
  "name": "Rock of Ages API Development",
  "dockerComposeFile": "../docker-compose.dev.yml",
  "service": "api",
  "workspaceFolder": "/app",
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "ms-python.debugpy",
        "ms-python.pylint"
      ],
      "settings": {
        "python.defaultInterpreterPath": "/usr/local/bin/python"
      }
    }
  },
  "postCreateCommand": "pipenv install",
  "forwardPorts": [8000, 5432]
}
```

### Create Development Docker Compose
Create `docker-compose.dev.yml` in your API repository:

```yaml
version: '3.8'

services:
  postgres:
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

  api:
    build: .
    container_name: api-container
    environment:
      DB_NAME: rockofages
      DB_USER: rockadmin
      DB_PASSWORD: localpassword123
      DB_HOST: postgres
      DB_PORT: 5432
    ports:
      - "8000:8000"
    depends_on:
      - postgres
    volumes:
      - .:/app
      - /app/.venv

volumes:
  postgres_data:
```

### Open in Dev Container
1. Open your API repository in VS Code
2. VS Code will detect the Dev Container configuration
3. Click "Reopen in Container" when prompted
4. VS Code will build and start your development environment

---

## Step 6: Test Your Complete Environment

### Verify All Containers are Running
```bash
# Check all containers
docker ps

# You should see:
# - postgres-db
# - api-container  
# - client-container
```

### Test the Full Application Flow

**1. Test Database Connection**
```bash
# Connect to database directly
docker exec -it postgres-db psql -U rockadmin -d rockofages

# Run test query
SELECT * FROM rockapi_rock;
```

**2. Test API Endpoints**
```bash
# Test unauthenticated endpoint
curl http://localhost:8000/rocks

# Should return authentication error (expected)
```

**3. Test React Client**
- Open browser to `http://localhost:3000`
- Try to register a new user
- Try to view rocks

**4. Test Development Debugging**
- Set breakpoint in VS Code (in Dev Container)
- Set breakpoint in browser DevTools
- Trigger a request and watch both breakpoints hit

---

## Understanding the Complete Architecture

### Network Communication Flow
```
Browser → localhost:3000 → Client Container
Browser → localhost:8000 → API Container → postgres-db:5432 → Database Container
```

### Development vs Production
**Development (what you just built)**:
```
Client Container ←→ Docker Network ←→ API Container ←→ Database Container
```

**Production (from Part 1)**:
```
S3 + CloudFront ←→ Internet ←→ EC2 (API Container) ←→ RDS Database
```

**Key Insight**: Your development environment now mirrors production architecture!

---

## Benefits You've Achieved

### 1. Team Onboarding
**Before**: "Here's a 20-step setup guide, good luck!"
**Now**: "Clone the repo, click 'Reopen in Container', start coding!"

### 2. Environment Consistency
- Same database version everywhere
- Same Python version everywhere
- Same Node.js version everywhere
- Same dependencies everywhere

### 3. Easy Experimentation
```bash
# Try different database version
docker run postgres:13 --name postgres-test

# Reset entire environment
docker-compose down && docker-compose up

# Clean slate development
docker-compose down -v  # Removes all data
```

### 4. Professional Development Workflow
- Full debugging capabilities
- Hot reload and live development
- Database inspection tools
- Realistic production environment

### 5. Isolation and Cleanup
- No conflicts with other projects
- Easy to remove everything: `docker-compose down`
- No leftover processes or files on your system

---

## Troubleshooting Common Issues

### Container Won't Start
```bash
# Check container logs
docker logs container-name

# Check if port is already in use
docker ps
netstat -an | grep :8000
```

### Database Connection Issues
```bash
# Verify database is running
docker exec -it postgres-db psql -U rockadmin -d rockofages

# Check if API can reach database
docker exec -it api-container ping postgres-db
```

### Client Can't Reach API
- Verify API is running on port 8000
- Check that VITE_API_URL uses `localhost:8000` (not container name)
- Confirm both containers are on the same network

### Dev Container Issues
- Ensure Docker is running
- Try "Rebuild Container" command in VS Code
- Check `.devcontainer/devcontainer.json` syntax

---

## What You've Accomplished

You now have:
- ✅ Complete containerized development environment
- ✅ All services communicating via Docker network
- ✅ Professional development setup with VS Code Dev Containers
- ✅ Easy debugging across all services
- ✅ Environment that mirrors production architecture
- ✅ Simple onboarding process for new team members

## Key Learning Concepts

**1. Container Networking**: How containers communicate using names as hostnames
**2. Development Environment Architecture**: Mirroring production locally
**3. Container Orchestration**: Managing multiple connected services
**4. Modern Development Workflows**: Using Dev Containers for consistent development
**5. Environment Isolation**: Benefits of containerized development

In the next section (Part 3), you'll learn how Docker Compose simplifies managing this multi-container environment and makes it even easier to work with.
In the next section, you'll:
1. Deploy this containerized API to AWS using ECS (Elastic Container Service)
2. Connect your React frontend to the cloud-hosted API
3. Set up automated deployments with GitHub Actions
