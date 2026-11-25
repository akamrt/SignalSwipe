# What to borrow from SermonSignal

Repo github.com/akamrt/Vibe-video-editing-, branch `ui/toolcraft`. Copy ideas and
prompts; do not import its code at runtime. Paths checked 25 Nov 2026; verify before use.

- `services/v2SimpleGeneration.ts`: the Simple short flow; source of the moment-choosing
  and writing prompts.
- `utils/batchPlanning.ts`: rules for short length and redo handling.
- `components/batch/SwipeReview.tsx`: the swipe review screen to match.
- `utils/typographyDirector.ts` and `utils/formats/formatShort.ts`: the "Simple" caption style.
- Not reusable as-is: `services/batchRunner.ts` (depends on SermonSignal's server and database).
