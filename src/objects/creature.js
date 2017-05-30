class Creature {
  constructor(options) {
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
    this.sprite.body.velocity = options.velocity ? options.velocity : { x: 0, y: 0 };

    // Pass 'this' context to sprite for referencing when handling collisions
    this.sprite.mother = this;

    // Attributes
    this.sprite.setHealth(100);

    // Keyboard.. (abstract this out to hero-only)
    //this.keyTest = game.input.keyboard.addKey(Phaser.Keyboard.ONE);

    //http://www.html5gamedevs.com/topic/7256-generic-key-input/
    game.input.keyboard.onDownCallback(() => {
      console.log('input captured (keyboard?)');
      console.log(game.input.keyboard.event.keyCode);
    });
    // maybe shift into update. ..??
    game.input.onDown.add(function() {
      console.log('input captured (click?)');
    });
  }

  getSprite() {
    return this.sprite;
  }

  processCallback(a, b) {
    // When two sprites collide, return false to skip collision entirely
    return true;
  }

  destroy() {
    // Destroy physical object
    physicalGroup.remove(this.sprite, true); // true also runs this.sprite.destroy()

    creatures = creatures.filter((creature, i) => {
      return creature.id == this.id;
    });
  }

  wasTouched() {
    this.sprite.damage(50);
    console.log('HP: ' + this.sprite.health);

    if (this.sprite.health <= 0) {
      // Let it skip a beat before destroying because (and this took me AGES to figure out)..
      // The collisions will still be running for the rest of the group on removed objects otherwise.
      this.dying = true;
      return;
    }
  }

  collideCallback(a, b) {
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

  update() {
    if (this.dying) {
      this.destroy();
    }

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
