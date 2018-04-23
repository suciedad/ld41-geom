const HpSpriteWidth = 500

export default class HP {
  constructor(game, value, posY) {
    this.game = game
    this._max = value
    this._current = value

    // HP line
    this._spriteBg = game.add.tileSprite(
      game.world.centerX,
      posY,
      HpSpriteWidth, 30, 'hpbg'
    )
    this._spriteBg.anchor.setTo(0.5);
    this._sprite = game.add.tileSprite(
      game.world.centerX,
      posY,
      HpSpriteWidth, 30, 'hp'
    )
    this._sprite.anchor.setTo(0.5);

    let hpText = `${this._current} / ${this._max}`
    this._text = game.add.text(game.world.centerX, posY, hpText, {
      font: '25px Bangers',
      fill: '#ffffff',
      smoothed: false
    })
    // this._text.padding.set(10, 16)
    this._text.anchor.setTo(0.5)
  }

  get max() {
    return this._max
  }
  set max(value) {
    this._max = value
  }
  get current() {
    return this._current
  }
  set current(value) {
    if (value > this._max) {
      this._current = this._max
    } else if (value < 0) {
      this._current = 0
    } else {
      this._current = value
    }
  }

  changeHpSpriteWidth() {
    this._text.text = `${this._current} / ${this._max}`

    let newWidth = HpSpriteWidth / this.max * this.current

    let hpWidthTween = game
      .add
      .tween(this._sprite)
      .to({width: newWidth}, 1000, "Quart.easeOut")
    hpWidthTween.start()
  }

  destroy() {
    let hpAway = game.add
      .tween(this._sprite)
      .to({ y: -20 }, 1500, "Quart.easeOut")
    hpAway.start()

    let hpBgAway = game.add
      .tween(this._spriteBg)
      .to({ y: -20 }, 1500, "Quart.easeOut")
    hpBgAway.start()

    let textAway = game.add
      .tween(this._text)
      .to({ y: -20 }, 1500, "Quart.easeOut")
    textAway.start()
  }

};
