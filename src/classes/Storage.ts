export class Storage {
  /**
   * Returns data saved in the local storage under the specified key name
   *
   * @param key
   */
  static getData(key: string): any {
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
  static saveData(key: string, data: any): void {
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
  static removeData(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }
}
