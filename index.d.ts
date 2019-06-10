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
    static getData(key: string): any;
    static saveData(key: string, data: any): void;
    static removeData(key: string): void;
  }

  class Utils {
    static setCellSize(vmin: number): number;
    static getRandomNum(min = 1, max = 1, discard: number[] = []): number;
  }

  class GameComponent<T = {}> {
    constructor(...args: any[]): void;
    services: T;
    eventHandlers: IEventHandler[];
    init(...args: any[]): void;
    render(): void;
    unmount(): void;
    destroy(): void;
  }

  class MenuComponent<T = {}> {
    constructor(...args: any[]): void;
    services: T;
    root: HTMLElement;
    items: IMenuItem[];
    init(): void;
    unmount(): void;
    destroy(): void;
  }

  class ModalComponent<T = {}> {
    constructor(page: GameComponent<T> | MenuComponent<T>, text?: string, size?: 'large' | 'medium' | 'small', ...args: any[]): void;
    page: GameComponent<T> | MenuComponent<T>;
    modalContainer: HTMLElement;
    mask: HTMLElement;
    modalWindow: HTMLElement;
    modalClose: HTMLElement;
    modal: HTMLElement;
    modalContent: string;
    eventHandlers: IEventHandler[];
    init(...args: any[]): void;
    render(): void;
    unmount(): void;
    close(restoreHandlers?: boolean): void;
  }

  class BaseService {
    constructor(token?: string): void;
    http: IHttpDataSource;
  }

  class WsService {
    constructor(uri: string, updateState: (event?: MessageEvent) => void): void;
    send(data: string): void;
  }

  interface IHttpDataSource {
    token: string;
    get(url: string): Promise<any>;
    post(url: string, data: any): Promise<any>;
    put(url: string, data: any): Promise<any>;
    remove(url: string, data: any): Promise<any>;
  }

  interface IWsService {
    send(data: string): void;
  }

  interface IMenuItem {
    id?: string;
    type: 'button' | 'checkbox' | 'html' | 'password' | 'radio' | 'select' | 'text';
    name?: string;
    className?: string;
    value?: string;
    label?: string;
    placeholder?: string;
    checked?: boolean;
    autocomplete?: string;
    options?: IMenuItemOption[];
    action?: IMenuItemAction;
  }

  interface IMenuItemOption {
    value: string;
    text: string;
    label?: string;
    selected?: boolean;
  }

  interface IMenuItemAction {
    type: string;
    handler: EventListener;
  }

  interface IEventHandler {
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
