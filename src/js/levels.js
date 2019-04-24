import { solidElement } from './elements';

// ------

// Static level string for testing.
const level = `
......................
..#................#..
..#................#..
..#................#..
..#........#####...#..
..#####............#..
......#............#..
......##############..
......................`;

// This function takes in the level string, and determines what needs to be built on the map at what size.
export const buildLevel = (levelData, canvas, grid) => {
	// Array that stores all element objects based on respective class constructors
	let finalLevelData = [];

	// This will translate the 'level template string' into an array of row arrays containing elements
	let rows = levelData.trim().split('\n').map((row) => [ ...row ]);

	// This will iterate over every row array and determine what element needs to be drawn depending on each elements character.
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
