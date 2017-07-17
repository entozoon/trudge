class Hero extends Creature {
  constructor(options) {
    super(options);

    // Take options as an object with default values and bosh into 'this' for brevity
    options = {
      acceleration: options.acceleration ? options.acceleration : 0.2,
      velocityMax: options.velocityMax ? options.velocityMax : 400
    };

    for (var key in options) {
      this[key] = options[key];
    }

    this.keys = {
      // .isDown : bool
      // .timeDown : timestamp of the moment, not a timer!
      up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
      down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
      left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    };
  }

  velocityLimit() {
    this.sprite.body.velocity.y = constrain(
      this.sprite.body.velocity.y,
      -this.velocityMax,
      this.velocityMax
    );
    this.sprite.body.velocity.x = constrain(
      this.sprite.body.velocity.x,
      -this.velocityMax,
      this.velocityMax
    );
  }

  friction() {
    console.log('Need to write this in a clevererer way, using Math.sign and stuff');
    this.sprite.body.velocity.y =
      this.sprite.body.velocity.y > 0
        ? this.sprite.body.velocity.y - 2
        : this.sprite.body.velocity.y;
  }

  update() {
    if (this.keys.up.isDown) {
      //this.sprite.body.velocity.y -= 0.1;
      // Refer to the amount of time dt specifically, as it handles lag like a frameskip
      let dt = game.time.time - this.keys.up.timeDown;
      this.sprite.body.velocity.y -= dt * this.acceleration;
    }
    if (this.keys.down.isDown) {
      let dt = game.time.time - this.keys.down.timeDown;
      this.sprite.body.velocity.y += dt * this.acceleration;
    }
    if (this.keys.left.isDown) {
      let dt = game.time.time - this.keys.left.timeDown;
      this.sprite.body.velocity.x -= dt * this.acceleration;
    }
    if (this.keys.right.isDown) {
      let dt = game.time.time - this.keys.right.timeDown;
      this.sprite.body.velocity.x += dt * this.acceleration;
    }
    this.velocityLimit();
    this.friction();
  }

  render() {}
}
