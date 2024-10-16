FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the entire project
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

# Use a production-ready command to start the server
CMD ["npm", "start"]
