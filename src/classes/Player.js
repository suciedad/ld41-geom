import HP from "./HP";
import FinalMessage from "./FinalMessage";

export default class Player {
  constructor(game, board) {
    this.game = game
    this.board = board
    this.hp = new HP(game, 100, game.height - 30 - 10)
    this._shield = 0
    this._gold = 0

    this.abils = {
      attack:  3,
      defence: 2,
      heal:    1
    }
  }

  get gold() {
    return this._gold
  }
  set gold(value) {
    this._gold = value
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
    if (this.hp.current === 0) {
      this.game.isEnd = true
      const message = new FinalMessage(this.game, "defeated")
      message.show()
    }
  }
  heal(healValue) {
    this.hp.current = this.hp.current + healValue
    this.hp.changeHpSpriteWidth()
  }
  restoreHp() {
    this.hp.current = this.hp.max
    this.hp.changeHpSpriteWidth()
  }
  gainGold(goldValue) {
    this.gold += goldValue
  }

};
