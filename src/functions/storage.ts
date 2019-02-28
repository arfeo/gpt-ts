/**
 * Returns data saved in the local storage under the specified key name
 *
 * @param key
 */
export function getStorageData(key: string): any {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    console.error(error);
  }
}

/**
 * Saves data to the local storage under the specified key name
 *
 * @param key
 * @param data
 */
export function saveStorageData(key: string, data: any) {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

/**
 * Removes data with the specified key name from the local storage
 *
 * @param key
 */
export function removeStorageData(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
}
