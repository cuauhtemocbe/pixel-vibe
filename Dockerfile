# Multi-stage build for production
FROM node:20-alpine AS builder

# Install system dependencies
RUN apk add --no-cache git wget curl

# Create pnpm store directory
RUN mkdir -p /home/node/.pnpm-store && chown -R node:node /home/node/.pnpm-store

# Switch to node user
USER node
WORKDIR /home/node

# Install pnpm
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.profile" SHELL="$(which sh)" sh -

# Add pnpm to PATH
ENV PATH="/home/node/.local/share/pnpm:$PATH"

# Set working directory
WORKDIR /app

# Copy package files
COPY --chown=node:node package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY --chown=node:node . .

# Type check and build the application
RUN pnpm run typecheck && pnpm run build

# Production stage - serve with Node.js for Railway
FROM node:20-alpine AS production

# Install system dependencies
RUN apk add --no-cache git wget curl

# Create pnpm store directory
RUN mkdir -p /home/node/.pnpm-store && chown -R node:node /home/node/.pnpm-store

# Switch to node user
USER node
WORKDIR /home/node

# Install pnpm
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.profile" SHELL="$(which sh)" sh -

# Add pnpm to PATH
ENV PATH="/home/node/.local/share/pnpm:$PATH"

# Set working directory
WORKDIR /app

# Copy package files and install only production dependencies
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy built assets from builder stage
COPY --from=builder --chown=node:node /app/dist ./dist

# Railway will provide PORT env var, expose it
EXPOSE $PORT

# Set environment to production
ENV NODE_ENV=production

# Health check using Railway's PORT
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/ || exit 1

# Use shell to properly expand PORT environment variable
CMD ["sh", "-c", "pnpm preview --host 0.0.0.0 --port $PORT"]
