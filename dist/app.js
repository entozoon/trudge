"use strict";

//
// Compiles into /dist as vanilla Javascript (es2015)
//

var game = void 0,
    graphics = void 0;

window.onload = function () {
  // (after images)
  game = new Phaser.Game({
    width: 200, // temporary
    height: 200,
    antialias: false,
    renderer: Phaser.CANVAS, // force canvas. Phaser.AUTO is an alternative
    state: {
      preload: preload,
      create: create,
      update: update,
      render: render
    }
  });
};

var preload = function preload() {
  // Images..
};
var create = function create() {
  game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  game.scale.parentIsWindow = true;
  graphics = game.add.graphics(0, 0);
};
var update = function update() {};
var render = function render() {
  // Clear
  graphics.clear();

  // Bg
  graphics.beginFill(0xFFAA00, 1);
  graphics.drawRect(0, 0, game.width, game.height);
  graphics.endFill();
};
'use strict';

console.log('this is a thing');
