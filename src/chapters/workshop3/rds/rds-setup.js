export const workshop3RDSSetupChapter = {
  id: "workshop3-rds-setup",
  title: "RDS Setup",
  sectionId: "rds",
  previousChapterId: "workshop3-rds-learning",
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

Edit \`rockproject/settings.py\` to support PostgreSQL:
**Add these imports at the top:**
\`\`\`python
from pathlib import Path
import os

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
     'OPTIONS': {
            'sslmode': os.environ.get('SSLMODE', 'require'),
        }
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
1. Save environment variables in in github secrets (Coming up in following steps).
2. Docker run commands will reference these to set environment variables on the container
3. \`os.getenv('DB_PASSWORD')\` retrieves the password from environment variables
4. Django uses these values to connect to the database


### Update Your Database Seed Script

**Understanding the seed script:**
This script automates the process of setting up your database tables and loading sample data. Think of it like moving into a new house - you need to build the rooms (create tables) before you can put furniture in them (load data).


Replace \`seed_database.sh\` to remove references to sqllite:

\`\`\`bash
#!/bin/bash

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

This is only getting updated because the old tests relied on the sqlite database. FYI, these aren't real tests you will see on real projects its just to keep the test step working in github actions without adding extra complexity.  


### Update GitHub Actions

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



## What You’ve Accomplished

- ✅ Created RDS PostgreSQL DB
- ✅ Updated Django API for PostgreSQL



    `,
  exercise: null,
}