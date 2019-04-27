import { resizeCanvas, buildLevel } from './levels';
import Display from './display';
import Input from './input';

// Game classes
const display = new Display();
const input = new Input(
	(clickCoordinates) => {
		console.log(clickCoordinates);

		let column = Math.floor(clickCoordinates.x / (display.canvas.width / display.grid.width));

		let row = Math.floor(clickCoordinates.y / (display.canvas.height / display.grid.height));

		// console.log(column);
		// console.log(row);

		let cloneMap = display.map.slice();
		for (let i = 0; i < cloneMap.length; i++) {
			// console.log(cloneMap[i]);
			cloneMap[i] = cloneMap[i].split('');
			// console.log(cloneMap[i]);
		}

		console.log(cloneMap);
		console.log(cloneMap[row][column]);

		if (cloneMap[row][column] === '#') {
			cloneMap[row][column] = '.';
		} else if (cloneMap[row][column] === '.') {
			cloneMap[row][column] = '#';
		}

		for (let i = 0; i < cloneMap.length; i++) {
			cloneMap[i] = cloneMap[i].join('');
		}

		// console.log(cloneMap);
		display.map = cloneMap;
		draw();
	},
	(keyboardPress) => {
		if (keyboardPress.charCode === 2) {
			// Ctrl B
			localStorage.setItem(document.getElementById('mapName').value, JSON.stringify(display.map));
		}
		if (keyboardPress.charCode === 17) {
			// Ctrl Q
			display.map = JSON.parse(localStorage.getItem(document.getElementById('mapName').value));
			console.log(display.map);
		}
		draw();
		console.log(keyboardPress.charCode);
	}
);

// DRAWING ELEMENTS
const draw = () => {
	// 1. Resize the canvas to be proportionate to the game's grid
	resizeCanvas(display.ctx.canvas, display.grid);

	// 2. Build out the level and receive an array of element objects.
	let elements = buildLevel(display.map, display.canvas, display.grid);

	// 3. Draw out each element object using its properties
	elements.forEach((e) => {
		display.ctx.fillRect(e.position.x, e.position.y, e.width, e.height);
	});
};

// Displays all map titles in localStorage when game starts.
for (let i = 1; i < localStorage.length; i++) {
	console.log(localStorage.key(i));
}

draw();
