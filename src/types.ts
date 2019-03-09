export interface IEventHandler {
  id: number;
  target: HTMLElement;
  type: string;
  listener: EventListener;
}

export interface ILineSegment {
  start: IPoint;
  end: IPoint;
}

export interface IPoint {
  x: number;
  y: number;
}