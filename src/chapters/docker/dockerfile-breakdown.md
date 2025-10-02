## Dissecting the Dockerfile


Here’s the full Dockerfile we’ll explore:

```Dockerfile
# Use Python 3.8 as the base image
FROM python:latest

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIPENV_VENV_IN_PROJECT=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \\
  gcc \\
  && rm -rf /var/lib/apt/lists/*

# Install pipenv
RUN pip install --upgrade pip && \\
  pip install pipenv

# Copy Pipfile and Pipfile.lock
COPY Pipfile* /app/

# Install dependencies in a virtual environment
RUN pipenv install

# Copy project files
COPY . /app/

# Make the seed_database.sh script executable
RUN chmod +x /app/seed_database.sh

# Expose port
EXPOSE 8000

# Command to run scripts using the pipenv environment
CMD pipenv run bash -c "./seed_database.sh && python manage.py runserver 0.0.0.0:8000"
```

Let’s break it down, line by line.

---

## 📦 Base Image

```Dockerfile
FROM python:latest
```

This line tells Docker to start with the latest official Python image from Docker Hub. It’s a clean environment with Python already installed — a great starting point for any Python app.

---

## 🛠 Environment Variables

```Dockerfile
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIPENV_VENV_IN_PROJECT=1
```

These environment variables do three useful things:

- `PYTHONDONTWRITEBYTECODE`: Prevents creation of unnecessary `.pyc` files.
- `PYTHONUNBUFFERED`: Ensures real-time logging output (great for debugging).
- `PIPENV_VENV_IN_PROJECT`: Creates the virtual environment inside the project directory — easier to find and manage.

---

## 📁 Working Directory

```Dockerfile
WORKDIR /app
```

Sets the working directory to `/app`. All subsequent commands (like `COPY` and `RUN`) will execute relative to this directory.

---

## 🧱 System Dependencies

```Dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends \\
  gcc \\
  && rm -rf /var/lib/apt/lists/*
```

Installs the GNU Compiler Collection (`gcc`), which is required to build some Python packages (e.g. those that rely on C extensions like `psycopg2`). The cleanup step at the end keeps the image size small.

---

## 📦 Python Dependency Manager

```Dockerfile
RUN pip install --upgrade pip && \\
  pip install pipenv
```

Upgrades pip and installs pipenv — the tool this project uses to manage Python packages and virtual environments.

---

## 📄 Pipfile and Lockfile

```Dockerfile
COPY Pipfile* /app/
```

Copies your `Pipfile` and `Pipfile.lock` to the container. Doing this before copying all source code helps Docker cache the dependencies layer efficiently.

---

## 📚 Install Python Dependencies

```Dockerfile
RUN pipenv install
```

Installs the project dependencies listed in the `Pipfile` into the virtual environment created by pipenv.

---

## 📁 Copy the Source Code

```Dockerfile
COPY . /app/
```

Copies the rest of your backend code into the container's working directory.

---

## ✅ Make the Seed Script Executable

```Dockerfile
RUN chmod +x /app/seed_database.sh
```

Ensures that your database seeding script has the necessary permissions to run inside the container.

---

## 🌐 Expose the Port

```Dockerfile
EXPOSE 8000
```

Tells Docker that this container will serve HTTP traffic on port 8000 — which matches the Django development server default.

---

## 🚀 Start the App

```Dockerfile
CMD pipenv run bash -c "./seed_database.sh && python manage.py runserver 0.0.0.0:8000"
```

This is the main entrypoint for the container:
1. Seeds the database
2. Starts the Django development server
3. Binds the server to `0.0.0.0` so it's accessible from outside the container

---

## 🧠 Recap: What This Dockerfile Does

Here’s what this file accomplishes, all in one container image:
- Uses a base Python environment
- Installs system and Python dependencies
- Copies your code and dependencies
- Seeds the database
- Runs your backend server

This single file makes your backend portable, consistent, and production-ready.

