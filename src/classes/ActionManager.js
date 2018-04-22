// export default class ActionManager {
//   constructor(game, action, self, target) {
//     this.game   = game
//     this.action = action
//     this.self   = self
//     this.target = target

//     this.manage(action)
//   }

//   manage(action) {
//     if (action.type === 'attack') {
//       this.attack(action.power)
//     }
//     else if (action.type === 'shield') {
//       this.shield(action.power)
//     }
//     else if (action.type === 'heal') {
//       this.heal(action.power)
//     }
//   }

//   attack(power) {
//     let damageValue = this.self.abils.attack * power
//     this.target.damage(damageValue)
//   }
//   shield(power) {
//     this.self.shield = this.self.abils.defence * power
//   }
//   heal(power) {
//     let healValue = this.self.abils.heal * power
//     this.self.heal(healValue)
//   }

// };


export default class ActionManager {
  constructor(game, player, playerAct, enemy, enemyAct) {
    this.game      = game
    this.player    = player
    this.enemy     = enemy
    this.playerAct = playerAct
    this.enemyAct  = enemyAct

    console.warn(playerAct.type, enemyAct.type);
    if (playerAct.type === "shield") {
      this.manage(playerAct, player, enemy)
      this.manage(enemyAct, enemy, player)
    } else if (enemyAct.type === "shield") {
      this.manage(enemyAct, enemy, player)
      this.manage(playerAct, player, enemy)
    } else {
      this.manage(playerAct, player, enemy)
      this.manage(enemyAct, enemy, player)
    }
  }

  manage(action, self, target) {
    if (action.type === 'attack') {
      this.attack(action.power, self, target)
    }
    else if (action.type === 'shield') {
      this.shield(action.power, self)
    }
    else if (action.type === 'heal') {
      this.heal(action.power, self)
    }
    else if (action.type === 'gold') {
      this.gold(action.power, self, target)
    }
  }

  attack(power, self, target) {
    let damageValue = self.abils.attack * power
    console.warn(`Значение щита - ${target.shield}`);
    if (target.shield > 0) {
      console.warn(damageValue, "урон до щита");
      damageValue -= target.shield
      if (damageValue < 0) damageValue = 0
      console.warn(`Применен щит со значением ${target.shield}`);
      console.warn(damageValue, "урон после применения щита");
    }
    target.damage(damageValue)
  }
  shield(power, self) {
    self.shield = self.abils.defence * power
  }
  heal(power, self) {
    let healValue = self.abils.heal * power
    self.heal(healValue)
  }
  gold(power, self, target) {
    let gainedGold = target.abils.goldDrop * power
    console.warn(`Steal ${gainedGold} gold`);
    self.gainGold(gainedGold)
    console.warn(self.gold);
  }

};
