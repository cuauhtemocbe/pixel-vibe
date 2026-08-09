# Asset Evaluation

Issue: #34
Evaluation date: 2026-08-08

## Comparison

| Candidate | License | Attribution | Dimensions | Animation coverage | Scenario 1 fit | Phaser effort |
| --- | --- | --- | --- | --- | --- | --- |
| [Pixel Adventure by Pixel Frog](https://pixelfrog-assets.itch.io/pixel-adventure-1) | CC0, pending confirmation from the rate-limited source page | None expected under CC0; confirm before production use | Pack varies; inspect selected spritesheets | Player, enemies, environment, and props advertised | Must verify forest tiles, solid rock blocks, water tiles, and swimming-capable character coverage | M |
| [SunnyLand by Ansimuz](https://ansimuz.itch.io/sunny-land-pixel-game-art) | CC0 1.0 Universal on the source page | None required by CC0; credit author as good practice | Pack varies; Phaser project included | Animated players, enemies, items, props, VFX, and music | Strongest candidate for forest/background variety; verify solid rocks and water/swimming assets | M |
| [Kenney Pixel Platformer](https://kenney.nl/assets/pixel-platformer) | Creative Commons CC0 | None required | 18x18 tiles, 200 files | Tiles, characters, enemies, and props | Best initial fit for forest tiles and jumpable rock blocks; water/swimming coverage still needs explicit validation | S |

## Technical Sample

The isolated prototype currently uses the repository's existing runtime-compatible samples (`tiles.png`, Owlet, and Dude sprites) to validate scene composition and Phaser loading without replacing production assets. The preview includes a forest backdrop, explicit rock blocks as jumpable obstacles, and a water lane representing the swim area. The preview background is intentionally drawn in the scene so the visual direction can be evaluated before committing a candidate pack's binary files.

## Evidence Review

### Kenney Pixel Platformer

- The downloadable archive was inspected locally from the official asset page.
- `Tilesheet (Tiles).txt` confirms `18x18` tiles with 180 tiles in the sheet.
- `Tilemap/tilemap.png` visibly contains green environment pieces, brown solid platform/rock pieces, blue water pieces, and props suitable for a forest platformer.
- The archive includes Tiled example maps and character tiles, which reduces Phaser/Tiled integration uncertainty.
- No explicit swimming animation was identified in the character sheet. Kenney is validated for the forest, solid blocks, and water environment portion, but not yet for the swimming-form animation requirement.

### SunnyLand

- The official source page advertises a free Phaser project, animated players and enemies, items, props, VFX, and music.
- The official page is licensed CC0 1.0 Universal and its preview shows platformer environments with water/ocean scenes.
- The downloadable project archive was not directly inspected in this run because the page routes downloads through itch.io's purchase flow. Swimming animation and rock-block collision suitability remain unverified.

### Pixel Adventure

- The official itch.io page was rate-limited during retrieval, so its archive and license details could not be independently inspected in this run.
- Forest, solid rock blocks, water, and swimming animation coverage remain unverified.

## Recommendation

**Primary direction for the scenario 1 environment: Kenney Pixel Platformer.** Its inspected archive verifies forest-compatible environment pieces, solid blocks, water pieces, Tiled examples, `18x18` tiles, and CC0 licensing. It does not provide verified swimming animation coverage, so the production recommendation remains open: validate SunnyLand's actual Phaser project or keep the existing turtle visual while using Kenney for the environment. Pixel Adventure remains deferred until its source page and archive can be inspected.

## Decision Log

- **Adopt for follow-up environment evaluation**: Kenney Pixel Platformer.
- **Defer for swimming comparison**: SunnyLand, pending direct inspection of its downloadable Phaser project.
- **Defer entirely for now**: Pixel Adventure, pending source and archive access.
- **Reject for this iteration**: None.
- **Do not use in production yet**: Any candidate asset not copied with its source license evidence.

## License Sources

- Kenney: [Pixel Platformer](https://kenney.nl/assets/pixel-platformer), lists 18x18 tiles, 200 files, and CC0.
- SunnyLand: [SunnyLand source page](https://ansimuz.itch.io/sunny-land-pixel-game-art), lists Creative Commons Zero v1.0 Universal and a free Phaser project.
- Pixel Adventure: [Pixel Frog source page](https://pixelfrog-assets.itch.io/pixel-adventure-1). The page was rate-limited during this run; its license must be rechecked before production adoption.
