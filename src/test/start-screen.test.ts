import { describe, it, expect, vi } from 'vitest'
import Start from '../scenes/Start'

function createBareStart(): any {
  const start = Object.create(Start.prototype)
  start.titleAnimationState = 0
  start.title = { x: 160, y: 60, setAngle: vi.fn() }
  start.titleShadow = { setPosition: vi.fn() }
  start.scene = { start: vi.fn() }
  return start
}

describe('Transformation hero start screen', () => {
  it('advances a 3D-style title state without changing the title text', () => {
    const start = createBareStart()

    start.advanceTitleAnimation()

    expect(start.titleAnimationState).toBe(1)
    expect(start.titleShadow.setPosition).toHaveBeenCalledWith(165, 65)
    expect(start.title.setAngle).toHaveBeenCalledWith(1)
  })

  it('starts the Play scene from the title screen', () => {
    const start = createBareStart()

    start.startGame()

    expect(start.scene.start).toHaveBeenCalledWith('Play')
  })
})
