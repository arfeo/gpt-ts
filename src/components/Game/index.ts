import { DEFAULT_STORAGE_PREFIX } from '../../constants/game';

import { setUpEventHandlers, removeEventHandlers } from './events';

import { IEventHandler } from '../../types/global';

abstract class GameComponent {
  eventHandlers: IEventHandler;
  storagePrefix: string;
  init?(...args: any[]): void;
  abstract render(): void;
  unmount?(): void;

  protected constructor(...args: any[]) {
    this.storagePrefix = DEFAULT_STORAGE_PREFIX;

    typeof this.init === 'function' && this.init(...args);

    this.render();

    setUpEventHandlers.call(this);
  }

  destroy() {
    typeof this.unmount === 'function' && this.unmount();

    removeEventHandlers.call(this);
  }
}

export { GameComponent };
