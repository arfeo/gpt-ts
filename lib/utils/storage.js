"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Function returns data saved in the local storage under the specified key name
 *
 * @param key
 */
function getStorageData(key) {
    try {
        return JSON.parse(window.localStorage.getItem(this.storagePrefix + "-" + key));
    }
    catch (error) {
        console.error(error);
    }
}
exports.getStorageData = getStorageData;
/**
 * Function saves data to the local storage under the specified key name
 *
 * @param key
 * @param data
 */
function saveStorageData(key, data) {
    try {
        window.localStorage.setItem(this.storagePrefix + "-" + key, JSON.stringify(data));
    }
    catch (error) {
        console.error(error);
    }
}
exports.saveStorageData = saveStorageData;
/**
 * Function removes data with the specified key name from the local storage
 *
 * @param key
 */
function removeStorageData(key) {
    try {
        window.localStorage.removeItem(this.storagePrefix + "-" + key);
    }
    catch (error) {
        console.error(error);
    }
}
exports.removeStorageData = removeStorageData;
