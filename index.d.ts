declare module 'gpt-ts' {
  class GameComponent {
    constructor(...args: any[]): void;
    eventHandlers: IEventHandler;
    init(...args: any[]): void;
    render(): void;
    unmount(): void;
    destroy(): void;
    setUpEventHandlers(): void;
    removeEventHandlers(): void;
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

  function drawCircle(
    ctx: CanvasRenderingContext2D,
    dotX: number,
    dotY: number,
    radius: number,
    fillStyle?: string,
    edgingWidth?: number,
    edgingColor?: string,
  ): void;

  function drawSector(
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

  function drawArc(
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

  function drawLineToAngle(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    length: number,
    angle: number,
    strokeStyle: string,
    lineWidth: number,
  ): number[][];

  function drawRectangle(
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    width: number,
    height: number,
    fillStyle?: string,
    edgingWidth?: number,
    edgingColor?: string,
  ): void;

  function drawTriangle(
    ctx: CanvasRenderingContext2D,
    c1: number[],
    c2: number[],
    c3: number[],
    fillStyle?: string,
    edgingWidth?: number,
    edgingColor?: string,
  ): void;

  function drawStar(
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

  function lineSegmentsIntersect(segment1: ILineSegment, segment2: ILineSegment): boolean;
  function pointOnLineSegment(segment: ILineSegment, point: IPoint, tolerance: number): boolean;
  function lineSegmentIntersectsWithRect(segment: ILineSegment, rectCoords: number[]): boolean;

  function getStorageData(key: string): any;
  function saveStorageData(key: string, data: any): void;
  function removeStorageData(key: string): void;

  function setCellSize(vmin: number): number;
  function getRandomNum(min = 1, max = 1, discard: number[] = []): number;

  interface IEventHandler {
    [key: string]: {
      target: HTMLElement;
      type: string;
      listener: EventListener;
    }
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
