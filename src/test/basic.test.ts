import { describe, it, expect } from 'vitest'
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  GRAVITY_X,
  GRAVITY_Y,
  PLAYER_SPEED,
  JUMP_VELOCITY,
  WORLD_WIDTH,
  WORLD_HEIGHT
} from '../config/gameConfig'

describe('Basic Game Tests', () => {
  it('should pass a simple test', () => {
    expect(1 + 1).toBe(2)
  })

  it('should validate game constants', () => {
    expect(GAME_WIDTH).toBe(320)
    expect(GAME_HEIGHT).toBe(180)
    expect(PLAYER_SPEED).toBeGreaterThan(0)
    expect(JUMP_VELOCITY).toBeLessThan(0)
    expect(GRAVITY_Y).toBeGreaterThan(0)
  })

  it('should validate asset paths format', () => {
    const playerAsset = '/assets/player.png'
    const tilesAsset = '/assets/tiles.png'

    expect(playerAsset).toMatch(/\.png$/)
    expect(tilesAsset).toMatch(/\.png$/)
    expect(playerAsset).toContain('assets')
    expect(tilesAsset).toContain('assets')
  })

  it('should validate physics configuration', () => {
    expect(GRAVITY_X).toBe(0)
    expect(GRAVITY_Y).toBe(800)
  })

  it('should validate world bounds are reasonable', () => {
    expect(WORLD_WIDTH).toBeGreaterThan(GAME_WIDTH)
    expect(WORLD_HEIGHT).toBe(180)
    expect(WORLD_WIDTH / GAME_WIDTH).toBeCloseTo(3.125, 2)
  })
})
