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
Write-Host "=== CodexForge Private Alpha local Ollama execution smoke ==="

$requiredFiles = @(
  "src\lib\codexforge\private-alpha\private-alpha-types.ts",
  "src\lib\codexforge\private-alpha\private-alpha-validation.ts",
  "src\lib\codexforge\private-alpha\private-alpha-state-machine.ts",
  "src\lib\codexforge\private-alpha\private-alpha-store.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-kill-switch.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-ollama.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-api-client.ts",
  "src\lib\codexforge\private-alpha\index.ts",
  "src\app\api\codexforge\private-alpha\status\route.ts",
  "src\app\api\codexforge\private-alpha\runs\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\approve\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\cancel\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\execute\route.ts",
  "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx",
  "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.module.css",
  "docs\codexforge-private-alpha-v0.md",
  "docs\codexforge-private-alpha-local-ollama-execution-v0.md",
  "scripts\smoke-codexforge-private-alpha-local-ollama-execution.ps1"
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

$ollamaSource = Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-ollama.server.ts"
$ollamaFirstLine = (Get-Content "src\lib\codexforge\private-alpha\private-alpha-ollama.server.ts" -TotalCount 1)
Assert-True ($ollamaFirstLine -eq 'import "server-only";') 'Server-only Ollama module begins with import "server-only";'
Assert-Contains $ollamaSource 'http://127.0.0.1:11434' "Production origin is fixed to the loopback endpoint"
Assert-Contains $ollamaSource 'PRIVATE_ALPHA_OLLAMA_TAGS_PATH = "/api/tags"' "Only the fixed /api/tags availability path is declared"
Assert-Contains $ollamaSource 'PRIVATE_ALPHA_OLLAMA_CHAT_PATH = "/api/chat"' "Only the fixed /api/chat generation path is declared"

$athenaAliasSource = Get-Content -Raw "src\app\athena\page.tsx"
Assert-Contains $athenaAliasSource 'export { default } from "../jarvis/page";' "/athena remains an alias of /jarvis"

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
  const ollamaModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-ollama.server.ts"
  ));
  const stateMachineModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-state-machine.ts"
  ));

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

  function toAbsolutePath(relativePath) {
    return path.join(repoRoot, ...relativePath.split("/"));
  }

  async function resetDataRoot(label) {
    await fsp.rm(path.join(repoRoot, ...label.split("/")), {
      recursive: true,
      force: true,
    });
  }

  function createAbortError() {
    const error = new Error("aborted");
    error.name = "AbortError";
    return error;
  }

  function makeJsonResponse(payload, status = 200) {
    return new Response(JSON.stringify(payload), {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function createHarness(options = {}) {
    const callUrls = [];
    const requestBodies = [];
    let tagsCalls = 0;
    let chatCalls = 0;

    const fetchFn = async (input, init = {}) => {
      const url = new URL(String(input));
      callUrls.push(url.toString());

      assert(
        url.origin === ollamaModule.PRIVATE_ALPHA_OLLAMA_ORIGIN,
        "Only the fixed Ollama origin may be used."
      );

      if (url.pathname === ollamaModule.PRIVATE_ALPHA_OLLAMA_TAGS_PATH) {
        tagsCalls += 1;
        if (options.onTags) {
          return options.onTags({ url, init, tagsCalls, chatCalls, requestBodies });
        }

        return makeJsonResponse({
          models: [{ name: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL }],
        });
      }

      if (url.pathname === ollamaModule.PRIVATE_ALPHA_OLLAMA_CHAT_PATH) {
        chatCalls += 1;
        if (init.body) {
          requestBodies.push(JSON.parse(String(init.body)));
        }

        if (options.onChat) {
          return options.onChat({ url, init, tagsCalls, chatCalls, requestBodies });
        }

        return makeJsonResponse({
          model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
          message: {
            role: "assistant",
            content: "default test output",
          },
          done: true,
        });
      }

      throw new Error(`Unexpected Ollama path ${url.pathname}.`);
    };

    return {
      fetchFn,
      getStats() {
        return {
          tagsCalls,
          chatCalls,
          callUrls: [...callUrls],
          requestBodies: [...requestBodies],
        };
      },
    };
  }

  function createLocalStore(testSuffix, harness, timeouts = {}) {
    const ollamaClient = ollamaModule.createPrivateAlphaOllamaClientForTesting({
      fetchFn: harness.fetchFn,
      availabilityTimeoutMs: timeouts.availabilityTimeoutMs ?? 25,
      generationTimeoutMs: timeouts.generationTimeoutMs ?? 25,
    });

    return storeModule.createPrivateAlphaStoreForTesting(testSuffix, {
      runtimeProfile: privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
      ollamaClient,
    });
  }

  function getRunFileAbsolutePath(testLabel, runId) {
    return path.join(toAbsolutePath(testLabel), "runs", `${runId}.json`);
  }

  const sourceFiles = [
    "src/lib/codexforge/private-alpha/private-alpha-types.ts",
    "src/lib/codexforge/private-alpha/private-alpha-validation.ts",
    "src/lib/codexforge/private-alpha/private-alpha-state-machine.ts",
    "src/lib/codexforge/private-alpha/private-alpha-store.server.ts",
    "src/lib/codexforge/private-alpha/private-alpha-kill-switch.server.ts",
    "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts",
    "src/lib/codexforge/private-alpha/private-alpha-api-client.ts",
    "src/lib/codexforge/private-alpha/index.ts",
    "src/app/api/codexforge/private-alpha/status/route.ts",
    "src/app/api/codexforge/private-alpha/runs/route.ts",
    "src/app/api/codexforge/private-alpha/runs/[runId]/route.ts",
    "src/app/api/codexforge/private-alpha/runs/[runId]/approve/route.ts",
    "src/app/api/codexforge/private-alpha/runs/[runId]/cancel/route.ts",
    "src/app/api/codexforge/private-alpha/runs/[runId]/execute/route.ts",
    "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx",
    "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.module.css",
  ];
  const sourceText = sourceFiles.map(readText).join("\n");
  const ollamaSource = readText(
    "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts"
  );
  const clientSource = readText(
    "src/lib/codexforge/private-alpha/private-alpha-api-client.ts"
  );
  const panelSource = readText(
    "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx"
  );
  const executeRouteSource = readText(
    "src/app/api/codexforge/private-alpha/runs/[runId]/execute/route.ts"
  );
  const killSwitchSource = readText(
    "src/lib/codexforge/private-alpha/private-alpha-kill-switch.server.ts"
  );

  const cloudHostnamePattern =
    /\b(?:api\.openai\.com|api\.groq\.com|generativelanguage\.googleapis\.com|openrouter\.ai|api\.anthropic\.com)\b/i;
  const providerSdkPattern =
    /\bfrom\s+["'](?:openai|groq-sdk|@google\/genai|google-genai|openrouter|anthropic|@anthropic-ai\/sdk)["']/;
  const credentialEnvPattern =
    /\b(?:OPENAI_API_KEY|GROQ_API_KEY|GEMINI_API_KEY|OPENROUTER_API_KEY)\b/;
  const shellProcessPattern =
    /\b(?:child_process|spawn\(|exec\(|execFile\(|fork\(|Start-Process)\b/;
  const workerDispatchPattern =
    /\b(?:worker_threads|bullmq|bull|agenda|bee-queue|rq|celery|job\s+dispatch)\b/i;
  const browserStoragePattern =
    /\b(?:localStorage|sessionStorage|indexedDB|document\.cookie)\b/i;
  const rawTransportPattern =
    /\bfetch\s*\(|\bXMLHttpRequest\b|\baxios\b|\bsendBeacon\b/;
  const tsEscapePattern = /@ts-nocheck|@ts-expect-error|\bas any\b|:\s*any\b/;

  assert(
    !("createPrivateAlphaStore" in privateAlpha) &&
      !("readPrivateAlphaKillSwitchState" in privateAlpha) &&
      !("createPrivateAlphaOllamaClient" in privateAlpha),
    "Server-only store, kill-switch, and Ollama modules must stay out of the client-safe index."
  );

  assert(
    stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.awaiting_approval.approve === "approved" &&
      stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.approved.execute === "executing" &&
      stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.executing.succeed === "succeeded" &&
      stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.executing.fail === "failed" &&
      stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.executing.block === "blocked",
    "Required execution state transitions must exist."
  );
  assert(
    Object.keys(stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.canceled).length === 0 &&
      Object.keys(stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.blocked).length === 0 &&
      Object.keys(stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.succeeded).length === 0 &&
      Object.keys(stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.failed).length === 0,
    "Terminal states must have no outgoing transitions."
  );

  assert(
    ollamaSource.includes('const PRIVATE_ALPHA_OLLAMA_MAX_RESPONSE_BYTES') &&
      ollamaSource.includes('redirect: "error"'),
    "Ollama requests must stay bounded and reject redirects."
  );
  assert(
    (ollamaSource.match(/\/api\//g) ?? []).length === 2,
    "Only /api/tags and /api/chat may be used by the Ollama module."
  );
  assert(
    !/origin\??\s*:|baseUrl|baseURL|providerUrl|providerURL/.test(ollamaSource),
    "No caller-controlled production origin may be accepted."
  );
  assert(!cloudHostnamePattern.test(sourceText), "No cloud hostname may exist.");
  assert(!providerSdkPattern.test(sourceText), "No provider SDK import may exist.");
  assert(!credentialEnvPattern.test(sourceText), "No credential environment variable may be read.");
  assert(
    killSwitchSource.includes("CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH") &&
      (killSwitchSource.match(/process\.env\./g) ?? []).length === 1,
    "Kill-switch environment reads must remain bounded to the existing variable."
  );
  assert(
    executeRouteSource.includes('request.headers.get("Idempotency-Key")') &&
      executeRouteSource.includes("store.executeRun"),
    "Execute route must require Idempotency-Key and call store.executeRun."
  );
  assert(
    clientSource.includes("/execute") &&
      clientSource.includes('const PRIVATE_ALPHA_API_BASE_PATH = "/api/codexforge/private-alpha";') &&
      !cloudHostnamePattern.test(clientSource),
    "Browser calls must stay on same-origin private-alpha routes."
  );
  assert(
    !clientSource.includes("127.0.0.1:11434") && !panelSource.includes("127.0.0.1:11434"),
    "The browser must never call Ollama directly."
  );
  assert(!rawTransportPattern.test(panelSource), "PrivateAlphaRunPanel must not contain raw fetch.");
  assert(
    !browserStoragePattern.test(clientSource) && !browserStoragePattern.test(panelSource),
    "No browser storage may be used by the private-alpha client boundary."
  );
  assert(
    !/https?:\/\//i.test(clientSource) && !/https?:\/\//i.test(panelSource),
    "No external URL may exist in the UI client."
  );
  assert(!shellProcessPattern.test(sourceText), "No shell or child process code may exist.");
  assert(
    !workerDispatchPattern.test(sourceText),
    "No worker or job-dispatch runtime may be introduced."
  );
  assert(!tsEscapePattern.test(sourceText), "No any, as any, ts-nocheck, or ts-expect-error may be introduced.");

  const localStatusHarness = createHarness();
  const localStatusStore = createLocalStore("local-status", localStatusHarness);
  await resetDataRoot(storeModule.buildPrivateAlphaTestingDataRootLabel("local-status"));
  delete process.env.CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH;
  const localStatus = await localStatusStore.getStatus();
  assert(
    localStatus.mode === "private-alpha-local-ollama" &&
      localStatus.providerExecution === "local-ollama" &&
      localStatus.providerLabel === privateAlpha.PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL &&
      localStatus.configuredModel === privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL &&
      localStatus.providerAvailable === true &&
      localStatus.modelAvailable === true &&
      localStatus.executionAllowed === true,
    "Local status must expose provider availability, model availability, and executionAllowed."
  );

  const localLabel = storeModule.buildPrivateAlphaTestingDataRootLabel("slice-b-local");
  await resetDataRoot(localLabel);
  const localHarness = createHarness({
    onChat({ init }) {
      const payload = JSON.parse(String(init.body));
      assert(payload.model === privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL, "Chat request must use the fixed model.");
      assert(
        Array.isArray(payload.messages) &&
          payload.messages.length === 1 &&
          payload.messages[0].role === "user",
        "Chat request must include exactly one user message."
      );
      assert(payload.stream === false, "Chat request must disable streaming.");
      assert(payload.think === false, "Chat request must disable think.");
      assert(
        payload.options && payload.options.num_predict === 256,
        "Chat request must bind num_predict to the approved output limit."
      );
      assert(
        !("tools" in payload) && !("system" in payload),
        "Chat request must not include tools or a hidden system prompt."
      );

      return makeJsonResponse({
        model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
        message: {
          role: "assistant",
          content: "local ollama output",
          thinking: "not persisted",
        },
        done: true,
        done_reason: "stop",
        total_duration: 2500000000,
        load_duration: 100000000,
        prompt_eval_count: 48,
        eval_count: 91,
      });
    },
  });
  const localStore = createLocalStore("slice-b-local", localHarness);
  const localRunResult = await localStore.createRun(
    {
      requestText: "Summarize this local-only execution slice.",
      capability: "text",
      modelPreferenceLabel: " ",
      maximumOutputTokens: 256,
    },
    "private-alpha-local-create-0001"
  );
  assert(
    localRunResult.run.request.providerPreference === privateAlpha.PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
    "New runs must bind provider ollama-local."
  );
  assert(
    localRunResult.run.request.modelPreferenceLabel === privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
    "New runs must bind model gpt-oss:20b."
  );
  assert(
    localRunResult.run.request.executionMode === privateAlpha.PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE,
    "New runs must bind manual-approved-local-provider."
  );
  assert(
    localRunResult.run.state === "awaiting_approval" &&
      localRunResult.run.approval === null &&
      localRunResult.run.execution === null,
    "Approval must remain separate from run creation."
  );

  await expectStoreError(
    () => localStore.createRun(
      {
        requestText: "Reject a wrong local model.",
        capability: "text",
        modelPreferenceLabel: "another-model",
        maximumOutputTokens: 128,
      },
      "private-alpha-local-create-0002"
    ),
    400,
    "modelPreferenceLabel"
  );

  await expectStoreError(
    () =>
      localStore.executeRun(localRunResult.run.runId, {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: localRunResult.run.approvalScopeHash,
        expectedRevision: localRunResult.run.revision,
      }, "private-alpha-exec-awaiting-0001"),
    409,
    "eligible"
  );

  const approvedLocalRun = await localStore.approveRun(localRunResult.run.runId, {
    approvalScopeHash: localRunResult.run.approvalScopeHash,
    approved: true,
    acknowledgement: true,
    expectedRevision: localRunResult.run.revision,
  });
  assert(
    approvedLocalRun.state === "approved" &&
      approvedLocalRun.execution === null,
    "Execution must remain separate after approval."
  );

  await expectStoreError(
    () =>
      localStore.executeRun(
        approvedLocalRun.runId,
        {
          execute: false,
          acknowledgement: true,
          approvalScopeHash: approvedLocalRun.approvalScopeHash,
          expectedRevision: approvedLocalRun.revision,
        },
        "private-alpha-local-exec-invalid-0001"
      ),
    400,
    "execute must be exactly true"
  );
  await expectStoreError(
    () =>
      localStore.executeRun(
        approvedLocalRun.runId,
        {
          execute: true,
          acknowledgement: false,
          approvalScopeHash: approvedLocalRun.approvalScopeHash,
          expectedRevision: approvedLocalRun.revision,
        },
        "private-alpha-local-exec-invalid-0002"
      ),
    400,
    "acknowledgement must be exactly true"
  );
  await expectStoreError(
    () =>
      localStore.executeRun(
        approvedLocalRun.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: "0".repeat(64),
          expectedRevision: approvedLocalRun.revision,
        },
        "private-alpha-local-exec-invalid-0003"
      ),
    409,
    "Approval scope hash does not match"
  );
  await expectStoreError(
    () =>
      localStore.executeRun(
        approvedLocalRun.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: approvedLocalRun.approvalScopeHash,
          expectedRevision: approvedLocalRun.revision + 1,
        },
        "private-alpha-local-exec-invalid-0004"
      ),
    409,
    "stale"
  );
  await expectStoreError(
    () =>
      localStore.executeRun(
        approvedLocalRun.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: approvedLocalRun.approvalScopeHash,
          expectedRevision: approvedLocalRun.revision,
        },
        null
      ),
    400,
    "Idempotency-Key header is required"
  );

  const executionResult = await localStore.executeRun(
    approvedLocalRun.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: approvedLocalRun.approvalScopeHash,
      expectedRevision: approvedLocalRun.revision,
    },
    "private-alpha-local-exec-success-0001"
  );
  const localStats = localHarness.getStats();
  assert(localStats.tagsCalls === 1, "Execution must probe /api/tags once.");
  assert(localStats.chatCalls === 1, "Execution must call /api/chat once.");
  assert(
    localStats.callUrls.every((url) => {
      const parsed = new URL(url);
      return (
        parsed.pathname === ollamaModule.PRIVATE_ALPHA_OLLAMA_TAGS_PATH ||
        parsed.pathname === ollamaModule.PRIVATE_ALPHA_OLLAMA_CHAT_PATH
      );
    }),
    "Only /api/tags and /api/chat may be called."
  );
  assert(executionResult.run.state === "succeeded", "Successful execution must persist succeeded state.");
  assert(
    executionResult.run.execution &&
      executionResult.run.execution.outputText === "local ollama output",
    "Successful output must be persisted."
  );
  assert(
    executionResult.run.execution.outputSha256 ===
      crypto.createHash("sha256").update("local ollama output", "utf8").digest("hex"),
    "Successful output hash must be correct."
  );
  assert(
    executionResult.run.execution.doneReason === "stop" &&
      executionResult.run.execution.totalDurationNanoseconds === 2500000000 &&
      executionResult.run.execution.loadDurationNanoseconds === 100000000 &&
      executionResult.run.execution.promptEvalCount === 48 &&
      executionResult.run.execution.evalCount === 91,
    "Successful provider metadata must be persisted."
  );
  const localRunText = fs.readFileSync(getRunFileAbsolutePath(localLabel, approvedLocalRun.runId), "utf8");
  assert(
    !localRunText.includes("private-alpha-local-exec-success-0001"),
    "Raw execution idempotency keys must never be persisted."
  );
  assert(!localRunText.includes("not persisted"), "Thinking must not be persisted.");

  const successReplay = await localStore.executeRun(
    approvedLocalRun.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: approvedLocalRun.approvalScopeHash,
      expectedRevision: approvedLocalRun.revision,
    },
    "private-alpha-local-exec-success-0001"
  );
  assert(successReplay.replayed === true, "Same execution key must replay safely.");
  assert(localHarness.getStats().chatCalls === 1, "Replay must not create a second chat call.");
  await expectStoreError(
    () =>
      localStore.executeRun(
        approvedLocalRun.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: approvedLocalRun.approvalScopeHash,
          expectedRevision: approvedLocalRun.revision,
        },
        "private-alpha-local-exec-success-0002"
      ),
    409,
    "one allowed execution attempt"
  );
  assert(localHarness.getStats().chatCalls === 1, "At most one chat call may occur per run.");
  assert(
    executionResult.run.auditEvents.every(
      (event) =>
        !event.summary.includes("Summarize this local-only execution slice.") &&
        !event.summary.includes("local ollama output")
    ),
    "Audit summaries must exclude prompt text and output text."
  );

  const concurrentLabel = storeModule.buildPrivateAlphaTestingDataRootLabel("slice-b-concurrent");
  await resetDataRoot(concurrentLabel);
  const concurrentHarness = createHarness();
  const concurrentStore = createLocalStore("slice-b-concurrent", concurrentHarness);
  const concurrentRun = await concurrentStore.createRun(
    {
      requestText: "Run one concurrent local execution.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 128,
    },
    "private-alpha-concurrent-create-0001"
  );
  const concurrentApprovedRun = await concurrentStore.approveRun(concurrentRun.run.runId, {
    approvalScopeHash: concurrentRun.run.approvalScopeHash,
    approved: true,
    acknowledgement: true,
    expectedRevision: concurrentRun.run.revision,
  });
  const concurrentResults = await Promise.all([
    concurrentStore.executeRun(
      concurrentApprovedRun.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: concurrentApprovedRun.approvalScopeHash,
        expectedRevision: concurrentApprovedRun.revision,
      },
      "private-alpha-concurrent-exec-0001"
    ),
    concurrentStore.executeRun(
      concurrentApprovedRun.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: concurrentApprovedRun.approvalScopeHash,
        expectedRevision: concurrentApprovedRun.revision,
      },
      "private-alpha-concurrent-exec-0001"
    ),
  ]);
  assert(
    concurrentHarness.getStats().chatCalls === 1 &&
      concurrentResults.some((result) => result.replayed === true),
    "Concurrent duplicate execution must collapse to one provider chat call."
  );

  const executionStateLabel = storeModule.buildPrivateAlphaTestingDataRootLabel("slice-b-executing");
  await resetDataRoot(executionStateLabel);
  let executingSnapshot = null;
  const executionStateHarness = createHarness({
    onChat() {
      const runText = fs.readFileSync(
        getRunFileAbsolutePath(executionStateLabel, executingApproved.runId),
        "utf8"
      );
      executingSnapshot = JSON.parse(runText);
      return makeJsonResponse({
        model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
        message: { role: "assistant", content: "executing snapshot ok" },
        done: true,
      });
    },
  });
  const executionStateStore = createLocalStore("slice-b-executing", executionStateHarness);
  const executingRun = await executionStateStore.createRun(
    {
      requestText: "Check executing persistence before chat.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 64,
    },
    "private-alpha-executing-create-0001"
  );
  const executingApproved = await executionStateStore.approveRun(executingRun.run.runId, {
    approvalScopeHash: executingRun.run.approvalScopeHash,
    approved: true,
    acknowledgement: true,
    expectedRevision: executingRun.run.revision,
  });
  await executionStateStore.executeRun(
    executingApproved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: executingApproved.approvalScopeHash,
      expectedRevision: executingApproved.revision,
    },
    "private-alpha-executing-exec-0001"
  );
  assert(
    executingSnapshot &&
      executingSnapshot.state === "executing" &&
      executingSnapshot.execution &&
      executingSnapshot.execution.status === "executing",
    "Executing state must be persisted before the chat call."
  );

  const legacyLabel = storeModule.buildPrivateAlphaTestingDataRootLabel("slice-b-legacy");
  await resetDataRoot(legacyLabel);
  const legacyStore = storeModule.createPrivateAlphaStoreForTesting("slice-b-legacy");
  const legacyRun = await legacyStore.createRun(
    {
      requestText: "Legacy foundation run.",
      capability: "code",
      modelPreferenceLabel: "legacy-model-label",
      maximumOutputTokens: 90,
    },
    "private-alpha-legacy-create-0001"
  );
  assert(
    legacyRun.run.request.providerPreference === privateAlpha.PRIVATE_ALPHA_LEGACY_PROVIDER_PREFERENCE &&
      legacyRun.run.request.executionMode === privateAlpha.PRIVATE_ALPHA_LEGACY_EXECUTION_MODE,
    "Legacy Slice A runs must remain readable."
  );
  const legacyApproved = await legacyStore.approveRun(legacyRun.run.runId, {
    approvalScopeHash: legacyRun.run.approvalScopeHash,
    approved: true,
    acknowledgement: true,
    expectedRevision: legacyRun.run.revision,
  });
  await expectStoreError(
    () =>
      legacyStore.executeRun(
        legacyApproved.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: legacyApproved.approvalScopeHash,
          expectedRevision: legacyApproved.revision,
        },
        "private-alpha-legacy-exec-0001"
      ),
    409,
    "Legacy private-alpha runs"
  );

  const killLabel = storeModule.buildPrivateAlphaTestingDataRootLabel("slice-b-kill");
  await resetDataRoot(killLabel);
  const killHarness = createHarness();
  const killStore = createLocalStore("slice-b-kill", killHarness);
  const killRun = await killStore.createRun(
    {
      requestText: "Block this run by kill switch.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 128,
    },
    "private-alpha-kill-create-0001"
  );
  const killApproved = await killStore.approveRun(killRun.run.runId, {
    approvalScopeHash: killRun.run.approvalScopeHash,
    approved: true,
    acknowledgement: true,
    expectedRevision: killRun.run.revision,
  });
  process.env.CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH = "enabled";
  const killResult = await killStore.executeRun(
    killApproved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: killApproved.approvalScopeHash,
      expectedRevision: killApproved.revision,
    },
    "private-alpha-kill-exec-0001"
  );
  delete process.env.CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH;
  assert(
    killResult.run.state === "blocked" &&
      killResult.responseStatus === 409 &&
      killHarness.getStats().tagsCalls === 0 &&
      killHarness.getStats().chatCalls === 0,
    "Kill switch must block execution before tags or chat."
  );

  const missingModelLabel = storeModule.buildPrivateAlphaTestingDataRootLabel("slice-b-missing-model");
  await resetDataRoot(missingModelLabel);
  const missingModelHarness = createHarness({
    onTags() {
      return makeJsonResponse({
        models: [{ name: "different-model" }],
      });
    },
  });
  const missingModelStore = createLocalStore("slice-b-missing-model", missingModelHarness);
  const missingModelRun = await missingModelStore.createRun(
    {
      requestText: "Block on missing model.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 128,
    },
    "private-alpha-missing-model-create-0001"
  );
  const missingModelApproved = await missingModelStore.approveRun(missingModelRun.run.runId, {
    approvalScopeHash: missingModelRun.run.approvalScopeHash,
    approved: true,
    acknowledgement: true,
    expectedRevision: missingModelRun.run.revision,
  });
  const missingModelResult = await missingModelStore.executeRun(
    missingModelApproved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: missingModelApproved.approvalScopeHash,
      expectedRevision: missingModelApproved.revision,
    },
    "private-alpha-missing-model-exec-0001"
  );
  assert(
    missingModelResult.run.state === "blocked" &&
      missingModelHarness.getStats().chatCalls === 0,
    "Missing model must block execution before chat generation."
  );

  const unavailableLabel = storeModule.buildPrivateAlphaTestingDataRootLabel("slice-b-unavailable");
  await resetDataRoot(unavailableLabel);
  const unavailableHarness = createHarness({
    onTags() {
      throw new Error("offline");
    },
  });
  const unavailableStore = createLocalStore("slice-b-unavailable", unavailableHarness);
  const unavailableRun = await unavailableStore.createRun(
    {
      requestText: "Block on provider unavailable.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 128,
    },
    "private-alpha-unavailable-create-0001"
  );
  const unavailableApproved = await unavailableStore.approveRun(unavailableRun.run.runId, {
    approvalScopeHash: unavailableRun.run.approvalScopeHash,
    approved: true,
    acknowledgement: true,
    expectedRevision: unavailableRun.run.revision,
  });
  const unavailableResult = await unavailableStore.executeRun(
    unavailableApproved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: unavailableApproved.approvalScopeHash,
      expectedRevision: unavailableApproved.revision,
    },
    "private-alpha-unavailable-exec-0001"
  );
  assert(
    unavailableResult.run.state === "blocked" &&
      unavailableHarness.getStats().chatCalls === 0,
    "Unavailable provider must block execution before chat generation."
  );

  async function runFailureCase(testSuffix, harnessOptions, expectedState, expectedStatus, expectedCode) {
    const store = createLocalStore(testSuffix, createHarness(harnessOptions), harnessOptions.timeouts);
    const run = await store.createRun(
      {
        requestText: `Failure case ${testSuffix}.`,
        capability: "text",
        modelPreferenceLabel: null,
        maximumOutputTokens: 128,
      },
      `private-alpha-${testSuffix}-create-0001`
    );
    const approved = await store.approveRun(run.run.runId, {
      approvalScopeHash: run.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: run.run.revision,
    });
    const result = await store.executeRun(
      approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: approved.approvalScopeHash,
        expectedRevision: approved.revision,
      },
      `private-alpha-${testSuffix}-exec-0001`
    );
    assert(result.run.state === expectedState, `Failure case ${testSuffix} must persist ${expectedState}.`);
    assert(result.responseStatus === expectedStatus, `Failure case ${testSuffix} must return status ${expectedStatus}.`);
    assert(
      result.run.execution &&
        result.run.execution.errorCode === expectedCode &&
        result.run.execution.outputText === null,
      `Failure case ${testSuffix} must persist bounded failure data without partial output.`
    );
    return result;
  }

  const providerFailure = await runFailureCase(
    "provider-http-failure",
    {
      onChat() {
        return makeJsonResponse({ error: "bad" }, 500);
      },
    },
    "failed",
    200,
    "ollama_http_error"
  );
  assert(
    providerFailure.run.auditEvents.some((event) => event.eventType === "execution.failed"),
    "Provider failure must append execution.failed."
  );

  const timeoutFailure = await runFailureCase(
    "timeout-failure",
    {
      timeouts: {
        availabilityTimeoutMs: 25,
        generationTimeoutMs: 25,
      },
      onChat({ init }) {
        return new Promise((_, reject) => {
          init.signal.addEventListener("abort", () => reject(createAbortError()));
        });
      },
    },
    "failed",
    504,
    "ollama_timeout"
  );
  assert(timeoutFailure.run.execution.safeErrorMessage.includes("timeout"), "Timeout must persist a safe timeout message.");

  await runFailureCase(
    "malformed-response",
    {
      onChat() {
        return makeJsonResponse({
          model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
          message: { role: "assistant", content: "bad" },
        });
      },
    },
    "failed",
    200,
    "ollama_malformed_response"
  );

  await runFailureCase(
    "tool-call-response",
    {
      onChat() {
        return makeJsonResponse({
          model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
          message: {
            role: "assistant",
            content: "tool output",
            tool_calls: [{ id: "call-1" }],
          },
          done: true,
        });
      },
    },
    "failed",
    200,
    "ollama_malformed_response"
  );

  await runFailureCase(
    "image-response",
    {
      onChat() {
        return makeJsonResponse({
          model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
          message: {
            role: "assistant",
            content: "image output",
            images: ["abc"],
          },
          done: true,
        });
      },
    },
    "failed",
    200,
    "ollama_malformed_response"
  );

  await runFailureCase(
    "oversized-output",
    {
      onChat() {
        return makeJsonResponse({
          model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
          message: {
            role: "assistant",
            content: "x".repeat(privateAlpha.PRIVATE_ALPHA_MAX_OUTPUT_TEXT_LENGTH + 1),
          },
          done: true,
        });
      },
    },
    "failed",
    200,
    "ollama_output_too_large"
  );

  const longestNewSourcePathLength = sourceFiles.reduce(
    (maxLength, relativePath) => Math.max(maxLength, relativePath.length),
    0
  );
  assert(longestNewSourcePathLength < 220, "Longest new source path must stay under 220 characters.");

  return {
    success: true,
    longestNewSourcePathLength,
    localExecutionRunId: executionResult.run.runId,
    providerFailureState: providerFailure.run.state,
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
  throw "[FAIL] Private-alpha local execution validation failed: $validationRaw"
}

$validation = $validationRaw | ConvertFrom-Json
Assert-True ([bool]$validation.success) "Node runtime validation passed"
Assert-True ($validation.longestNewSourcePathLength -lt 220) "Longest new source path stays under 220 characters"

Write-Host "[PASS] CodexForge Private Alpha local Ollama execution smoke complete."
