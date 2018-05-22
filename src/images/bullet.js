export default class Bullet extends Phaser.GameObjects.Image {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.damage = 10;
    this.speed = 4;
  }

  update() {
    this.x += this.speed;

    if (this.x > 750) {
      this.destroy();
    }
  }
}
