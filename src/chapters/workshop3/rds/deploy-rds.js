export const workshop3RDSDeployChapter = {
  id: "workshop3-rds-deploy",
  title: "RDS Deployment To EC2",
  sectionId: "rds",
  previousChapterId: "workshop3-rds-setup",
  content: `


## Update GitHub Secrets 

In GitHub → Repo → Settings → Secrets → Actions, add each secret and value:
- DB_NAME: rockofages
- DB_USER: rockadmin
- DB_PASSWORD: your password
- DB_HOST: your db endpoint saved from earlier
- DB_PORT: 5432

 Leave the github variables you configured in workshop 2. The actions will use those as well as these new secrets.  


##  Deploy to Production
This follows the same steps from the CICD Chapter in workshop 2

### Push Code
in rock-of-ages-api terminal

\`\`\`bash
git add .
git commit -m "Add PostgreSQL support and RDS integration"
git push origin main
\`\`\`

### Trigger Deployment in GitHub
1. Go to GitHub → Actions tab
2. Verify that Build & Push Docker Image workflow is successful
3. Click actions tab again
4. Run "Deploy to EC2" workflow

---

## Test Database Connection Directly

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
2. **Type**: "PostgreSQL: Add Connection"
3. **Fill in connection details**:
   - **Hostname**: Your RDS endpoint 
   - **User**: \`rockadmin\`
   - **Password**: Your RDS password
   - **Port**: \`5432\`
   - **Database display**: \`rockofages\`
   - **SSL**: \`Use Secure Connection\`

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

paste this in VsCode
\`\`\`sql
SELECT * FROM rockapi_type;
\`\`\`

Right click on the query and click **run query**
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

💡 **What's happening here?** When you deployed your API to your EC2 instance, the Docker CMD command automatically ran the seed database script which ran migrations and inserted seed data in your new database upon running the Docker container. These SQL queries verify that your ec2 instance was able to connect to and seed your database.




---

## Test with Yaak or Postman

Now test your API to ensure it's correctly reading from the database:

**Test: Register a New User**
1. **Method**: POST
2. **URL**: \`http://<your-ec2-endpoint>/register\`
3. **Body** (JSON):
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


## What You’ve Accomplished

- ✅ Secured credentials using GitHub Secrets
- ✅ Integrated DB into GitHub Actions
- ✅ Verified functionality in production



    `,
  exercise: null,
}