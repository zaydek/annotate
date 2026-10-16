# Annotate privacy policy

Last updated: 2026-10-16. This covers the Annotate desktop app for macOS and Ubuntu, its installer and its Claude Code
plugin.

## In short

Your frames, notes, pictures and recordings stay on your computer. Annotate hands them to the Claude Code chat you pick,
on your own computer. A few things do leave it: your voice when you use the mic, feedback when you send it, counts of
frames sent and finished, update checks, and crash and health reports if you said yes to them. Each one is listed below,
with where it goes.

## What it reads

- **Your screen,** only the part you frame, when you press the frame key. It also keeps a picture of the whole window or
  screen the frame was drawn on, with the frame marked.
- **The note** you type or say on a frame, and any recording you attach.
- **The app and window under the frame:** the app's name and icon, and the window's title or the page's address.
- **Your microphone,** only while you hold the mic on a frame's card.
- **Your sign-in,** if you sign in: your GitHub or Google account number, name and picture link. If you continue as a
  guest, you get a random id instead.
- **Your computer's facts,** for crash and health reports, only if you said yes to them: the details are under "Crash and
  health reports".

It does not read your clipboard or your files.

## What it keeps on your computer

| What | macOS | Ubuntu |
| --- | --- | --- |
| Frames, their pictures, notes and recordings, settings, feedback not yet sent, a record of each mic use (its length, never the words), and its own log | `~/Library/Application Support/Annotate/` | `~/.local/share/annotate/` |
| Your sign-in to Annotate's server | Your Mac's Keychain, under "Annotate desktop" | `~/.local/share/annotate/account.sealed`, locked with your keyring when you have one |
| The installer's sign-in, a random install id, and the crash and health reports it sent | `~/.claude-apps/annotate/` | `~/.claude-apps/annotate/` |
| The app's log when Claude Code opened it | (in the folder above) | `~/.cache/annotate-desktop/app.log` |
| Crash dumps, kept 30 days and never sent | `~/Library/Application Support/Annotate/Crashpad/` | `~/.local/share/annotate/Crashpad/` |

Ask a Claude Code chat where Annotate keeps things, and it lists each place on this computer.

## What it sends, and to whom

- **Your frames go to your own Claude Code chat,** over your computer's own loopback address (127.0.0.1). Annotate sends
  them nowhere else. What Claude Code then sends to Anthropic is Claude Code's doing, under
  [Anthropic's terms and privacy policy](https://www.anthropic.com/legal), not Annotate's.
- **Your voice,** while you use the mic: it streams through Annotate's server at annotate-app.fly.dev to a speech-to-text
  service, xAI by default or ElevenLabs if you pick it in Settings, and comes back as words. Annotate's server keeps only
  how many minutes you used. What xAI and ElevenLabs keep is under their own terms.
- **Feedback,** only when you press Send in Send Feedback: your note, Annotate's version and your operating system, and,
  if you include them, a picture and your latest frame with its note. It goes to Annotate's server at
  annotate-app.fly.dev, which keeps it, emails a copy to Annotate's maker, and sends a copy under a made-up name
  instead of yours to clawed-apps.fly.dev.
- **Sign-in:** the installer's sign-in goes through annotate.fly.dev to GitHub or Google. Your account number, name and
  picture link are kept on the server Annotate's installs and updates come from, clawed-apps.fly.dev. Annotate does not
  ask GitHub or Google for your email there. If you sign in to annotate-app.fly.dev directly, that server keeps your
  account number and the email address that came with it.
- **Updates:** Annotate's launcher asks clawed-apps.fly.dev for the newest version and downloads updates from it. Nothing
  updates on its own; `annotate update` applies one.
- **Counts:** while Annotate is open, it sends clawed-apps.fly.dev one line for each frame you send and each frame a chat
  finishes or can't do: how the frame was made (typed, spoken, drawn or recorded), how long it took, the version and a
  random install id. Never your notes, pictures, recordings or name.
- **Crash and health reports,** only if you said yes when you installed it, or ran `annotate telemetry on`: they go to
  annotate.fly.dev, which passes them to Annotate's crash-report server, zaydek-telemetry.fly.dev, without your IP
  address. A report holds a random install id, the app version, your operating system and its version, processor type,
  graphics card and driver, Wayland or X11 and which desktop, memory rounded to the gigabyte, how long each install,
  update and startup step took, whether the app closed cleanly last time, and, if it crashed or froze, the error and
  where in Annotate's code it happened, with folder names, emails and addresses removed. Never your screen, frames,
  notes, audio, typing, file or window names, account, name, computer name or location.

## What the servers keep

Fly.io hosts every one of these servers, and like any host it sees your IP address and browser details at its edge.
Annotate's own code reads your IP address only to limit how often one network can ask (kept in memory), and to count
installs from one network a day, as a one-way hash kept two days. It doesn't save your IP address anywhere else.

- **annotate-app.fly.dev:** your account, if you signed in, feedback until it is deleted by hand, and how many voice
  minutes you used.
- **clawed-apps.fly.dev:** your install's random id, your sign-in, when it was last seen, and the counts above. Annotate
  has no set time to delete these yet.
- **zaydek-telemetry.fly.dev:** each report for 90 days, and records of unexpected stops for a year. Only totals per
  version, with no install id, are kept longer.

## How to delete it

- **Everything on your computer:** `curl -fsSL https://annotate.fly.dev/uninstall | sh -s -- --all`. Without `--all`,
  your frames and settings stay. On a Mac, the uninstall leaves the "Annotate desktop" sign-in in your Keychain; delete
  it in Keychain Access.
- **Crash and health reports:** `annotate telemetry off`, or set `DO_NOT_TRACK=1`. `annotate telemetry show` lists every
  report this computer sent.
- **Counts:** there is no switch for these yet. They stop when you quit or uninstall Annotate.
- **What the servers keep:** Annotate has no button to delete an account yet. Open an issue at
  https://github.com/zaydek/annotate/issues asking for it, with nothing private in it, and it will be deleted.

## Changes

A change to this policy is published here, with a new date at the top.

## Contact

Open an issue at https://github.com/zaydek/annotate/issues.
