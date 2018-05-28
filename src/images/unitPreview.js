export default class Bullet extends Phaser.GameObjects.Image {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.setAlpha(0.7);
  }

  update() {
    if(this.scene.playerState.clickActive) {
      this.scene.physics.moveTo(this, this.scene.input.x, this.scene.input.y, null, 50);
      return;
    }
    this.destroy();
  }
}
