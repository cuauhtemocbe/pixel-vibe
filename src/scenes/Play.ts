import Phaser from "phaser";

export default class Play extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private spaceKey!: Phaser.Input.Keyboard.Key;
  private tKey!: Phaser.Input.Keyboard.Key;
  
  // Player transformation state
  private currentCharacter: 'owlet' | 'dude' = 'owlet';
  private wasTransformPressed: boolean = false;
  
  // Mobile input state
  private mobileInput = {
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
    transform: false
  };

  constructor() {
    super("Play");
  }

  create() {
    this.add.rectangle(0, 0, 10000, 10000, 0x101820, 1).setOrigin(0);
    const ground = this.physics.add.staticGroup();
    // Create ground that spans the entire world width (1000 units)
    ground.create(500, 170, "tiles").setScale(31.25, 1).refreshBody();

    this.player = this.physics.add
      .sprite(80, 120, "owlet_idle", 0)
      .setScale(1)
      .setCollideWorldBounds(true)
      .setDepth(10);

    this.physics.add.collider(this.player, ground);

    // Create animations for both characters
    this.createCharacterAnimations();

    // Start with idle animation
    this.player.play("owlet_idle");

    this.cameras.main.setRoundPixels(true);
    this.cameras.main.startFollow(this.player, true, 1, 1);

    // Add null check for keyboard input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.tKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    }

    this.physics.world.setBounds(0, 0, 1000, 180);
    this.cameras.main.setBounds(0, 0, 1000, 180);
    
    // Setup mobile input listeners
    this.setupMobileInputListeners();
  }
  
  private createCharacterAnimations() {
    // Owlet Monster animations
    this.anims.create({
      key: "owlet_idle",
      frames: this.anims.generateFrameNumbers("owlet_idle", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "owlet_walk",
      frames: this.anims.generateFrameNumbers("owlet_walk", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "owlet_run",
      frames: this.anims.generateFrameNumbers("owlet_run", { start: 0, end: 5 }),
      frameRate: 12,
      repeat: -1
    });

    // Dude Monster animations
    this.anims.create({
      key: "dude_idle",
      frames: this.anims.generateFrameNumbers("dude_idle", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "dude_walk",
      frames: this.anims.generateFrameNumbers("dude_walk", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "dude_run",
      frames: this.anims.generateFrameNumbers("dude_run", { start: 0, end: 5 }),
      frameRate: 12,
      repeat: -1
    });
  }
  
  private transformCharacter() {
    // Switch between characters
    this.currentCharacter = this.currentCharacter === 'owlet' ? 'dude' : 'owlet';
    
    // Update the player sprite texture to match the new character
    const currentFrame = this.player.frame.name;
    this.player.setTexture(`${this.currentCharacter}_idle`, 0);
    
    // Play the appropriate idle animation for the new character
    this.player.play(`${this.currentCharacter}_idle`);
  }
  
  private setupMobileInputListeners() {
    // Listen for custom mobile input events
    window.addEventListener('mobileInput', (event: any) => {
      const { action, key, pressed } = event.detail;
      
      // Debug logging
      console.log(`Mobile input received: ${key} ${pressed ? 'pressed' : 'released'}`);
      
      switch (key) {
        case 'ArrowLeft':
          this.mobileInput.left = pressed;
          break;
        case 'ArrowRight':
          this.mobileInput.right = pressed;
          break;
        case 'ArrowUp':
          this.mobileInput.up = pressed;
          break;
        case 'ArrowDown':
          this.mobileInput.down = pressed;
          break;
        case 'Space':
          this.mobileInput.jump = pressed;
          break;
        case 'KeyT':
          this.mobileInput.transform = pressed;
          break;
      }
    });
  }

  update(_: number, dt: number) {
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const onFloor = body.blocked.down || body.touching.down;

    // Get input from both keyboard and mobile controls
    const keyboardLeft = this.cursors?.left?.isDown ?? false;
    const keyboardRight = this.cursors?.right?.isDown ?? false;
    const keyboardJump = (this.cursors?.up?.isDown || this.cursors?.space?.isDown || this.spaceKey?.isDown) ?? false;
    const keyboardTransform = this.tKey?.isDown ?? false;
    
    // Combine keyboard and mobile input
    const left = keyboardLeft || this.mobileInput.left;
    const right = keyboardRight || this.mobileInput.right;
    const jump = keyboardJump || this.mobileInput.jump || this.mobileInput.up;
    const transform = keyboardTransform || this.mobileInput.transform;

    const speed = 90;
    if (left && !right) {
      body.setVelocityX(-speed);
      this.player.setFlipX(true);
      this.player.play(`${this.currentCharacter}_walk`, true);
    } else if (right && !left) {
      body.setVelocityX(speed);
      this.player.setFlipX(false);
      this.player.play(`${this.currentCharacter}_walk`, true);
    } else {
      body.setVelocityX(0);
      this.player.play(`${this.currentCharacter}_idle`, true);
    }

    if (jump && onFloor) {
      body.setVelocityY(-220);
    }

    // Handle character transformation
    if (transform && !this.wasTransformPressed) {
      this.transformCharacter();
    }
    this.wasTransformPressed = transform;

    // Remove the Math.round() calls that cause jittery movement
    // The camera already handles pixel rounding with setRoundPixels(true)
  }
}
