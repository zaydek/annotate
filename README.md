# Annotate

Annotate is a desktop app, for people who use Claude Code on a Mac or on Ubuntu, that lets you draw a frame around anything on your screen, type a note, and have the Claude Code chat you picked do what the note asks and say what it did.

<!-- film: TODO -->

## Install

Annotate is shared by invitation for now. To ask for one, join the waitlist on Annotate's website,
[annotate-app.fly.dev](https://annotate-app.fly.dev), or ask someone who already uses Annotate to invite you.

You need Claude Code (check with `claude --version`) and a Mac with Apple silicon, or Ubuntu with its standard desktop.

The person who invites you sends two lines. Paste them into a terminal, one after the other, and press Return after
each:

1. A line that adds the zaydek marketplace, the list Claude Code installs Annotate from. Its link carries your
   invitation, so use the line you were sent.
2. This line, which installs Annotate:

   ```sh
   claude plugin install annotate@zaydek
   ```

Then start a new Claude Code session. On a Mac, the app is Annotate in your Applications folder, so Spotlight finds it
too.

The first time, your computer asks for permission. ⇧⌘F (Ctrl+Shift+F on Ubuntu) is the key that draws a frame over
your screen; the Use section below explains it and the other keys.

- **macOS:** the first time you press ⇧⌘F, macOS asks to let Annotate record your screen. Open System Settings, then
  Privacy & Security, then Screen & System Audio Recording, turn on Annotate, and press ⇧⌘F again. The first time you
  press the mic button to speak a note, macOS asks to let Annotate use the microphone: click Allow.
- **Ubuntu:** Ubuntu asks "Allow Annotate to Take Screenshots?": click Allow. It asks to add Annotate's keyboard
  shortcuts: click Add. The first time you record a video of a frame, Ubuntu's Share Screen window asks which screen to share: pick it and
  click Share. Ubuntu remembers each answer.

Speaking a note and sending feedback need an Annotate account. Accounts are by invitation too: ask the person who
invited you, or join the waitlist on the website. The first time you press the mic button, your browser opens on
Annotate's website: sign in with your Annotate account and click Allow.

## Use

In a Claude Code chat, type `/annotate start`. From then on, each frame you send goes to that chat. Claude reads the
picture and your note, does what the note asks, and marks the frame done, or stuck if it can't, with one line saying
what it did.

A few words you will meet:

- **Frame:** the box you draw over your screen. Annotate sends a picture of what is inside it, with your note.
- **Card:** the small box that opens beside the frame, where you type the note. It has Send, Cancel and a mic button.
  Press the mic button and speak, and your words fill the note as you talk.
- **Inbox:** Annotate's window listing each frame you sent, whether the agent is working on it, done or stuck, and the
  line it wrote.
- **Menu-bar icon (Mac) and top-bar icon (Ubuntu):** Annotate's icon at the top right of your screen. Click it for
  Annotate's menu: the inbox, your recent frames, Settings, Send Feedback and Quit.

| Type in Claude Code | What happens |
| :- | :- |
| `/annotate` | Shows whether Annotate is running, and which chat takes your frames. |
| `/annotate start` | This chat takes your frames, and Annotate opens if it isn't running. If you type it in another chat, your frames go there instead. |
| `/annotate stop` | This chat stops taking frames. Annotate keeps running. |
| `/annotate open` | Annotate opens. This chat takes no frames until you type `/annotate start`. |
| `/annotate quit` | Annotate closes. |
| `/annotate where` | Lists every folder Annotate writes to on this computer. |
| `/annotate help` | Shows every command and key. |
| `/annotate forget` | Removes Annotate from this computer, once you type yes. See Update and uninstall for what it keeps. |

| Mac | Linux | What happens |
| :- | :- | :- |
| ⇧⌘F | Ctrl+Shift+F | Draw a frame over your screen, then type a note on its card. |
| ⌘↩︎ | Ctrl+Enter | Send the frame and its note to the chat. |
| ⇧⌘↩︎ | Ctrl+Shift+Enter | Record a video of the frame you drew; press it again to stop. The video goes to the chat with the frame. To add your voice, press Mic in the bar that shows while it records. |
| ⇧⌘E | Ctrl+Shift+E | Show or hide the inbox. |
| Esc | Esc | Close the frame without sending it. |

### In Chrome

Annotate also comes as a Chrome extension, for web pages only. It is a separate product with its own install, and
its `/annotate start` comes from the Annotate skill (step 2 below), not from the desktop app. It needs Google Chrome on macOS,
Windows or Linux, Claude Code 2.1.296 or later (update with `claude update`), and an Annotate account, which comes by
invitation as Install says. You never handle an API key or a token.

1. Connect Claude Code to Annotate's server, where the extension keeps the frames you send. Paste this line into a
   terminal. It installs a Claude Code plugin named `annotate@annotate`. A plugin is an add-on that Claude Code loads
   in every project. The line then opens your browser on Annotate's website: sign in if asked, then click Allow. The
   same line is on the website, with a Copy button, and in the extension's Settings, under MCP, the connection Claude
   Code uses to read your frames.

   ```sh
   claude plugin install annotate --marketplace https://annotate-app.fly.dev/plugin/marketplace.json && claude mcp login plugin:annotate:annotate
   ```

   If you would rather not install that plugin, these two lines connect Claude Code to the same Annotate server for
   the one project you run them in:

   ```sh
   claude mcp add --transport http annotate https://annotate-app.fly.dev/mcp
   claude mcp login annotate
   ```

2. Add the Annotate skill with this line. A skill is a set of instructions Claude Code reads; this one makes
   `/annotate start` and `/annotate stop` work. The line also adds it to Codex, OpenAI's coding tool, if you use that:

   ```sh
   curl -fsSL --create-dirs -o ~/.claude/skills/annotate/SKILL.md https://annotate-app.fly.dev/skills/annotate/SKILL.md -o ~/.claude/skills/annotate/annotate.mjs https://annotate-app.fly.dev/skills/annotate/annotate.mjs -o ~/.codex/skills/annotate/SKILL.md https://annotate-app.fly.dev/skills/annotate/SKILL.md -o ~/.codex/skills/annotate/annotate.mjs https://annotate-app.fly.dev/skills/annotate/annotate.mjs
   ```

3. Add Annotate to Chrome from its page in the Chrome Web Store (linked from the website), then pin it so its eyes sit
   in your toolbar. Annotate's toolbar icon is a pair of eyes that follow your pointer. In Claude Code, `/mcp` now
   lists annotate as connected.

The extension's keys:

| Mac | Windows and Linux | What happens |
| :- | :- | :- |
| ⇧⌘F | Ctrl+Shift+F | Draw a frame on the web page, then type a note on its card. |
| ⌘↩︎ | Ctrl+Enter | Send the frame and its note. |
| ⌥⌘↩︎ | Ctrl+Alt+Enter | Queue the frame, to send later with the rest of the queue from the side panel. |
| ⇧⌘E | Ctrl+Shift+E | Open or close the extension's side panel. |
| ⇧⌘K | Ctrl+Shift+K | With a frame up, add a screenshot of it. |
| ⇧⌘G | Ctrl+Shift+G | With a frame up, record it; press it again to stop. |

Your first five minutes in Chrome:

1. On any web page, press ⇧⌘F and drag a frame around the part you mean.
2. Type a note on the card under the frame, then press ⌘↩︎. The frame stays, so you can send another note about the
   same spot.
3. In Claude Code, type `/annotate start` (in Codex, `$annotate start`), or say "take the next Annotate frame". Claude
   gets your picture and note, makes the change, and marks it done with one line. `/annotate stop` stops it.
4. Press ⇧⌘E to open the extension's side panel. Each frame shows when it was sent, when Claude picked it up, and
   Claude's line when it was done.
5. Every frame sends a picture of the part you framed. With a frame up, ⇧⌘K adds one more picture of it to the card,
   and ⇧⌘G records a video of it; press ⇧⌘G again to stop. You can also drop files on the card. A card holds up to
   five of these, on top of the frame's own picture.

The extension is free while Annotate is invite-only.

If something goes wrong in Chrome:

1. In Claude Code, run `/mcp`. If annotate says it needs authentication, run
   `claude mcp login plugin:annotate:annotate`, or `claude mcp login annotate` if you used the two lines without the
   plugin, and click Allow again.
2. If ⇧⌘F does nothing, open `chrome://extensions`, make sure Annotate is on, and reload the page. Some pages, like
   Chrome's own, can't be framed.
3. Still stuck? On the website, open the menu, choose Feedback, and say what you did, what you expected and what
   happened instead.

## Settings

Click Annotate's menu-bar icon (Mac) or top-bar icon (Ubuntu) and choose Settings…. On a Mac, Settings… is also in the
Annotate menu while an Annotate window is in front, and ⌘, opens it there.

- **Eyes follow the cursor:** Annotate's icon is a small character with eyes, shown in the menu bar and at the top of
  the inbox. When this is on, its eyes follow your pointer. When it is off, they only blink.
- **Sound effects:** Annotate plays a short sound when you open, draw, send or close a frame, start or stop a
  recording, turn the mic on or off, or copy a frame.
- **Show in Dock (Mac):** Annotate's icon also shows in the Dock.
- **Start on Login (Mac):** Annotate opens when you log in.
- **Menu bar icon:** the character drawn on a small square tile, or the character alone.
- **Microphone:** which microphone the mic button uses. System default unless you pick one.

Speech to text is not in the Settings window. Your voice goes to xAI to become text. On a Mac, to use ElevenLabs
instead, hold Option (⌥) as you click the menu-bar icon, then choose ElevenLabs under Speech to Text. On Ubuntu, your
voice always goes to xAI.

## Where your data lives

Annotate keeps your frames and settings in one folder on your computer. `/annotate where` lists every folder it writes
to.

- **Mac:** `~/Library/Application Support/Annotate`. The app itself is Annotate in your Applications folder.
- **Ubuntu, installed through Claude Code:** `~/.claude-apps/annotate/state/userData`.
- **Linux, installed some other way (for example from an AppImage file, not through Claude Code):**
  `~/.config/Annotate`.

What leaves your computer, and where it goes:

The desktop app:

- **The chat you picked:** a frame, its note and its video stay on your computer until the chat where you typed
  `/annotate start` takes it. Then that chat's AI reads them, as it reads anything else you paste into that chat. In
  Claude Code, that means they go to Anthropic, the company that makes Claude, with the rest of the chat. The desktop
  app never sends frames to Annotate's server or to Clawed Apps (the installer, below), except the one picture you
  choose to add to Send Feedback.
- **Annotate's website, annotate-app.fly.dev:** you sign in to Annotate there. Your voice and your feedback pass
  through Annotate's server, as the next two lines say. Frames do not, apart from a feedback picture.
- **xAI, or ElevenLabs if you picked it:** while the mic is on, your voice goes through Annotate's server to that
  service to become text. Your frames, pictures, videos and typed notes never go there.
- **Feedback:** when you click Send in Send Feedback, Annotate's server gets your note, the picture if you add one,
  and which version of Annotate, which operating system and version, and which kind of processor you have. Nothing is
  sent until you click Send.
- **Clawed Apps (spelled with a w):** the service that installs Annotate through Claude Code. It gives this computer an
  install number, sees each time Annotate downloads an update, and, like any website, sees your internet address
  (IP address). When Claude Code opened Annotate, with `/annotate start` or `/annotate open`, Annotate also sends
  Clawed Apps a short report each time you send a frame, and each time an agent marks one done or stuck.
  A report on a frame you sent says how you made it: typed, spoken, recorded (with a video), or drawn (sent with no
  note). It also says how many seconds passed from pressing ⇧⌘F to sending it.
  A report on a frame done or stuck says how many seconds passed from sending it to the agent marking it.
  Each report also carries the Annotate version and a random number that is the same for every report from this
  computer. A report never includes your notes, pictures, videos, name or email address.

The Chrome extension:

- **Annotate's server:** when you send or queue a frame (⌘↩︎ or ⌥⌘↩︎ on a Mac, Ctrl+Enter or Ctrl+Alt+Enter on Windows
  and Linux), the frame's note, the page's address and title, the picture
  and anything you attached go to Annotate's server, so Claude Code can fetch them. When Claude marks a frame done, its
  one line goes to Annotate's server too, so the side panel can show it.
