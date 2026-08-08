# Implementation Plan: Playwright Visual Regression Testing

**Spec**: `specs/playwright-visual-regression.md`
**Created**: 2026-08-08
**Status**: in-progress

## Components

### 1. Browser Test Foundation

- **Purpose**: Install Playwright and manage Vite server/browser projects.
- **Files**: `package.json`, `pnpm-lock.yaml`, `playwright.config.ts`, `.gitignore`
- **Effort**: S

### 2. Canvas Visual And Interaction Tests

- **Purpose**: Validate start-screen snapshots, responsive rendering, and Start-to-Play transition.
- **Files**: `e2e/start-screen.spec.ts`, `e2e/*-snapshots/*.png`, `src/scenes/Start.ts`, `src/scenes/Play.ts`
- **Effort**: S

### 3. CI And Developer Workflow

- **Purpose**: Run headless browser checks in CI and document local commands.
- **Files**: `.github/workflows/test.yml`, `README.md`
- **Effort**: XS

## Dependencies

### Build Order

1. Install Playwright and configure the Vite web server.
2. Expose stable scene markers and add browser assertions.
3. Generate/review visual baselines.
4. Add CI installation and execution.

### External Dependencies

- `@playwright/test`: browser runner and screenshot assertions.
- Playwright-managed Chromium: local and CI browser runtime.

## Risks & Assumptions

### Risks

- **Canvas rendering differences**: Chromium or font changes may alter pixels. Mitigation: pin the Playwright version and use a small explicit diff tolerance.
- **Asset loading timing**: Phaser may render before all assets are ready. Mitigation: wait for the scene marker set from the scene's `create()` lifecycle.
- **CI browser availability**: Ubuntu runners do not include the required browser dependencies. Mitigation: install Chromium with `--with-deps` in the workflow.

### Assumptions

- Chromium is sufficient for the first visual regression gate.
- A scene marker on `#game` is acceptable test-facing metadata and has no gameplay effect.

## Milestones

- [x] Playwright config and scripts are available locally.
- [x] Desktop/mobile snapshots and Start-to-Play test pass locally.
- [x] CI installs and runs the browser suite.
- [ ] PR checks pass and issue #33 is closed.

## Tasks

### Foundation (Build First)

- [x] **Task 1**: Add Playwright dependency, scripts, config, and ignored artifacts.
  - **Acceptance**: `pnpm test:e2e` starts Vite automatically and discovers both Chromium projects.
  - **Files**: `package.json`, `pnpm-lock.yaml`, `playwright.config.ts`, `.gitignore`
  - **Tests**: Playwright runner startup.
  - **Effort**: S

### Features (Build Second)

- [x] **Task 2**: Add stable scene markers and visual/interaction coverage.
  - **Acceptance**: Start and Play scene assertions plus desktop/mobile screenshots pass.
  - **Files**: `src/scenes/Start.ts`, `src/scenes/Play.ts`, `e2e/start-screen.spec.ts`, snapshots
  - **Tests**: Playwright E2E suite.
  - **Effort**: S

### Integration (Build Third)

- [x] **Task 3**: Add CI execution and documentation.
  - **Acceptance**: CI installs Chromium headlessly and the README documents installation and baseline updates.
  - **Files**: `.github/workflows/test.yml`, `README.md`
  - **Tests**: GitHub Actions checks.
  - **Effort**: XS

## Effort Estimate

**Total Estimated Days**: 2-3 days

| Phase | Effort |
|-------|--------|
| Foundation | 0.5-1 day |
| Features | 1 day |
| Integration | 0.5 day |
| Testing & Polish | 0.5 day |
