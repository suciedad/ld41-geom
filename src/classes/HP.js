// import config from './config';
// import { randomInt, generateId } from './utils.js';

const HpSpriteWidth = 500

export default class HP {
  constructor(game, value, posY) {
    this.game = game
    this._max = value
    this._current = value

    // this._sprite = game.add.sprite(x, y, 'hp');
    this._sprite = game.add.tileSprite(
      game.world.centerX,
      posY,
      HpSpriteWidth, 30, 'hp'
    )
    this._sprite.anchor.setTo(0.5);
  }

  get max() {
    return this._max
  }
  get current() {
    return this._current
  }
  set current(value) {
    if (value > this._max) {
      this._current = this._max
    } else {
      this._current = value
    }
  }

  changeHpSpriteWidth() {
    let newWidth = HpSpriteWidth / this.max * this.current
    console.warn(newWidth)

    let hpWidthTween = game
      .add
      .tween(this._sprite)
      .to({width: newWidth}, 1000, "Quart.easeOut")
    hpWidthTween.start()

    // this._sprite.width = HpSpriteWidth / this.max * this.current
  }

};
