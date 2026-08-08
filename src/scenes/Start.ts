import Phaser from "phaser";
import { GAME_WIDTH, GAME_HEIGHT } from "../config/gameConfig";

const TITLE = "El héroe de la transformación";
const MENU_Y = 93;

export default class Start extends Phaser.Scene {
  private title!: Phaser.GameObjects.Text;
  private titleShadow!: Phaser.GameObjects.Text;
  private titleAnimationState = 0;

  constructor() {
    super("Start");
  }

  create() {
    this.drawBackground();

    this.titleShadow = this.add
      .text(GAME_WIDTH / 2 + 2, 27, TITLE, {
        fontSize: "13px",
        color: "#322d4f",
        fontStyle: "bold",
        fontFamily: "monospace",
        align: "center",
        wordWrap: { width: GAME_WIDTH - 24 }
      })
      .setOrigin(0.5);
    this.title = this.add
      .text(GAME_WIDTH / 2, 25, TITLE, {
        fontSize: "13px",
        color: "#f8f0c6",
        fontStyle: "bold",
        fontFamily: "monospace",
        align: "center",
        wordWrap: { width: GAME_WIDTH - 24 }
      })
      .setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, MENU_Y, "▶  START GAME", this.menuStyle("#fff3b0"))
      .setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, MENU_Y + 17, "   HOW TO PLAY", this.menuStyle("#d9d5e8"))
      .setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, MENU_Y + 34, "   EXIT", this.menuStyle("#d9d5e8"))
      .setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, 161, "PRESS ANY KEY TO BEGIN", {
      fontSize: "6px",
      color: "#fff3b0",
      fontFamily: "monospace",
      letterSpacing: 1
    }).setName("start-prompt").setOrigin(0.5);

    this.time.addEvent({ delay: 900, loop: true, callback: () => this.advanceTitleAnimation() });
    this.time.addEvent({ delay: 650, loop: true, callback: () => this.pulsePrompt() });
    this.input.keyboard?.once("keydown", () => this.startGame());
  }

  private drawBackground() {
    this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0xaaa7c0).setOrigin(0);
    this.add.rectangle(0, 48, GAME_WIDTH, 78, 0xb8c4d0).setOrigin(0);

    const clouds = this.add.graphics();
    clouds.fillStyle(0xd9dbe0, 1);
    clouds.fillRect(23, 17, 48, 3);
    clouds.fillRect(31, 14, 26, 3);
    clouds.fillRect(39, 12, 13, 3);
    clouds.fillRect(207, 29, 53, 3);
    clouds.fillRect(218, 26, 27, 3);

    const mountains = this.add.graphics();
    mountains.fillStyle(0x9eabbc, 1);
    mountains.fillTriangle(0, 100, 29, 51, 62, 100);
    mountains.fillTriangle(40, 100, 71, 61, 106, 100);
    mountains.fillTriangle(213, 100, 247, 55, 285, 100);
    mountains.fillStyle(0x8ea4b7, 1);
    mountains.fillTriangle(0, 100, 29, 68, 51, 100);
    mountains.fillTriangle(241, 100, 263, 70, 285, 100);

    this.drawPine(31, 93, 0.85, 0x9cb8c2);
    this.drawPine(76, 99, 0.72, 0x9cb8c2);
    this.drawPine(223, 98, 0.8, 0x9cb8c2);
    this.drawPine(280, 96, 1.05, 0x6e9a82);

    const ground = this.add.graphics();
    ground.fillStyle(0x70475d, 1);
    ground.fillRect(0, 128, GAME_WIDTH, 52);
    ground.fillStyle(0x9a6470, 1);
    ground.fillRect(0, 133, GAME_WIDTH, 4);
    ground.fillStyle(0xc5c18b, 1);
    ground.fillRect(0, 126, GAME_WIDTH, 4);
    ground.fillStyle(0xe2d39a, 1);
    for (let x = 2; x < GAME_WIDTH; x += 13) ground.fillRect(x, 124, 7, 3);
    ground.fillStyle(0x8b5968, 1);
    for (let x = 7; x < GAME_WIDTH; x += 19) ground.fillRect(x, 143, 5, 4);

    const hero = this.add.sprite(72, 119, "owlet_idle").setScale(1.35).setOrigin(0.5, 1);
    hero.play("owlet-idle");
  }

  private drawPine(x: number, y: number, scale: number, color: number) {
    const tree = this.add.graphics();
    tree.fillStyle(color, 1);
    tree.fillTriangle(x, y - 45 * scale, x - 13 * scale, y - 20 * scale, x + 13 * scale, y - 20 * scale);
    tree.fillTriangle(x, y - 34 * scale, x - 17 * scale, y - 9 * scale, x + 17 * scale, y - 9 * scale);
    tree.fillTriangle(x, y - 22 * scale, x - 21 * scale, y, x + 21 * scale, y);
    tree.fillStyle(0x76584e, 1);
    tree.fillRect(x - 3 * scale, y, 6 * scale, 8 * scale);
  }

  private menuStyle(color: string): Phaser.Types.GameObjects.Text.TextStyle {
    return {
      fontSize: "9px",
      color,
      fontStyle: "bold",
      fontFamily: "monospace",
      stroke: "#322d4f",
      strokeThickness: 2
    };
  }

  private pulsePrompt() {
    const prompt = this.children.getByName("start-prompt") as Phaser.GameObjects.Text | null;
    if (prompt) prompt.setAlpha(prompt.alpha === 1 ? 0.45 : 1);
  }

  private advanceTitleAnimation() {
    this.titleAnimationState = (this.titleAnimationState + 1) % 2;
    const offset = this.titleAnimationState === 0 ? 3 : 5;
    this.titleShadow.setPosition(this.title.x + offset, this.title.y + offset);
    this.title.setAngle(this.titleAnimationState === 0 ? -1 : 1);
  }

  private startGame() {
    this.scene.start("Play");
  }
}
