import { buildLevel, gridCalc, resizeCanvas, level } from './levels';
import * as level_data from '../js/level_data.json';

// Game variables
let canvas = document.getElementById('primary-canvas'),
	ctx = canvas.getContext('2d'),
	world_grid = gridCalc(level); // Sets games world grid dimensions based on map data

// DRAWING ELEMENTS
const draw = () => {
	// First, resize canvas based on grid aspect ratio to keep elements proportionate
	// resizeCanvas(ctx.canvas, world_grid);

	// Build out the level and receive an array of element objects.
	let elements = buildLevel(level, canvas, world_grid);

	// Draw out each element object using its properties
	elements.forEach((e) => {
		ctx.fillRect(e.position.x, e.position.y, e.width, e.height);
	});
};

draw();

// console.log(ctx.canvas.height / ctx.canvas.width);
