export default class Bullet extends Phaser.GameObjects.Image {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.damage = 10;
    this.speed = 0.25;
    this.xSpeed = 0;
    this.ySpeed = 0;

    this.test = {
      x: Math.random() * 800,
      y: Math.random() * 600,
    }
    this.setDirection(this.test);
  }

  setDirection(direction) {
    this.direction = Math.atan((direction.x - this .x) / (direction.y - this.y));

    if (direction.y >= this.y) {
      this.xSpeed = this.speed * Math.sin(this.direction);
      this.ySpeed = this.speed * Math.cos(this.direction);
    } else {
      this.xSpeed = -this.speed * Math.sin(this.direction);
      this.ySpeed = -this.speed * Math.cos(this.direction);
    }
  }

  update(time, delta) {
    this.x += this.xSpeed * delta;
    this.y += this.ySpeed * delta;
    if (this.x > 800 || this.x < 0 || this.y > 600 || this.y < 0) {
      this.destroy();
    }
  }
}
