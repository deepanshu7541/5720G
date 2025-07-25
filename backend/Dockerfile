FROM node:18

# Create app directory
WORKDIR /app

# Copy package manifests and install all deps
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Start the server
CMD ["node", "app.js"]
