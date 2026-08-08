---
title: Transformation Hero gameplay roadmap
status: in-progress
created: 2026-08-08
updated: 2026-08-08
issues: "#25, #26, #27, #28, #29, #30, #31"
---

# Transformation Hero Gameplay Roadmap

## Objective

Deliver the open gameplay roadmap as one coherent increment: a focused transformation-hero start screen, a forest-and-water level, form-specific movement abilities, simple enemies, scoring, and ambient vegetation.

## Context

The current game has a flat platform, two animated forms, and basic movement. The seven open issues build on one another, so they are implemented together to keep the water, form, enemy, and score rules consistent.

## Requirements

### Functional Requirements

- [x] Show `El héroe de la transformación` on the start screen with an animated 3D-style shadow/offset treatment and no character presentation.
- [x] Render a procedural forest path, a visually distinct water area, and layered vegetation without external assets.
- [x] Give the `dude` form the white-hero double jump; reset capacity on landing and keep it unavailable to `owlet` and `turtle`.
- [x] Give the `turtle` form blue-tinted swimming in water; non-turtle forms are stopped at the water boundary.
- [x] Spawn deterministic patrol enemies; jumping on one defeats it and awards points, while side contact applies knockback.
- [x] Keep a non-negative score in a camera-independent HUD; enemy defeats award 100 points.
- [x] Animate bounded foreground/background vegetation without changing collision geometry.

### Non-Functional Requirements

- TypeScript typecheck, production build, and automated tests pass.
- The level remains playable at the configured 320x180 viewport and through keyboard/mobile input.
- No external visual asset is introduced; existing licensed project assets remain unchanged.

## Architecture

`Start` owns only title presentation and scene transition. `Play` owns the level layout, player state, water rule, enemies, score HUD, and ambient decoration. Gameplay constants remain in `src/config/gameConfig.ts` so rules are testable and discoverable.

## User Stories

Issues #25 through #31 are the source user stories and acceptance criteria.

## Testing Strategy

- Unit tests cover title state, form-specific jump/swim rules, enemy scoring, and constants.
- Scene-level behavior is kept deterministic through fixed water bounds, patrol bounds, and score values.
- Run `pnpm test -- --run`, `pnpm run typecheck`, and `pnpm run build`.

## Boundaries & Constraints

### In Scope

- The seven open issues and their integration.
- Procedural Phaser shapes for forest, water, vegetation, and enemy fallback presentation.

### Out of Scope

- Persistence, leaderboards, health UI, multiple enemy types, procedural world generation, and new downloaded art.

## Success Criteria

- [ ] All seven issues have implementation evidence in the merged PR.
- [ ] Automated tests cover the acceptance-critical form, water, enemy, score, and start-screen rules.
- [ ] Typecheck, build, and test suite pass.
- [ ] Each issue is closed after the PR merges.

## Implementation Plan

See `specs/transformation-hero-roadmap-plan.md`.
