import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "../config/gameConfig";

const TITLE = "ASSET DIRECTION // PREVIEW";

export default class AssetSpike extends Phaser.Scene {
  constructor() {
    super("AssetSpike");
  }

  create() {
    this.game.canvas?.parentElement?.setAttribute("data-scene", "asset-spike");
    this.drawBackground();
    this.drawHeader();
    this.drawSamples();
    this.drawMenu();

    this.input.keyboard?.once("keydown", () => this.startGame());
  }

  private drawBackground() {
    this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x1b1735).setOrigin(0);

    const sky = this.add.graphics();
    sky.fillStyle(0x33285c, 1);
    sky.fillRect(0, 24, GAME_WIDTH, 74);
    sky.fillStyle(0x60406f, 1);
    sky.fillRect(0, 70, GAME_WIDTH, 33);

    const moon = this.add.graphics();
    moon.fillStyle(0xf7d995, 1);
    moon.fillCircle(247, 38, 14);
    moon.fillStyle(0x60406f, 1);
    moon.fillCircle(253, 33, 12);

    const hills = this.add.graphics();
    hills.fillStyle(0x29234b, 1);
    hills.fillTriangle(0, 108, 44, 62, 91, 108);
    hills.fillTriangle(55, 108, 118, 51, 181, 108);
    hills.fillTriangle(166, 108, 222, 61, 290, 108);
    hills.fillStyle(0x382d58, 1);
    hills.fillTriangle(0, 108, 53, 80, 112, 108);
    hills.fillTriangle(192, 108, 245, 78, 320, 108);

    const ground = this.add.graphics();
    ground.fillStyle(0x15152c, 1);
    ground.fillRect(0, 109, GAME_WIDTH, 71);
    ground.fillStyle(0x6d4e68, 1);
    ground.fillRect(0, 109, GAME_WIDTH, 4);
    ground.fillStyle(0x9b6a70, 1);
    for (let x = 4; x < GAME_WIDTH; x += 18) ground.fillRect(x, 121, 8, 3);
  }

  private drawHeader() {
    this.add.text(GAME_WIDTH / 2, 14, TITLE, {
      fontSize: "8px",
      color: "#f7d995",
      fontFamily: "monospace",
      fontStyle: "bold",
      stroke: "#15152c",
      strokeThickness: 2
    }).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, 29, "KENNEY-STYLE PLATFORMER STUDY", {
      fontSize: "5px",
      color: "#d9c8e8",
      fontFamily: "monospace",
      letterSpacing: 1
    }).setOrigin(0.5);
  }

  private drawSamples() {
    this.add.text(18, 47, "SAMPLE LOADOUT", {
      fontSize: "5px",
      color: "#f7d995",
      fontFamily: "monospace"
    });

    this.add.image(57, 86, "tiles").setDisplaySize(72, 18).setName("sample-environment");

    const hero = this.add.sprite(141, 105, "owlet_idle")
      .setScale(1.4)
      .setOrigin(0.5, 1)
      .setName("sample-character");
    hero.play("owlet-idle");

    const hazard = this.add.sprite(196, 105, "dude_idle")
      .setScale(1.4)
      .setOrigin(0.5, 1)
      .setName("sample-hazard");
    hazard.play("dude-idle");

    const collectible = this.add.graphics().setName("sample-collectible");
    collectible.fillStyle(0xf7d995, 1);
    collectible.fillRect(246, 82, 8, 8);
    collectible.fillStyle(0xffffff, 1);
    collectible.fillRect(248, 82, 3, 3);

    this.add.text(57, 113, "TILE", { fontSize: "5px", color: "#d9c8e8", fontFamily: "monospace" }).setOrigin(0.5);
    this.add.text(141, 113, "HERO", { fontSize: "5px", color: "#d9c8e8", fontFamily: "monospace" }).setOrigin(0.5);
    this.add.text(196, 113, "HAZARD", { fontSize: "5px", color: "#d9c8e8", fontFamily: "monospace" }).setOrigin(0.5);
    this.add.text(250, 113, "PROP", { fontSize: "5px", color: "#d9c8e8", fontFamily: "monospace" }).setOrigin(0.5);
  }

  private drawMenu() {
    this.add.text(GAME_WIDTH / 2, 139, "START SCREEN BACKGROUND PREVIEW", {
      fontSize: "7px",
      color: "#f7d995",
      fontFamily: "monospace",
      fontStyle: "bold",
      stroke: "#15152c",
      strokeThickness: 2
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, 153, "PRESS ANY KEY TO PLAY", {
      fontSize: "6px",
      color: "#ffffff",
      fontFamily: "monospace",
      letterSpacing: 1
    }).setName("asset-spike-prompt").setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, 169, "DISPOSABLE SPIKE // PRODUCTION START UNCHANGED", {
      fontSize: "4px",
      color: "#9b6a70",
      fontFamily: "monospace"
    }).setOrigin(0.5);
  }

  private startGame() {
    this.scene.start("Play");
  }
}
