declare module 'gpt-ts' {
  declare class GameComponent {
    constructor(...args: any[]): void;
    eventHandlers: IEventHandler;
    init(...args: any[]): void;
    render(): void;
    unmount(): void;
    destroy(): void;
    setUpEventHandlers(): void;
    removeEventHandlers(): void;
  }

  declare class ModalComponent {
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

  declare function drawCircle(
    ctx: CanvasRenderingContext2D,
    dotX: number,
    dotY: number,
    radius: number,
    fillStyle?: string,
    edgingWidth?: number,
    edgingColor?: string,
  ): void;

  declare function drawSector(
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

  declare function drawArc(
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

  declare function drawLineToAngle(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    length: number,
    angle: number,
    strokeStyle: string,
    lineWidth: number,
  ): number[][];

  declare function drawRectangle(
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    width: number,
    height: number,
    fillStyle?: string,
    edgingWidth?: number,
    edgingColor?: string,
  ): void;

  declare function drawTriangle(
    ctx: CanvasRenderingContext2D,
    c1: number[],
    c2: number[],
    c3: number[],
    fillStyle?: string,
    edgingWidth?: number,
    edgingColor?: string,
  ): void;

  declare function drawStar(
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

  declare function lineSegmentsIntersect(segment1: ILineSegment, segment2: ILineSegment): boolean;
  declare function pointOnLineSegment(segment: ILineSegment, point: IPoint, tolerance: number): boolean;
  declare function lineSegmentIntersectsWithRect(segment: ILineSegment, rectCoords: number[]): boolean;

  declare function getStorageData(key: string): any;
  declare function saveStorageData(key: string, data: any): void;
  declare function removeStorageData(key: string): void;

  declare function setCellSize(vmin: number): number;
  declare function getRandomNum(min = 1, max = 1, discard: number[] = []): number;

  declare interface IEventHandler {
    [key: string]: {
      target: HTMLElement;
      type: string;
      listener: EventListener;
    }
  }

  declare interface ILineSegment {
    start: IPoint;
    end: IPoint;
  }

  declare interface IPoint {
    x: number;
    y: number;
  }

}