- **The chat that takes the frame:** the agent then reads the frame as it reads anything else in the chat, so it goes
  with the rest of the chat to the company behind that agent: Anthropic for Claude Code, OpenAI for Codex. Claude Code
  reads frames only through
  the connection you allowed. `claude mcp logout plugin:annotate:annotate` ends it, or `claude mcp logout annotate` if
  you used the two lines without the plugin.

Nothing else leaves.

## Update and uninstall

The desktop app updates itself when you start a new Claude Code session. The Chrome extension updates itself through
Chrome.

To remove the app, type `/annotate forget` in Claude Code and then type yes. What it removes depends on your computer:

- **Mac:** it removes the Annotate app and keeps your frames and settings in `~/Library/Application Support/Annotate`.
- **Ubuntu, installed through Claude Code:** it removes the app and its data folder, with your frames and settings.
- **Linux, installed some other way (not through Claude Code):** it removes the app and keeps `~/.config/Annotate`.

Then, to remove the `/annotate` command from Claude Code too, run this line in a terminal:

```sh
claude plugin uninstall annotate@zaydek
```

On a Mac, your frames and settings stay in `~/Library/Application Support/Annotate` until you delete that folder
yourself, in Finder or with `rm -r`.

To remove the Chrome extension:

1. Open `chrome://extensions` and click Remove on Annotate.
2. Remove its Claude Code plugin with `claude plugin uninstall annotate@annotate`, or, if you used the two lines
   without the plugin, remove that connection with `claude mcp remove annotate`.
