"use strict";

const fs = require("node:fs");
const path = require("node:path");
const uuid = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/u;
const itemId = /^[A-Za-z0-9._-]{1,160}$/u;
const maxLine = 256 * 1024;

// Rollouts interleave visible events with potentially very large tool outputs.
// Keep at most one bounded line, even when an unrelated event is many megabytes.
function* records(fd) {
  const chunk = Buffer.allocUnsafe(64 * 1024);
  const line = Buffer.allocUnsafe(maxLine);
  let length = 0;
  let position = 0;
  let count;
  while ((count = fs.readSync(fd, chunk, 0, chunk.length, position))) {
    position += count;
    let start = 0;
    while (start < count) {
      const next = chunk.subarray(start, count).indexOf(10);
      const bytes = next === -1 ? count - start : next;
      if (length + bytes <= maxLine) chunk.copy(line, length, start, start + bytes);
      length += bytes;
      if (next !== -1) {
        yield length > maxLine || !length ? null : JSON.parse(line.toString("utf8", 0, length));
        length = 0;
      }
      start += bytes + 1;
    }
  }
  if (length > 0 && length <= maxLine) {
    let tail;
    try { tail = JSON.parse(line.toString("utf8", 0, length)); } catch { return; }
    yield tail;
  }
}

function openRollout(filename, home, sessionId, { comparablePath }) {
  if (!uuid.test(sessionId) || typeof filename !== "string" || !path.isAbsolute(filename)) return null;
  const relative = path.relative(comparablePath(home), comparablePath(filename)).split(path.sep);
  const basename = relative.at(-1);
  const sessionDirectory = relative.length === 5 && relative[0] === "sessions" &&
    /^\d{4}$/u.test(relative[1]) && /^\d{2}$/u.test(relative[2]) && /^\d{2}$/u.test(relative[3]);
  const archiveDirectory = relative.length === 2 && relative[0] === "archived_sessions";
  if ((!sessionDirectory && !archiveDirectory) ||
      !basename.endsWith("-" + sessionId + ".jsonl") ||
      !/^rollout-\d{4}-\d\d-\d\dT\d\d-\d\d-\d\d-/iu.test(basename)) return null;
  const before = fs.lstatSync(filename, { bigint: true });
  if (!before.isFile() || before.nlink !== 1n || comparablePath(fs.realpathSync.native(filename)) !== comparablePath(filename)) return null;
  const fd = fs.openSync(filename, "r");
  try {
    const opened = fs.fstatSync(fd, { bigint: true });
    if (opened.ino === before.ino && opened.dev === before.dev && opened.nlink === 1n) return fd;
  } catch (error) {
    fs.closeSync(fd);
    throw error;
  }
  fs.closeSync(fd);
  return null;
}

function headerMatches(header, sessionId, workspace, { comparablePath }) {
  return header?.type === "session_meta" && header.payload?.id === sessionId &&
    (header.payload.session_id == null || header.payload.session_id === sessionId) &&
    typeof header.payload.cwd === "string" && comparablePath(header.payload.cwd) === comparablePath(workspace);
}

function rolloutMatches(fd, sessionId, workspace, history) {
  return headerMatches(records(fd).next().value, sessionId, workspace, history);
}

// Re-read from offset zero so a descriptor retained before deletion includes late appends.
function readRollout(fd, sessionId, workspace, history) {
  const stream = records(fd);
  if (!headerMatches(stream.next().value, sessionId, workspace, history)) return null;
  const turns = new Map();
  for (const record of stream) {
    if (record?.type !== "event_msg") continue;
    const event = record.payload;
    if (event?.type === "thread_rolled_back" && Number.isSafeInteger(event.num_turns) && event.num_turns > 0) {
      for (const turnId of [...turns.keys()].slice(-event.num_turns)) turns.delete(turnId);
      continue;
    }
    if (!event || typeof event.turn_id !== "string" || !uuid.test(event.turn_id)) continue;
    if (event.type === "task_started" && !turns.has(event.turn_id)) turns.set(event.turn_id, { messages: [], final: null });
    const turn = turns.get(event.turn_id);
    if (!turn) continue;
    if (event.type === "task_complete" && turn.final && event.last_agent_message === turn.final.text) {
      turn.messages.push(turn.final);
      turn.final = null;
    }
    if (event.type !== "item_completed" || event.thread_id !== sessionId ||
        !Number.isSafeInteger(event.started_at_ms)) continue;
    const item = event.item;
    const user = item?.type === "UserMessage";
    if ((!user && !(item?.type === "AgentMessage" && item.phase === "final_answer")) ||
        typeof item.id !== "string" || !itemId.test(item.id) || !Array.isArray(item.content)) continue;
    const text = item.content.filter(block => block?.type === (user ? "text" : "Text") && typeof block.text === "string")
      .map(block => block.text).join("\n");
    const date = new Date(event.started_at_ms);
    if (!history.isVisibleCodexMessageText(text, user) || !Number.isFinite(date.getTime())) continue;
    const message = { id: item.id, turnId: event.turn_id, role: user ? "user" : "assistant", at: date.toISOString(), text };
    if (user) turn.messages.push(message);
    else turn.final = message;
  }
  return [...turns.values()].flatMap(turn => turn.messages);
}

module.exports = { openRollout, readRollout, rolloutMatches };

