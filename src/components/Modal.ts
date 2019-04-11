import { GameComponent } from './Game';
import { MenuComponent } from './Menu';

export abstract class ModalComponent<T = {}> {
  page: GameComponent<T> | MenuComponent<T>;
  modalContainer: HTMLElement;
  mask: HTMLElement;
  modalWindow: HTMLElement;
  modalClose: HTMLElement;
  modal: HTMLElement;
  modalContent: string;
  abstract render(): void;

  protected constructor(
    page: GameComponent<T> | MenuComponent<T>,
    text?: string,
    size?: 'large' | 'medium' | 'small'
  ) {
    this.page = page;

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

    this.render();

    this.page.removeEventHandlers.call(this.page);

    this.modalClose.addEventListener('click', this.close.bind(this));
  }

  close(restoreHandlers = true) {
    this.modalContainer.remove();

    if (restoreHandlers) {
      this.page.setUpEventHandlers.call(this.page);
    }
  }
}
