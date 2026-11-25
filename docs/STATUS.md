# Where we are now

Last updated: 25 Nov 2026, about 17:40, by Claude.

**Current step:** 2 of 8, empty app on the phone.

**What works:** the app code for step 2 (pick videos, swipe placeholder cards, redo note,
tally at the end) passes typecheck, lint and tests. PR #1 is merged (the repo was made public
so GitHub Actions minutes are free). The build on main published the "Android latest" release:
install link https://github.com/akamrt/SignalSwipe/releases/download/android-latest/signalswipe.apk
(about 64 MB). Every push to main replaces it.

**Half-done:** not yet tried on a real phone.

**Next task:** owner installs "Android latest" on the Pixel 8 and S26 Ultra and tries it.
Then step 3: on-device transcription (whisper.cpp binding), measuring minutes per hour of
sermon on the Pixel 8.
