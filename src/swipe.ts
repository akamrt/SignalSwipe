// What a finished swipe means. Kept free of React so any screen (and any test) can use it.

export type Verdict = 'yes' | 'no' | 'redo';

/** How far (in points) a card must travel before a let-go counts as a swipe. */
export const SWIPE_DISTANCE = 120;

/**
 * Turns how far a card was dragged into a verdict, or null if it should spring back.
 * Right = yes, left = no, up = redo. The bigger movement wins.
 */
export function verdictFromDrag(dx: number, dy: number, distance = SWIPE_DISTANCE): Verdict | null {
  const sideways = Math.abs(dx);
  const upwards = -dy;
  if (upwards > distance && upwards > sideways) return 'redo';
  if (sideways > distance) return dx > 0 ? 'yes' : 'no';
  return null;
}
