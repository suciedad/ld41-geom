// import config from './config';
// import { randomInt, generateId } from './utils.js';
// import * as PIXI from 'pixi.js';
// import Sound from 'pixi-sound';
// import tween from 'pixi-tween';

export default class Chip {
  constructor(game, type, x, y) {
    // this._id = generateId();
    this._type = type;
    this._isSelected = false;
    this.game = game;

    // Chip image
    this.sprite = game.add.sprite(x, y, type);
    this.sprite.anchor.set(0.5)

    // this.show();
  }

  _clickHandler() {
    this.select()
    this.board.addToSelected(this)
  }

  // get id() {
  //   return this._id;
  // }

  // set type(value) {
  //   return this._type = value;
  // }
  get type() {
    return this._type;
  }

  // set isSelected(val) {
  //   return this._isSelected = val;
  // }
  // get isSelected() {
  //   return this._isSelected;
  // }

  // _clickHandler() {
  //   let checker = this.field.checker
  //   if (this.isSelected) {
  //     this.unselect();
  //     checker.remove(this);
  //   } else {
  //     this.select();
  //     checker.add(this);
  //   }
  // }

  select() {
    this.isSelected = true;
    this.sprite.scale.setTo(1.2, 1.2);
  }
  unselect() {
    this.isSelected = false;
    this.sprite.scale.setTo(1, 1);
  }

  fly() {
    const tweenTime = 1000
    const unitePosition = { x: game.world.centerX, y: game.world.centerY+50 }
    let flyTween = game
      .add
      .tween(this.sprite)
      .to(unitePosition, tweenTime, "Quart.easeOut");
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
