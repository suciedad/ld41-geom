import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.image('board',    'assets/images/board.png')
    this.load.image('hp',       'assets/images/hp_sprite.png')
    this.load.image('hpbg',     'assets/images/hpbg_sprite.png')
    this.load.image('timer',    'assets/images/timer_sprite.png')
    this.load.image('overlay',  'assets/images/overlay.png')
    this.load.image('shopBg',   'assets/images/shopBg.png')
    this.load.image('plus',     'assets/images/plus.png')
    this.load.image('go',       'assets/images/go.png')
    // triangles
    this.load.image('red-triangle',   'assets/images/red-triangle.png')
    this.load.image('blue-triangle',  'assets/images/blue-triangle.png')
    this.load.image('green-triangle', 'assets/images/green-triangle.png')
    // squares
    this.load.image('red-square',   'assets/images/red-square.png')
    this.load.image('blue-square',  'assets/images/blue-square.png')
    this.load.image('green-square', 'assets/images/green-square.png')
    // gold
    this.load.image('yellow-gold', 'assets/images/yellow-gold.png')
  }

  create () {
    this.state.start('Game')
  }
}
