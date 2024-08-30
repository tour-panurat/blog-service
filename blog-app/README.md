
# Blog App

## Overview

The **Blog App** is a React-based frontend application built using Next.js. It integrates with an API backend and supports authentication using Auth0. The app also uses Material-UI for styling and Axios for making HTTP requests.

## Features

- **Next.js**: React framework with built-in server-side rendering and routing.
- **Auth0**: Authentication and authorization using OAuth2 and JWT.
- **Material-UI**: A popular React UI framework for building responsive and modern interfaces.
- **Axios**: Promise-based HTTP client for the browser and Node.js.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tour-panurat/blog-service.git
   cd blog-service/blog-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root of the project and add the following:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_AUTH0_DOMAIN=https://dev-yg.us.auth0.com
   NEXT_PUBLIC_AUTH0_CLIENT_ID=H9F6QG5SzTKMv0tbmgxLj9LjG1EKVllA
   ```

## Development

### Running the development server

To start the development server with live reloading, run:

```bash
npm run dev
```

### Building the project

To create an optimized production build, run:

```bash
npm run build
```

### Starting the production server

To start the server in production mode, after building, run:

```bash
npm start
```

### Linting the code

To run ESLint and check the code for issues, run:

```bash
npm run lint
```

## Deployment

The app can be deployed on various platforms that support Node.js. Ensure that the environment variables are correctly set in your production environment.


## Author

Tour Panurat
