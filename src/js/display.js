import { levelMap, gridCalc } from "./levels";

export default class Display {
	constructor() {
		this.map = levelMap;
		this.canvas = document.getElementById("primary-canvas");
		this.ctx = this.canvas.getContext("2d");
		this.grid = gridCalc(this.map);
	}
}
