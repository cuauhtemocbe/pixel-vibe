# Implementation Plan: Coyote Time and Jump Buffering

**Spec**: `specs/coyote-time-jump-buffer.md`
**Issue**: #21
**Created**: 2026-08-08
**Status**: approved

## Components

### 1. New timing constants
- **Purpose**: `COYOTE_TIME_MS`, `JUMP_BUFFER_MS` in `gameConfig.ts`
- **Files**: `src/config/gameConfig.ts`
- **Effort**: XS

### 2. Timer state + jump logic rework
- **Purpose**: Track coyote/buffer timers and jump-press edge, replace the single-frame jump check
- **Files**: `src/scenes/Play.ts`
- **Effort**: S

## Dependencies

### Build Order
1. Add constants
2. Write failing tests for all 5 scenarios
3. Implement timer fields + reworked jump check in `update()`

No external dependencies.

## Risks & Assumptions

### Risks
- None significant — self-contained state machine, no physics engine internals involved beyond the existing `setVelocityY` call.

### Assumptions
- `dt` passed to `update()` is milliseconds (Phaser's default) — confirmed by the existing unused `dt: number` parameter name/convention.

## Milestones

- [ ] Failing tests for all 5 scenarios
- [ ] Implementation green
- [ ] Full suite + typecheck + build green
- [ ] PR merged, issue #21 closed

## Tasks

### Foundation
- [ ] **Task 1**: Add `COYOTE_TIME_MS`, `JUMP_BUFFER_MS` to `gameConfig.ts`
  - **Acceptance**: exported, reasonable small values (~100ms each)
  - **Files**: `src/config/gameConfig.ts`
  - **Effort**: XS

### Features
- [ ] **Task 2**: Write failing tests for all 5 Gherkin scenarios
  - **Acceptance**: 5 tests exist, fail against current `Play.ts`
  - **Files**: `src/test/play-coyote-jump-buffer.test.ts`
  - **Effort**: S

- [ ] **Task 3**: Implement timer state + reworked jump check
  - **Acceptance**: all 5 tests pass, no other test regresses
  - **Files**: `src/scenes/Play.ts`
  - **Effort**: S

## Effort Estimate

**Total Estimated Days**: < 1 day (S)
