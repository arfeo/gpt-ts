import { GameComponent } from './components/Game';

import { setCellSize } from './components/Game/utils';

import { getRandomNum } from './utils/common';

import {
  drawCircle,
  drawSector,
  drawArc,
  drawLineToAngle,
  drawRectangle,
  drawTriangle,
  drawStar,
} from './utils/drawing';

import {
  lineSegmentsIntersect,
  pointOnLineSegment,
  lineSegmentIntersectsWithRect,
} from './utils/math';

import {
  getStorageData,
  saveStorageData,
  removeStorageData,
} from './utils/storage';

export {
  GameComponent,
  setCellSize,
  getRandomNum,
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
};
