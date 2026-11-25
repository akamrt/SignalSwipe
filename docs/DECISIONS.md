# Decisions

Newest first. Each entry: date, decision, who decided, why.

## 25 Nov 2026 (Nathan)

- **Name: SignalSwipe.** So everyone knows which app is meant.
- **Own repo.** Keeps the handover files simple and separate from SermonSignal.
- **React Native with Expo plus native add-ons.** One codebase for both phones, same
  language (TypeScript) as SermonSignal, and every assistant writes it well. Heavy work
  still uses the phone's own hardware.
- **Phone does the work, no server.** Only the AI writing step goes online, with
  Nathan's OpenRouter key. A small relay only if other churches use it later.
- **Yes = save to gallery and open the share sheet.** Automatic posting through
  bundle.social is added later.
- **A few caption styles to pick from**, starting with SermonSignal's "Simple" style.
- **Test phones: Samsung Galaxy S26 Ultra and Google Pixel 8.** Pixel 8 sets the speed target.
- **Android first, iPhone second.**
- **Must hand over between Claude accounts, Google Antigravity and ChatGPT/Codex.** All
  context lives in repo files (see AGENTS.md).
