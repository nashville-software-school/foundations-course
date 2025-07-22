export const workshop3RDSDeployChapter = {
  id: "workshop3-rds-deploy",
  title: "RDS Deployment To EC2",
  sectionId: "rds",
  previousChapterId: "workshop3-rds-setup",
  content: `
Now that your API is connecting to RDS and working locally, lets make some changes to the github actions and deploy our API to the ec2 instance we created in workshop 2. 

## Step 1: Update tests
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


## Step 2: Update GitHub Actions

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

## Step 3: Update GitHub Secrets

In GitHub → Repo → Settings → Secrets → Actions, add:
- DB_NAME
- DB_USER
- DB_PASSWORD
- DB_HOST
- DB_PORT

These will have the same values you provided in the .env file. Leave the github variables you configured in workshop 2. The actions will use those as well as these new secrets.  


## Step 4: Deploy to Production
This follows the same steps from the CICD Chapter in workshop 2

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

- ✅ Secured credentials using GitHub Secrets
- ✅ Integrated DB into GitHub Actions
- ✅ Verified functionality in production



    `,
  exercise: null,
}