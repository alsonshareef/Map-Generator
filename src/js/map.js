/**
 * Filename: map.js
 * Description: This map class handles all application logic and state of the map being handled with.
 */

import levelService from "./levels";
import Display from "./display";
import Input from "./input";

export default class Map {
	constructor() {
		// Stores instances of all generator components
		this.levelService = new levelService();
		this.levelData = this.levelService.loadLevelData("static", "default");
		this.display = new Display();
		this.input = new Input();
	}

	// Initialization function of map generator
	setup() {
		this.setupInputHandlers();
		this.display.draw(this.levelData);
	}

	// Sets up event listeners for user input and their respective callbacks
	setupInputHandlers() {
		this.input.handleClick(this.handleBlocks.bind(this));
		this.input.handleKeypress(this.handleLevelData.bind(this));
	}

	// Callback for click events on canvas to manipulate the level data and redraw.
	handleBlocks(e) {
		// Storing the coordinates of clicks within the canvas, relative to the canvas; not the whole DOM.
		let clickCoordinates = {
			x: e.offsetX,
			y: e.offsetY
		};

		// Calculates which column and row of the clicked block.
		let column = Math.floor(
			clickCoordinates.x /
				(this.display.canvas.width / this.display.block.width)
		);
		let row = Math.floor(
			clickCoordinates.y /
				(this.display.canvas.height / this.display.block.height)
		);

		// -- Manipulation

		// 1. Copy of level data
		let cloneMap = this.levelData.slice();

		// 2. Toggle between empty space and block
		if (cloneMap[row][column] === "#") {
			cloneMap[row][column] = ".";
		} else if (cloneMap[row][column] === ".") {
			cloneMap[row][column] = "#";
		}

		// 3. Set level data to updated level, and redraw.
		this.levelData = cloneMap;
		this.display.draw(this.levelData);
	}

	// Callback for keypress events: Saves level data or retrieves level data from localStorage/API.
	handleLevelData(e) {
		// LOAD - Alt G
		if (e.charCode === 169) {
			let loadType = prompt(`You are trying to LOAD a map. Please select what type of load you would like to make:
				- "static"
				- "local"
			`);
			let levelName = prompt(
				"What is the name of the map you are trying to load?"
			);
			if (loadType && levelName) {
				this.levelData = this.levelService.loadLevelData(
					loadType,
					levelName
				);
				this.display.draw(this.levelData);
			}
		}

		// SAVE - Alt S
		if (e.charCode === 223) {
			let saveType = prompt(`You are trying to SAVE this map. Please select what type of save you would like to make:
				- "local"
			`);
			let levelName = prompt(
				"What name would you like to give to this map?"
			);
			if (saveType && levelName) {
				this.levelService.saveLevelData(
					saveType,
					levelName,
					this.levelData
				);
			}
		}

		// DELETE - Alt R
		if (e.charCode === 174) {
			let deleteType = prompt(`You are trying to DELETE a map. Please select what type of delete you would like to make:
				- "local"
			`);
			let levelName = prompt(
				"What is the name of the map you are trying to delete?"
			);
			if (deleteType && levelName) {
				this.levelService.deleteLevelData(deleteType, levelName);
			}
		}
	}
}
