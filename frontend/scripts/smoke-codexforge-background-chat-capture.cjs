"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const os = require("node:os");
const path = require("node:path");
const { randomUUID } = require("node:crypto");
const { DatabaseSync } = require("node:sqlite");
const ts = require("typescript");

const workspace = path.resolve(__dirname, "..");
const home = fs.mkdtempSync(path.join(os.tmpdir(), "brain-capture-test-"));
const thread = randomUUID();
const sibling = randomUUID();
let bound = thread;
let isolated = false;
let calls = 0;
let storageOK = true;
let updates = 0;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(condition, message, timeout = 4000) {
  const end = Date.now() + timeout;
  while (!condition() && Date.now() < end) await sleep(20);
  assert.ok(condition(), message);
}

process.env.CODEX_HOME = home;
process.env.NEXT_RUNTIME = "nodejs";
process.env.NODE_ENV = "development";
const load = Module._load;
Module._load = function(request, parent, ...rest) {
  if (request === "server-only") return {};
  if (request.startsWith("@/")) request = path.join(workspace, "src", request.slice(2));
  if (parent?.filename.endsWith("chat-capture.server.ts")) {
    if (request === "../../server-safe-paths") return { CODEXFORGE_PROJECT_ROOT: workspace };
    if (request.endsWith("jarvis-creator-runtime-identity.server")) return { resolveJarvisCreatorRuntimeIdentity: () => ({ testSuffix: isolated ? "isolated" : null }) };
    if (request === "./development-chat.server") return {
      boundThreadId: () => bound,
      readDevelopmentChatMemory: async () => {
        calls++;
        if (storageOK) updates++;
        return { developmentChatStatus: storageOK ? "connected" : "storage-error" };
      },
    };
  }
  return load.call(this, request, parent, ...rest);
};
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  module._compile(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    fileName: filename,
  }).outputText, filename);
};

const state = new DatabaseSync(path.join(home, "state_5.sqlite"));
const history = new DatabaseSync(path.join(home, "thread_history_1.sqlite"));
async function run() {
  state.exec("CREATE TABLE threads(id TEXT PRIMARY KEY, cwd TEXT, history_mode TEXT)");
  state.prepare("INSERT INTO threads VALUES (?,?, 'paginated')").run(thread, workspace);
  history.exec(`PRAGMA journal_mode = WAL;
    CREATE TABLE thread_turns(thread_id TEXT, turn_id TEXT, final_agent_item_id TEXT);
    CREATE TABLE thread_items(thread_id TEXT, turn_id TEXT, item_id TEXT, item_type TEXT, rollout_ordinal INTEGER, updated_at_ordinal INTEGER);`);
  const insertTurn = history.prepare("INSERT INTO thread_turns VALUES (?, 'turn', NULL)");
  const insertItem = history.prepare("INSERT INTO thread_items VALUES (?, 'turn', ?, ?, ?, ?)");
  insertTurn.run(thread);
  insertTurn.run(sibling);
  const { register } = require("../src/instrumentation.ts");
  process.env.NEXT_PHASE = "phase-production-build";
  await register();
  delete process.env.NEXT_PHASE;
  isolated = true;
  await register();
  await sleep(300);
  assert.equal(calls, 0, "Builds and isolated tests must never capture desktop history");
  isolated = false;
  await register();
  await register();
  await until(() => updates === 1, "Startup should backfill once per process");

  insertItem.run(sibling, randomUUID(), "userMessage", 1, 1);
  insertItem.run(thread, randomUUID(), "commandExecution", 2, 2);
  await sleep(350);
  assert.equal(calls, 1, "Other chats and tool activity must not trigger full capture");
  insertItem.run(thread, randomUUID(), "userMessage", 3, 3);
  await until(() => updates === 2, "New user input should be captured before an assistant reply");
  const finalId = randomUUID();
  insertItem.run(thread, finalId, "agentMessage", 4, 4);
  await sleep(300);
  assert.equal(calls, 2, "An uncommitted final should not trigger capture");
  storageOK = false;
  history.prepare("UPDATE thread_turns SET final_agent_item_id=? WHERE thread_id=?").run(finalId, thread);
  await until(() => calls >= 3, "Final reply should trigger capture");
  storageOK = true;
  await until(() => updates === 3, "Failed persistence should retry even without another database write", 17_000);
  bound = null;
  insertItem.run(thread, randomUUID(), "userMessage", 5, 5);
  await sleep(350);
  assert.equal(updates, 3, "Disconnect should stop capture");
  console.log("PASS browser-independent capture, runtime isolation, workspace scope, current prompt, final reply and failed-save retry");
}
run().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => {
  bound = null;
  history.close();
  state.close();
  assert.equal(path.dirname(home), path.resolve(os.tmpdir()));
  fs.rmSync(home, { recursive: true, force: true, maxRetries: 4, retryDelay: 100 });
});
