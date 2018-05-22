export default class PlayerState {
  constructor() {
    this.money = 100;
  }

  changeMoney(value) {
    this.money += value;
  }
}