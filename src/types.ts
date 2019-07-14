export interface EventHandler {
  target: HTMLElement;
  type: string;
  listener: EventListener;
}
