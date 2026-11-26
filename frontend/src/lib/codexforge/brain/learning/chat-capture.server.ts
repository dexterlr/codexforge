import "server-only";

import { watch, type FSWatcher } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { resolveJarvisCreatorRuntimeIdentity } from "../../jarvis-chat/jarvis-creator-runtime-identity.server";
import { CODEXFORGE_PROJECT_ROOT } from "../../server-safe-paths";
import { codexHistoryRevision } from "./codex-history.server";
import { boundThreadId, readDevelopmentChatMemory } from "./development-chat.server";

const workerKey = Symbol.for("codexforge.brain.linked-chat-capture.v1");
const historyFiles = new Set(["thread_history_1.sqlite", "thread_history_1.sqlite-wal", "state_5.sqlite", "state_5.sqlite-wal"]);

// Next can load instrumentation more than once during development. Keep one observer per process.
export function startChatCapture(options: {
  standalone?: boolean;
  onPoll?: (threadId: string | null) => boolean;
  onProgress?: (deletionGuard: boolean, saved: boolean) => void;
} = {}): boolean {
  if (process.env.NODE_ENV === "test" || process.env.NEXT_PHASE === "phase-production-build") return false;
  const host = globalThis as typeof globalThis & { [workerKey]?: true };
  if (host[workerKey]) return true;
  try {
    if (resolveJarvisCreatorRuntimeIdentity().testSuffix) return false;
  } catch {
    return false;
  }
  host[workerKey] = true;
  const home = process.env.CODEX_HOME || path.join(homedir(), ".codex");
  let lastSaved: string | null = null;
  let watcher: FSWatcher | undefined;
  let timer: NodeJS.Timeout | undefined;
  let running = false;
  let changedDuringCapture = false;
  let deletionGuard = false;
  let reportedGuard = false;

  function reportGuard(ready: boolean) {
    deletionGuard = ready;
    if (reportedGuard !== ready) {
      try {
        options.onProgress?.(ready, false);
        reportedGuard = ready;
      } catch {
        // Retry the status receipt on the next check. An archive save can still succeed.
      }
    }
  }

  function refreshGuard(threadId: string | null) {
    let ready = false;
    try {
      ready = options.onPoll?.(threadId) ?? false;
    } catch {
      // Ordinary SQLite capture also works when the extra deletion guard is unavailable.
    }
    reportGuard(ready);
  }

  // Leading-edge debounce: continuous writes from a busy Codex session cannot postpone capture indefinitely.
  function schedule() {
    if (running) {
      changedDuringCapture = true;
      return;
    }
    if (!timer) timer = setTimeout(capture, options.standalone ? 0 : 100).unref();
  }

  async function capture() {
    timer = undefined;
    running = true;
    try {
      let threadId: string | null;
      try {
        threadId = boundThreadId();
      } catch (error) {
        // A transient read error is not an explicit disconnect; keep the already verified handle.
        reportGuard(false);
        throw error;
      }
      refreshGuard(threadId);
      if (!threadId) {
        watcher?.close();
        watcher = undefined;
        lastSaved = null;
        return;
      }
      if (!watcher) {
        try {
          watcher = watch(home, { persistent: false }, (_, name) => {
            if (name === null || historyFiles.has(name)) schedule();
          });
          watcher.once("error", () => {
            watcher?.close();
            watcher = undefined;
          });
        } catch {
          // Filesystem notifications are optional; the interval also handles replaced databases.
        }
      }
      const revision = codexHistoryRevision(home, threadId, CODEXFORGE_PROJECT_ROOT);
      if (revision === null || revision === lastSaved) return;
      const feed = await readDevelopmentChatMemory();
      if (feed.developmentChatStatus === "connected") {
        options.onProgress?.(deletionGuard, true);
        lastSaved = revision;
      }
    } catch {
      // A short-lived lock, unavailable source, or failed save is retried without disrupting the app.
    } finally {
      running = false;
      if (changedDuringCapture) {
        changedDuringCapture = false;
        schedule();
      }
    }
  }

  const poll = setInterval(schedule, 15_000);
  if (options.standalone) {
    // Keep this process alive across idle periods, missed notifications and binding changes.
    void capture();
  } else {
    poll.unref();
    schedule();
  }
  return true;
}
