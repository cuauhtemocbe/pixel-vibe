import { describe, it, expect, beforeEach, vi } from 'vitest'
import Boot from '@scenes/Boot'

describe('Boot Scene', () => {
  let bootScene: Boot
  let mockLoadImage: any
  let mockSceneStart: any

  beforeEach(() => {
    // Create mocks
    mockLoadImage = vi.fn()
    mockSceneStart = vi.fn()

    // Create scene instance
    bootScene = new Boot()

    // Mock the load and scene properties
    ;(bootScene as any).load = {
      image: mockLoadImage
    }
    ;(bootScene as any).scene = {
      start: mockSceneStart
    }
  })

  describe('constructor', () => {
    it('should create scene with correct key', () => {
      expect(bootScene.scene.key).toBe('Boot')
    })
  })

  describe('preload', () => {
    it('should load player image asset', () => {
      bootScene.preload()
      expect(mockLoadImage).toHaveBeenCalledWith('player', '/assets/player.png')
    })

    it('should load tiles image asset', () => {
      bootScene.preload()
      expect(mockLoadImage).toHaveBeenCalledWith('tiles', '/assets/tiles.png')
    })

    it('should load all required assets', () => {
      bootScene.preload()
      expect(mockLoadImage).toHaveBeenCalledTimes(2)
    })
  })

  describe('create', () => {
    it('should start the Play scene', () => {
      bootScene.create()
      expect(mockSceneStart).toHaveBeenCalledWith('Play')
    })

    it('should transition to Play scene only once', () => {
      bootScene.create()
      expect(mockSceneStart).toHaveBeenCalledTimes(1)
    })
  })
})
