import { Utils } from '../classes';

import { EventHandler } from '../types';

export abstract class GameComponent<T = {}> {
  public services: T;
  public eventHandlers: EventHandler[];
  public init?(...args: any[]): Promise<any> | void;
  public abstract render(): void;
  public beforeUnmount?(): void;

  public constructor(...args: any[]) {
    this.eventHandlers = [];

    this.beforeMount(...args).then((): void => {
      typeof this.render === 'function' && this.render();

      if (Array.isArray(this.eventHandlers) && this.eventHandlers.length > 0) {
        this.setUpEventHandlers();
      }
    });
  }

  public async beforeMount(...args: any[]): Promise<void> {
    typeof this.init === 'function' && await this.init(...args);

    return Promise.resolve();
  }

  public setUpEventHandlers(): void {
    for (const prop of this.eventHandlers) {
      const { target, type, listener } = prop;
      const element: HTMLElement = Utils.isElement(target)
        ? target as HTMLElement
        : document.getElementById(target as string);

      if (!element) {
        break;
      }

      element.addEventListener(type, listener);
    }
  }

  public removeEventHandlers(): void {
    for (const prop of this.eventHandlers) {
      const { target, type, listener } = prop;
      const element: HTMLElement = Utils.isElement(target)
        ? target as HTMLElement
        : document.getElementById(target as string);

      if (!element) {
        break;
      }

      element.removeEventListener(type, listener);
    }
  }

  public destroy(): void {
    typeof this.beforeUnmount === 'function' && this.beforeUnmount();

    if (Array.isArray(this.eventHandlers) && this.eventHandlers.length > 0) {
      this.removeEventHandlers();
    }
  }
}
