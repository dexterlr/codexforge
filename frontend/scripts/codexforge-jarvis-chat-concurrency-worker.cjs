"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const Module = require("node:module");

const repoRoot = path.resolve(__dirname, "..");
const suffix = "canonical-jarvis-chat-process-contention";
const deterministicRoot = path.resolve(
  repoRoot,
  ".codexforge",
  "private-alpha-tests",
  suffix
);
const invocationMode = process.argv[2] ?? "driver";

const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith("@/")) {
    request = path.join(repoRoot, "src", request.slice(2));
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "server-only") return {};
  return originalLoad.apply(this, arguments);
};
const ts = require(path.join(repoRoot, "node_modules", "typescript"));
require.extensions[".ts"] = function (module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
    },
    fileName: filename,
  });
  module._compile(output.outputText, filename);
};

function digest(value) {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

function exactFixtureLifecycle() {
  return Object.freeze({
    async bindRun(input) {
      return {
        runId: digest(`run\0${input.conversationId}\0${input.turnId}`).slice(0, 24),
        revision: 1,
        state: "awaiting_approval",
        approvalScopeHash: digest(
          `scope\0${input.conversationId}\0${input.turnId}\0${input.ownershipBindingId}`
        ),
      };
    },
    async recoverBoundRun() {
      return null;
    },
    async getRun() {
      throw new Error("Contention fixture does not expose execution state.");
    },
    async approveRun() {
      throw new Error("Contention fixture forbids approval.");
    },
    async executeRun() {
      throw new Error("Contention fixture forbids execution.");
    },
    async cancelRun(input) {
      return {
        runId: input.runId,
        revision: 2,
        state: "canceled",
      };
    },
    async reconcileRun() {
      throw new Error("Contention fixture forbids recovery.");
    },
    async readKillSwitch() {
      return {
        killSwitchEngaged: false,
        source: "absent",
        safeMessage: "No deterministic kill switch is engaged.",
      };
    },
  });
}

function installWorkerActivityBoundary() {
  const trap = require(path.join(
    repoRoot,
    "scripts",
    "codexforge-creator-deterministic-activity-trap.cjs"
  )).installCreatorDeterministicActivityTrap({
    repoRoot,
    allowedWriteTrees: [deterministicRoot],
    allowedMkdirPaths: [
      path.join(repoRoot, ".codexforge"),
      path.join(repoRoot, ".codexforge", "private-alpha-tests"),
    ],
  });
  Module._load = function (request, parent, isMain) {
    if (request === "server-only") return {};
    const resolved = Module._resolveFilename(request, parent, isMain);
    return trap.wrapLoadedModule(resolved, originalLoad.apply(this, arguments));
  };
  return trap;
}

async function runCreateWorker() {
  const key = process.argv[3];
  const message = process.argv[4];
  if (!key || !message) throw new Error("Create worker requires one key and message.");
  const trap = installWorkerActivityBoundary();
  const { service } = workerService();
  const result = await service.createConversation({ message }, key);
  trap.assertZeroActivity();
  process.stdout.write(
    `${JSON.stringify({
      conversationId: result.conversation.conversationId,
      revision: result.conversation.revision,
      replayed: result.replayed,
      state: result.conversation.state,
      counters: trap.counters,
    })}\n`
  );
}

function workerService() {
  const persistenceModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/jarvis-chat/jarvis-chat-persistence.server.ts"
  ));
  const serviceModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/jarvis-chat/jarvis-chat-service.server.ts"
  ));
  const persistence = persistenceModule.createJarvisChatPersistenceForTesting(suffix);
  return {
    persistence,
    service: serviceModule.createJarvisChatService({
      persistence,
      lifecycle: exactFixtureLifecycle(),
    }),
  };
}

function exactRevision(source) {
  if (!/^[1-9]\d{0,3}$/u.test(source ?? "")) {
    throw new Error("Delete worker requires one exact positive revision.");
  }
  return Number(source);
}

