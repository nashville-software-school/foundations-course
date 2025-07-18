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



# Draft Chapters

# Part 1: Cloud Database with AWS RDS

In this section, you'll create a managed PostgreSQL database using Amazon RDS and update your existing Rock of Ages API to use it instead of SQLite. You'll also update your deployment pipeline to work with the cloud database.

## What You're Building

You'll transition from a local SQLite database to a production-ready PostgreSQL database running in AWS. This demonstrates how real-world applications separate their database layer from their application code for better scalability, reliability, and team collaboration.

**Before (SQLite):**
- Database was a single file (`db.sqlite3`) stored locally
- No network connection needed
- Simple setup, but not suitable for production
- Can't be shared between team members or environments

**After (PostgreSQL on RDS):**
- Database runs on AWS servers
- Requires network connection and authentication
- More complex setup, but production-ready and scalable
- Can be accessed by multiple applications and team members

## Why This Change Matters

### The Problem with SQLite in Production
While SQLite works great for development, it has limitations:
- **File-based**: Database is tied to one machine
- **Single Writer**: Only one process can write at a time
- **No Remote Access**: Can't connect from different servers
- **Limited Concurrency**: Not suitable for multiple users

### The Benefits of RDS PostgreSQL
- **Managed Service**: AWS handles backups, updates, and maintenance
- **Scalable**: Can handle thousands of concurrent connections
- **Reliable**: Built-in redundancy and automatic failover
- **Secure**: Network isolation and encryption
- **Professional**: Used by companies like Instagram, Spotify, and Reddit

---

## Step 1: Create AWS RDS PostgreSQL Database

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

### Configure Security Group
Your database needs to allow connections from your EC2 instance and your local development machine.

1. While your database is being created, go to **EC2 Console** → **Security Groups**
2. Find the security group that was created for your database (should be named `rock-of-ages-db-sg`)
3. Select it and click **Edit inbound rules**
4. Click **Add rule**:
   - **Type**: PostgreSQL
   - **Port**: 5432
   - **Source**: Anywhere-IPv4 (0.0.0.0/0)
   - **Description**: "Allow PostgreSQL connections for Rock of Ages course"
5. Click **Save rules**

### Get Your Database Connection Information
Once your RDS instance shows **Available** status:

1. Click on your database instance (`rock-of-ages-db`)
2. In the **Connectivity & security** tab, copy the **Endpoint** 
   - It will look like: `rock-of-ages-db.c9xkv8example.us-east-2.rds.amazonaws.com`
   - **Save this endpoint** - you'll need it for your API configuration

---

## Step 2: Update Your Existing API Repository

Now you'll modify your existing Rock of Ages API repository to support PostgreSQL instead of SQLite. This involves several key changes that demonstrate how applications adapt to different database systems.

### Understanding the Required Changes

When moving from SQLite to PostgreSQL, we need to make several modifications:

1. **Database Adapter**: Django needs a "translator" to speak PostgreSQL
2. **Connection Settings**: Network connection instead of file path
3. **Environment Variables**: Secure handling of database credentials
4. **Container Dependencies**: PostgreSQL client libraries

Let's examine each change and understand why it's necessary.

### Navigate to Your API Repository
```bash
# Navigate to your existing API repository from Workshop 2
cd path/to/your/rock-of-ages-api
```

### Update Dependencies (Pipfile)

**Why we need new dependencies:**
- **`psycopg2-binary`**: This is like a translator between Django (Python) and PostgreSQL. Django can talk to SQLite out of the box, but needs this special adapter for PostgreSQL.
- **`python-dotenv`**: Helps us securely manage sensitive information like passwords by loading them from `.env` files.

**Real-world analogy**: If Django speaks English and PostgreSQL speaks French, `psycopg2-binary` is the translator that allows them to communicate.

Edit your `Pipfile` to add PostgreSQL support:

```toml
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
django = "*"
autopep8 = "*"
pylint = "*"
djangorestframework = "*"
django-cors-headers = "*"
pylint-django = "*"
psycopg2-binary = "*"  # ← Add this line
python-dotenv = "*"    # ← Add this line

[dev-packages]

[requires]
python_version = "*"
```

### Update Django Settings

**Why these changes are needed:**

**SQLite** just needed to know where the database file was stored on your computer.

**PostgreSQL** needs to know how to connect over the internet:
- **Where** is the database? (HOST)
- **What port** should I connect to? (PORT)
- **Who** am I? (USER)
- **What's my password**? (PASSWORD)
- **Which database** should I use? (NAME)

