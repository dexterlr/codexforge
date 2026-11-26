"use strict";

const assert = require("node:assert/strict");
const { execFileSync, spawn } = require("node:child_process");
const { once } = require("node:events");
const { randomUUID } = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");

const decision = "We decided to use SQLite for project memory.";
const success = "The SQLite integration tests passed.";
const failure = "The SQLite migration failed.";
const fabricated = "We decided to adopt the substituted rollout.";
const unrelated = "We decided to copy another chat.";

async function until(check) {
  const end = Date.now() + 20_000;
  while (!check()) {
    if (Date.now() >= end) throw new Error("Timed out waiting for the isolated capture worker.");
    await new Promise(resolve => setTimeout(resolve, 30));
  }
}

async function fixture() {
  require("./codexforge-brain-runtime.cjs");
  const workspace = process.cwd();
  const home = process.env.CODEX_HOME;
  const temp = path.dirname(workspace);
  assert.match(path.basename(temp), /^codexforge-immediate-delete-/u);
  assert.equal(path.dirname(temp), path.resolve(os.tmpdir()));
  assert.equal(home, path.join(temp, "home"));
  const brain = path.join(workspace, ".codexforge", "brain");
  if (process.argv[2] === "--recall") {
    const { readDevelopmentChatMemory } = require("@/lib/codexforge/brain/learning/development-chat.server");
    const { developmentChatStatus, result } = await readDevelopmentChatMemory();
    assert.equal(developmentChatStatus, "retained");
    assert.deepEqual(new Set(result.map(e => e.text)), new Set([decision, success, failure]));
    const choice = result.find(e => e.kind === "decision");
    for (const kind of ["worked", "did-not-work"]) assert.equal(result.find(e => e.kind === kind).relatedDecisionId, choice.id);
    return;
  }
  const { guardRollout } = require("./codexforge-brain-rollout-watch.cjs");
  const { createTables } = require("./smoke-codexforge-codex-chat-memory.cjs");
  const dir = path.join(home, "sessions", "2026", "11", "26");
  const release = path.join(workspace, "build", "Release");
  for (const folder of [dir, release, brain]) fs.mkdirSync(folder, { recursive: true });
  const binary = "codexforge_creator_filesystem.node";
  fs.copyFileSync(path.join(__dirname, "..", "build", "Release", binary), path.join(release, binary));
  const id = randomUUID(), other = randomUUID(), turn = randomUUID();
  const binding = path.join(brain, "development-chat.json");
  const writeBinding = threadId => fs.writeFileSync(binding, JSON.stringify({ version: 1, threadId }));
  const filename = key => path.join(dir, "rollout-2026-11-26T08-00-00-" + key + ".jsonl");
  const header = key => ({ type: "session_meta", payload: { id: key, session_id: key, cwd: workspace } });
  const event = payload => ({ type: "event_msg", payload });
  const started = event({ type: "task_started", turn_id: turn });
  let t = Date.UTC(2026, 10, 26);
  const visible = (key, text, assistant = false) => event({ type: "item_completed", thread_id: key, turn_id: turn,
    started_at_ms: ++t, item: { type: assistant ? "AgentMessage" : "UserMessage", id: randomUUID(),
      phase: assistant ? "final_answer" : undefined, content: [{ type: assistant ? "Text" : "text", text }] } });
  const jsonl = records => records.map(JSON.stringify).join("\n") + "\n";
  const state = new DatabaseSync(path.join(home, "state_5.sqlite"));
  const history = new DatabaseSync(path.join(home, "thread_history_1.sqlite"));
  let child;
  try {
    createTables(state, history);
    state.exec("ALTER TABLE threads ADD COLUMN rollout_path TEXT");
    const add = state.prepare("INSERT INTO threads (id, cwd, history_mode, rollout_path) VALUES (?,?,'paginated',?)");
    for (const key of [id, other]) {
      add.run(key, workspace, filename(key));
      fs.writeFileSync(filename(key), jsonl([header(key), started]));
    }
    writeBinding(id);
    if (process.argv[2] === "--live") {
      child = spawn(process.execPath, [path.join(__dirname, "codexforge-brain-worker.cjs")], {
        cwd: workspace, env: { ...process.env, NODE_ENV: "production", CODEXFORGE_BRAIN_SUPERVISOR_PID: String(process.pid) },
        stdio: ["ignore", "inherit", "inherit"], windowsHide: true,
      });
      const receipt = path.join(brain, "worker-status.json");
      await until(() => {
        assert.equal(child.exitCode, null, "Worker exited before arming the linked rollout.");
        if (!fs.existsSync(receipt)) return false;
        const status = JSON.parse(fs.readFileSync(receipt));
        return status.pid === child.pid && status.deletionGuard === true;
      });
    } else {
      assert.equal(guardRollout(id), true);
    }
    assert.equal(fs.existsSync(path.join(brain, "retained-chats")), false);

    // No event loop, SQL snapshot, hook or Next server between the append and both source removals.
    fs.appendFileSync(filename(id), jsonl([visible(id, decision), visible(other, unrelated), visible(id, success),
      visible(id, failure, true), event({ type: "task_complete", turn_id: turn, last_agent_message: failure })]));
    state.prepare("DELETE FROM threads WHERE id=?").run(id);
    fs.unlinkSync(filename(id));
    if (child) {
      await until(() => fs.existsSync(path.join(brain, "retained-chats", id, "pages-0", "1.json")));
      return;
    }
    // Fail the first publication after deletion. Retry must retain only the extracted evidence in memory.
    const archive = path.join(brain, "retained-chats");
    fs.writeFileSync(archive, "Temporarily unavailable", { flag: "wx" });
    assert.equal(guardRollout(id), false);
    fs.unlinkSync(archive);
    await until(() => {
      assert.equal(guardRollout(id), false);
      return fs.existsSync(path.join(archive, id));
    });

    // A new catalog row and a different file with an identical name/header must not replace the original.
    add.run(id, workspace, filename(id));
    fs.writeFileSync(filename(id), jsonl([header(id), started, visible(id, fabricated)]));
    assert.equal(guardRollout(id), false);
    state.prepare("DELETE FROM threads WHERE id=?").run(id);
    fs.unlinkSync(filename(id));
    assert.equal(guardRollout(id), false);

    // Revoking a binding ends access to any further previously bound records, even on a simultaneous unlink.
    writeBinding(other);
    assert.equal(guardRollout(other), true);
    fs.appendFileSync(filename(other), jsonl([visible(other, unrelated)]));
    state.prepare("DELETE FROM threads WHERE id=?").run(other);
    fs.unlinkSync(filename(other));
    fs.unlinkSync(binding);
    assert.equal(guardRollout(null), false);
    assert.equal(fs.existsSync(path.join(brain, "retained-chats", other)), false);
  } finally {
    if (child && child.exitCode === null && child.signalCode === null) {
      const exited = once(child, "exit");
      child.kill();
      await exited;
    }
    guardRollout(null);
    history.close();
    state.close();
  }
}

async function main() {
  if (process.argv.length > 2) return fixture();
  for (const action of ["--delete", "--live"]) {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), "codexforge-immediate-delete-"));
    try {
      const cwd = path.join(temp, "workspace");
      fs.mkdirSync(cwd);
      const env = { ...process.env, CODEX_HOME: path.join(temp, "home"), NODE_ENV: "test" };
      for (const key of Object.keys(env)) if (/^CODEXFORGE_(?:CREATOR|JARVIS_CHAT)_DETERMINISTIC_TEST_/u.test(key)) delete env[key];
      for (const step of [action, "--recall"]) {
        execFileSync(process.execPath, [__filename, step], { cwd, env, stdio: "inherit", windowsHide: true, timeout: 30_000 });
      }
    } finally {
      assert.equal(path.dirname(temp), path.resolve(os.tmpdir()));
      fs.rmSync(temp, { force: true, recursive: true });
    }
  }
  console.log("PASS immediate unlink before any callback, standalone worker readiness and recovery, fresh-process recall, replacement and disconnect isolation");
}

main().catch(error => { console.error(error); process.exitCode = 1; });
