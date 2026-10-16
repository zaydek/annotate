# Annotate

<p align="center"><img src="icon.png" width="128" height="128" alt="Annotate's icon: a white speech bubble with two dark eyes on a purple square"></p>

Frame anything on your screen, write a note, and your coding agent does what the note asks.

<!-- film: TODO, 20 s or less: frame an app, type a note, send it, and the Claude Code chat does it -->

## Getting started

- **You need:** Claude Code (`claude --version` prints its version), on a Mac or on Ubuntu (below).
- **Install:** paste this into a terminal. It asks once before it installs, then offers to sign in, which you can skip.

  ```
  curl -fsSL https://annotate.fly.dev | sh
  ```

- **First run:** in a Claude Code chat that was already open, type `/reload-plugins` once. No API key needed.
- **Uninstall:** `curl -fsSL https://annotate.fly.dev/uninstall | sh`

| | macOS | Ubuntu |
| --- | --- | --- |
| System | Apple silicon, macOS 15 or later | Ubuntu 26.04 or later, standard GNOME desktop |
| Terminal | Terminal; ⌘V pastes | Ctrl+Alt+T opens it; Ctrl+Shift+V pastes |
| First open | Annotate is in Applications. A window walks you through allowing Screen Recording and the Microphone; if you said no, use System Settings > Privacy & Security. | Click Allow to let it take screenshots, and Add for its keyboard shortcuts. |
| Draw a frame and open its note | ⇧⌘F | Ctrl+Shift+F |
| Send it | ⌘↩︎ | Ctrl+Enter |
| Show or hide the inbox | ⇧⌘E | Ctrl+Shift+E |

## Use

- `/annotate`: this chat gets your frames.
- `/annotate off`: this chat stops getting them.
- `/annotate help` to learn more.

## Privacy

Your frames and notes stay on your computer and go only to the agent chat you pick. Voice goes to xAI (or ElevenLabs,
if you choose it) to become text. Annotate's servers get only counts, your sign-in, feedback you send and the crash
reports you agree to. [PRIVACY.md](PRIVACY.md) has the details.

## License

These docs are open source under the MIT license (see [LICENSE](LICENSE)). Annotate itself is not open source.
