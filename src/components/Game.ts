import { IEventHandler } from '../types';

export abstract class GameComponent<T = {}> {
  services: T;
  eventHandlers: IEventHandler[];
  init?(...args: any[]): void;
  abstract render(): void;
  unmount?(): void;

  protected constructor(...args: any[]) {
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
      prop.target.addEventListener(prop.type, prop.listener);
    }
  }

  removeEventHandlers() {
    for (const prop of this.eventHandlers) {
      prop.target.removeEventListener(prop.type, prop.listener);
    }
  }
}
