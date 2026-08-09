import Phaser from "phaser";
import {
  COYOTE_TIME_MS,
  DOUBLE_JUMP_VELOCITY,
  ENEMY_PATROL_DISTANCE,
  ENEMY_SCORE,
  ENEMY_SPEED,
  JUMP_BUFFER_MS,
  JUMP_VELOCITY,
  PLAYER_SPEED,
  WATER_END_X,
  WATER_START_X,
  WORLD_HEIGHT,
  WORLD_WIDTH
} from "../config/gameConfig";

type CharacterForm = "owlet" | "dude" | "turtle";

export default class Play extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private spaceKey!: Phaser.Input.Keyboard.Key;
  private tKey!: Phaser.Input.Keyboard.Key;
  private currentCharacter: CharacterForm = "owlet";
  private wasTransformPressed = false;
  private mobileInputHandler?: (event: Event) => void;
  private coyoteTimer = 0;
  private jumpBufferTimer = 0;
  private wasJumpPressed = false;
  private jumpsUsed = 0;
  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private enemies!: Phaser.Physics.Arcade.Group;
  private rockBlocks!: Phaser.Physics.Arcade.StaticGroup;
  private mobileInput = { left: false, right: false, up: false, down: false, jump: false, transform: false };

  constructor() {
    super("Play");
  }

  create() {
    this.game.canvas?.parentElement?.setAttribute("data-scene", "play");
    this.game.canvas?.parentElement?.setAttribute("data-scenario", "forest-rock-water");
    this.add.rectangle(0, 0, WORLD_WIDTH, WORLD_HEIGHT, 0x173847).setOrigin(0);
    this.add.rectangle(0, 88, WORLD_WIDTH, 92, 0x2a5b3f).setOrigin(0);
    this.createForestBackdrop();
    this.add.rectangle(WATER_START_X, 118, WATER_END_X - WATER_START_X, 52, 0x287da3).setOrigin(0).setDepth(1);
    this.add.rectangle(WATER_START_X, 116, WATER_END_X - WATER_START_X, 3, 0x74d1d3).setOrigin(0).setDepth(2);
    this.createWaterSurface();
    this.createVegetation();

    const ground = this.physics.add.staticGroup();
    ground.create(WORLD_WIDTH / 2, 170, "tiles").setScale(WORLD_WIDTH / 32, 1).refreshBody();
    this.createRockBlocks();

    this.player = this.physics.add.sprite(80, 120, "owlet_idle", 0).setScale(1).setCollideWorldBounds(true).setDepth(10);
    this.physics.add.collider(this.player, ground, () => this.jumpsUsed = 0);
    this.physics.add.collider(this.player, this.rockBlocks, () => this.jumpsUsed = 0);
    this.player.play("owlet_idle");

    this.enemies = this.physics.add.group();
    this.createEnemy(390);
    this.createEnemy(820);
    this.physics.add.collider(this.enemies, ground);
    this.physics.add.collider(this.player, this.enemies, this.handleEnemyContact as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);

    this.scoreText = this.add.text(8, 8, "SCORE 0", { fontSize: "8px", color: "#ffffff", backgroundColor: "#10232dcc", padding: { x: 4, y: 3 } }).setScrollFactor(0).setDepth(20);
    this.cameras.main.setRoundPixels(true);
    this.cameras.main.startFollow(this.player, true, 1, 1);
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.tKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    }
    this.setupMobileInputListeners();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.removeMobileInputListeners, this);
  }

  private createForestBackdrop() {
    for (let x = 18; x < WORLD_WIDTH; x += 54) {
      this.add.image(x, 78, "kenney_forest").setDisplaySize(36, 36).setAlpha(0.8).setDepth(-1);
    }
  }

  private createWaterSurface() {
    for (let x = WATER_START_X + 9; x < WATER_END_X; x += 27) {
      this.add.image(x, 116, "kenney_water").setDisplaySize(18, 8).setDepth(3);
    }
  }

  private createRockBlocks() {
    this.rockBlocks = this.physics.add.staticGroup();
    [280, 470].forEach((x) => {
      const block = this.rockBlocks.create(x, 144, "kenney_rock")
        .setDisplaySize(36, 24)
        .setName("rock-block")
        .setDepth(6);
      block.refreshBody();
    });
  }

  private createVegetation() {
    for (let index = 0; index < 12; index += 1) {
      const x = 35 + index * 88;
      const background = this.add.rectangle(x, 74 - (index % 3) * 8, 10, 38, 0x1c473b).setOrigin(0.5, 1).setDepth(0).setScrollFactor(0.55);
      const foreground = this.add.ellipse(x + 20, 125 - (index % 2) * 5, 18, 34, 0x76a84e).setDepth(4);
      this.tweens.add({ targets: background, angle: index % 2 ? 2 : -2, duration: 1100 + index * 30, yoyo: true, repeat: -1, ease: "Sine.inOut" });
      this.tweens.add({ targets: foreground, angle: index % 2 ? -3 : 3, duration: 800 + index * 25, yoyo: true, repeat: -1, ease: "Sine.inOut" });
    }
  }

  private createEnemy(x: number) {
    const enemy = this.enemies.create(x, 135, "dude_idle", 0) as Phaser.Physics.Arcade.Sprite;
    enemy.setScale(0.75).setTint(0xd45d5d).setDepth(8);
    enemy.setData("originX", x);
    enemy.setData("direction", 1);
    enemy.play("dude_idle");
  }

  private handleEnemyContact(_player: unknown, enemyObject: unknown) {
    const enemy = enemyObject as Phaser.Physics.Arcade.Sprite;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (body.velocity.y > 0 && this.player.y < enemy.y - 5) {
      enemy.disableBody(true, true);
      this.addScore(ENEMY_SCORE);
      body.setVelocityY(JUMP_VELOCITY / 2);
      return;
    }
    body.setVelocityX(this.player.x < enemy.x ? -PLAYER_SPEED : PLAYER_SPEED);
    body.setVelocityY(JUMP_VELOCITY / 2);
  }

  private addScore(points: number) {
    this.score = Math.max(0, this.score + points);
    this.scoreText?.setText(`SCORE ${this.score}`);
  }

  private transformCharacter() {
    this.currentCharacter = this.currentCharacter === "owlet" ? "dude" : this.currentCharacter === "dude" ? "turtle" : "owlet";
    this.player.setTexture(this.currentCharacter === "turtle" ? "dude_idle" : `${this.currentCharacter}_idle`, 0);
    this.player.setTint(this.currentCharacter === "turtle" ? 0x4ca9d1 : 0xffffff);
    this.player.play(`${this.currentCharacter === "turtle" ? "dude" : this.currentCharacter}_idle`);
    this.jumpsUsed = 0;
  }

  private setupMobileInputListeners() {
    this.mobileInputHandler = this.mobileInputHandler ?? ((event: Event) => this.handleMobileInputEvent(event as CustomEvent));
    window.addEventListener("mobileInput", this.mobileInputHandler);
  }

  private removeMobileInputListeners() {
    if (this.mobileInputHandler) window.removeEventListener("mobileInput", this.mobileInputHandler);
  }

  private handleMobileInputEvent(event: CustomEvent<{ key: string; pressed: boolean }>) {
    const { key, pressed } = event.detail;
    if (key === "ArrowLeft") this.mobileInput.left = pressed;
    if (key === "ArrowRight") this.mobileInput.right = pressed;
    if (key === "ArrowUp") this.mobileInput.up = pressed;
    if (key === "ArrowDown") this.mobileInput.down = pressed;
    if (key === "Space") this.mobileInput.jump = pressed;
    if (key === "KeyT") this.mobileInput.transform = pressed;
  }

  update(_: number, dt: number) {
    if (!this.player) return;
    this.jumpsUsed ??= 0;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const onFloor = body.blocked.down || body.touching.down;
    const left = (this.cursors?.left?.isDown ?? false) || this.mobileInput.left;
    const right = (this.cursors?.right?.isDown ?? false) || this.mobileInput.right;
    const jump = (this.cursors?.up?.isDown || this.cursors?.space?.isDown || this.spaceKey?.isDown || this.mobileInput.jump || this.mobileInput.up) ?? false;
    const transform = (this.tKey?.isDown ?? false) || this.mobileInput.transform;
    const inWater = this.player.x >= WATER_START_X && this.player.x <= WATER_END_X;
    const swimming = inWater && this.currentCharacter === "turtle";

    if (swimming) {
      body.setGravityY?.(0);
      body.setVelocityY(((this.mobileInput.down || this.cursors?.down?.isDown) ? 1 : ((this.mobileInput.up || this.cursors?.up?.isDown) ? -1 : 0)) * PLAYER_SPEED);
    } else {
      body.setGravityY?.(800);
      if (!inWater && this.player.x < WATER_START_X && right && this.player.x + PLAYER_SPEED * (dt / 1000) >= WATER_START_X && this.currentCharacter !== "turtle") body.setVelocityX(0);
      this.coyoteTimer = onFloor ? COYOTE_TIME_MS : Math.max(0, this.coyoteTimer - dt);
      const jumpPressedThisFrame = jump && !this.wasJumpPressed;
      this.jumpBufferTimer = jumpPressedThisFrame ? JUMP_BUFFER_MS : Math.max(0, this.jumpBufferTimer - dt);
      if (this.currentCharacter === "dude" && !onFloor && jumpPressedThisFrame && this.jumpsUsed === 1) {
        body.setVelocityY(DOUBLE_JUMP_VELOCITY);
        this.jumpsUsed = 2;
        this.jumpBufferTimer = 0;
      } else if (this.jumpBufferTimer > 0 && (this.coyoteTimer > 0 || onFloor) && this.jumpsUsed === 0) {
        body.setVelocityY(JUMP_VELOCITY);
        this.jumpsUsed = 1;
        this.jumpBufferTimer = 0;
        this.coyoteTimer = 0;
      }
    }

    if (left && !right) { body.setVelocityX(-PLAYER_SPEED); this.player.setFlipX(true); }
    else if (right && !left) { body.setVelocityX(PLAYER_SPEED); this.player.setFlipX(false); }
    else if (!swimming) body.setVelocityX(0);
    if (inWater && this.currentCharacter !== "turtle") this.player.x = Math.min(this.player.x, WATER_START_X - 1);
    this.wasJumpPressed = jump;
    if (transform && !this.wasTransformPressed) this.transformCharacter();
    this.wasTransformPressed = transform;

    this.enemies?.children.forEach((child) => {
      const enemy = child as Phaser.Physics.Arcade.Sprite;
      if (!enemy.active) return;
      const originX = enemy.getData("originX") as number;
      let direction = enemy.getData("direction") as number;
      if (enemy.x >= originX + ENEMY_PATROL_DISTANCE) direction = -1;
      if (enemy.x <= originX - ENEMY_PATROL_DISTANCE) direction = 1;
      enemy.setData("direction", direction);
      (enemy.body as Phaser.Physics.Arcade.Body).setVelocityX(direction * ENEMY_SPEED);
    });
    if (onFloor) this.jumpsUsed = 0;
  }
}
