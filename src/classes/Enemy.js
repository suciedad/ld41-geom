import HP from "./HP"
import FinalMessage from "./FinalMessage"

export default class Enemy {
  constructor(game, board, hp, abils) {
    this.game = game
    this.board = board
    this.hp = new HP(game, hp, 10 + 30)
    this._shield = 0

    this.abils = abils
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
      this.animationDeath(() => {
        const message = new FinalMessage(this.game, "victory")
        message.show()
      })
    }
  }
  heal(healValue) {
    this.hp.current = this.hp.current + healValue
    this.hp.changeHpSpriteWidth()
  }

  animationDeath(cb) {
    console.warn("enemy death")
    this.board.destroy()
    this.hp.destroy()
    // let deathTween = game.add
    //   .tween(this.board)
    //   .to({ alpha: 0 }, 1000, "Quart.easeOut")
    // deathTween.start()
    // this.board.destroy()
    // this.hp.destroy()
    cb()
  }

};
