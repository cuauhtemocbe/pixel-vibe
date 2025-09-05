# Pixel Vibe - Testing Guide

Your game now includes a comprehensive testing setup using Vitest! This will help make your game more robust and maintainable.

## 🧪 Testing Setup

### What's Included

- **Vitest**: Fast, modern testing framework built on Vite
- **JSDOM**: DOM environment for testing browser-like features
- **Coverage Reports**: Track test coverage of your code
- **Phaser Mocks**: Custom mocks for testing Phaser scenes and game logic
- **Mobile Input Testing**: Test both keyboard and mobile controls

### Test Structure

```
src/test/
├── setup.ts              # Test environment setup and mocks
├── gameTestUtils.ts       # Utility functions for game testing
├── basic.test.ts          # Basic tests and game constants
├── game.test.ts           # Integration tests for game configuration
└── scenes/
    ├── Boot.test.ts       # Tests for the Boot scene
    └── Play.test.ts       # Tests for the Play scene (player movement, input)
```

## 🚀 Running Tests

### Available Test Commands

```bash
# Run tests in watch mode (auto-rerun on file changes)
pnpm test

# Run tests once and exit
pnpm test --run

# Run tests with UI (interactive test runner)
pnpm test:ui

# Run tests with coverage report
pnpm test:coverage

# Run specific test file
pnpm test src/test/basic.test.ts

# Run tests matching a pattern
pnpm test --grep "player movement"
```

### Test Coverage

After running `pnpm test:coverage`, you'll find detailed coverage reports in:
- Terminal output (text format)
- `coverage/index.html` (interactive HTML report)

## 📝 Test Examples

### Basic Game Constants Test
```typescript
it('should validate game constants', () => {
  const GAME_WIDTH = 320
  const GAME_HEIGHT = 180
  const PLAYER_SPEED = 90

  expect(GAME_WIDTH).toBe(320)
  expect(PLAYER_SPEED).toBeGreaterThan(0)
})
```

### Player Movement Test
```typescript
it('should move player left when left key is pressed', () => {
  GameTestUtils.simulateKeyPress(mockCursors, 'left', true)
  playScene.update(0, 16)
  expect(mockPlayer.body.setVelocityX).toHaveBeenCalledWith(-90)
})
```

### Scene Loading Test
```typescript
it('should load all required assets', () => {
  bootScene.preload()
  expect(mockLoadImage).toHaveBeenCalledWith('player', '/assets/player.png')
  expect(mockLoadImage).toHaveBeenCalledWith('tiles', '/assets/tiles.png')
})
```

## 🔧 Writing New Tests

### For New Scenes
1. Create a test file in `src/test/scenes/YourScene.test.ts`
2. Import the scene and test utilities
3. Test the `preload()`, `create()`, and `update()` methods

### For Game Logic
1. Create a test file in `src/test/`
2. Use `GameTestUtils` for mocking Phaser objects
3. Test individual functions and game mechanics

### For Mobile Controls
```typescript
it('should respond to mobile input', () => {
  GameTestUtils.simulateMobileInput('ArrowLeft', true)
  // Test your mobile input handling
})
```

## 🎯 What to Test

### Essential Areas to Cover

1. **Scene Transitions**
   - Boot scene loads assets and starts Play scene
   - Scene switching works correctly

2. **Player Movement**
   - Keyboard controls (WASD, Arrow keys, Space)
   - Mobile controls
   - Physics interactions (jumping, gravity)

3. **Game Physics**
   - Collision detection
   - Ground detection for jumping
   - Player boundaries

4. **Asset Loading**
   - All required assets are loaded
   - Asset paths are correct

5. **Input Handling**
   - Keyboard input priority
   - Mobile input fallback
   - Combined input scenarios

### Good Testing Practices

- **Test small units**: Test individual functions rather than entire systems
- **Use descriptive names**: Test names should clearly describe what they test
- **Test edge cases**: What happens when multiple keys are pressed?
- **Mock external dependencies**: Use the provided Phaser mocks
- **Keep tests fast**: Tests should run quickly to encourage frequent running

## 🐛 Debugging Tests

### Common Issues

1. **Import errors**: Make sure your path aliases (`@scenes`, `@`) are working
2. **Mock setup**: Ensure proper mocking of Phaser objects
3. **Async operations**: Use `await GameTestUtils.waitForNextFrame()` for timing

### Tips

- Use `console.log` in tests during development
- Run specific test files while developing: `pnpm test YourTest.test.ts`
- Check the coverage report to find untested code paths

## 🔄 Continuous Integration

Your tests are ready for CI/CD pipelines. Add this to your deployment workflow:

```yaml
- name: Run Tests
  run: pnpm test --run

- name: Generate Coverage
  run: pnpm test:coverage
```

## 📚 Next Steps

1. **Run your first test**: `pnpm test --run`
2. **Add tests for new features**: Every new game mechanic should have tests
3. **Monitor coverage**: Aim for >80% test coverage
4. **Refactor with confidence**: Tests help ensure changes don't break existing functionality

Happy testing! 🎮✨
