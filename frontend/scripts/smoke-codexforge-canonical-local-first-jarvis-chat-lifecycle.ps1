param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

function Assert-True {
  param([bool]$Condition, [string]$Message)
  if (-not $Condition) { throw "[FAIL] $Message" }
  Write-Host "[PASS] $Message"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Message)
  Assert-True ($Haystack.IndexOf($Needle, [StringComparison]::Ordinal) -ge 0) $Message
}

function Get-Text {
  param([string]$RelativePath)
  return Get-Content -Raw -LiteralPath (Join-Path $root $RelativePath)
}

Write-Host ""
Write-Host "=== CodexForge canonical local-first Jarvis chat lifecycle ==="

$requiredFiles = @(
  "src/lib/codexforge/jarvis-chat/jarvis-chat-types.ts",
  "src/lib/codexforge/jarvis-chat/jarvis-chat-policy.ts",
  "src/lib/codexforge/jarvis-chat/jarvis-chat-crypto.ts",
  "src/lib/codexforge/jarvis-chat/jarvis-chat-envelope.server.ts",
  "src/lib/codexforge/jarvis-chat/jarvis-chat-persistence.server.ts",
  "src/lib/codexforge/jarvis-chat/jarvis-chat-private-alpha-adapter.server.ts",
  "src/lib/codexforge/jarvis-chat/jarvis-chat-service.server.ts",
  "src/lib/codexforge/jarvis-chat/jarvis-chat-runtime.server.ts",
  "src/lib/codexforge/jarvis-chat/jarvis-chat-http.server.ts",
  "src/lib/codexforge/jarvis-chat/jarvis-chat-api-client.ts",
  "src/lib/codexforge/jarvis-chat/components/JarvisChatPanel.tsx",
  "src/app/api/codexforge/jarvis-chat/status/route.ts",
  "src/app/api/codexforge/jarvis-chat/conversations/route.ts",
  "src/app/api/codexforge/jarvis-chat/conversations/[conversationId]/route.ts",
  "src/app/api/codexforge/jarvis-chat/conversations/[conversationId]/actions/route.ts",
  "scripts/codexforge-jarvis-chat-concurrency-worker.cjs",
  "docs/codexforge-canonical-local-first-jarvis-chat-lifecycle.md"
)
foreach ($file in $requiredFiles) {
  Assert-True (Test-Path -LiteralPath (Join-Path $root $file)) "Chat lifecycle file exists: $file"
}

$types = Get-Text "src/lib/codexforge/jarvis-chat/jarvis-chat-types.ts"
$policy = Get-Text "src/lib/codexforge/jarvis-chat/jarvis-chat-policy.ts"
$adapter = Get-Text "src/lib/codexforge/jarvis-chat/jarvis-chat-private-alpha-adapter.server.ts"
$persistence = Get-Text "src/lib/codexforge/jarvis-chat/jarvis-chat-persistence.server.ts"
$service = Get-Text "src/lib/codexforge/jarvis-chat/jarvis-chat-service.server.ts"
$client = Get-Text "src/lib/codexforge/jarvis-chat/jarvis-chat-api-client.ts"
$panel = Get-Text "src/lib/codexforge/jarvis-chat/components/JarvisChatPanel.tsx"
$documentation = Get-Text "docs/codexforge-canonical-local-first-jarvis-chat-lifecycle.md"

Assert-Contains $types 'providerKey: "ollama-local"' "Chat runtime contract fixes the local provider"
Assert-Contains $types 'modelKey: "ollama-local::gpt-oss:20b"' "Chat runtime contract fixes the exact admitted model key"
Assert-Contains $types 'maximumOutputTokens: 4096' "Chat runtime contract fixes the 4096-token ceiling"
Assert-Contains $types 'dataBoundary: "local-machine"' "Chat runtime contract fixes the local data boundary"
Assert-Contains $types 'approvalMode: "manual-approval-then-separate-execution"' "Chat runtime contract makes approval and execution separate"
Assert-Contains $policy 'JARVIS_CHAT_MAX_TURNS = 8' "Chat conversation turn count is bounded"
Assert-Contains $adapter 'createPrivateAlphaStore' "Chat adapter reuses the established Private Alpha lifecycle"
Assert-Contains $adapter 'createPrivateAlphaStoreForTesting' "Chat fixtures are limited to the explicit deterministic adapter boundary"
Assert-Contains $persistence 'verifyCompleteRevisionChain' "Chat reads validate the complete immutable revision chain"
Assert-Contains $service 'containsPrivateAlphaSecretLikeContent' "Chat service rejects secret-like input and output"
Assert-Contains $client 'malformed_server_response' "Chat client fails closed on malformed server responses"
Assert-Contains $panel 'conversation context' "Chat UI exposes an explicit conversation-context choice"
Assert-Contains $documentation 'Deletion does **not** create, alter, or erase' "Chat documentation states the conditional Private Alpha provenance boundary after deletion"

$entryPage = Get-Text "src/app/entry/page.tsx"
$memoryPage = Get-Text "src/app/memory/page-client.tsx"
$rootLayout = Get-Text "src/app/layout.tsx"
Assert-Contains $entryPage 'createJarvisChatConversation({ message: prompt })' "Quick launch creates the exact visible prompt through the canonical Jarvis API"
Assert-Contains $entryPage 'router.push("/jarvis")' "Quick launch continues only to canonical Jarvis after chat creation"
Assert-True ($entryPage.IndexOf('codexforge_ai_draft', [StringComparison]::Ordinal) -lt 0) "Quick launch injects no hidden legacy browser draft"
Assert-Contains $entryPage 'const [submittedPrompt, setSubmittedPrompt] = useState<string | null>(null)' "Quick launch freezes the exact submitted prompt while the request is in flight"
Assert-Contains $entryPage 'const visiblePromptPreview = submittedPrompt ?? promptPreview' "Quick launch keeps the submitted prompt visible during the handoff"
Assert-Contains $entryPage 'disabled={launching}' "Quick launch locks preview-mutating controls while the exact prompt is in flight"
Assert-Contains $entryPage 'The canonical server chat succeeded; local activity history is best-effort only.' "Quick launch treats local activity history separately from canonical chat success"
Assert-Contains $entryPage 'aria-describedby={launching ? "codexforge-entry-launch-explanation" : undefined}' "Quick launch associates every busy-disabled editor with one visible stable explanation"
Assert-True ($memoryPage.IndexOf('href="/ai"', [StringComparison]::Ordinal) -lt 0) "Memory review exposes no retired AI-workspace handoff"
Assert-True ($rootLayout.IndexOf('http://localhost:3000', [StringComparison]::Ordinal) -lt 0) "CodexForge metadata does not publish the unrelated port-3000 origin"

foreach ($routeModelOwner in @(
  "src/lib/codexforge/consolidation/workflow-entrypoints.ts",
  "src/lib/codexforge/consolidation/surface-map.ts",
  "src/lib/codexforge/global-activity/activity-next-action.ts",
  "src/lib/codexforge/product-simplification/simplified-page-copy.ts",
  "src/lib/codexforge/product-simplification/primary-action-model.ts",
  "src/lib/codexforge/product-readiness-audit/route-readiness-audit.ts",
  "src/lib/codexforge/workflow-wizard/wizard-intent.ts",
  "src/lib/codexforge/stabilization-command-center/stabilization-next-action.ts"
)) {
  $routeModelSource = Get-Text $routeModelOwner
  Assert-True ($routeModelSource.IndexOf('"/ai"', [StringComparison]::Ordinal) -lt 0) "Active route model contains no retired /ai destination: $routeModelOwner"
}

foreach ($handoffOwner in @(
  "src/lib/codexforge/ai-router/components/AiRouterCockpit.tsx",
  "src/lib/codexforge/files/components/FileChatHandoffPanel.tsx",
  "src/lib/codexforge/execution-readiness/components/ExecutionReadinessPanel.tsx",
  "src/lib/codexforge/read-only-step-execution/components/ReadOnlyStepExecutionPanel.tsx",
  "src/lib/codexforge/step-runner-preview/components/StepRunnerPreviewPanel.tsx",
  "src/lib/codexforge/task-autopilot/components/TaskAutopilotPanel.tsx",
  "src/lib/codexforge/stabilization-command-center/components/StabilizationCommandCenter.tsx",
  "src/lib/codexforge/task-activation/components/TaskActivationHandoffPanel.tsx"
)) {
  $handoffSource = Get-Text $handoffOwner
  Assert-True ($handoffSource.IndexOf('href="/ai"', [StringComparison]::Ordinal) -lt 0) "Active handoff owner contains no retired /ai link: $handoffOwner"
  Assert-Contains $handoffSource 'href="/jarvis"' "Active handoff owner reaches canonical Jarvis: $handoffOwner"
}

$nodeScript = @'
"use strict";
const crypto = require("node:crypto");
const fs = require("node:fs");
const fsp = fs.promises;
const path = require("node:path");
const net = require("node:net");
const Module = require("node:module");

const repoRoot = process.argv[2];
const suffix = "canonical-local-first-jarvis-chat-lifecycle";
const httpSuffix = "canonical-local-first-jarvis-chat-http";
const corruptionSuffix = "canonical-local-first-jarvis-chat-corruption";
const deletionRecoverySuffix = "canonical-local-first-jarvis-chat-deletion-recovery";
const deterministicBase = path.resolve(repoRoot, ".codexforge", "private-alpha-tests");
const testRoot = path.resolve(deterministicBase, suffix);
const httpRoot = path.resolve(deterministicBase, httpSuffix);
const corruptionRoot = path.resolve(deterministicBase, corruptionSuffix);
const deletionRecoveryRoot = path.resolve(deterministicBase, deletionRecoverySuffix);
const activityTrap = require(path.join(
  repoRoot,
  "scripts",
  "codexforge-creator-deterministic-activity-trap.cjs"
)).installCreatorDeterministicActivityTrap({
  repoRoot,
  allowedWriteTrees: [testRoot, httpRoot, corruptionRoot, deletionRecoveryRoot],
  allowedMkdirPaths: [
    path.join(repoRoot, ".codexforge"),
    deterministicBase,
  ],
});
const counters = activityTrap.counters;
const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith("@/")) request = path.join(repoRoot, "src", request.slice(2));
  return originalResolveFilename.call(this, request, parent, isMain, options);
};
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "server-only") return {};
  const resolved = Module._resolveFilename(request, parent, isMain);
  return activityTrap.wrapLoadedModule(resolved, originalLoad.apply(this, arguments));
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
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: filename,
  });
  module._compile(output.outputText, filename);
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
  console.log(`[PASS] ${message}`);
}

async function expectFailure(operation, code, message, status) {
  try {
    await operation();
  } catch (error) {
    assert(error && error.code === code, `${message} (${code}; observed ${error?.code ?? error?.message ?? "unknown"})`);
    if (status !== undefined) assert(error.status === status, `${message} preserves status ${status}`);
    return error;
  }
  throw new Error(`${message}: expected ${code}`);
}

async function snapshotTree(rootPath) {
  const hash = crypto.createHash("sha256");
  let nodes = 0;
  async function visit(current, relative) {
    const stat = await fsp.lstat(current).catch((error) => {
      if (error && error.code === "ENOENT" && relative === "") return null;
      throw error;
    });
    if (!stat) {
      hash.update("absent\n");
      return;
    }
    if (stat.isSymbolicLink() || stat.isSocket() || stat.isFIFO()) {
      throw new Error(`Unsafe node in snapshot: ${relative || "."}`);
    }
    nodes += 1;
    if (nodes > 10_000) throw new Error("Persistence snapshot exceeded its bounded inventory.");
    if (stat.isDirectory()) {
      hash.update(`d\0${relative}\n`);
      const names = (await fsp.readdir(current)).sort();
      for (const name of names) await visit(path.join(current, name), relative ? `${relative}/${name}` : name);
      return;
    }
    if (!stat.isFile()) throw new Error(`Unsupported node in snapshot: ${relative}`);
    const bytes = await fsp.readFile(current);
    hash.update(`f\0${relative}\0${bytes.length}\0`);
    hash.update(bytes);
  }
  await visit(rootPath, "");
  return hash.digest("hex");
}

