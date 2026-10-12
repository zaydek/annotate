---
name: annotate
description: Starts or stops watching for the notes a person sends from Annotate in Chrome, so this session picks each one up on its own. Use when the person types /annotate start or /annotate stop.
---

# Annotate

Annotate sends a framed part of a web page and a note from Chrome to a coding agent. This skill makes this session start
work on its own when one arrives: `/annotate start` watches, `/annotate stop` stops watching.

The watcher is `annotate.mjs`, in this skill's own folder (the folder this SKILL.md is in). Below, `$ANNOTATE` means
`node "<this skill's folder>/annotate.mjs"`. Its sign-in is kept in the macOS Keychain and never shown. It needs the
network and the Keychain, so in Codex run every `$ANNOTATE` command outside the sandbox (ask for escalated permissions,
saying it watches for Annotate notes).

Pick the agent you are: `claude` for Claude Code, `codex` for Codex. Below, `<agent>` means that word.

## /annotate start

1. Sign in, in the foreground: `$ANNOTATE login`. If it is already signed in it says so at once. Otherwise the person's
   browser opens on Annotate: tell them to press Allow there, and wait for it to finish.
2. Start the watcher with the wake for your agent:
   - Claude Code: run `$ANNOTATE watch --agent claude --once` with the Bash tool and `run_in_background: true`. Do not
     wait on it, poll it or read its output while it runs. End your turn. It exits when a note arrives, and its exit
     starts your next turn.
   - Codex: run `$ANNOTATE start --agent codex --thread "$CODEX_THREAD_ID"`. It returns at once and leaves the watcher
     running on its own, which queues each note to this session as your next message. Nothing to wait on: end your turn.
3. Tell the person in one line that you are watching for their notes, and that `/annotate stop` stops it.

## When a note arrives

In Claude Code the watcher exits; read its output. In Codex a message starting `Annotate: frame` arrives.

- A line `frame <id> sent: <address> | <note>`: a note arrived. Take it with the Annotate MCP tools when this session has
  them (`frames_next`, then `frame_mark` with `done` or `stuck` and one line when you finish), else work from the line.
  Do what the note asks in this project. In Claude Code, then start the watcher again exactly as in step 2 (in Codex it
  is still running). End your turn.
- `Not signed in to Annotate`: run step 1, then step 2.
- `<Claude Code or Codex> no longer watches for your frames.` or no line: the person stopped it. Do nothing and do not start it again.

## /annotate stop

Run `$ANNOTATE stop --agent <agent>` in the foreground, and do not start the watcher again. Tell the person in one line
that you stopped watching. If a watcher exit arrives after this, it says it stopped: do nothing.
