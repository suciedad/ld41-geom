import HP from "./HP";

// import config from './config';
// import { randomInt, generateId } from './utils.js';

export default class Enemy {
  constructor(game, board, abils) {
    this.game = game
    this.board = board
    this.hp = new HP(game, 100, 10 + 30)
    this._shield = 0

    this.abils = abils
  }

  damage(damageValue) {
    this.hp.current = this.hp.current - damageValue
    this.hp.changeHpSpriteWidth()
  }

};
