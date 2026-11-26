"use strict";

const assert = require("node:assert/strict");
const { randomUUID } = require("node:crypto");
const fs = require("node:fs");
const net = require("node:net");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const suffix = "brain-learning-" + randomUUID().slice(0, 12);
const testRoots = ["private-alpha-tests", "creator-tests"].map(name => path.join(root, ".codexforge", name, suffix));
assert(testRoots.every(dir => !fs.existsSync(dir)));
process.env.NODE_ENV = "test";
for (const owner of ["JARVIS_CHAT", "CREATOR"]) {
  process.env[`CODEXFORGE_${owner}_DETERMINISTIC_TEST_MODE`] = "1";
  process.env[`CODEXFORGE_${owner}_DETERMINISTIC_TEST_SUFFIX`] = suffix;
}

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

const { GET } = require("@/app/api/codexforge/brain/learning/route.ts");
const { getJarvisChatRuntimeService } = require("@/lib/codexforge/jarvis-chat/jarvis-chat-runtime.server.ts");
const { extractConversationMemory, recallProjectMemory } = require("@/lib/codexforge/brain/learning/project-learning.ts");
const { parseProjectNoteMemory, readProjectNoteMemory } = require("@/lib/codexforge/brain/learning/project-note-memory.server.ts");
const { createCreatorService } = require("@/lib/codexforge/creator/creator-service.server.ts");
const { createCreatorGenerationLifecycleAdapterForTesting } = require("@/lib/codexforge/creator/creator-private-alpha-adapter.server.ts");
const { getCreatorRuntimePersistence } = require("@/lib/codexforge/creator/creator-runtime.server.ts");

async function exerciseCreator() {
  const projectTitle = "Garden calendar";
  const page = {
    contractVersion: "codexforge.creator.page.v1", creatorKind: "website-browser-app", projectTitle,
    page: { language: "en", primaryHeading: projectTitle, headerContent: "<p>Garden</p>",
      navigationContent: null, mainContent: "<p>Water the seedlings.</p>", footerContent: "<p>Spring</p>" },
    files: [{ path: "styles.css", mediaType: "text/css", content: "body { color: #222; }" }],
  };
  const output = [JSON.stringify(page), "This is an incomplete page description."];
  const fixture = {
    identity: { providerId: "ollama-local", providerLabel: "Local Ollama", modelId: "gpt-oss:20b",
      modelLabel: "gpt-oss:20b", modelKey: "ollama-local::gpt-oss:20b", locality: "local",
      dataBoundary: "local-machine", costClass: "local-no-provider-token-charge", approvedMaximumOutputTokens: 4096 },
    async getAvailability() {
      return { providerAvailable: true, modelAvailable: true, quotaState: "not-applicable", errorCode: null, safeErrorMessage: null };
    },
    async generateApprovedText() {
      assert(output.length);
      return { outputText: output.shift(), doneReason: "stop", totalDurationNanoseconds: 1, loadDurationNanoseconds: 0, promptEvalCount: 1, evalCount: 1 };
    },
  };
  const creator = createCreatorService({
    persistence: getCreatorRuntimePersistence(),
    lifecycle: createCreatorGenerationLifecycleAdapterForTesting(suffix, fixture),
  });
  const ids = [];
  for (const title of [projectTitle, "Second calendar"]) {
    let { project } = await creator.createProject({
      creatorKind: "website-browser-app", projectTitle: title, description: "Build a small accessible garden calendar.",
    }, randomUUID());
    for (const action of ["approve-generation", "execute-generation"]) {
      ({ project } = await creator.actOnProject(project.identity.projectId, { action, expectedRevision: project.stateRevision }, randomUUID()));
    }
    if (!ids.length) assert.equal(project.status, "ready", project.failureCode ?? "expected valid page");
    else assert.notEqual(project.status, "ready");
    ids.push(project.identity.projectId);
  }
  return ids;
}

