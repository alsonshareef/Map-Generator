import { solidElement } from './elements';

// ------

// Static level string for testing.
export const level = `
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

// Translates template string to array data structure
const levelArray = function(level) {
	return level.trim().split('\n').map((row) => [ ...row ]);
};

// Grid calculator - Defines grid dimensions based on level template string
export const gridCalc = (levelData) => {
	let grid = {},
		rows,
		rowLengths;

	// Calculates the amount of rows, and elements in each row
	rows = levelArray(levelData).length;
	rowLengths = levelArray(levelData)[0].length;

	// Sets grid values based on rows and row lengths
	grid.height = rows;
	grid.width = rowLengths;

	return grid;
};

// This will resize the canvas to have dimensions that will
// export const resizeCanvas = (canvas, grid) => {
// 	if (canvas.height / canvas.width > grid.height / grid.width) {
// 		canvas.height = canvas.width * (grid.height / grid.width);
// 		canvas.width = canvas.width;
// 	} else {
// 		canvas.height = canvas.height;
// 		canvas.width = canvas.height / (grid.height / grid.width);
// 	}
// };

// This function takes in the level string, and determines what needs to be built on the map at what size.
export const buildLevel = (levelData, canvas, grid) => {
	// Array that stores all element objects that are created with respective class constructors
	let finalLevelData = [];

	// This will translate the 'level template string' into an array of row arrays containing elements
	let rows = levelArray(levelData);

	// This will iterate over every row array and determine what element needs to be drawn depending on each element character.
	rows.forEach((row, rowIndex) => {
		row.forEach((element, elementIndex) => {
			let position = {
				x: canvas.width / grid.width * elementIndex,
				y: canvas.height / grid.height * rowIndex
			};
			switch (element) {
				case '#': // Solid blocks
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
