#!/usr/bin/env node
// skills/annotate/annotate.mjs: `annotate watch`, the one watcher Claude Code and Codex share (ops row 362; Z, 2026-10-11:
// "it should be self similar for codex and claude and just work"). The skill beside it (SKILL.md) runs it; annotate-app
// serves both at /skills/annotate/ with this site in DEFAULT_SITE below, so a person installs them with one line.
//   node annotate.mjs login                 Signs in once: the browser opens on Annotate's /authorize, the person presses
//                                           Allow, and the token goes to the macOS Keychain (OAuth PKCE, the same flow
//                                           Claude Code's MCP login takes, server/oauth.mjs). It is never printed,
//                                           logged or written to a file. Signed in already, it says so and exits.
//   node annotate.mjs watch [--agent claude|codex] [--once]
//                                           Holds GET /frames/events and prints one line per frame sent to this agent
//                                           (a frame's agent is the one its send named, ops row 329; a frame with none
//                                           goes to either). --once exits 0 after the first line, which is the wake: a
//                                           background shell that exits starts the agent's next turn. A frame sent while
//                                           no watcher ran is printed at the next start (the cursor below).
//   node annotate.mjs start --agent codex --thread <id>
//                                           Codex's wake: the same watcher, detached from the shell that started it (so it
//                                           outlives that turn, outside Codex's sandbox, which has no network), and each
//                                           frame queued to that Codex session with `codex queue --remote unix:// --thread
//                                           <id>`, stdin closed (an open one hangs it), which starts its next turn. It
//                                           runs until stop. ANNOTATE_CODEX names the codex program (else codex on PATH).
//   node annotate.mjs stop [--agent claude|codex]
//                                           Stops that agent's watcher and waits until it is gone; a stopped watcher
//                                           prints no frame.
//   node annotate.mjs logout                Takes the token out of the Keychain.
// Where: ANNOTATE_URL names another site. The watcher's pid and cursor (the newest frame it printed) live in
// ANNOTATE_WATCH_DIR, else ~/.local/state/annotate-watch/<agent>.json; never a token. ANNOTATE_OPEN names a program that
// opens the sign-in address in place of the system's browser.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const DEFAULT_SITE = 'https://annotate-app.fly.dev';
const AGENTS = ['claude', 'codex'];
const KEYCHAIN = 'annotate-watch';
const NAME = { claude: 'Claude Code', codex: 'Codex' };

// SERVER-SENT EVENTS: a block ends at a blank line; "event:" names it ("message" when it does not), "data:" lines join
// with a newline, and a line starting ":" is a comment. Answers the whole blocks and what is left over.
export function parseEvents(text) {
  const events = [];
  const blocks = text.replace(/\r\n?/g, '\n').split('\n\n');
  const rest = blocks.pop();
  for (const block of blocks) {
    let event = 'message'; const data = [];
    for (const line of block.split('\n')) {
      if (!line || line.startsWith(':')) continue;
      const i = line.indexOf(':'), k = i < 0 ? line : line.slice(0, i), v = i < 0 ? '' : line.slice(i + 1).replace(/^ /, '');
      if (k === 'event') event = v; else if (k === 'data') data.push(v);
    }
    if (data.length) events.push({ event, data: data.join('\n') });
  }
  return { events, rest };
}

// The frame an event carries when it is one sent to this agent, else null: a "frame" event (never a "pending" row or a
// "gone"), with an id, in state sent, and an agent that is this one or none.
export function frameFor(ev, agent) {
  if (ev.event !== 'frame') return null;
  let f; try { f = JSON.parse(ev.data); } catch { return null; }
  if (!f || typeof f !== 'object' || typeof f.id !== 'string' || f.state !== 'sent' || f.pending) return null;
  if (f.agent && f.agent !== agent) return null;
  return f;
}

// One line a frame: its id, its address and its note's first 200 characters, on one line.
export function lineOf(f) {
  const note = String(f.note || '').replace(/\s+/g, ' ').trim().slice(0, 200);
  return `frame ${f.id} sent: ${f.url || ''}${note ? ` | ${note}` : ''}`;
}

