import { generateType } from '../utils'
import Chip from './Chip'
import Baloon from './Baloon';

export default class Board {
  constructor(game, size, owner, forWho = "player", posColors) {
    const cellSize = 35
    this.cellSize = cellSize
    this._chips = []
    this.selectedChips = []
    this.toCreatePositions = []
    this.shieldChips = []
    this.game = game
    this.owner = owner
    this.forWho = forWho
    this.size = size
    this.padding = 8
    this.pixelSize = (cellSize + this.padding * 2) * size
    this.posColors = posColors


    if (forWho === "player") {
      this.boardPosition = {
        x: game.world.centerX - this.pixelSize / 2,
        y: this.game.height - this.pixelSize - 75
      }
      this.defencePoint = {
        x: game.world.centerX,
        y: game.height - (this.pixelSize / 2 + 75)
      }
      this.atkPoint = {
        x: game.world.centerX,
        y: 0
      }
      this.healPoint = {
        x: game.world.centerX,
        y: game.height - 50
      }
    } else if (forWho === "enemy") {
      this.boardPosition = {
        x: game.world.centerX - this.pixelSize / 2,
        y: 75
      }
      this.atkPoint = {
        x: game.world.centerX,
        y: game.height
      }
      this.defencePoint = {
        x: game.world.centerX,
        y: this.pixelSize / 2 + 75
      }
      this.healPoint = {
        x: game.world.centerX,
        y: 50
      }
    }

  }

  get chips() {
    return this._chips
  }
  set chips(arr) {
    this._chips = arr
  }

  _createChip(x, y) {
    let chip
    if (this.forWho === "enemy") {
      chip = new Chip(this.game, generateType(this.posColors), x, y)
    } else {
      chip = new Chip(this.game, generateType(), x, y)
    }
    chip.board = this

    return chip;
  }

  // Fill game field with chips
  fill() {
    let startPosition = {
      x: this.boardPosition.x + this.padding + this.cellSize / 2,
      y: this.boardPosition.y + this.padding + this.cellSize / 2
    }
    for (let i = 0; i < this.size; i++) {
      let prevChip = this._createChip(
        startPosition.x,
        (this.cellSize + this.padding * 2) * i + startPosition.y
      )
      this.chips.push(prevChip)
      for (let j = 0; j < this.size-1; j++) {
        let chip = this._createChip(0, 0)
        chip.sprite.alignTo(prevChip.sprite, Phaser.RIGHT_CENTER, (this.padding * 2))
        this.chips.push(chip)
        prevChip = chip
      }
    }
  }

  addToSelected(chip) {
    let isEmpty = () => { return this.selectedChips.length === 0 }
    let isSuitableType = (chip) => {
      if (isEmpty()) {
        return true
      }
      return chip.type == this.selectedChips[0].type
    }

    if (isSuitableType(chip)) {
      this.selectedChips.push(chip)
    } else {
      this._clearSelected()
      chip.unselect()
    }
  }

  _clearSelected() {
    this.selectedChips.forEach(chip => {
      chip.unselect()
    })
    this.selectedChips = []
  }

  createAction() {
    // Action types:
    //   1) Attack - red
    //   2) Shield - blue
    //   3) Heal   - green
    //   4) Gold   - yellow
    let takeType = () => {
      let actionType
      let coreElement = this.selectedChips[0]
      let coreElementType = coreElement.type
      let actionColor = coreElementType.split('-')[0]

      if (actionColor === 'red') {
        actionType = 'attack'
      } else if (actionColor === 'blue') {
        actionType = 'shield'
      } else if (actionColor === 'green') {
        actionType = 'heal'
      } else if (actionColor === 'yellow') {
        actionType = 'gold'
      }

      return actionType;
    }

    let takePower = () => {
      return this.selectedChips.length
    }

    if (this.selectedChips.length > 1) {
      let type  = takeType()
      let power = takePower()
      return {type: type, power: power}
    } else if (this.selectedChips.length === 1) {
      this._clearSelected()
      return false
    } else {
      return false
    }

  }

  restoreChips() {
    this.toCreatePositions.forEach(pos => {
      let chip = this._createChip(pos.x, pos.y)
      this.chips.push(chip)
      chip.show()
    })
    this.toCreatePositions = []
    this._clearSelected()
  }

  enableClickControl() {
    this.chips.forEach(chip => {
      let s = chip.sprite

      s.inputEnabled = true
      s.input.useHandCursor = true
      s.events.onInputDown.add(chip._clickHandler, chip)
    })
  }
  disableClickControl() {
    this.chips.forEach(chip => {
      let s = chip.sprite

      s.inputEnabled = false
      s.input.useHandCursor = false
    })
  }

  destroy() {
    this.chips.forEach(chip => {
      chip.boom()
    })
  }

