import { describe, it, expect, vi } from 'vitest'
import Start from '../scenes/Start'

function createBareStart(): any {
  const start = Object.create(Start.prototype)
  start.currentForm = 'owlet'
  start.hero = {
    setTexture: vi.fn(),
    play: vi.fn()
  }
  start.scene = {
    start: vi.fn()
  }
  return start
}

describe('Start screen hero transformation', () => {
  it('switches the hero from owlet to dude on the first toggle', () => {
    const start = createBareStart()

    start.toggleHeroForm()

    expect(start.currentForm).toBe('dude')
    expect(start.hero.setTexture).toHaveBeenCalledWith('dude_idle', 0)
    expect(start.hero.play).toHaveBeenCalledWith('dude_idle')
  })

  it('switches back to owlet on the next toggle', () => {
    const start = createBareStart()

    start.toggleHeroForm()
    start.toggleHeroForm()

    expect(start.currentForm).toBe('owlet')
    expect(start.hero.setTexture).toHaveBeenLastCalledWith('owlet_idle', 0)
    expect(start.hero.play).toHaveBeenLastCalledWith('owlet_idle')
  })
})

describe('Start screen begins the game', () => {
  it('starts the Play scene when startGame is called', () => {
    const start = createBareStart()

    start.startGame()

    expect(start.scene.start).toHaveBeenCalledWith('Play')
  })

  it('only starts the Play scene, never any other scene', () => {
    const start = createBareStart()

    start.startGame()

    expect(start.scene.start).toHaveBeenCalledTimes(1)
    expect(start.scene.start).not.toHaveBeenCalledWith('Start')
    expect(start.scene.start).not.toHaveBeenCalledWith('Boot')
  })
})
