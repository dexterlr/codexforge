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
  "src\lib\codexforge\private-alpha\private-alpha-http.server.ts",
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
  "scripts\codexforge-private-alpha-concurrency-worker.cjs",
  "scripts\smoke-codexforge-private-alpha-http-boundary.cjs",
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

& node.exe "scripts\build-codexforge-creator-native.cjs"
Assert-True ($LASTEXITCODE -eq 0) "Audited native filesystem boundary builds before Private Alpha process-identity tests"

& node.exe "scripts\smoke-codexforge-private-alpha-http-boundary.cjs"
Assert-True ($LASTEXITCODE -eq 0) "Private Alpha HTTP boundary rejects hostile requests before store or provider access"

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
const { spawn } = require("child_process");
const { once } = require("events");
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
  const ollamaAdapterModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-ollama-adapter.server.ts"
  ));
  const providerModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-provider.server.ts"
  ));
  const creatorAdapterModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "creator",
    "creator-private-alpha-adapter.server.ts"
  ));
  const stateMachineModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-state-machine.ts"
  ));
  const nativeFilesystemModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "creator",
    "creator-native-filesystem.server.ts"
  ));
  const privateAlphaNativeFilesystemModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-native-filesystem.server.ts"
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
      assert(
        error.status === expectedStatus,
        `Expected status ${expectedStatus}; received ${String(error.status)} (${String(error.message)}).`
      );
      if (messageFragment) {
        assert(
          String(error.message).includes(messageFragment),
          `Expected error to include ${messageFragment}; received ${String(error.message)}.`
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

  const ownedDataRootLabels = new Set();

  function exactOwnedDataRoot(label) {
    const base = path.resolve(repoRoot, ".codexforge", "private-alpha-tests");
    const target = path.resolve(repoRoot, ...label.split("/"));
    const relative = path.relative(base, target);
    assert(
      label.startsWith(".codexforge/private-alpha-tests/") &&
        relative &&
        relative !== ".." &&
        !relative.startsWith(`..${path.sep}`) &&
        !path.isAbsolute(relative),
      "Private Alpha deterministic cleanup is confined to one exact owned test suffix."
    );
    return target;
  }

  async function resetDataRoot(label) {
    ownedDataRootLabels.add(label);
    await fsp.rm(exactOwnedDataRoot(label), {
      recursive: true,
      force: true,
    });
  }

  async function cleanupOwnedDataRoots() {
    for (const label of ownedDataRootLabels) {
      await fsp.rm(exactOwnedDataRoot(label), {
        recursive: true,
        force: true,
      });
    }
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

  function createLocalProviderAdapter(harness, timeouts = {}) {
    const ollamaClient = ollamaModule.createPrivateAlphaOllamaClientForTesting({
      fetchFn: harness.fetchFn,
      availabilityTimeoutMs: timeouts.availabilityTimeoutMs ?? 25,
      generationTimeoutMs: timeouts.generationTimeoutMs ?? 25,
    });
    return ollamaAdapterModule.createPrivateAlphaOllamaProviderAdapter({
      ollamaClient,
    });
  }

  function createLocalStore(testSuffix, harness, timeouts = {}, transformAdapter = (adapter) => adapter) {
    const providerAdapter = createLocalProviderAdapter(harness, timeouts);

    return storeModule.createPrivateAlphaStoreForTesting(testSuffix, {
      runtimeProfile: privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
      providerAdapter: transformAdapter(providerAdapter),
    });
  }

  async function runIndependentStoreWorker(input) {
    const encodedInput = Buffer.from(JSON.stringify(input), "utf8").toString("base64url");
    const worker = spawn(
      process.execPath,
      [
        path.join(repoRoot, "scripts", "codexforge-private-alpha-concurrency-worker.cjs"),
        repoRoot,
        encodedInput,
      ],
      {
        cwd: repoRoot,
        env: {
          ...process.env,
          CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH: "off",
          GROQ_API_KEY: "",
        },
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true,
      }
    );
    let stdout = "";
    let stderr = "";
    worker.stdout.setEncoding("utf8");
    worker.stderr.setEncoding("utf8");
    worker.stdout.on("data", (chunk) => { stdout += chunk; });
    worker.stderr.on("data", (chunk) => { stderr += chunk; });
    const [exitCode] = await once(worker, "exit");
    assert(exitCode === 0, `Independent store worker exited ${exitCode}: ${stderr}`);
    const lines = stdout.trim().split(/\r?\n/u).filter(Boolean);
    assert(lines.length === 1, `Independent store worker emitted ambiguous output: ${stdout}`);
    return JSON.parse(lines[0]);
  }

  function getRunFileAbsolutePath(testLabel, runId) {
    return path.join(toAbsolutePath(testLabel), "runs", `${runId}.json`);
  }

  function getIdempotencyFileAbsolutePath(testLabel, idempotencyKeyHash) {
    return path.join(
      toAbsolutePath(testLabel),
      "idempotency",
      `${idempotencyKeyHash}.json`
    );
  }

  function getRunLockFileAbsolutePath(testLabel, runId) {
    return path.join(toAbsolutePath(testLabel), "locks", `${runId}.lock.json`);
  }

  async function snapshotMutationBoundary(testLabel, run, harness) {
    const locksDirectory = path.join(toAbsolutePath(testLabel), "locks");
    const lockEntries = await fsp.readdir(locksDirectory).catch((error) => {
      if (error && error.code === "ENOENT") return [];
      throw error;
    });
    const locks = [];
    for (const entry of [...lockEntries].sort()) {
      const absolutePath = path.join(locksDirectory, entry);
      const stat = await fsp.lstat(absolutePath);
      locks.push({
        entry,
        kind: stat.isFile() && !stat.isSymbolicLink() ? "file" : "unsafe",
        content: stat.isFile() && !stat.isSymbolicLink()
          ? await fsp.readFile(absolutePath, "utf8")
          : null,
      });
    }
    return JSON.stringify({
      run: await fsp.readFile(
        getRunFileAbsolutePath(testLabel, run.runId),
        "utf8"
      ),
      idempotency: await fsp.readFile(
        getIdempotencyFileAbsolutePath(testLabel, run.idempotencyKeyHash),
        "utf8"
      ),
      locks,
      provider: harness.getStats(),
    });
  }

  function creatorOwnership(projectId, purpose, bindingId) {
    return {
      kind: "creator",
      protocolVersion: privateAlpha.PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION,
      projectId,
      purpose,
      bindingId,
    };
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
    /\bchild_process\b|\b(?:spawn|execFile|fork)\s*\(|(?<![.\w])exec\s*\(|\bStart-Process\b/;
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
  assert(
    sourceText.includes("assertSecurePrivateAlphaMutationPlatform") &&
      sourceText.includes("audited handle-relative filesystem boundary is Windows-only"),
    "Private-alpha mutation has an explicit fail-closed platform capability boundary."
  );

  const platformDescriptor = Object.getOwnPropertyDescriptor(process, "platform");
  assert(
    platformDescriptor?.configurable === true,
    "Test runtime exposes a reversible process-platform probe boundary."
  );
  const nonWindowsSuffix = "non-windows-mutation-probe";
  const nonWindowsLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    nonWindowsSuffix
  );
  await resetDataRoot(nonWindowsLabel);
  const nonWindowsHarness = createHarness();
  const nonWindowsMutationStore = createLocalStore(nonWindowsSuffix, nonWindowsHarness);
  const absentRunId = "a".repeat(privateAlpha.PRIVATE_ALPHA_RUN_ID_LENGTH);
  const absentOwnership = creatorOwnership(
    "b".repeat(24),
    "generation",
    "c".repeat(32)
  );
  const nonWindowsRoot = toAbsolutePath(nonWindowsLabel);
  Object.defineProperty(process, "platform", { ...platformDescriptor, value: "linux" });
  try {
    const unsupportedStatus = await nonWindowsMutationStore.getStatus();
    assert(
      unsupportedStatus.approvalRecording === "unavailable" &&
        unsupportedStatus.executionAllowed === false,
      "Unsupported-platform status truthfully disables approval recording and execution."
    );
    assert(
      (await nonWindowsMutationStore.listRuns("10")).length === 0,
      "Unsupported-platform absent-root run listing remains read-only and empty."
    );
    await expectStoreError(() => nonWindowsMutationStore.getRun(absentRunId), 404, "Run not found");
    await expectStoreError(
      () => nonWindowsMutationStore.getCreatorRun(absentRunId, absentOwnership),
      404,
      "Run not found"
    );

    const unsupportedMutations = [
      () => nonWindowsMutationStore.createRun(
          {
            requestText: "This mutation must be rejected before persistence.",
            capability: "text",
            modelPreferenceLabel: null,
            maximumOutputTokens: 128,
          },
          "private-alpha-non-windows-mutation-probe-0001"
        ),
      () => nonWindowsMutationStore.createCreatorRun(
        {
          requestText: "This creator mutation must be rejected before persistence.",
          capability: "text",
          modelPreferenceLabel: null,
          maximumOutputTokens: 128,
        },
        "private-alpha-non-windows-creator-create-0001",
        absentOwnership
      ),
      () => nonWindowsMutationStore.lookupRunByIdempotencyKeyHash("d".repeat(64)),
      () => nonWindowsMutationStore.reconcileCreatorRunAfterInterruption(absentRunId, absentOwnership),
      () => nonWindowsMutationStore.approveRun(absentRunId, {}),
      () => nonWindowsMutationStore.approveCreatorRun(absentRunId, {}, absentOwnership),
      () => nonWindowsMutationStore.cancelRun(absentRunId, {}),
      () => nonWindowsMutationStore.cancelCreatorRun(absentRunId, {}, absentOwnership),
      () => nonWindowsMutationStore.executeRun(absentRunId, {}, "private-alpha-non-windows-execute-0001"),
      () => nonWindowsMutationStore.executeCreatorRun(
        absentRunId,
        {},
        "private-alpha-non-windows-creator-execute-0001",
        absentOwnership
      ),
    ];
    for (const mutation of unsupportedMutations) {
      await expectStoreError(
        mutation,
        503,
        "handle-relative filesystem boundary is Windows-only"
      );
      assert(
        !fs.existsSync(nonWindowsRoot),
        "Every unsupported-platform public mutation refuses before creating persistence."
      );
    }
  } finally {
    Object.defineProperty(process, "platform", platformDescriptor);
  }
  assert(
    !fs.existsSync(nonWindowsRoot) &&
      nonWindowsHarness.getStats().chatCalls === 0,
    "Unsupported-platform mutation refusal occurs before deterministic persistence is created."
  );

  const nativeUnavailableSuffix = "native-unavailable-capability";
  const nativeUnavailableLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    nativeUnavailableSuffix
  );
  await resetDataRoot(nativeUnavailableLabel);
  const nativeUnavailableHarness = createHarness();
  const nativeUnavailableStore = createLocalStore(
    nativeUnavailableSuffix,
    nativeUnavailableHarness
  );
  const originalNativeRootExists =
    privateAlphaNativeFilesystemModule.privateAlphaNativeRootExists;
  const originalNativeRootLease =
    privateAlphaNativeFilesystemModule.withPrivateAlphaNativeRootLease;
  assert(
    typeof originalNativeRootExists === "function" &&
      typeof originalNativeRootLease === "function",
    "Private-alpha native capability seams are explicit functions."
  );
  privateAlphaNativeFilesystemModule.privateAlphaNativeRootExists = () => {
    throw new privateAlphaNativeFilesystemModule.PrivateAlphaNativeFilesystemError(
      "unavailable",
      "injected deterministic native unavailability"
    );
  };
  privateAlphaNativeFilesystemModule.withPrivateAlphaNativeRootLease = async () => {
    throw new privateAlphaNativeFilesystemModule.PrivateAlphaNativeFilesystemError(
      "unavailable",
      "injected deterministic native unavailability"
    );
  };
  try {
    const unavailableNativeStatus = await nativeUnavailableStore.getStatus();
    assert(
      unavailableNativeStatus.approvalRecording === "unavailable" &&
        unavailableNativeStatus.executionAllowed === false &&
        unavailableNativeStatus.providerAvailable === false &&
        unavailableNativeStatus.modelAvailable === false,
      "Native helper unavailability is reported honestly without advertising mutation or execution."
    );
    await expectStoreError(
      () =>
        nativeUnavailableStore.createRun(
          {
            requestText: "Native capability loss must fail closed before persistence.",
            capability: "text",
            modelPreferenceLabel: null,
            maximumOutputTokens: 128,
          },
          "private-alpha-native-unavailable-probe-0001"
        ),
      503,
      "Secure private-alpha Windows filesystem support is unavailable"
    );
  assert(
    !fs.existsSync(toAbsolutePath(nativeUnavailableLabel)) &&
        nativeUnavailableHarness.getStats().tagsCalls === 0 &&
        nativeUnavailableHarness.getStats().chatCalls === 0,
      "Native helper unavailability performs no persistence or provider activity."
    );
  } finally {
    privateAlphaNativeFilesystemModule.privateAlphaNativeRootExists =
      originalNativeRootExists;
    privateAlphaNativeFilesystemModule.withPrivateAlphaNativeRootLease =
      originalNativeRootLease;
  }

  const swappedReservationSuffix = "swapped-publication-reservation";
  const swappedReservationLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    swappedReservationSuffix
  );
  await resetDataRoot(swappedReservationLabel);
  const swappedReservationHarness = createHarness();
  const swappedReservationStore = createLocalStore(
    swappedReservationSuffix,
    swappedReservationHarness
  );
  const swappedReservationKey =
    "private-alpha-swapped-publication-reservation-create-0001";
  const swappedReservationHash = crypto
    .createHash("sha256")
    .update(swappedReservationKey)
    .digest("hex");
  const swappedReservationPath = getIdempotencyFileAbsolutePath(
    swappedReservationLabel,
    swappedReservationHash
  );
  const swappedRunsDirectory = path.join(
    toAbsolutePath(swappedReservationLabel),
    "runs"
  );
  const originalReservationLease =
    privateAlphaNativeFilesystemModule.withPrivateAlphaNativeRootLease;
  let reservationLeaseCalls = 0;
  let originalReservedRunId = null;
  const replacementReservedRunId = "e".repeat(24);
  privateAlphaNativeFilesystemModule.withPrivateAlphaNativeRootLease = async (
    dataRootLabel,
    work
  ) => {
    if (dataRootLabel === swappedReservationLabel) {
      reservationLeaseCalls += 1;
      if (reservationLeaseCalls === 3) {
        const reservation = JSON.parse(
          await fsp.readFile(swappedReservationPath, "utf8")
        );
        originalReservedRunId = reservation.runId;
        assert(
          originalReservedRunId !== replacementReservedRunId &&
            reservation.publicationPhase === "reserved",
          "Reservation-swap seam observes one exact original reserved run."
        );
        reservation.runId = replacementReservedRunId;
        await fsp.writeFile(
          swappedReservationPath,
          `${JSON.stringify(reservation, null, 2)}\n`,
          "utf8"
        );
      }
    }
    return originalReservationLease(dataRootLabel, work);
  };
  try {
    await expectStoreError(
      () =>
        swappedReservationStore.createRun(
          {
            requestText: "A changed reservation must not publish under the wrong lock.",
            capability: "text",
            modelPreferenceLabel: null,
            maximumOutputTokens: 128,
          },
          swappedReservationKey
        ),
      500,
      "publication reservation changed while acquiring its exact lock"
    );
  } finally {
    privateAlphaNativeFilesystemModule.withPrivateAlphaNativeRootLease =
      originalReservationLease;
  }
  assert(
    reservationLeaseCalls === 3 &&
      originalReservedRunId !== null &&
      (await fsp.readdir(swappedRunsDirectory)).length === 0 &&
      swappedReservationHarness.getStats().tagsCalls === 0 &&
      swappedReservationHarness.getStats().chatCalls === 0,
    "A reservation swap cannot publish either run or contact a provider under the wrong fence."
  );

  try {
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
  const localStatusRoot = toAbsolutePath(
    storeModule.buildPrivateAlphaTestingDataRootLabel("local-status")
  );
  await fsp.mkdir(localStatusRoot, { recursive: true });
  const localKillSwitch = path.join(localStatusRoot, "KILL_SWITCH");
  async function assertKillSwitchFileState(setup, label) {
    await fsp.rm(localKillSwitch, { recursive: true, force: true });
    await setup();
    const availabilityCallsBefore = localStatusHarness.getStats().tagsCalls;
    const status = await localStatusStore.getStatus();
    assert(
      status.killSwitchEngaged &&
        status.killSwitchSources.includes("file") &&
        status.providerAvailable === false &&
        status.modelAvailable === false &&
        status.executionAllowed === false &&
        localStatusHarness.getStats().tagsCalls === availabilityCallsBefore,
      `${label} KILL_SWITCH state must fail closed as engaged.`
    );
  }
  await assertKillSwitchFileState(
    () => fsp.mkdir(localKillSwitch),
    "Directory"
  );
  await assertKillSwitchFileState(
    () => fsp.writeFile(localKillSwitch, "unexpected-value\n", "utf8"),
    "Malformed content"
  );
  await assertKillSwitchFileState(
    () => fsp.writeFile(localKillSwitch, "", "utf8"),
    "Empty content"
  );
  const hardlinkSource = path.join(localStatusRoot, "kill-switch-hardlink-source");
  await fsp.rm(hardlinkSource, { force: true });
  await fsp.writeFile(hardlinkSource, "enabled\n", "utf8");
  await assertKillSwitchFileState(
    () => fsp.link(hardlinkSource, localKillSwitch),
    "Multiply-linked file"
  );
  await fsp.rm(hardlinkSource, { force: true });
  const junctionTarget = path.join(localStatusRoot, "kill-switch-junction-target");
  await fsp.mkdir(junctionTarget, { recursive: true });
  await assertKillSwitchFileState(
    () => fsp.symlink(junctionTarget, localKillSwitch, process.platform === "win32" ? "junction" : "dir"),
    "Symlink or junction"
  );
  await fsp.rm(localKillSwitch, { recursive: true, force: true });
  await fsp.writeFile(localKillSwitch, "off\n", "utf8");
  const explicitlyOffStatus = await localStatusStore.getStatus();
  assert(
    !explicitlyOffStatus.killSwitchEngaged,
    "An exact allowlisted disengaged KILL_SWITCH value remains disengaged."
  );
  await fsp.rm(localKillSwitch, { force: true });
  process.env.CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH = "malformed";
  const malformedEnvironmentCallsBefore = localStatusHarness.getStats().tagsCalls;
  const malformedEnvironmentStatus = await localStatusStore.getStatus();
  delete process.env.CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH;
  assert(
    malformedEnvironmentStatus.killSwitchEngaged &&
      malformedEnvironmentStatus.killSwitchSources.includes("environment") &&
      malformedEnvironmentStatus.providerAvailable === false &&
      malformedEnvironmentStatus.modelAvailable === false &&
      localStatusHarness.getStats().tagsCalls === malformedEnvironmentCallsBefore,
    "A malformed nonempty kill-switch environment value must fail closed as engaged."
  );
  for (const [label, value] of [
    ["empty", ""],
    ["space-only", "   "],
    ["tab-only", "\t"],
    ["newline-only", "\r\n"],
  ]) {
    process.env.CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH = value;
    const unsafeEnvironmentCallsBefore = localStatusHarness.getStats().tagsCalls;
    const unsafeEnvironmentStatus = await localStatusStore.getStatus();
    assert(
      unsafeEnvironmentStatus.killSwitchEngaged &&
        unsafeEnvironmentStatus.killSwitchSources.includes("environment") &&
        unsafeEnvironmentStatus.providerAvailable === false &&
        unsafeEnvironmentStatus.modelAvailable === false &&
        localStatusHarness.getStats().tagsCalls === unsafeEnvironmentCallsBefore,
      `${label} kill-switch environment content must fail closed as engaged.`
    );
  }
  delete process.env.CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH;

  async function replacePersistedNeedleWithInvalidUtf8(fileAbsolutePath, needle) {
    const bytes = await fsp.readFile(fileAbsolutePath);
    const needleBytes = Buffer.from(needle, "utf8");
    const offset = bytes.indexOf(needleBytes);
    assert(offset >= 0, `Invalid UTF-8 fixture must find ${needle}.`);
    bytes[offset] = 0xff;
    await fsp.writeFile(fileAbsolutePath, bytes);
  }

  async function createUtf8CorruptionFixture(testSuffix) {
    const label = storeModule.buildPrivateAlphaTestingDataRootLabel(testSuffix);
    await resetDataRoot(label);
    const harness = createHarness();
    const store = createLocalStore(testSuffix, harness);
    const idempotencyKey = `private-alpha-${testSuffix}-create-0001`;
    const created = await store.createRun(
      {
        requestText: `UTF-8 persisted request fixture ${testSuffix}.`,
        capability: "text",
        modelPreferenceLabel: null,
        maximumOutputTokens: 128,
      },
      idempotencyKey
    );
    return { label, harness, store, idempotencyKey, created };
  }

  const invalidUtf8Request = await createUtf8CorruptionFixture("invalid-utf8-request");
  await replacePersistedNeedleWithInvalidUtf8(
    getRunFileAbsolutePath(invalidUtf8Request.label, invalidUtf8Request.created.run.runId),
    "UTF-8 persisted request fixture"
  );
  await expectStoreError(
    () => invalidUtf8Request.store.getRun(invalidUtf8Request.created.run.runId),
    500,
    "not valid UTF-8"
  );
  assert(
    invalidUtf8Request.harness.getStats().tagsCalls === 0 &&
      invalidUtf8Request.harness.getStats().chatCalls === 0,
    "Invalid UTF-8 in a persisted request fails closed without provider activity."
  );

  const invalidUtf8Audit = await createUtf8CorruptionFixture("invalid-utf8-audit");
  await replacePersistedNeedleWithInvalidUtf8(
    getRunFileAbsolutePath(invalidUtf8Audit.label, invalidUtf8Audit.created.run.runId),
    "run.created"
  );
  await expectStoreError(
    () => invalidUtf8Audit.store.getRun(invalidUtf8Audit.created.run.runId),
    500,
    "not valid UTF-8"
  );
  assert(
    invalidUtf8Audit.harness.getStats().tagsCalls === 0 &&
      invalidUtf8Audit.harness.getStats().chatCalls === 0,
    "Invalid UTF-8 in persisted audit evidence fails closed without provider activity."
  );

  const invalidUtf8Idempotency = await createUtf8CorruptionFixture("invalid-utf8-idempotency");
  await replacePersistedNeedleWithInvalidUtf8(
    getIdempotencyFileAbsolutePath(
      invalidUtf8Idempotency.label,
      invalidUtf8Idempotency.created.run.idempotencyKeyHash
    ),
    "publicationPhase"
  );
  await expectStoreError(
    () =>
      invalidUtf8Idempotency.store.createRun(
        {
          requestText: "UTF-8 persisted request fixture invalid-utf8-idempotency.",
          capability: "text",
          modelPreferenceLabel: null,
          maximumOutputTokens: 128,
        },
        invalidUtf8Idempotency.idempotencyKey
      ),
    500,
    "not valid UTF-8"
  );
  assert(
    invalidUtf8Idempotency.harness.getStats().tagsCalls === 0 &&
      invalidUtf8Idempotency.harness.getStats().chatCalls === 0,
    "Invalid UTF-8 in an idempotency record cannot replay or contact a provider."
  );

  const invalidUtf8Lock = await createUtf8CorruptionFixture("invalid-utf8-lock");
  const invalidUtf8LockPath = getRunLockFileAbsolutePath(
    invalidUtf8Lock.label,
    invalidUtf8Lock.created.run.runId
  );
  await fsp.writeFile(
    invalidUtf8LockPath,
    Buffer.concat([Buffer.from('{"owner":"', "utf8"), Buffer.from([0xff]), Buffer.from('"}\n', "utf8")])
  );
  await expectStoreError(
    () =>
      invalidUtf8Lock.store.cancelRun(invalidUtf8Lock.created.run.runId, {
        expectedRevision: invalidUtf8Lock.created.run.revision,
        reason: "Invalid lock bytes must fail closed.",
      }),
    500,
    "not valid UTF-8"
  );
  assert(
    invalidUtf8Lock.harness.getStats().tagsCalls === 0 &&
      invalidUtf8Lock.harness.getStats().chatCalls === 0,
    "Invalid UTF-8 in a mutation lock cannot mutate or contact a provider."
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
      assert(payload.think === "low", "Chat request must fix think to low.");
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
      executionResult.run.execution.outputText === "local ollama output" &&
      executionResult.run.execution.outputText !== "not persisted" &&
      !("thinking" in executionResult.run.execution),
    "Successful output must persist only visible response text."
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
  assert(
    !JSON.stringify(executionResult.run).includes("not persisted"),
    "Thinking must not appear in returned run records."
  );
  assert(!localRunText.includes("not persisted"), "Thinking must not be persisted.");

  await expectStoreError(
    () =>
      localStore.executeRun(
        approvedLocalRun.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: approvedLocalRun.approvalScopeHash,
          expectedRevision: executionResult.run.revision,
        },
        "private-alpha-local-exec-success-0001"
      ),
    409,
    "replay revision does not match the original attempt"
  );
  assert(
    fs.readFileSync(
      getRunFileAbsolutePath(localLabel, approvedLocalRun.runId),
      "utf8"
    ) === localRunText &&
      localHarness.getStats().chatCalls === 1,
    "Wrong-revision terminal replay leaves exact persisted bytes and provider counters unchanged."
  );

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
  assert(
    successReplay.replayed === true &&
      successReplay.responseStatus === 200 &&
      successReplay.run.execution.responseStatus === 200,
    "Same execution key must replay its exact successful HTTP classification safely."
  );
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
        !event.summary.includes("local ollama output") &&
        !event.summary.includes("not persisted")
    ),
    "Audit summaries must exclude prompt text, output text, and thinking text."
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

  const creatorRequest = {
    requestText: "Create one exact creator-owned local run.",
    capability: "code",
    modelPreferenceLabel: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
    maximumOutputTokens: 128,
  };
  const exactCreatorOwnership = creatorOwnership(
    "a".repeat(24),
    "generation",
    "b".repeat(32)
  );

  const namespaceLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    "creator-idempotency-namespace"
  );
  await resetDataRoot(namespaceLabel);
  const namespaceHarness = createHarness();
  const namespaceStore = createLocalStore(
    "creator-idempotency-namespace",
    namespaceHarness
  );
  const sharedRawKey = "creator-aaaaaaaaaaaaaaaaaaaaaaaa-generation-v1";
  const genericReservation = await namespaceStore.createRun(
    {
      requestText: "A generic client attempts to reserve a creator-looking raw key.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 128,
    },
    sharedRawKey
  );
  const creatorNamespaceRun = await namespaceStore.createCreatorRun(
    creatorRequest,
    sharedRawKey,
    exactCreatorOwnership
  );
  assert(
    genericReservation.run.runId !== creatorNamespaceRun.run.runId &&
      genericReservation.run.idempotencyKeyHash !==
        creatorNamespaceRun.run.idempotencyKeyHash &&
      creatorNamespaceRun.run.idempotencyKeyHash ===
        storeModule.buildPrivateAlphaCreatorIdempotencyKeyHash(
          sharedRawKey,
          exactCreatorOwnership.projectId,
          exactCreatorOwnership.purpose
        ),
    "Server-derived creator idempotency ownership must be non-forgeably domain-separated from generic raw keys."
  );
  assert(
    namespaceHarness.getStats().tagsCalls === 0 &&
      namespaceHarness.getStats().chatCalls === 0,
    "Creator idempotency namespace separation must not contact a provider boundary."
  );
  const forgedCreatorCreateKey =
    `codexforge.private-alpha.creator-idempotency.v1\u0000${exactCreatorOwnership.projectId}\u0000${exactCreatorOwnership.purpose}\u0000${sharedRawKey}`;
  assert(
    crypto.createHash("sha256").update(forgedCreatorCreateKey).digest("hex") ===
      creatorNamespaceRun.run.idempotencyKeyHash,
    "The adversarial generic create key is the exact framed creator preimage."
  );
  const creatorNamespaceBeforeForgery = await fsp.readFile(
    getRunFileAbsolutePath(namespaceLabel, creatorNamespaceRun.run.runId),
    "utf8"
  );
  await expectStoreError(
    () =>
      namespaceStore.createRun(
        {
          requestText: "A generic caller must not forge the framed creator keyspace.",
          capability: "text",
          modelPreferenceLabel: null,
          maximumOutputTokens: 128,
        },
        forgedCreatorCreateKey
      ),
    400,
    "visible ASCII"
  );
  assert(
    (await fsp.readFile(
      getRunFileAbsolutePath(namespaceLabel, creatorNamespaceRun.run.runId),
      "utf8"
    )) === creatorNamespaceBeforeForgery,
    "A framed generic create collision attempt leaves the creator run byte-identical."
  );
  const creatorNamespaceApproved = await namespaceStore.approveCreatorRun(
    creatorNamespaceRun.run.runId,
    {
      approvalScopeHash: creatorNamespaceRun.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: creatorNamespaceRun.run.revision,
    },
    exactCreatorOwnership
  );
  const exactCreatorExecutionKey = "creator-execution-namespace-attempt-0001";
  const forgedCreatorExecutionKey =
    `codexforge.private-alpha.creator-idempotency.v1\u0000${exactCreatorOwnership.projectId}\u0000${exactCreatorOwnership.purpose}\u0000${exactCreatorExecutionKey}`;
  const creatorExecuteInput = {
    execute: true,
    acknowledgement: true,
    approvalScopeHash: creatorNamespaceApproved.approvalScopeHash,
    expectedRevision: creatorNamespaceApproved.revision,
  };
  await expectStoreError(
    () =>
      namespaceStore.executeRun(
        creatorNamespaceApproved.runId,
        creatorExecuteInput,
        forgedCreatorExecutionKey
      ),
    400,
    "visible ASCII"
  );
  let creatorNamespaceExecution;
  process.env.CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH = "on";
  try {
    creatorNamespaceExecution = await namespaceStore.executeCreatorRun(
      creatorNamespaceApproved.runId,
      creatorExecuteInput,
      exactCreatorExecutionKey,
      exactCreatorOwnership
    );
  } finally {
    delete process.env.CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH;
  }
  await expectStoreError(
    () =>
      namespaceStore.executeRun(
        creatorNamespaceApproved.runId,
        creatorExecuteInput,
        forgedCreatorExecutionKey
      ),
    400,
    "visible ASCII"
  );
  const creatorNamespaceExecutionReplay =
    await namespaceStore.executeCreatorRun(
      creatorNamespaceApproved.runId,
      creatorExecuteInput,
      exactCreatorExecutionKey,
      exactCreatorOwnership
    );
  assert(
    creatorNamespaceExecution.run.state === "blocked" &&
      creatorNamespaceExecution.errorCode === "kill_switch_blocked" &&
      creatorNamespaceExecutionReplay.replayed === true &&
      creatorNamespaceExecutionReplay.errorCode === "kill_switch_blocked" &&
      namespaceHarness.getStats().tagsCalls === 0 &&
      namespaceHarness.getStats().chatCalls === 0,
    "Framed generic execution collisions are rejected while the exact creator attempt remains replayable without provider activity."
  );
  const genericOwnershipForgery = await namespaceStore.createRun(
    {
      requestText: "A generic store call cannot smuggle creator ownership.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 128,
    },
    "private-alpha-generic-ownership-forgery-0001",
    exactCreatorOwnership
  );
  assert(
    genericOwnershipForgery.run.ownership?.kind === "general",
    "The public generic create method ignores an extra forged creator-ownership argument."
  );
  const genericControlProbe = await namespaceStore.createCreatorRun(
    creatorRequest,
    "private-alpha-generic-control-probe-0001",
    exactCreatorOwnership
  );
  const genericControlBefore = await fsp.readFile(
    getRunFileAbsolutePath(namespaceLabel, genericControlProbe.run.runId),
    "utf8"
  );
  await expectStoreError(
    () =>
      namespaceStore.approveRun(
        genericControlProbe.run.runId,
        {
          approvalScopeHash: genericControlProbe.run.approvalScopeHash,
          approved: true,
          acknowledgement: true,
          expectedRevision: genericControlProbe.run.revision,
        },
        exactCreatorOwnership
      ),
    409,
    "exact creator lifecycle"
  );
  await expectStoreError(
    () =>
      namespaceStore.cancelRun(
        genericControlProbe.run.runId,
        {
          expectedRevision: genericControlProbe.run.revision,
          reason: "Generic control must remain unavailable.",
        },
        exactCreatorOwnership
      ),
    409,
    "exact creator lifecycle"
  );
  await expectStoreError(
    () =>
      namespaceStore.executeRun(
        genericControlProbe.run.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: genericControlProbe.run.approvalScopeHash,
          expectedRevision: genericControlProbe.run.revision,
        },
        "private-alpha-generic-control-execution-0001",
        exactCreatorOwnership
      ),
    409,
    "exact creator lifecycle"
  );
  assert(
    (await fsp.readFile(
      getRunFileAbsolutePath(namespaceLabel, genericControlProbe.run.runId),
      "utf8"
    )) === genericControlBefore &&
      namespaceHarness.getStats().tagsCalls === 0 &&
      namespaceHarness.getStats().chatCalls === 0,
    "Generic approve, cancel, and execute calls cannot control creator state or contact a provider even with extra forged arguments."
  );

  function createCreatorLifecycle(testSuffix, harness) {
    return creatorAdapterModule.createCreatorGenerationLifecycleAdapterForTesting(
      testSuffix,
      createLocalProviderAdapter(harness)
    );
  }

  async function creatorRunInventory(label) {
    return (await fsp.readdir(path.join(toAbsolutePath(label), "runs")))
      .filter((name) => name.endsWith(".json"))
      .sort();
  }

  const currentOrphanSuffix = "creator-current-orphan-recovery";
  const currentOrphanLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    currentOrphanSuffix
  );
  await resetDataRoot(currentOrphanLabel);
  const currentOrphanHarness = createHarness();
  const currentOrphanProjectId = "1".repeat(24);
  const currentOrphanInstruction = "Recover the exact current-domain creator orphan.";
  const currentOrphanBound = await createCreatorLifecycle(
    currentOrphanSuffix,
    currentOrphanHarness
  ).bindRun({
    projectId: currentOrphanProjectId,
    purpose: "generation",
    instruction: currentOrphanInstruction,
  });
  await fsp.unlink(
    getIdempotencyFileAbsolutePath(
      currentOrphanLabel,
      currentOrphanBound.idempotencyKeyHash
    )
  );
  const currentOrphanRecovered = await createCreatorLifecycle(
    currentOrphanSuffix,
    currentOrphanHarness
  ).recoverBoundRun({
    projectId: currentOrphanProjectId,
    purpose: "generation",
    instruction: currentOrphanInstruction,
  });
  assert(
    currentOrphanRecovered?.runId === currentOrphanBound.runId &&
      currentOrphanRecovered.ownership?.kind === "creator" &&
      currentOrphanRecovered.ownership.bindingId ===
        currentOrphanBound.ownership?.bindingId &&
      (await creatorRunInventory(currentOrphanLabel)).length === 1 &&
      fs.existsSync(
        getIdempotencyFileAbsolutePath(
          currentOrphanLabel,
          currentOrphanBound.idempotencyKeyHash
        )
      ),
    "Fresh adapter recovery reconstructs a missing current-domain mapping around the original run and binding."
  );

  const legacyOrphanSuffix = "creator-legacy-orphan-recovery";
  const legacyOrphanLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    legacyOrphanSuffix
  );
  await resetDataRoot(legacyOrphanLabel);
  const legacyOrphanHarness = createHarness();
  const legacyOrphanProjectId = "2".repeat(24);
  const legacyOrphanInstruction = "Recover the exact legacy creator orphan.";
  const legacyOrphanRawKey =
    `creator-${legacyOrphanProjectId}-generation-v1`;
  const legacyOrphanHash = crypto
    .createHash("sha256")
    .update(legacyOrphanRawKey)
    .digest("hex");
  const legacyOrphanBound = await createCreatorLifecycle(
    legacyOrphanSuffix,
    legacyOrphanHarness
  ).bindRun({
    projectId: legacyOrphanProjectId,
    purpose: "generation",
    instruction: legacyOrphanInstruction,
  });
  await fsp.unlink(
    getIdempotencyFileAbsolutePath(
      legacyOrphanLabel,
      legacyOrphanBound.idempotencyKeyHash
    )
  );
  const legacyOrphanRunPath = getRunFileAbsolutePath(
    legacyOrphanLabel,
    legacyOrphanBound.runId
  );
  const legacyOrphanFixture = JSON.parse(
    await fsp.readFile(legacyOrphanRunPath, "utf8")
  );
  legacyOrphanFixture.idempotencyKeyHash = legacyOrphanHash;
  await fsp.writeFile(
    legacyOrphanRunPath,
    `${JSON.stringify(legacyOrphanFixture, null, 2)}\n`,
    "utf8"
  );
  const legacyOrphanProcessRecovered = await runIndependentStoreWorker({
    operation: "bind",
    testSuffix: legacyOrphanSuffix,
    body: {
      requestText: legacyOrphanInstruction,
      capability: "code",
      modelPreferenceLabel: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
      maximumOutputTokens: 4096,
      modelKey: privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
    },
    idempotencyKey: legacyOrphanRawKey,
    ownership: creatorOwnership(
      legacyOrphanProjectId,
      "generation",
      "f".repeat(32)
    ),
    createIfMissing: false,
  });
  const legacyOrphanRecovered = await createCreatorLifecycle(
    legacyOrphanSuffix,
    legacyOrphanHarness
  ).recoverBoundRun({
    projectId: legacyOrphanProjectId,
    purpose: "generation",
    instruction: legacyOrphanInstruction,
  });
  assert(
    legacyOrphanProcessRecovered.ok === true &&
      legacyOrphanProcessRecovered.runId === legacyOrphanBound.runId &&
      legacyOrphanProcessRecovered.bindingId ===
        legacyOrphanBound.ownership?.bindingId &&
      legacyOrphanProcessRecovered.tagsCalls === 0 &&
      legacyOrphanProcessRecovered.chatCalls === 0 &&
      legacyOrphanRecovered?.runId === legacyOrphanBound.runId &&
      legacyOrphanRecovered.idempotencyKeyHash === legacyOrphanHash &&
      legacyOrphanRecovered.ownership?.bindingId ===
        legacyOrphanBound.ownership?.bindingId &&
      (await creatorRunInventory(legacyOrphanLabel)).length === 1 &&
      fs.existsSync(
        getIdempotencyFileAbsolutePath(legacyOrphanLabel, legacyOrphanHash)
      ),
    "Fresh adapter recovery reconstructs the exact legacy mapping without duplicating its creator run."
  );

  const legacyReservedSuffix = "creator-legacy-reserved-recovery";
  const legacyReservedLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    legacyReservedSuffix
  );
  await resetDataRoot(legacyReservedLabel);
  const legacyReservedHarness = createHarness();
  const legacyReservedProjectId = "3".repeat(24);
  const legacyReservedInstruction = "Resume the exact legacy reserved creator run.";
  const legacyReservedRawKey =
    `creator-${legacyReservedProjectId}-generation-v1`;
  const legacyReservedHash = crypto
    .createHash("sha256")
    .update(legacyReservedRawKey)
    .digest("hex");
  const legacyReservedBound = await createCreatorLifecycle(
    legacyReservedSuffix,
    legacyReservedHarness
  ).bindRun({
    projectId: legacyReservedProjectId,
    purpose: "generation",
    instruction: legacyReservedInstruction,
  });
  await fsp.unlink(
    getRunFileAbsolutePath(legacyReservedLabel, legacyReservedBound.runId)
  );
  await fsp.unlink(
    getIdempotencyFileAbsolutePath(
      legacyReservedLabel,
      legacyReservedBound.idempotencyKeyHash
    )
  );
  const legacyReservedRecord = {
    version: privateAlpha.PRIVATE_ALPHA_RECORD_VERSION,
    protocolVersion: privateAlpha.PRIVATE_ALPHA_IDEMPOTENCY_PROTOCOL_VERSION,
    publicationPhase: "reserved",
    idempotencyKeyHash: legacyReservedHash,
    requestDigest: storeModule.buildPrivateAlphaCanonicalRequestHash(
      legacyReservedBound.request
    ),
    runId: legacyReservedBound.runId,
    ownership: legacyReservedBound.ownership,
    reservedAt: legacyReservedBound.createdAt,
    publishedAt: null,
  };
  await fsp.writeFile(
    getIdempotencyFileAbsolutePath(legacyReservedLabel, legacyReservedHash),
    `${JSON.stringify(legacyReservedRecord, null, 2)}\n`,
    "utf8"
  );
  const legacyReservedRecovered = await createCreatorLifecycle(
    legacyReservedSuffix,
    legacyReservedHarness
  ).recoverBoundRun({
    projectId: legacyReservedProjectId,
    purpose: "generation",
    instruction: legacyReservedInstruction,
  });
  const legacyReservedPublished = JSON.parse(
    await fsp.readFile(
      getIdempotencyFileAbsolutePath(
        legacyReservedLabel,
        legacyReservedHash
      ),
      "utf8"
    )
  );
  assert(
    legacyReservedRecovered?.runId === legacyReservedBound.runId &&
      legacyReservedRecovered.idempotencyKeyHash === legacyReservedHash &&
      legacyReservedRecovered.ownership?.bindingId ===
        legacyReservedBound.ownership?.bindingId &&
      legacyReservedPublished.publicationPhase === "published" &&
      legacyReservedPublished.publishedAt === legacyReservedBound.createdAt &&
      (await creatorRunInventory(legacyReservedLabel)).length === 1,
    "Fresh adapter recovery publishes and finalizes the original legacy reserved run ID exactly once."
  );

  const legacyGenericSuffix = "creator-legacy-generic-separation";
  const legacyGenericLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    legacyGenericSuffix
  );
  await resetDataRoot(legacyGenericLabel);
  const legacyGenericHarness = createHarness();
  const legacyGenericStore = createLocalStore(
    legacyGenericSuffix,
    legacyGenericHarness
  );
  const legacyGenericProjectId = "4".repeat(24);
  const legacyGenericInstruction = "Bind in the current creator namespace beside legacy generic evidence.";
  const legacyGenericRawKey =
    `creator-${legacyGenericProjectId}-generation-v1`;
  const legacyGenericRun = await legacyGenericStore.createRun(
    {
      requestText: "A legitimate generic run owns only the historical raw-key namespace.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 128,
    },
    legacyGenericRawKey
  );
  const legacyGenericBefore = await fsp.readFile(
    getRunFileAbsolutePath(legacyGenericLabel, legacyGenericRun.run.runId),
    "utf8"
  );
  const legacyGenericLifecycle = createCreatorLifecycle(
    legacyGenericSuffix,
    legacyGenericHarness
  );
  const legacyGenericRecovery = await legacyGenericLifecycle.recoverBoundRun({
    projectId: legacyGenericProjectId,
    purpose: "generation",
    instruction: legacyGenericInstruction,
  });
  const legacyGenericCreator = await legacyGenericLifecycle.bindRun({
    projectId: legacyGenericProjectId,
    purpose: "generation",
    instruction: legacyGenericInstruction,
  });
  assert(
    legacyGenericRecovery === null &&
      legacyGenericCreator.idempotencyKeyHash !==
        legacyGenericRun.run.idempotencyKeyHash &&
      (await fsp.readFile(
        getRunFileAbsolutePath(legacyGenericLabel, legacyGenericRun.run.runId),
        "utf8"
      )) === legacyGenericBefore &&
      (await creatorRunInventory(legacyGenericLabel)).length === 2,
    "A legitimate legacy generic reservation cannot block or mutate the current creator namespace."
  );

  const legacyMixedSuffix = "creator-legacy-mixed-ambiguity";
  const legacyMixedLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    legacyMixedSuffix
  );
  await resetDataRoot(legacyMixedLabel);
  const legacyMixedHarness = createHarness();
  const legacyMixedStore = createLocalStore(
    legacyMixedSuffix,
    legacyMixedHarness
  );
  const legacyMixedProjectId = "5".repeat(24);
  const legacyMixedInstruction = "Reject mixed legacy creator and generic evidence.";
  const legacyMixedRawKey =
    `creator-${legacyMixedProjectId}-generation-v1`;
  await legacyMixedStore.createRun(
    {
      requestText: "Generic evidence for the mixed legacy ambiguity test.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 128,
    },
    legacyMixedRawKey
  );
  const legacyMixedCreator = await createCreatorLifecycle(
    legacyMixedSuffix,
    legacyMixedHarness
  ).bindRun({
    projectId: legacyMixedProjectId,
    purpose: "generation",
    instruction: legacyMixedInstruction,
  });
  await fsp.unlink(
    getIdempotencyFileAbsolutePath(
      legacyMixedLabel,
      legacyMixedCreator.idempotencyKeyHash
    )
  );
  const legacyMixedCreatorPath = getRunFileAbsolutePath(
    legacyMixedLabel,
    legacyMixedCreator.runId
  );
  const legacyMixedCreatorFixture = JSON.parse(
    await fsp.readFile(legacyMixedCreatorPath, "utf8")
  );
  legacyMixedCreatorFixture.idempotencyKeyHash = crypto
    .createHash("sha256")
    .update(legacyMixedRawKey)
    .digest("hex");
  await fsp.writeFile(
    legacyMixedCreatorPath,
    `${JSON.stringify(legacyMixedCreatorFixture, null, 2)}\n`,
    "utf8"
  );
  await expectStoreError(
    () =>
      createCreatorLifecycle(
        legacyMixedSuffix,
        legacyMixedHarness
      ).recoverBoundRun({
        projectId: legacyMixedProjectId,
        purpose: "generation",
        instruction: legacyMixedInstruction,
      }),
    500,
    "Multiple runs contradict one creator binding namespace"
  );
  assert(
    currentOrphanHarness.getStats().chatCalls === 0 &&
      legacyOrphanHarness.getStats().chatCalls === 0 &&
      legacyReservedHarness.getStats().chatCalls === 0 &&
      legacyGenericHarness.getStats().chatCalls === 0 &&
      legacyMixedHarness.getStats().chatCalls === 0,
    "Current and legacy creator recovery paths perform zero provider generation."
  );

  const invalidOwnershipLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    "creator-invalid-ownership"
  );
  await resetDataRoot(invalidOwnershipLabel);
  const invalidOwnershipHarness = createHarness();
  const invalidOwnershipStore = createLocalStore(
    "creator-invalid-ownership",
    invalidOwnershipHarness
  );
  for (const [suffix, invalidOwnership] of [
    [
      "short-binding",
      creatorOwnership("a".repeat(24), "generation", "b".repeat(31)),
    ],
    [
      "uppercase-binding",
      creatorOwnership("a".repeat(24), "generation", "B".repeat(32)),
    ],
    [
      "long-binding",
      creatorOwnership("a".repeat(24), "generation", "b".repeat(33)),
    ],
  ]) {
    await expectStoreError(
      () =>
        invalidOwnershipStore.createCreatorRun(
          creatorRequest,
          `private-alpha-creator-invalid-${suffix}-0001`,
          invalidOwnership
        ),
      409,
      "ownership binding is invalid"
    );
  }
  assert(
    !(await fsp.lstat(toAbsolutePath(invalidOwnershipLabel)).catch((error) => {
      if (error && error.code === "ENOENT") return null;
      throw error;
    })),
    "Invalid creator ownership must be rejected before test persistence is created."
  );
  assert(
    invalidOwnershipHarness.getStats().tagsCalls === 0 &&
      invalidOwnershipHarness.getStats().chatCalls === 0,
    "Invalid creator ownership must not contact the injected provider boundary."
  );

  const creatorControlLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    "creator-control"
  );
  await resetDataRoot(creatorControlLabel);
  const creatorControlHarness = createHarness();
  const creatorControlStore = createLocalStore(
    "creator-control",
    creatorControlHarness
  );
  const creatorControlled = await creatorControlStore.createCreatorRun(
    creatorRequest,
    "private-alpha-creator-control-create-0001",
    exactCreatorOwnership
  );
  assert(
    creatorControlled.created === true &&
      JSON.stringify(creatorControlled.run.ownership) ===
        JSON.stringify(exactCreatorOwnership) &&
      creatorControlled.run.ownership.bindingId.length === 32 &&
      /^[a-f0-9]{32}$/.test(creatorControlled.run.ownership.bindingId),
    "Creator creation must persist the exact lower-hex 32-character binding."
  );
  const persistedCreatorControl = JSON.parse(
    await fsp.readFile(
      getRunFileAbsolutePath(creatorControlLabel, creatorControlled.run.runId),
      "utf8"
    )
  );
  assert(
    JSON.stringify(persistedCreatorControl.ownership) ===
      JSON.stringify(exactCreatorOwnership),
    "The exact creator project, purpose, and binding must survive persistence."
  );

  const creatorControlBefore = await snapshotMutationBoundary(
    creatorControlLabel,
    creatorControlled.run,
    creatorControlHarness
  );
  await expectStoreError(
    () =>
      creatorControlStore.approveRun(creatorControlled.run.runId, {
        approvalScopeHash: creatorControlled.run.approvalScopeHash,
        approved: true,
        acknowledgement: true,
        expectedRevision: creatorControlled.run.revision,
      }),
    409,
    "exact creator lifecycle"
  );
  await expectStoreError(
    () =>
      creatorControlStore.cancelRun(creatorControlled.run.runId, {
        expectedRevision: creatorControlled.run.revision,
        reason: "A generic caller must not cancel this creator run.",
      }),
    409,
    "exact creator lifecycle"
  );
  await expectStoreError(
    () =>
      creatorControlStore.executeRun(
        creatorControlled.run.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: creatorControlled.run.approvalScopeHash,
          expectedRevision: creatorControlled.run.revision,
        },
        "private-alpha-creator-generic-exec-0001"
      ),
    409,
    "exact creator lifecycle"
  );
  assert(
    (await snapshotMutationBoundary(
      creatorControlLabel,
      creatorControlled.run,
      creatorControlHarness
    )) === creatorControlBefore,
    "Generic approve, cancel, and execute must reject before lock, file, audit, or provider mutation."
  );

  const wrongCreatorOwnerships = [
    creatorOwnership("c".repeat(24), "generation", "b".repeat(32)),
    creatorOwnership("a".repeat(24), "repair", "b".repeat(32)),
    creatorOwnership("a".repeat(24), "generation", "d".repeat(32)),
  ];
  for (const [index, wrongOwnership] of wrongCreatorOwnerships.entries()) {
    await expectStoreError(
      () =>
        creatorControlStore.approveCreatorRun(
          creatorControlled.run.runId,
          {
            approvalScopeHash: creatorControlled.run.approvalScopeHash,
            approved: true,
            acknowledgement: true,
            expectedRevision: creatorControlled.run.revision,
          },
          wrongOwnership
        ),
      409,
      "ownership binding does not match"
    );
    await expectStoreError(
      () =>
        creatorControlStore.cancelCreatorRun(
          creatorControlled.run.runId,
          {
            expectedRevision: creatorControlled.run.revision,
            reason: "Wrong creator ownership must fail closed.",
          },
          wrongOwnership
        ),
      409,
      "ownership binding does not match"
    );
    await expectStoreError(
      () =>
        creatorControlStore.executeCreatorRun(
          creatorControlled.run.runId,
          {
            execute: true,
            acknowledgement: true,
            approvalScopeHash: creatorControlled.run.approvalScopeHash,
            expectedRevision: creatorControlled.run.revision,
          },
          `private-alpha-creator-wrong-exec-000${index + 1}`,
          wrongOwnership
        ),
      409,
      "ownership binding does not match"
    );
  }
  assert(
    (await snapshotMutationBoundary(
      creatorControlLabel,
      creatorControlled.run,
      creatorControlHarness
    )) === creatorControlBefore,
    "Wrong creator project, purpose, or binding must reject before any durable or provider side effect."
  );

  const concurrentCreationLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    "creator-concurrent-create"
  );
  await resetDataRoot(concurrentCreationLabel);
  const concurrentCreationHarness = createHarness();
  const concurrentCreationStoreA = createLocalStore(
    "creator-concurrent-create",
    concurrentCreationHarness
  );
  const concurrentCreationStoreB = createLocalStore(
    "creator-concurrent-create",
    concurrentCreationHarness
  );
  const concurrentCreationKey = "private-alpha-creator-concurrent-create-0001";
  const concurrentCreations = await Promise.all([
    concurrentCreationStoreA.createCreatorRun(
      creatorRequest,
      concurrentCreationKey,
      exactCreatorOwnership
    ),
    concurrentCreationStoreB.createCreatorRun(
      creatorRequest,
      concurrentCreationKey,
      exactCreatorOwnership
    ),
  ]);
  assert(
    concurrentCreations[0].run.runId === concurrentCreations[1].run.runId &&
      concurrentCreations.filter((result) => result.created).length === 1,
    "Concurrent creator creation must publish one exact reserved run and replay it once."
  );
  const concurrentCreationRoot = toAbsolutePath(concurrentCreationLabel);
  assert(
    (await fsp.readdir(path.join(concurrentCreationRoot, "runs"))).filter((name) =>
      name.endsWith(".json")
    ).length === 1 &&
      (await fsp.readdir(path.join(concurrentCreationRoot, "idempotency"))).filter(
        (name) => name.endsWith(".json")
      ).length === 1,
    "Concurrent creator creation must leave one run and one idempotency publication."
  );

  const missingMappingLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    "creator-missing-mapping"
  );
  await resetDataRoot(missingMappingLabel);
  const missingMappingHarness = createHarness();
  const missingMappingStore = createLocalStore(
    "creator-missing-mapping",
    missingMappingHarness
  );
  const missingMappingKey = "private-alpha-creator-missing-mapping-0001";
  const missingMappingCreated = await missingMappingStore.createCreatorRun(
    creatorRequest,
    missingMappingKey,
    exactCreatorOwnership
  );
  const missingMappingRunBefore = await fsp.readFile(
    getRunFileAbsolutePath(missingMappingLabel, missingMappingCreated.run.runId),
    "utf8"
  );
  await fsp.unlink(
    getIdempotencyFileAbsolutePath(
      missingMappingLabel,
      missingMappingCreated.run.idempotencyKeyHash
    )
  );
  const missingMappingFreshStore = createLocalStore(
    "creator-missing-mapping",
    missingMappingHarness
  );
  const missingMappingReplay = await missingMappingFreshStore.createCreatorRun(
    creatorRequest,
    missingMappingKey,
    exactCreatorOwnership
  );
  const missingMappingLookup = await missingMappingFreshStore.lookupRunByIdempotencyKeyHash(
    missingMappingCreated.run.idempotencyKeyHash
  );
  assert(
    missingMappingReplay.created === false &&
      missingMappingReplay.run.runId === missingMappingCreated.run.runId &&
      (await fsp.readFile(
        getRunFileAbsolutePath(missingMappingLabel, missingMappingCreated.run.runId),
        "utf8"
      )) === missingMappingRunBefore &&
      missingMappingLookup &&
      missingMappingLookup.publicationPhase === "published" &&
      missingMappingLookup.run?.runId === missingMappingCreated.run.runId,
    "A retry after a missing mapping must restore the exact run without duplication."
  );
  assert(
    (await fsp.readdir(path.join(toAbsolutePath(missingMappingLabel), "runs"))).filter(
      (name) => name.endsWith(".json")
    ).length === 1,
    "Missing-mapping recovery must not publish a duplicate run."
  );

  const reservationRecoveryLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    "creator-reservation-recovery"
  );
  await resetDataRoot(reservationRecoveryLabel);
  const reservationRecoveryHarness = createHarness();
  const reservationRecoveryStore = createLocalStore(
    "creator-reservation-recovery",
    reservationRecoveryHarness
  );
  const reservationRecoveryKey = "private-alpha-creator-reservation-recovery-0001";
  const reservationPublished = await reservationRecoveryStore.createCreatorRun(
    creatorRequest,
    reservationRecoveryKey,
    exactCreatorOwnership
  );
  const reservationAbsolutePath = getIdempotencyFileAbsolutePath(
    reservationRecoveryLabel,
    reservationPublished.run.idempotencyKeyHash
  );
  const simulatedReservation = JSON.parse(
    await fsp.readFile(reservationAbsolutePath, "utf8")
  );
  simulatedReservation.publicationPhase = "reserved";
  simulatedReservation.publishedAt = null;
  await fsp.writeFile(
    reservationAbsolutePath,
    `${JSON.stringify(simulatedReservation, null, 2)}\n`,
    "utf8"
  );
  const reservationBeforeUnsupportedRead = await snapshotMutationBoundary(
    reservationRecoveryLabel,
    reservationPublished.run,
    reservationRecoveryHarness
  );
  Object.defineProperty(process, "platform", { ...platformDescriptor, value: "linux" });
  try {
    const unsupportedExistingStatus = await reservationRecoveryStore.getStatus();
    const unsupportedExistingList = await reservationRecoveryStore.listRuns("10");
    const unsupportedExistingRun = await reservationRecoveryStore.getRun(
      reservationPublished.run.runId
    );
    const unsupportedExistingCreatorRun =
      await reservationRecoveryStore.getCreatorRun(
        reservationPublished.run.runId,
        exactCreatorOwnership
      );
    assert(
      unsupportedExistingStatus.approvalRecording === "unavailable" &&
        unsupportedExistingStatus.executionAllowed === false &&
        unsupportedExistingList.some(
          (run) => run.runId === reservationPublished.run.runId
        ) &&
        unsupportedExistingRun.runId === reservationPublished.run.runId &&
        unsupportedExistingCreatorRun.runId === reservationPublished.run.runId,
      "Unsupported-platform status/list/get operations remain genuinely read-only for an existing store."
    );
    await expectStoreError(
      () =>
        reservationRecoveryStore.lookupRunByIdempotencyKeyHash(
          reservationPublished.run.idempotencyKeyHash
        ),
      503,
      "handle-relative filesystem boundary is Windows-only"
    );
    assert(
      (await snapshotMutationBoundary(
        reservationRecoveryLabel,
        reservationPublished.run,
        reservationRecoveryHarness
      )) === reservationBeforeUnsupportedRead,
      "Unsupported-platform reads and reserved-publication lookup leave every persisted byte unchanged."
    );
  } finally {
    Object.defineProperty(process, "platform", platformDescriptor);
  }
  await fsp.unlink(
    getRunFileAbsolutePath(
      reservationRecoveryLabel,
      reservationPublished.run.runId
    )
  );
  const reservationRecoveryFreshStore = createLocalStore(
    "creator-reservation-recovery",
    reservationRecoveryHarness
  );
  const reservationRecovered = await reservationRecoveryFreshStore.createCreatorRun(
    creatorRequest,
    reservationRecoveryKey,
    exactCreatorOwnership
  );
  const reservationLookup = await reservationRecoveryFreshStore.lookupRunByIdempotencyKeyHash(
    reservationPublished.run.idempotencyKeyHash
  );
  assert(
    reservationRecovered.created === false &&
      reservationRecovered.run.runId === reservationPublished.run.runId &&
      reservationLookup &&
      reservationLookup.publicationPhase === "published" &&
      reservationLookup.run?.runId === reservationPublished.run.runId,
    "A valid reservation with no run must replay the same reserved run identity and finalize publication."
  );

  const contradictionLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    "creator-reservation-contradiction"
  );
  await resetDataRoot(contradictionLabel);
  const contradictionHarness = createHarness();
  const contradictionStore = createLocalStore(
    "creator-reservation-contradiction",
    contradictionHarness
  );
  const contradictionKey = "private-alpha-creator-reservation-contradiction-0001";
  const contradictionCreated = await contradictionStore.createCreatorRun(
    creatorRequest,
    contradictionKey,
    exactCreatorOwnership
  );
  const contradictionReservationPath = getIdempotencyFileAbsolutePath(
    contradictionLabel,
    contradictionCreated.run.idempotencyKeyHash
  );
  const contradictionReservation = JSON.parse(
    await fsp.readFile(contradictionReservationPath, "utf8")
  );
  contradictionReservation.ownership.bindingId = "e".repeat(32);
  await fsp.writeFile(
    contradictionReservationPath,
    `${JSON.stringify(contradictionReservation, null, 2)}\n`,
    "utf8"
  );
  const contradictionRunBefore = await fsp.readFile(
    getRunFileAbsolutePath(contradictionLabel, contradictionCreated.run.runId),
    "utf8"
  );
  await expectStoreError(
    () =>
      contradictionStore.lookupRunByIdempotencyKeyHash(
        contradictionCreated.run.idempotencyKeyHash
      ),
    500,
    "contradicts its publication reservation"
  );
  await expectStoreError(
    () =>
      contradictionStore.createCreatorRun(
        creatorRequest,
        contradictionKey,
        exactCreatorOwnership
      ),
    500,
    "contradicts its publication reservation"
  );
  assert(
    (await fsp.readFile(
      getRunFileAbsolutePath(contradictionLabel, contradictionCreated.run.runId),
      "utf8"
    )) === contradictionRunBefore &&
      contradictionHarness.getStats().tagsCalls === 0 &&
      contradictionHarness.getStats().chatCalls === 0,
    "Contradictory run/reservation ownership must fail closed without mutating the run or provider boundary."
  );

  const lookupInventoryLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    "creator-exact-lookup"
  );
  await resetDataRoot(lookupInventoryLabel);
  const lookupInventoryHarness = createHarness();
  const lookupInventoryStore = createLocalStore(
    "creator-exact-lookup",
    lookupInventoryHarness
  );
  const lookupTarget = await lookupInventoryStore.createCreatorRun(
    creatorRequest,
    "private-alpha-creator-exact-lookup-target-0001",
    exactCreatorOwnership
  );
  for (let index = 0; index < 55; index += 1) {
    await new Promise((resolve) => setTimeout(resolve, 2));
    await lookupInventoryStore.createRun(
      {
        requestText: `Newer exact lookup inventory run ${index}.`,
        capability: "text",
        modelPreferenceLabel: null,
        maximumOutputTokens: 64,
      },
      `private-alpha-exact-lookup-newer-${String(index).padStart(4, "0")}`
    );
  }
  const exactLookup = await lookupInventoryStore.lookupRunByIdempotencyKeyHash(
    lookupTarget.run.idempotencyKeyHash
  );
  assert(
    exactLookup &&
      exactLookup.run?.runId === lookupTarget.run.runId &&
      exactLookup.reservedRunId === lookupTarget.run.runId &&
      JSON.stringify(exactLookup.ownership) === JSON.stringify(exactCreatorOwnership),
    "Exact idempotency lookup must find the creator run after more than 50 newer runs."
  );

  const boundedInventorySuffix = "bounded-non-windows-inventory";
  const boundedInventoryLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    boundedInventorySuffix
  );
  await resetDataRoot(boundedInventoryLabel);
  const boundedInventoryHarness = createHarness();
  const boundedInventoryStore = createLocalStore(
    boundedInventorySuffix,
    boundedInventoryHarness
  );
  await boundedInventoryStore.createRun(
    {
      requestText: "Create one valid record before the bounded inventory probe.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 64,
    },
    "private-alpha-bounded-inventory-probe-0001"
  );
  const boundedRunsDirectory = path.join(
    toAbsolutePath(boundedInventoryLabel),
    "runs"
  );
  for (let start = 0; start < 4097; start += 128) {
    await Promise.all(
      Array.from(
        { length: Math.min(128, 4097 - start) },
        (_, offset) =>
          fsp.writeFile(
            path.join(
              boundedRunsDirectory,
              `noise-${String(start + offset).padStart(4, "0")}.txt`
            ),
            "x",
            { flag: "wx" }
          )
      )
    );
  }
  const boundedInventoryBefore = JSON.stringify(
    (await fsp.readdir(boundedRunsDirectory)).sort()
  );
  const boundedInventoryProviderBefore = JSON.stringify(
    boundedInventoryHarness.getStats()
  );
  await expectStoreError(
    () => boundedInventoryStore.listRuns("10"),
    500,
    "filesystem mutation failed closed"
  );
  Object.defineProperty(process, "platform", { ...platformDescriptor, value: "linux" });
  try {
    await expectStoreError(
      () => boundedInventoryStore.listRuns("10"),
      500,
      "inventory exceeds its bounded storage envelope"
    );
  } finally {
    Object.defineProperty(process, "platform", platformDescriptor);
  }
  assert(
    JSON.stringify((await fsp.readdir(boundedRunsDirectory)).sort()) ===
      boundedInventoryBefore &&
      JSON.stringify(boundedInventoryHarness.getStats()) ===
        boundedInventoryProviderBefore,
    "An oversized non-Windows directory inventory fails before mutation or provider activity."
  );

  const processCreateSuffix = "independent-create-contention";
  const processCreateLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    processCreateSuffix
  );
  await resetDataRoot(processCreateLabel);
  const processCreateInput = {
    operation: "create",
    testSuffix: processCreateSuffix,
    body: {
      requestText: "Publish one exact run across independent processes.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 64,
    },
    idempotencyKey: "private-alpha-independent-create-contention-0001",
  };
  const processCreateResults = await Promise.all(
    Array.from({ length: 4 }, () => runIndependentStoreWorker(processCreateInput))
  );
  const processCreateSuccesses = processCreateResults.filter((result) => result.ok);
  const processCreateConflicts = processCreateResults.filter((result) => !result.ok);
  const processCreateReplayHarness = createHarness();
  const processCreateReplayStore = createLocalStore(
    processCreateSuffix,
    processCreateReplayHarness
  );
  const processCreateReplay = await processCreateReplayStore.createRun(
    processCreateInput.body,
    processCreateInput.idempotencyKey
  );
  assert(
    processCreateSuccesses.length >= 1 &&
      processCreateSuccesses.every(
      (result) =>
        result.state === "awaiting_approval" &&
        result.tagsCalls === 0 &&
        result.chatCalls === 0
    ) &&
      processCreateConflicts.every(
        (result) =>
          result.status === 409 && result.tagsCalls === 0 && result.chatCalls === 0
      ) &&
      new Set(processCreateSuccesses.map((result) => result.runId)).size === 1 &&
      processCreateResults.filter((result) => result.created === true).length === 1 &&
      processCreateReplay.created === false &&
      processCreateReplay.run.runId === processCreateSuccesses[0].runId &&
      processCreateReplayHarness.getStats().tagsCalls === 0 &&
      processCreateReplayHarness.getStats().chatCalls === 0,
    `Four independent idempotent creators must produce one publisher, only stable contention responses, and one exact subsequent replay with zero provider activity: ${JSON.stringify(processCreateResults)}`
  );

  const processBindSuffix = "independent-creator-binding-contention";
  const processBindLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    processBindSuffix
  );
  await resetDataRoot(processBindLabel);
  const processBindProjectId = "6".repeat(24);
  const processBindKey = `creator-${processBindProjectId}-generation-v1`;
  const processBindBody = {
    requestText: "Bind one exact creator run across independent processes.",
    capability: "code",
    modelPreferenceLabel: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
    maximumOutputTokens: 128,
  };
  const processBindResults = await Promise.all(
    Array.from({ length: 4 }, (_, index) =>
      runIndependentStoreWorker({
        operation: "bind",
        testSuffix: processBindSuffix,
        body: processBindBody,
        idempotencyKey: processBindKey,
        ownership: creatorOwnership(
          processBindProjectId,
          "generation",
          String(index + 1).repeat(32)
        ),
        createIfMissing: true,
      })
    )
  );
  const processBindSuccesses = processBindResults.filter((result) => result.ok);
  const processBindConflicts = processBindResults.filter((result) => !result.ok);
  const processBindHarness = createHarness();
  const processBindStore = createLocalStore(processBindSuffix, processBindHarness);
  const processBindReplay = await processBindStore.bindCreatorRun(
    processBindBody,
    processBindKey,
    creatorOwnership(processBindProjectId, "generation", "f".repeat(32)),
    true
  );
  assert(
    processBindSuccesses.length >= 1 &&
      processBindConflicts.every(
        (result) => result.status === 409 && result.tagsCalls === 0 && result.chatCalls === 0
      ) &&
      new Set(processBindSuccesses.map((result) => result.runId)).size === 1 &&
      new Set(processBindSuccesses.map((result) => result.bindingId)).size === 1 &&
      processBindResults.filter((result) => result.created === true).length === 1 &&
      processBindReplay?.created === false &&
      processBindReplay.run.runId === processBindSuccesses[0].runId &&
      processBindReplay.run.ownership?.kind === "creator" &&
      processBindReplay.run.ownership.bindingId === processBindSuccesses[0].bindingId &&
      (await creatorRunInventory(processBindLabel)).length === 1 &&
      processBindResults.every(
        (result) => result.tagsCalls === 0 && result.chatCalls === 0
      ) &&
      processBindHarness.getStats().tagsCalls === 0 &&
      processBindHarness.getStats().chatCalls === 0,
    `Independent creator binders must adopt one durable run/binding identity with one publisher and no provider activity: ${JSON.stringify(processBindResults)}`
  );

  const processControlSuffix = "independent-control-contention";
  const processControlLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    processControlSuffix
  );
  await resetDataRoot(processControlLabel);
  const processControlHarness = createHarness();
  const processControlStore = createLocalStore(
    processControlSuffix,
    processControlHarness
  );
  const processControlRun = await processControlStore.createCreatorRun(
    creatorRequest,
    "private-alpha-independent-control-create-0001",
    exactCreatorOwnership
  );
  const processControlResults = await Promise.all([
    runIndependentStoreWorker({
      operation: "approve",
      testSuffix: processControlSuffix,
      runId: processControlRun.run.runId,
      ownership: exactCreatorOwnership,
      body: {
        approvalScopeHash: processControlRun.run.approvalScopeHash,
        approved: true,
        acknowledgement: true,
        expectedRevision: processControlRun.run.revision,
      },
    }),
    runIndependentStoreWorker({
      operation: "cancel",
      testSuffix: processControlSuffix,
      runId: processControlRun.run.runId,
      ownership: exactCreatorOwnership,
      body: {
        expectedRevision: processControlRun.run.revision,
        reason: "Independent cancellation competes with approval.",
      },
    }),
  ]);
  const processControlWinner = processControlResults.filter((result) => result.ok);
  const processControlLoser = processControlResults.filter((result) => !result.ok);
  const processControlPersisted = await processControlStore.getCreatorRun(
    processControlRun.run.runId,
    exactCreatorOwnership
  );
  assert(
    processControlWinner.length === 1 &&
      processControlLoser.length === 1 &&
      processControlLoser[0].status === 409 &&
      processControlPersisted.revision === processControlRun.run.revision + 1 &&
      processControlPersisted.state === processControlWinner[0].state &&
      processControlResults.every(
        (result) => result.tagsCalls === 0 && result.chatCalls === 0
      ) &&
      processControlHarness.getStats().tagsCalls === 0 &&
      processControlHarness.getStats().chatCalls === 0,
    "Independent approval/cancellation contention must have one fenced winner, one deterministic conflict, and one exact persisted revision."
  );

  const processExecutionSuffix = "independent-execution-contention";
  const processExecutionLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    processExecutionSuffix
  );
  await resetDataRoot(processExecutionLabel);
  const processExecutionHarness = createHarness();
  const processExecutionStore = createLocalStore(
    processExecutionSuffix,
    processExecutionHarness
  );
  const processExecutionCreated = await processExecutionStore.createRun(
    {
      requestText: "Execute once across independent process contention.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 64,
    },
    "private-alpha-independent-execution-create-0001"
  );
  const processExecutionApproved = await processExecutionStore.approveRun(
    processExecutionCreated.run.runId,
    {
      approvalScopeHash: processExecutionCreated.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: processExecutionCreated.run.revision,
    }
  );
  const processExecutionRequest = {
    operation: "execute",
    testSuffix: processExecutionSuffix,
    runId: processExecutionApproved.runId,
    idempotencyKey: "private-alpha-independent-execution-attempt-0001",
    outputText: "one independent execution output",
    body: {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: processExecutionApproved.approvalScopeHash,
      expectedRevision: processExecutionApproved.revision,
    },
  };
  const processExecutionResults = await Promise.all(
    Array.from({ length: 3 }, () =>
      runIndependentStoreWorker(processExecutionRequest)
    )
  );
  const processExecutionSuccesses = processExecutionResults.filter(
    (result) => result.ok
  );
  const processExecutionConflicts = processExecutionResults.filter(
    (result) => !result.ok
  );
  assert(
    processExecutionSuccesses.length >= 1 &&
      processExecutionSuccesses.every(
        (result) => result.state === "succeeded" && result.responseStatus === 200
      ) &&
      processExecutionConflicts.every((result) => result.status === 409) &&
      processExecutionResults.reduce((sum, result) => sum + result.chatCalls, 0) === 1 &&
      processExecutionResults.reduce((sum, result) => sum + result.tagsCalls, 0) === 1,
    "Independent execution contention must permit one provider attempt, bounded replays or conflicts, and no duplicate generation."
  );
  const processExecutionReplay = await processExecutionStore.executeRun(
    processExecutionApproved.runId,
    processExecutionRequest.body,
    processExecutionRequest.idempotencyKey
  );
  assert(
    processExecutionReplay.replayed === true &&
      processExecutionReplay.responseStatus === 200 &&
      processExecutionReplay.run.execution?.outputText ===
        processExecutionRequest.outputText &&
      processExecutionHarness.getStats().tagsCalls === 0 &&
      processExecutionHarness.getStats().chatCalls === 0,
    "A deterministic replay after independent contention must preserve the exact terminal response without another provider call."
  );

  const interruptedSuffix = "independent-interrupted-execution";
  const interruptedLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    interruptedSuffix
  );
  await resetDataRoot(interruptedLabel);
  const interruptedHarness = createHarness();
  const interruptedStore = createLocalStore(interruptedSuffix, interruptedHarness);
  const interruptedCreated = await interruptedStore.createRun(
    {
      requestText: "Recover a provider attempt whose independent owner exits.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 64,
    },
    "private-alpha-interrupted-execution-create-0001"
  );
  const interruptedApproved = await interruptedStore.approveRun(
    interruptedCreated.run.runId,
    {
      approvalScopeHash: interruptedCreated.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: interruptedCreated.run.revision,
    }
  );
  const interruptedInput = {
    operation: "execute",
    testSuffix: interruptedSuffix,
    runId: interruptedApproved.runId,
    idempotencyKey: "private-alpha-interrupted-execution-attempt-0001",
    holdGeneration: true,
    body: {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: interruptedApproved.approvalScopeHash,
      expectedRevision: interruptedApproved.revision,
    },
  };
  const interruptedWorker = spawn(
    process.execPath,
    [
      path.join(repoRoot, "scripts", "codexforge-private-alpha-concurrency-worker.cjs"),
      repoRoot,
      Buffer.from(JSON.stringify(interruptedInput), "utf8").toString("base64url"),
    ],
    {
      cwd: repoRoot,
      env: {
        ...process.env,
        CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH: "off",
        GROQ_API_KEY: "",
      },
      stdio: "ignore",
      windowsHide: true,
    }
  );
  await once(interruptedWorker, "spawn");
  const interruptedRunPath = getRunFileAbsolutePath(
    interruptedLabel,
    interruptedApproved.runId
  );
  let observedExecuting = null;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const candidate = JSON.parse(await fsp.readFile(interruptedRunPath, "utf8"));
    if (
      candidate.state === "executing" &&
      candidate.execution?.status === "executing" &&
      candidate.execution.responseStatus === null
    ) {
      observedExecuting = candidate;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  assert(observedExecuting, "Independent provider owner durably reaches the exact executing state.");
  interruptedWorker.kill();
  await once(interruptedWorker, "exit");
  const interruptedBeforeCompetingRecovery = await fsp.readFile(
    interruptedRunPath,
    "utf8"
  );
  await expectStoreError(
    () =>
      interruptedStore.executeRun(
        interruptedApproved.runId,
        {
          ...interruptedInput.body,
          expectedRevision: observedExecuting.revision,
        },
        interruptedInput.idempotencyKey
      ),
    409,
    "replay revision does not match the original attempt"
  );
  await expectStoreError(
    () =>
      interruptedStore.executeRun(
        interruptedApproved.runId,
        interruptedInput.body,
        "private-alpha-interrupted-execution-competing-key-0001"
      ),
    409,
    "already started its one allowed execution attempt"
  );
  await expectStoreError(
    () =>
      interruptedStore.executeRun(
        interruptedApproved.runId,
        {
          ...interruptedInput.body,
          approvalScopeHash: "f".repeat(64),
        },
        interruptedInput.idempotencyKey
      ),
    409,
    "already started its one allowed execution attempt"
  );
  assert(
    (await fsp.readFile(interruptedRunPath, "utf8")) ===
      interruptedBeforeCompetingRecovery &&
      interruptedHarness.getStats().tagsCalls === 0 &&
      interruptedHarness.getStats().chatCalls === 0,
    "Wrong-key and wrong-scope recovery attempts cannot mutate or contact a provider."
  );
  const interruptedResult = await interruptedStore.executeRun(
    interruptedApproved.runId,
    interruptedInput.body,
    interruptedInput.idempotencyKey
  );
  const interruptedPersisted = await interruptedStore.getRun(
    interruptedApproved.runId
  );
  const interruptedReplay = await interruptedStore.executeRun(
    interruptedApproved.runId,
    interruptedInput.body,
    interruptedInput.idempotencyKey
  );
  assert(
    interruptedResult.replayed === true &&
      interruptedResult.responseStatus === 503 &&
      interruptedResult.errorCode === "execution_interrupted" &&
      interruptedResult.run.state === "failed" &&
      interruptedResult.run.revision === observedExecuting.revision + 1 &&
      interruptedPersisted.execution?.responseStatus === 503 &&
      interruptedPersisted.execution.errorCode === "execution_interrupted" &&
      interruptedReplay.replayed === true &&
      interruptedReplay.responseStatus === 503 &&
      interruptedReplay.run.revision === interruptedPersisted.revision &&
      interruptedHarness.getStats().tagsCalls === 0 &&
      interruptedHarness.getStats().chatCalls === 0,
    "A dead independent execution owner is atomically reconciled once and replayed without retry, fallback, or provider activity."
  );

  const rollbackSuffix = "independent-clock-rollback";
  const rollbackLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    rollbackSuffix
  );
  await resetDataRoot(rollbackLabel);
  const rollbackHarness = createHarness();
  const rollbackStore = createLocalStore(rollbackSuffix, rollbackHarness);
  const rollbackCreated = await rollbackStore.createRun(
    {
      requestText: "Keep lifecycle time monotonic across wall-clock rollback.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 64,
    },
    "private-alpha-independent-clock-rollback-create-0001"
  );
  const rollbackRunPath = getRunFileAbsolutePath(
    rollbackLabel,
    rollbackCreated.run.runId
  );
  const rollbackIdempotencyPath = getIdempotencyFileAbsolutePath(
    rollbackLabel,
    rollbackCreated.run.idempotencyKeyHash
  );
  const rollbackFutureTimestamp = new Date(Date.now() + 86_400_000).toISOString();
  const rollbackRunFixture = JSON.parse(await fsp.readFile(rollbackRunPath, "utf8"));
  rollbackRunFixture.createdAt = rollbackFutureTimestamp;
  rollbackRunFixture.updatedAt = rollbackFutureTimestamp;
  rollbackRunFixture.auditEvents = rollbackRunFixture.auditEvents.map((event) => ({
    ...event,
    occurredAt: rollbackFutureTimestamp,
  }));
  const rollbackIdempotencyFixture = JSON.parse(
    await fsp.readFile(rollbackIdempotencyPath, "utf8")
  );
  rollbackIdempotencyFixture.reservedAt = rollbackFutureTimestamp;
  rollbackIdempotencyFixture.publishedAt = rollbackFutureTimestamp;
  await fsp.writeFile(
    rollbackRunPath,
    `${JSON.stringify(rollbackRunFixture, null, 2)}\n`,
    "utf8"
  );
  await fsp.writeFile(
    rollbackIdempotencyPath,
    `${JSON.stringify(rollbackIdempotencyFixture, null, 2)}\n`,
    "utf8"
  );
  const rollbackApproval = await runIndependentStoreWorker({
    operation: "approve",
    testSuffix: rollbackSuffix,
    runId: rollbackCreated.run.runId,
    body: {
      approvalScopeHash: rollbackCreated.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: rollbackCreated.run.revision,
    },
  });
  assert(
    rollbackApproval.ok === true &&
      rollbackApproval.tagsCalls === 0 &&
      rollbackApproval.chatCalls === 0,
    "An independent restarted process must approve a valid future-dated fixture without provider activity."
  );
  const rollbackApprovedRecord = JSON.parse(
    await fsp.readFile(rollbackRunPath, "utf8")
  );
  const rollbackCancellation = await runIndependentStoreWorker({
    operation: "cancel",
    testSuffix: rollbackSuffix,
    runId: rollbackCreated.run.runId,
    body: {
      expectedRevision: rollbackApprovedRecord.revision,
      reason: "Second restarted process preserves monotonic lifecycle time.",
    },
  });
  const rollbackCanceledRecord = JSON.parse(
    await fsp.readFile(rollbackRunPath, "utf8")
  );
  assert(
    rollbackCancellation.ok === true &&
      rollbackApprovedRecord.updatedAt >= rollbackFutureTimestamp &&
      rollbackCanceledRecord.updatedAt >= rollbackApprovedRecord.updatedAt &&
      rollbackCanceledRecord.auditEvents.every(
        (event, index, events) =>
          index === 0 || event.occurredAt >= events[index - 1].occurredAt
      ) &&
      rollbackCancellation.tagsCalls === 0 &&
      rollbackCancellation.chatCalls === 0 &&
      rollbackHarness.getStats().tagsCalls === 0 &&
      rollbackHarness.getStats().chatCalls === 0,
    "Persisted lifecycle timestamps must remain nondecreasing across clock rollback and two independent process restarts."
  );

  async function createCreatorRunWithOwnedLock(testSuffix, createdAt, owner) {
    const testLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(testSuffix);
    await resetDataRoot(testLabel);
    const harness = createHarness();
    const store = createLocalStore(testSuffix, harness);
    const created = await store.createCreatorRun(
      creatorRequest,
      `private-alpha-${testSuffix}-create-0001`,
      exactCreatorOwnership
    );
    const lockPath = getRunLockFileAbsolutePath(testLabel, created.run.runId);
    await fsp.writeFile(
      lockPath,
      `${JSON.stringify(
        {
          nonce: "1".repeat(32),
          processSessionNonce: "2".repeat(32),
          processId: owner.processId,
          processIdentity: owner.processIdentity,
          createdAt,
        },
        null,
        2
      )}\n`,
      "utf8"
    );
    return { store, created, lockPath, harness };
  }

  const liveOwnerProcess = spawn(
    process.execPath,
    ["-e", "setInterval(() => {}, 1000)"],
    { stdio: "ignore", windowsHide: true }
  );
  await once(liveOwnerProcess, "spawn");
  const liveOwner = {
    processId: liveOwnerProcess.pid,
    processIdentity: nativeFilesystemModule.getExactWindowsProcessIdentity(
      liveOwnerProcess.pid
    ),
  };
  const oldLiveLock = await createCreatorRunWithOwnedLock(
    "creator-old-live-owner-lock",
    new Date(Date.now() - 86_400_000).toISOString(),
    liveOwner
  );
  const futureLiveLock = await createCreatorRunWithOwnedLock(
    "creator-future-live-owner-lock",
    new Date(Date.now() + 86_400_000).toISOString(),
    liveOwner
  );
  for (const [label, locked] of [
    ["old", oldLiveLock],
    ["future", futureLiveLock],
  ]) {
    await expectStoreError(
      () =>
        locked.store.approveCreatorRun(
          locked.created.run.runId,
          {
            approvalScopeHash: locked.created.run.approvalScopeHash,
            approved: true,
            acknowledgement: true,
            expectedRevision: locked.created.run.revision,
          },
          exactCreatorOwnership
        ),
      409,
      "already being mutated"
    );
    assert(
      (await fsp.readFile(locked.lockPath, "utf8")).includes(liveOwner.processIdentity) &&
        locked.harness.getStats().tagsCalls === 0 &&
        locked.harness.getStats().chatCalls === 0,
      `Elapsed or rolled-back wall-clock time must never steal a ${label} lock from its exact live owner.`
    );
  }

  const malformedLiveOwnerCases = [
    ["opaque-identity", liveOwner.processId, "a".repeat(16)],
    ["leading-zero-filetime", liveOwner.processId, "windows-filetime:01"],
    ["zero-filetime", liveOwner.processId, "windows-filetime:0"],
    ["overflow-filetime", liveOwner.processId, "windows-filetime:18446744073709551616"],
    ["out-of-range-pid", 0x1_0000_0000, liveOwner.processIdentity],
  ];
  for (const [suffix, processId, processIdentity] of malformedLiveOwnerCases) {
    const malformedLock = await createCreatorRunWithOwnedLock(
      `creator-malformed-live-lock-${suffix}`,
      new Date(Date.now() - 86_400_000).toISOString(),
      { processId, processIdentity }
    );
    const originalLockBytes = await fsp.readFile(malformedLock.lockPath, "utf8");
    await expectStoreError(
      () =>
        malformedLock.store.cancelCreatorRun(
          malformedLock.created.run.runId,
          {
            expectedRevision: malformedLock.created.run.revision,
            reason: "Malformed ownership evidence must fail closed.",
          },
          exactCreatorOwnership
        ),
      500,
      "mutation lock is malformed"
    );
    assert(
      (await fsp.readFile(malformedLock.lockPath, "utf8")) === originalLockBytes &&
        malformedLock.harness.getStats().tagsCalls === 0 &&
        malformedLock.harness.getStats().chatCalls === 0,
      `Malformed live-owner case ${suffix} must remain non-stealable without provider activity.`
    );
  }
  liveOwnerProcess.kill();
  await once(liveOwnerProcess, "exit");
  const recoveredAfterCrash = await oldLiveLock.store.approveCreatorRun(
    oldLiveLock.created.run.runId,
    {
      approvalScopeHash: oldLiveLock.created.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: oldLiveLock.created.run.revision,
    },
    exactCreatorOwnership
  );
  assert(
    recoveredAfterCrash.state === "approved" &&
      !(await fsp.lstat(oldLiveLock.lockPath).catch((error) => {
        if (error && error.code === "ENOENT") return null;
        throw error;
      })),
    "An exact dead independent-process owner must be taken over atomically without provider activity."
  );

  const reusedPidLock = await createCreatorRunWithOwnedLock(
    "creator-pid-reuse-lock",
    new Date(Date.now() + 86_400_000).toISOString(),
    {
      processId: process.pid,
      processIdentity: "windows-filetime:1",
    }
  );
  const reusedPidRecovered = await reusedPidLock.store.cancelCreatorRun(
    reusedPidLock.created.run.runId,
    {
      expectedRevision: reusedPidLock.created.run.revision,
      reason: "Recover after exact process-start identity proves PID reuse.",
    },
    exactCreatorOwnership
  );
  assert(
    reusedPidRecovered.state === "canceled",
    "A reused PID with a different exact process-start identity must not keep a dead lock alive."
  );

  const legacyLock = await createCreatorRunWithOwnedLock(
    "creator-legacy-lock",
    new Date(Date.now() - 86_400_000).toISOString(),
    {
      processId: process.pid,
      processIdentity: nativeFilesystemModule.getExactWindowsProcessIdentity(process.pid),
    }
  );
  const legacyOwner = JSON.parse(await fsp.readFile(legacyLock.lockPath, "utf8"));
  delete legacyOwner.processIdentity;
  await fsp.writeFile(legacyLock.lockPath, `${JSON.stringify(legacyOwner, null, 2)}\n`, "utf8");
  await expectStoreError(
    () =>
      legacyLock.store.cancelCreatorRun(
        legacyLock.created.run.runId,
        {
          expectedRevision: legacyLock.created.run.revision,
          reason: "A legacy lock cannot be stolen automatically.",
        },
        exactCreatorOwnership
      ),
    500,
    "mutation lock is malformed"
  );
  assert(
    (await fsp.lstat(legacyLock.lockPath)).isFile(),
    "A legacy lock without exact owner identity must remain non-stealable and fail closed."
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
  const unavailablePath = getRunFileAbsolutePath(
    unavailableLabel,
    unavailableResult.run.runId
  );
  const tamperedUnavailable = JSON.parse(await fsp.readFile(unavailablePath, "utf8"));
  tamperedUnavailable.execution.responseStatus = 409;
  await fsp.writeFile(
    unavailablePath,
    `${JSON.stringify(tamperedUnavailable, null, 2)}\n`,
    "utf8"
  );
  await expectStoreError(
    () => unavailableStore.getRun(unavailableResult.run.runId),
    500,
    "Persisted run record is malformed"
  );

  async function runInternalAvailabilityCodeInjection(testSuffix, creatorOwned) {
    const testLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(testSuffix);
    await resetDataRoot(testLabel);
    const harness = createHarness();
    const store = createLocalStore(
      testSuffix,
      harness,
      {},
      (adapter) => ({
        ...adapter,
        async getAvailability() {
          return {
            providerAvailable: false,
            modelAvailable: false,
            quotaState: "not-applicable",
            errorCode: "execution_interrupted",
            safeErrorMessage: "forged internal lifecycle classification",
          };
        },
      })
    );
    const ownership = creatorOwnership(
      creatorOwned ? "e".repeat(24) : "f".repeat(24),
      "generation",
      creatorOwned ? "1".repeat(32) : "2".repeat(32)
    );
    const created = creatorOwned
      ? await store.createCreatorRun(
          {
            requestText: `Internal availability injection ${testSuffix}.`,
            capability: "text",
            modelPreferenceLabel: null,
            maximumOutputTokens: 128,
          },
          `private-alpha-${testSuffix}-create-0001`,
          ownership
        )
      : await store.createRun(
          {
            requestText: `Internal availability injection ${testSuffix}.`,
            capability: "text",
            modelPreferenceLabel: null,
            maximumOutputTokens: 128,
          },
          `private-alpha-${testSuffix}-create-0001`
        );
    const approvalInput = {
      approvalScopeHash: created.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: created.run.revision,
    };
    const approved = creatorOwned
      ? await store.approveCreatorRun(created.run.runId, approvalInput, ownership)
      : await store.approveRun(created.run.runId, approvalInput);
    const executeInput = {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: approved.approvalScopeHash,
      expectedRevision: approved.revision,
    };
    const executionKey = `private-alpha-${testSuffix}-execute-0001`;
    const result = creatorOwned
      ? await store.executeCreatorRun(approved.runId, executeInput, executionKey, ownership)
      : await store.executeRun(approved.runId, executeInput, executionKey);
    assert(
      result.run.state === "blocked" &&
        result.responseStatus === 503 &&
        result.errorCode === "ollama_unavailable" &&
        result.run.execution?.errorCode === "ollama_unavailable" &&
        result.run.execution.safeErrorMessage !== "forged internal lifecycle classification",
      `${testSuffix} canonicalizes a forged internal provider code before durable publication.`
    );
    const readBack = creatorOwned
      ? await store.getCreatorRun(approved.runId, ownership)
      : await store.getRun(approved.runId);
    assert(
      readBack.state === "blocked" && readBack.execution?.errorCode === "ollama_unavailable",
      `${testSuffix} remains durably readable after provider-code canonicalization.`
    );
    const replay = creatorOwned
      ? await store.executeCreatorRun(approved.runId, executeInput, executionKey, ownership)
      : await store.executeRun(approved.runId, executeInput, executionKey);
    assert(
      replay.replayed === true &&
        replay.responseStatus === 503 &&
        replay.errorCode === "ollama_unavailable" &&
        harness.getStats().chatCalls === 0,
      `${testSuffix} replay preserves canonical classification without generation.`
    );
    return { store, ownership, approved, result, testLabel };
  }

  await runInternalAvailabilityCodeInjection(
    "internal-availability-general",
    false
  );
  const internalCreatorAvailability = await runInternalAvailabilityCodeInjection(
    "internal-availability-creator",
    true
  );
  const blockedCreatorPath = getRunFileAbsolutePath(
    internalCreatorAvailability.testLabel,
    internalCreatorAvailability.result.run.runId
  );
  const impossibleInterrupted = JSON.parse(await fsp.readFile(blockedCreatorPath, "utf8"));
  impossibleInterrupted.execution.errorCode = "execution_interrupted";
  impossibleInterrupted.execution.safeErrorMessage =
    "The creator-owned provider request ended without a durable terminal result after its execution owner exited.";
  await fsp.writeFile(
    blockedCreatorPath,
    `${JSON.stringify(impossibleInterrupted, null, 2)}\n`,
    "utf8"
  );
  await expectStoreError(
    () =>
      internalCreatorAvailability.store.getCreatorRun(
        internalCreatorAvailability.approved.runId,
        internalCreatorAvailability.ownership
      ),
    500,
    "Persisted run record is malformed"
  );

  async function runFailureCase(
    testSuffix,
    harnessOptions,
    expectedState,
    expectedStatus,
    expectedCode,
    transformAdapter = (adapter) => adapter
  ) {
    await resetDataRoot(storeModule.buildPrivateAlphaTestingDataRootLabel(testSuffix));
    const store = createLocalStore(
      testSuffix,
      createHarness(harnessOptions),
      harnessOptions.timeouts,
      transformAdapter
    );
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
        result.run.execution.outputText === null &&
        result.run.execution.responseStatus === expectedStatus,
      `Failure case ${testSuffix} must persist bounded failure data and its exact HTTP status without partial output.`
    );
    const replay = await store.executeRun(
      approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: approved.approvalScopeHash,
        expectedRevision: approved.revision,
      },
      `private-alpha-${testSuffix}-exec-0001`
    );
    assert(
      replay.replayed === true &&
        replay.responseStatus === expectedStatus &&
        replay.errorCode === expectedCode &&
        replay.safeErrorMessage === result.safeErrorMessage,
      `Failure case ${testSuffix} replay must preserve the original status, classification, and canonical safe payload.`
    );
    return {
      approved,
      result,
      store,
      testLabel: storeModule.buildPrivateAlphaTestingDataRootLabel(testSuffix),
    };
  }

  const providerFailureCase = await runFailureCase(
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
    providerFailureCase.result.run.auditEvents.some(
      (event) => event.eventType === "execution.failed"
    ),
    "Provider failure must append execution.failed."
  );

  const forgedInternalGenerationError = await runFailureCase(
    "forged-internal-generation-code",
    {},
    "failed",
    500,
    "ollama_http_error",
    (adapter) => ({
      ...adapter,
      async generateApprovedText() {
        const error = new providerModule.PrivateAlphaProviderError(
          "ollama_http_error",
          "forged internal lifecycle classification",
          503
        );
        error.code = "execution_interrupted";
        throw error;
      },
    })
  );
  assert(
    forgedInternalGenerationError.result.safeErrorMessage ===
      "Local Ollama execution failed unexpectedly." &&
      forgedInternalGenerationError.result.run.execution?.errorCode ===
        "ollama_http_error",
    "A forged internal generation code is canonicalized as an unexpected provider failure."
  );
  const reservedLocalFailure = await runFailureCase(
    "reserved-local-provider-message",
    {},
    "failed",
    500,
    "ollama_http_error",
    (adapter) => ({
      ...adapter,
      async generateApprovedText() {
        throw new providerModule.PrivateAlphaProviderError(
          "ollama_http_error",
          "Local Ollama execution failed unexpectedly.",
          503
        );
      },
    })
  );
  const reservedLocalReadBack = await reservedLocalFailure.store.getRun(
    reservedLocalFailure.result.run.runId
  );
  assert(
    reservedLocalReadBack.execution?.responseStatus === 500 &&
      reservedLocalFailure.result.responseStatus === 500,
    "The reserved local unexpected-failure message has one canonical durable 500 classification."
  );

  const providerFailurePath = getRunFileAbsolutePath(
    providerFailureCase.testLabel,
    providerFailureCase.result.run.runId
  );
  const legacyProviderFailure = JSON.parse(await fsp.readFile(providerFailurePath, "utf8"));
  delete legacyProviderFailure.execution.responseStatus;
  await fsp.writeFile(
    providerFailurePath,
    `${JSON.stringify(legacyProviderFailure, null, 2)}\n`,
    "utf8"
  );
  const legacyProviderReplay = await providerFailureCase.store.executeRun(
    providerFailureCase.approved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: providerFailureCase.approved.approvalScopeHash,
      expectedRevision: providerFailureCase.approved.revision,
    },
    "private-alpha-provider-http-failure-exec-0001"
  );
  assert(
    legacyProviderReplay.replayed === true &&
      legacyProviderReplay.responseStatus === 200 &&
      legacyProviderReplay.errorCode === "ollama_http_error" &&
      legacyProviderReplay.safeErrorMessage === providerFailureCase.result.safeErrorMessage,
    "A legacy known provider failure without responseStatus must replay its canonical HTTP 200 classification and payload."
  );

  const timeoutFailureCase = await runFailureCase(
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
  assert(
    timeoutFailureCase.result.run.execution.safeErrorMessage.includes("timeout"),
    "Timeout must persist a safe timeout message."
  );
  const timeoutFailurePath = getRunFileAbsolutePath(
    timeoutFailureCase.testLabel,
    timeoutFailureCase.result.run.runId
  );
  const tamperedTimeoutFailure = JSON.parse(await fsp.readFile(timeoutFailurePath, "utf8"));
  tamperedTimeoutFailure.execution.responseStatus = 200;
  await fsp.writeFile(
    timeoutFailurePath,
    `${JSON.stringify(tamperedTimeoutFailure, null, 2)}\n`,
    "utf8"
  );
  await expectStoreError(
    () => timeoutFailureCase.store.getRun(timeoutFailureCase.result.run.runId),
    500,
    "Persisted run record is malformed"
  );

  const unexpectedFailureCase = await runFailureCase(
    "unexpected-provider-failure",
    {
      onChat() {
        throw new Error("test-owned unexpected transport failure");
      },
    },
    "failed",
    500,
    "ollama_http_error",
    (adapter) => ({
      ...adapter,
      async generateApprovedText() {
        throw new Error("test-owned unexpected provider adapter failure");
      },
    })
  );
  const unexpectedFailurePath = getRunFileAbsolutePath(
    unexpectedFailureCase.testLabel,
    unexpectedFailureCase.result.run.runId
  );
  const legacyUnexpectedFailure = JSON.parse(await fsp.readFile(unexpectedFailurePath, "utf8"));
  delete legacyUnexpectedFailure.execution.responseStatus;
  await fsp.writeFile(
    unexpectedFailurePath,
    `${JSON.stringify(legacyUnexpectedFailure, null, 2)}\n`,
    "utf8"
  );
  const legacyUnexpectedReplay = await unexpectedFailureCase.store.executeRun(
    unexpectedFailureCase.approved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: unexpectedFailureCase.approved.approvalScopeHash,
      expectedRevision: unexpectedFailureCase.approved.revision,
    },
    "private-alpha-unexpected-provider-failure-exec-0001"
  );
  assert(
    legacyUnexpectedReplay.replayed === true &&
      legacyUnexpectedReplay.responseStatus === 500 &&
      legacyUnexpectedReplay.errorCode === "ollama_http_error" &&
      legacyUnexpectedReplay.safeErrorMessage === "Local Ollama execution failed unexpectedly.",
    "A legacy canonical unexpected failure without responseStatus must replay its original HTTP 500 classification and payload."
  );

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
    providerFailureState: providerFailureCase.result.run.state,
  };
  } finally {
    await cleanupOwnedDataRoots();
  }
}

main()
  .then((result) => {
    process.stdout.write(`${JSON.stringify(result)}\n`);
  })
  .catch((error) => {
    const message =
      error instanceof Error && error.message ? error.message : String(error);
    const diagnostic =
      error instanceof Error && error.stack ? error.stack : message;
    process.stderr.write(`${JSON.stringify({ diagnostic })}\n`);
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
