export class Utils {
  /**
   * Returns the cell size (atomic canvas measure)
   * depending on the screen size and the given vmin value;
   * the returned value is rounded to the nearest ten
   */
  public static getCellSize(vmin: number): number {
    const vpWidth: number = window.innerWidth;
    const vpHeight: number = window.innerHeight;
    const vminCalculated: number = vpWidth >= vpHeight ? (vpHeight / 100) : (vpWidth / 100);

    return Math.round(vminCalculated * vmin  / 10) * 10;
  }

  /**
   * Returns a random number in a given interval;
   * as an option it discards one or more numbers given
   * in the `discard` array
   *
   * @param min
   * @param max
   * @param discard
   */
  public static getRandomNum(min = 1, max = 1000, discard: number[] = []): number {
    const num: number = Math.floor(min + Math.random() * (max + 1 - min));

    if (discard.indexOf(num) > -1) {
      return Utils.getRandomNum(min, max, discard);
    }

    return num;
  }

  /**
   * Returns true if the given `value` is a DOM element;
   * otherwise returns false
   *
   * @param value
   */
  public static isElement(value: any): boolean {
    return value instanceof Element || value instanceof HTMLDocument;
  }

  /**
   * Returns true if the prototype for the `item` param solely comes from `Object`.
   *
   * @param item
   */
  public static isObject(item: any): boolean {
    return !!item && Object.prototype.toString.call(item) === '[object Object]';
  }

  /**
   * Returns true if the prototype for the `item` param solely comes from `Object`, and it has no keys.
   *
   * @param item
   */
  public static isEmpty(item: any): boolean {
    return Utils.isObject(item) && Object.keys(item).length === 0;
  }

  /**
   * Function returns an array of items' coordinates for the given board map
   * according to the given item type (or array of types); if the given map is undefined or not an array,
   * function returns an empty array.
   *
   * @param map
   * @param type
   */
  public static getMapItemsByType(map: number[][], type: number | number[]): number[][] {
    const result: number[][] = [];

    if (!map || !Array.isArray(map)) {
      return result;
    }

    for (let y = 0; y < map.length; y += 1) {
      for (let x = 0; x < map[y].length; x += 1) {
        if ((typeof type === 'number' && map[y][x] === type) || (Array.isArray(type) && type.indexOf(map[y][x]) > - 1)) {
          result.push([y, x]);
        }
      }
    }

    return result;
  }

  /**
   * Immutably changes the board map value.
   *
   * @param boardMap
   * @param x
   * @param y
   * @param value
   */
  public static changeMapValue(boardMap: number[][], x: number, y: number, value: number): number[][] {
    return boardMap.map((row: number[], rowIndex: number): number[] => row.map((column: number, columnIndex: number): number => {
      return rowIndex === y && columnIndex === x ? value : boardMap[rowIndex][columnIndex];
    }));
  }

  /**
   * Delay the program’s execution for a given period of time (in milliseconds)
   *
   * @param delay
   */
  public static sleep(delay: number): Promise<void> {
    return new Promise((resolve): number => window.setTimeout(resolve, delay));
  }
}
