import { Utils } from '../classes';

import { EventHandler } from '../types';

export abstract class GameComponent<T = {}> {
  services: T;
  eventHandlers: EventHandler[];
  init?(...args: any[]): Promise<any> | void;
  abstract render(): void;
  beforeUnmount?(): void;

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

  setUpEventHandlers(): void {
    for (const prop of this.eventHandlers) {
      const { target, type, listener } = prop;
      const element: HTMLElement = Utils.isElement(target) ? target as HTMLElement : document.getElementById(target as string);

      if (!element) {
        break;
      }

      element.addEventListener(type, listener);
    }
  }

  removeEventHandlers(): void {
    for (const prop of this.eventHandlers) {
      const { target, type, listener } = prop;
      const element: HTMLElement = Utils.isElement(target) ? target as HTMLElement : document.getElementById(target as string);

      if (!element) {
        break;
      }

      element.removeEventListener(type, listener);
    }
  }

  destroy(): void {
    typeof this.beforeUnmount === 'function' && this.beforeUnmount();

    if (Array.isArray(this.eventHandlers) && this.eventHandlers.length > 0) {
      this.removeEventHandlers();
    }
  }
}
