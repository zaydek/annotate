# Annotate

<p align="center"><img src="icon.png" width="128" height="128" alt="Annotate's icon: a white speech bubble with two dark eyes on a purple square"></p>

Frame anything on your screen, write a note, and Claude Code does what the note asks.

<!-- film: TODO, 20 s or less: frame an app, type a note, send it, and the Claude Code chat does it -->

## Getting started: macOS

- **You need:** a Mac with Apple silicon on macOS 15 or later, and Claude Code (`claude --version` prints its version).
- **Install:** paste this into Terminal. It asks once before it installs, then offers to sign in, which you can skip.

  ```
  curl -fsSL https://annotate.fly.dev | sh
  ```

- **First run:** in a Claude Code chat that was already open, type `/reload-plugins` once. Annotate is in your
  Applications folder. The first time it opens, a window walks you through allowing Screen Recording and the Microphone.
  If you said no to one, turn Annotate on in System Settings > Privacy & Security > Screen Recording (or Microphone).
- **Keys:** ⇧⌘F draws a frame over your screen and opens its note; ⌘↩︎ sends it. ⇧⌘E shows or hides the inbox.
  No API key needed.
- **Uninstall:** `curl -fsSL https://annotate.fly.dev/uninstall | sh`

## Getting started: Ubuntu

- **You need:** Ubuntu 26.04 or later with its standard GNOME desktop, and Claude
  Code (`claude --version` prints its version).
- **Install:** paste this into Terminal (Ctrl+Alt+T opens it, Ctrl+Shift+V pastes). It asks once before it installs,
  then offers to sign in, which you can skip.

  ```
  curl -fsSL https://annotate.fly.dev | sh
  ```

- **First run:** in a Claude Code chat that was already open, type `/reload-plugins` once. The first time Annotate
  opens, Ubuntu asks to let it take screenshots (click Allow) and to add its keyboard shortcuts (click Add).
- **Keys:** Ctrl+Shift+F draws a frame over your screen and opens its note; Ctrl+Enter sends it. Ctrl+Shift+E shows or
  hides the inbox. No API key needed.
- **Uninstall:** `curl -fsSL https://annotate.fly.dev/uninstall | sh`

## Use

- `/annotate`: this chat gets your frames.
- `/annotate off`: this chat stops getting them.
- `/annotate help` to learn more.

## License

These docs are open source under the MIT license (see [LICENSE](LICENSE)). Annotate itself is not open source.
