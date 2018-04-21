const countdownTime = 5000
const restoreTime   = 700

export default class CountdownTimer {
  constructor(game, cb) {
    this.game = game
    this.cb = cb

    this.sprite = game.add.tileSprite(
      game.world.centerX,
      game.world.centerY,
      game.width, 40, 'timer'
    )

    this.sprite.anchor.setTo(0.5, 0.5)
  }

  start() {
    let timerTween = game.add
      .tween(this.sprite)
      .to({ width: 0 }, countdownTime, "Linear")
    timerTween.onComplete.add(() => {
      this.cb()
      this.restore()
    }, this)
    timerTween.start()
  }
  restore() {
    let timerTween = game.add
      .tween(this.sprite)
      .to({ width: game.width }, restoreTime, Phaser.Easing.Quintic.Out)
    timerTween.start()
  }

};
