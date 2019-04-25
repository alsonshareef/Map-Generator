import { buildLevel, gridCalc, resizeCanvas, level } from './levels';
import * as level_data from '../js/level_data.json';

// Game variables
let canvas = document.getElementById('primary-canvas'),
	ctx = canvas.getContext('2d'),
	world_grid = gridCalc(level); // Sets games world grid dimensions based on map data

// DRAWING ELEMENTS
const draw = () => {
	// 1. Resize the canvas to be proportionate to the game's grid
	resizeCanvas(ctx.canvas, world_grid);

	// 2. Build out the level and receive an array of element objects.
	let elements = buildLevel(level, canvas, world_grid);

	// 3. Draw out each element object using its properties
	elements.forEach((e) => {
		ctx.fillRect(e.position.x, e.position.y, e.width, e.height);
	});
};

draw();
