/**
 * File: levels.js
 * Description: Stores the levelService class which is responsible for all kinds of actions regarding level data.
 */

import * as static_levelData from "./level_data.json";

// ------

export default class levelService {
	constructor() {
		this.rest_levelData = {}; // level data stored in RESTful API.
	}

	// LOAD
	loadLevelData(loadType, levelName) {
		// If requesting level data from static json file.
		if (loadType === "static") {
			document.querySelector(
				".map-name"
			).innerHTML = `MAP NAME: "${levelName}"`;
			switch (levelName) {
				case "default":
					return static_levelData.default.default;
					break;

				case "test":
					return static_levelData.default.test;
					break;
				default:
					break;
			}
		}

		// If requesting level data from local storage
		if (loadType === "local") {
			let levelData = JSON.parse(localStorage.getItem(levelName));
			if (levelData) {
				document.querySelector(
					".map-name"
				).innerHTML = `MAP NAME: "${levelName}"`;
				return levelData;
			} else {
				alert(
					`Sorry, there is no map in your storage under the name "${levelName}"`
				);
			}
		}

		// User requesting level data from REST API.
	}

	// SAVE
	saveLevelData(saveType, levelName, levelData) {
		// If requesting a save to localStorage
		if (saveType === "local") {
			document.querySelector(
				".map-name"
			).innerHTML = `MAP NAME: "${levelName}"`;
			localStorage.setItem(levelName, JSON.stringify(levelData));
		}

		// If requesting a save to REST API.
	}

	// DELETE
	deleteLevelData(deleteType, levelName) {
		// If requesting a delete from localStorage
		if (deleteType === "local") {
			localStorage.removeItem(levelName);
		}
		alert(`${levelName} was deleted.`);

		// If requesting a delete from REST API.
	}
}
