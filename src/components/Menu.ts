import { GameComponent } from './Game';

interface MenuItem {
  id?: string;
  type: 'button' | 'checkbox' | 'html' | 'password' | 'radio' | 'select' | 'text';
  name?: string;
  className?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  checked?: boolean;
  autocomplete?: string;
  options?: MenuItemOption[];
  action?: MenuItemAction;
}

interface MenuItemOption {
  value: string;
  text: string;
  label?: string;
  selected?: boolean;
}

interface MenuItemAction {
  type: string;
  handler: EventListener;
}

abstract class MenuComponent<T = {}> extends GameComponent<T> {
  root: HTMLElement;
  items: MenuItem[];

  async beforeMount(...args: any[]): Promise<void> {
    this.eventHandlers = [];
    this.items = [];

    typeof this.init === 'function' && await this.init(...args);

    return Promise.resolve();
  }

  render() {
    const menuContainer: HTMLElement = document.createElement('div');

    menuContainer.className = 'menuContainer';

    this.root.innerHTML = '';

    this.root.appendChild(menuContainer);

    for (const item of this.items) {
      const menuItem: HTMLElement = document.createElement('div');
      let menuElement: Partial<HTMLInputElement>;
      let elementLabel: HTMLLabelElement;

      menuItem.className = 'menuItem';

      menuContainer.appendChild(menuItem);

      switch (item.type) {
        case 'button':
        case 'text':
        case 'password': {
          menuElement = document.createElement('input');

          menuElement.type = item.type;

          if (item.name) {
            menuElement.name = item.name;
          }

          if (item.value) {
            menuElement.value = item.value;
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

          menuElement.type = item.type;

          if (item.name) {
            menuElement.name = item.name;
          }

          if (item.checked) {
            menuElement.checked = item.checked;
          }

          elementLabel = document.createElement('label');

          elementLabel.htmlFor = `${item.type}-${item.id}`;
          elementLabel.innerHTML = item.label || '';
          break;
        }
        case 'select': {
          menuElement = document.createElement('select');

          for (const opt of item.options) {
            const option: HTMLOptionElement = document.createElement('option');

            option.value = opt.value;
            option.text = opt.text;

            if (opt.label) {
              option.label = opt.label;
            }

            option.selected = opt.selected || false;

            menuElement.appendChild(option);
          }
          break;
        }
        case 'html': {
          menuElement = document.createElement('div');

          if (item.value) {
            menuElement.value = item.value;
          }

          menuElement.innerHTML = item.value || '';
          break;
        }
        default: break;
      }

      if (item.id) {
        menuElement.id = item.id;
      }

      if (item.className) {
        menuElement.className = item.className;
      }

      menuItem.appendChild(menuElement as Node);

      if (elementLabel) {
        menuItem.appendChild(elementLabel);
      }

      if (item.action) {
        this.eventHandlers.push({
          target: menuElement as HTMLElement,
          type: item.action.type,
          listener: item.action.handler,
        });
      }
    }
  }
}

export {
  MenuComponent,
  MenuItem,
  MenuItemOption,
  MenuItemAction,
};
