//
// Compiles into /dist as vanilla Javascript (es2015)
//

let game,
  graphics;

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
}
const create = () => {
  game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	game.scale.parentIsWindow = true;
	graphics = game.add.graphics(0, 0);
}
const update = () => {
}
const render = () => {
	// Clear
	graphics.clear();

	// Bg
	graphics.beginFill(0xFFAA00, 1);
	graphics.drawRect(
		0,
		0,
		game.width,
		game.height
	);
	graphics.endFill();

}
