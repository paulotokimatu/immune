export default class PlayerState {
  constructor() {
    this.money = 100;
    this.clickActive = false;
  }

  changeMoney(value) {
    this.money += value;
  }

  changeClickActive(newValue) {
    this.clickActive = newValue;
  }
}