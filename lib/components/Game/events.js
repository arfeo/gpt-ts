"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Function creates all game's event listeners
 */
function setUpEventHandlers() {
    for (var prop in this.eventHandlers) {
        var handler = this.eventHandlers[prop];
        handler.target.addEventListener(handler.type, handler.listener);
    }
}
exports.setUpEventHandlers = setUpEventHandlers;
/**
 * Function removes all game's event listeners
 */
function removeEventHandlers() {
    for (var prop in this.eventHandlers) {
        var handler = this.eventHandlers[prop];
        handler.target.removeEventListener(handler.type, handler.listener);
    }
}
exports.removeEventHandlers = removeEventHandlers;
