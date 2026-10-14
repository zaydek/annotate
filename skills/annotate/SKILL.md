---
name: annotate
description: Annotate on the desktop, for a person who uses Claude Code on a Mac or on Ubuntu. Use when the person asks to start or stop taking their Annotate frames in this chat, or asks about Annotate's settings, where it keeps their frames, what leaves their computer, which computers and coding tools it works with, updating it, or uninstalling it.
user-invocable: false
---

# Annotate

Annotate is a desktop app for a Mac with Apple silicon or Ubuntu with its standard GNOME desktop. The person draws a frame
over anything on their screen and types a note, and the chat that takes their frames does what the note asks.

## Start and stop

In Claude Code with Annotate installed (`annotate@zaydek`), `/annotate` is Annotate's own command. Tell the person which
line to type; don't run anything for it yourself.

- Type `/annotate`: this chat takes your frames. Annotate opens if it isn't open.
- Type `/annotate off`: this chat stops taking frames. Annotate stays open.

`/annotate start` and `/annotate stop` are their old names and still work. The newest chat to type `/annotate` takes the
frames; the chat before it is told they moved.

### In another coding agent

An agent without the `/annotate` command (Codex, or any other agent that can connect to an address on this computer)
takes frames from the Annotate app directly. Annotate must be open first: on a Mac, open Annotate from the Applications
folder.

1. Connect to `http://127.0.0.1:7420/mcp`. If nothing answers there, ask the person to choose Connecting a Chat… in
   Annotate's menu and paste what it copies.
2. Call `annotate_start` with `label` set to this repository's folder name.
3. Call `frames_next` with `wait` 50. It holds until a frame arrives, takes it and marks it picked, so the person sees you
   started. Do what its note and picture ask in this repository.
4. Call `frame_mark` with its `id`, `state` `done` and one sentence on what you did, which the person reads. When you
   can't do it (the note is unclear, it asks for something impossible, or it isn't for this repository), use `state`
   `stuck` and one sentence on why.
5. Call `frames_next` with `wait` 50 again and take the next, oldest first. When it answers moved, say
   "Annotate moved to <its label>" and stop taking frames here.

To stop, call `annotate_stop`. Annotate stays open.

## Commands

- `/annotate`: this chat takes your frames. Annotate opens if it isn't open.
- `/annotate off`: this chat stops taking frames. Annotate stays open.
- `/annotate open`: Annotate opens. No chat takes frames until you type `/annotate`.
- `/annotate quit`: Annotate closes.
- `/annotate where`: where your frames and settings are, and where the app is.
- `/annotate update` (or `/annotate upgrade`): gets the newest version of Annotate.
- `/annotate help`: whether Annotate is open and which chat takes your frames, then every command and key.
  `/annotate help more` adds what leaves your computer and how to use other coding tools.
- `/annotate uninstall`: removes Annotate once you say yes. It asks before deleting your frames.

## Keys

Mac, then Ubuntu:

- ⇧⌘F, Ctrl+Shift+F: draw a frame over your screen, then type a note.
- ⌘↩︎, Ctrl+Enter: send the frame and its note.
- ⇧⌘↩︎, Ctrl+Shift+Enter: record a video of the frame you drew; press it again to stop.
- ⇧⌘E, Ctrl+Shift+E: show or hide the inbox, the frames you sent and what the chat did with each.
- Esc: close the frame without sending it.

## Settings

Settings… is in Annotate's menu, from its icon in the menu bar (Mac) or the top bar (Ubuntu). On a Mac it is also in the
Annotate menu, and ⌘, opens it.

- Include my voice in recordings: on at first. Off, recordings have no sound.
- Eyes follow the cursor: on at first. Annotate's character watches the pointer; off, it only blinks.
- Play sound effects: on at first. A short sound for each thing you do.
- Show Annotate in the Dock (Mac): off at first.
- Start on Login: off at first. Annotate opens when you log in.
- Menu bar icon: the character on a background, or the character alone.
- Microphone: the one the mic uses. System default unless you pick one.

