"use strict";

const assert = require("node:assert/strict");
const { spawn, execFile } = require("node:child_process");
const { randomUUID } = require("node:crypto");
const { once } = require("node:events");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");
const { setTimeout: sleep } = require("node:timers/promises");
const { promisify } = require("node:util");
const { createTables } = require("./smoke-codexforge-codex-chat-memory.cjs");

async function supervisorTest({ workspace, env, receipt, binary }) {
  // Keep the driver's loaded DLL outside the disposable directory so Windows can remove it.
  const native = require(path.join(__dirname, "..", binary));
  const launcher = spawn(process.execPath, [__filename, "--supervise"], {
    cwd: workspace, env, windowsHide: true, stdio: ["ignore", "ignore", "inherit", "ipc"],
  });
  const closed = once(launcher, "close");
  let workerPid, identity;
  function sameWorker() {
    try {
      return native.getProcessIdentity(workerPid) === identity;
    } catch (error) {
      if (error.code === "not_found") return false;
      throw error;
    }
  }
  try {
    [workerPid] = await once(launcher, "message", { signal: AbortSignal.timeout(10_000) });
    identity = native.getProcessIdentity(workerPid);
    const deadline = Date.now() + 10_000;
    while (JSON.parse(fs.readFileSync(receipt)).pid !== workerPid) {
      assert(sameWorker() && Date.now() < deadline, "Supervised worker did not start");
      await sleep(25);
    }
    launcher.kill();
    await closed;
    const timeLimit = Date.now() + 5000;
    while (sameWorker() && Date.now() < timeLimit) await sleep(25);
    assert(!sameWorker(), "Stopping the supervisor left its Brain worker running");
    console.log("PASS terminating the supervisor also stops its exact worker");
  } finally {
    if (launcher.exitCode === null && !launcher.killed) launcher.kill();
    await closed;
    if (identity && sameWorker()) process.kill(workerPid);
  }
}

