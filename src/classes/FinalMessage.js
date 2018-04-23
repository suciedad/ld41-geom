export default class HP {
  constructor(game, type) {
    this.game = game
    this.type = type

    if (type === "defeated") {
      this.messageText = "YOU DEFEATED"
    }
    if (type === "victory") {
      this.messageText = "ENEMY DEFEATED"
    }
  }

  show() {
    this._text = game.add.text(this.game.world.centerX, this.game.world.centerY, this.messageText, {
      font: '53px Bangers',
      fill: '#000000',
      smoothed: false
    })
    this._text.anchor.setTo(0.5)

    setTimeout(() => {
      if (this.type === "defeated") {
        this.hide()
        this.game.shop.show()
      } else {
        this.hide()
        this.game.newEnemy()
      }
    }, 2000)
  }

  hide() {
    this._text.visible = false
    this._text.destroy()
  }

};
