# Annotate privacy policy

Last updated: 2026-10-16. This covers the Annotate desktop app for macOS and Ubuntu, its installer and its plugin for
your coding agent.

## In short

Your frames, notes, pictures and recordings stay on your computer, and Annotate hands them only to the agent chat you
pick. What leaves your computer: your voice when you use the mic, feedback when you send it, counts of frames sent
and finished, update checks, your sign-in, and crash reports if you said yes to them.

## What it reads

- The part of your screen you frame, and a picture of the window it was drawn on.
- The note you type or say, and any recording you attach.
- The name and icon of the app under the frame, and the window's title or the page's address.
- Your microphone, only while the mic is on.

It does not read your clipboard or your files.

## What it keeps on your computer

| What | macOS | Ubuntu |
| --- | --- | --- |
| Frames, notes, recordings, settings, unsent feedback, its log, and crash dumps (kept 30 days, never sent) | `~/Library/Application Support/Annotate/` | `~/.local/share/annotate/`, and the log in `~/.cache/annotate-desktop/` |
| Your sign-in | Your Keychain, under "Annotate desktop" | `~/.local/share/annotate/account.sealed`, locked with your keyring when you have one |
| The installer's sign-in, a random install id, and the crash reports it sent | The installer's hidden folder in your home directory | The installer's hidden folder in your home directory |

Ask your coding agent where Annotate keeps things, and it lists each place.

## What leaves your computer

- **Frames** go to the agent chat you pick, on your own computer, and nowhere else. Whatever your coding agent sends to
  its own provider is under that provider's terms.
- **Your voice** goes through Annotate's servers to xAI, or to ElevenLabs if you pick it in Settings, to become text.
  Annotate keeps only how many minutes you used. What they keep is set by
  [xAI's privacy policy](https://x.ai/legal/privacy-policy) and
  [ElevenLabs' privacy policy](https://elevenlabs.io/privacy-policy).
- **Feedback**, when you press Send: your note, Annotate's version and your operating system, and, if you include them,
  a picture and your latest frame with its note. Annotate's servers keep it until it is deleted by hand, and email a
  copy to Annotate's maker.
- **Sign-in** goes through GitHub or Google. The installer's sign-in keeps your account number, name and picture link,
  asks Google for no email, and asks GitHub only for your public profile, so Annotate keeps a GitHub no-reply address
  made from your username, or no address. If you sign in on Annotate's website directly, it also keeps the email
  address that came with your account.
- **Updates:** the installer checks for a newer version and downloads it. Nothing updates on its own; `annotate update`
  applies one.
- **Counts:** while Annotate is open, it sends one line for each frame you send and each frame a chat finishes or can't
  do: how it was made, how long it took, the version and a random install id. Never your notes, pictures, recordings or
  name.
- **Crash reports**, only if you said yes when you installed it, or ran `annotate telemetry on`: a random install id,
  the app version, your operating system, processor, graphics card and driver, memory, how long each install, update
  and startup step took, whether it closed cleanly, and, after a crash or freeze, the error and where in Annotate's
  code it happened, with folder names, emails and addresses removed. Reports are deleted after 90 days, records of
  unexpected stops after a year.

Annotate's servers see your IP address when you connect; they keep it only in memory for rate limits and as a one-way
hash for a daily install count, kept two days.

## How to delete it

- **Everything on your computer:** `annotate uninstall --purge`. Without `--purge`, your frames, settings and crash
  report records stay. If an agent chat is still open, one small file saying Annotate was uninstalled may stay. On
  a Mac, the "Annotate desktop" sign-in stays in your Keychain; delete it in Keychain Access.
- **Crash reports:** `annotate telemetry off`, or set `DO_NOT_TRACK=1`. `annotate telemetry show` lists every report
  this computer sent.
- **Counts:** there is no switch for these yet. They stop when you quit or uninstall Annotate, and Annotate has no set
  time to delete them.
- **What Annotate's servers keep:** there is no way to delete an account yet. Open an issue at
  https://github.com/zaydek/annotate/issues asking for it, with nothing private in it, and it will be deleted.

## Contact

Open an issue at https://github.com/zaydek/annotate/issues.