async function assertSafeRemoveOwnedTestRoot(target) {
  const relative = path.relative(deterministicBase, target);
  assert(relative && !path.isAbsolute(relative) && relative !== ".." && !relative.startsWith(`..${path.sep}`), "cleanup target is one exact deterministic Private Alpha suffix");
  const stat = await fsp.lstat(target).catch((error) => {
    if (error && error.code === "ENOENT") return null;
    throw error;
  });
  if (!stat) return;
  assert(stat.isDirectory() && !stat.isSymbolicLink(), "cleanup root is one owned non-link directory");
  const pending = [target];
  while (pending.length) {
    const current = pending.pop();
    for (const name of await fsp.readdir(current)) {
      const candidate = path.join(current, name);
      const child = await fsp.lstat(candidate);
      assert(!child.isSymbolicLink(), "cleanup inventory contains no symlink or junction");
      if (child.isDirectory()) pending.push(candidate);
      else assert(child.isFile(), "cleanup inventory contains only files and directories");
    }
  }
  await fsp.rm(target, { recursive: true, force: false });
}

async function readAllOwnedText(target) {
  const chunks = [];
  const pending = [target];
  while (pending.length) {
    const current = pending.pop();
    const stat = await fsp.lstat(current);
    assert(!stat.isSymbolicLink(), "persisted chat test inventory contains no link");
    if (stat.isDirectory()) {
      for (const name of await fsp.readdir(current)) pending.push(path.join(current, name));
    } else if (stat.isFile()) {
      chunks.push(await fsp.readFile(current, "utf8"));
    } else {
      throw new Error("Persisted chat test inventory contains an unsafe node.");
    }
  }
  return chunks.join("\n");
}

function fixtureIdentity() {
  return Object.freeze({
    providerId: "ollama-local",
    providerLabel: "Local Ollama",
    modelId: "gpt-oss:20b",
    modelLabel: "gpt-oss:20b",
    modelKey: "ollama-local::gpt-oss:20b",
    locality: "local",
    dataBoundary: "local-machine",
    costClass: "local-no-provider-token-charge",
    approvedMaximumOutputTokens: 4096,
  });
}

