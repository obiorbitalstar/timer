# Stage 1: Build the application
FROM node:22 AS build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Stage 2: Run the application
FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]
