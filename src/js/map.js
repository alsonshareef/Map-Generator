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
		this.display = new Display();
		this.input = new Input();
	}

	// Initialization function of map generator
	setup() {
		document.querySelector(".map-name").innerHTML = "MAP NAME: Default";
		this.levelData = this.levelService.loadLevelData("default");
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
		console.log(e);
		// Saves level data - Alt S
		if (e.charCode === 223) {
			let mapName = prompt("What would you like to save this map as?");
			if (mapName) {
				localStorage.setItem(mapName, JSON.stringify(this.levelData));
			}
		}
		// Retrieves level data - Alt G
		if (e.charCode === 169) {
			let mapName = prompt("Which map would you like to load?");
			if (mapName) {
				document.querySelector(
					".map-name"
				).innerHTML = `MAP NAME: ${mapName}`;
				this.levelData = JSON.parse(localStorage.getItem(mapName));
				this.display.draw(this.levelData);
			}
		}
		// Removes level data- Alt R
		if (e.charCode === 174) {
			let mapName = prompt(
				"Which map would you like to remove from storage?"
			);
			if (mapName) {
				this.levelData = localStorage.removeItem(mapName);
			}
			alert(`${mapName} was deleted.`);
		}
	}
}
