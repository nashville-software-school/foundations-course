export const devContainersSetupChapter = {
  id: "workshop3-dev-containers-setup",
  title: "Setting up Dev Containers",
  sectionId: "docker-compose",
  previousChapterId: "workshop3-docker-compose-setup",
  content: `
# Debugging with Dev Containers

## Setting Up VS Code Dev Containers

Now let's add the final piece: seamless debugging and development inside your containers.

Remember **Scenario 2** in the first chapter of this section? Since our api code is running in a container we currently don't have a way to use VS Code to debug our code because VS Code is running on our host machine. We need a way to run VS Code in the container...

### What We're About to Achieve

By the end of this section, you'll be able to:
- ✅ Set breakpoints in your Django code by clicking in VS Code
- ✅ Step through your code line by line 
- ✅ Inspect variables and see their values in real-time
- ✅ Use all of VS Code's debugging features inside the container
- ✅ Restart the debugger quickly to see code changes

### Step 1: Install Dev Containers Extension

1. Open VS Code
2. Go to Extensions (Cmd/Ctrl + Shift + X)
3. Search for "Dev Containers"
4. Install the official Microsoft extension "Dev Containers"

### Understanding How Dev Containers Work

Here's the key insight: **Dev Containers move your VS Code development environment inside the container**.

**Without Dev Containers:**
\`\`\`
Your Computer: VS Code + Python Debugger
     ↕ (barrier)
Container: Django App + Python Runtime
\`\`\`

**With Dev Containers:**
\`\`\`
Your Computer: VS Code UI only
Container: VS Code Server + Python Debugger + Django App + Python Runtime
\`\`\`

This means you get the exact same debugging experience as local development, but everything runs in your containerized environment!

### Step 2: Create Dev Container Configuration

We need to tell VS Code how to connect to our API container. In your API repository, create the configuration:

\`\`\`bash
# From your rock-of-ages-development directory
mkdir ./your-api-repo-name/.devcontainer
\`\`\`

Create \`./your-api-repo-name/.devcontainer/devcontainer.json\`:

\`\`\`json
{
  "name": "Rock of Ages API",
  "dockerComposeFile": "../../docker-compose.yml",
  "service": "api",
  "workspaceFolder": "/app",
  "overrideCommand": true,
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "ms-python.vscode-pylance",
        "ms-python.debugpy"
      ],
      "settings": {
        "python.defaultInterpreterPath": "/app/.venv/bin/python",
        "python.linting.enabled": true,
        "python.linting.pylintEnabled": true
      }
    }
  },
  "postCreateCommand": "pipenv install --dev",
  "remoteUser": "root",
  "runArgs": [
    "--cap-add=SYS_PTRACE",
    "--security-opt", "seccomp=unconfined"
  ],
  "settings": {
  "python.pythonPath": "/usr/local/bin/python"
  }
}
\`\`\`

**Key settings explained:**
- \`"dockerComposeFile": "../../docker-compose.yml"\` - Points to your compose file
- \`"service": "api"\` - Connects to the API container
- \`"overrideCommand": true\` - **Critical!** This prevents the automatic Django startup from docker-compose.yml, allowing you to manually start the service and attach the debug process. 
- \`"workspaceFolder": "/app"\` - Sets the working directory inside the container

### Step 3: Start the Debugging Environment

For debugging, we want to start only the database and client and control the API ourselves:

1. **Stop your full stack** if it's running:
   \`\`\`bash
   docker compose down
   \`\`\`

2. **Start only database and client**:
   \`\`\`bash
   docker compose up postgres-db client
   \`\`\`
   
   This gives you:
   - ✅ Database running and ready
   - ✅ React client running at localhost:3000  
   - ❌ No competing Django process on port 8000

3. **Open VS Code** and open your **individual API repository folder** (not the parent directory)

4. **Click "Reopen in Container"** when prompted, or use F1 → "Dev Containers: Open Folder in Container"

### What Happens Next

VS Code will:
1. Connect to your running API container
2. Install the VS Code server inside the container
3. Install Python extensions
4. Run \`pipenv install --dev\` to set up development dependencies
5. Give you a terminal that's inside the container

You'll see output like:
\`\`\`
[7177 ms] Start: Run in container: /bin/sh -c pipenv install --dev
Installing dependencies from Pipfile.lock...
Done. Press any key to close the terminal.
\`\`\`

**Important**: You might see a popup about port forwarding (like port 5474) - this is normal VS Code communication. Just dismiss it.

### Step 4: Set Up Django Debugging

Now we need to configure VS Code to debug Django properly. Create a debug configuration in your API repository:

**Create \`.vscode/launch.json\` in your API repo:**

\`\`\`json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Django: Debug Server",
            "type": "python",
            "request": "launch",
            "program": "\${workspaceFolder}/manage.py",
            "args": ["runserver", "0.0.0.0:8000", "--noreload"],
            "django": true,
            "justMyCode": false,
            "console": "integratedTerminal",
            "env": {
                "PYTHONPATH": "\${workspaceFolder}",
                "DJANGO_SETTINGS_MODULE": "rockproject.settings"
            }
        }
    ]
}
\`\`\`

**What this configuration does:**
- \`"program": "\${workspaceFolder}/manage.py"\` - Tells VS Code to run Django's manage.py
- \`"args": ["runserver", "0.0.0.0:8000", "--noreload"]\` - Starts the development server
- \`"--noreload"\` - Prevents Django from restarting (which can interfere with debugging)
- \`"django": true\` - Enables Django-specific debugging features

### Step 5: Start Debugging Django

Here's the moment of truth! We'll start Django with the integrated debugger:

1. **In VS Code** (now connected to the container), press **F5** 
   
   OR
   
   Go to the **Run and Debug** panel (Ctrl+Shift+D), select "Django: Debug Server", and click the green play button

2. **You should see Django start** in the **Integrated Terminal**:
   \`\`\`
   Django version 5.2.4, using settings 'rockproject.settings'
   Starting development server at http://0.0.0.0:8000/
   Quit the server with CONTROL-C.
   \`\`\`

3. **Notice the debug toolbar** at the top of VS Code - this means the debugger is active!

### Step 6: Test Your First Breakpoint

Time for the magic moment:

1. **Open \`rockapi/views/rock_view.py\`** in VS Code
2. **Find the \`list\` method** (this handles GET requests to \`/rocks\`)
3. **Place a breakpoint** next to the line \`rocks = Rock.objects.all()\` 
4. **Open your browser** to \`http://localhost:3000\`
5. **Login** and **click "All Rocks"**
6. **VS Code should immediately pause** at your breakpoint! 🎉

### What You Can Do Now

With the execution paused at your breakpoint, you can:

- **Inspect variables**: Hover over \`rocks\` to see its value
- **Use the Debug Console**: Type \`print(rocks.count())\` to run Python expressions
- **Step through code**: Use F10 to step over lines, F11 to step into functions
- **View the call stack**: See exactly how your code was reached
- **Add watch expressions**: Monitor variables as you step through code

This is **exactly the same debugging experience** as local development, but running inside your containerized environment!

### Step 7: Experience Code Changes

Let's test how code changes work in the debugging environment and understand the difference between debugging and regular development:

#### Understanding Hot Reload vs. Debugging

**Important Distinction:**
- **Regular development**: Hot reload works perfectly with Docker Compose volume mounts
- **Debugging mode**: Hot reload is intentionally disabled for stable debugging connections

#### Test Code Changes in Debugging Mode:

Now let's see how API debugging handles changes differently:

1. **Stop the debugger** (Ctrl+C or click the stop button in VS Code) 
2. **Open** \`rockapi/views/rock_view.py\`
3. **Add a print statement** in the \`list\` method:
   \`\`\`python
   def list(self, request):
       """Handle GET requests to get all rocks"""
       print("🔍 DEBUG: Fetching rocks from containerized database!")
       rocks = Rock.objects.all()
       # rest of your existing code
   \`\`\`
4. **Save the file**
5. **Press F5 again** to restart with your changes
6. **In your browser**, navigate to the rocks page
7. **Check the Integrated Terminal** in VS Code - you should see your print statement!

#### Why Manual Restart is Required for Debugging

When debugging with \`--noreload\`, Django doesn't automatically restart when files change. This is **intentional**:

- **Benefit**: Stable debugging connections that don't disconnect when you edit files
- **Trade-off**: You must manually restart (F5) to see code changes

## Understanding Development vs. Debugging Workflows

Your Docker Compose setup now gives you **two powerful workflows**:

### **Full-Stack Development Workflow** 
Perfect for:
- 👥 **Team members** working on frontend, design, or testing
- 🚀 **Quick demos** or stakeholder reviews  
- 🔍 **Integration testing** of the complete application
- 📱 **Client-focused development** where you just need the API running

**Command**: \`docker compose up\` → Everything starts automatically!

### **API Debugging Workflow**
Perfect for:
- 🐛 **Backend developers** who need to debug API logic
- 🔬 **Investigating complex issues** with breakpoints and variable inspection
- 🎯 **Precise development** with step-through debugging
- 🛠️ **Advanced troubleshooting** of business logic

**Commands**: \`docker compose up postgres-db client\` + VS Code Dev Container → Selective control!

## The Evolution: From Manual Setup to Streamlined Workflows

### **Manual Docker Network Setup** (Previous Section):
- ❌ **No hot reload** - Code changes require stop/remove/rebuild/restart cycle
- ❌ **10+ commands** to see simple changes
- ❌ **Terminal-only debugging** - Print statements and \`pdb\` commands only
- ❌ **Static code** - No volume mounts mean code is copied once during \`docker build\`

### **Docker Compose Full-Stack Workflow** (\`docker compose up\`):
- ✅ **Perfect hot reload** - React changes appear instantly, Django restarts automatically
- ✅ **Zero configuration** - just works for everyone on the team  
- ✅ **Instant complete application** - perfect for demos and integration testing

### **Docker Compose API Debugging Workflow** (\`docker compose up postgres-db client\` + Dev Container):
- ✅ **Full VS Code debugging** - breakpoints, variable inspection, step-through debugging
- ✅ **Client hot reload still works** - React updates instantly while debugging API
- ✅ **Precise control** - start and stop Django exactly when you need it
- ⚠️ **Manual restart for API code changes** - trade-off for stable debugging connections

### **The Volume Mount Game Changer**

The key difference is **live volume mounts**:

\`\`\`yaml
volumes:
  - ./your-client-repo-name:/app  # Live sync: Your edits → Container immediately
\`\`\`

**Manual Setup**: Code copied once during \`docker build\` → Static forever  
**Docker Compose**: Live volume mounts → **Save file = Instant container update**

## Summary: Your Complete Development Environment

Congratulations! You've just set up the same development workflow used by teams at major tech companies. You now have:

**One Command to Rule Them All**: \`docker compose up\` starts your entire development infrastructure with perfect networking and dependency management.

**Integrated Debugging That Just Works**: Press F5 in VS Code for full debugging capabilities—breakpoints, variable inspection, step-through debugging—all running inside your containerized environment.

**Live Code Updates**: Save a React file and see instant browser updates, edit Python code and watch Django restart automatically. No rebuilding, no restarting, no waiting.

**Consistent Environment for Your Entire Team**: Every developer gets the exact same versions and dependencies. Zero "works on my machine" issues.

**Production-Like Architecture Running Locally**: Your development environment mirrors your production setup with complete safety and isolation.

**Welcome to containerized development!** 🚀
`,
  exercise: null,
}
