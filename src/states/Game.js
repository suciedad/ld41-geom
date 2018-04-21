/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Board from '../classes/Board';
import Player from '../classes/Player';
import Enemy from '../classes/Enemy';
import CountdownTimer from '../classes/Timer';
import ActionManager from '../classes/ActionManager';

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {

    const playerBoard = new Board(this.game, 4)
    const player = new Player(game, playerBoard)
    playerBoard.fill()
    playerBoard.enableClickControl()

    const enemyBoard = new Board(this.game, 4, "enemy")
    const enemy = new Enemy(game, enemyBoard, {
      attack:  2,
      defence: 2,
      heal:    2,
      goldDrop: 3
    })
    enemyBoard.fill()

    let gameTurn = () => {
      playerBoard.disableClickControl()

      enemy.board.makeDecision()

      let playerAct = player.board.createAction()
      let enemyAct = enemy.board.createAction()

      let playerActionManager = new ActionManager(game, playerAct, player, enemy)
      let enemyActionManager = new ActionManager(game, enemyAct, enemy, player)

      player.board.selectedChips.forEach(chip => {
        player.board.toCreatePositions.push({ x: chip.sprite.position.x, y: chip.sprite.position.y })
        chip.fly()
      })
      setTimeout(() => {
        player.board.restoreChips()
      }, 2000)
    }

    const timer = new CountdownTimer(game, gameTurn);
    timer.start()

  }

  render() {
    if (__DEV__) {
      ;
    }
  }
}
