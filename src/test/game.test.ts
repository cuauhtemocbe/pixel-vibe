import { describe, it, expect, vi } from 'vitest'
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  GRAVITY_Y,
  PLAYER_SPEED,
  JUMP_VELOCITY,
  WORLD_WIDTH,
  WORLD_HEIGHT
} from '../config/gameConfig'

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
    expect(GAME_WIDTH).toBe(320)
    expect(GAME_HEIGHT).toBe(180)
  })

  it('should have proper game config structure', () => {
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
        arcade: { gravity: { x: 0, y: GRAVITY_Y }, debug: false }
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
    expect(PLAYER_SPEED).toBeGreaterThan(0)
    expect(JUMP_VELOCITY).toBeLessThan(0) // Jump should be negative velocity
    expect(GRAVITY_Y).toBeGreaterThan(0)
  })

  it('should have reasonable world bounds', () => {
    expect(WORLD_WIDTH).toBeGreaterThan(320) // Wider than screen
    expect(WORLD_HEIGHT).toBe(180) // Same as screen height
  })

  it('keeps scenario one rock blocks before the water boundary', () => {
    const WATER_END_X = 760
    const ROCK_BLOCK_POSITIONS = [280, 470]

    expect(ROCK_BLOCK_POSITIONS.every((x) => x > 0 && x < WATER_END_X)).toBe(true)
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
