/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Board from '../classes/Board';
import Player from '../classes/Player';
import Enemy from '../classes/Enemy';
import CountdownTimer from '../classes/Timer';

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
      attack:  10,
      defence: 10,
      heal:    10,
      goldDrop: 3
    })
    enemyBoard.fill()

    let gameTurn = () => {
      playerBoard.disableClickControl()

      let action = player.board.createAction()
      console.warn(action)
      if (action.type === 'attack') {
        let damageValue = player.abils.attack * action.power
        enemy.damage(damageValue)
        console.log(`Hit enemy with ${damageValue} damage`);
      }
      if (action.type === 'shield') {
        player.shield = player.abils.defence * action.power
        console.log(`Defence with ${player.shield} shield`);
      }
      if (action.type === 'heal') {
        let healValue = player.abils.heal * action.power
        player.heal(healValue)
        console.log(`Restore ${healValue} HP`);
      }

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

    // setTimeout(gameTurn, 5000)
    // setInterval(gameTurn, 5000)

  }

  render() {
    if (__DEV__) {
      ;
    }
  }
}
