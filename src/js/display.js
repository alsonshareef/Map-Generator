import { solidElement } from "./blocks";

export default class Display {
	constructor() {
		this.canvas = document.getElementById("primary-canvas");
		this.ctx = this.canvas.getContext("2d");
	}

	// 1. Translates template string to array data structure
	levelArray = function(level) {
		console.log(level);
		return level.map(row => [...row]);
	};

	// 2. Block dimensions calculator - Defines block dimensions based on level template string dimensions
	blockCalc = levelData => {
		let block = {};

		// Calculates the amount of rows and sets it to height, and calculates elements in each row, and sets it to width
		block.height = this.levelArray(levelData).length; // amount of rows
		block.width = this.levelArray(levelData)[0].length; // amount of elements per row

		return block;
	};

	// 3. Resize canvas dimensions to be proportionate to the block dimensions
	resizeCanvas = (canvas, block) => {
		canvas.width = block.width * 30;
		canvas.height = block.height * 30;
	};

	// 4. This function takes in the level string, and determines what needs to be built on the map at what size.
	buildLevel = (levelData, canvas, block) => {
		// Array that stores all element objects that are created with respective class constructors
		let finalLevelData = [];

		// This will translate the 'level template string' into an array of row arrays containing elements
		let rows = this.levelArray(levelData);

		// This will iterate over every row array and determine what element needs to be drawn depending on each element character.
		rows.forEach((row, rowIndex) => {
			row.forEach((element, elementIndex) => {
				let position = {
					x: (canvas.width / block.width) * elementIndex,
					y: (canvas.height / block.height) * rowIndex
				};
				switch (element) {
					case "#": // Solid blocks
						finalLevelData.push(
							new solidElement(
								Math.ceil(canvas.width / block.width),
								Math.ceil(canvas.height / block.height),
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

	// Main draw method
	draw = levelData => {
		this.block = this.blockCalc(levelData);
		// 1. Resize the canvas to be proportionate to the game's block
		this.resizeCanvas(this.ctx.canvas, this.block);

		// 2. Build out the level and receive an array of element objects.
		let elements = this.buildLevel(levelData, this.canvas, this.block);

		// 3. Draw out each element object using its properties
		elements.forEach(e => {
			this.ctx.fillRect(e.position.x, e.position.y, e.width, e.height);
		});
	};
}
