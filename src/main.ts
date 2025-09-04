import Phaser from "phaser";
import Boot from "@scenes/Boot";
import Play from "@scenes/Play";

const GAME_WIDTH = 320;
const GAME_HEIGHT = 180;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#0d0d0d",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: "arcade",
    arcade: { gravity: { x: 0, y: 800 }, debug: false }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [Boot, Play]
};

new Phaser.Game(config);
