export const introToDCChapter = {
  id: "workshop3-intro-to-docker-compose",
  title: "Intro to Docker Compose",
  sectionId: "docker-compose",
  previousChapterId: null,
  content: `

## The Current Pain Points

Let's be honest about what you're experiencing with your current Docker network setup. You've successfully created a local development environment with three containers, but the workflow is... less than ideal.

### Scenario 1: Making a Code Change

Let's say you've just implemented a new feature to allow users to favorite other people's rocks. Here's what you need to do to see your changes:

**For the API change:**
1. Stop the running API container: \`docker stop api-container\`
2. Remove the old container: \`docker rm api-container\`
3. Rebuild the image with your changes: \`docker build -t rock-of-ages-api .\`
4. Run the new container with all the parameters: 
   \`\`\`bash
   docker run -d \\
     --name api-container \\
     --network rock-of-ages-network \\
     --env-file .env.local \\
     -p 8000:8000 \\
     rock-of-ages-api
   \`\`\`
5. Check the logs to ensure it started correctly: \`docker logs api-container\`

**For the client change:**
1. Stop the client container: \`docker stop client-container\`
2. Remove it: \`docker rm client-container\`
3. Rebuild: \`docker build -t rock-of-ages-client .\`
4. Run with all parameters:
   \`\`\`bash
   docker run -d \\
     --name client-container \\
     --network rock-of-ages-network \\
     --env-file .env.local \\
     -p 3000:3000 \\
     rock-of-ages-client
   \`\`\`

That's **10 commands** just to see a simple code change!

### Scenario 2: Debugging Your Feature

Let's say there's a bug in your new favorite rocks feature. Here's your current debugging options with the manual setup:

**Option 1: Print Statements**
1. Add \`print()\` statements to your Python code
2. Stop, remove, rebuild, and restart the API container (5 commands)
3. Check the logs: \`docker logs api-container\`
4. Repeat for each debugging iteration

**Option 2: Terminal-Based Debugging**
1. Stop the API container: \`docker stop api-container\`
2. Remove it: \`docker rm api-container\` 
3. Run with Python debugger: 
   \`\`\`bash
   docker run -it \\
     --name api-container \\
     --network rock-of-ages-network \\
     --env-file .env.local \\
     -p 8000:8000 \\
     rock-of-ages-api \\
     python -m pdb manage.py runserver 0.0.0.0:8000
   \`\`\`
4. Use terminal commands like \`n\`, \`s\`, \`pp rocks\` to navigate (no VS Code breakpoints!)
5. When done, stop, remove, and restart normally

**The frustration is real**: No VS Code debugging, no breakpoints, mostly print statements and terminal-only debugging tools.

### Why No Hot Reload in Manual Setup?

The manual Docker network setup has a critical limitation: **no volume mounts between your host machine and containers**.

**What this means:**
- Your code changes stay on your host machine
- The container runs the code that was copied during \`docker build\`
- The running container has no knowledge of your file changes

**For both API and Client**: To see any code changes, you must stop, remove, rebuild, and restart containers - that's why you need those 10 commands every time!

## Enter Docker Compose

Docker Compose is about to transform your development experience from frustrating to delightful. Instead of managing individual containers with lengthy commands, you'll define your entire multi-container application in a single YAML file and control everything with simple commands.

### How Docker Compose Works

Docker Compose reads a \`docker-compose.yml\` file that describes:
- All your services (containers)
- How they connect to each other
- Their configuration and environment variables
- Volume mounts for live code updates
- Port mappings

Think of it as "infrastructure as code" for your development environment.

## Clean Slate: Remove Existing Containers

Before we set up Docker Compose, let's clean up all the containers, images, and networks from the previous section to avoid any conflicts:

\`\`\`bash
# Stop and remove ALL containers
docker stop $(docker ps -aq) && docker rm $(docker ps -aq)

# Remove ALL images
docker rmi -f $(docker images -q)

# Remove all custom networks
docker network prune -f
\`\`\`

**What this does:**
- Stops any running containers
- Removes all containers (running or stopped)
- Deletes all Docker images from your system
- Removes custom networks like \`rock-of-ages-network\`

This gives you a completely clean Docker environment to start fresh with Docker Compose.

> ⚠️ **WARNING** If you have any other personal or professional docker containers on your machine they will be removed if you run these commands. 

#### ⚠️ **Receiving an error?**
If you see this error: 
\`\`\`bash
"docker stop" requires at least 1 argument.
See 'docker stop --help'.

Usage:  docker stop [OPTIONS] CONTAINER [CONTAINER...]

Stop one or more running containers
\`\`\`
This just means you don't have any containers running currently. Go ahead and move on to the next command.

---

## What's Next?

You'll learn how to set up Docker Compose and create a complete development environment that starts with a single command. You'll discover how volume mounts enable hot reload and transform your development workflow from frustrating to delightful!
`,
  exercise: null,
}
