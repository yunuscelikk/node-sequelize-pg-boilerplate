# Development Stage
FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "run", "dev"]

# Build Stage
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Production Stage
FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001 -G nodejs

# Copy dependencies and source code from the build stage
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/src ./src

# Set the owner of the files to the non-root user
RUN chown -R appuser:nodejs .

# Switch to the non-root user
USER appuser

EXPOSE 8080
CMD ["npm", "start"]

