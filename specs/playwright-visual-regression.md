---
title: Playwright Visual Regression Testing
status: in-progress
created: 2026-08-08
updated: 2026-08-08
issue: #33
---

# Playwright Visual Regression Testing

## Objective

Add automated Chromium checks for the Phaser canvas so visual regressions in the start screen, game transition, and responsive layout are detected before merge.

## Context

The game currently has Vitest coverage but no browser-level validation. Phaser renders into `#game` as a canvas, so visual assertions must capture the canvas while a small scene marker makes scene transitions observable to E2E tests.

## Requirements

### Functional Requirements

- [x] Playwright starts the Vite server automatically for local and CI runs.
- [x] Desktop and mobile Chromium projects execute the browser suite.
- [x] The start screen has committed visual baselines.
- [x] Pressing a key is verified to transition from `Start` to `Play`.
- [x] CI installs Chromium and runs the browser suite headlessly.
- [x] Generated Playwright result directories are ignored by Git.

### Non-Functional Requirements

- [x] Tests use deterministic viewport/device projects and a 1% maximum pixel-difference tolerance.
- [x] Failed retries retain Playwright traces for diagnosis.
- [x] Browser checks reuse a local server but use a fresh CI server.

## Architecture

### Components

- `playwright.config.ts` — test discovery, browser projects, server lifecycle, retries, and reporters.
- `e2e/start-screen.spec.ts` — canvas visibility, visual baselines, and Start-to-Play interaction.
- `src/scenes/Start.ts` and `src/scenes/Play.ts` — expose the active scene through `#game[data-scene]` for reliable browser assertions.
- `.github/workflows/test.yml` — installs Chromium and runs E2E checks.
- `README.md` — documents browser installation and test commands.

### Data Model

No persistent data or API changes. Visual baselines are PNG artifacts stored under `e2e/*-snapshots/`.

### External Dependencies

- `@playwright/test` `^1.62.1` — browser automation and screenshot assertions.
- Chromium — installed through Playwright for local and CI execution.

## User Stories

See GitHub issue [#33](https://github.com/cuauhtemocbe/pixel-vibe/issues/33).

## Testing Strategy

### Unit Tests

Run the existing Vitest suite with `pnpm test --run` to ensure scene marker changes do not regress gameplay logic.

### Integration Tests

Run `pnpm run typecheck` and `pnpm run build` to validate TypeScript and Vite integration.

### E2E Tests

Run `pnpm test:e2e` across Desktop Chrome and Pixel 5 projects. Update baselines only intentionally with `pnpm test:e2e:update`.

### Performance Tests

Out of scope for this feature; Playwright startup and rendering are validated functionally, not benchmarked.

## Boundaries & Constraints

### In Scope

- Playwright installation and configuration.
- Start screen and initial gameplay visual baselines.
- Desktop/mobile browser projects.
- CI execution and developer documentation.

### Out of Scope

- Full gameplay E2E coverage.
- Asset replacement or visual redesign.
- Accessibility audit of Phaser-rendered canvas content.
- Cross-browser coverage beyond Chromium.

### Technical Constraints

- Use pnpm scripts and Node 26-compatible dependencies.
- Preserve pixel-art rendering and the existing logical resolution.
- Do not rely on Phaser objects being discoverable as DOM nodes.

## Success Criteria

- [x] `pnpm run typecheck` passes.
- [x] `pnpm test --run` passes.
- [x] `pnpm test:e2e` passes all desktop/mobile visual and interaction tests.
- [x] `pnpm run build` passes.
- [ ] Pull request checks pass and issue #33 is closed after merge.

## Implementation Plan

See `specs/playwright-visual-regression-plan.md`.
