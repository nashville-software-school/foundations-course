export const rdsAndStorageGlossaryChapter = {
  id: 'rds-and-storage-glossary',
  title: 'Glossary',
  sectionId: 'rds',
  previousChapterId: "workshop3-rds-deploy", 
  content: `

| Term | Description |
|------|-------------|
| **RDS (Relational Database Service)** | A managed service from AWS that makes it easy to set up, operate, and scale relational databases like PostgreSQL, MySQL, and more. |
| **PostgreSQL** | An open-source, powerful, and widely used relational database supported by AWS RDS. Ideal for structured data and SQL-based applications. |
| **Relational Database** | A type of database that stores data in structured tables with rows and columns, using relationships between those tables. Uses SQL for querying. |
| **SQLite** | A lightweight, file-based relational database often used for local development. Not ideal for production due to limited scalability and networking. |
| **NoSQL Database** | A type of database that stores data in formats like key-value pairs, documents, or graphs. Designed for flexibility and horizontal scalability. |
| **DynamoDB** | Amazon’s fully managed NoSQL database service, optimized for speed and scale. Commonly used for unstructured or flexible data models. |
| **Object Storage** | A storage architecture where data is stored as objects (e.g., files like images or videos), along with metadata. Doesn’t use a database schema. |
| **Amazon S3** | A cloud-based object storage service from AWS used to store and retrieve any amount of data, typically files rather than structured data. |
| **ACID** | A set of database properties—Atomicity, Consistency, Isolation, Durability—that ensure reliable transactions in relational databases. [Learn more](https://www.databricks.com/glossary/acid-transactions) |
| **SQL (Structured Query Language)** | A language used to interact with relational databases. Used to insert, query, update, and delete data. |
| **Schema** | The structure of a relational database, defining tables, fields, and data types. Enforces consistency across the stored data. |
| **Scalability** | The ability of a system (like RDS or DynamoDB) to grow and handle increased demand, either vertically (stronger hardware) or horizontally (more instances). |
| **Managed Service** | A cloud service where the provider (e.g., AWS) handles tasks like provisioning, maintenance, backups, and updates, so you don’t have to. |
| **Database Endpoint** | The network address (hostname and port) used by an application to connect to a database hosted in RDS. |
| **Production Database** | A live, persistent database used by a deployed application. Unlike local or development databases, it's expected to serve real users and retain data long-term. |

`,
};