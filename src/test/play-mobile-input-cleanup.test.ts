import { describe, it, expect, vi, afterEach } from 'vitest'
import Play from '../scenes/Play'

function createBarePlay(): any {
  return Object.create(Play.prototype)
}

describe('Play mobile input listener cleanup', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('registers exactly one mobileInput listener when set up', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    const play = createBarePlay()

    play.setupMobileInputListeners()

    const mobileInputCalls = addSpy.mock.calls.filter(([type]) => type === 'mobileInput')
    expect(mobileInputCalls).toHaveLength(1)

    play.removeMobileInputListeners()
  })

  it('removes the exact listener instance that was registered', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const play = createBarePlay()

    play.setupMobileInputListeners()
    const [, registeredHandler] = addSpy.mock.calls.find(([type]) => type === 'mobileInput')!

    play.removeMobileInputListeners()

    expect(removeSpy).toHaveBeenCalledWith('mobileInput', registeredHandler)
  })

  it('never leaves more than one active listener across a restart cycle', () => {
    const play = createBarePlay()
    play.mobileInput = { left: false, right: false, up: false, down: false, jump: false, transform: false }

    play.setupMobileInputListeners()
    play.removeMobileInputListeners()
    play.setupMobileInputListeners()

    window.dispatchEvent(new CustomEvent('mobileInput', { detail: { key: 'ArrowLeft', pressed: true } }))

    expect(play.mobileInput.left).toBe(true)

    play.removeMobileInputListeners()
  })

  it('does not throw when cleanup runs without a prior setup', () => {
    const play = createBarePlay()

    expect(() => play.removeMobileInputListeners()).not.toThrow()
  })
})
