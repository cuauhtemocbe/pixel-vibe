---
title: Coyote Time and Jump Buffering
status: approved
created: 2026-08-08
updated: 2026-08-08
issue: #21
---

# Coyote Time and Jump Buffering

## Objective

Make jumping feel responsive by giving the player a short grace window to jump after walking off a ledge (coyote time) and by remembering a jump pressed slightly before landing (jump buffering).

## Context

`Play.update()` only applies jump velocity on the exact frame the player is both grounded and pressing jump: `if (jump && onFloor) { body.setVelocityY(JUMP_VELOCITY); }`. This is unforgiving — a jump pressed one frame too early or too late is silently dropped.

## Requirements

### Functional Requirements

- [ ] Jumping while grounded still works exactly as before
- [ ] A jump pressed within `COYOTE_TIME_MS` of leaving the ground still triggers
- [ ] A jump pressed after the coyote window expires does not trigger
- [ ] A jump pressed while airborne, within `JUMP_BUFFER_MS` of landing, triggers on landing
- [ ] A jump pressed too early (buffer expired before landing) does not trigger

## Architecture

### Components

- `gameConfig.ts` — new `COYOTE_TIME_MS`, `JUMP_BUFFER_MS` constants
- `Play` — new private timer fields (`coyoteTimer`, `jumpBufferTimer`, `wasJumpPressed`), `update()` reworked to decrement/consume them each frame using `dt`

## Testing Strategy

### Unit Tests

`Object.create(Play.prototype)` with `player`, `cursors`, `mobileInput`, `currentCharacter`, `wasTransformPressed` set manually (same pattern as issue #17's tests) — `update()` doesn't touch `this.events`/`this.physics`/`this.cameras`, so no Scene harness is needed. Drive `dt` explicitly per call to simulate elapsed time for the timers.

## Boundaries & Constraints

### In Scope
- The 5 scenarios in issue #21

### Out of Scope
- Any other movement/game-feel change (double jump, variable jump height, etc.)

## Success Criteria

- [ ] All 5 Gherkin scenarios from issue #21 pass
- [ ] `pnpm run typecheck`, `pnpm exec vitest run`, `pnpm run build` green
- [ ] PR merged, CI green, issue #21 closed

## Implementation Plan

See `specs/coyote-time-jump-buffer-plan.md`
