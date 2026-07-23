param()

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-True {
  param([bool]$Condition, [string]$Message)
  if (-not $Condition) {
    throw "[FAIL] $Message"
  }

  Write-Host "[PASS] $Message"
}

function Assert-FileExists {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Message)
  if (-not $Haystack.Contains($Needle)) {
    throw "[FAIL] Missing $Message`: $Needle"
  }

  Write-Host "[PASS] $Message"
}

Write-Host ""
Write-Host "=== CodexForge Private Alpha foundation smoke ==="

$requiredFiles = @(
  "src\lib\codexforge\private-alpha\private-alpha-types.ts",
  "src\lib\codexforge\private-alpha\private-alpha-state-machine.ts",
  "src\lib\codexforge\private-alpha\private-alpha-store.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-kill-switch.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-validation.ts",
  "src\lib\codexforge\private-alpha\private-alpha-api-client.ts",
  "src\lib\codexforge\private-alpha\index.ts",
  "src\app\api\codexforge\private-alpha\status\route.ts",
  "src\app\api\codexforge\private-alpha\runs\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\approve\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\cancel\route.ts",
  "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx",
  "docs\codexforge-private-alpha-v0.md",
  "scripts\smoke-codexforge-private-alpha-run-approval-audit-foundation.ps1"
)

foreach ($file in $requiredFiles) {
  Assert-FileExists $file
}

$tokens = $null
$parseErrors = $null
[System.Management.Automation.Language.Parser]::ParseFile(
  $PSCommandPath,
  [ref]$tokens,
  [ref]$parseErrors
) | Out-Null
Assert-True ($parseErrors.Count -eq 0) "PowerShell parses"

$athenaAliasSource = Get-Content -Raw "src\app\athena\page.tsx"
Assert-Contains $athenaAliasSource 'export { default } from "../jarvis/page";' "/athena still aliases /jarvis"

$videoPanelSource = Get-Content -Raw "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
foreach ($marker in @(
  "Mission brief",
  "Blocked action command deck",
  "Release summary"
)) {
  Assert-Contains $videoPanelSource $marker "/jarvis-video retains above-the-fold marker $marker"
}

$navigationTypesSource = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains strongly typed"

$nodeScript = @'
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const crypto = require("crypto");
const Module = require("module");
const ts = require("typescript");

