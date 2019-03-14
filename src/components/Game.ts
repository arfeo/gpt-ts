import { IEventHandler } from '../types';

export abstract class GameComponent<T = {}> {
  services: T;
  eventHandlers: IEventHandler[];
  init?(...args: any[]): void;
  abstract render(): void;
  unmount?(): void;

  protected constructor(...args: any[]) {
    typeof this.init === 'function' && this.init(...args);
    typeof this.render === 'function' && this.render();

    if (Array.isArray(this.eventHandlers) && this.eventHandlers.length > 0) {
      this.setUpEventHandlers.call(this);
    }
  }

  destroy() {
    typeof this.unmount === 'function' && this.unmount();

    if (Array.isArray(this.eventHandlers) && this.eventHandlers.length > 0) {
      this.removeEventHandlers.call(this);
    }
  }

  /**
   * Creates all game's event listeners
   */
  setUpEventHandlers() {
    for (const prop of this.eventHandlers) {
      prop.target.addEventListener(prop.type, prop.listener);
    }
  }

  /**
   * Removes all game's event listeners
   */
  removeEventHandlers() {
    for (const prop of this.eventHandlers) {
      prop.target.removeEventListener(prop.type, prop.listener);
    }
  }
}
