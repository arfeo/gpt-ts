export = Gpt;
export as namespace Gpt;

declare namespace Gpt {
  export class Draw {
    public static createCanvas(
      canvasId: string,
      parentElement: Node,
      options?: Partial<Omit<HTMLCanvasElement, 'id'>>,
    ): void;

    public static getContextByCanvasId(
      canvasId: string,
      contextType?: string,
    ): CanvasRenderingContext2D | WebGLRenderingContext | null;

    public static circle(
      canvasId: string,
      dotX: number,
      dotY: number,
      radius: number,
      options: DrawCircleOptions,
    ): void;

    public static sector(
      canvasId: string,
      dotX: number,
      dotY: number,
      radius: number,
      startAngle: number,
      endAngle: number,
      options: DrawSectorOptions,
    ): void;

    public static arc(
      canvasId: string,
      cx: number,
      cy: number,
      radius: number,
      startAngle: number,
      endAngle: number,
      options: DrawArcOptions,
    ): void;

    public static lineToAngle(
      canvasId: string,
      x1: number,
      y1: number,
      length: number,
      angle: number,
      options: DrawLineToAngleOptions,
    ): number[][];

    public static rectangle(
      canvasId: string,
      left: number,
      top: number,
      width: number,
      height: number,
      options: DrawRectangleOptions,
    ): void;

    public static triangle(
      canvasId: string,
      c1: number[],
      c2: number[],
      c3: number[],
      options: DrawTriangleOptions,
    ): void;

    public static star(
      canvasId: string,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
      options: DrawStarOptions,
    ): void;
  }

  export class Maths {
    public static lineSegmentsIntersect(
      segment1: LineSegment,
      segment2: LineSegment,
    ): boolean;

    public static pointOnLineSegment(
      segment: LineSegment,
      point: Point,
      tolerance: number,
    ): boolean;

    public static lineSegmentIntersectsWithRect(
      segment: LineSegment,
      rectCoords: number[],
    ): boolean;
  }

  export class Storage {
    public static getData(key: string): any;
    public static saveData(key: string, data: any): void;
    public static removeData(key: string): void;
  }

  export class Utils {
    public static getCellSize(vmin: number): number;
    public static getRandomNum(min?: number, max?: number, discard?: number[]): number;
    public static isElement(value: any): boolean;
  }

  export class GameComponent<T = {}> {
    public constructor(...args: any[]): void;
    public services: T;
    public eventHandlers: EventHandler[];
    public init(...args: any[]): Promise<any> | void;
    public render(): void;
    public setUpEventHandlers(): void;
    public removeEventHandlers(): void;
    public beforeUnmount(): void;
    public destroy(): void;
  }

  export class MenuComponent<T = {}> {
    public constructor(...args: any[]): void;
    public services: T;
    public root: HTMLElement;
    public items: MenuItem[];
    public init(...args: any[]): Promise<any> | void;
    public beforeUnmount(): void;
    public destroy(): void;
  }

  export class ModalComponent<T = {}> {
    protected constructor(
      page: GameComponent<T> | MenuComponent<T>,
      text?: string,
      size?: 'large' | 'medium' | 'small',
      ...args: any[]
    ): void;
    public parent: GameComponent<T> | MenuComponent<T>;
    public modalContainer: HTMLElement;
    public mask: HTMLElement;
    public modalWindow: HTMLElement;
    public modalClose: HTMLElement;
    public modal: HTMLElement;
    public modalContent: string;
    public eventHandlers: EventHandler[];
    public init(...args: any[]): Promise<any> | void;
    public render(): void;
    public beforeUnmount(): void;
    public destroy(shouldRestoreParentHandlers?: boolean): void;
  }

  export class HttpService {
    public constructor(token?: string): void;
    public http: {
      token: string;
      get(url: string): Promise<any>;
      post(url: string, data: any): Promise<any>;
      put(url: string, data: any): Promise<any>;
      remove(url: string, data: any): Promise<any>;
    };
  }

  export class WsService {
    public constructor(uri: string, updateState: (event?: MessageEvent) => void): void;
    public ws: {
      onOpen(event: Event): void;
      onClose(event: Event): void;
      onMessage(event: Event): void;
      onError(event: Event): void;
      send(data: string): void;
    };
  }

  export interface DrawCommonOptions {
    fillColor?: string;
    edgingWidth?: number;
    edgingColor?: string;
    lineColor?: string;
    lineWidth?: number;
  }

  export type DrawCircleOptions = Omit<DrawCommonOptions, 'lineColor' | 'lineWidth'>;
  export type DrawSectorOptions = Omit<DrawCommonOptions, 'lineColor' | 'lineWidth'>;
  export type DrawArcOptions = Omit<DrawCommonOptions, 'lineColor' | 'lineWidth'>;
  export type DrawLineToAngleOptions = Pick<DrawCommonOptions, 'lineColor' | 'lineWidth'>;
  export type DrawRectangleOptions = Omit<DrawCommonOptions, 'lineColor' | 'lineWidth'>;
  export type DrawTriangleOptions = Omit<DrawCommonOptions, 'lineColor' | 'lineWidth'>;
  export type DrawStarOptions = Omit<DrawCommonOptions, 'lineColor' | 'lineWidth'>;

  export interface LineSegment {
    start: Point;
    end: Point;
  }

  export interface Point {
    x: number;
    y: number;
  }

  export interface MenuItem {
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

  export interface MenuItemOption {
    value: string;
    text: string;
    label?: string;
    selected?: boolean;
  }

  export interface MenuItemAction {
    type: string;
    handler: EventListener;
  }

  export interface EventHandler {
    target: HTMLElement | string;
    type: string;
    listener: EventListener;
  }
}
