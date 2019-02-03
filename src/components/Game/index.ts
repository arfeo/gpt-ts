import { DEFAULT_STORAGE_PREFIX, DEFAULT_VMIN_VALUE } from '../../constants/game';

import { setUpEventHandlers, removeEventHandlers } from './events';
import { setCellSize } from './utils';

import { IEventHandler } from '../../types/global';

abstract class GameComponent {
  cellSize: number;
  eventHandlers: IEventHandler;
  storagePrefix: string;
  init?(...args: any[]): void;
  abstract render(): void;
  unmount?(): void;

  protected constructor(...args: any[]) {
    this.cellSize = setCellSize(DEFAULT_VMIN_VALUE);
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
