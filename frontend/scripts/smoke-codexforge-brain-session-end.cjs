"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { randomUUID } = require("node:crypto");
const { spawnSync } = require("node:child_process");
const { DatabaseSync } = require("node:sqlite");
const { createTables } = require("./smoke-codexforge-codex-chat-memory.cjs");

const temp = fs.mkdtempSync(path.join(os.tmpdir(), "codexforge-session-end-"));
const workspace = path.join(temp, "workspace");
const home = path.join(temp, "home");
const brain = path.join(workspace, ".codexforge", "brain");
const release = path.join(workspace, "build", "Release");
const directory = path.join(home, "sessions", "2026", "11", "26");
const binary = "codexforge_creator_filesystem.node";
const id = randomUUID();
const other = randomUUID();
const turn = randomUUID();
const decision = "We decided to use SQLite for this project.";
const worked = "The SQLite integration tests passed.";
const failed = "The SQLite migration failed.";
const transcript = path.join(directory, "rollout-2026-11-26T08-00-00-" + id + ".jsonl");
const event = { hook_event_name: "SessionEnd", session_id: id, cwd: workspace, transcript_path: transcript, reason: "other" };
const filename = path.join(__dirname, "codexforge-brain-session-end.cjs");
const setup = "require(process.argv[1]).main(process.cwd()).catch(() => { process.exitCode = 1 })";
const env = { ...process.env, CODEX_HOME: home, NODE_ENV: "test" };
for (const key of Object.keys(env)) {
  if (/^CODEXFORGE_(?:CREATOR|JARVIS_CHAT)_DETERMINISTIC_TEST_/u.test(key)) delete env[key];
}
const captured = path.join(brain, "retained-chats", id, "pages-0");
const entries = () => fs.readdirSync(captured).flatMap(file => JSON.parse(fs.readFileSync(path.join(captured, file))).entries);

function run(input, expected = 0) {
  const start = performance.now();
  const child = spawnSync(process.execPath, ["-e", setup, filename], {
    cwd: workspace, env, windowsHide: true, input: JSON.stringify(input), encoding: "utf8", timeout: 3000,
  });
  assert.ifError(child.error);
  assert.equal(child.status, expected, child.stderr);
  assert.equal(child.stdout, "");
  return Math.round(performance.now() - start);
}

