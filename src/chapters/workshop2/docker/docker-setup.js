export const dockerSetupChapter = {
  id: "docker-setup",
  title: "Run a Docker Container Locally",
  sectionId: "intro-to-docker",
  previousChapterId: "docker-fundamentals",
  content: `## Setting Up and Running the Application Locally with Docker

In this guide, you'll learn how to run your Rock of Ages application locally using Docker.

### 1. Fork and Clone the Repository

We'll start by forking and cloning the API repository:

1. Visit the [Rock of Ages API GitHub Repository](https://github.com/NSS-Workshops/rock-of-ages-api)
2. Click the **Fork** button in the top-right corner of the page to create your own copy
3. After forking, navigate to your forked repository
4. Click the **Code** button and copy the URL (choose SSH or HTTPS)
5. Open your terminal and clone the repository with \`git clone\` plus the url from the previous step.


### 2. Ensure You Have Docker Installed

Before proceeding, make sure Docker is installed on your machine:

- Download Docker Desktop from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
- Follow the installation instructions for your operating system
- Open the docker application to see the docker desktop console. You will be able to see images and containers that you run locally here. You can also start and stop containers using this console for future reference but we will focus on using the command line for the rest of these instructions. 
- After installing, verify Docker is running by typing:

\`\`\`bash
docker --version
\`\`\`

You should see output indicating the installed version.
If you see any errors such as ERROR: Cannot connect to the Docker daemon. Navigate to applications to open docker and view the docker desktop console. Doing this usually resolves this error when you run the command again.

### 3. Explore the Dockerfile

Take a look and explore the Dockerfile that you will find in the rock-of-ages-api project. Remember A Dockerfile is a text file containing a set of instructions for building a Docker image. Check out the next chapter for a full breakdown of the Dockerfile. 

### 4. Build the Docker Image

Once in your project directory in the terminal, build the Docker image:

\`\`\`bash
docker build -t rock-of-ages-app .
\`\`\`

This will read the instructions in the \`Dockerfile\` to build a new image locally. The -t flag allows you to tag the image with a name of your choosing. Here we are just naming it rock-of-ages-app.

💡 **What's happening here?** Docker reads the instructions in your Dockerfile to build a runnable image of your application. Remember, a docker image is like a snapshot of the application environment, allowing you to easily distribute and run it on different machines without compatibility issues. 

### 5. Run the Docker Container

After building the image, start your container:

\`\`\`bash
docker run -p 8000:8000 rock-of-ages-app
\`\`\`

- This maps port 8000 on your computer to port 8000 in the container
- You should now be able to visit [http://localhost:8000](http://localhost:8000) to see your application running
- Alternatively you can test the application in postman. You can find instructions on testing in postman in the api's ReadMe

💡 **What's happening here?** The container is now running your app, and Docker is forwarding traffic from your browser to the app inside the container using port mapping. Port mapping allows containers to communicate with the outside world by directing network traffic from a host port to a container port. If you notice in the Dockerfile it has \`EXPOSE 8000\`. This is the typical port to expose for Django applications. 

### 6. Stopping and Restarting

Press \`Ctrl + C\` in the terminal where it's running. This only removes docker from the foreground. The container will still be running and postman requests should stil work.

To see all running containers:

\`\`\`bash
docker ps
\`\`\`

To stop a container:

\`\`\`bash
docker stop [container_id]
\`\`\`

To start a stopped container again:

\`\`\`bash
docker start -a [container_id]
\`\`\`

Replace \`[container_id]\` with the actual ID shown by \`docker ps -a\`.
Including the -a flag tells docker to run the container in the foreground so you can see the output logs. Alternatively you can omit the flag to run the container in the background to free up use of your terminal.

Feel free to explore all the docker commands in [Dockerdocs](https://docs.docker.com/reference/cli/docker/)

## What We've Accomplished

In this chapter, you've:
- Forked and cloned the Rock of Ages API repository
- Verified Docker is installed and running
- Built a Docker image from a project
- Ran the project inside a Docker container
- Stopped and restarted containers as needed

You now have the application running in a local Docker environment! In upcoming modules, we'll learn how to push docker images to a central repository so that they are accessible by other services such as EC2.

`,
  exercise: null,
}
