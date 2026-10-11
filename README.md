# Annotate

Annotate lets you point at anything on a web page, write a note, and have Claude Code fix it. Press ⇧⌘F, drag a
frame around what you mean, type what you want, press ⌘↩︎. Claude Code gets a picture of that part with your note,
does it, and tells you in one line what it changed.

This repo holds the docs: how to install Annotate, use it and fix it. You can also point your own Claude Code at this
repo (it reads [llms.txt](llms.txt)) and ask it to set Annotate up or help you troubleshoot. The extension's and the
service's source is not here.

## What you need

- Google Chrome on macOS, Windows or Linux.
- Claude Code 2.1.296 or later. Check with `claude --version`; update with `claude update`.
- An Annotate account. Annotate is invite-only for now; join the waitlist on the website.

You never handle an API key or a token: you sign in once in your browser and click Allow.

## Install

1. **Connect Claude Code.** Paste this one line into a terminal:

   ```sh
   claude plugin install annotate --marketplace https://annotate-app.fly.dev/plugin/marketplace.json && claude mcp login plugin:annotate:annotate
   ```

   It installs the Annotate plugin from Annotate's website and opens your browser on Annotate. Sign in if asked, then click
   **Allow**. Claude Code says it's connected. The line is also on the website,
   with Copy, and in Annotate's Settings, under MCP.

   Without the plugin, these two lines connect the same server to one project:

   ```sh
   claude mcp add --transport http annotate https://annotate-app.fly.dev/mcp
   claude mcp login annotate
   ```

2. **Add the Chrome extension.** Add Annotate to Chrome from its page in the Chrome Web Store (linked from the
   website), then pin it so its eyes sit in your toolbar.

That's it. In Claude Code, `/mcp` lists **annotate** as connected (`plugin:annotate:annotate` with the plugin).

## Your first five minutes

1. **Frame something.** On any web page, press ⇧⌘F and drag a box around the part you mean.
2. **Say what you want.** Type a note in the card under the frame, then press ⌘↩︎. The frame stays, so you can send
   another note about the same spot.
3. **Let Claude take it.** In Claude Code, say "take the next Annotate frame". Claude gets your picture and note, makes
   the change, and marks it done with one line.
4. **Watch it happen.** Press ⇧⌘E to open Annotate's side panel. Each frame shows when it's sent, when Claude picks it
   up, and Claude's line when it's done.
5. **Show more than a picture.** With a frame up, ⇧⌘K adds a screenshot of it and ⇧⌘G records it; press ⇧⌘G again
   to stop. Drop files on the card too, up to five.

Press ⌥⌘↩︎ instead of ⌘↩︎ to queue a frame, then send the whole queue from the side panel when you're ready.

## Free to start

Annotate is free while it's invite-only. A free allowance, with a counter showing what's left, is coming.

## Updating

The extension updates itself through Chrome. [CHANGELOG.md](CHANGELOG.md) lists what changed in each version.

## Troubleshooting

1. In Claude Code, run `/mcp`. If **annotate** says it needs authentication, run `claude mcp login annotate` and click
   **Allow** again.
2. If ⇧⌘F does nothing, open `chrome://extensions`, make sure Annotate is on, and reload the page you're on. Some
   pages, like Chrome's own, can't be framed.
3. Still stuck? On the website, open the menu, choose **Feedback**, and say what you did, what you expected and what
   happened instead.

## Privacy

What leaves your computer, and where it goes:

- **A frame you send:** its note, the page's address and title, the framed picture and anything you attached go to
  Annotate's server, so Claude Code can fetch them. Nothing is sent until you press ⌘↩︎ or ⌥⌘↩︎.
- **Claude Code:** reads your frames only through the connection you allowed. You can end it any time with
  `claude mcp logout annotate`.
- **Feedback:** sent only when you send it.
- **Keys:** you never see or handle one.

## License

This repo is MIT licensed ([LICENSE](LICENSE)). The licence covers this repo only; the Annotate extension and the
Annotate service are not covered by it.
