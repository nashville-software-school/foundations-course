## Welcome to Containers

In our previous modules, you’ve worked with code, dependencies, and environments — and maybe noticed how setting up a development environment can feel fragile and inconsistent.

Today, we introduce Docker — a game-changer in how we build, ship, and run applications. With Docker, you’ll learn how to package your backend into a portable, reliable container that behaves exactly the same across different environments.

## What We'll Accomplish Today

By the end of this module, you’ll be able to:
- Understand what Docker is and how it works
- Explain the difference between containers and virtual machines
- Write a Dockerfile for your Rock of Ages backend
- Build and run your application in a Docker container

Let’s start by understanding what Docker is and why it matters.

## What is Docker?

Before you write a line of Docker code, let’s build a clear picture of what Docker does — and doesn’t — do.

Docker is a **containerization platform**. It allows developers to package applications along with their runtime environment (libraries, dependencies, config files) into a **container** — a lightweight, portable unit that runs reliably across different systems.

Think of a Docker container like a **tiny, self-contained computer** that holds your app and everything it needs to work. Whether you're on a Mac, Windows, or Linux server in the cloud, the container behaves the same.

Check out this intro to docker video:
<iframe width="560" height="315" src="https://www.youtube.com/embed/_dfLOzuIg2o?si=9XCRmxeBBQ6La07c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Why Developers Use Docker

Docker simplifies one of the trickiest parts of development: making sure the app behaves the same everywhere. Here’s how it helps:

### Key Benefits of Docker

**1. Consistency Across Environments**

You've probably heard: “It worked on my machine!” That phrase disappears with Docker. If it works in your container, it works everywhere.

- No more worrying about missing libraries
- No more dependency mismatches
- Perfect dev/prod parity

**2. Easy Deployment**

Once your app is in a container, you can ship it anywhere:
- Your laptop
- Your EC2 instance
- A CI/CD pipeline
- Kubernetes

One container image, infinite possibilities.

**3. Isolation Without Virtualization Overhead**

Unlike virtual machines, Docker containers:
- Start almost instantly
- Use far fewer system resources
- Share the host operating system kernel

This makes Docker fast and efficient, perfect for modern web development.

**4. Versioned Infrastructure**

With Dockerfiles, your environment becomes code:
- Reproducible
- Shareable
- Version-controlled in Git, just like your app

This makes collaboration smoother and debugging easier.

## Containers vs. Virtual Machines

It’s helpful to understand how containers differ from traditional virtual machines.

| Feature                   | Virtual Machine                        | Docker Container                   |
| ------------------------- | -------------------------------------- | ---------------------------------- |
| OS Overhead               | Includes full guest OS                | Shares host OS kernel              |
| Startup Time              | Minutes                                | Seconds                            |
| Resource Usage            | Heavy                                  | Lightweight                        |
| Portability               | Difficult across OS types              | Highly portable                    |
| Isolation                 | Strong                                 | Strong enough for most use cases   |

<br>
<br>

Containers give you just the right level of isolation with excellent speed and portability — a powerful combo for app development.

## How Docker Works

Let’s break down Docker’s architecture into bite-sized concepts:

- **Dockerfile**: A script that tells Docker how to build your container image. You define base images, dependencies, commands, and more.
- **Image**: A snapshot of your app and its environment. Immutable, shareable, and used to create containers.
- **Container**: A running instance of an image. You can start, stop, and destroy containers without affecting the image.
- **Docker Hub**: A cloud registry of container images (think GitHub, but for Docker).
- **Docker CLI**: The command-line interface you’ll use to build images, run containers, and manage everything.

When you run `docker build\