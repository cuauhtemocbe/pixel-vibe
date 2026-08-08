---
title: Animated Hero Start Screen
status: approved
created: 2026-08-08
updated: 2026-08-08
issue: #23
---

# Animated Hero Start Screen

## Objective

Show a title screen with the hero transforming between its two forms before gameplay starts, instead of dropping the player straight into `Play`.

## Context

`Boot.create()` currently calls `this.scene.start("Play")` directly. `Play.ts` privately owns character animation registration. Introducing a `Start` scene that needs those same animations before `Play` runs means the registration must move somewhere both scenes can rely on.

## Requirements

### Functional Requirements

- [ ] `Boot.create()` starts `"Start"`, not `"Play"`
- [ ] `Start` shows a hero sprite playing its idle animation
- [ ] `Start`'s hero cycles between owlet and dude forms over time
- [ ] Pressing any key on `Start` transitions to `"Play"`
- [ ] Character animations are registered exactly once, shared by `Start` and `Play`

## Architecture

### Components

- `src/animations/characterAnimations.ts` (new) — `createCharacterAnimations(scene: Phaser.Scene)`, extracted from `Play`'s current private method
- `src/scenes/Start.ts` (new) — title text, hero sprite, `toggleHeroForm()`, `startGame()`
- `src/scenes/Boot.ts` — calls the shared animation registration, starts `"Start"`
- `src/scenes/Play.ts` — no longer registers animations itself
- `src/main.ts` — scene array becomes `[Boot, Start, Play]`

## Testing Strategy

### Unit Tests

`toggleHeroForm()` and `startGame()` are tested via `Object.create(Start.prototype)` with a mocked hero sprite (`setTexture`, `play` spies) and a mocked `this.scene.start`, following the same pattern as `Play.transformCharacter` / the issue #17 tests. `create()`'s Phaser wiring (`this.add`, `this.time`, `this.input`, and `Boot`'s call into the shared animation module) is covered by `pnpm run typecheck` + `pnpm run build`, same as the `SHUTDOWN` wiring in issue #17.

## Boundaries & Constraints

### In Scope
- The 4 scenarios in issue #23

### Out of Scope
- Sound, transition animations/fades, a settings/options screen

## Success Criteria

- [ ] All 4 Gherkin scenarios from issue #23 pass
- [ ] `pnpm run typecheck`, `pnpm exec vitest run`, `pnpm run build` green
- [ ] PR merged, CI green, issue #23 closed

## Implementation Plan

See `specs/animated-start-screen-plan.md`
