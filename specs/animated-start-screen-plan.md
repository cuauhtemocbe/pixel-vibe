# Implementation Plan: Animated Hero Start Screen

**Spec**: `specs/animated-start-screen.md`
**Issue**: #23
**Created**: 2026-08-08
**Status**: approved

## Components

### 1. `src/animations/characterAnimations.ts`
- **Purpose**: Extract the existing 6-animation registration out of `Play` into a shared function
- **Files**: `src/animations/characterAnimations.ts` (new), `src/scenes/Play.ts` (remove `createCharacterAnimations`, remove its call)
- **Effort**: XS

### 2. `Boot.ts` wiring
- **Purpose**: Register animations, then start `"Start"` instead of `"Play"`
- **Files**: `src/scenes/Boot.ts`
- **Effort**: XS

### 3. `src/scenes/Start.ts`
- **Purpose**: Title + hero sprite + transformation cycle + start-on-keypress
- **Files**: `src/scenes/Start.ts` (new)
- **Effort**: S

### 4. `main.ts` scene registration
- **Purpose**: Add `Start` to the scene list
- **Files**: `src/main.ts`
- **Effort**: XS

## Dependencies

### Build Order
1. Extract `createCharacterAnimations` (foundation — `Play` must keep working)
2. Wire `Boot` to call it + start `"Start"`
3. Build `Start` scene (`toggleHeroForm`, `startGame`, `create()` wiring)
4. Register `Start` in `main.ts`

No external dependencies.

## Risks & Assumptions

### Risks
- None significant. Phaser's `AnimationManager` is confirmed game-wide (not per-scene), so moving registration to `Boot` is safe.

### Assumptions
- `Boot` always runs first in every real game flow (true today: `main.ts`'s scene array starts with `Boot`, and `Boot.create()` is the only place that calls `scene.start("Start")`).

## Milestones

- [ ] `createCharacterAnimations` extracted, `Play` still passes all existing tests
- [ ] `Start` scene built with `toggleHeroForm`/`startGame` tested
- [ ] Full suite + typecheck + build green
- [ ] PR merged, issue #23 closed

## Tasks

### Foundation
- [ ] **Task 1**: Extract `createCharacterAnimations(scene)` to `src/animations/characterAnimations.ts`, update `Play.ts` to stop registering them itself
  - **Acceptance**: existing Play tests still pass, `Play.ts` has no animation-registration code left
  - **Files**: `src/animations/characterAnimations.ts`, `src/scenes/Play.ts`
  - **Effort**: XS

### Features
- [ ] **Task 2**: Write failing tests for `toggleHeroForm()` and `startGame()`
  - **Acceptance**: tests exist, fail (class doesn't exist yet)
  - **Files**: `src/test/start-screen.test.ts`
  - **Effort**: S

- [ ] **Task 3**: Implement `Start.ts` (`create()`, `toggleHeroForm()`, `startGame()`), wire `Boot.ts` and `main.ts`
  - **Acceptance**: all new tests pass, full suite green, build green
  - **Files**: `src/scenes/Start.ts`, `src/scenes/Boot.ts`, `src/main.ts`
  - **Effort**: S

## Effort Estimate

**Total Estimated Days**: < 1 day (S)
