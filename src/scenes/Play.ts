import Phaser from "phaser";

export default class Play extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private spaceKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super("Play");
  }

  create() {
    this.add.rectangle(0, 0, 10000, 10000, 0x101820, 1).setOrigin(0);
    const ground = this.physics.add.staticGroup();
    // Create ground that spans the entire world width (1000 units)
    ground.create(500, 170, "tiles").setScale(31.25, 1).refreshBody();

    this.player = this.physics.add
      .sprite(80, 120, "player")
      .setScale(1)
      .setCollideWorldBounds(true)
      .setDepth(10);

    this.physics.add.collider(this.player, ground);

    this.cameras.main.setRoundPixels(true);
    this.cameras.main.startFollow(this.player, true, 1, 1);

    // Add null check for keyboard input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    this.physics.world.setBounds(0, 0, 1000, 180);
    this.cameras.main.setBounds(0, 0, 1000, 180);
  }

  update(_: number, dt: number) {
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const onFloor = body.blocked.down || body.touching.down;

    // Add null checks for cursors
    const left = this.cursors?.left?.isDown ?? false;
    const right = this.cursors?.right?.isDown ?? false;
    const jump = (this.cursors?.up?.isDown || this.cursors?.space?.isDown || this.spaceKey?.isDown) ?? false;

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

    // Remove the Math.round() calls that cause jittery movement
    // The camera already handles pixel rounding with setRoundPixels(true)
  }
}
