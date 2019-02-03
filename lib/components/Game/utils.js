"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Function calculates the analogue of CSS vmin in pixels
 */
function calculateVMin() {
    var vpWidth = window.innerWidth;
    var vpHeight = window.innerHeight;
    return vpWidth >= vpHeight ? (vpHeight / 100) : (vpWidth / 100);
}
/**
 * Function returns the cell size (atomic canvas measure)
 * depending on the screen size and the given vmin value
 */
function setCellSize(vmin) {
    return Math.round(calculateVMin() * vmin / 10) * 10;
}
exports.setCellSize = setCellSize;
