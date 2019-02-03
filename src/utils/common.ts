/**
 * Function returns a random number in a given interval;
 * as an option it discards one or more numbers given in the `discard` array
 *
 * @param min
 * @param max
 * @param discard
 */
function getRandomNum(min = 1, max = 1, discard: number[] = []): number {
  const num: number = Math.floor(min + Math.random() * (max + 1 - min));

  if (discard.indexOf(num) > -1) {
    return getRandomNum(min, max, discard);
  }

  return num;
}

export { getRandomNum };