async function test() {
  const request = (host = "127.0.0.1") => new Request(`http://${host}/api/codexforge/brain/learning`, { headers: { Host: host } });
  async function read() {
    const response = await GET(request());
    const body = await response.json();
    assert.equal(response.status, 200, JSON.stringify(body.error));
    assert.equal(response.headers.get("cache-control"), "no-store");
    return body.result;
  }
  assert.notEqual((await GET(request("outside.example"))).status, 200);
  assert.deepEqual(await read(), []);
  assert(testRoots.every(dir => !fs.existsSync(dir)), "Reading an empty catalogue created a store");
  const notes = parseProjectNoteMemory([
    "## 2026-11-26 — Sitemap", "Decision: Generate the sitemap locally.", "Worked: All links resolved.",
    "Did not work: The feed missed the newest article.", "> Worked: Unconfirmed quote.", "",
    "```text", "Decision: This is only a sample.", "```",
    "## 2026-02-30 — Invalid date", "Worked: This date is impossible.",
  ].join("\n"));
  assert.equal(notes.length, 3);
  const noteDecision = notes.find(entry => entry.kind === "decision");
  assert(notes.filter(entry => entry !== noteDecision).every(entry => entry.relatedDecisionId === noteDecision.id));
  assert.equal(recallProjectMemory(notes, "sitemap", 4).length, 3);
  const fixedFile = path.join(root, "docs", "development", "project-memory.md");
  const expectedNotes = parseProjectNoteMemory(fs.readFileSync(fixedFile, "utf8"));
  assert(expectedNotes.some(entry => entry.kind === "decision"));
  assert.deepEqual(await readProjectNoteMemory(), expectedNotes);
  console.log("PASS dated project notes, linked findings, excluded examples and reading the workspace record");

  const chat = getJarvisChatRuntimeService();
  const decision = "We decided to use SQLite.";
  let { conversation } = await chat.createConversation({ message: decision }, randomUUID());
  const chatId = conversation.conversationId;
  async function act(input) {
    const result = await chat.actOnConversation(chatId, { ...input, expectedRevision: conversation.revision }, randomUUID());
    if ("conversation" in result) conversation = result.conversation;
    return result;
  }
  const cancel = () => act({ action: "cancel-turn", reason: "Finished recording this observation." });
  await cancel();
  await act({ action: "append-turn", message: "That worked.", contextMode: "none" });
  assert(!conversation.turns.at(-1).envelope.providerVisibleRequest.includes("SQLite"));
  await cancel();
  await act({ action: "append-turn", message: "The SQLite migration failed.", contextMode: "none" });
  await cancel();

  const [passed, rejected] = await exerciseCreator();
  const entries = await read();
  const chatMemory = entries.filter(entry => entry.sourceId === chatId);
  assert.equal(chatMemory.length, 3);
  const choice = chatMemory.find(entry => entry.kind === "decision");
  assert.equal(choice.text, decision);
  assert.deepEqual(new Set(chatMemory.filter(entry => entry.relatedDecisionId === choice.id).map(entry => entry.kind)),
    new Set(["worked", "did-not-work"]));
  const related = recallProjectMemory(entries, "How did SQLite go?", 4);
  assert.deepEqual(new Set(related.map(entry => entry.kind)), new Set(["decision", "worked", "did-not-work"]));
  assert(related.every(entry => entry.sourceId === chatId));
  assert.deepEqual(recallProjectMemory(entries, "quasars"), []);
  for (const [sourceId, kind] of [[passed, "worked"], [rejected, "did-not-work"]]) {
    const local = entries.filter(entry => entry.sourceType === "creator" && entry.sourceId === sourceId);
    const approval = local.find(entry => entry.kind === "decision");
    assert(approval);
    assert(local.some(entry => entry.kind === kind && entry.relatedDecisionId === approval.id));
    assert(!local.some(entry => entry.kind !== "decision" && entry.kind !== kind));
  }
  assert(!JSON.stringify(entries).includes("Water the seedlings"));
  assert.deepEqual(await read(), entries);
  const chatDir = path.join(testRoots[0], "jarvis-chat", "conversations", chatId);
  const revisions = fs.readdirSync(path.join(chatDir, "revisions")).sort();
  const precedingHead = fs.readFileSync(path.join(chatDir, "revisions", revisions.at(-2)));
  const head = path.join(chatDir, "head.json");
  fs.writeFileSync(head, precedingHead);
  assert.deepEqual(await read(), entries);
  assert.deepEqual(fs.readFileSync(head), precedingHead, "Reading Brain memory changed the conversation head");
  assert.equal((await chat.getConversation(chatId)).revision, conversation.revision);
  console.log("PASS durable decisions, contradictory reports, verified Creator outcomes, relevant recall, repeated reads and context isolation");

  const turn = conversation.turns[0];
  const extractText = (text) => extractConversationMemory({ ...conversation, turns: [{
    ...turn, state: "succeeded", userMessage: { ...turn.userMessage, text },
    assistantMessage: { ...turn.userMessage, role: "assistant", text: "We chose Postgres. That worked." },
  }] });
  const ignored = [
    "Did the deployment work?", "If the migration failed, try again.", "Maybe the test passed.",
    "I worked on the SQLite migration.", "We have a fixed budget.", "I want to understand what worked.",
    "The migration needs to be fixed.",
    "> We decided to use Postgres.", "```\nThe migration failed.\n```",
    "[Brain memory]\n> We decided to use SQLite.\n[/Brain memory]",
  ];
  for (const line of ignored) assert.deepEqual(extractText(line), [], line);
  const qualified = extractText("We decided to use `SQLite` if the server is offline.");
  assert.equal(qualified[0]?.kind, "decision");
  assert(qualified[0].text.includes("if the server is offline"));
  assert.equal(extractText("Nothing worked.")[0]?.kind, "did-not-work");
  assert.equal(extractText("[Brain memory]\nWe decided to use SQLite.\n[/Brain memory]\nWe decided to use Redis.")[0].text, "We decided to use Redis.");
  await act({ action: "delete-conversation", confirmationConversationId: chatId });
  const afterDelete = await read();
  assert(!afterDelete.some(entry => entry.sourceId === chatId));
  assert(afterDelete.some(entry => entry.sourceId === passed));
  console.log("PASS assistant/quote/recall exclusion, deliberate deletion and independent source retention");
}

const listener = net.createServer(socket => socket.end());
async function main() {
  try {
    await new Promise((ok, fail) => listener.once("error", fail).listen(0, "127.0.0.1", ok));
    await test();
  } finally {
    if (listener.listening) await new Promise(resolve => listener.close(resolve));
    // Only these newly allocated UUID-scoped test roots belong to this invocation.
    if (fs.existsSync(testRoots[1])) await getCreatorRuntimePersistence().cleanupTestRoot();
    fs.rmSync(testRoots[0], { recursive: true, force: true });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
