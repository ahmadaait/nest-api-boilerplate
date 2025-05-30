# ====================
# STAGE 1: BUILD
# ====================
FROM node:20.11.0-alpine AS builder

WORKDIR /app

# Install build deps for bcrypt
#RUN apk add --no-cache python3 make g++

# Copy dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build NestJS (output to /app/dist)
RUN yarn build

# ====================
# STAGE 2: RUNNER
# ====================
FROM node:20.11.0-alpine

WORKDIR /app

# Only copy production deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# If you need things like env config files, copy them here:
COPY --from=builder /app/.env ./
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma

# Expose port
EXPOSE 8080

# Start app
CMD ["node", "dist/src/main"]
