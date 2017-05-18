'use strict';

//
// Concatenates all /src files into /build/app.js as compiles to vanilla Javascript (es2015)
//
var game = void 0,
    graphics = void 0,
    creatures = [],
    physicalGroup = void 0;

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
  game.load.image('heroSprite', 'sprites/hero.png');
  game.load.image('creatureSprite', 'sprites/creature.png');
};

var create = function create() {
  game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  game.scale.parentIsWindow = true;
  graphics = game.add.graphics(0, 0);

  // NB: Only sprites can be made part of the physics system, apparently!
  physicalGroup = game.add.group();
  physicalGroup.enableBody = true;
  physicalGroup.physicsBodyType = Phaser.Physics.ARCADE;

  // Creatures
  creatures.push(new Creature({
    x: 100,
    y: 100,
    velocity: { x: 100, y: 20 }
  }));

  creatures.push(new Creature({
    x: 200,
    y: 100,
    velocity: { x: 0, y: 0 }
  }));

  creatures.push(new Creature({
    x: 300,
    y: 100,
    velocity: { x: 0, y: 0 }
  }));

  creatures.push(new Creature({
    x: 400,
    y: 100,
    velocity: { x: -100, y: 10 }
  }));

  creatures.push(new Creature({
    sprite: game.add.sprite(41, 42, 'heroSprite'),
    x: 500,
    y: 100,
    velocity: { x: -50, y: 0 }
  }));
};

var update = function update() {
  // Creatures
  creatures.forEach(function (creature) {
    //console.log(creature.id + ' of ' + creatures.length);
    creature.update();
  });
};

var render = function render() {
  // Clear
  graphics.clear();

  // Bg
  graphics.beginFill(0xeeeeee, 1);
  graphics.drawRect(0, 0, game.width, game.height);
  graphics.endFill();

  // Creatures
  creatures.forEach(function (creature) {
    creature.render();
  });
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Creature = function () {
  function Creature(options) {
    _classCallCheck(this, Creature);

    // Create empty options just in case
    options = options ? options : {};

    this.sprite = options.sprite ? options.sprite : game.add.sprite(41, 42, 'creatureSprite');

    // Physics
    game.physics.arcade.enableBody(this.sprite);
    //this.sprite.body.collideWorldBounds = true; // I'm _very_ not convinced the AoE is right on load
    physicalGroup.add(this.sprite);

    //this.sprite = physicalGroup.create(50, 100, 'creatureSprite', 1);

    // ID
    this.id = creatures.length;

    // Physics
    game.physics.arcade.enableBody(this.sprite);
    //this.sprite.body.collideWorldBounds = true; // I'm _very_ not convinced the AoE is right on load

    // Bounding box (width, height, x, y offset)
    this.sprite.body.setSize(24, 26, 11, 7);
    this.sprite.body.immovable = false;
    // Circle collision is not supported with tile maps! so maybe avoid that for now
    //this.sprite.body.setCircle(20, 0, 0); // r, x, y

    // Position
    this.sprite.x = options.x ? options.x : 99;
    this.sprite.y = options.y ? options.y : 99;
    this.sprite.body.velocity = options.velocity ? options.velocity : null;

    // Pass 'this' context to sprite for referencing when handling collisions
    this.sprite.mother = this;

    // Attributes
    this.sprite.setHealth(100);
  }

  _createClass(Creature, [{
    key: 'getSprite',
    value: function getSprite() {
      return this.sprite;
    }
  }, {
    key: 'processCallback',
    value: function processCallback(a, b) {
      // When two sprites collide, return false to skip collision entirely
      return true;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this = this;

      // Destroy physical object
      physicalGroup.remove(this.sprite, true); // true also runs this.sprite.destroy()

      creatures = creatures.filter(function (creature, i) {
        return creature.id == _this.id;
      });
    }
  }, {
    key: 'wasTouched',
    value: function wasTouched() {
      this.sprite.damage(50);
      console.log('HP: ' + this.sprite.health);

      if (this.sprite.health <= 0) {
        // Let it skip a beat before destroying because (and this took me AGES to figure out)..
        // The collisions will still be running for the rest of the group on removed objects otherwise.
        this.dying = true;
        return;
      }
    }
  }, {
    key: 'collideCallback',
    value: function collideCallback(a, b) {
      // a (this) and b sprites aren't reliable in that it can't distinguish which hit which.
      // So just be dead ambivolent about it
      // a.tint = 0xff0000;
      // b.tint = 0x000000;
      // if (!a.body.touching.none) {
      //   console.log(a.body.touching);
      // }

      // Touch each other. Feels good. Harder.
      if (a.mother) {
        a.mother.wasTouched();
      }
      if (b.mother) {
        b.mother.wasTouched();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.dying) {
        this.destroy();
      }

      game.physics.arcade.collide(this.sprite, physicalGroup, this.collideCallback, this.processCallback, this);
      // .overlap is also a thing. Detects overlap without causing a collision as such
    }
  }, {
    key: 'render',
    value: function render() {
      game.debug.body(this.sprite);
    }
  }]);

  return Creature;
}();
