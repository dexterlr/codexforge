"use strict";

const assert = require("node:assert/strict");
const { randomUUID } = require("node:crypto");
const fs = require("node:fs");
const Module = require("node:module");
const os = require("node:os");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");
const ts = require("typescript");

// Load the same server modules as Next. This process only opens disposable fixture databases.
const root = path.resolve(__dirname, "..");
const resolve = Module._resolveFilename;
Module._resolveFilename = function(request, ...args) {
  return resolve.call(this, request.startsWith("@/") ? path.join(root, "src", request.slice(2)) : request, ...args);
};
const load = Module._load;
Module._load = function(request, ...args) {
  return request === "server-only" ? {} : load.call(this, request, ...args);
};
require.extensions[".ts"] = function(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  module._compile(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    fileName: filename,
  }).outputText, filename);
};

const { readCodexHistory } = require("@/lib/codexforge/brain/learning/codex-history.server.ts");
const { extractCodexChatMemory } = require("@/lib/codexforge/brain/learning/project-learning.ts");

function createTables(state, history) {
  state.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE threads (
      id TEXT PRIMARY KEY, cwd TEXT NOT NULL, history_mode TEXT NOT NULL,
      archived INTEGER NOT NULL DEFAULT 0
    );
  `);
  history.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE thread_turns (
      thread_id TEXT NOT NULL, turn_id TEXT NOT NULL, rollout_ordinal INTEGER NOT NULL,
      final_agent_item_id TEXT, status TEXT NOT NULL, PRIMARY KEY(thread_id, turn_id)
    );
    CREATE TABLE thread_items (
      thread_id TEXT NOT NULL, turn_id TEXT NOT NULL, item_id TEXT NOT NULL,
      rollout_ordinal INTEGER NOT NULL, created_at_ms INTEGER NOT NULL, item_type TEXT NOT NULL,
      item_json TEXT NOT NULL, updated_at_ordinal INTEGER, PRIMARY KEY(thread_id, item_id)
    );
  `);
}