const site = () => (process.env.ANNOTATE_URL || DEFAULT_SITE).replace(/\/$/, '');
const dir = () => process.env.ANNOTATE_WATCH_DIR || path.join(os.homedir(), '.local', 'state', 'annotate-watch');
const stateFile = (agent) => path.join(dir(), `${agent}.json`);
const readState = (agent) => { try { return JSON.parse(fs.readFileSync(stateFile(agent), 'utf8')); } catch { return {}; } };
const writeState = (agent, s) => { fs.mkdirSync(dir(), { recursive: true }); fs.writeFileSync(stateFile(agent), `${JSON.stringify(s)}\n`); };
const alive = (pid) => { try { return Number.isInteger(pid) && pid > 0 && (process.kill(pid, 0), true); } catch (e) { return e.code === 'EPERM'; } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const fail = (line, code = 1) => { console.error(line); process.exit(code); };

// THE KEYCHAIN. The token pair rides as one base64url value, written through `security -i` on stdin so it never sits in
// a process's arguments, and read back on stdout into this process alone. ANNOTATE_WATCH_BEARER, a test's stand-in, skips it.
function keychainRead() {
  if (process.env.ANNOTATE_WATCH_BEARER) return { a: process.env.ANNOTATE_WATCH_BEARER, e: Infinity };
  if (process.platform !== 'darwin') fail('annotate watch keeps its sign-in in the macOS Keychain, so it runs on a Mac.');
  try { return JSON.parse(Buffer.from(execFileSync('security', ['find-generic-password', '-s', KEYCHAIN, '-a', site(), '-w'], { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(), 'base64url').toString()); } catch { return null; }
}
function keychainWrite(t) {
  if (process.env.ANNOTATE_WATCH_BEARER) return;
  const v = Buffer.from(JSON.stringify(t)).toString('base64url');
  execFileSync('security', ['-i'], { input: `add-generic-password -U -s ${KEYCHAIN} -a "${site()}" -w ${v}\n`, stdio: ['pipe', 'ignore', 'ignore'] });
}
function keychainDelete() { try { execFileSync('security', ['delete-generic-password', '-s', KEYCHAIN, '-a', site()], { stdio: 'ignore' }); } catch {} }

async function form(url, body) {
  const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(body).toString(), signal: AbortSignal.timeout(15000) });
  let j = null; try { j = await r.json(); } catch {}
  return { status: r.status, j };
}
const kept = (client, j) => ({ c: client, a: j.access_token, r: j.refresh_token, e: Date.now() + (Number(j.expires_in) || 3600) * 1000 });

// A live access token: the Keychain's, refreshed a minute before it ends (the refresh token is used once and replaced).
async function bearer({ force = false } = {}) {
  const t = keychainRead();
  if (!t) return null;
  if (!force && t.e - 60e3 > Date.now()) return t.a;
  if (!t.r) return null;
  const { status, j } = await form(`${site()}/token`, { grant_type: 'refresh_token', refresh_token: t.r, client_id: t.c });
  if (status !== 200 || !j?.access_token) return null;
  keychainWrite(kept(t.c, j));
  return j.access_token;
}

async function login() {
  if (await bearer()) return console.log(`Signed in to ${site()} already.`);
  const meta = await (await fetch(`${site()}/.well-known/oauth-authorization-server`, { signal: AbortSignal.timeout(15000) })).json();
  const verifier = crypto.randomBytes(32).toString('base64url'), challenge = crypto.createHash('sha256').update(verifier).digest('base64url');
  const state = crypto.randomBytes(16).toString('base64url');
  let done; const landed = new Promise((r) => { done = r; });
  const srv = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://x');
    if (u.pathname !== '/callback') { res.writeHead(404); return res.end(); }
    const ok = u.searchParams.get('state') === state && u.searchParams.get('code');
    res.writeHead(ok ? 200 : 400, { 'content-type': 'text/plain; charset=utf-8' });
    res.end(ok ? 'Signed in. You can close this tab.' : 'That did not work. Go back to your coding agent and try again.');
    done(ok ? u.searchParams.get('code') : null);
  });
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  const redirect = `http://127.0.0.1:${srv.address().port}/callback`;
  const reg = await fetch(meta.registration_endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ client_name: 'The Annotate skill', redirect_uris: [redirect], token_endpoint_auth_method: 'none', grant_types: ['authorization_code', 'refresh_token'], response_types: ['code'] }) });
  const client = (await reg.json())?.client_id;
  if (!client) { srv.close(); fail(`${site()} did not register this sign-in (${reg.status}).`); }
  const at = new URL(meta.authorization_endpoint);
  for (const [k, v] of Object.entries({ response_type: 'code', client_id: client, redirect_uri: redirect, code_challenge: challenge, code_challenge_method: 'S256', state, resource: `${site()}/mcp` })) at.searchParams.set(k, v);
  console.log(`Your browser opens on Annotate. Press Allow there.\nIf it does not open, go to ${at.href}`);
  const opener = process.env.ANNOTATE_OPEN || (process.platform === 'darwin' ? 'open' : 'xdg-open');
  spawn(opener, [at.href], { stdio: 'ignore', detached: true }).on('error', () => {}).unref();
  let timer; const code = await Promise.race([landed, new Promise((r) => { timer = setTimeout(() => r(null), 5 * 60e3); })]);
  clearTimeout(timer); srv.closeAllConnections(); srv.close();   /* Nothing left to hold this process once it is signed in */
  if (!code) fail('Not signed in: Allow was not pressed within 5 minutes. Run this again.');
  const { status, j } = await form(meta.token_endpoint, { grant_type: 'authorization_code', code, redirect_uri: redirect, client_id: client, code_verifier: verifier });
  if (status !== 200 || !j?.access_token) fail(`Not signed in: ${site()} refused the code (${status}).`);
  keychainWrite(kept(client, j));
  console.log(`Signed in to ${site()}.`);
}

