# Plan

Each step ends with something the owner can try on a phone. Tick a step only when it has
been tried on a real phone.

- [ ] **1. Setup and handover kit.** Repo, AGENTS.md, STATUS, DECISIONS, PLAN, sessions.
- [ ] **2. Empty app on the phone.** Pick videos; swipe placeholder cards. Proves the
      install route (APK on the Pixel 8 and S26 Ultra).
- [ ] **3. Phone transcribes.** On-device Whisper turns a sermon into text with word
      timings, saved on the phone. Measure minutes per hour of sermon on the Pixel 8.
- [ ] **4. AI picks moments.** DeepSeek Flash via OpenRouter (key entered in settings)
      returns moments, hook and caption text. Cards show the text; swiping works.
- [ ] **5. Phone makes the video.** Cut, vertical crop that follows the speaker (ML Kit
      face detection), captions burned in, plays on the card. Riskiest step: measure
      render time on the Pixel 8 early.
- [ ] **6. Yes saves and shares; redo remakes with the note.** Gallery save plus share sheet.
- [ ] **7. Pleasant to use.** Keeps working with the screen off, progress, battery care,
      a few caption styles.
- [ ] **8. iPhone.** Apple Vision and AVFoundation versions of the add-ons; EAS build;
      Apple Developer account needed.

Later, not planned yet: automatic posting through bundle.social; a small relay so other
churches do not need their own AI key.

## Phone vs online

| Step | Where | Cost |
|---|---|---|
| Pick videos | Phone | Free |
| Speech to text | Phone (Whisper) | Free |
| Choose moments, write text | Online (DeepSeek Flash via OpenRouter) | Pennies per sermon |
| Face tracking | Phone (ML Kit / Apple Vision) | Free |
| Cut, crop, captions | Phone video chip (Media3 / AVFoundation) | Free |
| Swipe review | Phone | Free |
| Save and share | Phone gallery and share sheet | Free |
