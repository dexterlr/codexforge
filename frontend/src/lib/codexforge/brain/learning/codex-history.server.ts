import "server-only";

import { createHash } from "node:crypto";
import { lstatSync, realpathSync } from "node:fs";
import path from "node:path";
import type { CodexLearningMessage } from "./project-learning";

// node:sqlite ships with the desktop Node runtime. The project's Node 20 type
// definitions predate this module; this is the read-only subset used here.
type SqlRow = Record<string, unknown>;
type SqliteReader = {
  exec(sql: string): void;
  prepare(sql: string): {
    get(...parameters: (string | number)[]): SqlRow | undefined;
    iterate(...parameters: (string | number)[]): Iterable<SqlRow>;
  };
  close(): void;
};
type SqliteModule = { DatabaseSync: new (filename: string, options: { readOnly: true }) => SqliteReader };

const THREAD_ID = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu;
const MAX_ITEM_BYTES = 256 * 1024;
const MAX_MESSAGE_BYTES = 64 * 1024;
const DESKTOP_ENVELOPE = /^\s*(?:<\/?(?:environment_context|turn_aborted|subagent_notification|permissions\b|collaboration_mode|system[-_]reminder|developer_message|system_message|INSTRUCTIONS)(?:[\s>])|# AGENTS\.md instructions for\b)/imu;

export function comparablePath(value: string): string {
  if (process.platform !== "win32") return path.resolve(value);
  const normal = value.replace(/^\\\\\?\\UNC\\/iu, "\\\\").replace(/^\\\\\?\\/u, "");
  return path.resolve(normal).toLowerCase();
}

export function databaseFile(home: string, fileName: "state_5.sqlite" | "thread_history_1.sqlite"): string {
  const absolute = path.join(home, fileName);
  for (const suffix of ["", "-wal", "-shm", "-journal"]) {
    const file = absolute + suffix;
    const info = lstatSync(file, { throwIfNoEntry: false });
    if (!info && suffix) continue;
    if (!info?.isFile() || info.nlink !== 1 || comparablePath(realpathSync.native(file)) !== comparablePath(file)) {
      throw new Error("The connected Codex history database is unavailable or has an unexpected file identity.");
    }
  }
  return absolute;
}

const VISIBLE_MESSAGES = `
  SELECT i.turn_id, i.item_id, i.created_at_ms, i.item_type,
    CASE i.item_type
      WHEN 'agentMessage' THEN json_extract(i.item_json, '$.text')
      ELSE (
        SELECT group_concat(json_extract(block.value, '$.text'), char(10) ORDER BY CAST(block.key AS INTEGER))
        FROM json_each(i.item_json, '$.content') AS block
        WHERE block.type = 'object' AND json_extract(block.value, '$.type') = 'text'
          AND json_type(block.value, '$.text') = 'text'
      )
    END AS message_text
  FROM thread_items AS i
  JOIN thread_turns AS t ON t.thread_id = i.thread_id AND t.turn_id = i.turn_id
  WHERE i.thread_id = ? AND i.item_type IN ('userMessage', 'agentMessage')
    AND octet_length(i.item_json) <= ?
    AND json_valid(i.item_json)
    AND json_extract(i.item_json, '$.id') = i.item_id
    AND json_extract(i.item_json, '$.type') = i.item_type
    AND (
      (i.item_type = 'userMessage' AND json_type(i.item_json, '$.content') = 'array')
      OR (i.item_type = 'agentMessage' AND i.item_id = t.final_agent_item_id
        AND json_extract(i.item_json, '$.phase') = 'final_answer')
    )
  ORDER BY i.rollout_ordinal
`;

function withThreadHistory<T>(codexHome: string, threadId: string, workspace: string, read: (history: SqliteReader) => T): T | null {
  if (!THREAD_ID.test(threadId) || !path.isAbsolute(codexHome) || !path.isAbsolute(workspace)) {
    throw new Error("The Codex chat connection is invalid.");
  }
  const home = realpathSync.native(codexHome);
  if (comparablePath(codexHome) !== comparablePath(home)) {
    throw new Error("The connected Codex home has an unexpected location.");
  }
  const sqlite = process.getBuiltinModule?.("node:sqlite") as SqliteModule | undefined;
  if (!sqlite) throw new Error("The local Node runtime cannot read Codex history.");
  const catalogue = new sqlite.DatabaseSync(databaseFile(home, "state_5.sqlite"), { readOnly: true });
  try {
    catalogue.exec("PRAGMA query_only = ON; PRAGMA trusted_schema = OFF;");
    const thread = catalogue.prepare("SELECT cwd, history_mode FROM threads WHERE id = ?").get(threadId);
    if (!thread) return null;
    if (typeof thread.cwd !== "string" || comparablePath(thread.cwd) !== comparablePath(realpathSync.native(workspace))) {
      throw new Error("The connected Codex chat belongs to a different workspace.");
    }
    if (thread.history_mode !== "paginated") throw new Error("The connected chat history format is unsupported.");

    const history = new sqlite.DatabaseSync(databaseFile(home, "thread_history_1.sqlite"), { readOnly: true });
    try {
      history.exec("PRAGMA query_only = ON; PRAGMA trusted_schema = OFF; BEGIN;");
      return read(history);
    } finally {
      history.close();
    }
  } finally {
    catalogue.close();
  }
}

/** Identify changes to possible source messages without opening transcripts, commentary or tool outputs. */
export function codexHistoryRevision(home: string, threadId: string, workspace: string): string | null {
  return withThreadHistory(home, threadId, workspace, history => {
    const digest = createHash("sha256").update(threadId);
    const items = history.prepare(`
      SELECT i.turn_id, i.item_id, i.rollout_ordinal, i.updated_at_ordinal
      FROM thread_items AS i
      JOIN thread_turns AS t ON t.thread_id = i.thread_id AND t.turn_id = i.turn_id
      WHERE i.thread_id = ? AND (i.item_type = 'userMessage' OR
        (i.item_type = 'agentMessage' AND i.item_id = t.final_agent_item_id))
      ORDER BY i.rollout_ordinal, i.item_id
    `);
    for (const item of items.iterate(threadId)) digest.update(JSON.stringify(item));
    return digest.digest("hex");
  });
}

export function isVisibleCodexMessageText(text: unknown, userMessage: boolean): text is string {
  return typeof text === "string" && !!text.trim() && Buffer.byteLength(text, "utf8") <= MAX_MESSAGE_BYTES &&
    !(userMessage && DESKTOP_ENVELOPE.test(text));
}

/** Read the retained visible history for one server-bound thread and workspace. */
export function readCodexHistory(codexHome: string, threadId: string, workspace: string): CodexLearningMessage[] | null {
  return withThreadHistory(codexHome, threadId, workspace, history => {
    const messages: CodexLearningMessage[] = [];
    for (const row of history.prepare(VISIBLE_MESSAGES).iterate(threadId, MAX_ITEM_BYTES)) {
      if (!isVisibleCodexMessageText(row.message_text, row.item_type === "userMessage")) continue;
      if (typeof row.item_id !== "string" || typeof row.turn_id !== "string" ||
        typeof row.created_at_ms !== "number" || !Number.isSafeInteger(row.created_at_ms)) continue;
      const date = new Date(row.created_at_ms);
      if (!Number.isFinite(date.getTime())) continue;
      messages.push({
        id: row.item_id, turnId: row.turn_id, role: row.item_type === "userMessage" ? "user" : "assistant",
        at: date.toISOString(), text: row.message_text,
      });
    }
    return messages;
  });
}
