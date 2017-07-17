//
// Concatenates all /src files into /build/app.js as compiles to vanilla Javascript (es2015)
//
let game,
  graphics,
  creatures = [],
  physicalGroup;

window.onload = () => {
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

const preload = () => {
  // Images..
  game.load.image('heroSprite', 'sprites/hero.png');
  game.load.image('creatureSprite', 'sprites/creature.png');
};

const create = () => {
  game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  game.scale.parentIsWindow = true;
  graphics = game.add.graphics(0, 0);

  // NB: Only sprites can be made part of the physics system, apparently!
  physicalGroup = game.add.group();
  physicalGroup.enableBody = true;
  physicalGroup.physicsBodyType = Phaser.Physics.ARCADE;

  // Need to think of a way to handle the ScaleManager resize better, surely a callback?
  setTimeout(() => {
    // Creatures
    creatures.push(
      new Creature({
        x: 100,
        y: 100,
        velocity: { x: 100, y: 20 }
      })
    );

    let hero = new Hero({
      sprite: game.add.sprite(41, 42, 'heroSprite'),
      x: game.width / 2,
      y: game.height / 2
    });

    creatures.push(hero);
  }, 100);
};

const update = () => {
  // Creatures
  creatures.forEach(creature => {
    //console.log(creature.id + ' of ' + creatures.length);
    creature.update();
  });
};

const render = () => {
  // Clear
  graphics.clear();

  // Bg
  graphics.beginFill(0xeeeeee, 1);
  graphics.drawRect(0, 0, game.width, game.height);
  graphics.endFill();

  // Creatures
  creatures.forEach(creature => {
    creature.render();
  });
};
