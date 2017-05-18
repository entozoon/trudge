class Creature {
  constructor(options) {
    // Create empty options just in case
    options = options ? options : {};

    // Sprite
    this.sprite = options.sprite ? options.sprite : game.add.sprite(41, 42, 'creatureSprite');

    // Physics
    game.physics.arcade.enableBody(this.sprite);
    //this.sprite.body.collideWorldBounds = true; // I'm _very_ not convinced the AoE is right on load
    physicalGroup.add(this.sprite);

    // Bounding box (width, height, x, y offset)
    this.sprite.body.setSize(24, 26, 11, 7);
    this.sprite.body.immovable = false;
    // Circle collision is not supported with tile maps! so maybe avoid that for now
    //this.sprite.body.setCircle(20, 0, 0); // r, x, y

    // Position
    this.sprite.x = options.x ? options.x : 99;
    this.sprite.y = options.y ? options.y : 99;
    this.sprite.body.velocity = options.velocity ? options.velocity : null;

    // Pass 'this' context to sprite for use with wasTouched
    this.sprite.mother = this;
  }

  getSprite() {
    return this.sprite;
  }

  processCallback(a, b) {
    // When two sprites collide, return false to skip collision entirely
    return true;
  }

  wasTouched() {
    this.sprite.tint = 0x440000;
  }

  collideCallback(a, b) {
    // a (this) and b aren't reliable in that it can't distinguish which hit which.
    // So just be dead ambivolent about it
    //a.tint = 0xff0000;
    //b.tint = 0x000000;
    // if (!a.body.touching.none) {
    //   console.log(a.body.touching);
    // }
    //

    if (a.mother) {
      //console.log(a.mother);
      a.mother.wasTouched();
    }
    if (b.mother) {
      b.mother.wasTouched();
    }
  }

  update() {
    //game.physics.arcade.collide(player, platforms, hitPlatform(), isPlatformSolid(), this);
    game.physics.arcade.collide(
      this.sprite,
      physicalGroup,
      this.collideCallback,
      this.processCallback,
      this
    );
    // .overlap is also a thing. Detects overlap without causing a collision as such
  }

  render() {
    game.debug.body(this.sprite);
  }
}
