# Annotate

<p align="center"><img src="icon.png" width="128" height="128" alt="Annotate's icon: a white speech bubble with two dark eyes on a purple square"></p>

Draw a box around anything on your screen, write a note, and Claude Code does what the note asks.

<!-- film: TODO, 20 s or less: draw a box over an app, type a note, send it, and the Claude Code chat does it -->

## What you need

- A Mac with Apple silicon, or Ubuntu with its standard GNOME desktop.
- Claude Code. In a terminal, `claude --version` prints its version.

## Install

Annotate is shared by invitation for now. The person who invites you sends two lines like these, with their own code
in the first. Without an invite you can't install it yet. Paste them into a terminal:

```
claude plugin marketplace add https://clawed-apps.fly.dev/p/zaydek/invite/<code>/marketplace.json
claude plugin install annotate@zaydek
```

Then start a new Claude Code session. On a Mac, Annotate goes into your Applications folder. The first time you use it,
your computer asks you to allow a few things, such as recording the screen.

## Use

- Type `/annotate start` in a Claude Code chat: that chat gets every box you send, with its note.
- ⇧⌘F on a Mac, Ctrl+Shift+F on Ubuntu: draw a box over your screen and type a note. ⌘↩︎ or Ctrl+Enter sends it.
- Type `/annotate stop`: that chat stops getting your boxes. Annotate keeps running.
- Type `/annotate help`: every command and key.

Everything else is in [skills/annotate/SKILL.md](skills/annotate/SKILL.md): settings, where your data lives and what
leaves your computer, which computers and coding tools Annotate works with, updating, and uninstalling.

## License

See [LICENSE](LICENSE).
