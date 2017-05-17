class Creature {
  constructor(options) {
    // Create empty options just in case
    options = (options ? options : {});

    // Sprite
    this.sprite = (options.sprite ? options.sprite : game.add.sprite(41, 42, 'creatureSprite'));

    // Physics
    game.physics.arcade.enableBody(this.sprite);
  	//this.sprite.body.collideWorldBounds = true;
    physicalObjects.push(this.sprite);

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

  collisionHandler(object1, object2) {

    //this.sprite.body.velocity = { x: 0, y: 0 }
    object1.body.velocity = { x: 0, y: 0 }
    object1.tint = 0xff0000;
  }

  update() {
    // Collisions only occur like, one way
    game.physics.arcade.collide(this.sprite, physicalObjects, this.collisionHandler, null, this);
  }

  render() {
    game.debug.body(this.sprite);
  }
}
