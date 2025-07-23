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

In the next section, you'll:
1. Deploy this containerized API to AWS using ECS (Elastic Container Service)
2. Connect your React frontend to the cloud-hosted API
3. Set up automated deployments with GitHub Actions