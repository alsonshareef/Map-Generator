export default class Input {
	constructor(callback, saveMap) {
		document.getElementById('primary-canvas').addEventListener('click', (e) => {
			let windowRect = e.target.getBoundingClientRect();
			let clickCoordinates = {
				x: e.clientX - windowRect.left,
				y: e.clientY - windowRect.top
			};
			callback(clickCoordinates);
		});

		document.addEventListener('keypress', (e) => {
			saveMap(e);
		});
	}
}
