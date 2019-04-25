import { solidElement } from "./elements";

// ------

// Static level string for testing.
export const levelMap = `
......................
......................
..#................#..
..#................#..
..#................#..
..#........#####...#..
..#####............#..
......#............#..
......##############..
......................
......................
`;

// 1. Translates template string to array data structure
const levelArray = function(level) {
	return level
		.trim()
		.split("\n")
		.map(row => [...row]);
};

// 2. Grid calculator - Defines grid dimensions based on level template string
export const gridCalc = levelData => {
	let grid = {};

	// Calculates the amount of rows and sets it to height, and calculates elements in each row, and sets it to width
	grid.height = levelArray(levelData).length; // amount of rows
	grid.width = levelArray(levelData)[0].length; // amount of elements per row

	return grid;
};

// 3. Resize canvas dimensions to be proportionate to the grid dimensions
export const resizeCanvas = (canvas, grid) => {
	canvas.width = grid.width * 30;
	canvas.height = grid.height * 30;
};

// 4. This function takes in the level string, and determines what needs to be built on the map at what size.
export const buildLevel = (levelData, canvas, grid) => {
	// Array that stores all element objects that are created with respective class constructors
	let finalLevelData = [];

	// This will translate the 'level template string' into an array of row arrays containing elements
	let rows = levelArray(levelData);

	// This will iterate over every row array and determine what element needs to be drawn depending on each element character.
	rows.forEach((row, rowIndex) => {
		row.forEach((element, elementIndex) => {
			let position = {
				x: (canvas.width / grid.width) * elementIndex,
				y: (canvas.height / grid.height) * rowIndex
			};
			switch (element) {
				case "#": // Solid blocks
					finalLevelData.push(
						new solidElement(
							Math.ceil(canvas.width / grid.width),
							Math.ceil(canvas.height / grid.height),
							position
						)
					);
					break;

				default:
					break;
			}
		});
	});

	// Return array of constructed level
	return finalLevelData;
};
