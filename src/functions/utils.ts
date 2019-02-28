/**
 * Returns the cell size (atomic canvas measure)
 * depending on the screen size and the given vmin value
 */
export function setCellSize(vmin: number): number {
  const vpWidth: number = window.innerWidth;
  const vpHeight: number = window.innerHeight;
  const vminCalculated: number = vpWidth >= vpHeight ? (vpHeight / 100) : (vpWidth / 100);

  return Math.round(vminCalculated * vmin  / 10) * 10;
}

/**
 * Returns a random number in a given interval;
 * as an option it discards one or more numbers given in the `discard` array
 *
 * @param min
 * @param max
 * @param discard
 */
export function getRandomNum(min = 1, max = 1, discard: number[] = []): number {
  const num: number = Math.floor(min + Math.random() * (max + 1 - min));

  if (discard.indexOf(num) > -1) {
    return getRandomNum(min, max, discard);
  }

  return num;
}
