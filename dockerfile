# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Expose Angular dev server port
EXPOSE 4200

# Run Angular app
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]

