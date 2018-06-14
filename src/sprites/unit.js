import Bullet from "../images/bullet";

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.setInteractive();

    this.unitBullets = this.scene.physics.add.group();

    this.lastShoot = 0;
    this.hp = 200;
    this.cost = 20;

    this.scene.physics.add.collider(this.unitBullets, this.scene.enemyGroup, this.enemyHitCallback, null, this.scene);

    this.on('pointerup', this.onSelection, this);
  }

  update(time, delta) {
    if (time - this.lastShoot >= 1000) {
      this.lastShoot = time;
      this.shoot();
    }

    this.unitBullets.children.entries.forEach((bullet) => {
        bullet.update(time, delta);
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

  onSelection() {
    this.scene.selectedUnitsGroup.add(this);
    this.setTint(0x7878ff);
  }

  moveToMouse(e) {
    // Use moveToObject
    this.scene.physics.moveTo(this, e.x, e.y, null, 500);
  }
}
