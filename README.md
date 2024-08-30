# Blog API and App

This repository contains a Blog API and a corresponding frontend application. The API is built using Express and Prisma, and the frontend is built using Next.js. The application is set up to work with a PostgreSQL database.

## Table of Contents

- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Seeding the Database](#seeding-the-database)
- [Docker](#docker)

## Getting Started

To get started with the project, clone the repository and navigate to the project directory:

```bash
git clone https://github.com/tour-panurat/blog-service.git
cd blog-service
```

## Technologies Used

- **Backend:** Node.js, Express, Prisma, PostgreSQL
- **Frontend:** Next.js
- **Authentication:** Auth0
- **API Documentation:** Swagger

## Setup

1. Ensure you have Docker and Docker Compose installed on your machine.

2. Run the following command to start the services:

   ```bash
   docker-compose up --build
   ```

## API Endpoints

- **GET /users**: Retrieve all users
- **POST /users**: Create a new user
- **GET /posts**: Retrieve all posts
- **POST /posts**: Create a new post

Refer to the Swagger documentation at `/api-docs` for detailed API documentation.

## Seeding the Database

The database can be seeded with initial data using the following command:

```bash
npm run seed
```

## Docker

This project includes a `docker-compose.yml` file for easy setup and deployment. The following services are defined:

- **database**: PostgreSQL database
- **api**: Backend API service
- **app**: Frontend application

Run `docker-compose up --build` to start all services.

## License

This project is licensed under the Panurat License
