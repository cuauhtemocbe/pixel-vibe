import Phaser from "phaser";

export default class Play extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private leftZone!: Phaser.GameObjects.Zone;
  private rightZone!: Phaser.GameObjects.Zone;
  private jumpZone!: Phaser.GameObjects.Zone;

  private leftPressed = false;
  private rightPressed = false;
  private jumpPressed = false;

  constructor() {
    super("Play");
  }

  create() {
    this.add.rectangle(0, 0, 10000, 10000, 0x101820, 1).setOrigin(0);
    const ground = this.physics.add.staticGroup();
    ground.create(160, 170, "tiles").setScale(10, 1).refreshBody();

    this.player = this.physics.add
      .sprite(40, 120, "player")
      .setScale(1)
      .setCollideWorldBounds(true)
      .setDepth(10);

    this.physics.add.collider(this.player, ground);

    this.cameras.main.setRoundPixels(true);
    this.cameras.main.startFollow(this.player, true, 1, 1);

    this.cursors = this.input.keyboard!.createCursorKeys();
    const { width, height } = this.scale;

    this.leftZone = this.add.zone(width * 0.0, height * 0.4, width * 0.33, height * 0.6)
      .setOrigin(0).setInteractive();
    this.rightZone = this.add.zone(width * 0.33, height * 0.4, width * 0.33, height * 0.6)
      .setOrigin(0).setInteractive();
    this.jumpZone = this.add.zone(width * 0.66, height * 0.4, width * 0.34, height * 0.6)
      .setOrigin(0).setInteractive();

    const press = (zone: Phaser.GameObjects.Zone, setter: (v: boolean)=>void) => {
      zone.on("pointerdown", () => setter(true));
      zone.on("pointerup",   () => setter(false));
      zone.on("pointerout",  () => setter(false));
      zone.on("pointermove", (p: Phaser.Input.Pointer) => { if (!p.isDown) setter(false); });
    };

    press(this.leftZone,  (v)=> this.leftPressed = v);
    press(this.rightZone, (v)=> this.rightPressed = v);
    press(this.jumpZone,  (v)=> this.jumpPressed = v);

    this.physics.world.setBounds(0, 0, 1000, 180);
    this.cameras.main.setBounds(0, 0, 1000, 180);
  }

  update(_: number, dt: number) {
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const onFloor = body.blocked.down || body.touching.down;

    const left  = this.cursors.left?.isDown || this.leftPressed;
    const right = this.cursors.right?.isDown || this.rightPressed;
    const jump  = (this.cursors.up?.isDown || this.cursors.space?.isDown || this.jumpPressed) ?? false;

    const speed = 90;
    if (left && !right) {
      body.setVelocityX(-speed);
      this.player.setFlipX(true);
    } else if (right && !left) {
      body.setVelocityX(speed);
      this.player.setFlipX(false);
    } else {
      body.setVelocityX(0);
    }

    if (jump && onFloor) {
      body.setVelocityY(-220);
    }

    this.player.setPosition(Math.round(this.player.x), Math.round(this.player.y));
  }
}
