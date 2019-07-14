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

class Draw {
  /**
   * Creates an instance of the element for the 'canvas' tag;
   * returns the instance
   *
   * @param canvasId
   * @param parentElement
   * @param options
   */
  static createCanvas(
    canvasId: string,
    parentElement: Node,
    options?: Partial<Omit<HTMLCanvasElement, 'id'>>,
  ): void {
    const canvasElement: HTMLCanvasElement = document.createElement('canvas');

    canvasElement.id = canvasId;

    Object.keys(options).map((option: string) => {
      (canvasElement as { [key: string]: any })[option]  = (options as { [key: string]: any })[option];
    });

    parentElement.appendChild(canvasElement);
  }

  /**
   * Returns an object (includes information about colors, line widths, fonts,
   * and other graphic parameters that can be drawn on a canvas)
   * that provides methods and properties for drawing and manipulating
   * images and graphics on a canvas element in a document for the given canvas element id
   *
   * @param canvasId
   * @param contextType
   */
  static getContextByCanvasId(canvasId: string, contextType: string = '2d'): CanvasRenderingContext2D | WebGLRenderingContext | null {
    return (document.getElementById(canvasId) as HTMLCanvasElement).getContext(contextType);
  }

  /**
   * Draws a circle of the given size and style at the given coordinates
   *
   * @param canvasId
   * @param dotX
   * @param dotY
   * @param radius
   * @param options
   */
  static circle(
    canvasId: string,
    dotX: number,
    dotY: number,
    radius: number,
    options: DrawCircleOptions = {},
  ): void {
    const { fillColor, edgingWidth, edgingColor } = options;

    const ctx: CanvasRenderingContext2D = (document.getElementById(canvasId) as HTMLCanvasElement).getContext('2d');

    ctx.beginPath();
    ctx.arc(dotX, dotY, radius, 0, Math.PI * 2);

    ctx.fillStyle = fillColor || 'rgb(255, 255, 255)';
    ctx.fill();

    ctx.lineWidth = edgingWidth || 1;
    ctx.strokeStyle = edgingColor || 'rgba(0, 0, 0, 0)';
    ctx.stroke();
  }

  /**
   * Draws a circle sector of the given style at the given coordinates
   *
   * @param canvasId
   * @param dotX
   * @param dotY
   * @param radius
   * @param startAngle
   * @param endAngle
   * @param options
   */
  static sector(
    canvasId: string,
    dotX: number,
    dotY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    options: DrawSectorOptions = {},
  ): void {
    const { fillColor, edgingWidth, edgingColor } = options;

    const ctx: CanvasRenderingContext2D = (document.getElementById(canvasId) as HTMLCanvasElement).getContext('2d');

    ctx.beginPath();
    ctx.moveTo(dotX, dotY);
    ctx.arc(dotX, dotY, radius, startAngle, endAngle);
    ctx.lineTo(dotX, dotY);
    ctx.closePath();

    ctx.fillStyle = fillColor || 'rgb(255, 255, 255)';
    ctx.fill();

    ctx.lineWidth = edgingWidth || 1;
    ctx.strokeStyle = edgingColor || 'rgba(0, 0, 0, 0)';
    ctx.stroke();
  }

  /**
   * Draws an arc of the given style at the given coordinates
   *
   * @param canvasId
   * @param cx
   * @param cy
   * @param radius
   * @param startAngle
   * @param endAngle
   * @param options
   */
  static arc(
    canvasId: string,
    cx: number,
    cy: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    options: DrawArcOptions = {},
  ): void {
    const { fillColor, edgingWidth, edgingColor } = options;

    const ctx: CanvasRenderingContext2D = (document.getElementById(canvasId) as HTMLCanvasElement).getContext('2d');

    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);

    ctx.fillStyle = fillColor || 'rgb(255, 255, 255)';
    ctx.fill();