**Security Note**: We use `os.getenv()` instead of hardcoding values because database passwords should never be stored directly in code files.

Edit `rockproject/settings.py` to support PostgreSQL and environment variables:

**Add these imports at the top:**
```python
from pathlib import Path
import os
from dotenv import load_dotenv  # ← Add this line

# Load environment variables from .env file
load_dotenv()  # ← Add this line
```

**Replace the DATABASES configuration:**
```python
# Database Configuration for RDS PostgreSQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',  # ← Changed from sqlite3
        'NAME': os.getenv('DB_NAME', 'rockofages'),
        'USER': os.getenv('DB_USER', 'rockadmin'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}
```

### Environment Variables: Keeping Secrets Safe

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

### Create Environment Variables Template
Create a `.env.example` file in your repository root:

```bash
# Database Configuration
DB_NAME=rockofages
DB_USER=rockadmin
DB_PASSWORD=your-secure-password-here
DB_HOST=rock-of-ages-db.c9xkv8example.us-east-2.rds.amazonaws.com
DB_PORT=5432
```

### Create Your Local Environment File
```bash
# Copy the example to create your actual .env file
cp .env.example .env
```

Edit the `.env` file with your actual RDS information:
```bash
DB_NAME=rockofages
DB_USER=rockadmin
DB_PASSWORD=YourActualRDSPassword123!  # ← Use your actual password
DB_HOST=rock-of-ages-db.c9xkv8actual.us-east-2.rds.amazonaws.com  # ← Use your actual endpoint
DB_PORT=5432
```

### Update Your Dockerfile

**Why this change is needed:**
Your Docker container needs PostgreSQL client libraries to communicate with the database. This is like installing the right drivers for a printer - without them, your application can't talk to PostgreSQL.

**The only change needed:** Add `libpq-dev` to your existing system dependencies.

Find this section in your existing `Dockerfile`:
```dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends \
  gcc \
  && rm -rf /var/lib/apt/lists/*
```

**Replace it with:**
```dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends \
  gcc \
  libpq-dev \
  && rm -rf /var/lib/apt/lists/*
```

**That's it!** All other parts of your Dockerfile remain exactly the same. The `libpq-dev` package provides the PostgreSQL client libraries that `psycopg2-binary` needs to connect to your RDS database.

### Update Your Database Seed Script

**Understanding the seed script:**
This script automates the process of setting up your database tables and loading sample data. Think of it like moving into a new house - you need to build the rooms (create tables) before you can put furniture in them (load data).

**Why this order matters:**
```
Environment Variables → Database Connection → Table Structure → Sample Data
```

Each step depends on the previous one:
- Can't connect without credentials
- Can't add data without tables
- Can't create app tables without Django's foundation tables

Edit `seed_database.sh` to load environment variables:

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

**How each step works:**

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

---

## Step 3: Update GitHub Secrets for RDS

Your deployment pipeline needs access to your RDS database. You'll add database connection information as GitHub secrets.

### Understanding GitHub Secrets in CI/CD

**The Challenge**: Your application running on EC2 needs to connect to your RDS database, but you can't hardcode database passwords in your code or GitHub Actions workflow files.

**The Solution**: GitHub Secrets provide a secure way to store sensitive information that your workflows can access but remain hidden from anyone viewing your repository.

**How it works in our deployment**:
1. GitHub Actions reads secrets during deployment
2. Passes them as environment variables to your container
3. Your application uses these environment variables to connect to RDS
4. Database passwords never appear in logs or code

### Add Database Secrets to GitHub
1. Go to your API repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each of these:

**Secret Name:** `DB_NAME`  
**Secret Value:** `rockofages`

**Secret Name:** `DB_USER`  
**Secret Value:** `rockadmin`

**Secret Name:** `DB_PASSWORD`  
**Secret Value:** `YourActualRDSPassword123!` (your actual password)

**Secret Name:** `DB_HOST`  
**Secret Value:** `rock-of-ages-db.c9xkv8actual.us-east-2.rds.amazonaws.com` (your actual endpoint)

**Secret Name:** `DB_PORT`  
**Secret Value:** `5432`

### Your secrets should now include:
- AWS_ACCOUNT_ID (from Workshop 2)
- AWS_REGION (from Workshop 2)
- DB_NAME (new)
- DB_USER (new)
- DB_PASSWORD (new)
- DB_HOST (new)
- DB_PORT (new)

