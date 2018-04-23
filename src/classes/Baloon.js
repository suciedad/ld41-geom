export default class Baloon {
  constructor(game, type, value, x, y) {
    this.game = game
    this.type = type
    this.x = x
    this.y = y

    if (type === "dmg") {
      this.messageText = `-${value}`
    }
    if (type === "heal") {
      this.messageText = `+${value}`
    }
    if (type === "shield") {
      this.messageText = `BLOCK ${value} DMG`
    }
    if (type === "gold") {
      this.messageText = `+${value}`
    }
  }

  show() {
    let color
    if (this.type === 'dmg') {
      color = "#e74c3c"
    } else if (this.type === 'heal') {
      color = "#2ecc71"
    } else if (this.type === 'shield') {
      color = "#3498db"
    } else if (this.type === 'gold') {
      color = "#f1c40f"
    }

    this._text = game.add.text(this.x, this.y, this.messageText, {
      font: '38px Bangers',
      fill: color,
      smoothed: false
    })
    this._text.anchor.setTo(0.5)

    let tween = game.add.tween(this._text)
      .to({ y: this._text.position.y-20, alpha: 0 }, 5000, "Quart.easeOut")
    tween.onComplete.add(() => {
      this._text.visible = false
      this._text.destroy()
    })
    tween.start()

  }

};
