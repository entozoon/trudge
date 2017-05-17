//
// Concatenates all /src files into /build/app.js as compiles to vanilla Javascript (es2015)
//
let game,
  graphics,
  creatures = [],
  physicalGroup;

window.onload = () => { // (after images)
  game = new Phaser.Game({
    width:     200, // temporary
    height:    200,
    antialias: false,
    renderer:  Phaser.CANVAS, // force canvas. Phaser.AUTO is an alternative
    state: {
      preload: preload,
      create:  create,
      update:  update,
      render:  render
    }
  });
}

const preload = () => {
  // Images..
  game.load.image('heroSprite', 'sprites/hero.png');
  game.load.image('creatureSprite', 'sprites/creature.png');
}

const create = () => {
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
    velocity: { x: -80, y: 10 }
  }));
/*
  creatures.push(new Creature({
    sprite: game.add.sprite(41, 42, 'heroSprite'),
    x: 700,
    y: 100,
    velocity: { x: -50, y: 0 }
  }));
*/
}

const update = () => {
  // Creatures
  creatures.forEach(thing => {
    thing.update();
  });
}

const render = () => {
	// Clear
	graphics.clear();

	// Bg
	graphics.beginFill(0xEEEEEE, 1);
	graphics.drawRect(
		0,
		0,
		game.width,
		game.height
	);
	graphics.endFill();

  // Creatures
  creatures.forEach(thing => {
    thing.render();
  });
}
