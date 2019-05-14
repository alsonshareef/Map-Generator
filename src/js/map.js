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
		this.input.handleBlock.bind(this)();
		this.input.handleLevelData.bind(this)();
	}
}