async function main() {
  const repoRoot = process.argv[2];

  const originalLoad = Module._load;
  Module._load = function(request, parent, isMain) {
    if (request === "server-only") {
      return {};
    }

    return originalLoad.apply(this, arguments);
  };

  const originalResolveFilename = Module._resolveFilename;
  Module._resolveFilename = function(request, parent, isMain, options) {
    if (request.startsWith("@/")) {
      request = path.join(repoRoot, "src", request.slice(2));
    }

    return originalResolveFilename.call(this, request, parent, isMain, options);
  };

  const compileTypeScript = (module, filename) => {
    const source = fs.readFileSync(filename, "utf8");
    const transpiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        esModuleInterop: true,
        jsx: ts.JsxEmit.ReactJSX,
      },
      fileName: filename,
    });

    module._compile(transpiled.outputText, filename);
  };

  require.extensions[".ts"] = compileTypeScript;
  require.extensions[".tsx"] = compileTypeScript;

  const privateAlpha = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "index.ts"
  ));
  const storeModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-store.server.ts"
  ));
  const killSwitchModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-kill-switch.server.ts"
  ));
  const stateMachineModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-state-machine.ts"
  ));

  const requiredIndexExports = [
    "PRIVATE_ALPHA_DATA_ROOT_LABEL",
    "PRIVATE_ALPHA_SECRET_REJECTION_MESSAGE",
    "buildPrivateAlphaApprovalScope",
    "serializePrivateAlphaApprovalScope",
    "validatePrivateAlphaCreateRunInput",
    "validatePrivateAlphaApprovalInput",
    "validatePrivateAlphaCancellationInput",
    "validatePrivateAlphaRunId",
    "PRIVATE_ALPHA_TRANSITION_TABLE",
  ];
  const requiredStoreExports = [
    "createPrivateAlphaStore",
    "createPrivateAlphaStoreForTesting",
    "buildPrivateAlphaApprovalScopeHash",
    "buildPrivateAlphaCanonicalRequestHash",
    "buildPrivateAlphaNormalizedRequestHash",
    "buildPrivateAlphaTestingDataRootLabel",
    "PrivateAlphaStoreError",
  ];
  const requiredKillSwitchExports = ["readPrivateAlphaKillSwitchState"];
  const requiredStateExports = [
    "PRIVATE_ALPHA_INITIAL_RUN_STATE",
    "PRIVATE_ALPHA_TRANSITION_TABLE",
    "assertPrivateAlphaTransition",
  ];

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  async function expectStoreError(work, expectedStatus, messageFragment) {
    try {
      await work();
    } catch (error) {
      assert(
        error instanceof storeModule.PrivateAlphaStoreError,
        "Expected a PrivateAlphaStoreError."
      );
      assert(error.status === expectedStatus, `Expected status ${expectedStatus}.`);
      if (messageFragment) {
        assert(
          String(error.message).includes(messageFragment),
          `Expected error to include ${messageFragment}.`
        );
      }
      return error;
    }

    throw new Error(`Expected PrivateAlphaStoreError status ${expectedStatus}.`);
  }

  function readText(relativePath) {
    return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
  }

  async function resetDataRoot(label) {
    await fsp.rm(path.join(repoRoot, ...label.split("/")), {
      recursive: true,
      force: true,
    });
  }

  function toAbsolutePath(relativePath) {
    return path.join(repoRoot, ...relativePath.split("/"));
  }

  const newSourcePaths = [
    "src/lib/codexforge/private-alpha/private-alpha-types.ts",
    "src/lib/codexforge/private-alpha/private-alpha-state-machine.ts",
    "src/lib/codexforge/private-alpha/private-alpha-store.server.ts",
    "src/lib/codexforge/private-alpha/private-alpha-kill-switch.server.ts",
    "src/lib/codexforge/private-alpha/private-alpha-validation.ts",
    "src/lib/codexforge/private-alpha/private-alpha-api-client.ts",
    "src/lib/codexforge/private-alpha/index.ts",
    "src/app/api/codexforge/private-alpha/status/route.ts",
    "src/app/api/codexforge/private-alpha/runs/route.ts",
    "src/app/api/codexforge/private-alpha/runs/[runId]/route.ts",
    "src/app/api/codexforge/private-alpha/runs/[runId]/approve/route.ts",
    "src/app/api/codexforge/private-alpha/runs/[runId]/cancel/route.ts",
    "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx",
    "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaCommandCenterPanel.tsx",
    "src/lib/codexforge/jarvis-unified-product-ia-map/components/index.ts",
    "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.module.css",
  ];

  const newSourceText = newSourcePaths.map(readText).join("\n");
  const panelSource = readText(
    "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx"
  );
  const clientSource = readText(
    "src/lib/codexforge/private-alpha/private-alpha-api-client.ts"
  );
  const athenaPanelSource = readText(
    "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaCommandCenterPanel.tsx"
  );
  const jarvisShellSource = readText(
    "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.tsx"
  );
  const runRouteSource = readText(
    "src/app/api/codexforge/private-alpha/runs/[runId]/route.ts"
  );
  const approveRouteSource = readText(
    "src/app/api/codexforge/private-alpha/runs/[runId]/approve/route.ts"
  );
  const cancelRouteSource = readText(
    "src/app/api/codexforge/private-alpha/runs/[runId]/cancel/route.ts"
  );

  for (const exportName of requiredIndexExports) {
    assert(exportName in privateAlpha, `Missing index export ${exportName}.`);
  }

  for (const exportName of requiredStoreExports) {
    assert(exportName in storeModule, `Missing store export ${exportName}.`);
  }

  for (const exportName of requiredKillSwitchExports) {
    assert(exportName in killSwitchModule, `Missing kill-switch export ${exportName}.`);
  }

  for (const exportName of requiredStateExports) {
    assert(exportName in stateMachineModule, `Missing state-machine export ${exportName}.`);
  }

  assert(
    stateMachineModule.PRIVATE_ALPHA_INITIAL_RUN_STATE === "awaiting_approval",
    "Initial state must be awaiting_approval."
  );
  assert(
    stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.awaiting_approval.approve === "approved",
    "awaiting_approval must transition to approved."
  );
  assert(
    stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.awaiting_approval.cancel === "canceled",
    "awaiting_approval must transition to canceled."
  );
  assert(
    stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.approved.cancel === "canceled",
    "approved must transition to canceled."
  );
  assert(
    Object.keys(stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.canceled).length === 0,
    "canceled must have no outgoing transitions."
  );
  assert(
    Object.keys(stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.blocked).length === 0,
    "blocked must have no outgoing transitions."
  );

  const defaultStore = storeModule.createPrivateAlphaStore();
  const defaultStatus = await defaultStore.getStatus();
  assert(
    defaultStatus.dataRootLabel === privateAlpha.PRIVATE_ALPHA_DATA_ROOT_LABEL,
    "Default status must expose the fixed private-alpha data root label."
  );
  assert(
    !path.isAbsolute(defaultStatus.dataRootLabel) &&
      !/^[A-Za-z]:[\\/]/.test(defaultStatus.dataRootLabel),
    "Status must not expose an absolute data root path."
  );
  assert(
    defaultStatus.providerExecution === "unavailable" &&
      defaultStatus.executionAllowed === false,
    "Provider execution must remain unavailable."
  );

  const mainLabel = storeModule.buildPrivateAlphaTestingDataRootLabel("foundation-main");
  const concurrentLabel = storeModule.buildPrivateAlphaTestingDataRootLabel("foundation-concurrent");
  const malformedLabel = storeModule.buildPrivateAlphaTestingDataRootLabel("foundation-malformed");

  await Promise.all([
    resetDataRoot(mainLabel),
    resetDataRoot(concurrentLabel),
    resetDataRoot(malformedLabel),
  ]);

  delete process.env.CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH;

  const mainStore = storeModule.createPrivateAlphaStoreForTesting("foundation-main");
  const createBody = {
    requestText: "Draft a local code review summary for the current TypeScript changes.",
    capability: "code",
    modelPreferenceLabel: "local-review-label",
    maximumOutputTokens: 512,
  };
  const idempotencyKey = "private-alpha-foundation-key-0001";
  const idempotencyKeyHash = crypto
    .createHash("sha256")
    .update(idempotencyKey, "utf8")
    .digest("hex");

  const createResult = await mainStore.createRun(createBody, idempotencyKey);
  assert(createResult.created === true, "First create must persist a new run.");
  assert(
    createResult.run.state === "awaiting_approval",
    "New runs must start in awaiting_approval."
  );
  assert(createResult.run.revision === 1, "New runs must start at revision 1.");

  const mainRootAbsolutePath = toAbsolutePath(mainLabel);
  const runAbsolutePath = path.join(mainRootAbsolutePath, "runs", `${createResult.run.runId}.json`);
  const idempotencyAbsolutePath = path.join(
    mainRootAbsolutePath,
    "idempotency",
    `${idempotencyKeyHash}.json`
  );

  assert(fs.existsSync(runAbsolutePath), "The run file must exist.");
  assert(fs.existsSync(idempotencyAbsolutePath), "The idempotency file must exist.");

  const runFileText = fs.readFileSync(runAbsolutePath, "utf8");
  const idempotencyFileText = fs.readFileSync(idempotencyAbsolutePath, "utf8");
  assert(
    createResult.run.auditEvents.some((event) => event.eventType === "run.created"),
    "run.created must be persisted."
  );
  assert(
    createResult.run.auditEvents.some(
      (event) => event.eventType === "approval.requested"
    ),
    "approval.requested must be persisted."
  );
  assert(
    !runFileText.includes(idempotencyKey) && !idempotencyFileText.includes(idempotencyKey),
    "Raw idempotency keys must not be persisted."
  );

  const idempotentReplay = await mainStore.createRun(createBody, idempotencyKey);
  assert(idempotentReplay.created === false, "Idempotent replay must return an existing run.");
  assert(
    idempotentReplay.run.runId === createResult.run.runId,
    "Idempotent replay must return the same run."
  );

  await expectStoreError(
    () =>
      mainStore.createRun(
        {
          ...createBody,
          requestText: "Draft a different request under the same idempotency key.",
        },
        idempotencyKey
      ),
    409,
    "Idempotency-Key conflicts"
  );

  const concurrentStore = storeModule.createPrivateAlphaStoreForTesting("foundation-concurrent");
  const concurrentBody = {
    requestText: "Prepare a local-only private-alpha replay test packet.",
    capability: "text",
    modelPreferenceLabel: null,
    maximumOutputTokens: 320,
  };
  const concurrentKey = "private-alpha-foundation-key-0002";
  const concurrentResults = await Promise.all([
    concurrentStore.createRun(concurrentBody, concurrentKey),
    concurrentStore.createRun(concurrentBody, concurrentKey),
  ]);
  assert(
    concurrentResults[0].run.runId === concurrentResults[1].run.runId,
    "Concurrent duplicate creates must collapse to one run."
  );
  const concurrentRunFiles = fs
    .readdirSync(path.join(toAbsolutePath(concurrentLabel), "runs"))
    .filter((entry) => entry.endsWith(".json"));
  assert(
    concurrentRunFiles.length === 1,
    "Concurrent duplicate creates must produce one persisted run file."
  );

  const deterministicScopeHashOne = storeModule.buildPrivateAlphaApprovalScopeHash(
    createResult.run.approvalScope
  );
  const deterministicScopeHashTwo = storeModule.buildPrivateAlphaApprovalScopeHash({
    ...createResult.run.approvalScope,
  });
  assert(
    deterministicScopeHashOne === deterministicScopeHashTwo &&
      deterministicScopeHashOne === createResult.run.approvalScopeHash,
    "Approval scope hashes must be deterministic."
  );

  const approvedRun = await mainStore.approveRun(createResult.run.runId, {
    approvalScopeHash: createResult.run.approvalScopeHash,
    approved: true,
    acknowledgement: true,
    expectedRevision: createResult.run.revision,
  });
  assert(approvedRun.approval !== null, "Approval must be persisted.");
  assert(approvedRun.state === "approved", "Approval must move the run to approved.");
  assert(
    approvedRun.auditEvents.some((event) => event.eventType === "approval.granted"),
    "approval.granted must be appended."
  );
  assert(
    approvedRun.revision === createResult.run.revision + 1,
    "Approval must increment the revision."
  );
  assert(
    approvedRun.approval.executionAvailabilityStatement ===
      privateAlpha.PRIVATE_ALPHA_APPROVAL_LOCK_STATEMENT,
    "Approval records must state that provider execution remains unavailable."
  );

  await expectStoreError(
    () =>
      mainStore.approveRun(createResult.run.runId, {
        approvalScopeHash: createResult.run.approvalScopeHash,
        approved: true,
        acknowledgement: true,
        expectedRevision: approvedRun.revision,
      }),
    409,
    "not eligible"
  );

  const staleRun = await mainStore.createRun(
    {
      requestText: "Create a stale revision approval test run.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 128,
    },
    "private-alpha-foundation-key-0003"
  );
  await expectStoreError(
    () =>
      mainStore.approveRun(staleRun.run.runId, {
        approvalScopeHash: staleRun.run.approvalScopeHash,
        approved: true,
        acknowledgement: true,
        expectedRevision: staleRun.run.revision + 1,
      }),
    409,
    "stale"
  );

  const wrongScopeRun = await mainStore.createRun(
    {
      requestText: "Create a wrong scope approval test run.",
      capability: "text",
      modelPreferenceLabel: "wrong-scope-check",
      maximumOutputTokens: 160,
    },
    "private-alpha-foundation-key-0004"
  );
  await expectStoreError(
    () =>
      mainStore.approveRun(wrongScopeRun.run.runId, {
        approvalScopeHash: "0".repeat(64),
        approved: true,
        acknowledgement: true,
        expectedRevision: wrongScopeRun.run.revision,
      }),
    409,
    "does not match"
  );

  const canceledAwaitingRun = await mainStore.createRun(
    {
      requestText: "Cancel an awaiting approval run.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 144,
    },
    "private-alpha-foundation-key-0005"
  );
  const canceledAwaitingResult = await mainStore.cancelRun(canceledAwaitingRun.run.runId, {
    expectedRevision: canceledAwaitingRun.run.revision,
    reason: "Operator canceled awaiting approval.",
  });
  assert(
    canceledAwaitingResult.state === "canceled",
    "Cancellation from awaiting_approval must succeed."
  );
  await expectStoreError(
    () =>
      mainStore.cancelRun(canceledAwaitingRun.run.runId, {
        expectedRevision: canceledAwaitingResult.revision,
        reason: "Cancel again.",
      }),
    409,
    "not eligible"
  );

  const canceledApprovedRun = await mainStore.cancelRun(approvedRun.runId, {
    expectedRevision: approvedRun.revision,
    reason: "Operator canceled after approval.",
  });
  assert(
    canceledApprovedRun.state === "canceled",
    "Cancellation from approved must succeed."
  );

  const freshStore = storeModule.createPrivateAlphaStoreForTesting("foundation-main");
  const freshReadRun = await freshStore.getRun(canceledApprovedRun.runId);
  assert(
    freshReadRun.auditEvents.length === canceledApprovedRun.auditEvents.length,
    "Audit events must survive a fresh store read."
  );
  assert(
    freshReadRun.auditEvents.some((event) => event.eventType === "run.canceled"),
    "Fresh reads must include run.canceled."
  );

  const malformedStore = storeModule.createPrivateAlphaStoreForTesting("foundation-malformed");
  const malformedRoot = toAbsolutePath(malformedLabel);
  await fsp.mkdir(path.join(malformedRoot, "runs"), { recursive: true });
  await fsp.mkdir(path.join(malformedRoot, "idempotency"), { recursive: true });
  const malformedRunId = "b".repeat(24);
  await fsp.writeFile(
    path.join(malformedRoot, "runs", `${malformedRunId}.json`),
    "{\n  \"version\": 1\n}\n",
    "utf8"
  );
  await expectStoreError(
    () => malformedStore.getRun(malformedRunId),
    500,
    "malformed"
  );

  await expectStoreError(() => mainStore.getRun("../blocked"), 400, "runId");

  const secretValue = "Bearer real-secret-token-1234567890";
  const secretError = await expectStoreError(
    () =>
      mainStore.createRun(
        {
          requestText: `Do not use this ${secretValue}`,
          capability: "text",
          modelPreferenceLabel: null,
          maximumOutputTokens: 128,
        },
        "private-alpha-foundation-key-0006"
      ),
    422,
    "secret-like"
  );
  assert(
    !String(secretError.message).includes(secretValue),
    "Rejected secret text must not be echoed in errors."
  );

  process.env.CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH = "enabled";
  const envKillStatus = await mainStore.getStatus();
  assert(
    envKillStatus.killSwitchEngaged &&
      envKillStatus.killSwitchSources.includes("environment"),
    "Kill-switch environment detection must work."
  );
  delete process.env.CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH;

  const killSwitchFileAbsolutePath = path.join(mainRootAbsolutePath, "KILL_SWITCH");
  await fsp.writeFile(killSwitchFileAbsolutePath, "engaged\n", "utf8");
  const fileKillStatus = await mainStore.getStatus();
  assert(
    fileKillStatus.killSwitchEngaged &&
      fileKillStatus.killSwitchSources.includes("file"),
    "Kill-switch file detection must work."
  );
  await fsp.rm(killSwitchFileAbsolutePath, { force: true });

  const executeRouteExists = fs.existsSync(
    path.join(
      repoRoot,
      "src",
      "app",
      "api",
      "codexforge",
      "private-alpha",
      "execute",
      "route.ts"
    )
  );
  assert(!executeRouteExists, "No execute route must exist in this slice.");

  const providerSdkPattern =
    /\bfrom\s+["'](?:openai|anthropic|@anthropic-ai\/sdk|google-genai|@google\/genai)["']/;
  const externalUrlPattern = /https?:\/\//i;
  const providerCallPattern =
    /\b(?:responses\.create|chat\.completions|messages\.create|generateContent|invokeModel)\b/;
  const shellExecutionPattern = /\b(?:child_process|spawn\(|exec\(|execFile\(|fork\()\b/;
  const browserStoragePattern =
    /\b(?:localStorage|sessionStorage|indexedDB|document\.cookie)\b/i;
  const rawTransportPattern =
    /\bfetch\s*\(|\bXMLHttpRequest\b|\baxios\b|\bsendBeacon\b/;
  const providerHostnamePattern =
    /\b(?:api\.openai\.com|api\.anthropic\.com|generativelanguage\.googleapis\.com|openrouter\.ai|bedrock-runtime|azure\.com)\b/i;
  const forbiddenServerImportPattern =
    /\b(?:server-only|private-alpha-store\.server|private-alpha-kill-switch\.server|node:fs|node:path|node:crypto)\b/;
  const retryOrFallbackPattern = /\b(?:retry|fallback)\b/i;
  const arbitraryTargetParameterPattern =
    /export function \w+\([^)]*\b(?:url|path|route|endpoint|href|uri)\b/i;

  assert(
    !providerSdkPattern.test(newSourceText),
    "No provider SDK import must exist in the new code."
  );
  assert(
    !externalUrlPattern.test(newSourceText),
    "No external provider URL must exist in the new code."
  );
  assert(
    !providerCallPattern.test(newSourceText),
    "No provider or model call must exist in the new code."
  );
  assert(
    !shellExecutionPattern.test(newSourceText),
    "No shell or process execution must exist in the new code."
  );
  assert(
    !rawTransportPattern.test(panelSource),
    "PrivateAlphaRunPanel must not contain raw fetch or alternate transport calls."
  );
  assert(
    !rawTransportPattern.test(athenaPanelSource),
    "AthenaCommandCenterPanel must not contain raw fetch or alternate transport calls."
  );
  assert(
    panelSource.includes(
      'from "@/lib/codexforge/private-alpha/private-alpha-api-client";'
    ),
    "PrivateAlphaRunPanel must import the dedicated API client."
  );
  assert(
    clientSource.includes(
      'const PRIVATE_ALPHA_API_BASE_PATH = "/api/codexforge/private-alpha";'
    ),
    "Dedicated API client must define the same-origin private-alpha base path."
  );
  assert(
    clientSource.includes('${PRIVATE_ALPHA_API_BASE_PATH}/status') &&
      clientSource.includes('${PRIVATE_ALPHA_API_BASE_PATH}/runs') &&
      clientSource.includes('}/approve') &&
      clientSource.includes('}/cancel'),
    "Dedicated API client must contain every supported private-alpha endpoint."
  );
  assert(
    !externalUrlPattern.test(clientSource),
    "No external URL must exist in the dedicated API client."
  );
  assert(
    !providerHostnamePattern.test(clientSource),
    "No provider hostname must exist in the dedicated API client."
  );
  assert(
    !providerSdkPattern.test(clientSource),
    "No provider SDK import must exist in the dedicated API client."
  );
  assert(
    !retryOrFallbackPattern.test(clientSource),
    "No retry or fallback logic must exist in the dedicated API client."
  );
  assert(
    !browserStoragePattern.test(clientSource) &&
      !browserStoragePattern.test(panelSource),
    "No browser storage or cookie access must exist in the private-alpha client boundary."
  );
  assert(
    !shellExecutionPattern.test(clientSource),
    "No shell or process execution must exist in the dedicated API client."
  );
  assert(
    !forbiddenServerImportPattern.test(clientSource),
    "No server-only store, kill-switch, or node builtin import may exist in the dedicated API client."
  );
  assert(
    !arbitraryTargetParameterPattern.test(clientSource),
    "The dedicated API client must not accept arbitrary URL or path parameters."
  );
  assert(
    /function buildValidatedRunSegment\(runId: string\)[\s\S]*validatePrivateAlphaRunId\(runId\)[\s\S]*encodeURIComponent\(validation\.value\)/.test(
      clientSource
    ),
    "Run IDs must be validated before route construction and encoding."
  );
  assert(
    clientSource.includes("Absolute URLs are not allowed") &&
      clientSource.includes("Protocol-relative URLs are not allowed") &&
      clientSource.includes("relative same-origin targets") &&
      clientSource.includes("Traversal is not allowed") &&
      clientSource.includes("Only approved private-alpha API targets are allowed."),
    "Dedicated API client must reject disallowed private-alpha targets."
  );
  assert(
    /case "status":[\s\S]*case "list-runs":[\s\S]*case "fetch-run":[\s\S]*cache: "no-store"/.test(
      clientSource
    ),
    "Read operations must use cache: no-store."
  );
  assert(
    /"Idempotency-Key": operation\.idempotencyKey/.test(clientSource),
    "Idempotency-Key must be sent as the required request header."
  );
  assert(
    (clientSource.match(/Idempotency-Key/g) ?? []).length === 1,
    "Idempotency-Key must appear only in the request header path."
  );

  assert(
    athenaPanelSource.includes("import { PrivateAlphaRunPanel } from \"./PrivateAlphaRunPanel\";") &&
      athenaPanelSource.includes("<PrivateAlphaRunPanel />"),
    "Athena Command Center must render the private-alpha panel."
  );
  assert(
    jarvisShellSource.includes("<AthenaCommandCenterPanel commandCenter={ATHENA_COMMAND_CENTER_MODEL} />") &&
      jarvisShellSource.includes("<JarvisDeveloperDiagnosticsDock"),
    "Private-alpha workflow remains above developer diagnostics through Athena."
  );

  assert(
    runRouteSource.includes("params: Promise<{") &&
      approveRouteSource.includes("params: Promise<{") &&
      cancelRouteSource.includes("params: Promise<{"),
    "Private-alpha route handlers must remain strongly typed."
  );

  const longestNewSourcePathLength = newSourcePaths.reduce(
    (maxLength, relativePath) => Math.max(maxLength, relativePath.length),
    0
  );
  assert(
    longestNewSourcePathLength < 220,
    "Longest new source path must stay under 220 characters."
  );

  await Promise.all([
    resetDataRoot(mainLabel),
    resetDataRoot(concurrentLabel),
    resetDataRoot(malformedLabel),
  ]);

  return {
    success: true,
    mainRunId: createResult.run.runId,
    concurrentRunId: concurrentResults[0].run.runId,
    dataRootLabel: defaultStatus.dataRootLabel,
    longestNewSourcePathLength,
  };
}

main()
  .then((result) => {
    process.stdout.write(`${JSON.stringify(result)}\n`);
  })
  .catch((error) => {
    const message =
      error instanceof Error && error.message ? error.message : String(error);
    process.stderr.write(`${message}\n`);
    process.exit(1);
  });
'@

$validationRaw = $nodeScript | & node - $root 2>&1
if ($LASTEXITCODE -ne 0) {
  throw "[FAIL] Private-alpha runtime validation failed: $validationRaw"
}

$validation = $validationRaw | ConvertFrom-Json
Assert-True ([bool]$validation.success) "Node runtime validation passed"
Assert-True ($validation.longestNewSourcePathLength -lt 220) "Longest new source path stays under 220 characters"

Write-Host "[PASS] CodexForge Private Alpha foundation smoke complete."
