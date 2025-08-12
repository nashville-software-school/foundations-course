export const workshop3RDSLearningChapter = {
  id: "workshop3-rds-learning",
  title: "What is RDS and Why Are We Using It?",
  sectionId: "rds",
  previousChapterId: null,
  content: `
## What is Amazon RDS?

**Amazon RDS (Relational Database Service)** is a fully managed service for running cloud-hosted databases like PostgreSQL, MySQL, and others. Instead of setting up and maintaining your own database server, RDS lets AWS handle the setup, backups, updates, and scaling for you.

In this course, we’ll use **PostgreSQL on RDS**, which works seamlessly with Django and is ideal for storing structured, relational data.

---

## Why Not Just Use SQLite?

SQLite is great for local development — it’s lightweight and file-based. But in production, it falls short:

- ❌ Not designed for multiple users at once
- ❌ Can't be accessed over a network
- ❌ Doesn’t scale with your app
- ❌ Data is stored on the same machine as the app (EC2), making it fragile

**RDS gives us:**

- ✅ A persistent cloud database
- ✅ Network access from EC2 and other services
- ✅ Production-grade reliability and performance
- ✅ Better security and backups

---

## Relational vs. Non-Relational (NoSQL) vs. Object Storage

To understand why we’re using RDS, it helps to compare different types of data storage systems:

| Feature                  | Relational DB (RDS) | NoSQL (e.g. DynamoDB) | Object Storage (e.g. S3) |
|--------------------------|---------------------|------------------------|---------------------------|
| Data format              | Tables with rows/columns | Key-value, documents, graphs | Files (images, videos, PDFs, etc.) |
| Schema required?         | Yes                 | Often flexible         | No schema (just files)    |
| Use case                 | Structured data with relationships | Scalable, unstructured or semi-structured data | Store and serve files     |
| Query language           | SQL                 | NoSQL-specific         | None (file metadata only) |

We’re choosing **relational** storage (PostgreSQL on RDS) because:

- Our app uses structured data (e.g. rocks, users, types)
- Django was built to work with SQL databases
- We want ACID(See Glossary) guarantees: consistency, durability, etc.

---

## RDS in Our Architecture

After deploying your Django app to EC2, it needs a reliable way to store data outside the instance.

Instead of keeping your data local (e.g. in SQLite), you’ll connect your API to **RDS**, which lives in the same AWS region and is secured to only accept traffic from your EC2 instance.

Frontend (S3/CloudFront)
|
↓
Backend API (EC2) ←→ RDS (PostgreSQL)


This is how modern web apps are built — separating compute (EC2) from storage (RDS) for better performance, scaling, and reliability.

---

## Summary

- 🧠 RDS is a **cloud-hosted relational database**, managed by AWS.
- 🧱 PostgreSQL gives us a robust, structured way to store and query data.
- 🔌 You’ll connect your deployed Django app to RDS just like you would in a production environment.
- 📊 We use relational databases when our data is highly structured and consistent — and we want powerful querying tools like SQL.

In the next chapter, we’ll walk through **provisioning your own PostgreSQL database on RDS** and connecting your API to it.

`,
  exercise: null,
};