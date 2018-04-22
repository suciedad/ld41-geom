export default class Shop {
  constructor(game, player) {
    this.game = game
    this.player = player
    console.warn(player)

    this.group = game.add.group()

    // Подложка белая
    this._overlay = game.add.tileSprite(0, 0, game.width, game.height, 'overlay')

    // Board picture
    this.imageBg = game.add.tileSprite(
      this.game.world.centerX,
      this.game.world.centerY,
      450,
      450,
      'shopBg'
    )
    this.imageBg.anchor.setTo(0.5, 0.5)

    this.go = game.make.button(0, 0, 'overlay', () => {
      this.hide()
    }, this, 2, 1, 0);
    this.go.alignIn(this.imageBg, Phaser.BOTTOM_CENTER, 0, -20);
    // button.onInputOver.add(over, this);
    // button.onInputOut.add(out, this);

    // Player gold
    this.gold = game.add.text(0, 0, 0, {
      font: '45px Bangers',
      fill: '#ffffff',
      smoothed: false
    })
    this.gold.alignIn(this.imageBg, Phaser.BOTTOM_CENTER, 0, -90);

    // Attack
    let attack = this.createRow("attack")
    attack.alignIn(this.imageBg, Phaser.TOP_LEFT, -40, -40)
    // Defence
    let defence = this.createRow("defence")
    defence.alignIn(attack, Phaser.TOP_LEFT, 0, -70)
    // Heal
    let heal = this.createRow("heal")
    heal.alignIn(defence, Phaser.TOP_LEFT, 0, -70)

    this.group.add(this._overlay)
    this.group.add(this.imageBg)
    this.group.add(this.go)
    this.group.add(this.gold)
    this.group.add(attack)
    this.group.add(defence)
    this.group.add(heal)

    this.group.alpha = 0
    this.group.visible = false;
  }

  createRow(abil) {
    let rowGroup = this.game.add.group()
    rowGroup.currentLevel = 1
    rowGroup.cost = 10

    // Ability title
    let title = `${abil}`
    rowGroup._title = game.add.text(0, 0, title, {
      font: '25px Bangers',
      fill: '#ffffff',
      smoothed: false
    })
    // Current ability power
    rowGroup.current = game.add.text(0, 0, this.player.abils[abil], {
      font: '25px Bangers',
      fill: '#ffffff',
      smoothed: false
    })
    // Buy button
    rowGroup.plus = game.make.button(0, 0, 'overlay', () => {
      this.buy(abil, rowGroup)
    }, this, 2, 1, 0)
    // Price of next upgrade
    rowGroup.price = game.add.text(0, 0, `${this.costManager(rowGroup.currentLevel + 1)}`, {
      font: '25px Bangers',
      fill: '#ffffff',
      smoothed: false
    })

    rowGroup.current.alignIn(rowGroup._title, Phaser.LEFT_CENTER, -100, 0)
    rowGroup.plus.alignIn(rowGroup.current, Phaser.LEFT_CENTER, -70, 5)
    rowGroup.price.alignIn(rowGroup.plus, Phaser.LEFT_CENTER, -50, -5)

    rowGroup.add(rowGroup._title)
    rowGroup.add(rowGroup.current)
    rowGroup.add(rowGroup.plus)
    rowGroup.add(rowGroup.price)

    return rowGroup
  }

  buy(abil, group) {
    let playerHasGold = (cost) => { return this.player.gold >= cost }
    let cost = this.costManager(group.currentLevel+1)

    console.warn(this.player.gold, cost);
    console.warn(playerHasGold(cost));

    if (playerHasGold(cost)) {
      let abilPlusValue
      if (abil === "attack") {
        abilPlusValue = 3
      }
      if (abil === "defence") {
        abilPlusValue = 2
      }
      if (abil === "heal") {
        abilPlusValue = 1
      }
      this.player.abils[abil] += abilPlusValue
      group.currentLevel += 1
  
      this.player.gold -= cost
      this.gold.text = this.player.gold
  
      group.price.text = this.costManager(group.currentLevel + 1)
      group.current.text = this.player.abils[abil]
    }
  }

  // OH GOD SORRY FOR THIS, SOMEONE TAKE ME TO CHURCH
  costManager(level) {
    if (level >= 10) {
      return 2000
    }
    if (level === 2) {
      return 10
    }
    if (level === 3) {
      return 20
    }
    if (level === 4) {
      return 40
    }
    if (level === 5) {
      return 80
    }
    if (level === 6) {
      return 150
    }
    if (level === 7) {
      return 300
    }
    if (level === 8) {
      return 600
    }
    if (level === 9) {
      return 1000
    }
  }

  show() {
    this.group.visible = true
    this.game.world.bringToTop(this.group)
    this.gold.text = this.player.gold

    let showShopTween = game.add
      .tween(this.group)
      .to({ alpha: 1 }, 1000, "Quart.easeOut")
    showShopTween.start()
  }

  hide() {
    // this.group.alpha = 0

    let hideShopTween = game.add
      .tween(this.group)
      .to({ alpha: 0 }, 1000, "Quart.easeOut")

    hideShopTween.onComplete.add(() => {
      this.group.visible = false
      setTimeout(this.game.restart, 1000)
    })
    hideShopTween.start()
  }

};