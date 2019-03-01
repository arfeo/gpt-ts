import { GameComponent } from './components/Game';
import { ModalComponent } from './components/Modal';

import { HttpDataSource } from './sources/HttpDataSource';

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
  ModalComponent,
  HttpDataSource,
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
