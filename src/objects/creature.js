class Creature {
  constructor(options) {
    // Create empty options just in case
    options = (options ? options : {});

    // Sprite
    this.sprite = (options.sprite ? options.sprite : game.add.sprite(41, 42, 'creatureSprite'));

    // Physics
    game.physics.arcade.enableBody(this.sprite);
  	//this.sprite.body.collideWorldBounds = true; // I'm not convinced the AoE is right on load
    physicalGroup.add(this.sprite);

    // Bounding box (width, height, x, y offset)
    this.sprite.body.setSize(24, 26, 11, 7);
    this.sprite.body.immovable = false;

    // Position
    this.sprite.x = (options.x ? options.x : 99);
    this.sprite.y = (options.y ? options.y : 99);
    this.sprite.body.velocity = (options.velocity ? options.velocity : null);
  }

  getSprite() {
    return this.sprite;
  }

  collisionHandler(a, b) {
    //this.sprite.body.velocity = { x: 0, y: 0 }
    a.body.velocity = { x: 0, y: 0 }
    a.tint = 0xff0000;

    if (!a.body.touching.none) {
      console.log(a.body.touching);
    }
  }

  update() {
    //game.physics.arcade.collide(player, platforms, hitPlatform(), isPlatformSolid(), this);
    game.physics.arcade.collide(this.sprite, physicalGroup, this.collisionHandler, null, this);
    // .overlap is also a thing. Detects overlap without causing a collision as such
  }

  render() {
    game.debug.body(this.sprite);
  }
}
