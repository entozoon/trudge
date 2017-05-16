class Creature {
  constructor(options) {
    // Create empty options just in case
    options = (options ? options : {});

    this.sprite = (options.sprite ? options.sprite : game.add.sprite(41, 42, 'creatureSprite'));
    console.log(this.sprite.body);

    game.physics.arcade.enableBody(this.sprite);

    // Bounding box (width, height, x, y offset)
    this.sprite.body.setSize(24, 26, 11, 7);
    this.sprite.body.immovable = false;
    this.sprite.x = (options.x ? options.x : 99);
    this.sprite.y = (options.y ? options.y : 99);
    this.sprite.body.velocity.x = 100;
  }

  getSprite() {
    return this.sprite;
  }

  update() {
  }

  render() {
    game.debug.body(this.sprite);
  }
}
