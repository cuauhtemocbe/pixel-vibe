---
title: Mobile Input Listener Cleanup
status: approved
created: 2026-08-08
updated: 2026-08-08
issue: #17
---

# Mobile Input Listener Cleanup

## Objective

Stop the `Play` scene from leaking `window` event listeners: `setupMobileInputListeners()` registers a `mobileInput` listener on every scene start but never removes it, so listeners accumulate across scene restarts.

## Context

`src/scenes/Play.ts` listens for a custom `mobileInput` window event to support on-screen touch controls. The listener is registered in `create()` via `setupMobileInputListeners()` but is never torn down. Currently harmless (writes into `this.mobileInput` are idempotent), but it is a real leak and will silently break any future one-shot-per-event logic (counters, dispatch to other systems).

No existing test instantiates `Play` directly; `src/test/gameTestUtils.ts` ships mock/helper utilities (`createMockScene`, `simulateMobileInput`) that are currently unused.

## Requirements

### Functional Requirements

- [ ] `setupMobileInputListeners()` registers exactly one `mobileInput` listener on `window`
- [ ] A new cleanup method removes the exact listener instance that was registered
- [ ] Cleanup is wired to the Phaser scene shutdown lifecycle (`this.events.once(Phaser.Scenes.Events.SHUTDOWN, ...)`) in `create()`
- [ ] Cleanup is safe to call even if setup never ran (no throw)
- [ ] Repeated setup/cleanup cycles never leave more than one active listener

### Non-Functional Requirements

- [ ] No behavior change to existing mobile control handling (left/right/up/down/jump/transform)

## Architecture

### Components

- `Play.mobileInputHandler` — new private field holding a bound reference to the event handler function (so the same reference can be passed to both `addEventListener` and `removeEventListener`)
- `Play.setupMobileInputListeners()` — existing method, modified to store the handler reference
- `Play.removeMobileInputListeners()` — new private method, mirrors setup, removes the listener
- `Play.create()` — modified to call `this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.removeMobileInputListeners, this)`

### External Dependencies

- Phaser (existing) — `Phaser.Scenes.Events.SHUTDOWN`

## User Stories

See issue #17 (cuauhtemocbe/pixel-vibe) for full Gherkin acceptance criteria.

## Testing Strategy

### Unit Tests

New file `src/test/play-mobile-input-cleanup.test.ts`. Since a fully wired `Phaser.Scene` (with `this.events`, `this.physics`, `this.cameras`) requires a running `Phaser.Game` that this repo has no harness for, tests invoke `setupMobileInputListeners` / `removeMobileInputListeners` directly on `Object.create(Play.prototype)`, spying on `window.addEventListener` / `window.removeEventListener`. This exercises the real production methods without needing full Scene instantiation.

Covers all 4 Gherkin scenarios from issue #17:
1. Setup registers exactly one listener
2. Cleanup removes the same listener reference that was registered
3. Setup → cleanup → setup again → dispatch once → state updated exactly once
4. Cleanup with no prior setup does not throw

### Integration Tests

None needed — the `this.events.once(SHUTDOWN, ...)` wiring in `create()` is verified by `pnpm run typecheck` + `pnpm run build` (compile-time check against Phaser's Scene API), not a runtime test.

## Boundaries & Constraints

### In Scope

- Removing the listener leak in `Play.ts`

### Out of Scope

- Building a full Phaser Scene/Game test harness (separate concern)
- Any other listener/lifecycle cleanup in the codebase

### Technical Constraints

- TypeScript, Vitest, existing `src/test/setup.ts` jsdom/canvas mocks

## Success Criteria

- [ ] All 4 Gherkin scenarios have passing automated tests
- [ ] `pnpm run typecheck`, `pnpm test`, `pnpm run build` all green
- [ ] PR merged to `main`, CI green, issue #17 closed with evidence

## Implementation Plan

See `specs/mobile-input-listener-cleanup-plan.md`
