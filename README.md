# Annotate

<p align="center"><img src="icon.png" width="128" height="128" alt="Annotate's icon: a white speech bubble with two dark eyes on a purple square"></p>

Frame anything on your screen, write a note, and Claude Code does what the note asks.

<!-- film: TODO, 20 s or less: frame an app, type a note, send it, and the Claude Code chat does it -->

## What you need

- A Mac with Apple silicon, or Ubuntu with its standard GNOME desktop.
- Claude Code. In a terminal, `claude --version` prints its version.

## Install

Paste this into a terminal:

```
curl -fsSL https://annotate.fly.dev/install.sh | sh
```

It asks once before it installs, then offers to sign in, which you can skip. In a Claude Code chat that was already
open, type `/reload-plugins` once. On a Mac, Annotate goes into your Applications folder. The first time you use it,
your computer asks you to allow a few things, such as recording the screen.

## Use

- Type `/annotate` in a Claude Code chat: that chat gets every frame you send, with its note. Typed in another chat,
  the frames go there instead.
- ⇧⌘F on a Mac, Ctrl+Shift+F on Ubuntu: draw a frame over your screen and type a note. ⌘↩︎ or Ctrl+Enter sends it.
- Type `/annotate off`: that chat stops getting your frames. Annotate keeps running.
- Type `/annotate help`: every command and key.

Everything else is in [skills/annotate/SKILL.md](skills/annotate/SKILL.md): settings, where your data lives and what
leaves your computer, which computers and coding tools Annotate works with, updating, and uninstalling.

## License

See [LICENSE](LICENSE).
