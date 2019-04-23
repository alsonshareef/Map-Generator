import { level, buildLevel } from './levels';

// Game variables
let canvas = document.getElementById('primary-canvas'),
	ctx = canvas.getContext('2d'),
	grid = { width: 22, height: 8 };

// Instantiate elements based on canvas and grid dimensions and store in variable.

// DRAWING ELEMENTS
const draw = () => {
	// Build out the level and receive an array of element objects.
	let elements = buildLevel(level, canvas, grid);

	// Draw out each element object using its properties
	elements.forEach((e) => {
		ctx.fillRect(e.position.x, e.position.y, e.width, e.height);
	});
};

draw();
