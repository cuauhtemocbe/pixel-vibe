# Implementation Plan: Transformation Hero Gameplay Roadmap

**Spec**: `specs/transformation-hero-roadmap.md`  
**Created**: 2026-08-08  
**Status**: completed

## Components

### 1. Start screen redesign
- **Files**: `src/scenes/Start.ts`, `src/test/start-screen.test.ts`
- **Effort**: S

### 2. Gameplay world and form rules
- **Files**: `src/config/gameConfig.ts`, `src/scenes/Play.ts`, tests
- **Effort**: L

### 3. Enemy, score, and ambient presentation
- **Files**: `src/scenes/Play.ts`, `docs/assets.md`, tests
- **Effort**: M

## Dependencies

1. Constants and start-screen state.
2. Forest/water layout and form movement.
3. Enemy collisions and score events.
4. Vegetation animation and final verification.

## Risks & Assumptions

- Existing sprite sheets do not include a turtle. The `turtle` form uses the existing sprite as a blue-tinted fallback, avoiding an unverified external asset.
- Phaser scene integration is difficult to execute in jsdom, so pure rule helpers and observable scene state receive unit coverage.
- The water floor remains safe solid geometry; swimming changes gravity and movement rather than requiring a separate physics world.

## Tasks

- [x] Create the consolidated spec and plan.
- [x] Replace the start screen character cycle with the animated title.
- [x] Add forest, water, vegetation, form-specific movement, and enemy interactions.
- [x] Add score HUD and rule tests.
- [x] Verify, commit, open PR #32, merge, and close #25-#31.

## Effort Estimate

Total: 1 implementation increment, approximately 1 day of focused work.