function smoke() {
  for (const dirname of [brain, directory, release]) fs.mkdirSync(dirname, { recursive: true });
  fs.copyFileSync(path.join(__dirname, "..", "build", "Release", binary), path.join(release, binary));
  fs.writeFileSync(path.join(brain, "development-chat.json"), JSON.stringify({ version: 1, threadId: id }));
  const header = { type: "session_meta", payload: { id, session_id: id, cwd: workspace, history_mode: "paginated" } };
  const started = { type: "event_msg", payload: { type: "task_started", turn_id: turn } };
  let ordinal = 0;
  const visible = (text, type = "UserMessage", phase = undefined) => ({
    type: "event_msg", payload: {
      type: "item_completed", thread_id: id, turn_id: turn, started_at_ms: Date.UTC(2026, 10, 26, 8) + ordinal++ * 1000,
      item: { type, id: randomUUID(), phase, content: [{ type: type === "AgentMessage" ? "Text" : "text", text }] },
    },
  });
  const first = visible(decision);
  const success = visible(worked);
  const failure = visible(failed, "AgentMessage", "final_answer");
  const tool = { type: "event_msg", payload: { type: "item_completed", thread_id: id, turn_id: turn,
    item: { type: "CommandExecution", output: "We decided to copy tool logs." } } };
  const otherThread = visible("We decided to copy another chat.");
  otherThread.payload.thread_id = other;
  const done = { type: "event_msg", payload: { type: "task_complete", turn_id: turn, last_agent_message: failed } };
  const irrelevant = "The operator mentioned a personal aside.";
  const lines = [header, started, first, success, visible(irrelevant), tool, otherThread,
    { type: "response_item", payload: { role: "user", type: "message", content: [{ text: "We decided to trust internal envelopes." }] } },
    { type: "event_msg", payload: { type: "item_completed", item: { type: "CommandExecution", output: "z".repeat(5 * 1024 * 1024) } } },
    visible("We decided to share the other code.\n<environment_context>"),
    visible("The scope tests failed.", "AgentMessage", "commentary"),
    visible("The earlier output tests failed.", "AgentMessage", "final_answer"), failure, done];
  const writeTranscript = records => fs.writeFileSync(transcript, records.map(record => JSON.stringify(record)).join("\n") + "\n");
  writeTranscript(lines);
  run({ ...event, session_id: other });
  run({ ...event, cwd: temp });
  run({ ...event, hook_event_name: "Stop" });
  assert(!fs.existsSync(captured), "An out-of-scope session wrote memories");
  const badHeader = { ...header, payload: { ...header.payload, cwd: temp } };
  writeTranscript([badHeader, ...lines.slice(1)]);
  run(event, 1);
  assert(!fs.existsSync(captured), "Mismatched transcript metadata was accepted");
  writeTranscript(lines);
  run({ ...event, transcript_path: path.join(temp, path.basename(transcript)) }, 1);
  const state = new DatabaseSync(path.join(home, "state_5.sqlite"));
  const history = new DatabaseSync(path.join(home, "thread_history_1.sqlite"));
  try {
    createTables(state, history);
    state.prepare("INSERT INTO threads(id,cwd,history_mode) VALUES (?,?,'paginated')").run(id, workspace);
    history.prepare("INSERT INTO thread_turns VALUES (?,?,1,NULL,'inProgress')").run(id, turn);
    const { item, started_at_ms: at } = first.payload;
    history.prepare("INSERT INTO thread_items VALUES (?,?,?,1,?,?,?,1)").run(id, turn, item.id, at, "userMessage",
      JSON.stringify({ type: "userMessage", id: item.id, content: [{ type: "text", text: decision }] }));
    const databaseMs = run({ ...event, transcript_path: null });
    assert.deepEqual(entries().map(entry => entry.text), [decision]);
    // Simulate a pruning race in which the catalogue still exists but the last two messages only exist in the hook transcript.
    fs.appendFileSync(transcript, '{"type":"event_msg","payload":');
    const partialMs = run(event);
    const saved = entries();
    assert.deepEqual(saved.map(entry => entry.text), [decision, worked, failed]);
    assert.equal(saved[0].id, "codex-chat:" + id + ":user:" + item.id + ":0");
    assert.equal(saved[2].id, "codex-chat:" + id + ":assistant:" + failure.payload.item.id + ":0");
    assert.equal(saved[2].at, new Date(failure.payload.started_at_ms).toISOString());
    assert.equal(saved[1].relatedDecisionId, saved[0].id);
    assert.equal(saved[2].relatedDecisionId, saved[0].id);
    state.prepare("DELETE FROM threads WHERE id=?").run(id);
    // A new message remains in the rollout even though its catalogue record has already gone.
    const last = visible("We decided to keep snapshots of SQLite.");
    last.payload.turn_id = randomUUID();
    const nextTurn = { type: "event_msg", payload: { type: "task_started", turn_id: last.payload.turn_id } };
    fs.writeFileSync(transcript, [...lines, nextTurn, last].map(record => JSON.stringify(record)).join("\n"));
    const fallbackMs = run(event);
    const afterDeletion = entries();
    assert.deepEqual(afterDeletion.slice(0, saved.length), saved);
    assert.equal(afterDeletion.length, saved.length + 1);
    assert.equal(afterDeletion.at(-1).text, last.payload.item.content[0].text);
    run(event);
    assert.deepEqual(entries(), afterDeletion);
    fs.unlinkSync(transcript);
    assert.deepEqual(entries(), afterDeletion);
    console.log("PASS SessionEnd without the web server, exact workspace and thread checks, transcript-only fallback, linked outcomes and idempotency");
    console.log("Cold process ms: SQLite " + databaseMs + ", partial SQLite and 5 MiB transcript " + partialMs + ", transcript alone " + fallbackMs);
  } finally {
    history.close();
    state.close();
  }
}

try { smoke(); } finally {
  assert.equal(path.dirname(temp), path.resolve(os.tmpdir()));
  assert(path.basename(temp).startsWith("codexforge-session-end-"));
  fs.rmSync(temp, { recursive: true, force: true });
}
