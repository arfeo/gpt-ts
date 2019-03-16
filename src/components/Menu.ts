import { GameComponent } from './Game';

interface IMenuItem {
  id: number;
  type: 'button' | 'checkbox' | 'html' | 'password' | 'radio' | 'text';
  name?: string;
  className?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  checked?: boolean;
  autocomplete?: string;
  action?: {
    type: string;
    handler: EventListener;
  }
}

abstract class MenuComponent<T = {}> extends GameComponent<T> {
  root: HTMLElement;
  items: IMenuItem[];

  render() {
    const menuContainer: HTMLElement = document.createElement('div');

    menuContainer.className = 'menuContainer';

    this.eventHandlers = [];
    this.root.innerHTML = '';

    this.root.appendChild(menuContainer);

    for (const item of this.items) {
      const menuItem: HTMLElement = document.createElement('div');
      let menuElement: Partial<HTMLDivElement & HTMLInputElement>;
      let elementLabel: HTMLLabelElement;

      menuItem.className = 'menuItem';

      menuContainer.appendChild(menuItem);

      switch (item.type) {
        case 'button':
        case 'text':
        case 'password': {
          menuElement = document.createElement('input');

          menuElement.id = `${item.type}-${item.id}`;
          menuElement.type = item.type;

          if (item.name) {
            menuElement.name = item.name;
          }

          if (item.value) {
            menuElement.value = item.value;
          }

          if (item.className) {
            menuElement.className = item.className;
          }

          if (item.type !== 'button') {
            if (item.placeholder) {
              menuElement.placeholder = item.placeholder;
            }

            if (item.autocomplete) {
              menuElement.autocomplete = item.autocomplete;
            }
          }
          break;
        }
        case 'checkbox':
        case 'radio': {
          menuElement = document.createElement('input');

          menuElement.id = `${item.type}-${item.id}`;
          menuElement.type = item.type;

          if (item.name) {
            menuElement.name = item.name;
          }

          if (item.className) {
            menuElement.className = item.className;
          }

          if (item.checked) {
            menuElement.checked = item.checked;
          }

          elementLabel = document.createElement('label');

          elementLabel.htmlFor = `${item.type}-${item.id}`;
          elementLabel.innerHTML = item.label || '';
          break;
        }
        case 'html': {
          menuElement = document.createElement('div');

          if (item.value) {
            menuElement.value = item.value;
          }

          if (item.className) {
            menuElement.className = item.className;
          }

          menuElement.innerHTML = item.value || '';
          break;
        }
        default: break;
      }

      menuItem.appendChild(menuElement as Node);

      if (elementLabel) {
        menuItem.appendChild(elementLabel);
      }

      if (item.action) {
        this.eventHandlers.push({
          id: item.id,
          target: menuElement as HTMLElement,
          type: item.action.type,
          listener: item.action.handler,
        });
      }
    }
  }
}

export { MenuComponent, IMenuItem };
