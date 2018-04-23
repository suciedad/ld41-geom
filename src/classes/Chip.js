import { generateId } from '../utils.js';

export default class Chip {
  constructor(game, type, x, y) {
    this._id = generateId()
    this._type = type
    this._isSelected = false
    this.game = game

    // Chip image
    this.sprite = game.add.sprite(x, y, type);
    // this.sprite = game.add.tileSprite(x, y, 35, 35, type)
    this.sprite.anchor.set(0.5)

    // this.show();
  }

  _clickHandler() {
    if (!this.isSelected) {
      this.select()
      this.board.addToSelected(this)
    }
  }

  get id() {
    return this._id;
  }

  // set type(value) {
  //   return this._type = value;
  // }
  get type() {
    return this._type;
  }

  set isSelected(val) {
    return this._isSelected = val
  }
  get isSelected() {
    return this._isSelected
  }

  select() {
    this.isSelected = true
    // let _y = this.sprite.position.y
    // let tween = game.add.tween(this.sprite)
    //   .to({y: _y - 5}, 300, "Quart.easeOut");
    // tween.start()
    this.sprite.scale.setTo(1.3, 1.3)
  }
  unselect() {
    this.isSelected = false
    // let _y = this.sprite.position.y
    // let tween = game.add.tween(this.sprite)
    //   .to({ y: _y + 5 }, 300, "Quart.easeOut");
    // tween.start()
    this.sprite.scale.setTo(1, 1)
  }

  fly() {
    const tweenTime = 1000
    const unitePosition = { x: game.world.centerX, y: game.world.centerY }

    let flyTween = game
      .add
      .tween(this.sprite)
      .to(unitePosition, tweenTime, "Quart.easeOut");

    // Without promise
    // flyTween.onComplete.add(this.hide, this)

    // With promise
    let promise = new Promise((resolve) => {
      flyTween.onComplete.add(() => {
        resolve()
        this.hide()
      }, this)
    })
    this.game.promises.push(promise)
    flyTween.start()
  }

  flyToDef(promises) {
    const tweenTime = 1000

    let flyTween = game.add.tween(this.sprite)
      .to({
        x: this.board.defencePoint.x,
        y: this.board.defencePoint.y,
        alpha: 0.4
      }, tweenTime, "Quart.easeIn");

    let increaseTween = game.add.tween(this.sprite.scale)
      .to({
        x: 7,
        y: 7
      }, tweenTime, "Quart.easeIn");

    let promise = new Promise((resolve) => {
      flyTween.onComplete.add(() => {
        // this.boom()
        resolve()
      }, this)
    })
    promises.push(promise)

    increaseTween.start()
    flyTween.start()
  }
  flyToHeal(promises) {
    const tweenTime = 1000

    let flyTween = game.add.tween(this.sprite)
      .to(
        {
          x: this.board.healPoint.x,
          y: this.board.healPoint.y,
          alpha: 0.2
        }, tweenTime, "Quart.easeIn");

    let promise = new Promise((resolve) => {
      flyTween.onComplete.add(() => {
        this.hide()
        resolve()
      }, this)
    })
    promises.push(promise)

    flyTween.start()
  }
  upToAtk(promises) {
    const tweenTime = 500

    let upTween = game.add.tween(this.sprite)
      // .to({y: this.sprite.position.y - 10}, tweenTime, "Quart.easeOut");
      .to(this.board.atkPoint, tweenTime, "Quart.easeIn");

    let promise = new Promise((resolve) => {
      upTween.onComplete.add(() => {
        this.boom()
        resolve()
      }, this)
    })
    promises.push(promise)

    upTween.start()
  }
  hideForGold(promises) {
    const tweenTime = 500

    let hideTween = game.add.tween(this.sprite)
      .to({alpha: 0}, tweenTime, "Linear");

    let promise = new Promise((resolve) => {
      hideTween.onComplete.add(() => {
        this.sprite.destroy()
        resolve()
      }, this)
    })
    promises.push(promise)

    hideTween.start()
  }

  show() {
    const tweenTime = 500
    // let showTween = game
    //   .add
    //   .tween(this.sprite.scale)
    //   .from(0)
    //   .to(1, tweenTime, "Quart.easeOut");
    // showTween.start()
  }
  hide() {
    this.sprite.destroy()
  }
  boom() {
    let _x = this.sprite.position.x
    let _y = this.sprite.position.y

    let emitter = this.game.add.emitter(_x, _y, 100);
    emitter.makeParticles(this.type);
    emitter.gravity = 0;
    emitter.minParticleScale = 0.15;
    emitter.maxParticleScale = 0.30;
    emitter.start(true, 1500, null, 10);

    this.sprite.destroy()
  }
  fadeBoom() {
    let tween = game.add.tween(this.sprite)
      .to({ alpha: 0, scale: 1.5 }, 500, "Linear");

    tween.onComplete.add(() => {
      this.sprite.destroy()
    })

    tween.start()

  }
};
