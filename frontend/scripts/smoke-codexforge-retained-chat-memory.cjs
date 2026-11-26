"use strict";

const assert = require("node:assert/strict");
const { execFile } = require("node:child_process");
const { randomUUID } = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");
const { promisify } = require("node:util");
const { createTables } = require("./smoke-codexforge-codex-chat-memory.cjs");

const exec = promisify(execFile);
const binary = "codexforge_creator_filesystem.node";
const decision = "We decided to keep SQLite for our project.";
const success = "The SQLite integration tests passed.";
const failure = "The SQLite migration failed.";
const privateAside = "Unclassified conversation aside that must stay in Codex.";
const otherDecision = "We decided to change an unrelated project.";
const fakeCredential = "sk-" + "X".repeat(30);

function entriesInDirectory(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...entriesInDirectory(file));
    else if (entry.isFile()) files.push(file);
  }
  return files.sort();
}

// Each worker loads the real server module after starting with the disposable workspace as cwd.
async function worker(action, threadId, data) {
  const workspace = process.cwd();
  const fixture = path.dirname(workspace);
  assert.equal(path.dirname(fixture), path.resolve(os.tmpdir()));
  assert.match(path.basename(fixture), /^codexforge-retain-/);
  assert.equal(path.basename(workspace), "workspace");
  assert.equal(process.env.CODEX_HOME, path.join(fixture, "home"));
  const binding = path.join(workspace, ".codexforge", "brain", "development-chat.json");
  if (fs.existsSync(binding)) assert.equal(JSON.parse(fs.readFileSync(binding)).threadId, threadId);
  else assert.equal(action, "read");
  if (action === "read") {
    const { readDevelopmentChatMemory } = require("@/lib/codexforge/brain/learning/development-chat.server.ts");
    return readDevelopmentChatMemory();
  }
  assert(["merge", "batch"].includes(action));
  const { extractCodexChatMemory } = require("@/lib/codexforge/brain/learning/project-learning.ts");
  const { mergeRetainedChatMemory } = require("@/lib/codexforge/brain/learning/retained-chat-memory.server.ts");
  const messages = action === "batch" ? Array.from({ length: 145 }, (_, i) => ({
    id: randomUUID(), turnId: randomUUID(), at: "2026-11-26T13:00:00.000Z", role: "user", text: `We decided to test record ${i}.`,
  })) : JSON.parse(data);
  return mergeRetainedChatMemory(threadId, extractCodexChatMemory(threadId, messages));
}

