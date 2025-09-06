import Phaser from "phaser";

export default class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    // Load Owlet Monster sprite sheets
    this.load.spritesheet("owlet_idle", "/assets/2 Owlet_Monster/Owlet_Monster_Idle_4.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("owlet_walk", "/assets/2 Owlet_Monster/Owlet_Monster_Walk_6.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("owlet_run", "/assets/2 Owlet_Monster/Owlet_Monster_Run_6.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    
    // Load Dude Monster sprite sheets
    this.load.spritesheet("dude_idle", "/assets/3 Dude_Monster/Dude_Monster_Idle_4.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("dude_walk", "/assets/3 Dude_Monster/Dude_Monster_Walk_6.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("dude_run", "/assets/3 Dude_Monster/Dude_Monster_Run_6.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    
    this.load.image("tiles", "/assets/tiles.png");
  }

  create() {
    this.scene.start("Play");
  }
}
