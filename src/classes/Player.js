import HP from "./HP";

// import config from './config';
// import { randomInt, generateId } from './utils.js';

export default class Player {
  constructor(game, board) {
    this.game = game
    this.board = board
    this.hp = new HP(game, 100, game.height - 30 - 10)
    this._shield = 0
    this._credits = 0

    this.abils = {
      attack:  2,
      defence: 2,
      heal:    2
    }
  }

  get credits() {
    return this._credits
  }
  set credits(value) {
    this._credits = value
  }

  get shield() {
    return this._shield
  }
  set shield(value) {
    this._shield = value
  }

  damage(damageValue) {
    this.hp.current = this.hp.current - damageValue
    this.hp.changeHpSpriteWidth()
  }
  heal(healValue) {
    this.hp.current = this.hp.current + healValue
    this.hp.changeHpSpriteWidth()
  }

};
