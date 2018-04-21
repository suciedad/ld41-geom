export default class ActionManager {
  constructor(game, action, self, target) {
    this.game   = game
    this.action = action
    this.self   = self
    this.target = target
    console.warn(action);

    this.manage(action)
  }

  manage(action) {
    if (action.type === 'attack') {
      this.attack(action.power)
    }
    else if (action.type === 'shield') {
      this.shield(action.power)
    }
    else if (action.type === 'heal') {
      this.heal(action.power)
    }
  }

  attack(power) {
    let damageValue = this.self.abils.attack * power
    this.target.damage(damageValue)
  }
  shield(power) {
    this.self.shield = this.self.abils.defence * power
  }
  heal(power) {
    let healValue = this.self.abils.heal * power
    this.self.heal(healValue)
  }

};
