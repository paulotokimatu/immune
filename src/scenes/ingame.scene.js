import Unit from "../sprites/unit";
import Enemy from "../sprites/enemy";

class IngameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'IngameScene'
    });

    this.enemyInterval = 0;
  }

  preload() {
    this.load.image('grass-bg', '../assets/grass.png');
    this.load.image('unit', '../assets/star.png');
    this.load.image('bullet', '../assets/bomb.png');
    // this.load.spritesheet('enemy', 
    //     '../assets/dude.png',
    //     { frameWidth: 32, frameHeight: 48 }
    // );
    this.load.spritesheet('macrofago',
        '../assets/macrofago.png',
        { frameWidth: 85, frameHeight: 137 }
    );
  }

  create() {
    this.fillBackground();

    this.keys = {
      isAnyPressed: this.input.activePointer.isDown,
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
    };

    this.text = this.add.text(10, 10, 'sadadas', { font: '48px Arial', fill: '#000000' });

    this.input.on('pointerup', this.clicked, this);

    this.unitGroup = this.physics.add.group();
    this.enemyGroup = this.physics.add.group();
    // this.unit.setInteractive();
  }

  clicked(e) {
    const newUnit = new Unit({scene: this, x: e.x, y: e.y, key: 'unit'});
    this.unitGroup.add(newUnit);
  }

  update(time, delta) {
    const units = this.unitGroup.getChildren();
    Phaser.Actions.Call(units, (unit)  =>{
      unit.update(time, delta);
    }, this);

    Phaser.Actions.Call(this.enemyGroup.getChildren(), (enemy)  =>{
      enemy.update();
    }, this);

    if (time - this.enemyInterval >= 5000) {
      let enemyY = Math.random() * 600 + 10;
      this.enemyInterval = time;
      let test = new Enemy({scene: this, x: 700, y: enemyY, key: 'macrofago'});
      test.scaleX = -1;
      this.enemyGroup.add(test);
    }
  }

  fillBackground() {
    for(let i = 0; i < 800; i = i + 32) {
      for(let j = 0; j < 600; j = j + 32) {
        this.add.sprite(i, j, 'grass-bg').setOrigin(0,0).setAlpha(0.7);
      }
    }
  }
}

export default IngameScene;
