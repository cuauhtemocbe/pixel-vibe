import type Phaser from 'phaser'
import { vi } from 'vitest'

/**
 * Test utilities for Phaser game testing
 */
export class GameTestUtils {
  /**
   * Create a mock Phaser scene for testing
   */
  static createMockScene(sceneName: string = 'TestScene'): Partial<Phaser.Scene> {
    return {
      scene: {
        start: vi.fn(),
        stop: vi.fn(),
        pause: vi.fn(),
        resume: vi.fn(),
        restart: vi.fn(),
        get: vi.fn(),
        getIndex: vi.fn(),
        isActive: vi.fn(() => true),
        isPaused: vi.fn(() => false),
        isVisible: vi.fn(() => true),
        setVisible: vi.fn(),
        sleep: vi.fn(),
        wake: vi.fn()
      } as any,
      add: {
        rectangle: vi.fn(() => ({
          setOrigin: vi.fn(() => ({ setOrigin: vi.fn() }))
        })),
        sprite: vi.fn(() => ({
          setScale: vi.fn(() => ({ setScale: vi.fn() })),
          setCollideWorldBounds: vi.fn(() => ({ setCollideWorldBounds: vi.fn() })),
          setDepth: vi.fn(() => ({ setDepth: vi.fn() })),
          setFlipX: vi.fn(() => ({ setFlipX: vi.fn() }))
        })),
        image: vi.fn(() => ({
          setOrigin: vi.fn(() => ({ setOrigin: vi.fn() }))
        }))
      } as any,
      physics: {
        add: {
          staticGroup: vi.fn(() => ({
            create: vi.fn(() => ({
              setScale: vi.fn(() => ({
                refreshBody: vi.fn()
              }))
            }))
          })),
          sprite: vi.fn(() => ({
            setScale: vi.fn(() => ({
              setCollideWorldBounds: vi.fn(() => ({
                setDepth: vi.fn(() => ({
                  body: {
                    setVelocityX: vi.fn(),
                    setVelocityY: vi.fn(),
                    blocked: { down: false },
                    touching: { down: false }
                  }
                }))
              }))
            }))
          })),
          collider: vi.fn()
        },
        world: {
          setBounds: vi.fn()
        }
      } as any,
      cameras: {
        main: {
          setRoundPixels: vi.fn(),
          startFollow: vi.fn(),
          setBounds: vi.fn()
        }
      } as any,
      input: {
        keyboard: {
          createCursorKeys: vi.fn(() => ({
            left: { isDown: false },
            right: { isDown: false },
            up: { isDown: false },
            down: { isDown: false },
            space: { isDown: false }
          })),
          addKey: vi.fn(() => ({
            isDown: false
          }))
        }
      } as any,
      load: {
        image: vi.fn()
      } as any
    }
  }

  /**
   * Mock a player sprite with physics body
   */
  static createMockPlayer(): any {
    return {
      setScale: vi.fn().mockReturnThis(),
      setCollideWorldBounds: vi.fn().mockReturnThis(),
      setDepth: vi.fn().mockReturnThis(),
      setFlipX: vi.fn().mockReturnThis(),
      body: {
        setVelocityX: vi.fn(),
        setVelocityY: vi.fn(),
        blocked: { down: false },
        touching: { down: false }
      }
    }
  }

  /**
   * Simulate keyboard input
   */
  static simulateKeyPress(cursors: any, key: 'left' | 'right' | 'up' | 'down' | 'space', isDown: boolean = true) {
    if (cursors && cursors[key]) {
      cursors[key].isDown = isDown
    }
  }

  /**
   * Simulate mobile input event
   */
  static simulateMobileInput(key: string, pressed: boolean) {
    const event = new CustomEvent('mobileInput', {
      detail: { action: 'button', key, pressed }
    })
    window.dispatchEvent(event)
  }

  /**
   * Wait for the next frame (useful for async testing)
   */
  static async waitForNextFrame(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 16))
  }
}