async function runDeleteWorker(expectConflict) {
  const conversationId = process.argv[3];
  const expectedRevision = exactRevision(process.argv[4]);
  const key = process.argv[5];
  if (!/^[a-f0-9]{24}$/u.test(conversationId ?? "") || !key) {
    throw new Error("Delete worker requires one exact conversation and key.");
  }
  const trap = installWorkerActivityBoundary();
  const { service } = workerService();
  try {
    const result = await service.actOnConversation(
      conversationId,
      {
        action: "delete-conversation",
        expectedRevision,
        confirmationConversationId: conversationId,
      },
      key
    );
    if (expectConflict) {
      throw new Error("A different deletion key did not conflict.");
    }
    if (!result.deleted) throw new Error("Delete worker did not receive a tombstone result.");
    trap.assertZeroActivity();
    process.stdout.write(
      `${JSON.stringify({
        conversationId: result.conversationId,
        deleted: result.deleted,
        replayed: result.replayed,
        responseStatus: result.responseStatus,
        deletionAuditId: result.deletionAuditId,
        tombstoneDigest: result.tombstoneDigest,
        deletedAt: result.deletedAt,
        deletionEvent: result.deletionEvent,
        counters: trap.counters,
      })}\n`
    );
  } catch (error) {
    if (
      expectConflict &&
      error?.code === "idempotency_conflict" &&
      error?.status === 409
    ) {
      trap.assertZeroActivity();
      process.stdout.write(
        `${JSON.stringify({
          conflictCode: error.code,
          responseStatus: error.status,
          counters: trap.counters,
        })}\n`
      );
      return;
    }
    throw error;
  }
}

async function runListWorker() {
  const conversationId = process.argv[3];
  if (!/^[a-f0-9]{24}$/u.test(conversationId ?? "")) {
    throw new Error("List worker requires one exact conversation identity.");
  }
  const trap = installWorkerActivityBoundary();
  const { service } = workerService();
  let observedPresent = false;
  let observedTransitionOrAbsent = false;
  let lastTotal = 0;
  const observedStates = new Set();
  for (let sample = 0; sample < 200; sample += 1) {
    const listed = await service.listConversations(20);
    const matches = listed.filter((entry) => entry.conversationId === conversationId);
    if (matches.length > 1) throw new Error("Concurrent list duplicated one conversation identity.");
    lastTotal = listed.length;
    if (matches.length === 1) {
      observedPresent = true;
      observedStates.add(matches[0].state);
      if (matches[0].state === "deleting") observedTransitionOrAbsent = true;
    } else {
      observedTransitionOrAbsent = true;
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  trap.assertZeroActivity();
  process.stdout.write(
    `${JSON.stringify({
      observedPresent,
      observedTransitionOrAbsent,
      observedStates: [...observedStates].sort(),
      samples: 200,
      lastTotal,
      counters: trap.counters,
    })}\n`
  );
}

function workerEnvironment() {
  const keys = ["SystemRoot", "WINDIR", "TEMP", "TMP", "PATH"];
  const environment = { NODE_ENV: "test" };
  for (const key of keys) {
    if (typeof process.env[key] === "string") environment[key] = process.env[key];
  }
  return environment;
}

function launchWorker(argumentsForWorker) {
  const child = spawn(process.execPath, [__filename, ...argumentsForWorker], {
    cwd: repoRoot,
    env: workerEnvironment(),
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => {
    stdout += chunk.toString("utf8");
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString("utf8");
  });
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error("Independent Jarvis chat create worker timed out."));
    }, 60_000);
    child.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.once("exit", (code, signal) => {
      clearTimeout(timer);
      if (code !== 0) {
        reject(
          new Error(
            `Independent Jarvis chat ${argumentsForWorker[0]} worker failed (${code ?? signal ?? "unknown"}).\n${stdout}${stderr}`
          )
        );
        return;
      }
      const lines = stdout.trim().split(/\r?\n/u).filter(Boolean);
      try {
        resolve(JSON.parse(lines.at(-1)));
      } catch (error) {
        reject(new Error(`Worker returned malformed evidence.\n${stdout}${stderr}\n${error}`));
      }
    });
  });
}

function launchCreate(key, message) {
  return launchWorker(["create", key, message]);
}

function launchDelete(conversationId, expectedRevision, key) {
  return launchWorker(["delete", conversationId, String(expectedRevision), key]);
}

function launchDeleteConflict(conversationId, expectedRevision, key) {
  return launchWorker(["delete-conflict", conversationId, String(expectedRevision), key]);
}

function launchList(conversationId) {
  return launchWorker(["list", conversationId]);
}

async function requireAllWorkers(promises, label) {
  const settled = await Promise.allSettled(promises);
  const failures = settled
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => entry.status === "rejected");
  const successes = settled
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => entry.status === "fulfilled")
    .map(({ entry, index }) => ({ index, result: entry.value }));
  const failure = failures[0];
  if (failure) {
    throw new Error(
      `${label} failed after every independent process exited.\n` +
      `successful workers: ${JSON.stringify(successes)}\n` +
      `failed workers: ${failures.map(({ entry, index }) => `#${index}: ${entry.reason?.stack ?? entry.reason?.message ?? String(entry.reason)}`).join("\n")}`
    );
  }
  return settled.map((entry) => entry.value);
}

