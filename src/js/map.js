/**
 * Filename: map.js
 * Description: This map class handles all application logic and state of the map being handled with.
 * Author: Alson Shareef
 */

import levelService from "./levels";
import Display from "./display";
import Input from "./input";

export default class Map {
	constructor() {
		this.levelService = new levelService();
		this.display = new Display();
		this.input = new Input();
	}

	// Initialization of map generator
	setup() {
		this.levelData = this.levelService.loadLevelData();
		this.setupInputHandlers();
		this.display.draw(this.levelData);
	}

	setupInputHandlers() {
		this.input.handleClick(this.handleBlocks.bind(this));
		this.input.handleKeypress(this.handleLevelData);
	}

	// On canvas click events, run this to manipulate the level data.
	handleBlocks(e) {
		let windowRect = e.target.getBoundingClientRect();
		let clickCoordinates = {
			x: e.clientX - windowRect.left,
			y: e.clientY - windowRect.top
		};
		console.log(clickCoordinates);

		let column = Math.floor(
			clickCoordinates.x /
				(this.display.canvas.width / this.display.block.width)
		);

		let row = Math.floor(
			clickCoordinates.y /
				(this.display.canvas.height / this.display.block.height)
		);

		let cloneMap = this.levelData.slice();
		for (let i = 0; i < cloneMap.length; i++) {
			// console.log(cloneMap[i]);
			cloneMap[i] = cloneMap[i].split("");
			// console.log(cloneMap[i]);
		}

		console.log(cloneMap);
		console.log(cloneMap[row][column]);

		if (cloneMap[row][column] === "#") {
			cloneMap[row][column] = ".";
		} else if (cloneMap[row][column] === ".") {
			cloneMap[row][column] = "#";
		}

		for (let i = 0; i < cloneMap.length; i++) {
			cloneMap[i] = cloneMap[i].join("");
		}

		// console.log(cloneMap);
		this.levelData = cloneMap;
		this.display.draw(this.levelData);
	}

	// Keypress
	handleLevelData() {}
}
