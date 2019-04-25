import { gridCalc } from "./levels";
import * as level_data from "./level_data.json";

export default class Display {
	constructor() {
		this.map = level_data.map;
		this.canvas = document.getElementById("primary-canvas");
		this.ctx = this.canvas.getContext("2d");
		this.grid = gridCalc(this.map);
	}
}
