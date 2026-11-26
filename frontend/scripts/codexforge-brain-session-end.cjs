"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { stdin, stdout } = require("node:process");

const uuid = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/u;
const { openRollout, readRollout } = require("./codexforge-brain-rollout.cjs");

async function main(workspace = path.resolve(__dirname, "..")) {
  const chunks = [];
  let size = 0;
  for await (const chunk of stdin) {
    size += chunk.length;
    if (size > 32 * 1024) throw new Error("Invalid session event.");
    chunks.push(chunk);
  }
  const event = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  if (event?.hook_event_name !== "SessionEnd" || typeof event.session_id !== "string" || !uuid.test(event.session_id) ||
      typeof event.cwd !== "string" || !path.isAbsolute(event.cwd)) return;
  process.chdir(workspace);
  require("./codexforge-brain-runtime.cjs");
  const history = require("@/lib/codexforge/brain/learning/codex-history.server");
  if (history.comparablePath(event.cwd) !== history.comparablePath(fs.realpathSync.native(workspace))) return;
  const { resolveJarvisCreatorRuntimeIdentity } = require("@/lib/codexforge/jarvis-chat/jarvis-creator-runtime-identity.server");
  if (resolveJarvisCreatorRuntimeIdentity().testSuffix) return;
  const { boundThreadId } = require("@/lib/codexforge/brain/learning/development-chat.server");
  const id = event.session_id;
  if (boundThreadId() !== id) return;
  const home = process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
  const { extractCodexChatMemory } = require("@/lib/codexforge/brain/learning/project-learning");
  const { mergeRetainedChatMemory } = require("@/lib/codexforge/brain/learning/retained-chat-memory.server");
  function stillBound() {
    return boundThreadId() === id && history.comparablePath(event.cwd) === history.comparablePath(fs.realpathSync.native(workspace));
  }
  let messages;
  try { messages = history.readCodexHistory(home, id, workspace); } catch { /* Catalogs may be closing. */ }
  if (!stillBound()) return;
  if (messages) mergeRetainedChatMemory(id, extractCodexChatMemory(id, messages));
  let transcript;
  try {
    const fd = openRollout(event.transcript_path, home, id, history);
    if (fd !== null) {
      try { transcript = readRollout(fd, id, workspace, history); } finally { fs.closeSync(fd); }
    }
  } catch { /* A verified SQLite snapshot can still be used independently. */ }
  if (!messages && !transcript) throw new Error("No readable source for the linked chat.");
  if (transcript && stillBound()) {
    const seen = new Set((messages || []).map(message => message.role + ":" + message.id));
    const additional = transcript.filter(message => !seen.has(message.role + ":" + message.id));
    if (additional.length) {
      const combined = [...(messages || []), ...additional].sort((a, b) => a.at.localeCompare(b.at));
      mergeRetainedChatMemory(id, extractCodexChatMemory(id, combined));
    }
  }
}

module.exports = { main };
if (require.main === module) {
  main().then(() => stdout.write("{}\n")).catch(() => {
    console.error("CodexForge could not finish saving the linked chat at session end.");
    process.exitCode = 1;
  });
}
