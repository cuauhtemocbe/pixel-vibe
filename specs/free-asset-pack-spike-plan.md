# Implementation Plan: Free Asset Pack Evaluation and Start Screen Background Preview

**Spec**: `specs/free-asset-pack-spike.md`
**Issue**: [#34](https://github.com/cuauhtemocbe/pixel-vibe/issues/34)
**Created**: 2026-08-08
**Status**: completed

## Components

### 1. Candidate asset evidence and license record

- **Purpose**: Establish a comparable, auditable record for Pixel Adventure, SunnyLand, and Kenney Pixel Platformer before implementation decisions.
- **Files**: `docs/asset-evaluation.md` or an equivalent evaluation artifact agreed during implementation.
- **Effort**: S

### 2. Isolated evaluation scene

- **Purpose**: Render the selected candidate's environment, character, hazard or enemy, and prop or collectible without changing the production gameplay scene.
- **Files**: `src/scenes/AssetSpike.ts`, scene registration/loading files as required.
- **Effort**: M

### 3. Start-screen background preview

- **Purpose**: Apply the selected visual direction to a disposable start-screen preview while preserving the current title, menu, prompt, and keyboard transition semantics.
- **Files**: `src/scenes/AssetSpike.ts`, candidate asset files under `public/assets/`, and focused tests.
- **Effort**: M

### 4. Automated visual evidence

- **Purpose**: Prove the isolated view and preview render consistently on desktop and mobile Chromium projects.
- **Files**: `e2e/asset-spike.spec.ts`, `e2e/*-snapshots/`.
- **Effort**: S

### 5. Verification and recommendation

- **Purpose**: Run repository quality checks, review screenshots, and finalize the adopt/defer/reject recommendation and license obligations.
- **Files**: `specs/free-asset-pack-spike.md`, evaluation record, snapshots.
- **Effort**: S

## Dependencies

### Build Order

1. Candidate asset evidence and license record.
2. Isolated evaluation scene, depending on the selected candidate and verified asset paths.
3. Start-screen background preview, depending on the isolated scene and selected visual direction.
4. Automated visual evidence, depending on the scene being reachable and deterministic.
5. Verification and recommendation, depending on implementation, tests, screenshots, and license evidence.

### External Dependencies

- Candidate asset downloads or local copies, only after verifying current source-page license terms.
- Existing Phaser and Playwright dependencies; no new runtime dependency is expected.

## Risks & Assumptions

### Risks

- **Asset licenses or attribution terms differ from summaries**: Verify each source page and record the exact obligation before recommending a pack.
- **Candidate dimensions do not fit the 320x180 composition**: Normalize presentation in the isolated scene for evaluation only; record integration cost rather than modifying production scaling globally.
- **Asset paths contain spaces or unsupported formats**: Copy only runtime-compatible files and document any conversion as part of the spike evidence.
- **The isolated scene changes the production boot flow**: Register the evaluation view behind an explicit development/test entry path and verify `Boot -> Start -> Play` remains unchanged.
- **Visual baselines are nondeterministic due to animation**: Freeze or control animation timing in the E2E setup and use the existing screenshot tolerance.

### Assumptions

- The candidate packs can be evaluated locally without committing assets that are not permitted by their licenses.
- A single selected direction is sufficient for the start-screen background preview.
- Existing Playwright desktop and Pixel 5 projects are the required viewport evidence.
- The spike can be completed within 1-2 working days and does not require production asset migration.

## Milestones

- [x] **M1: Evidence ready** — all three candidates have comparable notes, license information, and a selected direction for technical evaluation; Pixel Frog's rate-limit gap is recorded.
- [x] **M2: Prototype ready** — the isolated view renders the selected sample assets and the start-screen background preview at 320x180.
- [x] **M3: Visual evidence ready** — desktop and mobile Playwright checks pass with reviewed snapshots.
- [x] **M4: Recommendation ready** — documentation records adopt/defer/reject decisions and attribution obligations; production flow is confirmed unchanged.

## Tasks

### Foundation (Build First)

- [x] **Task 1: Record candidate assets and licenses**
  - **Acceptance**: The evaluation record compares all three candidates using license, attribution, dimensions, animation coverage, visual fit, and integration effort; source-page terms are cited.
  - **Files**: `docs/asset-evaluation.md` or agreed evaluation artifact.
  - **Tests**: Review checklist or artifact validation; no runtime test required.
  - **Effort**: S

- [x] **Task 2: Select and stage one candidate for technical evaluation**
  - **Acceptance**: Runtime-compatible files are available locally, their paths and dimensions are recorded, and no unverified or disallowed asset is committed.
  - **Files**: `public/assets/` selected files, evaluation record.
  - **Tests**: Asset existence/path check during scene loading; license review.
  - **Effort**: XS

### Features (Build Second)

- [x] **Task 3: Implement the isolated Phaser evaluation scene**
  - **Acceptance**: The scene renders a sample environment tile, character, hazard or enemy, and prop or collectible at 320x180 without broken textures, while production `Boot -> Start -> Play` remains unchanged.
  - **Files**: `src/scenes/AssetSpike.ts`, scene registration or development entry files, focused unit tests.
  - **Tests**: Vitest tests for pure scene-selection/loading helpers if introduced; typecheck and build for scene wiring.
  - **Effort**: M

- [x] **Task 4: Add the start-screen background preview**
  - **Acceptance**: The isolated preview uses the selected direction as its background, retains the title, menu, prompt, and keyboard transition semantics, and does not alter production `Start.ts` behavior.
  - **Files**: `src/scenes/AssetSpike.ts`, focused tests, evaluation record.
  - **Tests**: Browser interaction assertion and visual snapshot; existing start-screen unit/E2E tests remain green.
  - **Effort**: M

### Integration (Build Third)

- [x] **Task 5: Add desktop and mobile Playwright evidence**
  - **Acceptance**: The isolated evaluation view is reachable by E2E tests; desktop and Pixel 5 screenshots show crisp scaling and the new background; the start interaction is verified.
  - **Files**: `e2e/asset-spike.spec.ts`, `e2e/*-snapshots/`, minimal test-entry configuration if required.
  - **Tests**: `pnpm test:e2e`.
  - **Effort**: S

### Polish (Build Last)

- [x] **Task 6: Finalize recommendation and run quality gates**
  - **Acceptance**: The recommendation identifies one primary direction, adopt/defer/reject decisions, verified license obligations, and confirms production assets/behavior are unchanged.
  - **Files**: evaluation record, `specs/free-asset-pack-spike.md` if criteria need checked, optional README note.
  - **Tests**: `pnpm run typecheck`, `pnpm test --run`, `pnpm run build`, `pnpm test:e2e`, and manual screenshot review.
  - **Effort**: S

## Effort Estimate

**Total Estimated Days**: 1-2 days

| Phase | Effort |
|-------|--------|
| Foundation | 0.25-0.5 day |
| Features | 0.5-0.75 day |
| Integration | 0.25 day |
| Testing & Polish | 0.25-0.5 day |
