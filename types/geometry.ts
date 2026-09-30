export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DimensionBadge {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  position: Point;
  orientation: 'horizontal' | 'vertical';
  target: 'overall-width' | 'overall-height' | 'sash-width';
  sashIndex?: number;
}

export interface OpeningLines {
  pathD: string; // SVG path command string for triangular opening lines
  type: 'turn' | 'tilt-turn' | 'tilt' | 'fix';
  hingeSide: 'left' | 'right' | 'bottom' | 'top' | 'none';
}

export interface HandleGeometry {
  position: Point;
  rotation: number;
  colorHex: string;
  model: string;
}

export interface FrameExtensionRect extends Rect {
  side: 'top' | 'bottom' | 'left' | 'right';
  extensionMm: number;
}

export interface SashGeometry {
  id: string;
  outerRect: Rect;
  glassRect: Rect;
  opening: OpeningLines | null;
  handle: HandleGeometry | null;
  isFrosted: boolean;
  isInfill: boolean;
  sashIndex: number;
  glazingBars?: Point[][]; // Линии шпроссов
}

export interface ImpostGeometry {
  rect: Rect;
  orientation: 'vertical' | 'horizontal';
}

export interface WindowSceneGraph {
  viewBox: string;
  canvasWidth: number;
  canvasHeight: number;
  overallOuterFrame: Rect;
  frameExtensions: FrameExtensionRect[];
  imposts: ImpostGeometry[];
  sashes: SashGeometry[];
  badges: DimensionBadge[];
  frameColorHex: string;
  glassTint: string;
}