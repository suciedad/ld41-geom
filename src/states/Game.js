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

    const priorites = {
      attack: 1,
      shield: 2,
      heal: 0,
      gold: 3
    }

    const parallelAnims = (type1, type2, cb) => {
      let promises = []

      let ps1 = new Promise((resolve) => {
        player.board.useAnimation(type1, resolve)
      })
      promises.push(ps1)
      
      let ps2 = new Promise((resolve) => {
        game.enemy.board.useAnimation(type2, resolve)
      })
      promises.push(ps2)

      Promise.all(promises)
        .then(cb)
    }
    const queueAnims = (type1, p1, type2, p2, cb) => {
      p1.board.useAnimation(type1, () => {
        p2.board.useAnimation(type2, () => {
          cb()
        })
      })
    }

    let removeFromBoard = (person) => {
      person.board.selectedChips.forEach(chip => {
        // Remove chip from board.chips
        person.board.chips.forEach((el, index) => {
          if ((el !== undefined) && (el.id === chip.id)) {
            person.board.chips[index] = undefined
          }
        })
      })
      // Remove undefined from board.chips
      person.board.chips = person.board.chips.filter(el => el !== undefined)
    }
    let afterAnimation = (playerAct, enemyAct) => {
      let actionManager = new ActionManager(game, player, playerAct, game.enemy, enemyAct)

      removeFromBoard(player)
      removeFromBoard(game.enemy)

      clearAll()
    }
    let gameTurn = () => {
      playerBoard.disableClickControl()

      game.enemy.board.makeDecision()

      let playerAct = player.board.createAction()
      let enemyAct = game.enemy.board.createAction()
      console.warn(playerAct, enemyAct);

      // console.warn(priorites[playerAct.type], priorites[enemyAct.type]);
      if (priorites[playerAct.type] === undefined) {
        game.enemy.board.useAnimation(enemyAct.type, () => {
          afterAnimation(playerAct, enemyAct)
        })
      } else if (priorites[enemyAct.type] === undefined) {
        player.board.useAnimation(playerAct.type, () => {
          afterAnimation(playerAct, enemyAct)
        })
      }
      if (priorites[playerAct.type] === priorites[enemyAct.type]) {
        parallelAnims(playerAct.type, enemyAct.type, () => {
          afterAnimation(playerAct, enemyAct)
        })
      } else if (priorites[playerAct.type] > priorites[enemyAct.type]) {
        queueAnims(playerAct.type, player, enemyAct.type, game.enemy, () => {
          afterAnimation(playerAct, enemyAct)
        })
      } else if (priorites[playerAct.type] < priorites[enemyAct.type]) {
        queueAnims(enemyAct.type, game.enemy, playerAct.type, player, () => {
          afterAnimation(playerAct, enemyAct)
        })
      }
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