// A frame queued to a Codex session as its next message, the program's own stdin closed.
function queueTo(thread, f) {
  const message = `Annotate: ${lineOf(f)}\nUse the annotate skill: take this note, do it, and mark it.`;
  const c = spawn(process.env.ANNOTATE_CODEX || 'codex', ['queue', '--remote', 'unix://', '--thread', thread, '--message', message], { stdio: ['ignore', 'ignore', 'pipe'] });
  let err = ''; c.stderr.on('data', (d) => { err += d; });
  c.on('error', (e) => console.error(`codex queue did not start: ${e.message}`));
  c.on('exit', (code) => console.log(code === 0 ? `queued ${f.id} to ${thread}` : `codex queue ${f.id} failed (${code}): ${err.trim().slice(0, 300)}`));
}

async function watch(agent, once, thread = '') {
  const prior = readState(agent);
  if (alive(prior.pid) && prior.pid !== process.pid) { try { process.kill(prior.pid, 'SIGTERM'); } catch {} }   /* One watcher an agent */
  let cursor = Number.isFinite(prior.cursor) ? prior.cursor : Date.now();
  const save = () => writeState(agent, { pid: process.pid, cursor });
  save();
  let quit = false;
  const leave = (code) => { quit = true; const s = readState(agent); if (s.pid === process.pid) writeState(agent, { cursor }); process.exit(code); };
  process.on('SIGTERM', () => leave(0)); process.on('SIGINT', () => leave(0));
  const seen = new Set();
  const show = (f) => {
    const key = `${f.id}@${f.updated ?? f.at}`;
    if (seen.has(key)) return;
    seen.add(key);
    cursor = Math.max(cursor, Number(f.updated ?? f.at) || 0);
    save();
    console.log(lineOf(f));
    if (thread) queueTo(thread, f);
    if (once) leave(0);
  };
  let wait = 1000;
  while (!quit) {
    let token = await bearer();
    if (!token) fail('Not signed in to Annotate: run node annotate.mjs login', 3);
    const ac = new AbortController();
    try {
      let r = await fetch(`${site()}/frames/events`, { headers: { authorization: `Bearer ${token}`, accept: 'text/event-stream' }, signal: ac.signal });
      if (r.status === 401) { token = await bearer({ force: true }); if (!token) fail('Not signed in to Annotate: run node annotate.mjs login', 3); r = await fetch(`${site()}/frames/events`, { headers: { authorization: `Bearer ${token}`, accept: 'text/event-stream' }, signal: ac.signal }); }
      if (r.status === 401) fail('Not signed in to Annotate: run node annotate.mjs login', 3);
      if (!r.ok || !r.body) throw new Error(`events ${r.status}`);
      // What was sent while no watcher ran, once the stream is open, so nothing falls between the two.
      const list = await fetch(`${site()}/frames`, { headers: { authorization: `Bearer ${token}` } }).then((x) => (x.ok ? x.json() : { frames: [] })).catch(() => ({ frames: [] }));
      for (const f of list.frames || []) if (frameFor({ event: 'frame', data: JSON.stringify(f) }, agent) && Number(f.updated ?? f.at) > cursor) show(f);
      wait = 1000;
      let buf = '';
      const dec = new TextDecoder();
      for await (const chunk of r.body) {
        const { events, rest } = parseEvents(buf + dec.decode(chunk, { stream: true }));
        buf = rest;
        for (const ev of events) { const f = frameFor(ev, agent); if (f) show(f); }
      }
    } catch (e) { if (quit) break; }
    ac.abort();
    await sleep(wait); wait = Math.min(wait * 2, 15000);
  }
}