async function removeExactOwnedRoot(persistence) {
  await persistence.cleanupTestData();
  const rootSegments = [".codexforge", "private-alpha-tests", suffix];
  const nativeFilesystem = require(path.join(
    repoRoot,
    "src/lib/codexforge/creator/creator-native-filesystem.server.ts"
  ));
  if (!nativeFilesystem.creatorNativeRootExists(rootSegments)) return;
  let root = nativeFilesystem.openCreatorNativeRoot(rootSegments, "removable");
  try {
    root.removeRoot();
    root = null;
  } finally {
    root?.close();
  }
}

async function runDriver() {
  if (fs.existsSync(deterministicRoot)) {
    throw new Error("Independent Jarvis chat contention root was not empty before the run.");
  }
  const persistenceModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/jarvis-chat/jarvis-chat-persistence.server.ts"
  ));
  const persistence = persistenceModule.createJarvisChatPersistenceForTesting(suffix);
  const serviceModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/jarvis-chat/jarvis-chat-service.server.ts"
  ));
  const service = serviceModule.createJarvisChatService({
    persistence,
    lifecycle: exactFixtureLifecycle(),
  });
  const sharedKey = "jarvis-chat-process-shared-key-v1";
  const sharedMessage = "Independent processes reserve one exact chat.";
  try {
    const shared = await requireAllWorkers(
      Array.from({ length: 4 }, () => launchCreate(sharedKey, sharedMessage)),
      "Concurrent exact-create replay"
    );
    const sharedIds = new Set(shared.map((entry) => entry.conversationId));
    if (sharedIds.size !== 1) {
      throw new Error("Concurrent exact create replay published more than one conversation.");
    }
    if (shared.some((entry) => entry.state !== "awaiting_approval" || entry.revision < 2)) {
      throw new Error("Concurrent exact create replay did not return one bound durable result.");
    }
    if (
      shared.filter((entry) => entry.replayed === false).length !== 1 ||
      shared.filter((entry) => entry.replayed === true).length !== 3
    ) {
      throw new Error("Concurrent exact create did not preserve one original response and three exact replays.");
    }
    if (shared.some((entry) => Object.values(entry.counters).some((count) => count !== 0))) {
      throw new Error("A contention worker attempted prohibited activity.");
    }

    const distinct = await requireAllWorkers(
      Array.from({ length: 4 }, (_, index) =>
        launchCreate(
          `jarvis-chat-process-distinct-${index}-v1`,
          `Independent process conversation ${index}.`
        )
      ),
      "Concurrent distinct-chat publication"
    );
    const allIds = new Set([
      ...sharedIds,
      ...distinct.map((entry) => entry.conversationId),
    ]);
    if (allIds.size !== 5) {
      throw new Error("Distinct concurrent creates did not publish five isolated conversations.");
    }
    if (distinct.some((entry) => entry.replayed !== false || entry.state !== "awaiting_approval")) {
      throw new Error("Distinct concurrent creates did not each return one original awaiting-approval response.");
    }
    if (distinct.some((entry) => Object.values(entry.counters).some((count) => count !== 0))) {
      throw new Error("A distinct-chat contention worker attempted prohibited activity.");
    }
    const listed = await persistence.listConversations(20);
    if (listed.length !== 5 || listed.some((entry) => !allIds.has(entry.conversationId))) {
      throw new Error("Independent-process publication inventory was incomplete or crossed identity.");
    }

    const deletionSetup = await service.createConversation(
      { message: "Prepare one exact conversation for independent-process deletion." },
      "jarvis-chat-process-delete-setup-v1"
    );
    const deletable = await service.actOnConversation(
      deletionSetup.conversation.conversationId,
      {
        action: "cancel-turn",
        expectedRevision: deletionSetup.conversation.revision,
        reason: "Prepare the deterministic delete race without provider execution.",
      },
      "jarvis-chat-process-delete-cancel-v1"
    );
    if (deletable.conversation.state !== "canceled") {
      throw new Error("Delete-race setup did not reach one safe terminal state.");
    }
    const deletionKey = "jarvis-chat-process-delete-shared-v1";
    const listWorkers = Array.from({ length: 4 }, () =>
      launchList(deletable.conversation.conversationId)
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    const deleteWorkers = Array.from({ length: 4 }, () =>
      launchDelete(
        deletable.conversation.conversationId,
        deletable.conversation.revision,
        deletionKey
      )
    );
    const [deletions, concurrentLists] = await Promise.all([
      requireAllWorkers(deleteWorkers, "Concurrent exact-delete replay"),
      requireAllWorkers(listWorkers, "Concurrent delete/list transition"),
    ]);
    const canonicalDeletion = deletions[0];
    if (
      deletions.some(
        (entry) =>
          entry.deleted !== true ||
          entry.responseStatus !== 200 ||
          entry.conversationId !== deletable.conversation.conversationId ||
          entry.deletionAuditId !== canonicalDeletion.deletionAuditId ||
          entry.tombstoneDigest !== canonicalDeletion.tombstoneDigest ||
          entry.deletedAt !== canonicalDeletion.deletedAt ||
          JSON.stringify(entry.deletionEvent) !== JSON.stringify(canonicalDeletion.deletionEvent)
      )
    ) {
      throw new Error("Concurrent exact deletion did not return one canonical tombstone payload.");
    }
    if (
      deletions.filter((entry) => entry.replayed === false).length !== 1 ||
      deletions.filter((entry) => entry.replayed === true).length !== 3
    ) {
      throw new Error("Concurrent exact deletion did not preserve one original response and three exact replays.");
    }
    if (deletions.some((entry) => Object.values(entry.counters).some((count) => count !== 0))) {
      throw new Error("A delete contention worker attempted prohibited activity.");
    }
    if (
      concurrentLists.some(
        (entry) =>
          entry.samples !== 200 ||
          !entry.observedPresent ||
          !entry.observedTransitionOrAbsent ||
          entry.observedStates.some((state) => !["canceled", "deleting"].includes(state)) ||
          Object.values(entry.counters).some((count) => count !== 0)
      )
    ) {
      throw new Error("Concurrent list did not observe and safely reconcile the exact delete transition.");
    }
    const differentKey = await launchDeleteConflict(
      deletable.conversation.conversationId,
      deletable.conversation.revision,
      "jarvis-chat-process-delete-different-v1"
    );
    if (
      differentKey.conflictCode !== "idempotency_conflict" ||
      differentKey.responseStatus !== 409 ||
      Object.values(differentKey.counters).some((count) => count !== 0)
    ) {
      throw new Error("A different deletion key did not return the exact stable conflict.");
    }
    const afterDeletion = await persistence.listConversations(20);
    if (
      afterDeletion.length !== 5 ||
      afterDeletion.some((entry) => !allIds.has(entry.conversationId)) ||
      afterDeletion.some((entry) => entry.conversationId === deletable.conversation.conversationId)
    ) {
      throw new Error("Delete publication changed an unrelated conversation inventory.");
    }
    process.stdout.write(
      "Jarvis chat independent-process contention PASS: workers=17 createOriginals=5 createExactReplays=3 sharedPublications=1 distinctPublications=4 deleteOriginals=1 deleteExactReplays=3 deleteListProcesses=4 deleteListSamples=800 deleteConflicts=1 conversations=5 childWorkerProhibitedActivity=0\n"
    );
  } finally {
    await removeExactOwnedRoot(persistence);
  }
  if (fs.existsSync(deterministicRoot)) {
    throw new Error("Independent Jarvis chat contention root was not cleaned.");
  }
}

