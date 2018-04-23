const countdownTime = 5000
const restoreTime   = 700

export default class CountdownTimer {
  constructor(game, cb) {
    this.game = game
    this.cb = cb

    this._leftSprite = game.add.tileSprite(
      0,
      game.world.centerY,
      1, 40, 'timer'
    )
    this._rightSprite = game.add.tileSprite(
      game.width,
      game.world.centerY,
      1, 40, 'timer'
    )

    this._leftSprite.anchor.setTo(0, 0.5)
    this._rightSprite.anchor.setTo(1, 0.5)

  }

  start() {
    let leftSpriteTween = game.add.tween(this._leftSprite)
      .to({ width: 0 }, countdownTime, "Linear")
    let rightSpriteTween = game.add.tween(this._rightSprite)
      .to({ width: 0 }, countdownTime, "Linear")


    leftSpriteTween.onComplete.add(() => {
      this.cb()
    }, this)

    leftSpriteTween.start()
    rightSpriteTween.start()
  }
  restore() {
    let leftSpriteTween = game.add.tween(this._leftSprite)
      .to({ width: game.width / 2 }, restoreTime, Phaser.Easing.Quintic.In)
    let rightSpriteTween = game.add.tween(this._rightSprite)
      .to({ width: game.width / 2 }, restoreTime, Phaser.Easing.Quintic.In)

    leftSpriteTween.onComplete.add(() => {
      game.camera.shake(0.007, 300, true, Phaser.Camera.SHAKE_HORIZONTAL);
      setTimeout(() => {
        this.start()
      }, 500)
    }, this)

    leftSpriteTween.start()
    rightSpriteTween.start()
  }

};
