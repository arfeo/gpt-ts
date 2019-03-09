export class Draw {
  /**
   * Draws a circle of the given size and style at the given coordinates
   *
   * @param ctx
   * @param dotX
   * @param dotY
   * @param radius
   * @param fillStyle
   * @param edgingWidth
   * @param edgingColor
   */
  static circle(
    ctx: CanvasRenderingContext2D,
    dotX: number,
    dotY: number,
    radius: number,
    fillStyle?: string,
    edgingWidth?: number,
    edgingColor?: string,
  ): void {
    ctx.beginPath();
    ctx.arc(dotX, dotY, radius, 0, Math.PI * 2);

    if (fillStyle) {
      ctx.fillStyle = fillStyle;

      ctx.fill();
    }

    if (edgingWidth) {
      ctx.lineWidth = edgingWidth;
      ctx.strokeStyle = edgingColor || 'rgba(0, 0, 0, 0)';

      ctx.stroke();
    }
  }

  /**
   * Draws a circle sector of the given style at the given coordinates
   *
   * @param ctx
   * @param dotX
   * @param dotY
   * @param radius
   * @param startAngle
   * @param endAngle
   * @param fillStyle
   * @param edgingWidth
   * @param edgingColor
   */
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
  ): void {
    ctx.beginPath();
    ctx.moveTo(dotX, dotY);
    ctx.arc(dotX, dotY, radius, startAngle, endAngle);
    ctx.lineTo(dotX, dotY);
    ctx.closePath();

    if (fillStyle) {
      ctx.fillStyle = fillStyle;

      ctx.fill();
    }

    if (edgingWidth) {
      ctx.lineWidth = edgingWidth;
      ctx.strokeStyle = edgingColor || 'rgba(0, 0, 0, 0)';

      ctx.stroke();
    }
  }

  /**
   * Draws an arc of the given style at the given coordinates
   *
   * @param ctx
   * @param cx
   * @param cy
   * @param radius
   * @param startAngle
   * @param endAngle
   * @param fillStyle
   * @param edgingWidth
   * @param edgingColor
   */
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
  ): void {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);

    if (fillStyle) {
      ctx.fillStyle = fillStyle;

      ctx.fill();
    }

    if (edgingWidth) {
      ctx.lineWidth = edgingWidth;
      ctx.strokeStyle = edgingColor || 'rgba(0, 0, 0, 0)';

      ctx.stroke();
    }
  }

  /**
   * Draws a line starting at the given coordinates of the given length at the given angle;
   * it returns an array of start and end positions of the line
   *
   * @param ctx
   * @param x1
   * @param y1
   * @param length
   * @param angle
   * @param strokeStyle
   * @param lineWidth
   */
  static lineToAngle(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    length: number,
    angle: number,
    strokeStyle: string,
    lineWidth: number,
  ): number[][] {
    const a = angle * Math.PI / 180;
    const x2 = x1 + length * Math.cos(a);
    const y2 = y1 + length * Math.sin(a);

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;

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
   * @param ctx
   * @param left
   * @param top
   * @param width
   * @param height
   * @param fillStyle
   * @param edgingWidth
   * @param edgingColor
   */
  static rectangle(
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    width: number,
    height: number,
    fillStyle?: string,
    edgingWidth?: number,
    edgingColor?: string,
  ): void {
    if (fillStyle) {
      ctx.fillStyle = fillStyle;

      ctx.fillRect(left, top, width, height);
    }

    if (edgingWidth) {
      ctx.lineWidth = edgingWidth;
      ctx.strokeStyle = edgingColor || 'rgba(0, 0, 0, 0)';

      ctx.strokeRect(left, top, width, height);
    }
  }

  /**
   * Draws a filled triangle at the given coordinates
   *
   * @param ctx
   * @param c1
   * @param c2
   * @param c3
   * @param fillStyle
   * @param edgingWidth
   * @param edgingColor
   */
  static triangle(
    ctx: CanvasRenderingContext2D,
    c1: number[],
    c2: number[],
    c3: number[],
    fillStyle?: string,
    edgingWidth?: number,
    edgingColor?: string,
  ): void {
    ctx.beginPath();
    ctx.moveTo(c1[0], c1[1]);
    ctx.lineTo(c2[0], c2[1]);
    ctx.lineTo(c3[0], c3[1]);
    ctx.closePath();

    if (fillStyle) {
      ctx.fillStyle = fillStyle;

      ctx.fill();
    }

    if (edgingWidth) {
      ctx.lineWidth = edgingWidth;
      ctx.strokeStyle = edgingColor || 'rgba(0, 0, 0, 0)';

      ctx.stroke();
    }
  }

  /**
   * Draws a star-like object with the given count of spikes at the given coordinates
   *
   * @param ctx
   * @param cx
   * @param cy
   * @param spikes
   * @param outerRadius
   * @param innerRadius
   * @param fillStyle
   * @param edgingWidth
   * @param edgingColor
   */
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
  ): void {
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

    if (edgingWidth) {
      ctx.lineWidth = edgingWidth;
      ctx.strokeStyle = edgingColor || 'rgba(0, 0, 0, 0)';

      ctx.stroke();
    }

    if (fillStyle) {
      ctx.fillStyle = fillStyle;

      ctx.fill();
    }
  }
}