// The Codex watcher, detached: its own session and process group, stdin closed, its lines in <agent>.log beside its state.
async function start(agent, thread) {
  if (!/^[A-Za-z0-9._:-]{1,128}$/.test(thread || '')) fail('--thread is the Codex session to wake: CODEX_THREAD_ID.', 2);
  if (!(await bearer())) fail('Not signed in to Annotate: run node annotate.mjs login', 3);
  fs.mkdirSync(dir(), { recursive: true });
  const log = fs.openSync(path.join(dir(), `${agent}.log`), 'a');
  const c = spawn(process.execPath, [fileURLToPath(import.meta.url), 'watch', '--agent', agent, '--queue', thread], { detached: true, stdio: ['ignore', log, log], env: process.env });
  c.unref();
  for (let i = 0; i < 50 && readState(agent).pid !== c.pid; i++) await sleep(100);
  if (readState(agent).pid !== c.pid) fail('Could not start watching for your Annotate notes.');
  console.log(`${NAME[agent]} is watching for your frames. To stop, type /annotate stop.`);
  process.exit(0);
}

async function stop(agent) {
  const s = readState(agent);
  if (!alive(s.pid)) { writeState(agent, { cursor: s.cursor }); return console.log(`${NAME[agent]} was not watching for your frames.`); }
  try { process.kill(s.pid, 'SIGTERM'); } catch {}
  for (let i = 0; i < 50 && alive(s.pid); i++) await sleep(100);
  if (alive(s.pid)) fail(`Could not stop watching for your Annotate notes (process ${s.pid}).`);
  console.log(`${NAME[agent]} no longer watches for your frames.`);
}

const main = async (argv) => {
  const cmd = argv[0], flag = (n) => argv.includes(n), val = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
  const agent = val('--agent') || 'claude';
  if (!AGENTS.includes(agent)) fail(`--agent is ${AGENTS.join(' or ')}.`, 2);
  if (cmd === 'login') { await login(); process.exit(0); }
  if (cmd === 'watch') return watch(agent, flag('--once'), val('--queue') || '');
  if (cmd === 'start') return start(agent, val('--thread'));
  if (cmd === 'stop') return stop(agent);
  if (cmd === 'logout') { keychainDelete(); return console.log(`Signed out of ${site()}.`); }
  fail('node annotate.mjs login | watch [--agent claude|codex] [--once] | start --agent codex --thread <id> | stop [--agent claude|codex] | logout', 2);
};
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main(process.argv.slice(2));