3. Delete the skill's folders, `~/.claude/skills/annotate` and `~/.codex/skills/annotate`.

This page does not cover deleting the frames the extension sent to Annotate's server; ask for it through Feedback.

## Works with

- **The desktop app:** Claude Code in a terminal, on macOS with Apple silicon (tested on macOS 26) and Ubuntu with
  GNOME, its standard desktop (tested on Ubuntu 26.04 on an Intel or AMD computer). There is no build for Intel Macs.
  Not yet tested: the Claude desktop app, and Codex (OpenAI's), OpenCode, omp (oh-my-pi) and Grok Build (xAI's), which
  are coding tools like Claude Code.
- **In Chrome (the extension):** Google Chrome on macOS, Windows or Linux, with Claude Code in a terminal; Codex in a
  terminal, on macOS. Not yet tested: the Claude desktop app, OpenCode, omp and Grok Build.

## Feedback

Click Annotate's menu-bar icon (Mac) or top-bar icon (Ubuntu) and choose Send Feedback…. Write what is working, what
isn't and what you want. To add a picture, click Frame the screen… and draw a frame, or pick one of your recent
frames. Then click Send.

It sends Annotate's server your note, the picture if you added one, and which version of Annotate, which operating
system and version, and which kind of processor you have. If you are not signed in, Annotate keeps it on your computer
and the Send button becomes Sign in to send. Click it, sign in on Annotate's website in your browser, and click Allow;
Annotate then sends it.

In Chrome, open the menu on Annotate's website and choose Feedback.

You can also open an issue at [github.com/zaydek/annotate/issues](https://github.com/zaydek/annotate/issues). Issues
are public, so leave out anything private.

## License

This repo holds Annotate's docs and the Annotate skill, and it is MIT licensed ([LICENSE](LICENSE)). The Annotate app,
the Chrome extension and the Annotate service are not in this repo, and this license does not cover them.
