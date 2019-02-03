"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Function returns a random number in a given interval;
 * as an option it discards one or more numbers given in the `discard` array
 *
 * @param min
 * @param max
 * @param discard
 */
function getRandomNum(min, max, discard) {
    if (min === void 0) { min = 1; }
    if (max === void 0) { max = 1; }
    if (discard === void 0) { discard = []; }
    var num = Math.floor(min + Math.random() * (max + 1 - min));
    if (discard.indexOf(num) > -1) {
        return getRandomNum(min, max, discard);
    }
    return num;
}
exports.getRandomNum = getRandomNum;
