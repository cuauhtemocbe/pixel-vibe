import Phaser from "phaser";

export function createCharacterAnimations(scene: Phaser.Scene) {
  // Owlet Monster animations
  scene.anims.create({
    key: "owlet_idle",
    frames: scene.anims.generateFrameNumbers("owlet_idle", { start: 0, end: 3 }),
    frameRate: 8,
    repeat: -1
  });

  scene.anims.create({
    key: "owlet_walk",
    frames: scene.anims.generateFrameNumbers("owlet_walk", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: "owlet_run",
    frames: scene.anims.generateFrameNumbers("owlet_run", { start: 0, end: 5 }),
    frameRate: 12,
    repeat: -1
  });

  // Dude Monster animations
  scene.anims.create({
    key: "dude_idle",
    frames: scene.anims.generateFrameNumbers("dude_idle", { start: 0, end: 3 }),
    frameRate: 8,
    repeat: -1
  });

  scene.anims.create({
    key: "dude_walk",
    frames: scene.anims.generateFrameNumbers("dude_walk", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: "dude_run",
    frames: scene.anims.generateFrameNumbers("dude_run", { start: 0, end: 5 }),
    frameRate: 12,
    repeat: -1
  });
}
