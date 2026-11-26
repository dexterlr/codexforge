"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");
const history = require("@/lib/codexforge/brain/learning/codex-history.server");
const { boundThreadId } = require("@/lib/codexforge/brain/learning/development-chat.server");
const { extractCodexChatMemory } = require("@/lib/codexforge/brain/learning/project-learning");
const { mergeRetainedChatMemory } = require("@/lib/codexforge/brain/learning/retained-chat-memory.server");
const { CODEXFORGE_PROJECT_ROOT } = require("@/lib/codexforge/server-safe-paths");
const { openRollout, readRollout, rolloutMatches } = require("./codexforge-brain-rollout.cjs");

const home = process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
const workspace = CODEXFORGE_PROJECT_ROOT;
let bound = null;
let held = null;
let retired = null;
let pending = null;
let retryAt = 0;

function catalogRollout(threadId) {
  if (!path.isAbsolute(home) || history.comparablePath(fs.realpathSync.native(home)) !== history.comparablePath(home)) {
    throw new Error("Unexpected Codex home.");
  }
  const db = new DatabaseSync(history.databaseFile(home, "state_5.sqlite"), { readOnly: true });
  try {
    db.exec("PRAGMA query_only = ON; PRAGMA trusted_schema = OFF;");
    const row = db.prepare("SELECT cwd, history_mode, rollout_path FROM threads WHERE id=?").get(threadId);
    if (!row) return null;
    if (row.history_mode !== "paginated" || typeof row.cwd !== "string" ||
        history.comparablePath(row.cwd) !== history.comparablePath(fs.realpathSync.native(workspace)) ||
        typeof row.rollout_path !== "string") return undefined;
    return row.rollout_path;
  } finally {
    db.close();
  }
}

function sameFile(a, b) {
  return b?.isFile() && b.nlink === 1n && a.dev === b.dev && a.ino === b.ino;
}

function namedFile(filename) {
  try {
    return fs.lstatSync(filename, { bigint: true });
  } catch {
    // Windows may report access denied for a name pending deletion while the descriptor remains readable.
    return null;
  }
}

function closeHeld() {
  if (held) fs.closeSync(held.fd);
  held = null;
}

function drainHeld() {
  // The descriptor was acquired while the catalog and header agreed about both thread and workspace.
  // It still names the original file if Codex removed it before our first filesystem notification.
  retired = { filename: held.filename, identity: held.identity };
  if (fs.fstatSync(held.fd, { bigint: true }).nlink > 1n) {
    closeHeld();
    return;
  }
  const messages = readRollout(held.fd, bound, workspace, history);
  if (messages !== null) pending = extractCodexChatMemory(bound, messages);
  closeHeld();
}

/** Called only by the standalone worker. Keep at most one shared-delete, read-only handle. */
function guardRollout(threadId) {
  if (bound !== threadId) {
    closeHeld();
    pending = null;
    retired = null;
    retryAt = 0;
    bound = threadId;
  }
  if (!bound || boundThreadId() !== bound) return false;
  if (Date.now() < retryAt) return false;
  let filename;
  try {
    filename = catalogRollout(bound);
  } catch {
    // A catalog lock should leave a healthy handle alone. A disappeared path can already be drained.
    if (!held && !pending) return false;
    if (held && sameFile(held.identity, namedFile(held.filename))) return true;
    filename = null;
  }

  if (filename === undefined) {
    // The still-existing catalog entry has changed workspace or format.
    closeHeld();
    pending = null;
    return false;
  }
  const named = filename && namedFile(filename);
  if (held && filename && history.comparablePath(filename) === history.comparablePath(held.filename) &&
      sameFile(held.identity, named)) return true;
  try {
    if (held) drainHeld();
    if (pending) {
      if (boundThreadId() !== bound) return false;
      if (pending.length) mergeRetainedChatMemory(bound, pending);
      pending = null;
    }
    if (!filename || !named) return false;
    // Never adopt a different file substituted at the previously authenticated pathname.
    if (retired && history.comparablePath(retired.filename) === history.comparablePath(filename) &&
        !sameFile(retired.identity, named)) return false;
    const fd = openRollout(filename, home, bound, history);
    if (fd === null) return false;
    let keep = false;
    try {
      const identity = fs.fstatSync(fd, { bigint: true });
      if (identity.dev !== named.dev || identity.ino !== named.ino) return false;
      if (!rolloutMatches(fd, bound, workspace, history) || boundThreadId() !== bound) return false;
      held = { filename, fd, identity };
      keep = true;
      return true;
    } finally {
      if (!keep) fs.closeSync(fd);
    }
  } catch {
    // Keep the verified handle on a read failure or only the filtered entries after a failed save.
    // SQL/WAL events and the worker's periodic check both retry without creating extra handles.
    retryAt = Date.now() + 1000;
    return false;
  }
}

module.exports = { guardRollout };
