export interface EventHandler {
  target: HTMLElement | string;
  type: string;
  listener: EventListener;
}
