// Placeholder shorts for step 2. Step 4 replaces this with moments chosen by the AI.

import type { Verdict } from './swipe';

export type PickedVideo = { uri: string; name: string; durationMs: number | null };

export type ShortCard = {
  id: string;
  video: PickedVideo;
  hook: string;
  verdict?: Verdict;
};

const SHORTS_PER_VIDEO = 3;

export function placeholderCards(videos: PickedVideo[]): ShortCard[] {
  return videos.flatMap((video, v) =>
    Array.from({ length: SHORTS_PER_VIDEO }, (_, n) => ({
      id: `${v}-${n}`,
      video,
      hook: `Placeholder short ${n + 1} of ${SHORTS_PER_VIDEO}`,
    })),
  );
}
