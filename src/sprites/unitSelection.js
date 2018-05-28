import UnitPreview from "../images/unitPreview";

export default class UnitSelection extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.setInteractive();

    this.cost = config.cost;

    this.on('pointerover', function () {
      this.setTint(0x7878ff);
    });

    this.on('pointerout', function () {
      if(!config.scene.playerState.clickActive) {
        this.clearTint();
      }
    });

    this.on('pointerup', function (pointer) {
      if(this.scene.playerState.money < this.cost) {
        return;
      }

      this.scene.playerState.changeClickActive(!this.scene.playerState.clickActive);
      
      if(this.scene.playerState.clickActive) {
        this.scene.unitPreview = new UnitPreview({scene: this.scene, x: pointer.x, y: pointer.y, key: 'unit'});
        this.setTint(0x7878ff);
      } else {
        this.clearTint();
      }
    });
  }
}