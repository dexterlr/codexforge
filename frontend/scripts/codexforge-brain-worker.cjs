"use strict";

require("./codexforge-brain-runtime.cjs");
const { randomUUID } = require("node:crypto");
const { startChatCapture } = require("@/lib/codexforge/brain/learning/chat-capture.server");
const { boundThreadId } = require("@/lib/codexforge/brain/learning/development-chat.server");
const { loadCreatorNativeFilesystem, openCreatorNativeRoot } = require("@/lib/codexforge/creator/creator-native-filesystem.server");
const { guardRollout } = require("./codexforge-brain-rollout-watch.cjs");

function followSupervisor(native, configuredPid) {
  if (configuredPid === undefined) return;
  const pid = Number(configuredPid);
  if (!Number.isSafeInteger(pid) || pid < 1 || String(pid) !== configuredPid || pid !== process.ppid) {
    throw new Error("The configured Brain supervisor must be the worker's parent process.");
  }
  const identity = native.getProcessIdentity(pid);
  // Task Scheduler can terminate its PowerShell action without terminating the Node child.
  // Compare process start identities as well as PIDs so a recycled PID cannot keep an orphan alive.
  setInterval(() => {
    try {
      if (native.getProcessIdentity(pid) === identity) return;
    } catch (error) {
      if (error.code !== "not_found") throw error;
    }
    try {
      // Drain a source that was deleted just as Task Scheduler stopped the wrapper.
      guardRollout(boundThreadId());
    } finally {
      process.exit(0);
    }
  }, 1000).unref();
}

let lastCaptureAt;
function recordProgress(deletionGuard, saved) {
  if (!saved && !lastCaptureAt) return;
  const at = saved ? new Date().toISOString() : lastCaptureAt;
  const root = openCreatorNativeRoot([".codexforge", "brain"], "persistent");
  try {
    const file = ["worker-status.json"];
    const temporary = `.worker-${randomUUID()}.tmp`;
    const bytes = Buffer.from(JSON.stringify({ version: 1, pid: process.pid, at, deletionGuard }));
    let previous;
    try {
      previous = root.readFile(file, 1024);
    } catch (error) {
      if (error.code !== "not_found") throw error;
    }
    if (previous) root.writeAtomicReplace(file, temporary, bytes, previous, null, null);
    else root.writeAtomicExclusive(file, temporary, bytes);
    lastCaptureAt = at;
  } finally {
    root.close();
  }
}

if (process.argv.length !== 2) throw new Error("The Brain worker takes no arguments. Its working directory selects the project.");
// Fail at startup so the supervisor can report a missing native build or SQLite runtime.
require("node:sqlite");
followSupervisor(loadCreatorNativeFilesystem(), process.env.CODEXFORGE_BRAIN_SUPERVISOR_PID);
if (!startChatCapture({ standalone: true, onPoll: guardRollout, onProgress: recordProgress })) {
  throw new Error("Brain capture is disabled in this runtime.");
}
