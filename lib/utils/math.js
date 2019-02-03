"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Function returns true if one line segment intersects with another
 *
 * @param segment1
 * @param segment2
 */
function lineSegmentsIntersect(segment1, segment2) {
    var det = (segment1.end.x - segment1.start.x) * (segment2.end.y - segment2.start.y) -
        (segment2.end.x - segment2.start.x) * (segment1.end.y - segment1.start.y);
    if (det === 0) {
        return false;
    }
    var lambda = ((segment2.end.y - segment2.start.y) * (segment2.end.x - segment1.start.x) +
        (segment2.start.x - segment2.end.x) * (segment2.end.y - segment1.start.y)) / det;
    var gamma = ((segment1.start.y - segment1.end.y) * (segment2.end.x - segment1.start.x) +
        (segment1.end.x - segment1.start.x) * (segment2.end.y - segment1.start.y)) / det;
    return (lambda > 0 && lambda < 1) && (gamma > 0 && gamma < 1);
}
exports.lineSegmentsIntersect = lineSegmentsIntersect;
/**
 * Function checks if a point belongs to a line segment
 *
 * @param segment
 * @param point
 * @param tolerance
 */
function pointOnLineSegment(segment, point, tolerance) {
    var dxL = segment.end.x - segment.start.x;
    var dyL = segment.end.y - segment.start.y;
    var dxP = point.x - segment.start.x;
    var dyP = point.y - segment.start.y;
    var squareLen = dxL * dxL + dyL * dyL;
    var dotProd = dxP * dxL + dyP * dyL;
    var crossProd = dyP * dxL - dxP * dyL;
    return (Math.abs(crossProd) / Math.sqrt(squareLen) <= tolerance && dotProd >= 0 && dotProd <= squareLen);
}
exports.pointOnLineSegment = pointOnLineSegment;
/**
 * Function checks if a line segment intersects with a rectangle by checking intersection
 * with each of its sides; returns true if at least one intersection registered
 *
 * @param segment
 * @param rectCoords
 */
function lineSegmentIntersectsWithRect(segment, rectCoords) {
    var segment1 = {
        start: { x: rectCoords[0], y: rectCoords[1] },
        end: { x: rectCoords[2], y: rectCoords[1] },
    };
    var segment2 = {
        start: { x: rectCoords[0], y: rectCoords[1] },
        end: { x: rectCoords[0], y: rectCoords[3] },
    };
    var segment3 = {
        start: { x: rectCoords[0], y: rectCoords[3] },
        end: { x: rectCoords[2], y: rectCoords[3] },
    };
    var segment4 = {
        start: { x: rectCoords[2], y: rectCoords[1] },
        end: { x: rectCoords[2], y: rectCoords[3] },
    };
    return (lineSegmentsIntersect(segment, segment1) ||
        lineSegmentsIntersect(segment, segment2) ||
        lineSegmentsIntersect(segment, segment3) ||
        lineSegmentsIntersect(segment, segment4));
}
exports.lineSegmentIntersectsWithRect = lineSegmentIntersectsWithRect;
