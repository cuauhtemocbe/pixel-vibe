import Phaser from "phaser";
import { GAME_WIDTH, GAME_HEIGHT } from "../config/gameConfig";

const TITLE = "El héroe de la transformación";

export default class Start extends Phaser.Scene {
  private title!: Phaser.GameObjects.Text;
  private titleShadow!: Phaser.GameObjects.Text;
  private titleAnimationState = 0;

  constructor() {
    super("Start");
  }

  create() {
    this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x102a35).setOrigin(0);
    this.add.rectangle(0, GAME_HEIGHT * 0.68, GAME_WIDTH, GAME_HEIGHT * 0.32, 0x163d3a).setOrigin(0);

    this.titleShadow = this.add
      .text(GAME_WIDTH / 2 + 3, GAME_HEIGHT / 3 + 4, TITLE, {
        fontSize: "16px",
        color: "#07151b",
        fontStyle: "bold",
        align: "center",
        wordWrap: { width: GAME_WIDTH - 24 }
      })
      .setOrigin(0.5);
    this.title = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 3, TITLE, {
        fontSize: "16px",
        color: "#f7e7a6",
        fontStyle: "bold",
        align: "center",
        wordWrap: { width: GAME_WIDTH - 24 }
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, (GAME_HEIGHT * 2) / 3, "Press any key to start", {
        fontSize: "8px",
        color: "#d1e6d3"
      })
      .setOrigin(0.5);

    this.time.addEvent({ delay: 900, loop: true, callback: () => this.advanceTitleAnimation() });
    this.input.keyboard?.once("keydown", () => this.startGame());
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
