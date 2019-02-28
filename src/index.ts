import { GameComponent } from './components/Game';

import {
  drawCircle,
  drawSector,
  drawArc,
  drawLineToAngle,
  drawRectangle,
  drawTriangle,
  drawStar,
} from './functions/draw';

import {
  lineSegmentsIntersect,
  pointOnLineSegment,
  lineSegmentIntersectsWithRect,
} from './functions/math';

import {
  getStorageData,
  saveStorageData,
  removeStorageData,
} from './functions/storage';

import {
  setCellSize,
  getRandomNum,
} from './functions/utils';

export {
  GameComponent,

  drawCircle,
  drawSector,
  drawArc,
  drawLineToAngle,
  drawRectangle,
  drawTriangle,
  drawStar,

  lineSegmentsIntersect,
  pointOnLineSegment,
  lineSegmentIntersectsWithRect,

  getStorageData,
  saveStorageData,
  removeStorageData,

  setCellSize,
  getRandomNum,
};
