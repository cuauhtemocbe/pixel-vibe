# Tech Stack Resume - Pixel Vibe Project

## 🎮 Project Overview
**Pixel Vibe** - A modern web-based game application built with Phaser.js, TypeScript, and cutting-edge web technologies.

## 🛠️ Core Technologies

### Frontend Framework
- **Phaser.js 3.80** - Professional 2D game framework for HTML5 games
- **TypeScript 5.5.4** - Strongly typed JavaScript for enhanced developer experience and code quality
- **Vite 5.4** - Lightning-fast build tool with HMR (Hot Module Replacement)

### Language & Runtime
- **Node.js 20 LTS** - JavaScript runtime environment
- **TypeScript** - Primary development language with strict type checking
- **ES2022** - Modern JavaScript features and syntax

## 📦 Package Management
- **pnpm** - Fast, disk space efficient package manager
  - Hard links for efficient storage
  - Strict dependency resolution
  - Faster installation compared to npm/yarn

## 🧪 Testing & Quality Assurance
- **Vitest 2.0.5** - Fast unit testing framework powered by Vite
- **@vitest/ui** - Interactive UI for test exploration
- **@vitest/coverage-v8** - Code coverage reporting
- **jsdom** - DOM implementation for Node.js testing
- **Canvas** - Node canvas implementation for testing graphics

## 🐳 Containerization & DevOps

### Docker Setup
- **Multi-stage Docker builds** for optimized production images
- **Development container** with VS Code Dev Containers support
- **Docker Compose** for local development environment
- **Alpine Linux** base images for minimal footprint

### CI/CD Pipeline
- **GitHub Actions** for automated testing and building
- **Matrix testing** across Node.js 18.x and 20.x
- **Automated coverage reports** with Codecov integration
- **Type checking** and build validation on every push

## 🏗️ Build & Development Tools

### Build Configuration
- **Vite** - Modern build tool with:
  - ESBuild for fast minification
  - Rollup for production bundling
  - Code splitting (Phaser as separate chunk)
  - Path aliases (@scenes, @/)

### Development Features
- **Hot Module Replacement (HMR)**
- **TypeScript path mapping** for clean imports
- **Source maps** for debugging
- **Production preview server**

## 🚀 Deployment & Infrastructure
- **Railway.app** ready configuration
- **Environment-based port configuration**
- **Health checks** in production Docker image
- **Static asset optimization**

## 📁 Project Architecture

### Directory Structure
```
├── src/              # TypeScript source code
│   ├── scenes/       # Phaser game scenes
│   ├── types/        # Type definitions
│   └── test/         # Test files
├── public/           # Static assets
├── dist/             # Production build output
└── .devcontainer/    # VS Code dev container config
```

### Configuration Files
- `tsconfig.json` - TypeScript configuration with strict mode
- `vite.config.ts` - Build and dev server configuration
- `vitest.config.ts` - Test runner configuration
- `docker-compose.yml` - Container orchestration
- `Dockerfile` - Production container definition
- `Dockerfile.dev` - Development container definition

## 🔧 Development Workflow

### Commands
```bash
pnpm dev         # Start development server
pnpm build       # Build for production
pnpm typecheck   # Run TypeScript type checking
pnpm test        # Run tests
pnpm preview     # Preview production build
```

### Key Features
- **Type-safe development** with TypeScript strict mode
- **Fast refresh** during development
- **Automated testing** on push/PR
- **Containerized development** for consistency
- **Efficient dependency management** with pnpm

## 📊 Performance Optimizations
- **Code splitting** - Phaser loaded as separate chunk
- **ESBuild minification** - Fast production builds
- **Alpine Linux containers** - Minimal image size
- **pnpm efficiency** - Reduced disk usage and faster installs
- **Vite's optimized dev server** - Instant server start

## 🔒 Security & Best Practices
- **Non-root container user** (nodeuser)
- **Dependency lock files** (pnpm-lock.yaml)
- **Strict TypeScript configuration**
- **Isolated module compilation**
- **Health checks** in production

## 💡 Developer Experience
- **VS Code Dev Containers** support
- **Path aliases** for cleaner imports
- **Interactive test UI** with Vitest
- **Coverage reports** for code quality metrics
- **Hot Module Replacement** for instant feedback

---

This tech stack represents a modern, efficient, and developer-friendly approach to web game development, combining the power of Phaser.js with contemporary JavaScript tooling and DevOps practices.