---
title: Free Asset Pack Evaluation and Start Screen Background Preview
status: completed
created: 2026-08-08
updated: 2026-08-08
issue: #34
---

# Free Asset Pack Evaluation and Start Screen Background Preview

## Objective

Evaluate a small set of free pixel-art asset packs in a disposable Phaser prototype and use the selected visual direction to preview a new background for the game's start screen. The spike must produce enough evidence to choose a direction without replacing production gameplay assets before that decision is approved.

## Context

The game currently renders at a logical resolution of `320x180` and has a production `Start` scene with a programmatically drawn sky, clouds, mountains, trees, ground, title, menu, and animated hero. Playwright already captures desktop and mobile screenshots of the production start screen.

The spike evaluates these candidate sources:

- [Pixel Adventure by Pixel Frog](https://pixelfrog-assets.itch.io/pixel-adventure-1) — reported CC0.
- [SunnyLand by Ansimuz](https://ansimuz.itch.io/sunny-land-pixel-game-art) — reported CC0 base pack with optional paid extras.
- [Kenney Pixel Platformer](https://kenney.nl/assets/pixel-platformer) — CC0, 18x18 tiles.

The current production scene and gameplay must remain usable while the candidates are compared. The start-screen background preview belongs to the isolated spike prototype; it is not an approval to replace the production `Start` scene or gameplay assets. The first gameplay scenario to evaluate is a forest with solid rock blocks the character can jump over and a water section the swimming form can traverse.

## Requirements

### Functional Requirements

- [x] The spike provides an isolated Phaser evaluation view at the existing `320x180` logical resolution.
- [x] Each candidate is evaluated using the same record: license, attribution, dimensions, animation coverage, visual consistency, Phaser integration effort, and fit for the transformation theme.
- [x] The evaluation view demonstrates at least one environment tile, character, hazard or enemy, and prop or collectible for a selected candidate without broken textures.
- [x] The evaluation view demonstrates the scenario 1 composition: forest backdrop, solid rock blocks positioned as jumpable obstacles, and a water lane representing the swimming area.
- [x] The evaluation view includes a start-screen background preview using the selected visual direction.
- [x] The preview preserves the existing start-screen title, menu, prompt, and start-to-play interaction semantics.
- [x] Production gameplay assets and scene behavior are not replaced as part of the spike.
- [x] The spike records an explicit recommendation and identifies assets to adopt, defer, or reject.
- [x] License and attribution obligations are recorded for the recommendation.
- [x] The selected environment candidate is validated against real forest tiles, jumpable rock blocks, and water assets; the existing swimming visual is explicitly retained because no replacement was verified.

### Non-Functional Requirements

- [x] Pixel-art rendering remains crisp, with no unintended smoothing or distortion.
- [x] The logical `320x180` composition remains readable in desktop and Pixel 5 browser projects.
- [x] The evaluation view is disposable and does not introduce persistent data or runtime services.
- [x] The implementation passes the existing typecheck, build, unit tests, and Playwright visual checks.

## Architecture

### Components

- `src/scenes/AssetSpike.ts` — isolated evaluation scene for candidate assets and the start-screen background preview.
- `src/scenes/Boot.ts` or spike-specific preload path — loads only assets needed by the selected evaluation candidate without changing production gameplay loading behavior.
- `src/scenes/Start.ts` — production reference whose title, menu, prompt, and transition semantics the preview must preserve; no production replacement is required in this spike.
- `e2e/asset-spike.spec.ts` — browser checks for the isolated view, candidate rendering, and desktop/mobile screenshots.
- `docs/` or `specs/` evaluation record — comparison matrix, recommendation, and license/attribution notes.
- `e2e/*-snapshots/` — committed visual evidence for the preview at desktop and mobile sizes.

### Data Model

No application data model, API, or persistence changes. The evaluation record is documentation and image artifacts only.

### External Dependencies

- Phaser `^4.2.1` — rendering and scene lifecycle.
- Playwright `^1.62.1` — automated browser screenshots and interaction checks.
- Candidate asset packs — evaluated inputs; final license terms must be verified from their source pages and included in the record.

## User Stories

See [GitHub issue #34](https://github.com/cuauhtemocbe/pixel-vibe/issues/34).

```gherkin
Feature: Free asset pack evaluation and start screen background preview

  Scenario: Candidate packs are compared using the same criteria
    Given the candidate asset packs are available for evaluation
    When the developer reviews the comparison record
    Then every candidate has license, attribution, dimensions, animation coverage, visual fit, and integration effort documented

  Scenario: A selected candidate renders in the isolated evaluation view
    Given a candidate asset pack is selected for technical evaluation
    When the developer opens the evaluation view at 320x180
    Then an environment tile, character, hazard or enemy, and prop or collectible render without broken textures

  Scenario: Scenario 1 environment assets cover the required traversal affordances
    Given the isolated evaluation view is running with a selected candidate
    When the developer inspects the forest scenario strip
    Then it shows a forest backdrop
    And solid rock blocks are visibly positioned as obstacles the character can jump over
    And a water lane is visibly identified as the area for the swimming form

  Scenario: The selected direction previews a new start screen background
    Given the isolated evaluation view is running with the selected direction
    When the developer opens its start-screen preview
    Then the preview uses the evaluated background direction
    And the title, menu, prompt, and start interaction remain readable and usable

  Scenario: The preview remains consistent across viewport sizes
    Given the isolated evaluation view is running
    When the developer captures desktop and mobile-sized views
    Then the screenshots show crisp pixel art, correct scaling, and no unintended smoothing or distortion

  Scenario: The spike ends with an explicit recommendation
    Given the comparison record and preview screenshots are available
    When the developer concludes the spike
    Then the documentation recommends one primary asset direction
    And lists assets to adopt, defer, or reject
    And records all attribution or license obligations
```

## Testing Strategy

### Unit Tests

Test pure comparison or asset-selection helpers if introduced. Run the existing Vitest suite with `pnpm test --run` to protect current scene and gameplay behavior.

### Integration Tests

Run `pnpm run typecheck` and `pnpm run build`. Verify the isolated scene can be registered and loaded without changing the production `Boot -> Start -> Play` flow.

### E2E Tests

Add Playwright coverage for the isolated evaluation view, selected asset rendering, start-screen preview readability, and desktop/mobile screenshots. Run `pnpm test:e2e` with the existing Chromium projects. Update snapshots only after intentional visual review.

### Performance Tests

Out of scope for this time-boxed spike. Browser startup and rendering must remain functional, but no load benchmark is required.

## Boundaries & Constraints

### In Scope

- Time-boxed comparison of the three candidate asset sources.
- A disposable Phaser evaluation view.
- A new start-screen background preview based on the evaluated direction.
- Desktop and mobile visual evidence.
- License, attribution, and recommendation documentation.

### Out of Scope

- Replacing production player, enemy, level, or `Start` scene assets.
- Redesigning the full game UI or start-screen interaction model.
- Full gameplay E2E coverage.
- Audio, accessibility auditing of canvas content, and non-Chromium browser coverage.
- Buying paid assets or integrating optional paid pack content.

### Technical Constraints

- Preserve the existing `320x180` logical resolution and pixel-art rendering.
- Keep the production `Boot -> Start -> Play` flow unchanged until the visual direction is approved.
- Do not add persistent data, backend services, or a runtime asset-selection system.
- Use repository scripts and existing TypeScript, Phaser, Vitest, and Playwright conventions.
- Verify current license and attribution terms before recording a recommendation; do not assume a pack's license from a third-party summary alone.

## Success Criteria

- [x] A comparison record evaluates all three candidates against the same seven criteria.
- [x] The isolated evaluation view renders the selected candidate's required sample assets without broken textures.
- [x] The isolated evaluation view shows the scenario 1 forest, jumpable rock blocks, and swimmable water composition.
- [x] The start-screen background preview is visible at `320x180` and preserves title, menu, prompt, and start interaction readability.
- [x] Desktop and mobile Playwright screenshots are committed and reviewed with no unintended smoothing or distortion.
- [x] `pnpm run typecheck`, `pnpm test --run`, `pnpm run build`, and `pnpm test:e2e` pass.
- [x] The record contains one recommendation plus adopt/defer/reject decisions and documented license obligations, including the Pixel Frog verification gap.
- [x] The selected environment candidate's real scenario 1 asset files are validated for forest, solid rock blocks, and water coverage, with the existing Dude swimming assets retained.
- [x] Production gameplay behavior and assets remain unchanged by the spike.

## Implementation Plan

See `specs/free-asset-pack-spike-plan.md`.
