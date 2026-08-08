import Phaser from "phaser";
import { GAME_WIDTH, GAME_HEIGHT } from "../config/gameConfig";

const TRANSFORM_CYCLE_MS = 900;

export default class Start extends Phaser.Scene {
  private hero!: Phaser.GameObjects.Sprite;
  private currentForm: 'owlet' | 'dude' = 'owlet';

  constructor() {
    super("Start");
  }

  create() {
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 3, "PIXEL VIBE", { fontSize: "16px", color: "#ffffff" })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, (GAME_HEIGHT * 2) / 3, "Press any key to start", { fontSize: "8px", color: "#aaaaaa" })
      .setOrigin(0.5);

    this.hero = this.add
      .sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, "owlet_idle", 0)
      .setScale(2);
    this.hero.play("owlet_idle");

    this.time.addEvent({
      delay: TRANSFORM_CYCLE_MS,
      loop: true,
      callback: () => this.toggleHeroForm()
    });

    this.input.keyboard?.once("keydown", () => this.startGame());
  }

  private toggleHeroForm() {
    this.currentForm = this.currentForm === 'owlet' ? 'dude' : 'owlet';
    this.hero.setTexture(`${this.currentForm}_idle`, 0);
    this.hero.play(`${this.currentForm}_idle`);
  }

  private startGame() {
    this.scene.start("Play");
  }
}
