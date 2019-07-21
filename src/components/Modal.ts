import { GameComponent } from './Game';
import { MenuComponent } from './Menu';

import { Utils } from '../classes';

import { EventHandler } from '../types';

export abstract class ModalComponent<T = {}> {
  page: GameComponent<T> | MenuComponent<T>;
  modalContainer: HTMLElement;
  mask: HTMLElement;
  modalWindow: HTMLElement;
  modalClose: HTMLElement;
  modal: HTMLElement;
  modalContent: string;
  eventHandlers: EventHandler[];
  init?(...args: any[]): void;
  abstract render(): void;
  unmount?(): void;

  protected constructor(
    page: GameComponent<T> | MenuComponent<T>,
    text?: string,
    size?: 'large' | 'medium' | 'small',
    ...args: any[]
  ) {
    this.page = page;

    this.eventHandlers = [];

    this.modalContainer = document.createElement('div');
    this.modalContainer.className = 'modal-container';

    this.mask = document.createElement('div');
    this.mask.className = 'mask';

    this.modalWindow = document.createElement('div');
    this.modalWindow.classList.add('modal-window');
    this.modalWindow.classList.add(size || 'medium');

    this.modalClose = document.createElement('div');
    this.modalClose.className = 'modal-close';

    this.modal = document.createElement('div');
    this.modal.className = 'modal';

    document.body.appendChild(this.modalContainer);
    this.modalContainer.appendChild(this.mask);
    this.mask.appendChild(this.modalWindow);
    this.modalWindow.appendChild(this.modalClose);
    this.modalWindow.appendChild(this.modal);

    this.modalContent = text || '';

    this.page.removeEventHandlers.call(this.page);

    this.modalClose.addEventListener('click', this.close.bind(this));

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

  close(restoreHandlers = true) {
    typeof this.unmount === 'function' && this.unmount();

    if (Array.isArray(this.eventHandlers) && this.eventHandlers.length > 0) {
      this.removeEventHandlers();
    }

    this.modalContainer.remove();

    if (restoreHandlers && Array.isArray(this.page.eventHandlers) && this.page.eventHandlers.length > 0) {
      this.page.setUpEventHandlers.call(this.page);
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
