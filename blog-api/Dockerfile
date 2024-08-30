# Use an official Node.js runtime as a parent image
FROM node:20.11.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

RUN npx prisma generate

# Expose the application port (adjust this if your app runs on a different port)
EXPOSE 3001

# Run the application
CMD ["npm", "start"]