function test(codexHome, state, history) {
  createTables(state, history);
  const workspace = path.join(codexHome, "workspace");
  fs.mkdirSync(workspace);
  const thread = randomUUID();
  const other = randomUUID();
  const saveThread = state.prepare("INSERT INTO threads (id, cwd, history_mode) VALUES (?, ?, 'paginated')");
  saveThread.run(thread, workspace);
  saveThread.run(other, workspace);
  const insertTurn = history.prepare("INSERT INTO thread_turns VALUES (?, ?, ?, NULL, 'inProgress')");
  const insertItem = history.prepare("INSERT INTO thread_items VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  const completed = history.prepare("UPDATE thread_turns SET final_agent_item_id=?, status='completed' WHERE thread_id=? AND turn_id=?");
  const epoch = Date.UTC(2026, 10, 26, 10);
  function start(threadId, ordinal) {
    const turnId = randomUUID();
    insertTurn.run(threadId, turnId, ordinal);
    return { threadId, turnId };
  }
  function add(turn, ordinal, record) {
    const id = randomUUID();
    insertItem.run(turn.threadId, turn.turnId, id, ordinal, epoch + ordinal * 1000,
      record.type, JSON.stringify({ ...record, id }), ordinal);
    return id;
  }
  function user(turn, ordinal, text) {
    return add(turn, ordinal, { type: "userMessage", clientId: randomUUID(), content: [{ type: "text", text, text_elements: [] }] });
  }
  function final(turn, ordinal, text) {
    const id = add(turn, ordinal, { type: "agentMessage", phase: "final_answer", text });
    completed.run(id, turn.threadId, turn.turnId);
    return id;
  }
  const getMessages = () => readCodexHistory(codexHome, thread, workspace);
  const memories = () => extractCodexChatMemory(thread, getMessages() ?? []);
  const decision = "We decided to use SQLite.";
  const report = "The SQLite integration tests passed.";
  const failure = "The SQLite migration failed.";

  const one = start(thread, 1);
  const unrelated = start(other, 1);
  user(unrelated, 2, "We decided to use a different database.");
  // Insert the final response first to check that database insertion order never governs recall.
  final(one, 8, report);
  user(one, 2, decision);
  add(one, 3, { type: "agentMessage", phase: "commentary", text: "The unrelated test passed." });
  add(one, 4, { type: "commandExecution", aggregatedOutput: "Decision: Use command output." });
  add(one, 5, { type: "contextCompaction", text: "Decision: Use a generated summary." });
  add(one, 6, { type: "agentMessage", phase: "final_answer", text: "The superseded test passed." });
  user(one, 7, "<environment_context>\nWe decided to copy the environment.\n</environment_context>");
  assert.deepEqual(getMessages().map(message => message.text), [decision, report]);
  const initial = memories();
  const choice = initial.find(entry => entry.kind === "decision");
  assert(choice);
  assert.deepEqual(initial.map(entry => entry.kind), ["decision", "worked"]);
  assert.equal(initial[1].relatedDecisionId, choice.id);
  assert(initial.every(entry => entry.sourceType === "codex-chat" && entry.sourceId === thread));
  const duplicateMessages = getMessages().flatMap(message => [message, message]);
  assert.deepEqual(extractCodexChatMemory(thread, duplicateMessages), initial);
  console.log("PASS existing decision, final report, provenance, canonical ordering and isolation from sibling histories and tool events");

  const two = start(thread, 10);
  user(two, 11, failure);
  const updated = memories();
  assert.deepEqual(updated.slice(0, 2), initial);
  assert.equal(updated.length, 3);
  assert.equal(updated[2].kind, "did-not-work");
  assert.equal(updated[2].relatedDecisionId, choice.id);
  assert.deepEqual(memories(), updated);
  assert.equal(new Set(updated.map(entry => entry.id)).size, updated.length);
  final(two, 12, "I recommend using PostgreSQL. Maybe the SQLite tests passed.");
  const three = start(thread, 13);
  user(three, 14, "> We decided to keep the example.\n\n```\nThe sample test passed.\n```");
  final(three, 15, "For example, the deployment failed.");
  const four = start(thread, 16);
  const fakeCredential = "sk-" + "X".repeat(32);
  user(four, 17, "We decided to use " + fakeCredential + ".");
  assert.deepEqual(memories(), updated);
  assert.equal(fs.existsSync(path.join(workspace, "docs", "development", "project-memory.md")), false);
  console.log("PASS appended user outcome links to the decision, repeated reads are stable, and suggested, quoted or secret-bearing text stays out");

  assert.throws(() => readCodexHistory(codexHome, thread, path.dirname(workspace)));
  // Dropping a turn from retained history must also drop its projected memories.
  history.prepare("DELETE FROM thread_turns WHERE thread_id=? AND turn_id=?").run(thread, two.turnId);
  assert.deepEqual(memories(), initial, "Orphaned items from a reverted turn were remembered");
  history.prepare("DELETE FROM thread_items WHERE thread_id=? AND turn_id=?").run(thread, two.turnId);
  assert.deepEqual(memories(), initial);
  const five = start(thread, 20);
  user(five, 21, "Can you build offline recall?");
  final(five, 22, "TypeScript, storage integration tests, and browser checks passed. Two older checks still flag the graph loader.");
  const later = memories().slice(initial.length);
  assert.deepEqual(later.map(entry => entry.kind), ["decision", "worked", "did-not-work"]);
  assert(later.slice(1).every(entry => entry.relatedDecisionId === later[0].id));
  state.prepare("UPDATE threads SET history_mode='legacy' WHERE id=?").run(thread);
  assert.throws(getMessages);
  state.prepare("DELETE FROM threads WHERE id=?").run(thread);
  assert.deepEqual(memories(), []);
  assert.equal(getMessages(), null);
  assert.equal(readCodexHistory(codexHome, randomUUID(), workspace), null);
  const emptyHome = path.join(codexHome, "empty-home");
  fs.mkdirSync(emptyHome);
  assert.throws(() => readCodexHistory(emptyHome, thread, workspace));
  assert.deepEqual(fs.readdirSync(emptyHome), []);
  console.log("PASS workspace binding, removed turns, deleted chat, and absent chat");
}

const temp = fs.mkdtempSync(path.join(os.tmpdir(), "codexforge-chat-memory-"));
let state;
let history;
try {
  state = new DatabaseSync(path.join(temp, "state_5.sqlite"));
  history = new DatabaseSync(path.join(temp, "thread_history_1.sqlite"));
  test(temp, state, history);
} finally {
  history?.close();
  state?.close();
  assert.equal(path.dirname(temp), path.resolve(os.tmpdir()));
  fs.rmSync(temp, { recursive: true, force: true });
}
