//
// Concatenates all /src files into /build/app.js as compiles to vanilla Javascript (es2015)
//
let game,
  graphics,
  creatures = [];

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

  // Creatures
  creatures.push(new Creature({
    x: 100,
    y: 100
  }));

  creatures.push(new Creature({
    x: 100,
    y: 200
  }));

  creatures.push(new Creature({
    sprite: game.add.sprite(41, 42, 'heroSprite'),
    x: 100,
    y: 300
  }));
}

const update = () => {
  // Creatures
  creatures.forEach(thing => {
    thing.update();
  });

  //game.physics.arcade.collide(sprite1, sprite2, collisionHandler, null, this);
}

const render = () => {
	// Clear
	graphics.clear();

	// Bg
	graphics.beginFill(0xFFEEFF, 1);
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
