"use strict";

//
// Compiles into /dist as vanilla Javascript (es2015)
//

var game = void 0,
    graphics = void 0,
    things = [];

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

  things.push(new Thing());
};
var update = function update() {
  things.forEach(function (thing) {
    thing.update();
  });
};

var render = function render() {
  // Clear
  graphics.clear();

  // Bg
  graphics.beginFill(0xFFAA00, 1);
  graphics.drawRect(0, 0, game.width, game.height);
  graphics.endFill();

  things.forEach(function (thing) {
    thing.render();
  });
};
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Thing = function () {
  function Thing() {
    _classCallCheck(this, Thing);

    this.position = {
      x: 100,
      y: 100
    };
  }

  _createClass(Thing, [{
    key: "update",
    value: function update() {
      this.position.x++;
    }
  }, {
    key: "render",
    value: function render() {
      graphics.beginFill(0x44AA00, 1);
      graphics.drawRect(this.position.x, this.position.y, 10, 10);
      graphics.endFill();
    }
  }]);

  return Thing;
}();
