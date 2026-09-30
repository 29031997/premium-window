export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function roundToStep(value: number, step: number): number {
  return Math.round(value / step) * step;
}

export function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}