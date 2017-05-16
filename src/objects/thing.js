class Thing {
  constructor() {
    this.position = {
      x: 100,
      y: 100
    }
  }

  update() {
    this.position.x++;
  }

  render() {
  	graphics.beginFill(0x44AA00, 1);
  	graphics.drawRect(
      this.position.x,
      this.position.y,
      10,
      10
  	);
  	graphics.endFill();
  }
}
