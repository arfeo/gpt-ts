export class Utils {
  /**
   * Returns the cell size (atomic canvas measure)
   * depending on the screen size and the given vmin value;
   * the returned value is rounded to the nearest ten
   */
  static getCellSize(vmin: number): number {
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
  static getRandomNum(min: number = 1, max: number = 1000, discard: number[] = []): number {
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
  static isElement(value: any): boolean {
    return value instanceof Element || value instanceof HTMLDocument;
  }
}
