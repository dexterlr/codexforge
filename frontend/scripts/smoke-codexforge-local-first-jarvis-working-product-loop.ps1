param()

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

function Assert-True {
  param([bool]$Condition, [string]$Message)

  if (-not $Condition) {
    throw "[FAIL] $Message"
  }

  Write-Host "[PASS] $Message"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [string]$Message
  )

  Assert-True $Haystack.Contains($Needle) $Message
}

function Assert-NotMatches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [string]$Message
  )

  Assert-True (-not [regex]::IsMatch($Haystack, $Pattern)) $Message
}

function Get-Text {
  param([string]$RelativePath)

  return Get-Content -Raw -LiteralPath (Join-Path $root $RelativePath)
}

function Assert-PowerShellParses {
  param([string]$RelativePath)

  $tokens = $null
  $parseErrors = $null
  [System.Management.Automation.Language.Parser]::ParseFile(
    (Join-Path $root $RelativePath),
    [ref]$tokens,
    [ref]$parseErrors
  ) | Out-Null
  Assert-True ($parseErrors.Count -eq 0) "PowerShell parses: $RelativePath"
}

Write-Host ""
Write-Host "=== CodexForge Macro Phase A local-first Jarvis working product loop ==="

$requiredFiles = @(
  "scripts\smoke-codexforge-local-first-jarvis-working-product-loop.ps1",
  "scripts\smoke-codexforge-all.ps1",
  "src\app\jarvis\page.tsx",
  "src\app\jarvis\page-client.tsx",
  "src\app\api\codexforge\private-alpha\runs\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\approve\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\execute\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\cancel\route.ts",
  "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaLiveCommandCenterPanel.tsx",
  "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx",
  "src\lib\codexforge\private-alpha\private-alpha-api-client.ts",
  "src\lib\codexforge\private-alpha\private-alpha-store.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-free-first-routing.server.ts",
  "src\lib\codexforge\model-routing\model-routing-catalog.ts",
  "src\lib\codexforge\approved-patch-apply\index.ts",
  "src\lib\codexforge\validation-runner\validation-runner-types.ts"
)

foreach ($file in $requiredFiles) {
  Assert-True (Test-Path -LiteralPath (Join-Path $root $file) -PathType Leaf) "File exists: $file"
}

Assert-PowerShellParses "scripts\smoke-codexforge-local-first-jarvis-working-product-loop.ps1"

$panelSource = Get-Text "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx"
$livePanelSource = Get-Text "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaLiveCommandCenterPanel.tsx"
$apiClientSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-api-client.ts"
$storeSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-store.server.ts"
$catalogSource = Get-Text "src\lib\codexforge\model-routing\model-routing-catalog.ts"
$patchApplySource = Get-Text "src\lib\codexforge\approved-patch-apply\index.ts"
$validationSource = Get-Text "src\lib\codexforge\validation-runner\validation-runner-types.ts"
$aggregateSource = Get-Text "scripts\smoke-codexforge-all.ps1"

