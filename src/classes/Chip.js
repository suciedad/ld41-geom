import { generateId } from '../utils.js';

export default class Chip {
  constructor(game, type, x, y) {
    this._id = generateId()
    this._type = type
    this._isSelected = false
    this.game = game

    // Chip image
    this.sprite = game.add.sprite(x, y, type);
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
    this.sprite.scale.setTo(1.2, 1.2)
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
  // shake() {
  //   // Tween animation
  //   let tween = PIXI.tweenManager.createTween(this.container);
  //   tween.easing = PIXI.tween.Easing.linear();
  //   //  kill tween when complete
  //   tween.expire = true;
  //   tween.from({
  //     rotation: 0
  //   });
  //   tween.to({
  //     rotation: PIXI.DEG_TO_RAD * 20
  //   });
  //   tween.pingPong = true;
  //   tween.time = config.chipAnimationTime.shake;
  //   tween.on('end', () => {
  //     tween.stop();
  //   });
  //   tween.start();
  // }
  // show() {
  //   // Tween animation
  //   let tween = PIXI.tweenManager.createTween(this.container);
  //   tween.time = config.chipAnimationTime.show;
  //   tween.easing = PIXI.tween.Easing.outBack();
  //   //  kill tween when complete
  //   tween.expire = true;
  //   tween.from({
  //     scale: { x: 0, y: 0 }
  //   });
  //   tween.to({
  //     scale: { x: 1, y: 1 }
  //   });
  //   tween.on('end', () => {
  //     this.container.on('pointerdown', () => {
  //       this._clickHandler(this);
  //     });
  //   });
  //   tween.start();
  // }
  // hide(cb) {
  //   // Tween animation
  //   let tween = PIXI.tweenManager.createTween(this.container);
  //   tween.time = config.chipAnimationTime.hide;
  //   tween.easing = PIXI.tween.Easing.outCirc();
  //   //  kill tween when complete
  //   tween.expire = true;
  //   tween.from({
  //     scale: { x: 1, y: 1 }
  //   });
  //   tween.to({
  //     scale: { x: 0, y: 0 }
  //   });
  //   tween.on('end', () => {
  //     this.container.destroy();
  //     cb();
  //   });
  //   tween.start();
  // }
};
