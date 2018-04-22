export default class HP {
  constructor(game, type) {
    this.game = game
    this.type = type

    if (type === "defeated") {
      this.messageText = "DEFEATED"
    }
    if (type === "victory") {
      this.messageText = "VICTORY"
    }
  }

  show() {
    this._text = game.add.text(this.game.world.centerX, this.game.world.centerY, this.messageText, {
      font: '53px Bangers',
      fill: '#064618',
      smoothed: false
    })
    this._text.anchor.setTo(0.5)

    setTimeout(() => {
      if (this.type === "defeated") this.game.shop.show()
      this.hide()
    }, 2000)
  }

  hide() {
    this._text.visible = false
    this._text.destroy()
    this.game.newEnemy()
  }

};
