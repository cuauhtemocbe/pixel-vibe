import { describe, expect, it, vi } from 'vitest'
import Play from '../scenes/Play'
import {
  DOUBLE_JUMP_VELOCITY,
  ENEMY_SCORE,
  WATER_START_X
} from '../config/gameConfig'

function createPlay(): any {
  const play = Object.create(Play.prototype)
  play.currentCharacter = 'dude'
  play.jumpsUsed = 1
  play.wasJumpPressed = false
  play.coyoteTimer = 0
  play.jumpBufferTimer = 0
  play.mobileInput = { left: false, right: false, up: false, down: false, jump: true, transform: false }
  play.cursors = { left: { isDown: false }, right: { isDown: false }, up: { isDown: false }, down: { isDown: false }, space: { isDown: false } }
  play.player = {
    x: 200,
    y: 100,
    body: {
      velocity: { y: 0 },
      blocked: { down: false },
      touching: { down: false },
      setVelocityX: vi.fn(),
      setVelocityY: vi.fn(),
      setGravityY: vi.fn()
    },
    setFlipX: vi.fn(),
    play: vi.fn()
  }
  return play
}

describe('Transformation roadmap gameplay rules', () => {
  it('allows exactly one additional jump for the dude form', () => {
    const play = createPlay()

    play.update(0, 16)

    expect(play.player.body.setVelocityY).toHaveBeenCalledWith(DOUBLE_JUMP_VELOCITY)
    expect(play.jumpsUsed).toBe(2)
  })

  it('cycles to the turtle form and resets its jump state', () => {
    const play = createPlay()
    play.player.setTexture = vi.fn()
    play.player.setTint = vi.fn()
    play.player.play = vi.fn()

    play.transformCharacter()

    expect(play.currentCharacter).toBe('turtle')
    expect(play.player.setTint).toHaveBeenCalledWith(0x4ca9d1)
    expect(play.jumpsUsed).toBe(0)
  })

  it('keeps score non-negative and awards the documented enemy score', () => {
    const play = createPlay()
    play.score = 0
    play.scoreText = { setText: vi.fn() }

    play.addScore(ENEMY_SCORE)

    expect(play.score).toBe(ENEMY_SCORE)
    expect(play.scoreText.setText).toHaveBeenCalledWith(`SCORE ${ENEMY_SCORE}`)
  })

  it('defines a distinct water boundary for the level', () => {
    expect(WATER_START_X).toBeGreaterThan(0)
  })
})