Assert-Contains $panelSource 'data-codexforge-jarvis-workspace-confirmation="required"' "Jarvis requires local workspace confirmation"
Assert-Contains $panelSource 'Only the task' "Workspace confirmation limits the run to task text"
Assert-Contains $panelSource 'project files are not attached or' "Workspace confirmation denies automatic project-file attachment"
Assert-Contains $panelSource 'PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY' "Jarvis uses the admitted exact local model constant"
Assert-Contains $panelSource 'PRIVATE_ALPHA_MAX_OUTPUT_TOKENS' "Jarvis preserves the local 4096-token ceiling"
Assert-Contains $panelSource 'beginOperatorAction("create")' "Create has a synchronous duplicate-action guard"
Assert-Contains $panelSource 'beginOperatorAction("route-create")' "Route/create has a synchronous duplicate-action guard"
Assert-Contains $panelSource 'beginOperatorAction("approve")' "Approval has a synchronous duplicate-action guard"
Assert-Contains $panelSource 'beginOperatorAction("execute")' "Execution has a synchronous duplicate-action guard"
Assert-Contains $panelSource 'beginOperatorAction("cancel")' "Cancellation has a synchronous duplicate-action guard"
Assert-Contains $panelSource 'actionLockRef.current' "Operator actions share one immediate lock"
Assert-Contains $panelSource 'aria-busy={loadState === "loading" || actionInFlight !== null}' "Jarvis exposes panel busy state"
Assert-Contains $panelSource 'disabled={!canCreateBoundRun}' "Create remains disabled until the draft is valid"
Assert-Contains $panelSource 'disabled={approvalButtonDisabled}' "Approval remains disabled until exact scope confirmation"
Assert-Contains $panelSource 'disabled={!canExecuteLocal}' "Local execution remains disabled until separately acknowledged"
Assert-Contains $panelSource 'Start another task' "Jarvis exposes a deliberate clean-task action"
Assert-Contains $panelSource 'setCurrentRun(null);' "New-task action drops the prior active run"
Assert-Contains $panelSource 'setApprovalAcknowledged(false);' "New-task action clears approval acknowledgement"
Assert-Contains $panelSource 'setExecutionAcknowledged(false);' "New-task action clears execution acknowledgement"
Assert-Contains $panelSource 'setRequestText("");' "New-task action clears stale task text"
Assert-Contains $panelSource 'setErrorMessage(null);' "New-task action clears stale errors"
Assert-Contains $panelSource 'setSuccessMessage(null);' "New-task action clears stale success state"
Assert-Contains $panelSource 'Nothing retries or reroutes automatically.' "Errors include bounded recovery guidance"
Assert-Contains $panelSource 'this run allows one execution attempt' "Execution confirmation states one attempt"
Assert-Contains $panelSource 'local-machine data boundary' "Execution confirmation names the local data boundary"
Assert-Contains $panelSource 'aria-live="assertive"' "Errors are announced accessibly"
Assert-Contains $panelSource 'aria-live="polite"' "Progress and success are announced accessibly"
Assert-NotMatches $panelSource 'localStorage|sessionStorage|indexedDB|document\.cookie' "Jarvis persists no unsafe browser state"
Assert-NotMatches $panelSource '127\.0\.0\.1:11434|/api/chat|api\.groq\.com|GROQ_API_KEY|process\.env' "Jarvis makes no direct browser provider or credential access"
Assert-NotMatches ($panelSource + [Environment]::NewLine + $livePanelSource) 'qwen2\.5-coder|ollama-local::qwen' "Qwen remains absent from Jarvis production surfaces"

Assert-Contains $livePanelSource 'href: "/files"' "Jarvis links to the existing project reader"
Assert-Contains $livePanelSource 'href: "/patch-preview-workbench"' "Jarvis links to the existing patch review"
Assert-Contains $livePanelSource 'href: "/validation"' "Jarvis links to the existing Validation Runner"
Assert-Contains $livePanelSource 'ollama-local::gpt-oss:20b' "Jarvis names the exact normal local model"
Assert-Contains $livePanelSource '4096-token ceiling' "Jarvis names the local token envelope"
Assert-Contains $patchApplySource 'buildApprovedPatchApplyApprovalPacket' "Approved Patch Apply keeps a separate approval packet"
Assert-Contains $patchApplySource 'executeApprovedPatchApplyRequest' "Approved Patch Apply remains a separate execution boundary"
Assert-Contains $validationSource 'explicitApprovalRequired: true' "Validation Runner keeps separate explicit approval"
Assert-Contains $validationSource 'allowlistRequired: true' "Validation Runner remains allowlisted"
Assert-Contains $validationSource 'commandChainingBlocked: true' "Validation Runner blocks arbitrary command chaining"
Assert-Contains $validationSource 'writeCommandsBlocked: true' "Validation Runner blocks write commands"

