# Implementation Plan: Centralized Gameplay Config Module

**Spec**: `specs/gameplay-config-module.md`
**Issue**: #19
**Created**: 2026-08-08
**Status**: approved

## Components

### 1. `src/config/gameConfig.ts`
- **Purpose**: Single source of truth for gameplay constants
- **Files**: `src/config/gameConfig.ts` (new)
- **Effort**: XS

### 2. `main.ts` wiring
- **Purpose**: Build Phaser game config from `gameConfig`
- **Files**: `src/main.ts`
- **Effort**: XS

### 3. `Play.ts` wiring
- **Purpose**: Use `gameConfig` for speed, jump velocity, world/camera bounds
- **Files**: `src/scenes/Play.ts`
- **Effort**: XS

### 4. Test suite de-duplication
- **Purpose**: Assert against real exported constants
- **Files**: `src/test/basic.test.ts`, `src/test/game.test.ts`
- **Effort**: XS

## Dependencies

### Build Order
1. Create `gameConfig.ts` (foundation)
2. Update tests to import it (red until 2-3 land, since values must still match)
3. Wire `main.ts` and `Play.ts` to import it
4. Confirm full suite green

No external dependencies.

## Risks & Assumptions

### Risks
- None significant — pure extraction of already-known literal values.

### Assumptions
- Ground/camera/world-bound numbers in `Play.ts` (`1000`, `180`) are exactly `WORLD_WIDTH`/`WORLD_HEIGHT` and not incidentally different values that only look the same — confirmed by reading `Play.ts` `create()` before editing.

## Milestones

- [ ] `gameConfig.ts` created with all constants
- [ ] Tests updated to import it, suite green
- [ ] `main.ts` and `Play.ts` wired, suite still green, build green
- [ ] PR merged, issue #19 closed

## Tasks

### Foundation
- [ ] **Task 1**: Create `src/config/gameConfig.ts`
  - **Acceptance**: exports match issue #19 scenario 1
  - **Files**: `src/config/gameConfig.ts`
  - **Tests**: covered by Task 2
  - **Effort**: XS

### Features
- [ ] **Task 2**: Update `basic.test.ts`/`game.test.ts` to import `gameConfig`
  - **Acceptance**: tests pass against real exported values
  - **Files**: `src/test/basic.test.ts`, `src/test/game.test.ts`
  - **Tests**: existing suites, updated
  - **Effort**: XS

### Integration
- [ ] **Task 3**: Wire `main.ts` and `Play.ts` to `gameConfig`
  - **Acceptance**: `pnpm run typecheck`, `pnpm exec vitest run`, `pnpm run build` all green; no value changes
  - **Files**: `src/main.ts`, `src/scenes/Play.ts`
  - **Tests**: full suite must stay green
  - **Effort**: XS

## Effort Estimate

**Total Estimated Days**: < 0.5 day (S)
