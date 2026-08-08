# Implementation Plan: Mobile Input Listener Cleanup

**Spec**: `specs/mobile-input-listener-cleanup.md`
**Issue**: #17
**Created**: 2026-08-08
**Status**: approved

## Components

### 1. `Play.mobileInputHandler` field + `setupMobileInputListeners()` change
- **Purpose**: Store a stable reference to the handler so it can later be removed
- **Files**: `src/scenes/Play.ts`
- **Effort**: XS

### 2. `Play.removeMobileInputListeners()`
- **Purpose**: Remove the exact listener registered by setup; no-op safe if never set up
- **Files**: `src/scenes/Play.ts`
- **Effort**: XS

### 3. Wire cleanup into scene shutdown
- **Purpose**: Call cleanup automatically when the scene shuts down/restarts
- **Files**: `src/scenes/Play.ts` (`create()`)
- **Effort**: XS

## Dependencies

### Build Order
1. Extract handler reference + setup change (test-first)
2. Add cleanup method (test-first)
3. Wire into `create()` shutdown event (typecheck/build verified)

No external dependencies.

## Risks & Assumptions

### Risks
- **Testing a real Scene lifecycle event is out of reach without a Phaser.Game harness** — mitigated by testing the two extracted methods directly via `Object.create(Play.prototype)`, and covering the `create()` wiring via typecheck/build only.

### Assumptions
- `Object.create(Play.prototype)` + direct private-method invocation is an acceptable test pattern for this codebase (no existing convention to follow/break).

## Milestones

- [ ] Failing tests written for all 4 Gherkin scenarios
- [ ] `Play.ts` changed, tests green
- [ ] `pnpm run typecheck && pnpm test && pnpm run build` all green locally
- [ ] PR open, CI green, merged, issue #17 closed

## Tasks

### Foundation
- [ ] **Task 1**: Write failing tests for setup/cleanup listener behavior
  - **Acceptance**: 4 new tests exist and fail (red) against current `Play.ts`
  - **Files**: `src/test/play-mobile-input-cleanup.test.ts`
  - **Tests**: setup registers one listener; cleanup removes same reference; setup→cleanup→setup→dispatch updates state once; cleanup without setup doesn't throw
  - **Effort**: S

### Features
- [ ] **Task 2**: Implement the fix in `Play.ts`
  - **Acceptance**: All 4 tests pass (green); no other test regresses
  - **Files**: `src/scenes/Play.ts`
  - **Tests**: (covered by Task 1's suite)
  - **Effort**: XS

### Integration
- [ ] **Task 3**: Wire `removeMobileInputListeners` into `this.events.once(Phaser.Scenes.Events.SHUTDOWN, ...)` inside `create()`
  - **Acceptance**: `pnpm run typecheck` and `pnpm run build` pass
  - **Files**: `src/scenes/Play.ts`
  - **Tests**: compile-time only (see spec's Testing Strategy)
  - **Effort**: XS

## Effort Estimate

**Total Estimated Days**: < 0.5 day (XS)

| Phase | Effort |
|-------|--------|
| Foundation (tests) | XS |
| Features (fix) | XS |
| Integration (wiring) | XS |
