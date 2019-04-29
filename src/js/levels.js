/**
 * File: levels.js
 * Description: Stores the levelService class which is responsible for receiving level data, and either distributing it or saving that data.
 */

import * as level_data from "./level_data.json";

// ------

export default class levelService {
	// Default level from level data json file.
	constructor() {
		// console.log(level_data);
		this.default_level = level_data.default.default;
		this.test_level = level_data.default.test;
	}

	// Will grab level data from either a json file or localStorage.
	loadLevelData(levelName) {
		switch (levelName) {
			case "default":
				return this.default_level;
				break;

			case "test":
				return this.test_level;
				break;
			default:
				break;
		}
	}

	// Will save the level data to restful service or localStorage
	saveLevelData(levelName, levelData) {}
}
