# SignalSwipe: rules for every assistant

This is the one rulebook. Claude, Gemini (Google Antigravity), ChatGPT/Codex and any other
assistant follow it. CLAUDE.md and GEMINI.md only point here.

## What SignalSwipe is

A phone app with one job: the owner picks sermon videos on the phone, the app makes short
vertical clips from them, and the owner swipes each one: right = yes, left = no,
up = redo (with an optional note). Nothing else. Android first, iPhone second.

It is a sister app to SermonSignal (github.com/akamrt/Vibe-video-editing-, branch
`ui/toolcraft`). It borrows prompts and ideas from it (see docs/REUSE.md) but shares no
code at runtime and has no server.

## Start of every session: read these, in order

1. `docs/STATUS.md`: where we are now and the very next task.
2. `docs/DECISIONS.md`: choices already made. Do not re-ask them.
3. `docs/PLAN.md`: the steps and what "done" means for each.
4. The newest file in `docs/sessions/`.

## End of every session (also when usage is about to run out)

1. Commit and push working changes, even half-done ones, on the working branch.
2. Update `docs/STATUS.md`: current step, what works, what is half-done, the exact next task.
3. Add a session note `docs/sessions/YYYY-MM-DD-<tool>-<topic>.md` (template below).
4. Any new decision by the owner goes in `docs/DECISIONS.md` with the date and reason.

The last push is the safe point. A new assistant on another account must be able to carry
on from the repo alone, with no chat history.

## Session note template

```
# <date> · <tool and account, e.g. Claude (account 2) / Antigravity / Codex>
Goal: <one line>
Done: <bullets>
Not done / problems: <bullets>
Next: <the exact next task>
```

## Ground rules

- **The phone does the work.** Transcription, face tracking, cropping, captions and
  rendering run on the phone. The only network call is the AI step (choosing moments,
  writing hook and captions), sent straight from the phone with the owner's own key.
- **No server, no paid backend** unless the owner approves it in DECISIONS.md.
- **No secrets in the repo.** API keys are entered in the app and kept in the phone's
  secure storage (expo-secure-store). `.env` files are gitignored.
- **Small steps.** Each change is small enough to finish and push in one session.
- **Plain language to the owner.** The owner (Nathan) is not a developer. Explain in plain
  words and offer numbered options he can answer with one digit.
- **Verify before claiming.** Say what you ran and what it showed. If something was not
  tested on a real phone, say so.

## Tech stack (decided 25 Nov 2026)

- React Native with Expo (TypeScript), development builds (not Expo Go, because native
  modules are needed).
- Native add-ons for the heavy work: on-device speech to text (whisper.cpp via a React
  Native binding), face tracking (Google ML Kit on Android, Apple Vision on iPhone),
  video render (Media3 Transformer on Android, AVFoundation on iPhone).
- AI: DeepSeek Flash through OpenRouter, called from the phone.
- Builds: GitHub Actions builds the Android APK (`.github/workflows/android.yml`); each push
  to `main` publishes it as the "Android latest" release for the owner to install.
  iPhone later via Expo EAS, no Mac needed.
- Expo changes fast between versions: read `docs/EXPO_NOTES.md` before touching Expo APIs.
  Network-blocked sandboxes: prefix Expo commands with `EXPO_OFFLINE=1`.
- Test phones: Samsung Galaxy S26 Ultra and Google Pixel 8 (Pixel 8 is the speed target).

## Branches and checks

- `main` is trunk. Work on short branches and open pull requests into `main`.
- Before a PR: `npm run typecheck`, `npm run lint` and `npm test` pass. The Android build
  check on the PR must be green.
- Add packages with `npx expo install <package>`, not plain npm, so versions match the SDK.

## Where the code is

- `App.tsx`: switches between the two screens.
- `src/PickScreen.tsx`: pick sermon videos from the phone.
- `src/SwipeScreen.tsx`: swipe cards (right yes, left no, up redo with a note).
- `src/swipe.ts`: what a drag means (tested in `tests/swipe.test.ts`).
- `src/cards.ts`: placeholder shorts; replaced by AI-chosen moments in step 4.