Assert-Contains $apiClientSource 'globalThis.crypto?.randomUUID?.()' "Client mutations use fresh idempotency keys"
Assert-Contains $apiClientSource 'const PRIVATE_ALPHA_API_BASE_PATH = "/api/codexforge/private-alpha";' "Client uses the same-origin private-alpha API base"
Assert-Contains $apiClientSource '`${PRIVATE_ALPHA_API_BASE_PATH}/runs`' "Client uses the server-owned run routes"
Assert-NotMatches $apiClientSource 'server-only|node:fs|node:path|127\.0\.0\.1:11434|/api/chat|api\.groq\.com|GROQ_API_KEY|process\.env' "API client stays browser-safe and provider-agnostic"
Assert-Contains $storeSource '"This run has already started its one allowed execution attempt."' "Store rejects a second execution attempt"
Assert-Contains $storeSource '"Run revision is stale."' "Store rejects stale revisions"
Assert-Contains $storeSource '"Approval scope hash does not match."' "Store rejects mismatched approval scope"
Assert-True (([regex]::Matches($storeSource, 'readSafeKillSwitchState\(paths\)')).Count -ge 3) "Store preserves status and both execution kill-switch checkpoints"
Assert-NotMatches $catalogSource 'qwen2\.5-coder|ollama-local::qwen' "Qwen remains absent from the production catalog source"

$registrationNeedle = 'File = "smoke-codexforge-local-first-jarvis-working-product-loop.ps1"; Required = $true'
Assert-True (([regex]::Matches($aggregateSource, [regex]::Escape($registrationNeedle))).Count -eq 1) "Macro Phase A smoke is registered exactly once as required"

$aggregateEntries = @()
$insideCurrentGate = $false
foreach ($line in Get-Content -LiteralPath (Join-Path $root "scripts\smoke-codexforge-all.ps1")) {
  if ($line -eq '$currentReleaseGateScripts = @(') {
    $insideCurrentGate = $true
    continue
  }

  if ($insideCurrentGate -and $line -eq ')') {
    break
  }

  if (
    $insideCurrentGate -and
    $line -match '^\s*@\{ Name = ".*"; File = .*; Required = \$(true|false) \},?$'
  ) {
    $aggregateEntries += [pscustomobject]@{
      Required = $Matches[1] -eq "true"
    }
  }
}

Assert-True ($aggregateEntries.Count -eq 69) "Aggregate executable count is 69"
Assert-True (($aggregateEntries | Where-Object Required).Count -eq 66) "Aggregate required count is 66"
Assert-True (($aggregateEntries | Where-Object { -not $_.Required }).Count -eq 3) "Aggregate optional count remains 3"

$nodeScript = @'
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const crypto = require("crypto");
const Module = require("module");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
  console.log("[PASS] " + message);
}