---

## Step 4: Update GitHub Actions Workflow

Edit your existing `.github/workflows/deploy.yml` to pass database environment variables to your container. You only need to modify the **last command** in the SSM send-command.

**Find this line in your existing deploy.yml:**
```yaml
"docker run -d --name rock-of-ages-api -p 80:8000 \"$IMAGE\""
```

**Replace it with:**
```yaml
"docker run -d --name rock-of-ages-api -p 80:8000 \
  -e DB_NAME=${{ secrets.DB_NAME }} \
  -e DB_USER=${{ secrets.DB_USER }} \
  -e DB_PASSWORD=${{ secrets.DB_PASSWORD }} \
  -e DB_HOST=${{ secrets.DB_HOST }} \
  -e DB_PORT=${{ secrets.DB_PORT }} \
  \"$IMAGE\""
```

**Your complete deploy.yml should look like this:**
```yaml
name: Deploy to EC2

on:
  workflow_dispatch:  # Manual only

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: aws-actions/configure-aws-credentials@v3
        with:
          role-to-assume: ${{ vars.OIDC_ROLE_TO_ASSUME }}
          aws-region: ${{ vars.AWS_REGION }}

      - uses: aws-actions/amazon-ecr-login@v2

      - name: Trigger remote deployment on EC2 via SSM
        run: |
          aws ssm send-command \
          --instance-ids "${{ vars.EC2_INSTANCE_ID }}" \
          --document-name "AWS-RunShellScript" \
          --comment "Manual deploy from GitHub Actions" \
          --parameters '{"commands":["IMAGE=\"${{ vars.ECR_REGISTRY }}/${{ vars.ECR_REPOSITORY }}:latest\"","docker pull \"$IMAGE\"","docker stop rock-of-ages-api || true","docker rm rock-of-ages-api || true","docker run -d --name rock-of-ages-api -p 80:8000 -e DB_NAME=${{ secrets.DB_NAME }} -e DB_USER=${{ secrets.DB_USER }} -e DB_PASSWORD=${{ secrets.DB_PASSWORD }} -e DB_HOST=${{ secrets.DB_HOST }} -e DB_PORT=${{ secrets.DB_PORT }} \"$IMAGE\""]}' \
          --region ${{ vars.AWS_REGION }}
```

**Key changes:**
- Added `-e` flags to pass database environment variables to the container
- Container now receives all database connection information from GitHub secrets
- All other parts of your existing workflow remain unchanged

---

## Step 5: Test Locally with Docker

Before deploying, test your changes locally using the same containerized approach you'll use in production.

### Build the Updated Container
```bash
# Build the container with PostgreSQL support
docker build -t rock-of-ages-api .
```

### Run Container with Database Connection
```bash
# Run with environment file (container handles all dependencies)
docker run --env-file .env -p 8000:8000 rock-of-ages-api
```

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

**✅ If you see this output, everything worked!** The container:
1. Connected to your RDS database
2. Created all necessary tables
3. Loaded sample data (users, rock types, rocks)
4. Started the API server

### Test Database Connection Directly

Before testing through the API, let's verify the database setup by connecting directly to your RDS instance. This helps you understand what's happening "under the hood" and gives you valuable database inspection skills.

**Why test the database directly?**
- **Debugging**: When APIs fail, you can check if the problem is in the database or application layer
- **Data Verification**: Confirm that migrations and seed data loaded correctly
- **Professional Skill**: Database inspection is a common developer task
- **Understanding**: See the actual tables and data your API is working with

#### Install PostgreSQL Explorer Extension

1. **Open VS Code**
2. **Go to Extensions** (Ctrl+Shift+X or Cmd+Shift+X)
3. **Search for** "PostgreSQL" by Chris Kolkman
4. **Install** the PostgreSQL extension

#### Connect to Your RDS Database

1. **Open VS Code Command Palette** (Ctrl+Shift+P or Cmd+Shift+P)
2. **Type**: "PostgreSQL: New Connection"
3. **Fill in connection details**:
   - **Hostname**: Your RDS endpoint (from your .env file)
   - **User**: `rockadmin`
   - **Password**: Your RDS password
   - **Port**: `5432`
   - **Database**: `rockofages`
   - **SSL**: `require`

#### Explore Your Database

Once connected, you should see your database in the PostgreSQL Explorer panel. Expand the sections to see:

