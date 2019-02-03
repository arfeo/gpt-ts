export interface IEventHandler {
  [key: string]: {
    target: HTMLElement;
    type: string;
    listener: EventListener
  }
}
