import { resizeCanvas, buildLevel } from "./levels";
import Display from "./display";

// Game classes
const display = new Display();

// DRAWING ELEMENTS
const draw = () => {
	// 1. Resize the canvas to be proportionate to the game's grid
	resizeCanvas(display.ctx.canvas, display.grid);

	// 2. Build out the level and receive an array of element objects.
	let elements = buildLevel(display.map, display.canvas, display.grid);

	// 3. Draw out each element object using its properties
	elements.forEach(e => {
		display.ctx.fillRect(e.position.x, e.position.y, e.width, e.height);
	});
};

draw();
