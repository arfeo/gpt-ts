import { IEventHandler } from '../types';

export abstract class GameComponent {
  eventHandlers: IEventHandler;
  init?(...args: any[]): void;
  abstract render(): void;
  unmount?(): void;

  protected constructor(...args: any[]) {
    typeof this.init === 'function' && this.init(...args);

    this.render();
    this.setUpEventHandlers.call(this);
  }

  destroy() {
    typeof this.unmount === 'function' && this.unmount();

    this.removeEventHandlers.call(this);
  }

  /**
   * Creates all game's event listeners
   */
  setUpEventHandlers() {
    for (const prop in this.eventHandlers) {
      const handler = this.eventHandlers[prop];

      handler.target.addEventListener(handler.type, handler.listener);
    }
  }

  /**
   * Removes all game's event listeners
   */
  removeEventHandlers() {
    for (const prop in this.eventHandlers) {
      const handler = this.eventHandlers[prop];

      handler.target.removeEventListener(handler.type, handler.listener);
    }
  }
}
