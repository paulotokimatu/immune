export default function makeAnimations(scene) {
  scene.anims.create({
    key: 'enemy',
    frames: scene.anims.generateFrameNumbers('macrofago', { start: 0, end: 3 }),
    frameRate: 8,
    repeat: -1
  });
}