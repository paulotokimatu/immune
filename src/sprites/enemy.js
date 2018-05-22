export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.hp = 25;
    this.speed = 2;
    this.anims.play('enemy');
  }

  update(time, delta) {
    this.move();
  }

  move() {
    this.x -= this.speed;
  }

  takeDamage(damage) {
    this.hp -= damage;
    this.isDead();
  }

  isDead() {
    if (this.hp <= 0) {
      this.destroy();
    }
  }
}
