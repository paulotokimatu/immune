export default class UnitSelection extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.setInteractive();

    this.on('pointerover', function () {
      this.setTint(0x7878ff);
    });

    this.on('pointerout', function () {
      if(!config.scene.playerState.clickActive) {
        this.clearTint();
      }
    });

    this.on('pointerup', function () {
      config.scene.playerState.changeClickActive(!config.scene.playerState.clickActive);
      if(config.scene.playerState.clickActive) {
        this.setTint(0x7878ff);
      } else {
        this.clearTint();
      }
    });
  }
}