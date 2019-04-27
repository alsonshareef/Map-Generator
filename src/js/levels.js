import * as level_data from "./level_data.json";

// ------

export default class levelService {
	// Default level from level data json file.
	constructor() {
		console.log(level_data.default.default);
		this.default_level = level_data.default.default;
	}

	// Will grab level data from either a json file or localStorage
	loadLevelData(levelName) {
		if (!levelName) {
			// If no level name is passed through
			return this.default_level;
		} else {
			// check if the provided level name exists and return it
		}
	}

	// Will save the level data to restful service or localStorage
	saveLevelData(levelName, levelData) {}
}
