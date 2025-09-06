#!/bin/bash

# Pre-deployment validation script
echo "🔍 Running pre-deployment checks..."

# Run type checking
echo "📝 Running TypeScript type checking..."
if ! pnpm run typecheck; then
    echo "❌ TypeScript type checking failed"
    exit 1
fi
echo "✅ TypeScript type checking passed"

# Run tests
echo "🧪 Running tests..."
if ! pnpm test --run; then
    echo "❌ Tests failed"
    exit 1
fi
echo "✅ Tests passed"

# Run build
echo "🏗️  Building project..."
if ! pnpm run build; then
    echo "❌ Build failed"
    exit 1
fi
echo "✅ Build successful"

# Check if dist directory exists and has content
if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    echo "❌ Build output is missing or empty"
    exit 1
fi

echo "🎉 All pre-deployment checks passed!"
echo "📦 Build artifacts:"
ls -la dist/

echo ""
echo "🚀 Ready for deployment to Railway!"