async function fixtureTest(fixture) {
  const workspace = path.join(fixture, "workspace");
  const home = path.join(fixture, "home");
  const brain = path.join(workspace, ".codexforge", "brain");
  const thread = randomUUID();
  const sibling = randomUUID();
  const archive = path.join(brain, "retained-chats", thread, "pages-0");
  const receipt = path.join(brain, "worker-status.json");
  const binary = path.join("build", "Release", "codexforge_creator_filesystem.node");
  for (const dir of [home, brain, path.dirname(path.join(workspace, binary))]) fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(path.join(__dirname, "..", binary), path.join(workspace, binary));
  fs.writeFileSync(path.join(brain, "development-chat.json"), JSON.stringify({ version: 1, threadId: thread }));
  const env = { ...process.env, CODEX_HOME: home, NODE_ENV: "production" };
  delete env.NEXT_PHASE;
  delete env.CODEXFORGE_BRAIN_SUPERVISOR_PID;
  for (const owner of ["JARVIS_CHAT", "CREATOR"]) {
    delete env[`CODEXFORGE_${owner}_DETERMINISTIC_TEST_MODE`];
    delete env[`CODEXFORGE_${owner}_DETERMINISTIC_TEST_SUFFIX`];
  }

  const state = new DatabaseSync(path.join(home, "state_5.sqlite"));
  const history = new DatabaseSync(path.join(home, "thread_history_1.sqlite"));
  let child, finished, exited = false, stderr = "";
  async function until(predicate, label) {
    const until = Date.now() + 15_000;
    while (Date.now() < until) {
      assert(!exited, `The independent worker exited: ${stderr}`);
      if (predicate()) return;
      await sleep(25);
    }
    assert.fail(label);
  }
  function readArchive() {
    if (!fs.existsSync(archive)) return [];
    return fs.readdirSync(archive).filter(name => /^\d+\.json$/.test(name))
      .flatMap(name => JSON.parse(fs.readFileSync(path.join(archive, name), "utf8")).entries);
  }
  try {
    createTables(state, history);
    const addThread = state.prepare("INSERT INTO threads (id,cwd,history_mode) VALUES (?,?,'paginated')");
    const addTurn = history.prepare("INSERT INTO thread_turns VALUES (?,?,1,NULL,'inProgress')");
    const turn = randomUUID();
    for (const id of [thread, sibling]) {
      addThread.run(id, workspace);
      addTurn.run(id, turn);
    }
    child = spawn(process.execPath, [path.join(__dirname, "codexforge-brain-worker.cjs")], {
      cwd: workspace, env, windowsHide: true, stdio: ["ignore", "ignore", "pipe"],
    });
    child.stderr.on("data", chunk => { stderr += chunk.toString(); });
    finished = new Promise(resolve => {
      child.on("error", error => { stderr += error.message; });
      child.once("close", () => { exited = true; resolve(); });
    });
    await until(() => fs.existsSync(receipt), "Worker never acknowledged its initial archive pass");
    const initial = JSON.parse(fs.readFileSync(receipt));
    assert.deepEqual(Object.keys(initial).sort(), ["at", "deletionGuard", "pid", "version"]);
    assert.equal(initial.deletionGuard, false, "A workspace without a rollout must not claim deletion protection");
    assert.equal(initial.pid, child.pid);
    assert.equal(initial.version, 1);
    assert.equal(initial.at, new Date(initial.at).toISOString());

    const decision = "We decided to keep SQLite for the project.";
    const success = "The SQLite migration tests passed.";
    const failure = "The SQLite migration failed on older files.";
    const insertItem = history.prepare("INSERT INTO thread_items VALUES (?,?,?,?,?,?,?,?)");
    function message(id, pos, text, final = false) {
      const itemId = randomUUID();
      const item = final ? { type: "agentMessage", phase: "final_answer", text } :
        { type: "userMessage", content: [{ type: "text", text }] };
      insertItem.run(id, turn, itemId, pos, Date.now() + pos, item.type, JSON.stringify({ ...item, id: itemId }), pos);
      return itemId;
    }
    message(sibling, 1, "We decided to use a different project.");
    message(thread, 1, decision);
    await until(() => readArchive().length === 1, "A decision in progress did not reach disk with the server off");
    await until(() => {
      const updated = JSON.parse(fs.readFileSync(receipt));
      return updated.pid === child.pid && updated.at > initial.at;
    }, "The worker did not advance its last confirmed capture time");
    const finalId = message(thread, 2, success, true);
    history.prepare("UPDATE thread_turns SET final_agent_item_id=?,status='completed' WHERE thread_id=? AND turn_id=?")
      .run(finalId, thread, turn);
    message(thread, 3, failure);
    await until(() => readArchive().length === 3, "The worker did not save both outcomes");
    const expected = readArchive().sort((a, b) => a.at.localeCompare(b.at) || a.id.localeCompare(b.id));
    assert.deepEqual(expected.map(entry => entry.text), [decision, success, failure]);
    assert.deepEqual(expected.map(entry => entry.kind), ["decision", "worked", "did-not-work"]);
    assert.deepEqual(expected.slice(1).map(entry => entry.relatedDecisionId), [expected[0].id, expected[0].id]);
    assert.deepEqual(fs.readdirSync(path.dirname(path.dirname(archive))), [thread]);

    // Delete this disposable source without ever starting Next or requesting the memory feed.
    state.prepare("DELETE FROM threads WHERE id=?").run(thread);
    history.prepare("DELETE FROM thread_items WHERE thread_id=?").run(thread);
    history.prepare("DELETE FROM thread_turns WHERE thread_id=?").run(thread);
    child.kill();
    await finished;
    const { stdout } = await promisify(execFile)(process.execPath, [__filename, "--recall"], { cwd: workspace, env, windowsHide: true, timeout: 15_000 });
    const feed = JSON.parse(stdout);
    assert.equal(feed.developmentChatStatus, "retained");
    assert.deepEqual(feed.result, expected);
    console.log("PASS standalone worker saved a decision and linked success and failure without Next or an API read; fresh recall after deletion returned the identical records");
    // A newly supervised instance can reconnect and must exit when its launcher is terminated.
    addThread.run(thread, workspace);
    await supervisorTest({ workspace, env, receipt, binary });
  } finally {
    if (child && !exited) { child.kill(); await finished; }
    history.close();
    state.close();
  }
}

async function main() {
  if (process.argv[2] === "--recall" || process.argv[2] === "--supervise") {
    const fixture = path.dirname(process.cwd());
    assert.equal(path.dirname(fixture), path.resolve(os.tmpdir()));
    assert.match(path.basename(fixture), /^codexforge-offline-/);
    assert.equal(process.env.CODEX_HOME, path.join(fixture, "home"));
    if (process.argv[2] === "--supervise") {
      const worker = spawn(process.execPath, [path.join(__dirname, "codexforge-brain-worker.cjs")], {
        env: { ...process.env, CODEXFORGE_BRAIN_SUPERVISOR_PID: String(process.pid) },
        windowsHide: true, stdio: "ignore",
      });
      process.send(worker.pid);
      return;
    }
    const { readDevelopmentChatMemory } = require("@/lib/codexforge/brain/learning/development-chat.server");
    process.stdout.write(JSON.stringify(await readDevelopmentChatMemory()));
    return;
  }
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "codexforge-offline-"));
  try {
    await fixtureTest(fixture);
  } finally {
    assert.equal(path.dirname(fixture), path.resolve(os.tmpdir()));
    fs.rmSync(fixture, { recursive: true, force: true, maxRetries: 4, retryDelay: 100 });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