  useAnimation(type, power, cb) {
    let promises = []

    if (type === undefined) {
      Promise.all(promises)
        .then(cb)
    }

    if (type === "attack") {

      this.selectedChips.forEach(chip => {
        this.toCreatePositions.push({ x: chip.sprite.position.x, y: chip.sprite.position.y })
        chip.upToAtk(promises)
      })
      Promise.all(promises)
        .then(() => {
            this.game.camera.shake(0.01, 300)
            let damageValue = this.owner.abils.attack * power

            let target
            let _x
            let _y
            if (this.forWho === "enemy") {
              target = this.game.player
              _x = game.world.centerX + 150
              _y = this.game.height - 100
            } else if (this.forWho === "player") {
              target = this.game.enemy
              _x = game.world.centerX + 150
              _y = 100
            }

            if (target.shield > 0) {
              damageValue -= target.shield
              if (damageValue < 0) damageValue = 0
            }
            target.damage(damageValue)

            let baloon = new Baloon(this.game, "dmg", damageValue, _x, _y)
            baloon.show()
            cb()
          }
        )

    } else if (type === "shield") {

      let _x
      let _y
      if (this.forWho === "enemy") {
        _x = game.world.centerX
        _y = game.world.centerY - 100
      } else if (this.forWho === "player") {
        _x = game.world.centerX
        _y = game.world.centerY + 100
      }
      this.selectedChips.forEach(chip => {
        this.toCreatePositions.push({ x: chip.sprite.position.x, y: chip.sprite.position.y })
        chip.flyToDef(promises)
        this.shieldChips.push(chip)
      })
      Promise.all(promises)
        .then(() => {
          this.owner.shield = this.owner.abils.defence * power

          let baloon = new Baloon(this.game, "shield", this.owner.shield, _x, _y)
          baloon.show()

          cb()
        })

    } else if (type === "heal") {

      this.selectedChips.forEach(chip => {
        this.toCreatePositions.push({ x: chip.sprite.position.x, y: chip.sprite.position.y })
        chip.flyToHeal(promises)
      })
      Promise.all(promises)
        .then(() => {
          let healValue = this.owner.abils.heal * power
          this.owner.heal(healValue)

          let _x
          let _y
          if (this.forWho === "enemy") {
            _x = game.world.centerX + 150
            _y = 100
          } else if (this.forWho === "player") {
            _x = game.world.centerX + 150
            _y = this.game.height - 100
          }
          let baloon = new Baloon(this.game, "heal", healValue, _x, _y)
          baloon.show()

          cb()
        })

    } else if(type === "gold") {

      this.selectedChips.forEach(chip => {
        this.toCreatePositions.push({ x: chip.sprite.position.x, y: chip.sprite.position.y })
        chip.hideForGold(promises)
      })
      Promise.all(promises)
        .then(() => {
            let coinSprite = game.add.sprite(game.world.centerX, -20, "yellow-gold");
            coinSprite.anchor.set(0.5)

            let target = this.game.enemy
            let _x = game.world.centerX + 150
            let _y = this.game.height - 100

            let coinFlyTween = game.add.tween(coinSprite)
              .to({ y: game.height }, 1000, "Linear");

            coinFlyTween.onComplete.add(() => {
              coinSprite.destroy()
              let gainedGold = target.abils.goldDrop * power
              this.owner.gainGold(gainedGold)

              let baloon = new Baloon(this.game, "gold", gainedGold, _x, _y)
              baloon.show()

              cb()
            })

            coinFlyTween.start()
          }
        )
    }
  }

  destroyShield() {
    let _x = this.shieldChips[0].sprite.position.x
    let _y = this.shieldChips[0].sprite.position.y

    let emitter = this.game.add.emitter(_x, _y, 100)
    emitter.makeParticles("blue-triangle")
    emitter.gravity = 0
    emitter.minParticleScale = 1
    emitter.maxParticleScale = 1
    emitter.setAlpha(0.3, 0.3)
    emitter.start(true, 1500, null, 15)

    this.shieldChips.forEach(chip => {
      chip.sprite.destroy()
    })
  }

  // For enemies
  makeDecision() {
    let isDumb        = () => { return this.owner.abils.AI === "dumb"}
    let isSmart       = () => { return this.owner.abils.AI === "smart"}
    let isMasterpiece = () => { return this.owner.abils.AI === "masterpiece"}

    let createGroupsForDecision = () => {
      let groups = {
        "green-triangle": 0,
        "green-square": 0,
        "blue-triangle": 0,
        "blue-square": 0,
        "red-triangle": 0,
        "red-square": 0
      }

      this.chips.forEach(chip => {
        groups[chip.type] += 1
      })

      for (let typeName in groups) {
        if (groups[typeName] < 2) {
          delete groups[typeName]
        }
      }

      return groups
    }

    let groups = createGroupsForDecision()
    let arr = Object.values(groups)
    let min = Math.min(...arr)
    let max = Math.max(...arr)

    let choosedType
    if (isDumb()) {
      for (let typeName in groups) {
        if (groups[typeName] == min) {
          choosedType = typeName
          break
        }
      }
    }
    if (isSmart()) {
      for (let typeName in groups) {
        if ((groups[typeName] > min) && (groups[typeName] <= max)) {
          choosedType = typeName
          break
        }
      }
    }
    if (isMasterpiece()) {
      for (let typeName in groups) {
        if (groups[typeName] === max) {
          choosedType = typeName
          break
        }
      }
    }

    this.chips.forEach(chip => {
      if (chip.type == choosedType) {
        this.selectedChips.push(chip)
      }
    })

  }

};
