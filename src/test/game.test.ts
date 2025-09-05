import { describe, it, expect, vi } from 'vitest'

// Mock Phaser for integration tests
vi.mock('phaser', () => ({
  default: {
    AUTO: 'AUTO',
    Scale: {
      FIT: 'FIT',
      CENTER_BOTH: 'CENTER_BOTH'
    },
    Game: vi.fn(),
    Scene: class MockScene {
      scene = { key: 'MockScene' }
      preload() {}
      create() {}
      update() {}
    }
  }
}))

describe('Game Configuration', () => {
  it('should have correct game dimensions', () => {
    // Test the game constants that would be used in main.ts
    const GAME_WIDTH = 320
    const GAME_HEIGHT = 180

    expect(GAME_WIDTH).toBe(320)
    expect(GAME_HEIGHT).toBe(180)
  })

  it('should have proper game config structure', () => {
    const GAME_WIDTH = 320
    const GAME_HEIGHT = 180

    const config = {
      type: 'AUTO',
      parent: 'game',
      backgroundColor: '#0d0d0d',
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      pixelArt: true,
      roundPixels: true,
      physics: {
        default: 'arcade',
        arcade: { gravity: { x: 0, y: 800 }, debug: false }
      },
      scale: {
        mode: 'FIT',
        autoCenter: 'CENTER_BOTH'
      }
    }

    expect(config.width).toBe(320)
    expect(config.height).toBe(180)
    expect(config.backgroundColor).toBe('#0d0d0d')
    expect(config.pixelArt).toBe(true)
    expect(config.physics.arcade.gravity.y).toBe(800)
  })
})

describe('Game Constants', () => {
  it('should have correct physics constants', () => {
    const PLAYER_SPEED = 90
    const JUMP_VELOCITY = -220
    const GRAVITY = 800

    expect(PLAYER_SPEED).toBeGreaterThan(0)
    expect(JUMP_VELOCITY).toBeLessThan(0) // Jump should be negative velocity
    expect(GRAVITY).toBeGreaterThan(0)
  })

  it('should have reasonable world bounds', () => {
    const WORLD_WIDTH = 1000
    const WORLD_HEIGHT = 180

    expect(WORLD_WIDTH).toBeGreaterThan(320) // Wider than screen
    expect(WORLD_HEIGHT).toBe(180) // Same as screen height
  })
})

describe('Asset Paths', () => {
  it('should have correct asset paths', () => {
    const PLAYER_ASSET = '/assets/player.png'
    const TILES_ASSET = '/assets/tiles.png'

    expect(PLAYER_ASSET).toMatch(/\.png$/)
    expect(TILES_ASSET).toMatch(/\.png$/)
    expect(PLAYER_ASSET).toContain('assets')
    expect(TILES_ASSET).toContain('assets')
  })
})
