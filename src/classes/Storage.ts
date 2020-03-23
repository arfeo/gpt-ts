import { Utils } from './Utils';

export class Storage {
  /**
   * Returns data saved in the local storage under the specified key name;
   * if the `keys` is an array of key names, it returns the corresponding array
   *
   * @param storageName
   * @param keys
   * @param onError
   */
  public static getData(storageName: string, keys?: string[] | string, onError?: (error: string) => void): any[] | any | undefined {
    try {
      const data: any = JSON.parse(window.localStorage.getItem(storageName));

      if (keys === undefined) {
        return data || {};
      }

      if (Utils.isObject(data)) {
        if (Array.isArray(keys)) {
          return keys.map((key: string): any => data[key]);
        }

        return data[keys];
      }

      return Array.isArray(keys) ? [] : undefined;
    } catch (error) {
      if (typeof onError === 'function') {
        onError(error);
      }
    }
  }

  /**
   * Saves data to the local storage under the specified key name
   *
   * @param storageName
   * @param key
   * @param data
   * @param onError
   */
  public static saveData(storageName: string, key: string, data: any, onError?: (error: string) => void): void {
    try {
      window.localStorage.setItem(storageName, JSON.stringify({
        ...Storage.getStorageData(storageName),
        [key]: data,
      }));
    } catch (error) {
      if (typeof onError === 'function') {
        onError(error);
      }
    }
  }

  /**
   * Clears all data from the local storage
   *
   * @param onError
   */
  public static removeData(onError?: (error: string) => void): void {
    try {
      window.localStorage.clear();
    } catch (error) {
      if (typeof onError === 'function') {
        onError(error);
      }
    }
  }
}
