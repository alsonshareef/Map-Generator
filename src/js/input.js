/**
 * File: input.js
 * Description: Stores all the event listeners for user input, and passes in their callbacks.
 */

export default class Input {
	constructor() {}

	handleClick(handleBlocks) {
		document
			.getElementById("primary-canvas")
			.addEventListener("click", handleBlocks);
	}

	handleKeypress(handleLevelData) {
		document.addEventListener("keypress", handleLevelData);
	}
}
