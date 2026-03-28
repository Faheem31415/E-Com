FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
# This helps with caching the Docker layers
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application source code to the container
COPY . .

# Expose port 4000 (as defined in server.js)
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
