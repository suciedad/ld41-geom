// import Phaser from 'phaser'

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
      .to({ width: 0 }, 5000, "Linear")
    timerTween.onComplete.add(() => {
      this.cb()
      this.restore()
    }, this)
    timerTween.start()
  }
  restore() {
    let timerTween = game.add
      .tween(this.sprite)
      .to({ width: game.width }, 700, Phaser.Easing.Quintic.Out)
    timerTween.start()
  }

};
