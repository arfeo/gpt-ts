declare module 'gpt-ts' {
  class Draw {
    static circle(
      ctx: CanvasRenderingContext2D,
      dotX: number,
      dotY: number,
      radius: number,
      fillStyle?: string,
      edgingWidth?: number,
      edgingColor?: string,
    ): void;

    static sector(
      ctx: CanvasRenderingContext2D,
      dotX: number,
      dotY: number,
      radius: number,
      startAngle: number,
      endAngle: number,
      fillStyle?: string,
      edgingWidth?: number,
      edgingColor?: string,
    ): void;

    static arc(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      radius: number,
      startAngle: number,
      endAngle: number,
      fillStyle?: string,
      edgingWidth?: number,
      edgingColor?: string,
    ): void;

    static lineToAngle(
      ctx: CanvasRenderingContext2D,
      x1: number,
      y1: number,
      length: number,
      angle: number,
      strokeStyle: string,
      lineWidth: number,
    ): number[][];

    static rectangle(
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      width: number,
      height: number,
      fillStyle?: string,
      edgingWidth?: number,
      edgingColor?: string,
    ): void;

    static triangle(
      ctx: CanvasRenderingContext2D,
      c1: number[],
      c2: number[],
      c3: number[],
      fillStyle?: string,
      edgingWidth?: number,
      edgingColor?: string,
    ): void;

    static star(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
      fillStyle?: string,
      edgingWidth?: number,
      edgingColor?: string,
    ): void;
  }

  class Maths {
    static lineSegmentsIntersect(segment1: ILineSegment, segment2: ILineSegment): boolean;
    static pointOnLineSegment(segment: ILineSegment, point: IPoint, tolerance: number): boolean;
    static lineSegmentIntersectsWithRect(segment: ILineSegment, rectCoords: number[]): boolean;
  }

  class Storage {
    static getStorageData(key: string): any;
    static saveStorageData(key: string, data: any): void;
    static removeStorageData(key: string): void;
  }

  class Utils {
    static setCellSize(vmin: number): number;
    static getRandomNum(min = 1, max = 1, discard: number[] = []): number;
  }

  class GameComponent {
    constructor(...args: any[]): void;
    eventHandlers: IEventHandler[];
    init(...args: any[]): void;
    render(): void;
    unmount(): void;
    destroy(): void;
  }

  class MenuComponent {
    root: HTMLElement;
    items: IMenuItem[];
    init(): void;
    unmount(): void;
    destroy(): void;
  }

  class ModalComponent {
    constructor(game: GameComponent, text?: string, size?: 'large' | 'medium' | 'small'): void;
    game: GameComponent;
    modalContainer: HTMLElement;
    mask: HTMLElement;
    modalWindow: HTMLElement;
    modalClose: HTMLElement;
    modal: HTMLElement;
    modalContent: string;
    render(): void;
    close(restoreHandlers?: boolean): void;
  }

  class HttpDataSource {
    get(url: string, token: string): Promise<any>;
    post(url: string, data: any, token: string): Promise<any>;
    put(url: string, data: any, token: string): Promise<any>;
    remove(url: string, data: any, token: string): Promise<any>;
  }

  interface IMenuItem {
    id: number;
    type: 'button' | 'checkbox' | 'html' | 'radio' | 'text';
    name?: string;
    className?: string;
    value?: string;
    label?: string;
    placeholder?: string;
    action?: {
      type: string;
      handler: () => void;
    }
  }

  export interface IEventHandler {
    id: number;
    target: HTMLElement;
    type: string;
    listener: EventListener;
  }

  interface ILineSegment {
    start: IPoint;
    end: IPoint;
  }

  interface IPoint {
    x: number;
    y: number;
  }
}
