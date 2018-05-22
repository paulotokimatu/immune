import Bullet from "../images/bullet";

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.unitBullets = this.scene.physics.add.group();

    this.lastShoot = 0;
    this.hp = 200;
    this.cost = 20;

    this.scene.physics.add.collider(this.unitBullets, this.scene.enemyGroup, this.enemyHitCallback, null, this.scene);
  }

  update(time, delta) {
    if (time - this.lastShoot >= 1000) {
      this.lastShoot = time;
      this.shoot();
    }

    this.unitBullets.children.entries.forEach((unit) => {
        unit.update();
      }
    )
  }

  enemyHitCallback(bullet, enemy) {
    enemy.takeDamage(bullet.damage);
    bullet.destroy();
  }

  shoot() {
    this.unitBullets.add(new Bullet({scene: this.scene, x: this.x + 15, y: this.y, key: 'bullet'}));
  }
}
