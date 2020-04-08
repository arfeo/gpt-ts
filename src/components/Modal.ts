import { PageComponent } from './Page';

import { Utils } from '../classes';

import { EventHandler } from '../types';

export abstract class ModalComponent<T = {}> {
  public parent: PageComponent<T>;
  public modalContainer: HTMLElement;
  public mask: HTMLElement;
  public modalWindow: HTMLElement;
  public modalClose: HTMLElement;
  public modal: HTMLElement;
  public modalContent: string;
  public eventHandlers: EventHandler[];
  public init?(...args: any[]): Promise<any> | void;
  public abstract render(): void;
  public beforeUnmount?(): void;

  protected constructor(
    parent: PageComponent<T>,
    text?: string,
    size?: 'large' | 'medium' | 'small',
    ...args: any[]
  ) {
    this.parent = parent;

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

    const { eventHandlers: parentEventHandlers } = this.parent;

    if (Array.isArray(parentEventHandlers) && parentEventHandlers.length > 0) {
      this.parent.removeEventHandlers.call(this.parent);
    }

    this.modalClose.addEventListener('click', this.destroy.bind(this));

    this.beforeMount(...args).then((): void => {
      typeof this.render === 'function' && this.render();

      if (Array.isArray(this.eventHandlers) && this.eventHandlers.length > 0) {
        this.setUpEventHandlers();
      }
    });
  }

  protected async beforeMount(...args: any[]): Promise<void> {
    typeof this.init === 'function' && await this.init(...args);

    return Promise.resolve();
  }

  private setUpEventHandlers(): void {
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

  private removeEventHandlers(): void {
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

  public destroy(shouldRestoreParentHandlers = true): void {
    const { eventHandlers: parentEventHandlers } = this.parent;

    typeof this.beforeUnmount === 'function' && this.beforeUnmount();

    if (Array.isArray(this.eventHandlers) && this.eventHandlers.length > 0) {
      this.removeEventHandlers();
    }

    this.modalContainer.remove();

    if (shouldRestoreParentHandlers && Array.isArray(parentEventHandlers) && parentEventHandlers.length > 0) {
      this.parent.setUpEventHandlers.call(this.parent);
    }
  }
}
