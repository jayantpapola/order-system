# Start from an official Node.js Alpine image
FROM node:20-alpine

# Install Python and pip (Alpine doesn't have them by default)
RUN apk add --no-cache python3 py3-pip

# Set the working directory
WORKDIR /app

# Copy Node dependency files first (layer caching)
COPY package*.json ./

# Install Node dependencies
RUN npm install --production

# Copy Python dependency file
COPY requirements.txt ./

# Install Python dependencies (--break-system-packages needed on newer Alpine)
RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt

# Copy the rest of the app
COPY . .

# Expose port 3000
EXPOSE 3000

# Default: run the Node.js app (we can override to run Python instead)
CMD ["node", "index.js"]