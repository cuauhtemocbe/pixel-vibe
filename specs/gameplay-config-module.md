---
title: Centralized Gameplay Config Module
status: approved
created: 2026-08-08
updated: 2026-08-08
issue: #19
---

# Centralized Gameplay Config Module

## Objective

Replace duplicated numeric literals in `main.ts`, `Play.ts`, and the test suite with a single `src/config/gameConfig.ts` module, so gameplay values have one source of truth.

## Context

`GAME_WIDTH`, `GAME_HEIGHT`, gravity, `PLAYER_SPEED`, `JUMP_VELOCITY`, and world bounds are independently hardcoded in `main.ts`, `Play.ts`, `basic.test.ts` and `game.test.ts`. The tests assert on their own copy of the numbers, not the real values the game uses — a silent-drift risk.

## Requirements

### Functional Requirements

- [ ] `src/config/gameConfig.ts` exports `GAME_WIDTH`, `GAME_HEIGHT`, `GRAVITY_X`, `GRAVITY_Y`, `PLAYER_SPEED`, `JUMP_VELOCITY`, `WORLD_WIDTH`, `WORLD_HEIGHT`
- [ ] `main.ts` builds its `Phaser.Types.Core.GameConfig` from these constants
- [ ] `Play.ts` reads movement speed, jump velocity, and world/camera bounds from these constants
- [ ] `basic.test.ts` / `game.test.ts` import and assert against the real constants instead of local literals

### Non-Functional Requirements

- [ ] No behavior/visual change — identical numeric values before and after

## Architecture

### Components

- `src/config/gameConfig.ts` — new module, plain named exports (no default export, no class)

### External Dependencies

None new.

## Testing Strategy

### Unit Tests

Update `basic.test.ts` and `game.test.ts` to import `gameConfig` and assert against its exported values (replacing the local duplicated literals). This is itself the regression test: if `Play.ts`/`main.ts` ever drift from `gameConfig`, only `gameConfig`'s values matter — there is nothing left to drift against.

## Boundaries & Constraints

### In Scope
- Extracting the constants named in Requirements above

### Out of Scope
- Any new `@config` path alias (relative imports are enough for one file)
- Any gameplay behavior change

## Success Criteria

- [ ] All 4 Gherkin scenarios from issue #19 pass
- [ ] `pnpm run typecheck`, `pnpm exec vitest run`, `pnpm run build` green
- [ ] PR merged, CI green, issue #19 closed

## Implementation Plan

See `specs/gameplay-config-module-plan.md`