async function test(fixture) {
  const workspace = path.join(fixture, "workspace");
  const home = path.join(fixture, "home");
  const brain = path.join(workspace, ".codexforge", "brain");
  const release = path.join(workspace, "build", "Release");
  for (const directory of [home, brain, release]) fs.mkdirSync(directory, { recursive: true });
  fs.copyFileSync(path.join(__dirname, "..", "build", "Release", binary), path.join(release, binary));
  const thread = randomUUID();
  const other = randomUUID();
  const binding = path.join(brain, "development-chat.json");
  fs.writeFileSync(binding, JSON.stringify({ version: 1, threadId: thread }));
  const env = { ...process.env, CODEX_HOME: home, NODE_ENV: "test" };
  for (const owner of ["JARVIS_CHAT", "CREATOR"]) {
    delete env[`CODEXFORGE_${owner}_DETERMINISTIC_TEST_MODE`];
    delete env[`CODEXFORGE_${owner}_DETERMINISTIC_TEST_SUFFIX`];
  }
  async function run(action = "read", data = []) {
    const { stdout } = await exec(process.execPath, [__filename, "--worker", action, thread, JSON.stringify(data)],
      { cwd: workspace, env, windowsHide: true, timeout: 60_000 });
    return JSON.parse(stdout);
  }
  const state = new DatabaseSync(path.join(home, "state_5.sqlite"));
  const history = new DatabaseSync(path.join(home, "thread_history_1.sqlite"));
  try {
    createTables(state, history);
    const addThread = state.prepare("INSERT INTO threads (id,cwd,history_mode) VALUES (?,?,'paginated')");
    for (const id of [thread, other]) addThread.run(id, workspace);
    const empty = await run();
    assert.equal(empty.developmentChatStatus, "connected");
    assert.deepEqual(empty.result, []);
    assert.deepEqual(entriesInDirectory(brain), [binding]);

    const turn = randomUUID();
    const siblingTurn = randomUUID();
    const addTurn = history.prepare("INSERT INTO thread_turns VALUES (?,?,1,NULL,'inProgress')");
    addTurn.run(thread, turn);
    addTurn.run(other, siblingTurn);
    const addItem = history.prepare("INSERT INTO thread_items VALUES (?,?,?,?,?,?,?,?)");
    function message(id, turnId, ordinal, text, assistant = false) {
      const itemId = randomUUID();
      const item = assistant
        ? { id: itemId, type: "agentMessage", phase: "final_answer", text }
        : { id: itemId, type: "userMessage", content: [{ type: "text", text }] };
      addItem.run(id, turnId, itemId, ordinal, Date.UTC(2026, 10, 26) + ordinal * 1000, item.type, JSON.stringify(item), ordinal);
      if (assistant) history.prepare("UPDATE thread_turns SET final_agent_item_id=?,status='completed' WHERE thread_id=? AND turn_id=?").run(itemId, id, turnId);
      return itemId;
    }
    message(other, siblingTurn, 1, otherDecision);
    message(thread, turn, 1, privateAside);
    message(thread, turn, 2, "We decided to store " + fakeCredential + ".");
    message(thread, turn, 3, decision);
    message(thread, turn, 4, success, true);
    const first = await run();
    assert.equal(first.developmentChatStatus, "connected");
    assert.deepEqual(new Set(first.result.map(entry => entry.text)), new Set([decision, success]));
    const choice = first.result.find(entry => entry.kind === "decision");
    assert.equal(first.result.find(entry => entry.kind === "worked").relatedDecisionId, choice.id);
    message(thread, turn, 5, failure);
    const both = await run();
    assert.equal(both.result.length, 3);
    assert.equal(both.result.find(entry => entry.kind === "did-not-work").relatedDecisionId, choice.id);
    assert.deepEqual((await run()).result, both.result);
    history.prepare("DELETE FROM thread_items WHERE thread_id=? AND rollout_ordinal=5").run(thread);
    assert.deepEqual((await run()).result, both.result, "A source rollback erased captured evidence");
    state.prepare("UPDATE threads SET history_mode='future-format' WHERE id=?").run(thread);
    const unavailable = await run();
    assert.equal(unavailable.developmentChatStatus, "retained");
    assert.deepEqual(unavailable.result, both.result);
    history.prepare("DELETE FROM thread_items WHERE thread_id=?").run(thread);
    history.prepare("DELETE FROM thread_turns WHERE thread_id=?").run(thread);
    state.prepare("DELETE FROM threads WHERE id=?").run(thread);
    const deleted = await run();
    assert.equal(deleted.developmentChatStatus, "retained");
    assert.deepEqual(deleted.result, both.result, "A new process lost evidence after the source chat was deleted");
    console.log("PASS decisions, positive and negative outcomes, provenance and links survive replay, rollback, unavailable source, deletion and process restart");

    const archived = entriesInDirectory(brain).filter(file => file !== binding);
    assert(archived.length, "No independent Brain data was written");
    for (const file of archived) {
      const bytes = fs.readFileSync(file);
      for (const forbidden of [privateAside, otherDecision, fakeCredential, other]) {
        assert(!bytes.includes(Buffer.from(forbidden)), "Archive contained unrelated chat data");
      }
    }
    const shared = { id: randomUUID(), turnId: randomUUID(), at: "2026-11-26T12:00:00.000Z", role: "user", text: "We decided to use bounded retries." };
    const distinct = Array.from({ length: 6 }, (_, i) => ({
      ...shared, id: randomUUID(), turnId: randomUUID(), text: `We decided to keep fixture decision ${i}.`,
    }));
    await Promise.all(distinct.map(item => run("merge", [shared, item])));
    const afterRace = (await run()).result;
    assert.deepEqual(new Set(afterRace.map(entry => entry.text)), new Set([decision, success, failure, shared.text, ...distinct.map(item => item.text)]));
    assert.equal(new Set(afterRace.map(entry => entry.id)).size, afterRace.length);
    const edit = { ...shared, text: "We decided to replace retries with a queue." };
    const editedOutcome = { ...edit, role: "assistant", id: randomUUID(), text: "The queue tests passed." };
    await run("merge", [edit, editedOutcome]);
    const revised = (await run()).result;
    assert.equal(revised.length, afterRace.length + 2);
    for (const original of afterRace) assert.deepEqual(revised.find(entry => entry.id === original.id), original);
    const revisedChoice = revised.find(entry => entry.text === edit.text);
    assert(revisedChoice);
    assert.equal(revised.find(entry => entry.text === editedOutcome.text).relatedDecisionId, revisedChoice.id);
    await run("merge", [edit, editedOutcome]);
    assert.deepEqual((await run()).result, revised, "Replaying an edited source duplicated previously captured records");
    const originalChoice = revised.find(entry => entry.text === shared.text);
    await run("merge", [shared, editedOutcome]);
    await run("merge", [edit, { ...editedOutcome, text: "The queue tests failed." }]);
    const amended = (await run()).result;
    assert.equal(amended.length, revised.length + 2);
    assert.deepEqual(new Set(amended.filter(entry => entry.text === editedOutcome.text).map(entry => entry.relatedDecisionId)),
      new Set([originalChoice.id, revisedChoice.id]));
    assert.equal(amended.find(entry => entry.text === "The queue tests failed.").kind, "did-not-work");
    console.log("PASS concurrent writers, immutable original evidence, stable edited evidence and its links, and exclusion of private and unrelated records");

    await run("batch");
    const paged = (await run()).result;
    assert.equal(paged.length, amended.length + 145);
    const [firstPage] = entriesInDirectory(brain).filter(file => path.basename(file) === "1.json");
    assert(firstPage);
    const heldPage = path.join(fixture, "held-page.json");
    fs.renameSync(firstPage, heldPage);
    assert.equal((await run()).developmentChatStatus, "storage-error");
    await assert.rejects(() => run("merge", [shared]));
    assert(!fs.existsSync(firstPage), "A writer filled a missing historical page");
    fs.renameSync(heldPage, firstPage);
    fs.unlinkSync(binding);
    const disconnected = await run();
    assert.equal(disconnected.developmentChatStatus, "retained");
    assert.deepEqual(disconnected.result, paged, "Disconnecting the source erased saved memories");
    const page = entriesInDirectory(brain)[0];
    const goodBytes = fs.readFileSync(page);
    fs.writeFileSync(page, Buffer.from("incomplete fixture page"));
    assert.equal((await run()).developmentChatStatus, "storage-error");
    fs.writeFileSync(page, goodBytes);
    assert.deepEqual((await run()).result, paged, "Restored storage was not recovered");
    console.log("PASS multi-page archive survives disconnect, reports storage errors and recovers after repair");
  } finally {
    history.close();
    state.close();
  }
}

async function main() {
  if (process.argv[2] === "--worker") {
    process.stdout.write(JSON.stringify(await worker(...process.argv.slice(3))));
    return;
  }
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "codexforge-retain-"));
  try {
    await test(fixture);
  } finally {
    assert.equal(path.dirname(fixture), path.resolve(os.tmpdir()));
    fs.rmSync(fixture, { recursive: true, force: true });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
