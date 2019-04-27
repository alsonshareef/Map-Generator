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
