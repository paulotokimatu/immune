import Unit from "../sprites/unit";
import Enemy from "../sprites/enemy";
import UnitPreview from "../images/unitPreview";
import UnitSelection from "../sprites/unitSelection";
import PlayerState from "../states/player.state";
import makeAnimations from "../animations/animations";

class IngameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'IngameScene'
    });

    this.enemyInterval = 0;
    this.enemyCoordinates = {
    }
    this.cost = {
      unit: 20
    };
  }

  preload() {
    this.load.image('grass-bg', '../assets/grass.png');
    this.load.image('unit', '../assets/star.png');
    this.load.image('bullet', '../assets/bomb.png');
    this.load.image('block', '../assets/block.png');
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
    makeAnimations(this);
    
    this.fillBackground();

    this.playerState = new PlayerState;
    this.moneyText = this.add.text(10, 10, this.playerState.money, { font: '48px Arial', fill: '#FFFFFF' });

    this.unitButtonsGroup = this.add.group();
    this.unitGroup = this.physics.add.group();
    this.selectedUnitsGroup = this.physics.add.group();
    this.enemyGroup = this.physics.add.group();

    this.unitButtonsGroup.add(new UnitSelection({scene: this, x: 500, y: 500, key: 'block', cost: 20}));

    this.input.mouse.disableContextMenu();
    this.input.on('pointerdown', this.onMouseClick, this);
  }

  update(time, delta) {
    this.updateAllChildren(this.unitGroup, time, delta);
    this.updateAllChildren(this.enemyGroup, time, delta);

    if (this.playerState.clickActive) {
      this.unitPreview.update();
    }
    // if (time - this.enemyInterval >= 5000) {
    //   let enemyY = Math.random() * 600 + 10;
    //   this.enemyInterval = time;
    //   let test = new Enemy({scene: this, x: 700, y: enemyY, key: 'macrofago'});
    //   test.scaleX = -1;
    //   this.enemyGroup.add(test);
    // }
  }

  fillBackground() {
    for(let i = 0; i < 800; i = i + 32) {
      for(let j = 0; j < 600; j = j + 32) {
        this.add.sprite(i, j, 'grass-bg').setOrigin(0,0).setAlpha(0.7);
      }
    }
  }

  onMouseClick(e) {
    if (e.leftButtonDown()) {
      this.addUnit(e);
    } else if (e.rightButtonDown()) {
      this.moveUnits(e);
    }
  }

  addUnit(e) {
    if(this.playerState.clickActive && this.playerState.money >= this.cost.unit) {
      const newUnit = new Unit({scene: this, x: e.x, y: e.y, key: 'unit'});
      this.unitGroup.add(newUnit);
      this.unitPreview.remove();
      this.playerState.changeMoney(-newUnit.cost);
      this.playerState.changeClickActive(!this.playerState.clickActive);
      this.moneyText.setText(this.playerState.money);
    }
  }

  moveUnits(e) {
    Phaser.Actions.Call(this.selectedUnitsGroup.getChildren(), (unit)  =>{
      console.log('test');
      unit.moveToMouse(e);
    }, this);
  }

  updateAllChildren(group, time, delta) {
    Phaser.Actions.Call(group.getChildren(), (single)  =>{
      single.update(time, delta);
    }, this);
  }
}

export default IngameScene;