async function main() {
  const repoRoot = process.argv[2];
  const ts = require(path.join(repoRoot, "node_modules", "typescript"));
  let externalFetchCount = 0;
  let cloudCallCount = 0;
  let credentialReadCount = 0;
  let liveGenerationCount = 0;
  let retryCount = 0;
  let fallbackCount = 0;
  let rerouteCount = 0;
  let substitutionCount = 0;
  let downloadCount = 0;
  const killSwitchStateByLabel = new Map();
  const ownedLabels = [];

  global.fetch = async function () {
    externalFetchCount += 1;
    throw new Error("External fetch is forbidden in the deterministic Macro Phase A smoke.");
  };

  const killSwitchModulePath = path.resolve(
    repoRoot,
    "src/lib/codexforge/private-alpha/private-alpha-kill-switch.server.ts"
  ).toLowerCase();
  const credentialModulePath = path.resolve(
    repoRoot,
    "src/lib/codexforge/groq-provider/groq-provider-credential.server.ts"
  ).toLowerCase();
  const originalResolveFilename = Module._resolveFilename;
  Module._resolveFilename = function (request, parent, isMain, options) {
    if (request.startsWith("@/")) {
      request = path.join(repoRoot, "src", request.slice(2));
    }
    return originalResolveFilename.call(this, request, parent, isMain, options);
  };

  const originalLoad = Module._load;
  Module._load = function (request, parent, isMain) {
    if (request === "server-only") {
      return {};
    }

    const resolved = String(Module._resolveFilename(request, parent, isMain)).toLowerCase();
    if (resolved === killSwitchModulePath) {
      return {
        async readPrivateAlphaKillSwitchState(input) {
          const entry = killSwitchStateByLabel.get(input.dataRootLabel) || {
            queue: [],
            fallback: false,
            reads: 0,
          };
          entry.reads += 1;
          killSwitchStateByLabel.set(input.dataRootLabel, entry);
          const engaged =
            entry.queue.length > 0 ? entry.queue.shift() === true : entry.fallback === true;
          return {
            killSwitchEngaged: engaged,
            killSwitchSources: engaged ? ["file"] : [],
          };
        },
      };
    }

    if (resolved === credentialModulePath) {
      return {
        readCodexForgeGroqCredential() {
          credentialReadCount += 1;
          throw new Error("Cloud credentials are forbidden in the deterministic Macro Phase A smoke.");
        },
      };
    }

    return originalLoad.apply(this, arguments);
  };

  const compileTypeScript = (module, filename) => {
    const source = fs.readFileSync(filename, "utf8");
    const transpiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        esModuleInterop: true,
      },
      fileName: filename,
    });
    module._compile(transpiled.outputText, filename);
  };
  require.extensions[".ts"] = compileTypeScript;

  const privateAlpha = require(path.join(
    repoRoot,
    "src/lib/codexforge/private-alpha/index.ts"
  ));
  const storeModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/private-alpha/private-alpha-store.server.ts"
  ));
  const providerModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts"
  ));
  const routingModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/private-alpha/private-alpha-free-first-routing.server.ts"
  ));
  const modelRouting = require(path.join(
    repoRoot,
    "src/lib/codexforge/model-routing/index.ts"
  ));

  const localModelKey = privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY;
  assert(localModelKey === "ollama-local::gpt-oss:20b", "Exact admitted local model key is fixed.");
  assert(privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL === "gpt-oss:20b", "Exact local model is fixed.");
  assert(privateAlpha.PRIVATE_ALPHA_MAX_OUTPUT_TOKENS === 4096, "Local output ceiling remains 4096.");
  assert(privateAlpha.PRIVATE_ALPHA_GROQ_MAX_OUTPUT_TOKENS === 512, "Groq output ceiling remains 512.");

  const catalog = modelRouting.getCodexForgeProductionModelCatalog();
  const catalogJson = JSON.stringify(catalog);
  const catalogDigest = crypto.createHash("sha256").update(catalogJson).digest("hex");
  assert(
    catalogDigest === "06f4eca8688728c2d2457e48284394fa823fbbe13a07ff1fd4a781227e4e4d0b",
    "Production catalog digest remains unchanged."
  );
  assert(!catalogJson.includes("qwen2.5-coder"), "Qwen remains absent from the production catalog.");

  function localIdentity() {
    return Object.freeze({
      providerId: "ollama-local",
      providerLabel: "Local Ollama",
      modelId: "gpt-oss:20b",
      modelLabel: "gpt-oss:20b",
      modelKey: localModelKey,
      locality: "local",
      dataBoundary: "local-machine",
      costClass: "local-no-provider-token-charge",
      approvedMaximumOutputTokens: 4096,
    });
  }

  function localInspection() {
    return Object.freeze({
      identity: localIdentity(),
      availability: Object.freeze({
        providerAvailable: true,
        modelAvailable: true,
        quotaState: "not-applicable",
        errorCode: null,
        safeErrorMessage: null,
      }),
      snapshot: Object.freeze({
        modelKey: localModelKey,
        availability: "available",
        quotaState: "not-applicable",
        observedLatencyMs: 1,
        observedAt: "2026-07-31T12:00:00.000Z",
      }),
    });
  }

  const routingInspections = [];
  const routingResult = await routingModule.routePrivateAlphaFreeFirst(
    {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 512,
      cloudRouting: {
        state: "allowed-free-tier-only",
        metadataProbeAcknowledgement: true,
        freeTierConfirmation: true,
      },
    },
    {
      readKillSwitchState: async () => ({
        killSwitchEngaged: false,
        killSwitchSources: [],
      }),
      inspectRuntime: async (modelKey) => {
        routingInspections.push(modelKey);
        if (modelKey !== localModelKey) {
          cloudCallCount += 1;
          throw new Error("Cloud inspection must not occur after local success.");
        }
        return localInspection();
      },
      catalogSnapshot: catalog,
    }
  );
  assert(routingResult.status === "selected-for-approval", "Free-first selects a target for approval only.");
  assert(routingResult.selectedModelKey === localModelKey, "Free-first selects the exact local model.");
  assert(
    JSON.stringify(routingInspections) === JSON.stringify([localModelKey]),
    "Local availability is checked before and instead of cloud consideration."
  );
  assert(routingResult.promptTransferredToCloud === false, "Routing transfers no prompt to cloud.");
  assert(routingResult.providerGenerationPerformed === false, "Routing performs no generation.");

  function absoluteLabel(label) {
    return path.join(repoRoot, ...label.split("/"));
  }

  async function prepareLabel(name) {
    const label = storeModule.buildPrivateAlphaTestingDataRootLabel(
      "macro-phase-a-working-loop-" + name
    );
    try {
      await fsp.lstat(absoluteLabel(label));
      throw new Error("Deterministic test root already exists: " + label);
    } catch (error) {
      if (!error || error.code !== "ENOENT") {
        throw error;
      }
    }
    ownedLabels.push(label);
    killSwitchStateByLabel.set(label, { queue: [], fallback: false, reads: 0 });
    return label;
  }

  function setKillSwitchSequence(label, sequence, fallback) {
    killSwitchStateByLabel.set(label, {
      queue: sequence.slice(),
      fallback: fallback === true,
      reads: 0,
    });
  }

  function createAdapterHarness(config) {
    let availabilityCalls = 0;
    let generationCalls = 0;
    const generationInputs = [];
    return {
      adapter: {
        identity: localIdentity(),
        async getAvailability() {
          availabilityCalls += 1;
          return {
            providerAvailable: true,
            modelAvailable: true,
            quotaState: "not-applicable",
            errorCode: null,
            safeErrorMessage: null,
          };
        },
        async generateApprovedText(input) {
          generationCalls += 1;
          generationInputs.push(input);
          if (config && config.generationError) {
            throw config.generationError;
          }
          return {
            outputText: config && config.outputText
              ? config.outputText
              : "Macro Phase A deterministic local result.",
            doneReason: "stop",
            totalDurationNanoseconds: 5000000,
            loadDurationNanoseconds: 1000000,
            promptEvalCount: 12,
            evalCount: 18,
          };
        },
      },
      stats() {
        return {
          availabilityCalls,
          generationCalls,
          generationInputs: generationInputs.slice(),
        };
      },
    };
  }

  async function createStore(name, harness, killSequence) {
    const label = await prepareLabel(name);
    setKillSwitchSequence(label, killSequence || [], false);
    const resolverKeys = [];
    const store = storeModule.createPrivateAlphaStore({
      dataRootLabel: label,
      providerAdapterResolver(modelKey) {
        resolverKeys.push(modelKey);
        if (modelKey !== localModelKey) {
          cloudCallCount += 1;
          throw new Error("Only the exact local model may resolve.");
        }
        return harness.adapter;
      },
    });
    return { label, store, resolverKeys };
  }

  async function createRun(store, name, maximumOutputTokens) {
    return store.createRun(
      {
        requestText: "Local operator task " + name,
        capability: "text",
        modelKey: localModelKey,
        modelPreferenceLabel: "gpt-oss:20b",
        maximumOutputTokens: maximumOutputTokens === undefined ? 512 : maximumOutputTokens,
      },
      "macro-phase-a-create-" + name
    );
  }

  async function approveRun(store, run) {
    return store.approveRun(run.runId, {
      approvalScopeHash: run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: run.revision,
    });
  }

  async function expectStoreError(operation, status, messagePart) {
    try {
      await operation();
    } catch (error) {
      assert(error instanceof storeModule.PrivateAlphaStoreError, "Failure is a bounded store error.");
      assert(error.status === status, "Bounded store error has status " + status + ".");
      if (messagePart) {
        assert(String(error.message).includes(messagePart), "Bounded error names " + messagePart + ".");
      }
      return error;
    }
    throw new Error("Expected bounded store error " + status + ".");
  }

  try {
    const successHarness = createAdapterHarness({
      outputText: "Macro Phase A deterministic local result.",
    });
    const successFixture = await createStore("success", successHarness, []);
    const createdResult = await createRun(successFixture.store, "success", 4096);
    assert(createdResult.created === true, "Create persists a new run.");
    assert(
      createdResult.run.state === "awaiting_approval" &&
        createdResult.run.approval === null &&
        createdResult.run.execution === null,
      "Created run begins awaiting_approval without approval or execution."
    );
    assert(
      createdResult.run.request.modelKey === localModelKey &&
        createdResult.run.request.modelPreferenceLabel === "gpt-oss:20b" &&
        createdResult.run.request.dataBoundary === "local-machine" &&
        createdResult.run.request.maximumOutputTokens === 4096,
      "Created run binds exact provider/model, local boundary, and token envelope."
    );

    const duplicateCreate = await createRun(successFixture.store, "success", 4096);
    assert(
      duplicateCreate.created === false &&
        duplicateCreate.run.runId === createdResult.run.runId,
      "Duplicate create replays one persisted run."
    );

    await expectStoreError(
      () =>
        successFixture.store.executeRun(
          createdResult.run.runId,
          {
            execute: true,
            acknowledgement: true,
            approvalScopeHash: createdResult.run.approvalScopeHash,
            expectedRevision: createdResult.run.revision,
          },
          "macro-phase-a-execute-before-approval"
        ),
      409,
      "eligible"
    );
    assert(successHarness.stats().generationCalls === 0, "No execution occurs before approval.");

    await expectStoreError(
      () =>
        successFixture.store.approveRun(createdResult.run.runId, {
          approvalScopeHash: createdResult.run.approvalScopeHash,
          approved: true,
          acknowledgement: true,
          expectedRevision: createdResult.run.revision + 1,
        }),
      409,
      "stale"
    );
    const approvedRun = await approveRun(successFixture.store, createdResult.run);
    assert(
      approvedRun.state === "approved" &&
        approvedRun.approval !== null &&
        approvedRun.execution === null,
      "Approval is a separate explicit transition and still performs no execution."
    );
    await expectStoreError(
      () => approveRun(successFixture.store, approvedRun),
      409,
      "eligible"
    );

    const executeInput = {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: approvedRun.approvalScopeHash,
      expectedRevision: approvedRun.revision,
    };
    const executed = await successFixture.store.executeRun(
      approvedRun.runId,
      executeInput,
      "macro-phase-a-execute-success"
    );
    assert(
      executed.run.state === "succeeded" &&
        executed.run.execution.outputText === "Macro Phase A deterministic local result." &&
        executed.run.execution.errorCode === null,
      "Explicit execute produces a safe persisted success state and visible output."
    );
    assert(
      successFixture.resolverKeys.length === 1 &&
        successFixture.resolverKeys[0] === localModelKey &&
        successHarness.stats().availabilityCalls === 1 &&
        successHarness.stats().generationCalls === 1,
      "Success performs exactly one bound local provider attempt."
    );
    assert(
      successHarness.stats().generationInputs[0].approvedRequestText ===
        approvedRun.request.normalizedRequestText &&
        successHarness.stats().generationInputs[0].model === "gpt-oss:20b" &&
        successHarness.stats().generationInputs[0].maximumOutputTokens === 4096,
      "Execution uses the exact approved prompt, model, and token ceiling."
    );
    assert(
      executed.run.auditEvents.some((event) => event.eventType === "run.created") &&
        executed.run.auditEvents.some((event) => event.eventType === "approval.granted") &&
        executed.run.auditEvents.some((event) => event.eventType === "execution.started") &&
        executed.run.auditEvents.some((event) => event.eventType === "execution.succeeded"),
      "Run audit records create, approve, execute, and success transitions."
    );
    assert(
      executed.run.execution.startedAt !== null &&
        executed.run.execution.completedAt !== null &&
        executed.run.execution.promptEvalCount === 12 &&
        executed.run.execution.evalCount === 18,
      "Result retains timing and token-accounting metadata."
    );

    const safeReplay = await successFixture.store.executeRun(
      approvedRun.runId,
      executeInput,
      "macro-phase-a-execute-success"
    );
    assert(
      safeReplay.replayed === true && successHarness.stats().generationCalls === 1,
      "Same execution idempotency key replays without another attempt."
    );
    await expectStoreError(
      () =>
        successFixture.store.executeRun(
          approvedRun.runId,
          executeInput,
          "macro-phase-a-execute-second"
        ),
      409,
      "one allowed execution attempt"
    );
    assert(successHarness.stats().generationCalls === 1, "A second execution key cannot generate again.");

    const isolatedRun = await createRun(successFixture.store, "isolated", 512);
    assert(
      isolatedRun.run.runId !== executed.run.runId &&
        isolatedRun.run.state === "awaiting_approval" &&
        isolatedRun.run.approval === null &&
        isolatedRun.run.execution === null &&
        !JSON.stringify(isolatedRun.run).includes("Macro Phase A deterministic local result."),
      "A new task carries no stale approval, execution, or output."
    );
    const isolatedCanceled = await successFixture.store.cancelRun(isolatedRun.run.runId, {
      expectedRevision: isolatedRun.run.revision,
      reason: "Cancel isolated fixture before execution.",
    });
    assert(isolatedCanceled.state === "canceled", "Isolated task cancels safely before execution.");

    const cancelHarness = createAdapterHarness({});
    const cancelFixture = await createStore("cancel", cancelHarness, []);
    const cancelCreated = await createRun(cancelFixture.store, "cancel", 512);
    const canceled = await cancelFixture.store.cancelRun(cancelCreated.run.runId, {
      expectedRevision: cancelCreated.run.revision,
      reason: "Operator canceled before approval or execution.",
    });
    assert(
      canceled.state === "canceled" &&
        canceled.approval === null &&
        canceled.execution === null &&
        cancelFixture.resolverKeys.length === 0 &&
        cancelHarness.stats().generationCalls === 0,
      "Cancellation before execution performs no provider work."
    );
    await expectStoreError(
      () => approveRun(cancelFixture.store, canceled),
      409,
      "eligible"
    );

    const firstKillHarness = createAdapterHarness({});
    const firstKillFixture = await createStore("first-kill", firstKillHarness, [true]);
    const firstKillCreated = await createRun(firstKillFixture.store, "first-kill", 512);
    const firstKillApproved = await approveRun(firstKillFixture.store, firstKillCreated.run);
    const firstKillResult = await firstKillFixture.store.executeRun(
      firstKillApproved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: firstKillApproved.approvalScopeHash,
        expectedRevision: firstKillApproved.revision,
      },
      "macro-phase-a-execute-first-kill"
    );
    assert(
      firstKillResult.run.state === "blocked" &&
        firstKillResult.errorCode === "kill_switch_blocked" &&
        firstKillFixture.resolverKeys.length === 0 &&
        firstKillHarness.stats().availabilityCalls === 0 &&
        firstKillHarness.stats().generationCalls === 0,
      "First execution kill-switch checkpoint blocks before provider resolution."
    );

    const secondKillHarness = createAdapterHarness({});
    const secondKillFixture = await createStore("second-kill", secondKillHarness, [false, true]);
    const secondKillCreated = await createRun(secondKillFixture.store, "second-kill", 512);
    const secondKillApproved = await approveRun(secondKillFixture.store, secondKillCreated.run);
    const secondKillResult = await secondKillFixture.store.executeRun(
      secondKillApproved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: secondKillApproved.approvalScopeHash,
        expectedRevision: secondKillApproved.revision,
      },
      "macro-phase-a-execute-second-kill"
    );
    assert(
      secondKillResult.run.state === "blocked" &&
        secondKillResult.errorCode === "kill_switch_blocked" &&
        killSwitchStateByLabel.get(secondKillFixture.label).reads === 2 &&
        secondKillHarness.stats().availabilityCalls === 1 &&
        secondKillHarness.stats().generationCalls === 0,
      "Second execution kill-switch checkpoint blocks after availability and before generation."
    );

    const failureHarness = createAdapterHarness({
      generationError: new providerModule.PrivateAlphaProviderError(
        "ollama_http_error",
        "Local provider failed within the bounded deterministic fixture.",
        503
      ),
    });
    const failureFixture = await createStore("bounded-failure", failureHarness, []);
    const failureCreated = await createRun(failureFixture.store, "bounded-failure", 512);
    const failureApproved = await approveRun(failureFixture.store, failureCreated.run);
    const failureResult = await failureFixture.store.executeRun(
      failureApproved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: failureApproved.approvalScopeHash,
        expectedRevision: failureApproved.revision,
      },
      "macro-phase-a-execute-bounded-failure"
    );
    assert(
      failureResult.run.state === "failed" &&
        failureResult.errorCode === "ollama_http_error" &&
        failureResult.safeErrorMessage ===
          "Local provider failed within the bounded deterministic fixture." &&
        failureHarness.stats().generationCalls === 1,
      "Provider failure is bounded, persisted, and not retried."
    );
    assert(
      JSON.stringify(failureFixture.resolverKeys) === JSON.stringify([localModelKey]),
      "Provider failure does not fallback, reroute, or substitute."
    );

    assert(externalFetchCount === 0, "No real Ollama or Groq transport was contacted.");
    assert(cloudCallCount === 0, "Local-first success and execution make zero cloud calls.");
    assert(credentialReadCount === 0, "No cloud credential was read.");
    assert(liveGenerationCount === 0, "No live model generation occurred.");
    assert(retryCount === 0, "Automatic retry count is zero.");
    assert(fallbackCount === 0, "Fallback count is zero.");
    assert(rerouteCount === 0, "Post-persistence reroute count is zero.");
    assert(substitutionCount === 0, "Model substitution count is zero.");
    assert(downloadCount === 0, "Model download count is zero.");

    console.log(
      JSON.stringify({
        catalogDigest,
        routeSelection: routingResult.selectedModelKey,
        deterministicFixtureGenerationAttempts:
          successHarness.stats().generationCalls + failureHarness.stats().generationCalls,
        externalProviderCalls: externalFetchCount,
        cloudCalls: cloudCallCount,
        credentialReads: credentialReadCount,
        liveGenerations: liveGenerationCount,
        retries: retryCount,
        fallbacks: fallbackCount,
        reroutes: rerouteCount,
        substitutions: substitutionCount,
        downloads: downloadCount,
      })
    );
  } finally {
    for (const label of ownedLabels.reverse()) {
      await fsp.rm(absoluteLabel(label), { recursive: true, force: true });
    }
  }
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : error);
  process.exitCode = 1;
});
'@

$nodeScript | & node - $root.ProviderPath
if ($LASTEXITCODE -ne 0) {
  throw "[FAIL] Deterministic Macro Phase A runtime harness failed with exit code $LASTEXITCODE."
}

Write-Host ""
Write-Host "[PASS] CodexForge Macro Phase A local-first Jarvis working product loop smoke passed."
