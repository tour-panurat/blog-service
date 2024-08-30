
# Blog API

## Overview

The **Blog API** is a Node.js and TypeScript-based API that serves as the backend for a blogging platform. It leverages Express.js for the server, Prisma as the ORM for interacting with a PostgreSQL database, and Auth0 for authentication.

## Features

- **Express.js**: Lightweight web framework for handling HTTP requests.
- **Prisma**: ORM for database management with migrations and seeding.
- **Auth0**: Authentication using OAuth2 and JWT.
- **Swagger**: API documentation generated using Swagger.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tour-panurat/blog-service.git
   cd blog-service/blog-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root of the project and add the following:

   ```bash
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blog-bbl?schema=public"
   AUTH0_ISSUER_BASE_URL=https://dev-yg.us.auth0.com
   AUTH0_AUDIENCE=H9F6QG5SzTKMv0tbmgxLj9LjG1EKVllA
   SERVER_URL=http://localhost:3001
   PORT=3001
   ```

## Development

### Running the development server

To start the development server with live reloading, run:

```bash
npm run dev
```

### Building the project

To build the TypeScript project, run:

```bash
npm run build
```

### Running the production server

To start the server in production mode, after building, run:

```bash
npm start
```

## Database Management

### Migrations

To create a new migration in development, run:

```bash
npm run migrate:dev
```

To deploy migrations in production, run:

```bash
npm run migrate:prod
```

### Database Push

To synchronize the database schema without generating a migration, run:

```bash
npm run db:push
```

### Generate Prisma Client

To generate the Prisma Client, run:

```bash
npm run generate
```

### Seeding the Database

To seed the database with initial data, run:

```bash
npm run seed
```

## API Documentation

API documentation is generated using Swagger. To view the documentation, ensure the server is running and visit:

```
http://localhost:3001/api-docs
```


## Author

Tour Panurat
