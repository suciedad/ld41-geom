import { generateType } from '../utils'
import Chip from './Chip'

export default class Board {
  constructor(game, size, owner = "player") {
    const cellSize = 50

    this._chips = []
    this.selectedChips = []
    this.toCreatePositions = []
    this.game = game
    this.owner = owner
    this.size = size
    this.pixelSize = size * (cellSize+11)

    if (owner === "player") {
      this.boardPosition = {
        x: this.game.width / 2 - this.pixelSize / 2,
        y: this.game.height - this.pixelSize - 50
      }
    } else if (owner === "enemy") {
      this.boardPosition = {
        x: this.game.width / 2 - this.pixelSize / 2,
        y: cellSize + 50
      }
    }

    // Board picture
    // this.imageBg = game.add.image(this.boardPosition.x, this.boardPosition.y, 'board')
  }

  get chips() {
    return this._chips
  }
  set chips(arr) {
    this._chips = arr
  }

  _createChip(x, y) {
    let chip
    if (this.owner === "enemy") {
      chip = new Chip(this.game, generateType(['red', 'blue']), x, y)
    } else {
      chip = new Chip(this.game, generateType(), x, y)
    }
    chip.board = this

    return chip;
  }

  // handleConcurrences(chipsToRemove) {
    
  // }
  // Fill game field with chips
  fill() {
    let startPosition = { x: this.boardPosition.x, y: this.boardPosition.y }
    for (let i = 0; i < this.size; i++) {
      let prevChip = this._createChip(startPosition.x, (45+22) * i + startPosition.y)
      this.chips.push(prevChip)
      for (let j = 0; j < this.size-1; j++) {
        let chip = this._createChip(0, 0)
        chip.sprite.alignTo(prevChip.sprite, Phaser.RIGHT_CENTER, 22)
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
      console.warn(`${type} with x${power} power!`);
      return {type: type, power: power}
    } else if (this.selectedChips.length === 1) {
      this._clearSelected()
      console.warn('no action with one chip :(');
      return false
    } else {
      console.warn('no action :(');
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

  // hint() {
  //   let arr = []

  //   let makeChunks = (array) => {
  //     let result = [];
  //     let uniqValues = [];

  //     for (let i = 0; i < array.length; i++) {
  //       const value = array[i].value;
  //       if (uniqValues.indexOf(value) < 0) {
  //         uniqValues.push(value);
  //       }
  //     }

  //     for (let i = 0; i < uniqValues.length; i++) {
  //       const uniqValue = uniqValues[i];
  //       let chunk = array.filter((el) => {
  //         return el.value === uniqValue;
  //       });
  //       result.push(chunk);
  //     }

  //     return result;
  //   }

  //   // sort in asc
  //   arr = this.chips.sort((a, b) => { return a.value - b.value });
  //   // split to groups by value
  //   arr = makeChunks(arr);
  //   // remove too small
  //   arr = arr.filter((chunk) => { return chunk.length >= config.chipsToCheckCount; });
  //   let randomChunk = getRandomElement(arr);
  //   for (let i = 0; i < config.chipsToCheckCount; i++) {
  //     const chip = randomChunk[i];
  //     chip.shake();
  //   }
  // }





  // For enemies
  makeDecision() {
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
    for (let typeName in groups) {
      if (groups[typeName] == min) {
        choosedType = typeName
        break
      }
    }

    this.chips.forEach(chip => {
      if (chip.type == choosedType) {
        this.selectedChips.push(chip)
      }
    })

  }




};
