import { Utils } from '../classes';

import { EventHandler } from '../types';

export abstract class GameComponent<T = {}> {
  services: T;
  eventHandlers: EventHandler[];
  init?(...args: any[]): void;
  abstract render(): void;
  unmount?(): void;

  protected constructor(...args: any[]) {
    this.eventHandlers = [];

    this.beforeMount(...args).then(() => {
      typeof this.render === 'function' && this.render();

      if (Array.isArray(this.eventHandlers) && this.eventHandlers.length > 0) {
        this.setUpEventHandlers();
      }
    });
  }

  async beforeMount(...args: any[]): Promise<void> {
    typeof this.init === 'function' && await this.init(...args);

    return Promise.resolve();
  }

  destroy() {
    typeof this.unmount === 'function' && this.unmount();

    if (Array.isArray(this.eventHandlers) && this.eventHandlers.length > 0) {
      this.removeEventHandlers();
    }
  }

  setUpEventHandlers() {
    for (const prop of this.eventHandlers) {
      const target: HTMLElement = Utils.isElement(prop.target)
        ? prop.target as HTMLElement
        : document.getElementById(prop.target as string);

      target.addEventListener(prop.type, prop.listener);
    }
  }

  removeEventHandlers() {
    for (const prop of this.eventHandlers) {
      const target: HTMLElement = Utils.isElement(prop.target)
        ? prop.target as HTMLElement
        : document.getElementById(prop.target as string);

      target.removeEventListener(prop.type, prop.listener);
    }
  }
}
