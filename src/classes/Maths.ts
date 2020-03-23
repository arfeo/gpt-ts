export interface LineSegment {
  start: Point;
  end: Point;
}

export interface Point {
  x: number;
  y: number;
}

export class Maths {
  /**
   * Returns true if one line segment intersects with another
   *
   * @param segment1
   * @param segment2
   */
  public static lineSegmentsIntersect(segment1: LineSegment, segment2: LineSegment): boolean {
    const det: number = (segment1.end.x - segment1.start.x) * (segment2.end.y - segment2.start.y) -
      (segment2.end.x - segment2.start.x) * (segment1.end.y - segment1.start.y);

    if (det === 0) {
      return false;
    }

    const lambda: number = ((segment2.end.y - segment2.start.y) * (segment2.end.x - segment1.start.x) +
      (segment2.start.x - segment2.end.x) * (segment2.end.y - segment1.start.y)) / det;
    const gamma: number = ((segment1.start.y - segment1.end.y) * (segment2.end.x - segment1.start.x) +
      (segment1.end.x - segment1.start.x) * (segment2.end.y - segment1.start.y)) / det;

    return (lambda > 0 && lambda < 1) && (gamma > 0 && gamma < 1);
  }

  /**
   * Checks if a point belongs to a line segment
   *
   * @param segment
   * @param point
   * @param tolerance
   */
  public static pointOnLineSegment(segment: LineSegment, point: Point, tolerance: number): boolean {
    const dxL: number = segment.end.x - segment.start.x;
    const dyL: number = segment.end.y - segment.start.y;
    const dxP: number = point.x - segment.start.x;
    const dyP: number = point.y - segment.start.y;

    const squareLen: number = dxL * dxL + dyL * dyL;
    const dotProd: number = dxP * dxL + dyP * dyL;
    const crossProd: number = dyP * dxL - dxP * dyL;

    return (Math.abs(crossProd) / Math.sqrt(squareLen) <= tolerance && dotProd >= 0 && dotProd <= squareLen);
  }

  /**
   * Checks if a line segment intersects with a rectangle by checking intersection
   * with each of its sides; returns true if at least one intersection registered
   *
   * @param segment
   * @param rectCoords
   */
  public static lineSegmentIntersectsWithRect(segment: LineSegment, rectCoords: number[]): boolean {
    const segment1: LineSegment = {
      start: { x: rectCoords[0], y: rectCoords[1] },
      end: { x: rectCoords[2], y: rectCoords[1] },
    };
    const segment2: LineSegment = {
      start: { x: rectCoords[0], y: rectCoords[1] },
      end: { x: rectCoords[0], y: rectCoords[3] },
    };
    const segment3: LineSegment = {
      start: { x: rectCoords[0], y: rectCoords[3] },
      end: { x: rectCoords[2], y: rectCoords[3] },
    };
    const segment4: LineSegment = {
      start: { x: rectCoords[2], y: rectCoords[1] },
      end: { x: rectCoords[2], y: rectCoords[3] },
    };

    return (
      this.lineSegmentsIntersect(segment, segment1)
      || this.lineSegmentsIntersect(segment, segment2)
      || this.lineSegmentsIntersect(segment, segment3)
      || this.lineSegmentsIntersect(segment, segment4)
    );
  }
}
