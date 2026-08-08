import { describe, it, expect, vi } from 'vitest'
import Play from '../scenes/Play'
import { JUMP_VELOCITY } from '../config/gameConfig'

function createBarePlay(startOnFloor: boolean): any {
  const play = Object.create(Play.prototype)
  play.currentCharacter = 'owlet'
  play.wasTransformPressed = false
  play.coyoteTimer = 0
  play.jumpBufferTimer = 0
  play.wasJumpPressed = false
  play.mobileInput = { left: false, right: false, up: false, down: false, jump: false, transform: false }
  play.player = {
    body: {
      setVelocityX: vi.fn(),
      setVelocityY: vi.fn(),
      blocked: { down: startOnFloor },
      touching: { down: false }
    },
    setFlipX: vi.fn(),
    play: vi.fn()
  }
  return play
}

describe('Play coyote time and jump buffering', () => {
  it('jumps immediately while standing on the ground', () => {
    const play = createBarePlay(true)

    play.mobileInput.jump = true
    play.update(0, 16)

    expect(play.player.body.setVelocityY).toHaveBeenCalledWith(JUMP_VELOCITY)
  })

  it('still jumps shortly after walking off a ledge (coyote time)', () => {
    const play = createBarePlay(true)
    play.update(0, 16) // grounded frame, fills coyote timer

    play.player.body.blocked.down = false // walks off the ledge
    play.update(0, 16) // airborne, well within the coyote window

    play.mobileInput.jump = true
    play.update(0, 16)

    expect(play.player.body.setVelocityY).toHaveBeenCalledWith(JUMP_VELOCITY)
  })

  it('does not jump once the coyote time window has expired', () => {
    const play = createBarePlay(true)
    play.update(0, 16) // grounded frame, fills coyote timer

    play.player.body.blocked.down = false
    play.update(0, 200) // airborne long enough to exceed the coyote window

    play.mobileInput.jump = true
    play.update(0, 16)

    expect(play.player.body.setVelocityY).not.toHaveBeenCalled()
  })

  it('jumps immediately on landing if jump was pressed just before landing (jump buffer)', () => {
    const play = createBarePlay(false) // airborne

    play.mobileInput.jump = true
    play.update(0, 16) // pressed while still airborne, does not jump yet
    expect(play.player.body.setVelocityY).not.toHaveBeenCalled()

    play.mobileInput.jump = false
    play.player.body.blocked.down = true // lands
    play.update(0, 16)

    expect(play.player.body.setVelocityY).toHaveBeenCalledWith(JUMP_VELOCITY)
  })

  it('does not remember a jump press that happened too long before landing', () => {
    const play = createBarePlay(false) // airborne

    play.mobileInput.jump = true
    play.update(0, 16) // pressed while airborne
    play.mobileInput.jump = false
    play.update(0, 500) // still airborne, jump buffer window expires

    play.player.body.blocked.down = true // lands after the buffer expired
    play.update(0, 16)

    expect(play.player.body.setVelocityY).not.toHaveBeenCalled()
  })
})
