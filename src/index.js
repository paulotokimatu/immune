import Phaser from 'phaser';

import IngameScene from './scenes/ingame.scene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade'
  },
  scene: IngameScene
};

const game = new Phaser.Game(config);
