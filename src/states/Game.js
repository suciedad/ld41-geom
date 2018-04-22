/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Board from '../classes/Board';
import Player from '../classes/Player';
import Enemy from '../classes/Enemy';
import CountdownTimer from '../classes/Timer';
import ActionManager from '../classes/ActionManager';
import Shop from '../classes/Shop';
import enemies from '../enemies';

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    const enemiesList = enemies.list;
    let currentEnemyIndex = 0;

    let createEnemy = (index) => {
      let enemyStats = enemiesList[index]
      let enemyBoard = new Board(this.game, enemyStats.boardSize, "enemy")
      let enemy = new Enemy(game, enemyBoard, enemyStats.hp, enemyStats.abils)
      enemyBoard.fill()

      return enemy
    }

    let clearAll = () => {
      player.board._clearSelected()
      game.enemy.board._clearSelected()
      gameTurn.promises = []

      player.shield     = 0
      game.enemy.shield = 0

      if (!game.isEnd) {
        game.enemy.board.restoreChips()
        player.board.restoreChips()
        player.board.enableClickControl()
        timer.restore()
      }
    }

    let flyChips = (person) => {
      person.board.selectedChips.forEach(chip => {
        // Remove chip from board.chips
        person.board.chips.forEach((el, index) => {
          if ((el !== undefined) && (el.id === chip.id)) {
            person.board.chips[index] = undefined
          }
        })

        person.board.toCreatePositions.push({ x: chip.sprite.position.x, y: chip.sprite.position.y })
        chip.fly()
      })
      // Remove undefined from board.chips
      person.board.chips = person.board.chips.filter(el => el !== undefined)
    }

    let gameTurn = () => {
      playerBoard.disableClickControl()

      game.enemy.board.makeDecision()

      let playerAct = player.board.createAction()
      let enemyAct = game.enemy.board.createAction()
      let actionManager = new ActionManager(game, player, playerAct, game.enemy, enemyAct)

      // Old manager
      // let playerActionManager = new ActionManager(game, playerAct, player, game.enemy)
      // let enemyActionManager = new ActionManager(game, enemyAct, game.enemy, player)
      game.camera.shake(0.01, 300);
      flyChips(player)
      flyChips(game.enemy)

      player.board.chips = player.board.chips.filter(el => el !== undefined)

      Promise.all(game.promises)
        .then(clearAll)
    }

    game.restart = () => {
      game.isEnd = false
      currentEnemyIndex = 0
      game.enemy = createEnemy(currentEnemyIndex)
      player.restoreHp()
      player.board.restoreChips()
      player.board.enableClickControl()
      timer.restore()
    }

    game.newEnemy = () => {
      game.isEnd = false
      currentEnemyIndex += 1
      game.enemy = createEnemy(currentEnemyIndex)
      player.restoreHp()
      player.board.restoreChips()
      player.board.enableClickControl()
      timer.restore()
    }



    game.promises = []
    game.isEnd = false

    const playerBoard = new Board(this.game, 4)
    const player = new Player(game, playerBoard)
    playerBoard.fill()
    playerBoard.enableClickControl()

    game.enemy = createEnemy(currentEnemyIndex)

    game.shop = new Shop(game, player)

    const timer = new CountdownTimer(game, gameTurn);
    timer.start()

  }

  render() {
    if (__DEV__) {
      ;
    }
  }
}