**📁 Schemas → public → Tables**
- `auth_user` (Django users)
- `authtoken_token` (API authentication tokens)
- `rockapi_type` (Rock types: Igneous, Metamorphic, etc.)
- `rockapi_rock` (Individual rocks with owners)

#### Run Test Queries

Right-click on your database connection and select "New Query" to run these verification queries:

**1. Check all rock types:**
```sql
SELECT * FROM rockapi_type;
```
**Expected result:** 5 rock types (Metamorphic, Igneous, Sedimentary, Shale, Basalt)

**2. Check all rocks with their types and owners:**
```sql
SELECT 
    r.name as rock_name,
    r.weight,
    t.label as rock_type,
    u.first_name,
    u.last_name
FROM rockapi_rock r
JOIN rockapi_type t ON r.type_id = t.id
JOIN auth_user u ON r.user_id = u.id;
```
**Expected result:** 3 rocks owned by John Doe and Jane Smith

**3. Count total records:**
```sql
SELECT 
    (SELECT COUNT(*) FROM rockapi_rock) as total_rocks,
    (SELECT COUNT(*) FROM rockapi_type) as total_types,
    (SELECT COUNT(*) FROM auth_user) as total_users;
```
**Expected result:** 3 rocks, 5 types, 2 users

**✅ If you see the expected data, your database setup is perfect!**

**Understanding what you're seeing:**
- **Django tables**: Tables starting with `auth_` are Django's built-in user management
- **Your app tables**: Tables starting with `rockapi_` are from your Rock of Ages models
- **Relationships**: The JOIN queries show how your data connects across tables
- **Data integrity**: All foreign key relationships are working correctly

### Test with Yaak

Now test your API to ensure it's correctly reading from the database:

**Test 1: Check API Health (Unauthenticated)**
1. Open Yaak and create a new request
2. **Method**: GET
3. **URL**: `http://localhost:8000/rocks`
4. **Send the request**

**Expected Response:**
```json
{
  "detail": "Authentication credentials were not provided."
}
```
**✅ This confirms:** API is running and database connection works

**Test 2: Register a New User**
1. **Method**: POST
2. **URL**: `http://localhost:8000/register`
3. **Headers**: Content-Type: `application/json`
4. **Body** (JSON):
   ```json
   {
     "email": "test@example.com",
     "password": "testpass123",
     "first_name": "Test",
     "last_name": "User"
   }
   ```

**Expected Response:**
```json
{
  "token": "abc123def456..."
}
```
**✅ Save this token** for the next test.

**💡 Database verification**: After registering, you can run this query in VS Code to see your new user:
```sql
SELECT * FROM auth_user ORDER BY date_joined DESC LIMIT 1;
```

**Test 3: Get Rocks with Authentication**
1. **Method**: GET
2. **URL**: `http://localhost:8000/rocks`
3. **Headers**: Authorization: `Token abc123def456...` (use your actual token)

**Expected Response:**
```json
[
  {
    "id": 1,
    "name": "Ernestina",
    "weight": "1.30",
    "type": {"label": "Sedimentary"},
    "user": {"first_name": "Jane", "last_name": "Smith"}
  },
  // ... more rocks
]
```
**✅ Success!** You should see 3 sample rocks from your RDS database.

### Understanding the Complete Flow

You've now tested your application at multiple levels:

1. **Database Level**: Direct SQL queries confirmed data exists
2. **Application Level**: API endpoints confirmed Django can read the data
3. **Integration Level**: Full request/response cycle works end-to-end

This multi-layer testing approach is exactly how professional developers verify their applications work correctly.

---

## Step 6: Deploy to Production

### Commit and Push Your Changes
```bash
git add .
git commit -m "Add PostgreSQL support and RDS integration"
git push origin main
```

### Trigger Deployment
1. Go to your repository on GitHub
2. Click **Actions** tab
3. Click **Deploy to EC2** workflow
4. Click **Run workflow** → **Run workflow**

### Verify Deployment
- Check that the workflow completes successfully
- Test your live API endpoint with Yaak
- Verify your React client can still connect to the API

---

## What You've Accomplished

You now have:
- ✅ PostgreSQL database running in AWS RDS
- ✅ Updated API code to support PostgreSQL
- ✅ Environment variables for secure database configuration
- ✅ Updated GitHub Actions pipeline for database integration
- ✅ Production deployment using cloud database

## Understanding Your New Architecture

Let's examine what you've built and why it's significant:

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