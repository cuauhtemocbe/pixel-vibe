import { describe, it, expect, beforeEach, vi } from 'vitest'
import Play from '@scenes/Play'
import { GameTestUtils } from '../gameTestUtils'

describe('Play Scene', () => {
  let playScene: Play
  let mockPlayer: any
  let mockCursors: any
  let mockSpaceKey: any

  beforeEach(() => {
    // Create scene instance
    playScene = new Play()

    // Create mock player
    mockPlayer = GameTestUtils.createMockPlayer()

    // Create mock cursors
    mockCursors = {
      left: { isDown: false },
      right: { isDown: false },
      up: { isDown: false },
      down: { isDown: false },
      space: { isDown: false }
    }

    mockSpaceKey = { isDown: false }

    // Mock scene properties
    const mockScene = GameTestUtils.createMockScene('Play')
    Object.assign(playScene, mockScene)

    // Set up player and input mocks
    ;(playScene as any).player = mockPlayer
    ;(playScene as any).cursors = mockCursors
    ;(playScene as any).spaceKey = mockSpaceKey
    ;(playScene as any).mobileInput = {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false
    }

    // Mock window.addEventListener for mobile input
    window.addEventListener = vi.fn()
  })

  describe('constructor', () => {
    it('should create scene with correct key', () => {
      expect(playScene.scene.key).toBe('Play')
    })
  })

  describe('player movement', () => {
    beforeEach(() => {
      // Ensure player has a physics body
      mockPlayer.body = {
        setVelocityX: vi.fn(),
        setVelocityY: vi.fn(),
        blocked: { down: true },
        touching: { down: false }
      }
    })

    it('should move player left when left key is pressed', () => {
      // Simulate left key press
      GameTestUtils.simulateKeyPress(mockCursors, 'left', true)
      GameTestUtils.simulateKeyPress(mockCursors, 'right', false)

      // Call update method
      playScene.update(0, 16)

      // Check if player moves left
      expect(mockPlayer.body.setVelocityX).toHaveBeenCalledWith(-90)
      expect(mockPlayer.setFlipX).toHaveBeenCalledWith(true)
    })

    it('should move player right when right key is pressed', () => {
      // Simulate right key press
      GameTestUtils.simulateKeyPress(mockCursors, 'right', true)
      GameTestUtils.simulateKeyPress(mockCursors, 'left', false)

      // Call update method
      playScene.update(0, 16)

      // Check if player moves right
      expect(mockPlayer.body.setVelocityX).toHaveBeenCalledWith(90)
      expect(mockPlayer.setFlipX).toHaveBeenCalledWith(false)
    })

    it('should stop player when no movement keys are pressed', () => {
      // Ensure no keys are pressed
      GameTestUtils.simulateKeyPress(mockCursors, 'left', false)
      GameTestUtils.simulateKeyPress(mockCursors, 'right', false)

      // Call update method
      playScene.update(0, 16)

      // Check if player stops
      expect(mockPlayer.body.setVelocityX).toHaveBeenCalledWith(0)
    })

    it('should make player jump when jump key is pressed and on floor', () => {
      // Set player on floor
      mockPlayer.body.blocked.down = true

      // Simulate jump key press
      GameTestUtils.simulateKeyPress(mockCursors, 'up', true)

      // Call update method
      playScene.update(0, 16)

      // Check if player jumps
      expect(mockPlayer.body.setVelocityY).toHaveBeenCalledWith(-220)
    })

    it('should not jump when not on floor', () => {
      // Set player in air
      mockPlayer.body.blocked.down = false
      mockPlayer.body.touching.down = false

      // Simulate jump key press
      GameTestUtils.simulateKeyPress(mockCursors, 'up', true)

      // Call update method
      playScene.update(0, 16)

      // Check that jump velocity is not set
      expect(mockPlayer.body.setVelocityY).not.toHaveBeenCalledWith(-220)
    })

    it('should handle space key for jumping', () => {
      // Set player on floor
      mockPlayer.body.blocked.down = true

      // Simulate space key press
      mockSpaceKey.isDown = true

      // Call update method
      playScene.update(0, 16)

      // Check if player jumps
      expect(mockPlayer.body.setVelocityY).toHaveBeenCalledWith(-220)
    })
  })

  describe('mobile input', () => {
    beforeEach(() => {
      // Ensure player has a physics body
      mockPlayer.body = {
        setVelocityX: vi.fn(),
        setVelocityY: vi.fn(),
        blocked: { down: true },
        touching: { down: false }
      }
    })

    it('should respond to mobile left input', () => {
      // Simulate mobile left input
      ;(playScene as any).mobileInput.left = true
      ;(playScene as any).mobileInput.right = false

      // Call update method
      playScene.update(0, 16)

      // Check if player moves left
      expect(mockPlayer.body.setVelocityX).toHaveBeenCalledWith(-90)
      expect(mockPlayer.setFlipX).toHaveBeenCalledWith(true)
    })

    it('should respond to mobile right input', () => {
      // Simulate mobile right input
      ;(playScene as any).mobileInput.right = true
      ;(playScene as any).mobileInput.left = false

      // Call update method
      playScene.update(0, 16)

      // Check if player moves right
      expect(mockPlayer.body.setVelocityX).toHaveBeenCalledWith(90)
      expect(mockPlayer.setFlipX).toHaveBeenCalledWith(false)
    })

    it('should respond to mobile jump input', () => {
      // Set player on floor
      mockPlayer.body.blocked.down = true

      // Simulate mobile jump input
      ;(playScene as any).mobileInput.jump = true

      // Call update method
      playScene.update(0, 16)

      // Check if player jumps
      expect(mockPlayer.body.setVelocityY).toHaveBeenCalledWith(-220)
    })
  })

  describe('input combination', () => {
    beforeEach(() => {
      // Ensure player has a physics body
      mockPlayer.body = {
        setVelocityX: vi.fn(),
        setVelocityY: vi.fn(),
        blocked: { down: true },
        touching: { down: false }
      }
    })

    it('should handle keyboard and mobile input together (keyboard priority)', () => {
      // Both keyboard and mobile left
      GameTestUtils.simulateKeyPress(mockCursors, 'left', true)
      ;(playScene as any).mobileInput.right = true // conflicting mobile input

      // Call update method
      playScene.update(0, 16)

      // Should move left (keyboard + mobile left = left)
      expect(mockPlayer.body.setVelocityX).toHaveBeenCalledWith(-90)
    })

    it('should stop when both left and right are pressed', () => {
      // Press both left and right
      GameTestUtils.simulateKeyPress(mockCursors, 'left', true)
      GameTestUtils.simulateKeyPress(mockCursors, 'right', true)

      // Call update method
      playScene.update(0, 16)

      // Should stop moving
      expect(mockPlayer.body.setVelocityX).toHaveBeenCalledWith(0)
    })
  })
})