async function main() {
  assert(!fs.existsSync(testRoot) && !fs.existsSync(httpRoot) && !fs.existsSync(corruptionRoot) && !fs.existsSync(deletionRecoveryRoot), "Jarvis chat deterministic roots begin absent");
  const productionPrivateAlpha = path.resolve(repoRoot, ".codexforge", "private-alpha");
  const productionCreator = path.resolve(repoRoot, ".codexforge", "creator");
  const productionPrivateAlphaBefore = await snapshotTree(productionPrivateAlpha);
  const productionCreatorBefore = await snapshotTree(productionCreator);
  const persistenceModule = require(path.join(repoRoot, "src/lib/codexforge/jarvis-chat/jarvis-chat-persistence.server.ts"));
  const serviceModule = require(path.join(repoRoot, "src/lib/codexforge/jarvis-chat/jarvis-chat-service.server.ts"));
  const policyModule = require(path.join(repoRoot, "src/lib/codexforge/jarvis-chat/jarvis-chat-policy.ts"));
  const adapterModule = require(path.join(repoRoot, "src/lib/codexforge/jarvis-chat/jarvis-chat-private-alpha-adapter.server.ts"));
  const storeModule = require(path.join(repoRoot, "src/lib/codexforge/private-alpha/private-alpha-store.server.ts"));
  const nativeFilesystemModule = require(path.join(repoRoot, "src/lib/codexforge/private-alpha/private-alpha-native-filesystem.server.ts"));
  const httpModule = require(path.join(repoRoot, "src/lib/codexforge/jarvis-chat/jarvis-chat-http.server.ts"));

  let availabilityCalls = 0;
  let generationCalls = 0;
  let releaseStoppedGeneration;
  let stoppedGenerationStarted;
  const stoppedGenerationReady = new Promise((resolve) => { stoppedGenerationStarted = resolve; });
  const provider = {
    identity: fixtureIdentity(),
    async getAvailability() {
      availabilityCalls += 1;
      return { providerAvailable: true, modelAvailable: true, quotaState: "not-applicable", errorCode: null, safeErrorMessage: null };
    },
    async generateApprovedText(input) {
      generationCalls += 1;
      assert(input.model === "gpt-oss:20b" && input.maximumOutputTokens === 4096, "fixture receives only the exact approved local model envelope");
      if (
        input.approvedRequestText.includes("Stop must win before provider admission") ||
        input.approvedRequestText.includes("Admission callback failure must remain recoverable") ||
        input.approvedRequestText.includes("Stale executor must reconcile after recovery")
      ) {
        throw new Error("Provider boundary was reached for a deterministic admission-fence case.");
      }
      if (generationCalls === 1) {
        return { outputText: "One bounded local assistant response.", doneReason: "stop", totalDurationNanoseconds: 1, loadDurationNanoseconds: 0, promptEvalCount: 1, evalCount: 6 };
      }
      if (generationCalls === 2) {
        stoppedGenerationStarted();
        await new Promise((resolve) => { releaseStoppedGeneration = resolve; });
        return { outputText: "Discard this in-flight output after Stop.", doneReason: "stop", totalDurationNanoseconds: 2, loadDurationNanoseconds: 0, promptEvalCount: 2, evalCount: 7 };
      }
      if (generationCalls === 3) {
        return { outputText: "One response recovered from the exact completed run.", doneReason: "stop", totalDurationNanoseconds: 1, loadDurationNanoseconds: 0, promptEvalCount: 1, evalCount: 8 };
      }
      if (generationCalls === 4) {
        return { outputText: "sk-ABCDEFGHIJKLMNOPQRSTUVWX", doneReason: "stop", totalDurationNanoseconds: 1, loadDurationNanoseconds: 0, promptEvalCount: 1, evalCount: 1 };
      }
      throw new Error("No additional deterministic provider delivery is authorized.");
    },
  };
  const persistence = persistenceModule.createJarvisChatPersistenceForTesting(suffix);
  const lifecycle = adapterModule.createJarvisChatLifecycleAdapterForTesting(suffix, provider);
  const service = serviceModule.createJarvisChatService({ persistence, lifecycle });
  try {
    const status = await service.getRuntimeStatus();
    assert(status.providerKey === "ollama-local" && status.modelKey === "ollama-local::gpt-oss:20b" && status.runtimeModel === "gpt-oss:20b", "runtime reports the exact local provider and model identity");
    assert(status.dataBoundary === "local-machine" && status.maximumOutputTokens === 4096 && status.costClass === "local-no-provider-token-charge", "runtime reports local data, exact token, and no-provider-charge boundaries");
    assert(status.approvalMode === "manual-approval-then-separate-execution" && status.streaming === "unavailable" && status.providerAvailability === "not-checked", "runtime honestly reports approval and unavailable streaming/provider-probe states");
    assert(availabilityCalls === 0 && generationCalls === 0, "status read performs no provider availability or generation call");

    const createKey = "jarvis-chat-create-primary-v1";
    const createBody = { message: "Plan a safe local-first launch checklist." };
    const created = await service.createConversation(createBody, createKey);
    assert(created.responseStatus === 201 && !created.replayed && created.conversation.state === "awaiting_approval", "create publishes one durable conversation awaiting manual approval");
    assert(created.conversation.turns.length === 1 && created.conversation.turns[0].contextMode === "none", "initial turn records explicit no-prior-context selection");
    const firstTurn = created.conversation.turns[0];
    assert(firstTurn.runBinding && firstTurn.runBinding.providerKey === "ollama-local" && firstTurn.runBinding.maximumOutputTokens === 4096, "create binds one exact chat-owned local run without execution");
    assert(generationCalls === 0, "conversation creation does not execute a provider");

    const createReplay = await service.createConversation(createBody, createKey);
    assert(createReplay.replayed && createReplay.responseStatus === 201 && createReplay.conversation.recordDigest === created.conversation.recordDigest, "exact create retry returns the exact recorded response revision");
    await expectFailure(
      () => service.createConversation({ message: "Different request under one key." }, createKey),
      "idempotency_conflict",
      "create key reuse with another digest fails closed",
      409
    );
    const listed = await service.listConversations(20);
    assert(listed.length === 1 && listed[0].conversationId === created.conversation.conversationId && listed[0].turnCount === 1, "list returns the exact isolated durable conversation");
    const loaded = await service.getConversation(created.conversation.conversationId);
    assert(loaded.recordDigest === created.conversation.recordDigest, "load returns the exact persisted conversation revision");
    await expectFailure(
      () => Promise.resolve(persistenceModule.assertJarvisChatConversation({ ...loaded, title: "Self-checksum not recomputed" })),
      "chat_persistence_invalid",
      "record checksum rejects a schema-valid conversation rewrite",
      503
    );

    let responseLossBindCalls = 0;
    let responseLossRecoverCalls = 0;
    let responseLossRunId = null;
    const responseLossLifecycle = {
      ...lifecycle,
      async bindRun(input) {
        responseLossBindCalls += 1;
        const exactRun = await lifecycle.bindRun(input);
        responseLossRunId = exactRun.runId;
        throw new Error("Injected response loss after exact Private Alpha binding publication.");
      },
      async recoverBoundRun(input) {
        responseLossRecoverCalls += 1;
        return lifecycle.recoverBoundRun(input);
      },
    };
    const responseLossService = serviceModule.createJarvisChatService({ persistence, lifecycle: responseLossLifecycle });
    const responseLossBody = { message: "Recover one exact published binding after its response is lost." };
    const responseLossCreated = await responseLossService.createConversation(responseLossBody, "jarvis-chat-binding-response-loss-v1");
    const responseLossTurn = responseLossCreated.conversation.turns[0];
    assert(responseLossCreated.conversation.state === "awaiting_approval" && responseLossTurn.runBinding?.sourceRunId === responseLossRunId, "binding response loss reconciles the one exact already-published run into awaiting approval");
    assert(responseLossBindCalls === 1 && responseLossRecoverCalls === 1 && generationCalls === 0, "binding response loss performs one bind, one exact indexed recovery, and no provider execution");
    const responseLossRun = await lifecycle.getRun({
      conversationId: responseLossCreated.conversation.conversationId,
      turnId: responseLossTurn.turnId,
      ownershipBindingId: responseLossTurn.ownershipBindingId,
      runId: responseLossTurn.runBinding.sourceRunId,
    });
    assert(responseLossRun.runId === responseLossRunId && responseLossRun.ownership.kind === "chat", "binding response-loss recovery links the exact existing chat-owned run without duplication");
    const responseLossReplay = await responseLossService.createConversation(responseLossBody, "jarvis-chat-binding-response-loss-v1");
    assert(responseLossReplay.replayed && responseLossReplay.conversation.recordDigest === responseLossCreated.conversation.recordDigest && responseLossBindCalls === 1, "binding response-loss request retry returns its exact recorded response without another bind");

    await expectFailure(
      () => service.actOnConversation(created.conversation.conversationId, {
        action: "approve-turn",
        expectedRevision: created.conversation.revision - 1,
        approvalScopeHash: firstTurn.runBinding.approvalScopeHash,
        acknowledgement: true,
      }, "jarvis-chat-stale-approval-v1"),
      "revision_conflict",
      "stale approval revision is rejected",
      409
    );
    const approvalBody = {
      action: "approve-turn",
      expectedRevision: created.conversation.revision,
      approvalScopeHash: firstTurn.runBinding.approvalScopeHash,
      acknowledgement: true,
    };
    const approved = await service.actOnConversation(created.conversation.conversationId, approvalBody, "jarvis-chat-approve-primary-v1");
    assert(approved.conversation.state === "approved" && generationCalls === 0, "manual approval records scope without executing it");
    const approvalReplay = await service.actOnConversation(created.conversation.conversationId, approvalBody, "jarvis-chat-approve-primary-v1");
    assert(approvalReplay.replayed && approvalReplay.conversation.recordDigest === approved.conversation.recordDigest, "approval retry returns its exact recorded revision");

    const executeBody = {
      action: "execute-turn",
      expectedRevision: approved.conversation.revision,
      approvalScopeHash: approved.conversation.turns.at(-1).runBinding.approvalScopeHash,
      acknowledgement: true,
    };
    const executed = await service.actOnConversation(created.conversation.conversationId, executeBody, "jarvis-chat-execute-primary-v1");
    assert(executed.conversation.state === "ready" && executed.conversation.turns[0].assistantMessage?.text === "One bounded local assistant response.", "separate execute performs one bounded assistant response");
    assert(executed.conversation.turns[0].ordinal === 1 && executed.conversation.turns[0].userMessage.role === "user" && executed.conversation.turns[0].assistantMessage?.role === "assistant", "first durable turn preserves exact user-then-assistant role ordering");
    assert(availabilityCalls === 1 && generationCalls === 1, "first explicit execution performs exactly one availability check and one provider call");
    const executeReplay = await service.actOnConversation(created.conversation.conversationId, executeBody, "jarvis-chat-execute-primary-v1");
    assert(executeReplay.replayed && executeReplay.conversation.recordDigest === executed.conversation.recordDigest, "execute retry never duplicates the assistant response");
    assert(availabilityCalls === 1 && generationCalls === 1, "execute replay performs no retry or provider call");
    await expectFailure(
      () => service.actOnConversation(created.conversation.conversationId, { ...executeBody, approvalScopeHash: "f".repeat(64) }, "jarvis-chat-execute-primary-v1"),
      "idempotency_conflict",
      "execute key cannot replay a different request digest",
      409
    );

    const stopWinsCreated = await service.createConversation(
      { message: "Stop must win before provider admission for this exact local response." },
      "jarvis-chat-stop-wins-create-v1"
    );
    const stopWinsTurn = stopWinsCreated.conversation.turns[0];
    const stopWinsApproved = await service.actOnConversation(stopWinsCreated.conversation.conversationId, {
      action: "approve-turn",
      expectedRevision: stopWinsCreated.conversation.revision,
      approvalScopeHash: stopWinsTurn.runBinding.approvalScopeHash,
      acknowledgement: true,
    }, "jarvis-chat-stop-wins-approve-v1");
    const stopWinsExecuteBody = {
      action: "execute-turn",
      expectedRevision: stopWinsApproved.conversation.revision,
      approvalScopeHash: stopWinsApproved.conversation.turns[0].runBinding.approvalScopeHash,
      acknowledgement: true,
    };
    const stopWinsExecuteKey = "jarvis-chat-stop-wins-execute-v1";
    let releaseStopWinsLifecycle;
    let signalStopWinsIntent;
    const stopWinsIntentReached = new Promise((resolve) => { signalStopWinsIntent = resolve; });
    const stopWinsLifecycleGate = new Promise((resolve) => { releaseStopWinsLifecycle = resolve; });
    let stopWinsLifecycleResult = null;
    const stopWinsLifecycle = {
      ...lifecycle,
      async executeRun(input) {
        signalStopWinsIntent();
        await stopWinsLifecycleGate;
        stopWinsLifecycleResult = await lifecycle.executeRun(input);
        return stopWinsLifecycleResult;
      },
    };
    const stopWinsService = serviceModule.createJarvisChatService({ persistence, lifecycle: stopWinsLifecycle });
    const stopWinsAvailabilityBefore = availabilityCalls;
    const stopWinsGenerationBefore = generationCalls;
    const stopWinsExecutePromise = stopWinsService.actOnConversation(
      stopWinsApproved.conversation.conversationId,
      stopWinsExecuteBody,
      stopWinsExecuteKey
    );
    await stopWinsIntentReached;
    const stopWinsExecuting = await service.getConversation(stopWinsApproved.conversation.conversationId);
    assert(stopWinsExecuting.state === "executing" && stopWinsExecuting.pendingOperation?.action === "execute_turn", "stop-wins case durably publishes the exact chat execution intent before Private Alpha admission");
    const stopWinsStopBody = {
      action: "stop-turn",
      expectedRevision: stopWinsExecuting.revision,
    };
    await expectFailure(
      () => service.actOnConversation(
        stopWinsExecuting.conversationId,
        stopWinsStopBody,
        stopWinsExecuteKey
      ),
      "idempotency_conflict",
      "Stop cannot reuse the exact pending execution idempotency key",
      409
    );
    const stopWinsAfterKeyConflict = await service.getConversation(stopWinsExecuting.conversationId);
    assert(
      stopWinsAfterKeyConflict.recordDigest === stopWinsExecuting.recordDigest &&
        stopWinsAfterKeyConflict.pendingOperation?.action === "execute_turn",
      "same-key Stop conflict leaves the exact pending execution unchanged"
    );
    const stopWinsStopKey = "jarvis-chat-stop-wins-stop-v1";
    let stopWinsStopResult;
    let stopWinsStopError = null;
    try {
      stopWinsStopResult = await service.actOnConversation(
        stopWinsExecuting.conversationId,
        stopWinsStopBody,
        stopWinsStopKey
      );
    } catch (error) {
      stopWinsStopError = error;
    } finally {
      releaseStopWinsLifecycle();
    }
    const stopWinsCompleted = await stopWinsExecutePromise;
    if (stopWinsStopError) throw stopWinsStopError;
    assert(stopWinsStopResult.conversation.state === "stopping", "stop-wins case commits Stop while the provider admission boundary is still closed");
    assert(stopWinsLifecycleResult?.run.state === "blocked" && stopWinsLifecycleResult.errorCode === "chat_stop_prevented_execution", "Private Alpha atomically records the exact chat-stop admission block code");
    assert(stopWinsCompleted.conversation.state === "stopped" && stopWinsCompleted.conversation.turns[0].assistantMessage === null, "stop-wins completion is stopped with no assistant output");
    assert(availabilityCalls === stopWinsAvailabilityBefore && generationCalls === stopWinsGenerationBefore, "stop-wins performs zero availability checks and zero provider generation calls");
    const stopWinsExecuteReplay = await stopWinsService.actOnConversation(
      stopWinsApproved.conversation.conversationId,
      stopWinsExecuteBody,
      stopWinsExecuteKey
    );
    const stopWinsStopReplay = await stopWinsService.actOnConversation(
      stopWinsApproved.conversation.conversationId,
      stopWinsStopBody,
      stopWinsStopKey
    );
    assert(stopWinsExecuteReplay.replayed && stopWinsStopReplay.replayed && stopWinsExecuteReplay.conversation.recordDigest === stopWinsCompleted.conversation.recordDigest && stopWinsStopReplay.conversation.recordDigest === stopWinsStopResult.conversation.recordDigest, "stop-wins execute and Stop retries preserve their exact original stopped and stopping response revisions");

    const restartedStopWinsLifecycle = adapterModule.createJarvisChatLifecycleAdapterForTesting(suffix, provider);
    const restartedStopWinsRun = await restartedStopWinsLifecycle.getRun({
      conversationId: stopWinsApproved.conversation.conversationId,
      turnId: stopWinsTurn.turnId,
      ownershipBindingId: stopWinsTurn.ownershipBindingId,
      runId: stopWinsTurn.runBinding.sourceRunId,
    });
    assert(restartedStopWinsRun.state === "blocked" && restartedStopWinsRun.execution?.errorCode === "chat_stop_prevented_execution" && restartedStopWinsRun.execution.responseStatus === 409, "fresh adapter decode preserves the persisted blocked admission-fence record");
    let blockedReplayAdmissionCalls = 0;
    const restartedBlockedReplay = await restartedStopWinsLifecycle.executeRun({
      conversationId: stopWinsApproved.conversation.conversationId,
      turnId: stopWinsTurn.turnId,
      ownershipBindingId: stopWinsTurn.ownershipBindingId,
      runId: stopWinsTurn.runBinding.sourceRunId,
      expectedRunRevision: stopWinsApproved.conversation.turns[0].runBinding.runRevision,
      approvalScopeHash: stopWinsApproved.conversation.turns[0].runBinding.approvalScopeHash,
      requestEnvelopeDigest: stopWinsApproved.conversation.turns[0].runBinding.requestEnvelopeDigest,
      admitProviderStart: async () => {
        blockedReplayAdmissionCalls += 1;
        throw new Error("Persisted blocked replay must not invoke admission.");
      },
    });
    assert(restartedBlockedReplay.replayed && restartedBlockedReplay.errorCode === "chat_stop_prevented_execution" && restartedBlockedReplay.run.recordDigest === restartedStopWinsRun.recordDigest && blockedReplayAdmissionCalls === 0, "persisted blocked execution replays exactly after restart without re-admission");
    const restartedStopWinsService = serviceModule.createJarvisChatService({ persistence, lifecycle: restartedStopWinsLifecycle });
    const restartedStopWinsChatReplay = await restartedStopWinsService.actOnConversation(
      stopWinsApproved.conversation.conversationId,
      stopWinsExecuteBody,
      stopWinsExecuteKey
    );
    assert(restartedStopWinsChatReplay.replayed && restartedStopWinsChatReplay.conversation.recordDigest === stopWinsCompleted.conversation.recordDigest && availabilityCalls === stopWinsAvailabilityBefore && generationCalls === stopWinsGenerationBefore, "fresh chat service replays the stopped result without availability or provider work");

    const admissionThrowCreated = await service.createConversation(
      { message: "Admission callback failure must remain recoverable without provider access." },
      "jarvis-chat-admission-throw-create-v1"
    );
    const admissionThrowTurn = admissionThrowCreated.conversation.turns[0];
    const admissionThrowApproved = await service.actOnConversation(admissionThrowCreated.conversation.conversationId, {
      action: "approve-turn",
      expectedRevision: admissionThrowCreated.conversation.revision,
      approvalScopeHash: admissionThrowTurn.runBinding.approvalScopeHash,
      acknowledgement: true,
    }, "jarvis-chat-admission-throw-approve-v1");
    let admissionThrowCalls = 0;
    const admissionThrowLifecycle = {
      ...lifecycle,
      executeRun(input) {
        return lifecycle.executeRun({
          ...input,
          admitProviderStart: async () => {
            admissionThrowCalls += 1;
            throw new Error("Injected admission callback failure before provider access.");
          },
        });
      },
    };
    const admissionThrowService = serviceModule.createJarvisChatService({ persistence, lifecycle: admissionThrowLifecycle });
    const admissionThrowExecuteBody = {
      action: "execute-turn",
      expectedRevision: admissionThrowApproved.conversation.revision,
      approvalScopeHash: admissionThrowApproved.conversation.turns[0].runBinding.approvalScopeHash,
      acknowledgement: true,
    };
    const admissionThrowAvailabilityBefore = availabilityCalls;
    const admissionThrowGenerationBefore = generationCalls;
    let admissionCallbackFailed = false;
    try {
      await admissionThrowService.actOnConversation(
        admissionThrowApproved.conversation.conversationId,
        admissionThrowExecuteBody,
        "jarvis-chat-admission-throw-execute-v1"
      );
    } catch (error) {
      admissionCallbackFailed = error?.status === 503 && error?.message === "Chat execution admission could not be verified safely.";
    }
    const admissionThrowIntent = await service.getConversation(admissionThrowApproved.conversation.conversationId);
    const admissionThrowRun = await lifecycle.getRun({
      conversationId: admissionThrowApproved.conversation.conversationId,
      turnId: admissionThrowTurn.turnId,
      ownershipBindingId: admissionThrowTurn.ownershipBindingId,
      runId: admissionThrowTurn.runBinding.sourceRunId,
    });
    assert(admissionCallbackFailed && admissionThrowCalls === 1 && admissionThrowIntent.state === "executing" && admissionThrowIntent.pendingOperation?.action === "execute_turn", "admission callback failure leaves one durable recoverable chat execution intent");
    assert(admissionThrowRun.state === "approved" && admissionThrowRun.execution === null && availabilityCalls === admissionThrowAvailabilityBefore && generationCalls === admissionThrowGenerationBefore, "admission callback failure leaves the approved run unexecuted with zero availability and provider calls");
    const admissionThrowStop = await service.actOnConversation(admissionThrowIntent.conversationId, {
      action: "stop-turn",
      expectedRevision: admissionThrowIntent.revision,
    }, "jarvis-chat-admission-throw-stop-v1");
    const admissionThrowRecovered = await service.actOnConversation(admissionThrowIntent.conversationId, {
      action: "recover-turn",
      expectedRevision: admissionThrowStop.conversation.revision,
    }, "jarvis-chat-admission-throw-recover-v1");
    assert(admissionThrowRecovered.conversation.state === "stopped" && admissionThrowRecovered.conversation.pendingOperation === null && admissionThrowRecovered.conversation.turns[0].assistantMessage === null, "explicit Stop and recovery safely finalize an admission-callback failure without assistant output");
    assert(availabilityCalls === admissionThrowAvailabilityBefore && generationCalls === admissionThrowGenerationBefore, "admission callback failure recovery performs no provider attempt, retry, or fallback");

    const staleExecutorCreated = await service.createConversation(
      { message: "Stale executor must reconcile after recovery completes the exact stopped turn." },
      "jarvis-chat-stale-executor-create-v1"
    );
    const staleExecutorTurn = staleExecutorCreated.conversation.turns[0];
    const staleExecutorApproved = await service.actOnConversation(staleExecutorCreated.conversation.conversationId, {
      action: "approve-turn",
      expectedRevision: staleExecutorCreated.conversation.revision,
      approvalScopeHash: staleExecutorTurn.runBinding.approvalScopeHash,
      acknowledgement: true,
    }, "jarvis-chat-stale-executor-approve-v1");
    let releaseStaleExecutor;
    let signalStaleExecutorIntent;
    const staleExecutorIntentReached = new Promise((resolve) => { signalStaleExecutorIntent = resolve; });
    const staleExecutorGate = new Promise((resolve) => { releaseStaleExecutor = resolve; });
    let staleExecutorLifecycleConflict = null;
    const staleExecutorLifecycle = {
      ...lifecycle,
      async executeRun(input) {
        signalStaleExecutorIntent();
        await staleExecutorGate;
        try {
          return await lifecycle.executeRun(input);
        } catch (error) {
          staleExecutorLifecycleConflict = error;
          throw error;
        }
      },
    };
    const staleExecutorService = serviceModule.createJarvisChatService({ persistence, lifecycle: staleExecutorLifecycle });
    const staleExecutorExecuteBody = {
      action: "execute-turn",
      expectedRevision: staleExecutorApproved.conversation.revision,
      approvalScopeHash: staleExecutorApproved.conversation.turns[0].runBinding.approvalScopeHash,
      acknowledgement: true,
    };
    const staleExecutorExecuteKey = "jarvis-chat-stale-executor-execute-v1";
    const staleExecutorAvailabilityBefore = availabilityCalls;
    const staleExecutorGenerationBefore = generationCalls;
    const staleExecutorPromise = staleExecutorService.actOnConversation(
      staleExecutorApproved.conversation.conversationId,
      staleExecutorExecuteBody,
      staleExecutorExecuteKey
    );
    await staleExecutorIntentReached;
    const staleExecutorIntent = await service.getConversation(staleExecutorApproved.conversation.conversationId);
    const staleExecutorStop = await service.actOnConversation(staleExecutorIntent.conversationId, {
      action: "stop-turn",
      expectedRevision: staleExecutorIntent.revision,
    }, "jarvis-chat-stale-executor-stop-v1");
    let staleExecutorRecovered;
    let staleExecutorRecoveryError = null;
    try {
      staleExecutorRecovered = await service.actOnConversation(staleExecutorIntent.conversationId, {
        action: "recover-turn",
        expectedRevision: staleExecutorStop.conversation.revision,
      }, "jarvis-chat-stale-executor-recover-v1");
    } catch (error) {
      staleExecutorRecoveryError = error;
    } finally {
      releaseStaleExecutor();
    }
    const staleExecutorResult = await staleExecutorPromise;
    if (staleExecutorRecoveryError) throw staleExecutorRecoveryError;
    assert(staleExecutorLifecycleConflict?.status === 409 && staleExecutorRecovered.conversation.state === "stopped", "completed Stop recovery makes the stale executor encounter the exact Private Alpha lifecycle conflict");
    assert(staleExecutorResult.replayed && staleExecutorResult.conversation.recordDigest === staleExecutorRecovered.conversation.recordDigest && staleExecutorResult.conversation.turns[0].assistantMessage === null, "stale executor reloads exact chat evidence and returns the canonical completed execute replay");
    assert(availabilityCalls === staleExecutorAvailabilityBefore && generationCalls === staleExecutorGenerationBefore, "stale executor recovery race performs zero availability checks and zero provider generation calls");

    const other = await service.createConversation({ message: "A separate conversation marker." }, "jarvis-chat-create-other-v1");
    assert(other.conversation.conversationId !== executed.conversation.conversationId, "server-generated conversation identities are distinct");
    const appended = await service.actOnConversation(executed.conversation.conversationId, {
      action: "append-turn",
      expectedRevision: executed.conversation.revision,
      message: "Use only the visible messages from this conversation.",
      contextMode: "conversation",
    }, "jarvis-chat-append-context-v1");
    const appendedTurn = appended.conversation.turns.at(-1);
    const primaryMessageIds = new Set(executed.conversation.turns.flatMap((turn) => [turn.userMessage.messageId, ...(turn.assistantMessage ? [turn.assistantMessage.messageId] : [])]));
    assert(appended.conversation.turns.map((turn) => turn.ordinal).join(",") === "1,2" && appendedTurn.userMessage.role === "user", "append preserves contiguous durable turn ordering");
    assert(appendedTurn.contextMode === "conversation" && appendedTurn.envelope.contextMessages.length === 2, "append records the explicit bounded same-conversation context selection");
    assert(appendedTurn.envelope.contextMessages.every((entry) => primaryMessageIds.has(entry.messageId)), "context references only messages owned by the selected conversation");
    assert(!appendedTurn.envelope.contextMessages.some((entry) => entry.messageId === other.conversation.turns[0].userMessage.messageId), "context never leaks another conversation message");

    const appendedApproved = await service.actOnConversation(appended.conversation.conversationId, {
      action: "approve-turn",
      expectedRevision: appended.conversation.revision,
      approvalScopeHash: appendedTurn.runBinding.approvalScopeHash,
      acknowledgement: true,
    }, "jarvis-chat-approve-stop-v1");
    const stoppedExecutePromise = service.actOnConversation(appended.conversation.conversationId, {
      action: "execute-turn",
      expectedRevision: appendedApproved.conversation.revision,
      approvalScopeHash: appendedApproved.conversation.turns.at(-1).runBinding.approvalScopeHash,
      acknowledgement: true,
    }, "jarvis-chat-execute-stop-v1");
    await stoppedGenerationReady;
    const executing = await service.getConversation(appended.conversation.conversationId);
    assert(executing.state === "executing" && executing.pendingOperation?.action === "execute_turn", "execution intent is durable before the provider result returns");
    const impossibleExecuting = persistenceModule.sealJarvisChatConversation({ ...executing, pendingOperation: null });
    await expectFailure(
      () => Promise.resolve(persistenceModule.assertJarvisChatConversation(impossibleExecuting)),
      "chat_persistence_invalid",
      "schema-valid-looking active execution without its exact pending operation fails closed",
      503
    );
    const stopResult = await service.actOnConversation(executing.conversationId, {
      action: "stop-turn",
      expectedRevision: executing.revision,
    }, "jarvis-chat-stop-inflight-v1");
    assert(stopResult.conversation.state === "stopping", "Stop records an honest intermediate state while provider work may continue");
    releaseStoppedGeneration();
    const stopped = await stoppedExecutePromise;
    assert(stopped.conversation.state === "stopped" && stopped.conversation.turns.at(-1).assistantMessage === null, "stopped execution discards the in-flight provider output");
    assert(availabilityCalls === 2 && generationCalls === 2, "stopped execution performs no automatic retry");

    const canceled = await service.actOnConversation(other.conversation.conversationId, {
      action: "cancel-turn",
      expectedRevision: other.conversation.revision,
      reason: "Operator canceled before provider execution.",
    }, "jarvis-chat-cancel-other-v1");
    assert(canceled.conversation.state === "canceled" && canceled.conversation.turns[0].assistantMessage === null, "cancel prevents an unexecuted run from producing a response");
    assert(generationCalls === 2, "cancel performs no provider generation");

    let interruptedOnce = false;
    const interruptedPersistence = {
      ...persistence,
      async commitConversation(input) {
        if (!interruptedOnce && input.expected.pendingOperation?.action === "create_conversation" && input.next.state === "awaiting_approval") {
          interruptedOnce = true;
          throw new Error("Injected crash after run binding and before chat completion publication.");
        }
        return persistence.commitConversation(input);
      },
    };
    const interruptedService = serviceModule.createJarvisChatService({ persistence: interruptedPersistence, lifecycle });
    let interrupted = false;
    try {
      await interruptedService.createConversation({ message: "Recover this exact interrupted binding." }, "jarvis-chat-create-recovery-v1");
    } catch (error) {
      interrupted = error?.message?.includes("Injected crash") === true;
    }
    assert(interrupted, "deterministic crash leaves one durable recoverable operation intent");
    const recoverySummary = (await service.listConversations(20)).find((entry) => entry.title.startsWith("Recover this exact"));
    assert(recoverySummary && recoverySummary.state === "binding", "restart listing exposes the exact interrupted binding state");
    const recovered = await service.actOnConversation(recoverySummary.conversationId, {
      action: "recover-turn",
      expectedRevision: recoverySummary.revision,
    }, "jarvis-chat-recover-binding-v1");
    assert(recovered.conversation.state === "awaiting_approval" && recovered.conversation.pendingOperation === null, "explicit recovery reconciles the exact bound run after restart");
    assert(recovered.conversation.auditEvents.some((entry) => entry.eventType === "turn.recovery_requested") && recovered.conversation.auditEvents.some((entry) => entry.eventType === "turn.reconciled"), "recovery records bounded request and reconciliation audit evidence");
    assert(generationCalls === 2, "binding recovery creates no provider attempt");

    const recoveryApproved = await service.actOnConversation(recovered.conversation.conversationId, {
      action: "approve-turn",
      expectedRevision: recovered.conversation.revision,
      approvalScopeHash: recovered.conversation.turns[0].runBinding.approvalScopeHash,
      acknowledgement: true,
    }, "jarvis-chat-recovery-approve-v1");
    let lostExecutionCompletion = false;
    const completionLossPersistence = {
      ...persistence,
      async commitConversation(input) {
        if (
          !lostExecutionCompletion &&
          input.expected.state === "executing" &&
          input.expected.pendingOperation?.action === "execute_turn" &&
          input.next.state === "ready" &&
          input.next.pendingOperation === null
        ) {
          lostExecutionCompletion = true;
          throw new Error("Injected crash after provider success and before chat completion publication.");
        }
        return persistence.commitConversation(input);
      },
    };
    const completionLossService = serviceModule.createJarvisChatService({ persistence: completionLossPersistence, lifecycle });
    let completionInterrupted = false;
    try {
      await completionLossService.actOnConversation(recoveryApproved.conversation.conversationId, {
        action: "execute-turn",
        expectedRevision: recoveryApproved.conversation.revision,
        approvalScopeHash: recoveryApproved.conversation.turns[0].runBinding.approvalScopeHash,
        acknowledgement: true,
      }, "jarvis-chat-recovery-execute-v1");
    } catch (error) {
      completionInterrupted = error?.message?.includes("Injected crash after provider success") === true;
    }
    assert(completionInterrupted && availabilityCalls === 3 && generationCalls === 3, "lost completion response leaves one exact executed run and durable execution intent");
    const executingAfterRestart = await service.getConversation(recovered.conversation.conversationId);
    assert(executingAfterRestart.state === "executing" && executingAfterRestart.pendingOperation?.action === "execute_turn", "restart preserves the exact unresolved execution intent");
    const recoveredExecution = await service.actOnConversation(executingAfterRestart.conversationId, {
      action: "recover-turn",
      expectedRevision: executingAfterRestart.revision,
    }, "jarvis-chat-recover-execution-v1");
    assert(recoveredExecution.conversation.state === "ready" && recoveredExecution.conversation.turns[0].assistantMessage?.text === "One response recovered from the exact completed run.", "explicit recovery accepts the exact already-completed run response");
    assert(availabilityCalls === 3 && generationCalls === 3, "execution recovery performs no second provider attempt");

    const reloadedService = serviceModule.createJarvisChatService({ persistence, lifecycle });
    const reloaded = await reloadedService.getConversation(stopped.conversation.conversationId);
    assert(reloaded.recordDigest === stopped.conversation.recordDigest, "fresh service instance recovers the exact durable conversation after restart");
    const rollbackService = serviceModule.createJarvisChatService({ persistence, lifecycle, now: () => Date.parse("2000-01-01T00:00:00.000Z") });
    const renamed = await rollbackService.actOnConversation(reloaded.conversationId, {
      action: "rename-conversation",
      expectedRevision: reloaded.revision,
      title: "Renamed local-first chat",
    }, "jarvis-chat-rename-rollback-v1");
    assert(renamed.conversation.title === "Renamed local-first chat" && Date.parse(renamed.conversation.updatedAt) > Date.parse(reloaded.updatedAt), "persisted timestamps remain nondecreasing through wall-clock rollback");

    await expectFailure(
      () => service.createConversation({ message: "Keep sk-ABCDEFGHIJKLMNOPQRSTUVWX outside persistence." }, "jarvis-chat-secret-input-v1"),
      "secret_like_content_rejected",
      "secret-like user text is rejected before persistence",
      422
    );
    const invalid = await service.createConversation({ message: "Return a bounded response that the fixture will make unsafe." }, "jarvis-chat-invalid-output-v1");
    const invalidApproved = await service.actOnConversation(invalid.conversation.conversationId, {
      action: "approve-turn",
      expectedRevision: invalid.conversation.revision,
      approvalScopeHash: invalid.conversation.turns[0].runBinding.approvalScopeHash,
      acknowledgement: true,
    }, "jarvis-chat-invalid-output-approve-v1");
    const invalidExecuted = await service.actOnConversation(invalid.conversation.conversationId, {
      action: "execute-turn",
      expectedRevision: invalidApproved.conversation.revision,
      approvalScopeHash: invalidApproved.conversation.turns[0].runBinding.approvalScopeHash,
      acknowledgement: true,
    }, "jarvis-chat-invalid-output-execute-v1");
    assert(["failed", "rejected"].includes(invalidExecuted.conversation.state) && invalidExecuted.conversation.turns[0].assistantMessage === null, "unsafe provider output reaches a durable safe terminal state with no assistant message");
    const persistedText = await readAllOwnedText(testRoot);
    assert(!persistedText.includes("sk-ABCDEFGHIJKLMNOPQRSTUVWX"), "unsafe provider output bytes are absent from local persistence");
    assert(availabilityCalls === 4 && generationCalls === 4, "unsafe output handling performs one attempt with no retry or fallback");

    const genericStore = storeModule.createPrivateAlphaStoreForTesting(suffix, { runtimeProfile: "local-ollama", providerAdapter: provider });
    const genericRuns = await genericStore.listRuns("50");
    assert(!genericRuns.some((run) => run.runId === firstTurn.runBinding.sourceRunId), "generic Private Alpha listing excludes chat-owned runs");
    let genericReadHidden = false;
    try { await genericStore.getRun(firstTurn.runBinding.sourceRunId); } catch (error) { genericReadHidden = error?.status === 404; }
    assert(genericReadHidden, "generic Private Alpha read reports a chat-owned run as absent");
    let genericControlBlocked = false;
    try {
      await genericStore.cancelRun(firstTurn.runBinding.sourceRunId, { expectedRevision: 1, reason: "Generic control must fail." });
    } catch (error) {
      genericControlBlocked = error?.status === 409;
    }
    assert(genericControlBlocked && generationCalls === 4, "generic Private Alpha control cannot mutate a chat-owned run");

    const deleteBody = {
      action: "delete-conversation",
      expectedRevision: renamed.conversation.revision,
      confirmationConversationId: renamed.conversation.conversationId,
    };
    const deleted = await service.actOnConversation(renamed.conversation.conversationId, deleteBody, "jarvis-chat-delete-primary-v1");
    assert(deleted.deleted && /^[a-f0-9]{24}$/u.test(deleted.deletionAuditId) && /^[a-f0-9]{64}$/u.test(deleted.tombstoneDigest), "confirmed delete returns exact durable tombstone and audit identities");
    assert(deleted.deletionEvent.eventType === "conversation.deleted" && deleted.deletionEvent.summary.includes("any separately retained bounded Private Alpha run or audit provenance is unchanged"), "deletion result honestly records the conditional unchanged-provenance boundary");
    const deleteReplay = await service.actOnConversation(renamed.conversation.conversationId, deleteBody, "jarvis-chat-delete-primary-v1");
    assert(deleteReplay.replayed && deleteReplay.tombstoneDigest === deleted.tombstoneDigest && deleteReplay.deletionAuditId === deleted.deletionAuditId, "delete retry returns the exact canonical tombstone evidence");
    await expectFailure(
      () => service.getConversation(renamed.conversation.conversationId),
      "conversation_not_found",
      "deleted conversation history is no longer loadable",
      404
    );
    const retainedRun = await lifecycle.getRun({
      conversationId: renamed.conversation.conversationId,
      turnId: firstTurn.turnId,
      ownershipBindingId: firstTurn.ownershipBindingId,
      runId: firstTurn.runBinding.sourceRunId,
    });
    assert(retainedRun.runId === firstTurn.runBinding.sourceRunId && retainedRun.ownership.kind === "chat", "bounded chat-owned Private Alpha provenance remains exactly retrievable after conversation deletion");

    const deletionRaceBody = {
      action: "delete-conversation",
      expectedRevision: canceled.conversation.revision,
      confirmationConversationId: canceled.conversation.conversationId,
    };
    const deletionRaceKey = "jarvis-chat-delete-post-preflight-race-v1";
    const deletionRaceResumeTuples = [];
    let deletionRaceConcurrentResult = null;
    let deletionRaceWrapperDeleteCalls = 0;
    const deletionRacePersistence = {
      ...persistence,
      async getDeletionTombstone(conversationId, resume) {
        if (conversationId !== canceled.conversation.conversationId) {
          return persistence.getDeletionTombstone(conversationId, resume);
        }
        deletionRaceResumeTuples.push(JSON.stringify(resume));
        if (deletionRaceResumeTuples.length === 1) {
          const capturedPreflight = await persistence.getDeletionTombstone(conversationId, resume);
          assert(capturedPreflight === null, "deletion race begins from one exact preflight-null tombstone read");
          deletionRaceConcurrentResult = await service.actOnConversation(conversationId, deletionRaceBody, deletionRaceKey);
          return capturedPreflight;
        }
        return persistence.getDeletionTombstone(conversationId, resume);
      },
      async deleteConversation(input) {
        deletionRaceWrapperDeleteCalls += 1;
        return persistence.deleteConversation(input);
      },
    };
    const deletionRaceService = serviceModule.createJarvisChatService({ persistence: deletionRacePersistence, lifecycle });

    const deleteCommitRaceCreated = await service.createConversation(
      { message: "Prove exact deletion replay when the winner completes between conflict reads." },
      "jarvis-chat-delete-commit-race-create-v1"
    );
    const deleteCommitRaceCanceled = await service.actOnConversation(
      deleteCommitRaceCreated.conversation.conversationId,
      {
        action: "cancel-turn",
        expectedRevision: deleteCommitRaceCreated.conversation.revision,
        reason: "Keep the deterministic conflict-reconciliation fixture unexecuted.",
      },
      "jarvis-chat-delete-commit-race-cancel-v1"
    );
    const deleteCommitRaceBody = {
      action: "delete-conversation",
      expectedRevision: deleteCommitRaceCanceled.conversation.revision,
      confirmationConversationId: deleteCommitRaceCanceled.conversation.conversationId,
    };
    const deleteCommitRaceKey = "jarvis-chat-delete-commit-race-delete-v1";
    let deleteCommitConflictInjected = false;
    let deleteCommitTombstoneReads = 0;
    let deleteCommitWinner = null;
    let deleteCommitWrapperDeleteCalls = 0;
    const deleteCommitRacePersistence = {
      ...persistence,
      async commitConversation(input) {
        if (
          !deleteCommitConflictInjected &&
          input.next.conversationId === deleteCommitRaceCanceled.conversation.conversationId &&
          input.next.state === "deleting"
        ) {
          deleteCommitConflictInjected = true;
          throw new policyModule.JarvisChatPolicyError(
            409,
            "revision_conflict",
            "Deterministic deletion-intent conflict before exact tombstone reconciliation."
          );
        }
        return persistence.commitConversation(input);
      },
      async getDeletionTombstone(conversationId, resume) {
        if (conversationId !== deleteCommitRaceCanceled.conversation.conversationId) {
          return persistence.getDeletionTombstone(conversationId, resume);
        }
        deleteCommitTombstoneReads += 1;
        if (deleteCommitTombstoneReads === 2) {
          const beforeWinner = await persistence.getDeletionTombstone(conversationId, resume);
          assert(beforeWinner === null, "delete-conflict reconciliation observes no tombstone before the exact winner publishes");
          deleteCommitWinner = await service.actOnConversation(
            conversationId,
            deleteCommitRaceBody,
            deleteCommitRaceKey
          );
          return beforeWinner;
        }
        return persistence.getDeletionTombstone(conversationId, resume);
      },
      async deleteConversation(input) {
        deleteCommitWrapperDeleteCalls += 1;
        return persistence.deleteConversation(input);
      },
    };
    const deleteCommitRaceService = serviceModule.createJarvisChatService({
      persistence: deleteCommitRacePersistence,
      lifecycle,
    });
    const deleteCommitRaceReplay = await deleteCommitRaceService.actOnConversation(
      deleteCommitRaceCanceled.conversation.conversationId,
      deleteCommitRaceBody,
      deleteCommitRaceKey
    );
    assert(deleteCommitWinner?.replayed === false && deleteCommitRaceReplay.replayed === true, "duplicate delete returns canonical replay when the winner removes the tree between conflict reconciliation reads");
    assert(deleteCommitRaceReplay.tombstoneDigest === deleteCommitWinner.tombstoneDigest && deleteCommitRaceReplay.deletionAuditId === deleteCommitWinner.deletionAuditId && deleteCommitTombstoneReads === 3 && deleteCommitWrapperDeleteCalls === 0, "delete-conflict readback reuses the exact tombstone and performs no second deletion mutation");

    const deleteCompletionRaceCreated = await service.createConversation(
      { message: "Prove the deletion-intent owner reconciles an exact concurrent completion." },
      "jarvis-chat-delete-completion-race-create-v1"
    );
    const deleteCompletionRaceCanceled = await service.actOnConversation(
      deleteCompletionRaceCreated.conversation.conversationId,
      {
        action: "cancel-turn",
        expectedRevision: deleteCompletionRaceCreated.conversation.revision,
        reason: "Keep the exact deletion-completion fixture unexecuted.",
      },
      "jarvis-chat-delete-completion-race-cancel-v1"
    );
    const deleteCompletionRaceBody = {
      action: "delete-conversation",
      expectedRevision: deleteCompletionRaceCanceled.conversation.revision,
      confirmationConversationId: deleteCompletionRaceCanceled.conversation.conversationId,
    };
    const deleteCompletionRaceKey = "jarvis-chat-delete-completion-race-delete-v1";
    let deleteCompletionConflictInjected = false;
    let deleteCompletionWinner = null;
    const deleteCompletionRacePersistence = {
      ...persistence,
      async deleteConversation(input) {
        if (
          !deleteCompletionConflictInjected &&
          input.expected.conversationId === deleteCompletionRaceCanceled.conversation.conversationId
        ) {
          deleteCompletionConflictInjected = true;
          deleteCompletionWinner = await service.actOnConversation(
            input.expected.conversationId,
            deleteCompletionRaceBody,
            deleteCompletionRaceKey
          );
          throw new policyModule.JarvisChatPolicyError(
            409,
            "revision_conflict",
            "Deterministic contention after the exact deletion intent was published."
          );
        }
        return persistence.deleteConversation(input);
      },
    };
    const deleteCompletionRaceService = serviceModule.createJarvisChatService({
      persistence: deleteCompletionRacePersistence,
      lifecycle,
    });
    const deleteCompletionOriginal = await deleteCompletionRaceService.actOnConversation(
      deleteCompletionRaceCanceled.conversation.conversationId,
      deleteCompletionRaceBody,
      deleteCompletionRaceKey
    );
    assert(deleteCompletionConflictInjected && deleteCompletionOriginal.replayed === false && deleteCompletionWinner?.replayed === true, "the exact deletion-intent owner remains the one original response when a matching request completes publication");
    assert(deleteCompletionOriginal.tombstoneDigest === deleteCompletionWinner.tombstoneDigest && deleteCompletionOriginal.deletionAuditId === deleteCompletionWinner.deletionAuditId, "post-intent deletion contention reconciles the exact immutable tombstone instead of surfacing a retry conflict");

    let deletionCrashInjected = false;
    let recoveryContentionInjected = false;
    const deletionRecoveryPersistence = persistenceModule.createJarvisChatPersistenceForTesting(
      deletionRecoverySuffix,
      {
        afterDeletionSlotMarkedDeleting() {
          if (deletionCrashInjected) return;
          deletionCrashInjected = true;
          throw new Error("Deterministic crash after deletion slot publication.");
        },
        afterDeletionRecoveryClaimed() {
          if (recoveryContentionInjected) return;
          recoveryContentionInjected = true;
          throw new nativeFilesystemModule.PrivateAlphaNativeFilesystemError(
            "conflict",
            "Deterministic contention after recovery claim publication."
          );
        },
      }
    );
    const deletionRecoveryLifecycle = {
      async bindRun() {
        throw new Error("Deterministic binding refusal leaves one safely terminal chat.");
      },
      async recoverBoundRun() { return null; },
      async getRun() { throw new Error("Deletion recovery fixture forbids run reads."); },
      async approveRun() { throw new Error("Deletion recovery fixture forbids approval."); },
      async executeRun() { throw new Error("Deletion recovery fixture forbids execution."); },
      async cancelRun() { throw new Error("Deletion recovery fixture forbids cancellation."); },
      async reconcileRun() { throw new Error("Deletion recovery fixture forbids run reconciliation."); },
      async readKillSwitch() { return { killSwitchEngaged: false, source: "absent", safeMessage: "No deterministic kill switch is engaged." }; },
    };
    const deletionRecoveryService = serviceModule.createJarvisChatService({
      persistence: deletionRecoveryPersistence,
      lifecycle: deletionRecoveryLifecycle,
    });
    const deletionRecoveryCreated = await deletionRecoveryService.createConversation(
      { message: "Exercise exact deletion recovery classification after a durable crash window." },
      "jarvis-chat-deletion-recovery-create-v1"
    );
    assert(deletionRecoveryCreated.conversation.state === "failed", "deletion recovery fixture starts from one safely terminal failed binding with no provider run");
    const deletionRecoveryDeleteBody = {
      action: "delete-conversation",
      expectedRevision: deletionRecoveryCreated.conversation.revision,
      confirmationConversationId: deletionRecoveryCreated.conversation.conversationId,
    };
    let deletionCrashObserved = false;
    try {
      await deletionRecoveryService.actOnConversation(
        deletionRecoveryCreated.conversation.conversationId,
        deletionRecoveryDeleteBody,
        "jarvis-chat-deletion-recovery-delete-v1"
      );
    } catch (error) {
      deletionCrashObserved = error?.message === "Deterministic crash after deletion slot publication.";
    }
    assert(deletionCrashObserved, "deletion fault window leaves the exact committed deletion intent recoverable");
    assert(deletionCrashInjected, "deletion fault is injected only after the slot enters its durable deleting state");
    const deletionRecoveryBody = {
      action: "recover-turn",
      expectedRevision: deletionRecoveryCreated.conversation.revision + 1,
    };
    const deletionRecoveryKey = "jarvis-chat-deletion-recovery-recover-v1";
    const deletionRecovered = await deletionRecoveryService.actOnConversation(
      deletionRecoveryCreated.conversation.conversationId,
      deletionRecoveryBody,
      deletionRecoveryKey
    );
    assert(recoveryContentionInjected && deletionRecovered.deleted && deletionRecovered.replayed === false, "the call that durably claims deletion recovery remains classified as original after a retryable post-claim contention fault");
    const deletionRecoveryReplay = await deletionRecoveryService.actOnConversation(
      deletionRecoveryCreated.conversation.conversationId,
      deletionRecoveryBody,
      deletionRecoveryKey
    );
    assert(deletionRecoveryReplay.replayed === true && deletionRecoveryReplay.tombstoneDigest === deletionRecovered.tombstoneDigest && deletionRecoveryReplay.deletionAuditId === deletionRecovered.deletionAuditId && deletionRecoveryReplay.deletedAt === deletionRecovered.deletedAt, "the subsequent exact deletion-recovery retry is canonical replay of the immutable tombstone evidence");
    await expectFailure(
      () => deletionRecoveryService.actOnConversation(
        deletionRecoveryCreated.conversation.conversationId,
        deletionRecoveryBody,
        "jarvis-chat-deletion-recovery-competing-v1"
      ),
      "idempotency_conflict",
      "a distinct recovery key cannot steal the completed deletion recovery",
      409
    );
    await deletionRecoveryPersistence.cleanupTestData();

    const corruptionPersistence = persistenceModule.createJarvisChatPersistenceForTesting(corruptionSuffix);
    const corruptionLifecycle = {
      async bindRun(input) {
        return {
          runId: crypto.createHash("sha256").update(`corruption-run\0${input.conversationId}\0${input.turnId}`).digest("hex").slice(0, 24),
          revision: 1,
          state: "awaiting_approval",
          approvalScopeHash: crypto.createHash("sha256").update(`corruption-scope\0${input.ownershipBindingId}`).digest("hex"),
        };
      },
      async recoverBoundRun() { return null; },
      async getRun() { throw new Error("Corruption boundary forbids run reads."); },
      async approveRun() { throw new Error("Corruption boundary forbids approval."); },
      async executeRun() { throw new Error("Corruption boundary forbids execution."); },
      async cancelRun() { throw new Error("Corruption boundary forbids cancellation."); },
      async reconcileRun() { throw new Error("Corruption boundary forbids recovery."); },
      async readKillSwitch() { return { killSwitchEngaged: false, source: "absent", safeMessage: "No deterministic kill switch is engaged." }; },
    };
    const corruptionService = serviceModule.createJarvisChatService({ persistence: corruptionPersistence, lifecycle: corruptionLifecycle });
    const corruptPublished = await corruptionService.createConversation(
      { message: "Publish one conversation before deterministic stable-corruption injection." },
      "jarvis-chat-corruption-create-v1"
    );
    const corruptConversationId = corruptPublished.conversation.conversationId;
    const corruptionDataRootLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(corruptionSuffix);
    const hostileSlotSegments = ["jarvis-chat", "slots", ".stable-hostile.tmp"];
    const hostileSlotBytes = Buffer.from("stable hostile slot inventory evidence\n");
    nativeFilesystemModule.withPrivateAlphaNativeRoot(corruptionDataRootLabel, (root) => {
      root.writeAtomicExclusive(
        hostileSlotSegments,
        ".stable-hostile-stage.tmp",
        hostileSlotBytes
      );
    });
    await expectFailure(
      () => corruptionPersistence.listConversations(20),
      "chat_persistence_invalid",
      "stable temp-shaped slot inventory is rejected instead of filtered or retried",
      503
    );
    nativeFilesystemModule.withPrivateAlphaNativeRoot(corruptionDataRootLabel, (root) => {
      root.compareDeleteExact(hostileSlotSegments, hostileSlotBytes);
    });
    nativeFilesystemModule.withPrivateAlphaNativeRoot(corruptionDataRootLabel, (root) => {
      root.removeTree(["jarvis-chat", "conversations", corruptConversationId]);
    });
    await expectFailure(
      () => corruptionPersistence.getConversation(corruptConversationId),
      "chat_persistence_invalid",
      "stable published slot with a missing conversation tree fails closed on exact get",
      503
    );
    await expectFailure(
      () => corruptionPersistence.getConversationRevision(corruptConversationId, 1),
      "chat_persistence_invalid",
      "stable published slot with a missing required immutable revision fails closed on exact revision get",
      503
    );
    await expectFailure(
      () => corruptionPersistence.listConversations(20),
      "chat_persistence_invalid",
      "stable published slot with a missing conversation tree fails closed on list",
      503
    );
    await corruptionPersistence.cleanupTestData();

    const origin = "http://127.0.0.1:3000";
    const authority = "127.0.0.1:3000";
    const internalOrigin = "http://localhost:3100";
    process.env.CODEXFORGE_JARVIS_CHAT_DETERMINISTIC_TEST_MODE = "1";
    process.env.CODEXFORGE_JARVIS_CHAT_DETERMINISTIC_TEST_SUFFIX = httpSuffix;
    const listener = net.createServer();
    listener.address = () => ({ address: "127.0.0.1", family: "IPv4", port: 3000 });
    const originalGetActiveHandles = process._getActiveHandles;
    process._getActiveHandles = () => [listener];
    try {
      assert(listener.address().address === "127.0.0.1", "HTTP contract test exposes one deterministic loopback listener handle without opening a socket");
      const conversationsRoute = require(path.join(repoRoot, "src/app/api/codexforge/jarvis-chat/conversations/route.ts"));
      const conversationRoute = require(path.join(repoRoot, "src/app/api/codexforge/jarvis-chat/conversations/[conversationId]/route.ts"));
      const actionsRoute = require(path.join(repoRoot, "src/app/api/codexforge/jarvis-chat/conversations/[conversationId]/actions/route.ts"));
      const statusRoute = require(path.join(repoRoot, "src/app/api/codexforge/jarvis-chat/status/route.ts"));
      const mutationHeaders = {
        Host: authority,
        Origin: origin,
        "Sec-Fetch-Site": "same-origin",
        "Content-Type": "application/json",
        "Idempotency-Key": "jarvis-chat-http-create-v1",
      };
      const createResponse = await conversationsRoute.POST(new Request(`${origin}/api/codexforge/jarvis-chat/conversations`, {
        method: "POST",
        headers: mutationHeaders,
        body: JSON.stringify({ message: "Create through the actual Next route export." }),
      }));
      const createPayload = await createResponse.json();
      assert(createResponse.status === 201 && createPayload.ok === true && createPayload.result.conversation.state === "awaiting_approval", "actual Next create route accepts one exact same-origin JSON mutation without provider execution");
      assert(createResponse.headers.get("cache-control") === "no-store" && createResponse.headers.get("x-content-type-options") === "nosniff" && createResponse.headers.get("content-security-policy") === "default-src 'none'; sandbox", "chat API responses enforce no-store, nosniff, and restrictive CSP headers");
      const httpConversation = createPayload.result.conversation;
      const replayResponse = await conversationsRoute.POST(new Request(`${origin}/api/codexforge/jarvis-chat/conversations`, {
        method: "POST",
        headers: mutationHeaders,
        body: JSON.stringify({ message: "Create through the actual Next route export." }),
      }));
      const replayPayload = await replayResponse.json();
      assert(replayResponse.status === 201 && replayPayload.result.replayed === true && replayPayload.result.conversation.recordDigest === httpConversation.recordDigest, "actual Next route preserves the original 201 status and canonical payload on create replay");
      const responseLossClient = require(path.join(repoRoot, "src/lib/codexforge/jarvis-chat/jarvis-chat-api-client.ts"));
      const routeBoundaryFetch = global.fetch;
      try {
        async function postClientCreateThroughRoute(target, init) {
          const headers = new Headers(init.headers);
          headers.set("Host", authority);
          headers.set("Origin", origin);
          headers.set("Sec-Fetch-Site", "same-origin");
          return {
            key: headers.get("Idempotency-Key"),
            response: await conversationsRoute.POST(new Request(`${origin}${target}`, { ...init, headers })),
          };
        }

        async function assertAmbiguousCreateRetry(input, expectedCode, expectedStatus, syntheticResponse, label) {
          const keys = [];
          const routeReplayFlags = [];
          let calls = 0;
          global.fetch = async (target, init = {}) => {
            calls += 1;
            const actual = await postClientCreateThroughRoute(target, init);
            keys.push(actual.key);
            const actualPayload = await actual.response.clone().json();
            routeReplayFlags.push(actualPayload.result.replayed);
            return calls === 1 ? syntheticResponse() : actual.response;
          };
          await expectFailure(
            () => responseLossClient.createJarvisChatConversation(input),
            expectedCode,
            `${label} keeps the exact current request uncertain`,
            expectedStatus
          );
          const replay = await responseLossClient.createJarvisChatConversation(input);
          assert(replay.replayed && replay.responseStatus === 201, `${label} retries through the actual route as one canonical replay`);
          assert(calls === 2 && keys[0] === keys[1] && routeReplayFlags.join(",") === "false,true", `${label} retains one exact client key and creates no duplicate server response`);
        }

        await assertAmbiguousCreateRetry(
          { message: "Reconcile one server-published response after an ambiguous HTTP 500." },
          "internal_failure",
          500,
          () => new Response(JSON.stringify({ ok: false, error: { code: "internal_failure", message: "Ambiguous server result." } }), { status: 500, headers: { "Content-Type": "application/json" } }),
          "ambiguous HTTP 500"
        );
        await assertAmbiguousCreateRetry(
          { message: "Reconcile one server-published concurrent create conflict." },
          "concurrent_create_conflict",
          409,
          () => new Response(JSON.stringify({ ok: false, error: { code: "concurrent_create_conflict", message: "Concurrent publication outcome is uncertain." } }), { status: 409, headers: { "Content-Type": "application/json" } }),
          "concurrent-create conflict"
        );
        await assertAmbiguousCreateRetry(
          { message: "Reconcile one server-published lifecycle conflict with an uncertain outcome." },
          "lifecycle_conflict",
          409,
          () => new Response(JSON.stringify({ ok: false, error: { code: "lifecycle_conflict", message: "Lifecycle publication outcome is uncertain." } }), { status: 409, headers: { "Content-Type": "application/json" } }),
          "lifecycle conflict"
        );

        const olderInput = { message: "Older uncertain create action with its own exact signature." };
        const currentInput = { message: "Current uncertain create action with a different exact signature." };
        const signatureCalls = new Map();
        const signatureKeys = new Map();
        const publishedByMessage = new Map();
        global.fetch = async (target, init = {}) => {
          const parsed = JSON.parse(init.body);
          const message = parsed.message;
          const calls = (signatureCalls.get(message) ?? 0) + 1;
          signatureCalls.set(message, calls);
          const actual = await postClientCreateThroughRoute(target, init);
          signatureKeys.set(message, [...(signatureKeys.get(message) ?? []), actual.key]);
          const actualPayload = await actual.response.clone().json();
          publishedByMessage.set(message, actualPayload.result.conversation);
          if (calls === 1) {
            const code = message === currentInput.message ? "concurrent_create_conflict" : "internal_failure";
            const status = message === currentInput.message ? 409 : 500;
            return new Response(JSON.stringify({ ok: false, error: { code, message: "Exact response remains uncertain." } }), { status, headers: { "Content-Type": "application/json" } });
          }
          return actual.response;
        };
        await expectFailure(() => responseLossClient.createJarvisChatConversation(olderInput), "internal_failure", "older same-action HTTP 500 remains retained by its exact signature", 500);
        await expectFailure(() => responseLossClient.createJarvisChatConversation(currentInput), "concurrent_create_conflict", "current same-action conflict remains retained by its distinct exact signature", 409);
        const currentSignature = responseLossClient.buildJarvisChatMutationSignature(null, currentInput);
        const olderSignature = responseLossClient.buildJarvisChatMutationSignature(null, olderInput);
        const exactReconciliation = await responseLossClient.reconcileJarvisChatRetainedMutations(publishedByMessage.get(currentInput.message));
        assert(exactReconciliation.retiredCount === 1 && exactReconciliation.retiredSignatures[0] === currentSignature && !exactReconciliation.retiredSignatures.includes(olderSignature), "durable reconciliation retires only the exact current signature, never an older same-action request");
        const olderReplay = await responseLossClient.createJarvisChatConversation(olderInput);
        const olderKeys = signatureKeys.get(olderInput.message);
        assert(olderReplay.replayed && olderKeys.length === 2 && olderKeys[0] === olderKeys[1], "older same-action retained request remains independently replayable with its original key");
      } finally {
        global.fetch = routeBoundaryFetch;
      }
      const listResponse = await conversationsRoute.GET(new Request(`${origin}/api/codexforge/jarvis-chat/conversations?limit=20`, { headers: { Host: authority } }));
      const listPayload = await listResponse.json();
      assert(listResponse.status === 200 && listPayload.result.some((entry) => entry.conversationId === httpConversation.conversationId), "actual Next list route returns the exact API-created conversation");
      const webpackAuthorityList = await conversationsRoute.GET(new Request(`${internalOrigin}/api/codexforge/jarvis-chat/conversations?limit=1`, { headers: { Host: authority, Origin: origin } }));
      const webpackAuthorityPayload = await webpackAuthorityList.json();
      assert(webpackAuthorityList.status === 200 && webpackAuthorityPayload.result.length === 1, "actual Next list route trusts the validated browser Host authority and limit when internal Webpack Request.url differs");
      const duplicateLimit = await conversationsRoute.GET(new Request(`${internalOrigin}/api/codexforge/jarvis-chat/conversations?limit=1&limit=2`, { headers: { Host: authority } }));
      assert(duplicateLimit.status === 400 && (await duplicateLimit.json()).error.code === "invalid_request", "actual Next list route rejects duplicate limit parameters under differing internal authority");
      const unknownQuery = await conversationsRoute.GET(new Request(`${internalOrigin}/api/codexforge/jarvis-chat/conversations?unexpected=1`, { headers: { Host: authority } }));
      assert(unknownQuery.status === 400 && (await unknownQuery.json()).error.code === "invalid_request", "actual Next list route rejects unknown query parameters under differing internal authority");
      const loadResponse = await conversationRoute.GET(new Request(`${origin}/api/codexforge/jarvis-chat/conversations/${httpConversation.conversationId}`, { headers: { Host: authority } }), { params: Promise.resolve({ conversationId: httpConversation.conversationId }) });
      assert(loadResponse.status === 200 && (await loadResponse.json()).result.recordDigest === httpConversation.recordDigest, "actual Next load route preserves exact conversation identity and digest");
      const statusResponse = await statusRoute.GET(new Request(`${origin}/api/codexforge/jarvis-chat/status`, { headers: { Host: authority } }));
      const statusPayload = await statusResponse.json();
      assert(statusResponse.status === 200 && statusPayload.result.providerAvailability === "not-checked", "actual Next status route does not probe the deterministic provider");

      const mismatchedOrigin = await conversationsRoute.POST(new Request(`${origin}/api/codexforge/jarvis-chat/conversations`, {
        method: "POST",
        headers: { ...mutationHeaders, Origin: "http://127.0.0.1:9", "Idempotency-Key": "jarvis-chat-http-origin-v1" },
        body: JSON.stringify({ message: "Must fail before persistence." }),
      }));
      assert(mismatchedOrigin.status === 403 && (await mismatchedOrigin.json()).error.code === "origin_forbidden", "mismatched mutation Origin is rejected with stable 403 classification");
      const wrongType = await conversationsRoute.POST(new Request(`${origin}/api/codexforge/jarvis-chat/conversations`, {
        method: "POST",
        headers: { ...mutationHeaders, "Content-Type": "text/plain", "Idempotency-Key": "jarvis-chat-http-type-v1" },
        body: JSON.stringify({ message: "Wrong content type." }),
      }));
      assert(wrongType.status === 415 && (await wrongType.json()).error.code === "content_type_required", "non-JSON chat mutation is rejected with 415");
      const oversized = await conversationsRoute.POST(new Request(`${origin}/api/codexforge/jarvis-chat/conversations`, {
        method: "POST",
        headers: { ...mutationHeaders, "Content-Length": "16385", "Idempotency-Key": "jarvis-chat-http-oversize-v1" },
        body: JSON.stringify({ message: "Declared body is outside the envelope." }),
      }));
      assert(oversized.status === 413 && (await oversized.json()).error.code === "body_too_large", "declared chat body above the exact byte limit is rejected before parsing");
      const duplicateJson = await conversationsRoute.POST(new Request(`${origin}/api/codexforge/jarvis-chat/conversations`, {
        method: "POST",
        headers: { ...mutationHeaders, "Idempotency-Key": "jarvis-chat-http-duplicate-v1" },
        body: '{"message":"one","message":"two"}',
      }));
      assert(duplicateJson.status === 400 && (await duplicateJson.json()).error.code === "invalid_request", "ambiguous duplicate JSON keys are rejected");
      const invalidHost = await conversationsRoute.POST(new Request(`${origin}/api/codexforge/jarvis-chat/conversations`, {
        method: "POST",
        headers: { ...mutationHeaders, Host: "127.0.0.1:9", "Idempotency-Key": "jarvis-chat-http-host-v1" },
        body: JSON.stringify({ message: "Spoofed Host must fail." }),
      }));
      assert(invalidHost.status === 403 && (await invalidHost.json()).error.code === "origin_forbidden", "alternate loopback Host fails the exact Origin match closed without persistence or exception leakage");
      const missingMatch = await actionsRoute.POST(new Request(`${origin}/api/codexforge/jarvis-chat/conversations/${httpConversation.conversationId}/actions`, {
        method: "POST",
        headers: { ...mutationHeaders, "Idempotency-Key": "jarvis-chat-http-no-match-v1" },
        body: JSON.stringify({ action: "cancel-turn", expectedRevision: httpConversation.revision, reason: "No If-Match." }),
      }), { params: Promise.resolve({ conversationId: httpConversation.conversationId }) });
      assert(missingMatch.status === 409 && (await missingMatch.json()).error.code === "revision_conflict", "existing-conversation mutation requires exact If-Match revision");
      const canceledHttp = await actionsRoute.POST(new Request(`${origin}/api/codexforge/jarvis-chat/conversations/${httpConversation.conversationId}/actions`, {
        method: "POST",
        headers: { ...mutationHeaders, "Idempotency-Key": "jarvis-chat-http-cancel-v1", "If-Match": `"${httpConversation.revision}"` },
        body: JSON.stringify({ action: "cancel-turn", expectedRevision: httpConversation.revision, reason: "Explicit API cancellation." }),
      }), { params: Promise.resolve({ conversationId: httpConversation.conversationId }) });
      assert(canceledHttp.status === 200 && (await canceledHttp.json()).result.conversation.state === "canceled", "actual Next action route performs exact revision-bound cancellation without provider execution");

      const actionsRoutePath = path.join(repoRoot, "src/app/api/codexforge/jarvis-chat/conversations/[conversationId]/actions/route.ts");
      const runtimeModulePath = path.join(repoRoot, "src/lib/codexforge/jarvis-chat/jarvis-chat-runtime.server.ts");
      const resolvedActionsRoutePath = require.resolve(actionsRoutePath);
      const resolvedRuntimeModulePath = require.resolve(runtimeModulePath);
      const routeLoad = Module._load;
      delete require.cache[resolvedActionsRoutePath];
      Module._load = function (request, parent, isMain) {
        const resolved = Module._resolveFilename(request, parent, isMain);
        if (resolved === resolvedRuntimeModulePath) {
          return { getJarvisChatRuntimeService: () => deletionRaceService };
        }
        return routeLoad.apply(this, arguments);
      };
      let deletionRaceRoute;
      try {
        deletionRaceRoute = require(actionsRoutePath);
      } finally {
        Module._load = routeLoad;
      }
      try {
        const deletionRaceResponse = await deletionRaceRoute.POST(new Request(`${origin}/api/codexforge/jarvis-chat/conversations/${canceled.conversation.conversationId}/actions`, {
          method: "POST",
          headers: {
            ...mutationHeaders,
            "Idempotency-Key": deletionRaceKey,
            "If-Match": `"${canceled.conversation.revision}"`,
          },
          body: JSON.stringify(deletionRaceBody),
        }), { params: Promise.resolve({ conversationId: canceled.conversation.conversationId }) });
        const deletionRacePayload = await deletionRaceResponse.json();
        assert(deletionRaceResponse.status === 200 && deletionRacePayload.ok === true && deletionRacePayload.result.replayed === true, "actual Next action route maps preflight-null then concurrent deletion completion to canonical 200 tombstone replay");
        assert(deletionRaceConcurrentResult?.replayed === false && deletionRacePayload.result.tombstoneDigest === deletionRaceConcurrentResult.tombstoneDigest && deletionRacePayload.result.deletionAuditId === deletionRaceConcurrentResult.deletionAuditId, "post-preflight 404 reconciliation returns the exact concurrently published tombstone rather than a new deletion");
        assert(deletionRaceResumeTuples.length === 2 && deletionRaceResumeTuples[0] === deletionRaceResumeTuples[1] && deletionRaceWrapperDeleteCalls === 0, "post-preflight reconciliation re-reads the identical resume tuple and never invokes a second delete mutation");
      } finally {
        delete require.cache[resolvedActionsRoutePath];
      }
    } finally {
      process._getActiveHandles = originalGetActiveHandles;
      delete process.env.CODEXFORGE_JARVIS_CHAT_DETERMINISTIC_TEST_MODE;
      delete process.env.CODEXFORGE_JARVIS_CHAT_DETERMINISTIC_TEST_SUFFIX;
    }

    const clientModule = require(path.join(repoRoot, "src/lib/codexforge/jarvis-chat/jarvis-chat-api-client.ts"));
    const trappedFetch = global.fetch;
    let clientFetchCalls = 0;
    try {
      global.fetch = async (_target, _init) => {
        clientFetchCalls += 1;
        return new Response(JSON.stringify({ ok: true, result: created }), { status: 201, headers: { "Content-Type": "application/json" } });
      };
      const decoded = await clientModule.createJarvisChatConversation(createBody, "jarvis-chat-client-valid-v1");
      assert(decoded.conversation.recordDigest === created.conversation.recordDigest, "strict client accepts one exact schema-valid create response");

      global.fetch = async () => new Response(JSON.stringify({ ok: false, error: { code: "revision_conflict", message: "Exact revision changed." } }), { status: 409, headers: { "Content-Type": "application/json" } });
      await expectFailure(
        () => clientModule.actOnJarvisChatConversation(created.conversation.conversationId, approvalBody, "jarvis-chat-client-error-v1"),
        "revision_conflict",
        "strict client preserves server error code and status",
        409
      );

      let definitiveConflictFetches = 0;
      for (let index = 0; index < 8; index += 1) {
        const code = index % 2 === 0 ? "revision_conflict" : "operation_conflict";
        global.fetch = async () => {
          definitiveConflictFetches += 1;
          return new Response(JSON.stringify({ ok: false, error: { code, message: "The server proved this mutation did not commit." } }), { status: 409, headers: { "Content-Type": "application/json" } });
        };
        await expectFailure(
          () => clientModule.actOnJarvisChatConversation(created.conversation.conversationId, {
            action: "rename-conversation",
            expectedRevision: 100 + index,
            title: `Definitive stale conflict ${index}`,
          }),
          code,
          `definitive stale conflict ${index + 1} is surfaced without retaining an uncertain mutation slot`,
          409
        );
      }
      global.fetch = async () => {
        definitiveConflictFetches += 1;
        return new Response(JSON.stringify({ ok: true, result: approved }), { status: 200, headers: { "Content-Type": "application/json" } });
      };
      const afterDefinitiveConflicts = await clientModule.actOnJarvisChatConversation(
        created.conversation.conversationId,
        approvalBody
      );
      assert(afterDefinitiveConflicts.conversation.recordDigest === approved.conversation.recordDigest && definitiveConflictFetches === 9, "eight definitive revision/operation conflicts do not consume the retained-key budget and a subsequent valid mutation succeeds");

      global.fetch = async () => new Response(JSON.stringify({ ok: true, result: { ...created, responseStatus: 200 } }), { status: 201, headers: { "Content-Type": "application/json" } });
      await expectFailure(
        () => clientModule.createJarvisChatConversation(createBody, "jarvis-chat-client-status-v1"),
        "malformed_server_response",
        "strict client rejects embedded replay status that contradicts HTTP",
        502
      );

      global.fetch = async () => new Response(JSON.stringify({ ok: true, result: { ...deleted, tombstoneDigest: "0".repeat(64) } }), { status: 200, headers: { "Content-Type": "application/json" } });
      const decodedDeletion = await clientModule.actOnJarvisChatConversation(deleted.conversationId, deleteBody, "jarvis-chat-client-delete-v1");
      assert(decodedDeletion.deleted && decodedDeletion.tombstoneDigest === "0".repeat(64), "strict client accepts a structurally exact deletion result without inventing server provenance");
      global.fetch = async () => new Response(JSON.stringify({ ok: true, result: { ...deleted, deletionEvent: { ...deleted.deletionEvent, auditId: "e".repeat(24) } } }), { status: 200, headers: { "Content-Type": "application/json" } });
      await expectFailure(
        () => clientModule.actOnJarvisChatConversation(deleted.conversationId, deleteBody, "jarvis-chat-client-delete-bad-v1"),
        "malformed_server_response",
        "strict client rejects inconsistent deletion audit linkage",
        502
      );
      global.fetch = async () => new Response("not-json", { status: 200, headers: { "Content-Type": "text/plain" } });
      await expectFailure(
        () => clientModule.fetchJarvisChatConversation(created.conversation.conversationId),
        "malformed_server_response",
        "strict client rejects non-JSON response content type",
        502
      );

      const redirectModes = [];
      const redirectResponses = [
        new Response(JSON.stringify({ ok: true, result: created }), { status: 201, headers: { "Content-Type": "application/json" } }),
        new Response(JSON.stringify({ ok: true, result: approved }), { status: 200, headers: { "Content-Type": "application/json" } }),
        new Response(JSON.stringify({ ok: true, result: created.conversation }), { status: 200, headers: { "Content-Type": "application/json" } }),
      ];
      global.fetch = async (_target, init = {}) => {
        redirectModes.push(init.redirect);
        const response = redirectResponses.shift();
        if (!response) throw new Error("Redirect-mode fixture received an unexpected request.");
        return response;
      };
      await clientModule.createJarvisChatConversation(createBody, "jarvis-chat-client-redirect-create-v1");
      await clientModule.actOnJarvisChatConversation(created.conversation.conversationId, approvalBody, "jarvis-chat-client-redirect-action-v1");
      await clientModule.fetchJarvisChatConversation(created.conversation.conversationId);
      assert(redirectModes.join(",") === "error,error,error", "strict client sends create, action, and read requests with redirect error mode");

      let redirectedFetchCalls = 0;
      let redirectedRequestBlocked = false;
      global.fetch = async (_target, init = {}) => {
        redirectedFetchCalls += 1;
        assert(init.redirect === "error", "simulated redirect request reaches the fetch boundary in redirect error mode");
        throw new TypeError("Redirect disallowed by the deterministic browser boundary.");
      };
      try {
        await clientModule.fetchJarvisChatConversation(created.conversation.conversationId);
      } catch (error) {
        redirectedRequestBlocked = error instanceof TypeError && error.message.includes("Redirect disallowed");
      }
      assert(redirectedRequestBlocked && redirectedFetchCalls === 1, "simulated redirect is neither accepted nor followed by the strict client");
    } finally {
      global.fetch = trappedFetch;
    }
    assert(clientFetchCalls === 1, "strict client valid-path fixture performs one test-owned fetch call only");

    assert(availabilityCalls === 4 && generationCalls === 4, "complete service journey uses exactly four explicitly approved fixture attempts");
    activityTrap.assertZeroActivity();
    assert(counters.fetch === 0 && counters.externalNetwork === 0 && counters.providerTransport === 0 && counters.credentialResolution === 0 && counters.liveGeneration === 0, "chat smoke traps and proves zero real fetch, external network, provider transport, credential, and live-generation activity");
    assert(counters.modelDownload === 0 && counters.childProcess === 0 && counters.packageInstall === 0 && counters.deployment === 0, "chat smoke traps and proves zero model download, child process, install, and deployment activity");
    assert(await snapshotTree(productionPrivateAlpha) === productionPrivateAlphaBefore, "chat smoke leaves production Private Alpha persistence byte-identical");
    assert(await snapshotTree(productionCreator) === productionCreatorBefore, "chat smoke leaves production creator persistence byte-identical");
  } finally {
    await persistence.cleanupTestData().catch(() => undefined);
    const httpPersistence = persistenceModule.createJarvisChatPersistenceForTesting(httpSuffix);
    await httpPersistence.cleanupTestData().catch(() => undefined);
    const corruptionPersistence = persistenceModule.createJarvisChatPersistenceForTesting(corruptionSuffix);
    await corruptionPersistence.cleanupTestData().catch(() => undefined);
    const deletionRecoveryPersistence = persistenceModule.createJarvisChatPersistenceForTesting(deletionRecoverySuffix);
    await deletionRecoveryPersistence.cleanupTestData().catch(() => undefined);
    await assertSafeRemoveOwnedTestRoot(testRoot);
    await assertSafeRemoveOwnedTestRoot(httpRoot);
    await assertSafeRemoveOwnedTestRoot(corruptionRoot);
    await assertSafeRemoveOwnedTestRoot(deletionRecoveryRoot);
  }
  assert(!fs.existsSync(testRoot) && !fs.existsSync(httpRoot) && !fs.existsSync(corruptionRoot) && !fs.existsSync(deletionRecoveryRoot), "Jarvis chat deterministic service, HTTP, corruption, and deletion-recovery roots are cleaned");
  console.log(`[COUNTERS] ${activityTrap.formatCounters({ fixtureAvailability: availabilityCalls, fixtureGeneration: generationCalls })}`);
}

main().catch((error) => {
  console.error(error?.stack ?? error?.message ?? String(error));
  process.exitCode = 1;
});
'@

$tempNodeScript = Join-Path $env:TEMP "codexforge-canonical-local-first-jarvis-chat-lifecycle-smoke.js"
[System.IO.File]::WriteAllText($tempNodeScript, $nodeScript, [System.Text.Encoding]::ASCII)
try {
  & node $tempNodeScript $root
  if ($LASTEXITCODE -ne 0) { throw "[FAIL] Canonical Jarvis chat Node harness exited with code $LASTEXITCODE" }
} finally {
  Remove-Item -LiteralPath $tempNodeScript -Force -ErrorAction SilentlyContinue
}

& node (Join-Path $root "scripts/codexforge-jarvis-chat-concurrency-worker.cjs")
if ($LASTEXITCODE -ne 0) {
  throw "[FAIL] Independent-process Jarvis chat contention worker exited with code $LASTEXITCODE"
}
Write-Host "[PASS] Independent processes preserve exact replay and distinct-conversation publication"

Write-Host "[PASS] CodexForge canonical local-first Jarvis chat lifecycle smoke complete."
