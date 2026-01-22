# Production-Ready Node.js Boilerplate

This is a production-ready boilerplate for a RESTful CRUD API using Node.js, Express, PostgreSQL, Sequelize ORM, and Docker. It is configured with modern features to ensure security, robustness, and ease of development and deployment.

## Features

- **Framework:** Node.js and Express.
- **Database:** PostgreSQL with Sequelize ORM.
- **Containerization:** Production-optimized multi-stage Docker build.
- **ES Modules:** Uses modern ES module syntax.
- **CRUD Example:** A full CRUD API for a `User` resource.
- **Database Migrations:** Sequelize migrations for safe schema management.
- **Configuration:** Centralized configuration using `dotenv`.
- **Security:** `helmet` for security headers, `joi` for input validation, and a strict CORS policy.
- **Logging:** Structured, production-grade logging with `winston`.
- **Error Handling:** Centralized error handling middleware.
- **Graceful Shutdown:** Application handles `SIGTERM` signals to shut down gracefully.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/en/) (optional, for local development without Docker)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd node-sequelize-pg-boilerplate
```

### 2. Create a `.env` file

Create a `.env` file in the root of the project. The database credentials should match those in the `docker-compose` files.

```env
# Server
PORT=8080
NODE_ENV=development

# Database
DB_HOST=db
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase
DB_PORT=5432
```

### 3. Running in Development

The development environment uses `nodemon` for hot-reloading and mounts the source code as a volume for immediate feedback.

```bash
docker-compose -f docker-compose.dev.yml up --build
```

### 4. Running in Production

The production environment uses the optimized, secure, multi-stage Docker build.

```bash
# Ensure NODE_ENV in .env is set to 'production'
docker-compose up --build -d
```

The application will be available at `http://localhost:8080`.

## API Endpoints

The following endpoints are available for the `User` resource. `POST` and `PUT` requests are validated using `joi`.

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

## Folder Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── docker-compose.dev.yml
├── package.json
├── src
│   ├── app.js
│   ├── config
│   │   └── logger.js
│   ├── controllers
│   │   └── user.controller.js
│   ├── db
│   │   ├── database.js
│   │   ├── index.js
│   │   └── migrations
│   ├── middleware
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── models
│   │   ├── index.js
│   │   └── user.js
│   ├── routes
│   │   └── user.routes.js
│   ├── utils
│   │   ├── ApiError.js
│   │   └── catchAsync.js
│   └── validations
│       └── user.validation.js
└── README.md
```

