export = Gpt;
export as namespace Gpt;

declare namespace Gpt {
  class Draw {
    static createCanvas(
      canvasId: string,
      parentElement: Node,
      options?: Partial<Omit<HTMLCanvasElement, 'id'>>,
    ): void;

    static getContextByCanvasId(
      canvasId: string,
      contextType?: string,
    ): CanvasRenderingContext2D | WebGLRenderingContext | null;

    static circle(
      canvasId: string,
      dotX: number,
      dotY: number,
      radius: number,
      options: DrawCircleOptions,
    ): void;

    static sector(
      canvasId: string,
      dotX: number,
      dotY: number,
      radius: number,
      startAngle: number,
      endAngle: number,
      options: DrawSectorOptions,
    ): void;

    static arc(
      canvasId: string,
      cx: number,
      cy: number,
      radius: number,
      startAngle: number,
      endAngle: number,
      options: DrawArcOptions,
    ): void;

    static lineToAngle(
      canvasId: string,
      x1: number,
      y1: number,
      length: number,
      angle: number,
      options: DrawLineToAngleOptions,
    ): number[][];

    static rectangle(
      canvasId: string,
      left: number,
      top: number,
      width: number,
      height: number,
      options: DrawRectangleOptions,
    ): void;

    static triangle(
      canvasId: string,
      c1: number[],
      c2: number[],
      c3: number[],
      options: DrawTriangleOptions,
    ): void;

    static star(
      canvasId: string,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
      options: DrawStarOptions,
    ): void;
  }

  class Maths {
    static lineSegmentsIntersect(
      segment1: LineSegment,
      segment2: LineSegment,
    ): boolean;

    static pointOnLineSegment(
      segment: LineSegment,
      point: Point,
      tolerance: number,
    ): boolean;

    static lineSegmentIntersectsWithRect(
      segment: LineSegment,
      rectCoords: number[],
    ): boolean;
  }

  class Storage {
    static getData(key: string): any;
    static saveData(key: string, data: any): void;
    static removeData(key: string): void;
  }

  class Utils {
    static getCellSize(vmin: number): number;
    static getRandomNum(min?: number, max?: number, discard?: number[]): number;
    static isElement(value: any): boolean;
  }

  class GameComponent<T = {}> {
    constructor(...args: any[]): void;
    services: T;
    eventHandlers: EventHandler[];
    init(...args: any[]): Promise<any> | void;
    render(): void;
    setUpEventHandlers(): void;
    removeEventHandlers(): void;
    beforeUnmount(): void;
    destroy(): void;
  }

  class MenuComponent<T = {}> {
    constructor(...args: any[]): void;
    services: T;
    root: HTMLElement;
    items: MenuItem[];
    init(): Promise<any> | void;
    beforeUnmount(): void;
    destroy(): void;
  }

  class ModalComponent<T = {}> {
    constructor(
      page: GameComponent<T> | MenuComponent<T>,
      text?: string,
      size?: 'large' | 'medium' | 'small',
      ...args: any[]
    ): void;
    parent: GameComponent<T> | MenuComponent<T>;
    modalContainer: HTMLElement;
    mask: HTMLElement;
    modalWindow: HTMLElement;
    modalClose: HTMLElement;
    modal: HTMLElement;
    modalContent: string;
    eventHandlers: EventHandler[];
    init(...args: any[]): Promise<any> | void;
    render(): void;
    beforeUnmount(): void;
    destroy(shouldRestoreParentHandlers?: boolean): void;
  }

  class HttpService {
    constructor(token?: string): void;
    http: {
      token: string;
      get(url: string): Promise<any>;
      post(url: string, data: any): Promise<any>;
      put(url: string, data: any): Promise<any>;
      remove(url: string, data: any): Promise<any>;
    };
  }

  class WsService {
    constructor(uri: string, updateState: (event?: MessageEvent) => void): void;
    ws: {
      onOpen(event: Event): void;
      onClose(event: Event): void;
      onMessage(event: Event): void;
      onError(event: Event): void;
      send(data: string): void;
    };
  }

  interface DrawCommonOptions {
    fillColor?: string,
    edgingWidth?: number,
    edgingColor?: string,
    lineColor?: string,
    lineWidth?: number,
  }

  type DrawCircleOptions = Omit<DrawCommonOptions, 'lineColor' | 'lineWidth'>;
  type DrawSectorOptions = Omit<DrawCommonOptions, 'lineColor' | 'lineWidth'>;
  type DrawArcOptions = Omit<DrawCommonOptions, 'lineColor' | 'lineWidth'>;
  type DrawLineToAngleOptions = Pick<DrawCommonOptions, 'lineColor' | 'lineWidth'>;
  type DrawRectangleOptions = Omit<DrawCommonOptions, 'lineColor' | 'lineWidth'>;
  type DrawTriangleOptions = Omit<DrawCommonOptions, 'lineColor' | 'lineWidth'>;
  type DrawStarOptions = Omit<DrawCommonOptions, 'lineColor' | 'lineWidth'>;

  export interface LineSegment {
    start: Point;
    end: Point;
  }

  interface Point {
    x: number;
    y: number;
  }

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

  interface EventHandler {
    target: HTMLElement | string;
    type: string;
    listener: EventListener;
  }
}