function errorEvidence(error) {
  const ownProperties = {};
  if (error && typeof error === "object") {
    for (const key of Object.keys(error).sort().slice(0, 16)) {
      const value = error[key];
      ownProperties[key] =
        value === null || ["boolean", "number", "string"].includes(typeof value)
          ? String(value).slice(0, 512)
          : `[${Array.isArray(value) ? "array" : typeof value}]`;
    }
  }
  const details = {
    name: error?.name ?? null,
    code: error?.code ?? null,
    status: error?.status ?? null,
    message: error?.message ?? String(error),
    cause: error?.cause && typeof error.cause === "object"
      ? {
          name: error.cause.name ?? null,
          code: error.cause.code ?? null,
          message: error.cause.message ?? String(error.cause),
        }
      : error?.cause ?? null,
    ownProperties,
  };
  return `${error?.stack ?? error?.message ?? String(error)}\n[worker-error] ${JSON.stringify(details)}`;
}

if (invocationMode === "driver") {
  runDriver().catch((error) => {
    process.stderr.write(`${errorEvidence(error)}\n`);
    process.exitCode = 1;
  });
} else if (invocationMode === "create") {
  runCreateWorker().catch((error) => {
    process.stderr.write(`${errorEvidence(error)}\n`);
    process.exitCode = 1;
  });
} else if (invocationMode === "delete") {
  runDeleteWorker(false).catch((error) => {
    process.stderr.write(`${errorEvidence(error)}\n`);
    process.exitCode = 1;
  });
} else if (invocationMode === "delete-conflict") {
  runDeleteWorker(true).catch((error) => {
    process.stderr.write(`${errorEvidence(error)}\n`);
    process.exitCode = 1;
  });
} else if (invocationMode === "list") {
  runListWorker().catch((error) => {
    process.stderr.write(`${errorEvidence(error)}\n`);
    process.exitCode = 1;
  });
} else {
  process.stderr.write("Invalid Jarvis chat contention worker invocation.\n");
  process.exitCode = 1;
}
