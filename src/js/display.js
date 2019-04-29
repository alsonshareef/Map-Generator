/**
 * File: display.js
 * Description: Stores all logic related to rendering the canvas with level data
 */

import { solidElement } from "./blocks";

export default class Display {
	constructor() {
		this.canvas = document.getElementById("primary-canvas");
		this.ctx = this.canvas.getContext("2d");
	}

	// 1. Block dimensions calculator - Defines block dimensions based on level data dimensions.
	blockCalc = levelData => {
		let block = {};

		// Calculates the amount of rows and sets it to block height, then calculates elements in each row, and sets it to block width.
		block.height = levelData.length; // amount of rows
		block.width = levelData[0].length; // amount of elements per row

		return block;
	};

	// 2. Resize canvas dimensions to be proportionate to the block dimensions
	resizeCanvas = (canvas, block) => {
		canvas.width = block.width * 30;
		canvas.height = block.height * 30;
	};

	// 3. This function takes in the level string, and determines what needs to be built on the map at what size.
	buildLevel = (levelData, canvas, block) => {
		// Array that stores all element objects that are created with respective class constructors
		let finalLevelData = [];

		// This will iterate over every row array and determine what element needs to be drawn depending on each element character.
		levelData.forEach((row, rowIndex) => {
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
		// 1. Store block dimensions for given level data.
		this.block = this.blockCalc(levelData);

		// 2. Resize the canvas to be proportionate to the game's block
		this.resizeCanvas(this.ctx.canvas, this.block);

		// 3. Build out the level and receive an array of element objects.
		let elements = this.buildLevel(levelData, this.canvas, this.block);

		// 4. Draw out each element object using its properties
		elements.forEach(e => {
			this.ctx.fillRect(e.position.x, e.position.y, e.width, e.height);
		});
	};
}
