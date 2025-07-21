export const workshop3RDSSetupChapter = {
  id: "workshop3-rds-setup",
  title: "RDS Setup",
  sectionId: "rds",
  previousChapterId: null,
  content: `
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
- Select **Free tier** (if not available, select **Dev/Test**)

**Availability and Durability**
- Select **Single-AZ DB instance deployment**

**Settings:**
- **DB instance identifier**: \`rock-of-ages-db\`
- **Master username**: \`rockadmin\`
- **Master password**: Choose and save a secure password
- **Confirm password**: Re-enter your password

**DB Instance Configuration:**
- **DB instance class**: \`db.t4g.micro\` (free tier eligible)

**Storage:**
- **Storage type**: General Purpose SSD (gp2)
- **Allocated storage**: 20 GB
- **Enable storage autoscaling**: Checked
- **Maximum storage threshold**: 100 GB

**Connectivity:**
- **Don't connect to an EC2 compute resource**
- **VPC**: default
- **Subnet group**: default
- **Public access**: Yes (for course use)
- **VPC security group**: Create new
- **Group name**: \`rock-of-ages-db-sg\`
- **Port**: 5432

**Authentication:**
- Password authentication

**Monitoring:**
- Disable Enhanced Monitoring

**Additional Configuration:**
- **Initial DB name**: \`rockofages\`
- **Backup retention period**: 1 day

### Create the Database
1. Click **Create database**
2. Wait for status to become **Available**

### Configure Security Group
1. Go to **EC2 Console** → **Security Groups**
2. Find \`rock-of-ages-db-sg\`
3. Edit inbound rules:
    - Type: PostgreSQL
    - Port: 5432
    - Source: 0.0.0.0/0
    - Description: "Allow PostgreSQL connections for Rock of Ages course"

### Get Connection Info
1. Click your DB instance
2. Copy the **Endpoint** under **Connectivity & security**

---

## Step 2: Update Your Existing API Repo

### Understanding the Required Changes

When moving from SQLite to PostgreSQL, we need to make several modifications:

1. **Database Adapter**: Django needs a "translator" to speak PostgreSQL
2. **Connection Settings**: Network connection instead of file path
3. **Environment Variables**: Secure handling of database credentials
4. **Container Dependencies**: PostgreSQL client libraries

Let's examine each change and understand why it's necessary.

### Navigate to API Repo
\`\`\`bash
cd path/to/rock-of-ages-api
\`\`\`

### Update Dependencies (Pipfile)

**Why we need new dependencies:**
- **\`psycopg2-binary\`**: This is like a translator between Django (Python) and PostgreSQL. Django can talk to SQLite out of the box, but needs this special adapter for PostgreSQL.
- **\`python-dotenv\`**: Helps us securely manage sensitive information like passwords by loading them from \`.env\` files.

**Real-world analogy**: If Django speaks English and PostgreSQL speaks French, \`psycopg2-binary\` is the translator that allows them to communicate.

Edit your \`Pipfile\` to add PostgreSQL support:

\`\`\`toml
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
\`\`\`

### Update Django Settings

**Why these changes are needed:**

**SQLite** just needed to know where the database file was stored on your computer.

**PostgreSQL** needs to know how to connect over the internet:
- **Where** is the database? (HOST)
- **What port** should I connect to? (PORT)
- **Who** am I? (USER)
- **What's my password**? (PASSWORD)
- **Which database** should I use? (NAME)

**Security Note**: We use \`os.getenv()\` instead of hardcoding values because database passwords should never be stored directly in code files.

Edit \`rockproject/settings.py\` to support PostgreSQL and environment variables:
**Add these imports at the top:**
\`\`\`python
from pathlib import Path
import os
from dotenv import load_dotenv

# Load environment variables from .env file
# Only load .env in development
ENV_PATH = Path(__file__).resolve().parent.parent / '.env'
if ENV_PATH.exists():
    load_dotenv(dotenv_path=ENV_PATH)

\`\`\`
Scroll down and replace \`DATABASES\` with:
\`\`\`python
DATABASES = {
    'default': {
    'ENGINE': 'django.db.backends.postgresql',
    'NAME': os.getenv('DB_NAME', 'rockofages'),
    'USER': os.getenv('DB_USER', 'rockadmin'),
    'PASSWORD': os.getenv('DB_PASSWORD'),
    'HOST': os.getenv('DB_HOST'),
    'PORT': os.getenv('DB_PORT', '5432'),
    }
}
\`\`\`

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
1. \`python-dotenv\` reads your \`.env\` file when Django starts
2. \`os.getenv('DB_PASSWORD')\` retrieves the password from environment variables
3. Django uses these values to connect to the database

**Real-world analogy**: It's like having a locked box (\`.env\` file) for your house key (database password), instead of leaving the key under a rock (in your code) where anyone can find it.

### Create Environment Variables Template
Create a \`.env.example\` file in your repository root:

\`\`\`bash
# Database Configuration
DB_NAME=rockofages
DB_USER=rockadmin
DB_PASSWORD=your-secure-password-here
DB_HOST=rock-of-ages-db.c9xkv8example.us-east-2.rds.amazonaws.com
DB_PORT=5432
\`\`\`

### Create Your Local Environment File
\`\`\`bash
# Copy the example to create your actual .env file
cp .env.example .env
\`\`\`

Edit the \`.env\` file with your actual RDS information:
\`\`\`bash
DB_NAME=rockofages
DB_USER=rockadmin
DB_PASSWORD=YourActualRDSPassword123!  # ← Use your actual password
DB_HOST=rock-of-ages-db.c9xkv8actual.us-east-2.rds.amazonaws.com  # ← Use your actual endpoint
DB_PORT=5432
\`\`\`

### Update tests
In \`rockapi/test.py\` replace the tests with 

\`\`\`python
from django.test import SimpleTestCase
from rest_framework.test import APIClient
from rest_framework import status


class SanityTests(SimpleTestCase):
    def setUp(self):
        self.client = APIClient()

    def test_math_still_works(self):
        self.assertEqual(2 + 2, 4)

    def test_uppercase(self):
        self.assertEqual("rock".upper(), "ROCK")

    def test_api_mock(self):
        # This won't hit a real view, but it shows test usage
        response = self.client.get('/fake-url')
        self.assertIn(response.status_code, [status.HTTP_404_NOT_FOUND, status.HTTP_200_OK])
\`\`\`

This is only because the old tests relied on the sqlite database. FYI, these aren't real tests you will see on real projects.  

### Update Your Database Seed Script

**Understanding the seed script:**
This script automates the process of setting up your database tables and loading sample data. Think of it like moving into a new house - you need to build the rooms (create tables) before you can put furniture in them (load data).

**Why this order matters:**
\`\`\`
Environment Variables → Database Connection → Table Structure → Sample Data
\`\`\`

Each step depends on the previous one:
- Can't connect without credentials
- Can't add data without tables
- Can't create app tables without Django's foundation tables

Edit \`seed_database.sh\` to load environment variables:

\`\`\`bash
#!/bin/bash

# Load environment variables from .env if it exists
if [ -f .env ]; then
  echo "📦 Loading environment from .env..."
  set -a
  source .env
  set +a
else
  echo "🚨 .env not found. Assuming environment variables are set externally (e.g., via Docker -e flags)"
fi

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
\`\`\`

**How each step works:**

**1. Loading Environment Variables (\`source .env\`(local) Docker -e flags(production))**
- Makes your database connection info available to Django
- Like giving Django the keys to connect to your database

**2. Running Migrations (\`python3 manage.py migrate\`)**
- Creates Django's standard tables (user accounts, sessions, etc.)
- Like building the foundation of a house

**3. Creating App Migrations (\`makemigrations rockapi\`)**
- Looks at your models (Rock.py, Type.py) and creates instructions for building tables
- Like creating blueprints for your custom rooms

**4. Applying App Migrations (\`migrate rockapi\`)**
- Actually creates your app's tables in the database
- Like building those custom rooms from the blueprints

**5. Loading Fixtures (\`loaddata\`)**
- Puts sample data into your tables
- Like furnishing the rooms with sample furniture
---

## Step 3: Update GitHub Secrets

In GitHub → Repo → Settings → Secrets → Actions, add:
- DB_NAME
- DB_USER
- DB_PASSWORD
- DB_HOST
- DB_PORT

These will have the same values you provided in the .env file. Leave the github variables you configured in workshop 2. The actions will use those as well as these new secrets.  

---

## Step 4: Update GitHub Actions

Replace \`.github/workflows/deploy.yml\` with:

\`\`\`yaml
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
          role-to-assume: \${{ vars.OIDC_ROLE_TO_ASSUME }}
          aws-region: \${{ vars.AWS_REGION }}

      - uses: aws-actions/amazon-ecr-login@v2

      - name: Trigger remote deployment on EC2 via SSM
        run: |
          aws ssm send-command \\
            --instance-ids "\${{ vars.EC2_INSTANCE_ID }}" \\
            --document-name "AWS-RunShellScript" \\
            --comment "Manual deploy from GitHub Actions" \\
            --parameters commands='[
              "IMAGE=\\"\${{ vars.ECR_REGISTRY }}/\${{ vars.ECR_REPOSITORY }}:latest\\"",
              "aws ecr get-login-password --region \${{ vars.AWS_REGION }} | docker login --username AWS --password-stdin \${{ vars.ECR_REGISTRY }}",
              "docker pull \\"$IMAGE\\"",
              "docker stop rock-of-ages-api || true",
              "docker rm rock-of-ages-api || true",
              "docker run --pull always -d --name rock-of-ages-api -p 80:8000 -e DB_NAME=\${{ secrets.DB_NAME }} -e DB_USER=\${{ secrets.DB_USER }} -e DB_PASSWORD=\${{ secrets.DB_PASSWORD }} -e DB_HOST=\${{ secrets.DB_HOST }} -e DB_PORT=\${{ secrets.DB_PORT }} \\"$IMAGE\\""
            ]' \\
            --region \${{ vars.AWS_REGION }}
\`\`\`

#### What’s happening here?
We are running the same docker commands in our ec2 instance but this time with our database environment variables using the -e flag. 

## Step 5: Test Locally with Docker

Before deploying, test your changes locally using the same containerized approach you'll use in production.

### Build the Updated Container
\`\`\`bash
# Build the container with PostgreSQL support
docker build -t rock-of-ages-api .
\`\`\`

### Run Container with Database Connection
\`\`\`bash
# Run with environment file (container handles all dependencies)
docker run --env-file .env -p 8000:8000 rock-of-ages-api
\`\`\`

**Expected output:**
\`\`\`
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
\`\`\`

**✅ If you see this output, everything worked!** The container:
1. Connected to your RDS database
2. Created all necessary tables
3. Loaded sample data (users, rock types, rocks)
4. Started the API server
---

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
   - **User**: \`rockadmin\`
   - **Password**: Your RDS password
   - **Port**: \`5432\`
   - **Database**: \`rockofages\`
   - **SSL**: \`require\`

#### Explore Your Database

Once connected, you should see your database in the PostgreSQL Explorer panel. Expand the sections to see:

**📁 Schemas → public → Tables**
- \`auth_user\` (Django users)
- \`authtoken_token\` (API authentication tokens)
- \`rockapi_type\` (Rock types: Igneous, Metamorphic, etc.)
- \`rockapi_rock\` (Individual rocks with owners)

#### Run Test Queries

Right-click on your database connection and select "New Query" to run these verification queries:

**1. Check all rock types:**
\`\`\`sql
SELECT * FROM rockapi_type;
\`\`\`
**Expected result:** 5 rock types (Metamorphic, Igneous, Sedimentary, Shale, Basalt)

**2. Check all rocks with their types and owners:**
\`\`\`sql
SELECT 
    r.name as rock_name,
    r.weight,
    t.label as rock_type,
    u.first_name,
    u.last_name
FROM rockapi_rock r
JOIN rockapi_type t ON r.type_id = t.id
JOIN auth_user u ON r.user_id = u.id;
\`\`\`
**Expected result:** 3 rocks owned by John Doe and Jane Smith

**3. Count total records:**
\`\`\`sql
SELECT 
    (SELECT COUNT(*) FROM rockapi_rock) as total_rocks,
    (SELECT COUNT(*) FROM rockapi_type) as total_types,
    (SELECT COUNT(*) FROM auth_user) as total_users;
\`\`\`
**Expected result:** 3 rocks, 5 types, 2 users

**✅ If you see the expected data, your database setup is perfect!**

**Understanding what you're seeing:**
- **Django tables**: Tables starting with \`auth_\` are Django's built-in user management
- **Your app tables**: Tables starting with \`rockapi_\` are from your Rock of Ages models
- **Relationships**: The JOIN queries show how your data connects across tables
- **Data integrity**: All foreign key relationships are working correctly

### Test with Yaak

Now test your API to ensure it's correctly reading from the database:

**Test: Register a New User**
1. **Method**: POST
2. **URL**: \`http://localhost:8000/register\`
3. **Headers**: Content-Type: \`application/json\`
4. **Body** (JSON):
   \`\`\`json
   {
     "email": "test@example.com",
     "password": "testpass123",
     "first_name": "Test",
     "last_name": "User"
   }
   \`\`\`

**Expected Response:**
\`\`\`json
{
  "token": "abc123def456..."
}
\`\`\`


**💡 Database verification**: After registering, you can run this query in VS Code to see your new user:
\`\`\`sql
SELECT * FROM auth_user ORDER BY date_joined DESC LIMIT 1;
\`\`\`

## Step 6: Deploy to Production

### Push Code
\`\`\`bash
git add .
git commit -m "Add PostgreSQL support and RDS integration"
git push origin main
\`\`\`

### Trigger Deployment in GitHub
1. Go to GitHub → Actions
2. Verify that Build & Push Docker Image workflow is successful
3. Run "Deploy to EC2" workflow

Once your API is deployed, test on yaak or postman by registering a new user with your ec2 endpoint.  Use this sql query again in VS Code to verify the new user is persisted in the database.

\`\`\`sql
SELECT * FROM auth_user ORDER BY date_joined DESC LIMIT 1;
\`\`\`
---


## What You’ve Accomplished

- ✅ Created RDS PostgreSQL DB
- ✅ Updated Django API for PostgreSQL
- ✅ Secured credentials using .env and GitHub Secrets
- ✅ Integrated DB into GitHub Actions
- ✅ Verified functionality locally and in production



    `,
  exercise: null,
}