# frontend/Dockerfile (for development with hot reload)
FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose port used by React dev server
EXPOSE 3000

# Enable live reloading with React's dev server
CMD ["npm", "start"]

# FROM node:18
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# # For production serve build with serve
# RUN npm install -g serve
# CMD ["serve", "-s", "build"]
