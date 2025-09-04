import Phaser from "phaser";

export default class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("player", "/assets/player.png");
    this.load.image("tiles", "/assets/tiles.png");
  }

  create() {
    this.scene.start("Play");
  }
}
