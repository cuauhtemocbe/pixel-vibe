# Phaser Pixel Vibe

A Phaser.js game project with TypeScript and Vite, using pnpm for package management.

## Prerequisites

- Docker and Docker Compose
- VS Code with Remote-Containers extension (optional)

## Development Setup

### Using VS Code Dev Container (Recommended)

1. Open the project in VS Code
2. When prompted, click "Reopen in Container" or use Command Palette: `Remote-Containers: Reopen in Container`
3. The container will automatically build and install dependencies using pnpm
4. Run `pnpm dev` to start the development server

### Using Docker Compose

1. Build and start the development container:
```bash
docker-compose up -d --build
```

2. Access the container:
```bash
docker exec -it pixel-vibe-phaser-app-1 sh
```

3. Start development server:
```bash
pnpm dev
```

### Local Development (Alternative)

1. Install Node.js 20+ and pnpm:
```bash
# Install pnpm
wget -qO- https://get.pnpm.io/install.sh | sh -
```

2. Install dependencies:
```bash
pnpm install
```

3. Start development server:
```bash
pnpm dev
```

## Package Manager

This project uses **pnpm** for faster, more efficient package management:

- **Faster installations**: pnpm creates hard links and symlinks to packages
- **Disk space efficient**: Stores packages in a global store and links them
- **Strict dependency resolution**: Prevents phantom dependencies

### pnpm Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm typecheck

# Clean node_modules and pnpm store
pnpm clean

# Clean and reinstall
pnpm reinstall

# Validate deployment
pnpm run validate
```

## Project Structure

```
├── src/
│   ├── main.ts          # Entry point
│   ├── scenes/          # Phaser scenes
│   │   ├── Boot.ts      # Boot scene
│   │   └── Play.ts      # Main game scene
│   └── types/           # TypeScript type definitions
├── public/
│   └── assets/          # Game assets (sprites, sounds, etc.)
├── index.html           # Main HTML file
└── pnpm-lock.yaml       # pnpm lockfile
```

## Why pnpm?

This project uses pnpm instead of npm for several benefits:
- Faster installation and builds
- Better disk space efficiency
- Stricter dependency resolution
- Built-in support for monorepos

The Docker setup includes a shared pnpm store volume for improved performance across container rebuilds.
# Fast development
