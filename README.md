# Node.js, Express, PostgreSQL, Sequelize & Docker - CRUD Boilerplate

This is a boilerplate for a RESTful CRUD API using Node.js, Express, PostgreSQL, Sequelize ORM, and Docker. It's configured with ES module support (`type: "module"`).

## Features

- **Node.js & Express:** A robust and minimalist web framework for Node.js.
- **PostgreSQL:** A powerful, open-source object-relational database system.
- **Sequelize:** A modern TypeScript and Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
- **Docker:** Containerization for easy setup and deployment.
- **ES Modules:** Uses the modern ES module syntax.
- **CRUD Example:** A full CRUD API for a `User` resource.
- **Database Migrations:** Sequelize migrations for database schema management.
- **Environment Variables:** Uses `dotenv` for managing environment variables.
- **CORS:** Pre-configured with CORS support.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/en/) (for local development without Docker)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd node-sequelize-pg-boilerplate
```

### 2. Create a `.env` file

Create a `.env` file in the root of the project with the following content:

```env
# Server
PORT=8080

# Database
DB_HOST=db
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase
DB_PORT=5432
```

### 3. Run with Docker Compose

This is the recommended way to run the application. It will start the Node.js application and a PostgreSQL database in Docker containers.

```bash
docker-compose up --build
```

The application will be available at `http://localhost:8080`.

### 4. Running Locally (without Docker)

If you prefer to run the application without Docker, you will need to have PostgreSQL running on your local machine.

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Update `.env` file:**

    Update the `.env` file with your local PostgreSQL credentials.

3.  **Run database migrations:**

    ```bash
    npx sequelize-cli db:migrate
    ```

4.  **Start the server:**

    ```bash
    npm start
    ```

    Or for development with auto-reloading:

    ```bash
    npm run dev
    ```

## API Endpoints

The following endpoints are available for the `User` resource:

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| `POST` | `/api/users`    | Creates a new user.  |
| `GET`  | `/api/users`    | Retrieves all users. |
| `GET`  | `/api/users/:id`| Retrieves a single user by ID. |
| `PUT`  | `/api/users/:id`| Updates a user by ID. |
| `DELETE`| `/api/users/:id`| Deletes a user by ID. |

### Example cURL commands:

**Create a user:**

```bash
curl -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d '{"name":"John Doe", "email":"john.doe@example.com"}'
```

**Get all users:**

```bash
curl http://localhost:8080/api/users
```

**Get a user by ID:**

```bash
curl http://localhost:8080/api/users/1
```

**Update a user:**

```bash
curl -X PUT http://localhost:8080/api/users/1 -H "Content-Type: application/json" -d '{"name":"John Smith", "email":"john.smith@example.com"}'
```

**Delete a user:**

```bash
curl -X DELETE http://localhost:8080/api/users/1
```

## Folder Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── package.json
├── src
│   ├── app.js
│   ├── controllers
│   │   └── user.controller.js
│   ├── db
│   │   ├── database.js
│   │   ├── index.js
│   │   └── migrations
│   ├── models
│   │   ├── index.js
│   │   └── user.js
│   └── routes
│       └── user.routes.js
└── README.md
```
