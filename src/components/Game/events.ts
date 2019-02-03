/**
 * Function creates all game's event listeners
 */
function setUpEventHandlers() {
  for (const prop in this.eventHandlers) {
    const handler = this.eventHandlers[prop];

    handler.target.addEventListener(handler.type, handler.listener);
  }
}

/**
 * Function removes all game's event listeners
 */
function removeEventHandlers() {
  for (const prop in this.eventHandlers) {
    const handler = this.eventHandlers[prop];

    handler.target.removeEventListener(handler.type, handler.listener);
  }
}

export { setUpEventHandlers, removeEventHandlers };