    ctx.lineWidth = edgingWidth || 1;
    ctx.strokeStyle = edgingColor || 'rgba(0, 0, 0, 0)';
    ctx.stroke();
  }

  /**
   * Draws a line starting at the given coordinates of the given length at the given angle;
   * it returns an array of start and end positions of the line
   *
   * @param canvasId
   * @param x1
   * @param y1
   * @param length
   * @param angle
   * @param options
   */
  static lineToAngle(
    canvasId: string,
    x1: number,
    y1: number,
    length: number,
    angle: number,
    options: DrawLineToAngleOptions = {},
  ): number[][] {
    const { lineColor, lineWidth } = options;

    const ctx: CanvasRenderingContext2D = (document.getElementById(canvasId) as HTMLCanvasElement).getContext('2d');

    const a = angle * Math.PI / 180;
    const x2 = x1 + length * Math.cos(a);
    const y2 = y1 + length * Math.sin(a);

    ctx.strokeStyle = lineColor || 'rgb(0, 0, 0)';
    ctx.lineWidth = lineWidth || 1;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    return [
      [x1, y1],
      [x2, y2],
    ];
  }

  /**
   * Draws a filled rectangle of the given size and style at the given coordinates
   *
   * @param canvasId
   * @param left
   * @param top
   * @param width
   * @param height
   * @param options
   */
  static rectangle(
    canvasId: string,
    left: number,
    top: number,
    width: number,
    height: number,
    options: DrawRectangleOptions = {},
  ): void {
    const { fillColor, edgingWidth, edgingColor } = options;

    const ctx: CanvasRenderingContext2D = (document.getElementById(canvasId) as HTMLCanvasElement).getContext('2d');

    ctx.fillStyle = fillColor || 'rgb(255, 255, 255)';
    ctx.fillRect(left, top, width, height);

    ctx.lineWidth = edgingWidth || 1;
    ctx.strokeStyle = edgingColor || 'rgba(0, 0, 0, 0)';
    ctx.strokeRect(left, top, width, height);
  }

  /**
   * Draws a filled triangle at the given coordinates
   *
   * @param canvasId
   * @param c1
   * @param c2
   * @param c3
   * @param options
   */
  static triangle(
    canvasId: string,
    c1: number[],
    c2: number[],
    c3: number[],
    options: DrawTriangleOptions = {},
  ): void {
    const { fillColor, edgingWidth, edgingColor } = options;

    const ctx: CanvasRenderingContext2D = (document.getElementById(canvasId) as HTMLCanvasElement).getContext('2d');

    ctx.beginPath();
    ctx.moveTo(c1[0], c1[1]);
    ctx.lineTo(c2[0], c2[1]);
    ctx.lineTo(c3[0], c3[1]);
    ctx.closePath();

    ctx.fillStyle = fillColor || 'rgb(255, 255, 255)';
    ctx.fill();

    ctx.lineWidth = edgingWidth || 1;
    ctx.strokeStyle = edgingColor || 'rgba(0, 0, 0, 0)';
    ctx.stroke();
  }

  /**
   * Draws a star-like object with the given count of spikes at the given coordinates
   *
   * @param canvasId
   * @param cx
   * @param cy
   * @param spikes
   * @param outerRadius
   * @param innerRadius
   * @param options
   */
  static star(
    canvasId: string,
    cx: number,
    cy: number,
    spikes: number,
    outerRadius: number,
    innerRadius: number,
    options: DrawStarOptions = {},
  ): void {
    const { fillColor, edgingWidth, edgingColor } = options;

    const ctx: CanvasRenderingContext2D = (document.getElementById(canvasId) as HTMLCanvasElement).getContext('2d');

    const step = Math.PI / spikes;

    let rotation: number = Math.PI / 2 * 3;
    let x: number = cx;
    let y: number = cy;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i += 1) {
      x = cx + Math.cos(rotation) * outerRadius;
      y = cy + Math.sin(rotation) * outerRadius;
      ctx.lineTo(x, y);
      rotation += step;

      x = cx + Math.cos(rotation) * innerRadius;
      y = cy + Math.sin(rotation) * innerRadius;
      ctx.lineTo(x, y);
      rotation += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();

    ctx.lineWidth = edgingWidth || 1;
    ctx.strokeStyle = edgingColor || 'rgba(0, 0, 0, 0)';
    ctx.stroke();

    ctx.fillStyle = fillColor || 'rgb(255, 255, 255)';
    ctx.fill();
  }
}

export {
  Draw,
  DrawCommonOptions,
  DrawCircleOptions,
  DrawSectorOptions,
  DrawArcOptions,
  DrawRectangleOptions,
  DrawTriangleOptions,
  DrawStarOptions,
  DrawLineToAngleOptions,
}
