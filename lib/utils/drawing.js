"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Alias for drawArc, this function draws a circle of the given size and style at the given coordinates
 *
 * @param ctx
 * @param dotX
 * @param dotY
 * @param radius
 * @param fillStyle
 * @param edgingWidth
 * @param edgingColor
 */
function drawCircle(ctx, dotX, dotY, radius, fillStyle, edgingWidth, edgingColor) {
    drawArc(ctx, dotX, dotY, radius, 0, Math.PI * 2, fillStyle, edgingWidth, edgingColor);
}
exports.drawCircle = drawCircle;
/**
 * Function draws a circle sector at the given coordinates
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
function drawSector(ctx, dotX, dotY, radius, startAngle, endAngle, fillStyle, edgingWidth, edgingColor) {
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
exports.drawSector = drawSector;
/**
 * Function draws a circle sector at the given coordinates
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
function drawArc(ctx, cx, cy, radius, startAngle, endAngle, fillStyle, edgingWidth, edgingColor) {
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
exports.drawArc = drawArc;
/**
 * Function draws a line starting at the given coordinates of the given length at the given angle;
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
function drawLineToAngle(ctx, x1, y1, length, angle, strokeStyle, lineWidth) {
    var a = angle * Math.PI / 180;
    var x2 = x1 + length * Math.cos(a);
    var y2 = y1 + length * Math.sin(a);
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
exports.drawLineToAngle = drawLineToAngle;
/**
 * Function draws a filled rectangle of the given size and style at the given coordinates
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
function drawRectangle(ctx, left, top, width, height, fillStyle, edgingWidth, edgingColor) {
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
exports.drawRectangle = drawRectangle;
/**
 * Function draws a filled triangle at the given coordinates
 *
 * @param ctx
 * @param c1
 * @param c2
 * @param c3
 * @param fillStyle
 * @param edgingWidth
 * @param edgingColor
 */
function drawTriangle(ctx, c1, c2, c3, fillStyle, edgingWidth, edgingColor) {
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
exports.drawTriangle = drawTriangle;
/**
 * Function draws a star-like object with the given count of spikes at the given coordinates
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
function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, fillStyle, edgingWidth, edgingColor) {
    var step = Math.PI / spikes;
    var rotation = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (var i = 0; i < spikes; i += 1) {
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
exports.drawStar = drawStar;
