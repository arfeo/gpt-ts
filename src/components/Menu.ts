import { GameComponent } from './Game';

interface IMenuItem {
  id: number;
  type: 'button' | 'checkbox' | 'html' | 'radio' | 'text';
  name?: string;
  className?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  action: {
    type: string;
    handler: () => void;
  }
}

abstract class MenuComponent extends GameComponent {
  root: HTMLElement;
  items: IMenuItem[];

  protected constructor(root: HTMLElement, items: IMenuItem[]) {
    super(root, items);
  }

  init(...args: any[]) {
    this.root = args[0];
    this.items = args[1];
    this.eventHandlers = [];
  }

  render() {
    const menuContainer: HTMLElement = document.createElement('div');

    menuContainer.className = 'menuContainer';

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
        case 'text': {
          menuElement = document.createElement('input');

          menuElement.type = item.type;
          menuElement.name = item.name || '';
          menuElement.className = item.className || '';
          menuElement.value = item.value || '';

          if (item.type === 'text') {
            menuElement.placeholder = item.placeholder || '';
          }
          break;
        }
        case 'checkbox':
        case 'radio': {
          menuElement = document.createElement('input');

          menuElement.id = `${item.type}-${item.id}`;
          menuElement.type = item.type;
          menuElement.name = item.name || '';
          menuElement.className = item.className || '';

          elementLabel = document.createElement('label');

          elementLabel.htmlFor = `${item.type}-${item.id}`;
          elementLabel.innerHTML = item.label || '';
          break;
        }
        case 'html': {
          menuElement = document.createElement('div');

          menuElement.className = item.className || '';
          menuElement.innerHTML = item.value || '';
          break;
        }
        default: break;
      }

      menuItem.appendChild(menuElement as Node);

      if (elementLabel) {
        menuItem.appendChild(elementLabel);
      }

      this.eventHandlers.push({
        id: item.id,
        target: menuElement as HTMLElement,
        type: item.action.type,
        listener: item.action.handler,
      });
    }
  }
}

export { MenuComponent, IMenuItem };
