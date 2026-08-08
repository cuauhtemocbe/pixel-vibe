# Asset Evaluation

Issue: #34
Evaluation date: 2026-08-08

## Comparison

| Candidate | License | Attribution | Dimensions | Animation coverage | Visual fit | Phaser effort |
| --- | --- | --- | --- | --- | --- | --- |
| [Pixel Adventure by Pixel Frog](https://pixelfrog-assets.itch.io/pixel-adventure-1) | CC0, pending confirmation from the rate-limited source page | None expected under CC0; confirm before production use | Pack varies; inspect selected spritesheets | Player, enemies, environment, and props advertised | Strong platformer fit; brighter and more detailed than the current 320x180 scene | M |
| [SunnyLand by Ansimuz](https://ansimuz.itch.io/sunny-land-pixel-game-art) | CC0 1.0 Universal on the source page | None required by CC0; credit author as good practice | Pack varies; Phaser project included | Animated players, enemies, items, props, VFX, and music | Strongest background and environment variety; may require tighter palette control | M |
| [Kenney Pixel Platformer](https://kenney.nl/assets/pixel-platformer) | Creative Commons CC0 | None required | 18x18 tiles, 200 files | Tiles, characters, enemies, and props | Clear, consistent platformer direction; easiest fit for the logical resolution | S |

## Technical Sample

The isolated prototype currently uses the repository's existing runtime-compatible samples (`tiles.png`, Owlet, and Dude sprites) to validate scene composition and Phaser loading without replacing production assets. The preview background is intentionally drawn in the scene so the visual direction can be evaluated before committing a candidate pack's binary files.

## Recommendation

**Primary direction for the next implementation issue: Kenney Pixel Platformer.** Its verified 18x18 tile size and CC0 license reduce integration and attribution risk at the game's 320x180 logical resolution. SunnyLand remains the fallback when background variety is prioritized; Pixel Adventure remains deferred until its source-page license can be confirmed without rate limiting.

## Decision Log

- **Adopt for follow-up evaluation**: Kenney Pixel Platformer.
- **Defer**: SunnyLand, pending a visual palette comparison against the hero forms.
- **Reject for this iteration**: None.
- **Do not use in production yet**: Any candidate asset not copied with its source license evidence.

## License Sources

- Kenney: [Pixel Platformer](https://kenney.nl/assets/pixel-platformer), lists 18x18 tiles, 200 files, and CC0.
- SunnyLand: [SunnyLand source page](https://ansimuz.itch.io/sunny-land-pixel-game-art), lists Creative Commons Zero v1.0 Universal and a free Phaser project.
- Pixel Adventure: [Pixel Frog source page](https://pixelfrog-assets.itch.io/pixel-adventure-1). The page was rate-limited during this run; its license must be rechecked before production adoption.