The same switches are in Annotate's menu. On a Mac, holding Option (⌥) as you open the menu also shows which service turns
your voice into words: xAI, or ElevenLabs. On Ubuntu it is always xAI.

## Where your data lives

Type `/annotate where` to see the folders on this computer. Your frames and settings are in one folder:

- Mac: `~/Library/Application Support/Annotate`
- Ubuntu, installed through Claude Code: `~/.local/share/annotate`
- Linux, run some other way: `~/.config/Annotate`

In that folder:

- `frames.json`: the inbox list.
- `frames/`: each frame's picture and recording.
- `settings.json`: the settings above.
- `feedback/`: feedback waiting to send until you sign in.
- `talk-log.jsonl`: how long each mic use lasted, never the words.
- `install-id`: a random number for this copy of Annotate, never who you are.
- `annotate.log` (Mac): a record of what Annotate did, never your notes. On Ubuntu installed through Claude Code the record
  is `app.log` in `~/.claude-apps/annotate`.

The app is Annotate in your Applications folder on a Mac, and in `~/.claude-apps/annotate` on Ubuntu. Your sign-in is in
your Mac's saved passwords as "Annotate desktop", or locked in the data folder on Ubuntu.

## What leaves your computer

- Your frames, notes and recordings stay on this computer until the chat where you typed `/annotate` takes them. That
  chat's AI then reads them as it reads anything else you give it; for Claude Code, that is Anthropic.
- To use the mic or Send Feedback, choose Sign in from Annotate's menu and finish in the browser window it opens, with the
  invite from the person who shared Annotate with you. Framing works without signing in.
- When you talk a note into the mic, your voice goes through Annotate's server to xAI, or to ElevenLabs if you picked it,
  to become text. Never your frames, pictures, recordings or typed notes.
- Send Feedback sends Annotate your note, the picture if you add one, and which version of Annotate and of your operating
  system you have.
- Clawed Apps (spelled with a w) installs Annotate through Claude Code. It gives this computer an install number and sees
  each time Annotate downloads an update. When you opened Annotate through Claude Code, Annotate also sends Clawed Apps a
  short report each time you send a frame and each time a chat finishes one or gets stuck on it: how you made the frame
  (typed, spoken, drawn or recorded), how long it took, and the random number for this install. A report never includes
  your notes, pictures or recordings.

Nothing else leaves.

## Works with

- A Mac with Apple silicon, or a PC running Ubuntu with its standard GNOME desktop. No Intel Mac.
- Claude Code in a terminal, tested with every release.
- Codex and other coding agents, through the steps in "In another coding agent". These are not tested with each release.
  To set one up, open Annotate, then paste this line into a chat in that tool:
  `Connect to Annotate at http://127.0.0.1:7420/mcp and take my frames from it.`

## Updating

Annotate checks for a newer version when a Claude Code session starts. To get it now, type `/annotate update`. It asks
first, then says when to restart Claude Code to finish.

## Uninstalling

In Claude Code, type `/annotate uninstall`. It asks two questions:

1. Uninstall Annotate? Choose Yes. Anything else and nothing changes.
2. Also delete your frames and settings? No keeps them on this computer; Yes deletes them.

Then it quits Annotate, removes the app (on a Mac, from your Applications folder) and its folder `~/.claude-apps/annotate`,
deletes your frames and settings only if you chose Yes, and removes `annotate@zaydek` from Claude Code. If Annotate is
still open, nothing is removed: choose Quit Annotate from its menu, then type `/annotate uninstall` again.

By hand, in a terminal:

- `claude plugin uninstall annotate@zaydek` removes `/annotate` from Claude Code.
- On a Mac, drag Annotate from your Applications folder to the Trash.
- Delete the folder under "Where your data lives" to remove your frames and settings.
